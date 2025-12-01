// Vitest setup: provide DOM APIs used by components/tests
import { JSDOM } from "jsdom";

// Explicitly create a JSDOM environment to ensure document/window exist
const dom = new JSDOM("<!doctype html><html><head></head><body></body></html>");
// @ts-expect-error - assign jsdom globals for tests
global.window = dom.window as unknown as Window & typeof globalThis;
// @ts-expect-error - assign jsdom globals for tests
global.document = dom.window.document as Document;
// @ts-expect-error - navigator stub
global.navigator = {
	userAgent: "node.js",
} as Navigator;
// Vitest setup: provide DOM APIs used by components/tests

// matchMedia stub for components that query reduced motion or breakpoints
if (!window.matchMedia) {
	const mqlFactory = (query: string): MediaQueryList => {
		return {
			matches: false,
			media: query,
			onchange: null,
			addListener: () => undefined,
			removeListener: () => undefined,
			addEventListener: () => undefined,
			removeEventListener: () => undefined,
			dispatchEvent: () => false,
		} as MediaQueryList;
	};
	window.matchMedia = mqlFactory;
}

// requestAnimationFrame fallback for framer-motion
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (cb: FrameRequestCallback) =>
		setTimeout(cb, 16) as unknown as number;
}
