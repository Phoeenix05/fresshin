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
    const decoder = new TextDecoder("utf-8")
    const encoded_data = await Deno.readFile(temp_dir + "/data.min.json")
    const data = decoder.decode(encoded_data)
    const json = JSON.parse(data)

    const languages = ["ChineseSimplified", "English", "Japanese", "Korean"]
    languages.forEach((lang) => {
        const characters = Object.keys(json["data"][lang]["characters"])
        characters.forEach(async (character) => {
            const character_data = json["data"][lang]["characters"][character]
            const image_data = json["image"]["characters"][character]
            const data = JSON.stringify({
                data: character_data,
                images: image_data,
            })
            const encoder = new TextEncoder()
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
