import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps, Status } from "$fresh/server.ts";
import { ArtifactInfo, ArtifactTypes } from "../../util/types/genshin.gg.ts";

export const handler: Handlers<{
  name: string;
  artifact: ArtifactInfo;
}> = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const resp = await fetch(`https://api.genshin.dev/artifacts/${name}`);
    if (resp.status != Status.OK) {
      return ctx.renderNotFound();
    }
    const artifact: ArtifactInfo = await resp.json();
    return ctx.render({ name, artifact });
  },
};

export default function ArtifactPage({ data }: PageProps<{
  name: string;
  artifact: ArtifactInfo;
}>) {
  const { name, artifact } = data;
  const img_base = `https://api.genshin.dev/artifacts/${name}`;

  return (
    <>
      <Head>
        <title>Fresshin - {artifact.name}</title>
      </Head>
      <main>
        <h1>{artifact.name}</h1>
        <p>{artifact.max_rarity}</p>
        <p>{artifact["2-piece_bonus"]}</p>
        <p>{artifact["4-piece_bonus"]}</p>
        <section class="flex flex-row flex-wrap">
          {ArtifactTypes.map((artifact) => (
            <img
              class="w-16"
              src={`${img_base}/${artifact}`}
              alt={artifact}
            />
          ))}
        </section>
      </main>
    </>
  );
}
