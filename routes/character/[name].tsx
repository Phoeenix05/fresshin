import { Handlers, PageProps } from "$fresh/server.ts"

export const handler: Handlers<string | null> = {
    async GET(_, ctx) {
        const { name } = ctx.params
        const resp = await fetch(`https://api.genshin.dev/characters/${name}`)
        if (resp.status == 404) {
            return ctx.render(null)
        }
        const character = await resp.json()
        return ctx.render(character)
    }
}

export default function CharacterPage({ data }: PageProps<string | null>) {
    if (!data) {
        return <h1>Character doesn't exist</h1>
    }

    return (
        <main>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </main>
    )
}