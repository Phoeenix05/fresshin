import { Handlers, PageProps } from "$fresh/server.ts"

export const handler: Handlers<string> = {
  async GET(_, ctx) {
    const { uid } = ctx.params
    const resp = await fetch(`https://enka.network/api/uid/${uid}`)
    if (resp.status != 200) {
      return ctx.renderNotFound()
    }
    const user = await resp.json()
    const render = await ctx.render(user)
    render.headers.append("Cache-Control", "max-age=300")
    return render
  },
}

export default function UserPage({ data }: PageProps<string>) {
  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
