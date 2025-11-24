import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createContext, useContext } from "react";
import { getCurrentUserFn } from "@/utils/getCurrentUser";
import type { SessionUser } from "@/utils/session";

const AuthContext = createContext<SessionUser | null | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: useServerFn(getCurrentUserFn),
	});

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
