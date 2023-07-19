import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps, Status } from "$fresh/server.ts";
import { Icon } from "../components/Icon.tsx";

export const handler: Handlers<string[]> = {
  async GET(_, ctx) {
    const resp = await fetch(`https://api.genshin.dev/characters`);
    if (resp.status != Status.OK) {
      return ctx.renderNotFound();
    }
    const characters: string[] = await resp.json();
    return ctx.render(characters);
  },
};

export default function Home({ data }: PageProps<string[]>) {
  return (
    <>
      <Head>
        <title>Fresshin - Genshin Impact</title>
      </Head>
      <div class="flex flex-wrap gap-2 w-full justify-center">
        {data.map((character) => (
          <Icon
            type="CHARACTER"
            name={character}
            link
          />
        ))}
      </div>
    </>
  );
}
