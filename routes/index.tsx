import { Head } from "$fresh/runtime.ts"

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresshin - Genshin Impact</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        Search characters by changing the url to `/character/[character name]`.
        Search artifacts by changing the url to `/artifacts/[artifact name ("-" in place of " ")]`.
        Search player data by changing the url to `/u/[player uid]`.
      </div>
    </>
  )
}
