#!/usr/bin/env deno run --allow-all

import { load } from "https://deno.land/std@0.194.0/dotenv/mod.ts";
import { Destination, download } from "https://deno.land/x/download@v2.0.2/mod.ts";
import { confirm } from "https://deno.land/x/inquirer@v0.0.4/mod.ts";
import { z } from "zod";

async function download_data() {
    const url = "https://raw.githubusercontent.com/theBowja/genshin-db-dist/main/data/standard/data.min.json"
    const dest: Destination = {
        file: "data.min.json",
        dir: temp_dir
    }

    await download(url, dest)
        .then(_ => console.log("Downloaded 'data.min.json' succesfully"))
        .catch(err => console.log(err))
}

async function parse_data() {
    const decoder = new TextDecoder("utf-8")
    const encoded_data = await Deno.readFile(temp_dir + "/data.min.json")
    const data = decoder.decode(encoded_data)
    const json = JSON.parse(data)
    // const languages = Object.keys(json["data"]) // Languages other than english are ignored for now
    const characters = Object.keys(json["data"]["English"]["characters"])
    // console.log(await CharacterSchema.safeParseAsync(json["data"]["English"]["characters"][characters[49]]))

    characters.forEach(async (character) => {
        const character_data = json["data"]["English"]["characters"][character]
        const image_data = json["image"]["characters"][character]
        const character_status = await CharacterSchema.safeParseAsync(character_data)
        const image_status = await CharacterImageSchema.safeParseAsync(image_data)
        if (character_status.success && image_status.success) {
            const data = JSON.stringify({
                data: character_status.data,
                images: image_status.data,
            })
            const encoder = new TextEncoder()
            // TODO: Add the ability to change the prefix of the file. "english"
            Deno.writeFile(`../resources/english-${character}.min.json`, encoder.encode(data))
        } else {
            console.log(`Data validation error: ${character}`)
        }
    })
}

function cleanup() {
    Deno.remove(temp_dir, { recursive: true }) // remove the temporary directory
}

//// Typedefs for well some sort of data validation
const WeaponTypeSchema = z.enum(["Sword", "Claymore", "Polearm", "Bow", "Catalyst"])
const RegionSchema = z.enum(["", "Mondstadt", "Liyue", "Inazuma", "Sumeru", "Fontaine", "Natlan", "Snezhnaya", "Khaenri'ah"])

const CharacterSchema = z.object({
    name: z.string(),
    fullname: z.string(),
    title: z.string(),
    description: z.string(),
    rarity: z.string(),
    element: z.enum(["None", "Geo", "Pyro", "Dendro", "Electro", "Cryo", "Hydro", "Anemo"]),
    weapontype: WeaponTypeSchema,
    substat: z.string(), // Change to enum at some point
    gender: z.enum(["Male", "Female"]),
    body: z.string(), // Change to enum at some point
    association: z.string(), // Change to enum at some point
    region: RegionSchema,
    affiliation: z.string(), // There are too many affiliations to make this into a enum
    birthdaymmdd: z.string(),
    birthday: z.string(),
    constellation: z.string(),
    cv: z.object({
        english: z.string(),
        chinese: z.string(),
        japanese: z.string(),
        korean: z.string(),
    }),
    costs: z.record(z.string(), z.array(
        z.object({
            name: z.string(),
            count: z.number(),
        })
    )),
})
type Character = z.infer<typeof CharacterSchema>

const CharacterImageSchema = z.object({
    image: z.string().url().optional(),
    card: z.string().url().optional(),
    protrait: z.string().url().optional(),
    icon: z.string().url().optional(),
    sideicon: z.string().url().optional(),
    cover1: z.string().url().optional(),
    cover2: z.string().url().optional(),
    "hoyolab-avatar": z.string().url().optional(),
    nameicon: z.string().optional(),
    nameiconcard: z.string().optional(),
    namegachasplash: z.string().optional(),
    namegachaslice: z.string().optional(),
    namesideicon: z.string().optional(),
})
type CharacterImages = z.infer<typeof CharacterImageSchema>

//// Script main function or something like that

const env = await load({ envPath: "./.env.local" })

if (!env["FRESSHIN_DATA_SCRIPT_CHECKED"]) {
    if (!await confirm({
        message: "Please check what this script does before actually running it.",
        default: false
    })) Deno.exit(1)
}

// Disable the "have you check this script" prompt
try {
    await Deno.stat("./.env.local")
} catch {
    const encoder = new TextEncoder();
    await Deno.writeFile("./.env.local", encoder.encode("FRESSHIN_DATA_SCRIPT_CHECKED=true"))
}

const temp_dir = await Deno.makeTempDir({ prefix: "fresshin_temp" })

await download_data() // Download 'github:theBowja/genshin-db-dist/.../data.min.json'
// const data = await Deno.readFile(temp_dir + "/data.min.json") // This is here just to check if the downlaoded file exists

try {
    await parse_data()
} catch (err) {
    console.log(err)
}

cleanup()
