import { z } from "zod"

export const CharacterInfoSchema = z.object({
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
export type CharacterInfo = z.infer<typeof CharacterInfoSchema>

export const ConstellationSchema = z.object({
  "name": z.string(),
  "effect": z.string(),
})
export type Constellation = z.infer<typeof ConstellationSchema>

export const ConstellationsSchema = z.object({
  "name": z.string(),
  "c1": ConstellationSchema,
  "c2": ConstellationSchema,
  "c3": ConstellationSchema,
  "c4": ConstellationSchema,
  "c5": ConstellationSchema,
  "c6": ConstellationSchema,
})
export type Constellations = z.infer<typeof ConstellationsSchema>

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

export const BaseStatsSchema = z.object({
  "hp": z.number(),
  "attack": z.number(),
  "defense": z.number(),
  "critrate": z.number(),
  "critdmg": z.number(),
})
export type BaseStats = z.infer<typeof BaseStatsSchema>

export const StatsCurveSchema = z.object({
  "hp": z.string(),
  "attack": z.string(),
  "defense": z.string(),
})
export type StatsCurve = z.infer<typeof StatsCurveSchema>

export const PromotionSchema = z.object({
  "maxlevel": z.number(),
  "hp": z.number(),
  "attack": z.number(),
  "defense": z.number(),
  "specialized": z.number(),
})
export type Promotion = z.infer<typeof PromotionSchema>

export const CharacterStatsSchema = z.object({
  "base": BaseStatsSchema,
  "curve": StatsCurveSchema,
  "specialized": z.string(),
  "promotion": z.array(PromotionSchema),
})
export type CharacterStats = z.infer<typeof CharacterStatsSchema>

export const TalentStatsSchema = z.object({
  "combat1": z.record(z.string(), z.array(z.number())),
  "combat2": z.record(z.string(), z.array(z.number())),
  "combat3": z.record(z.string(), z.array(z.number())),
})
export type TalentStats = z.infer<typeof TalentStatsSchema>

export const StatsSchema = z.object({
  "character": CharacterStatsSchema,
  "talents": TalentStatsSchema,
})
export type Stats = z.infer<typeof StatsSchema>

export const CharacterSchema = z.object({
  info: CharacterInfoSchema,
  constellations: ConstellationsSchema,
  images: ImageSchema,
  stats: StatsSchema,
})
export type Character = z.infer<typeof CharacterSchema>

export const ImagesSchema = z.record(z.string(), ImageSchema)
export type Images = z.infer<typeof ImagesSchema>
