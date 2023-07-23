import { z } from "zod"

export const CharacterDataSchema = z.object({
  "name": z.string(),
  "fullname": z.string(),
  "title": z.string(),
  "description": z.string(),
  "rarity": z.string(),
  // "element": z.enum(["Anemo", "Geo", "Pyro", "Hydro", "Cryo", "Electro", "Dendro", "None"]),
  "element": z.string(),
  // "weapontype": z.enum(["Sword", "Bow", "Claymore", "Polearm", "Catalyst"]),
  "weapontype": z.string(),
  "substat": z.string(),
  "gender": z.string(),
  "body": z.string(),
  "association": z.string(),
  // "region": z.enum(["Mondstadt", "Liyue", "Inazuma", "Sumeru"]),
  "region": z.string(),
  "affiliation": z.string(),
  "birthdaymmdd": z.string(),
  "birthday": z.string(),
  "constellation": z.string(),
  "cv": z.record(z.string(), z.string()),
  "costs": z.record(
    z.string(),
    z.array(z.object({
      "name": z.string(),
      "count": z.number(),
    })),
  ),
})
export type CharacterData = z.infer<typeof CharacterDataSchema>

export const ImageSchema = z.object({
  "image": z.string().url().optional(),
  "card": z.string().url().optional(),
  "portrait": z.string().url().optional(),
  "icon": z.string().url().optional(),
  "sideicon": z.string().url().optional(),
  "cover1": z.string().url().optional(),
  "cover2": z.string().url().optional(),
  "hoyolab-avatar": z.string().url().optional(),
  "nameicon": z.string().optional(),
  "nameiconcard": z.string().optional(),
  "namegachasplash": z.string().optional(),
  "namegachaslice": z.string().optional(),
  "namesideicon": z.string().optional(),
})
export type Image = z.infer<typeof ImageSchema>

export const CharacterSchema = z.object({
  data: CharacterDataSchema,
  images: ImageSchema,
})
export type Character = z.infer<typeof CharacterSchema>

export const ImagesSchema = z.record(z.string(), ImageSchema)
export type Images = z.infer<typeof ImagesSchema>
