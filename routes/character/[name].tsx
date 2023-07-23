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
  const { data, images } = await load(name)

  return (
    <>
      <Head>
        <title>Fresshin - {name}</title>
      </Head>
      <main>
        <img src={image(images.namegachasplash || images.nameicon || "")} />
        <h1>{data.name}</h1>
        <p>{data.element}</p>
        <p>{data.weapontype}</p>
        <p>{data.description}</p>
        <p>{data.constellation}</p>
        <p>{data.birthday} ({data.birthdaymmdd})</p>
        <p>English: {data.cv["english"]}</p>
        <p>Chinese: {data.cv["chinese"]}</p>
        <p>Japanese: {data.cv["japanese"]}</p>
        <p>Korean: {data.cv["korean"]}</p>
      </main>
    </>
  )
}
