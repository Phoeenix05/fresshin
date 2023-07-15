import { UnknownPageProps } from "$fresh/server.ts";
import { tw } from "twind";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <div
      class={tw`text-white bg-gray-900 flex flex-col w-full h-[100vh] justify-center items-center`}
    >
      <h1 class={tw`text-2xl font-semibold`}>404 not found</h1>
      <p class={tw`text-gray-400`}>{url.pathname}</p>
    </div>
  );
}
