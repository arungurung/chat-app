import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/chats/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/chats/"!</div>
}
