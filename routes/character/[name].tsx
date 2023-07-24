import { Head } from "$fresh/runtime.ts"
import { RouteContext } from "$fresh/server.ts"
import { image } from "../../util/image.ts"
import { load_data } from "../../util/load.ts"
import { Character, CharacterSchema } from "../../util/types.ts"
import { validate } from "../../util/validate.ts"

const load = async (name: string) => {
  const data: Character = await load_data(`english-${name}`)
  validate(CharacterSchema, data)
  return data
}

export default async function CharacterPage(req: Request, ctx: RouteContext) {
  const { name } = ctx.params
  const { info, images } = await load(name)

  return (
    <>
      <Head>
        <title>Fresshin - {name}</title>
      </Head>
      <main>
        <img src={image(images.namegachasplash || images.nameicon || "")} />
        <h1>{info.name}</h1>
        <p>{info.element}</p>
        <p>{info.weapontype}</p>
        <p>{info.description}</p>
        <p>{info.constellation}</p>
        <p>{info.birthday} ({info.birthdaymmdd})</p>
        <p>English: {info.cv["english"]}</p>
        <p>Chinese: {info.cv["chinese"]}</p>
        <p>Japanese: {info.cv["japanese"]}</p>
        <p>Korean: {info.cv["korean"]}</p>
      </main>
    </>
  )
}
