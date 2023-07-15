import { tw } from "twind";

export type Props = {
  type: "CHARACTER" | "ARTIFACT" | "WEAPON";
  name: string;
  link?: boolean;
};

function Image({ type, name }: Props) {
  const img_base = "https://api.genshin.dev/characters";

  return (
    <img
      alt={name}
      src={name.includes("traveler")
        ? `${img_base}/${name}/icon`
        : `${img_base}/${name}/icon-big`}
    />
  );
}

export function Icon({ type, name, link }: Props) {
  return (
    <>
      {link
        ? (
          <a href={`/character/${name}`} class={tw`w-16`}>
            <Image type={type} name={name} />
          </a>
        )
        : <Image type={type} name={name} />}
    </>
  );
}
