import { ErrorPageProps } from "$fresh/server.ts";
import { tw } from "twind";

export default function Error500Page({ error }: ErrorPageProps) {
  return (
    <div
      class={tw`text-white bg-gray-900 flex flex-col w-full h-[100vh] justify-center items-center`}
    >
      <h1 class={tw`text-2xl font-semibold`}>500 internal error</h1>
      <p class={tw`text-gray-400`}>{(error as Error).message}</p>;
    </div>
  );
}
