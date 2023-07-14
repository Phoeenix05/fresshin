import { Head } from "$fresh/runtime.ts"
import { Handlers, PageProps, Status } from "$fresh/server.ts"
import { CharacterInfo } from "../../util/types/genshin.gg.ts"

export const handler: Handlers<{
    name: string,
    character: CharacterInfo
}> = {
    async GET(_, ctx) {
        const { name } = ctx.params
        const resp = await fetch(`https://api.genshin.dev/characters/${name}`)
        if (resp.status != Status.OK) {
            return ctx.renderNotFound()
        }
        const character: CharacterInfo = await resp.json()
        return ctx.render({ name, character })
    }
}

export default function CharacterPage({ data }: PageProps<{
    name: string,
    character: CharacterInfo
}>) {
    const { name, character } = data
    const img_base = `https://api.genshin.dev/characters/${name}`
    
    return (
        <>
            <Head>
                <title>Fresshin - {character.name}</title>
            </Head>
            <main>
                <img src={`${img_base}/gacha-splash`} alt={`${name}-gacha-splash`} />
                <h1>{character.name}</h1>
                <p>{character.vision}</p>
                <p>{character.weapon}</p>
                <p>{character.description}</p>
                <p>{character.constellation}</p>
                <p>{character.birthday}</p>
            </main>
        </>
    )
}
