import { Handlers, PageProps } from "$fresh/server.ts"

export const handler: Handlers<string | null> = {
    async GET(_, ctx) {
        const { uid } = ctx.params
        const resp = await fetch(`https://enka.network/api/uid/${uid}`)
        if (resp.status != 200) {
            return ctx.render(null)
        }
        const user = await resp.json()
        return ctx.render(user)
    }
}

export default function UserPage({ data }: PageProps<string | null>) {
    if (!data) {
        return <h1>User doesn't exist or something else happened</h1>
    }

    return (
        <main>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </main>
    )
}
