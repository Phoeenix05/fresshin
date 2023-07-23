export type CharacterInfo = {
  name: string
  title: string
  vision: string
  weapon: string
  nation: string
  affiliation: string
  rarity: number
  constellation: string
  birthday: string
  description: string
  skillTalents: SkillTalent[]
  passiveTalents: PassiveTalent[]
  constellations: Constellation[]
}

export type SkillTalent = {
  name: string
  unlocK: string
  description: string
  type: "NORMAL_ATTACK" | "ELEMENTAL_SKILL" | "ELEMENTAL_BURST"
}

export type PassiveTalent = {
  name: string
  unlock: string
  description: string
  level?: number
}

export type Constellation = {
  name: string
  unlock: string
  description: string
  level: number
}

export type ArtifactInfo = {
  name: string
  max_rarity: number
  "2-piece_bonus": string
  "4-piece_bonus": string
}

export const ArtifactTypes = [
  "circlet-of-logos",
  "flower-of-life",
  "goblet-of-eonothem",
  "plume-of-death",
  "sands-of-eon",
]
