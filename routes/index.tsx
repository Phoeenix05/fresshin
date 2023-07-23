import { Head } from "$fresh/runtime.ts";
import { RouteContext } from "$fresh/server.ts";
import { load_data } from "../util/load.ts";
import { Images, ImagesSchema } from "../util/types.ts";
import { validate } from "../util/validate.ts";

const load = async () => {
  const characters: string[] = await load_data("english-characters")
  const images: Images = await load_data("images")
  validate(ImagesSchema, images)
  return { characters, images }
}

export default async function Home(req: Request, ctx: RouteContext) {
  const data = await load()

  return (
    <>
      <Head>
        <title>Fresshin - Genshin Impact</title>
      </Head>
      <div class="flex flex-wrap gap-2 w-full justify-center">
        {data.characters.map((character) => (
          <a href={`character/${character}`}>
            <img src={data.images[character].icon} width="128" />
          </a>
        ))}
      </div>
    </>
  )
}
