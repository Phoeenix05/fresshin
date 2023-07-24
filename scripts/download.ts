#!/usr/bin/env deno run --allow-all

import { Destination, download } from "https://deno.land/x/download@v2.0.2/mod.ts";

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
    const encoder = new TextEncoder()
    const decoder = new TextDecoder("utf-8")
    const encoded_data = await Deno.readFile(temp_dir + "/data.min.json")
    const json = JSON.parse(decoder.decode(encoded_data))
    await Deno.writeFile(`../resources/images.min.json`, encoder.encode(JSON.stringify(json["image"]["characters"])))

    const languages = ["ChineseSimplified", "English", "Japanese", "Korean"]
    languages.forEach(async (lang) => {
        const characters = Object.keys(json["data"][lang]["characters"])
        const data = JSON.stringify(characters)
        await Deno.writeFile(`../resources/${lang.toLowerCase()}-characters.min.json`, encoder.encode(data))
        characters.forEach(async (character) => {
            const character_info = json["data"][lang]["characters"][character]
            const constellations = json["data"][lang]["constellations"][character]
            const image_data = json["image"]["characters"][character]
            const stats = json["stats"]["characters"][character]
            const talent_stats = json["stats"]["talents"][character]
            const data = JSON.stringify({
                info: character_info,
                constellations: constellations,
                images: image_data,
                stats: {
                    character: stats,
                    talents: talent_stats,
                }
            })
            await Deno.writeFile(`../resources/${lang.toLowerCase()}-${character.toLowerCase()}.min.json`, encoder.encode(data))
        })
    })
}

function cleanup() {
    Deno.remove(temp_dir, { recursive: true }) // remove the temporary directory
}

//// Script main function or something like that

const temp_dir = await Deno.makeTempDir({ prefix: "fresshin_temp" })

await download_data() // Download 'github:theBowja/genshin-db-dist/.../data.min.json'

try {
    await parse_data()
} catch (err) {
    console.log(err)
}

cleanup()
