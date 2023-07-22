import { Head } from "$fresh/runtime.ts";
import { RouteContext } from "$fresh/server.ts";
import { image } from "../../util/image.ts";
import { load_data } from "../../util/load.ts";

const load = async (name: string) => {
  return await load_data<{ data: object; images: object }>(`english-${name}`);
};

export default async function CharacterPage(req: Request, ctx: RouteContext) {
  const { name } = ctx.params;
  const { data, images } = await load(name);

  return (
    <>
      <Head>
        <title>Fresshin - {name}</title>
      </Head>
      <main>
        <img src={image(images.namegachasplash)} />
        <h1>{data.name}</h1>
        <p>{data.element}</p>
        <p>{data.weapontype}</p>
        <p>{data.description}</p>
        <p>{data.constellation}</p>
        <p>{data.birthday} ({data.birthdaymmdd})</p>
      </main>
    </>
  );
}
