import { UnknownPageProps } from "$fresh/server.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <div class="text-white bg-gray-900 flex flex-col w-full h-[100vh] justify-center items-center">
      <h1 class="text-2xl font-semibold">404 not found</h1>
      <p class="text-gray-400">{url.pathname}</p>
    </div>
  );
}
