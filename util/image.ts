/**
 * @param name is something like "UI_AvatarIcon_Albedo".
 * @returns 
 */
export const image = (name: string): string => {
    return `${Deno.env.get("IMAGE_URL")}/${name}.png`
}
