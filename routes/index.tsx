import { Head } from "$fresh/runtime.ts"
import { Handlers, PageProps, Status } from "$fresh/server.ts"
import { tw } from "twind"

export const handler: Handlers<string[]> = {
  async GET(_, ctx) {
      const resp = await fetch(`https://api.genshin.dev/characters`)
      if (resp.status != Status.OK) {
          return ctx.renderNotFound()
      }
      const characters: string[] = await resp.json()
      return ctx.render(characters)
  }
}

export default function Home({ data }: PageProps<string[]>) {
  return (
    <>
      <Head>
        <title>Fresshin - Genshin Impact</title>
      </Head>
      <div class={tw`flex flex-wrap gap-2 w-full justify-center`}>
        {data.map((character) => (
          <a href={`/character/${character}`} class={tw`w-16`}>
            <img src={`https://api.genshin.dev/characters/${character}/icon`} alt={character} />
          </a>
        ))}
      </div>
    </>
  )
}
