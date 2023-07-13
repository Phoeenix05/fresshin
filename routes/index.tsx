import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <>
      <Head>
        <title>Fresshin - Genshin Impact</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        Search characters by changing the url to `/character/[character name]`
      </div>
    </>
  );
}
