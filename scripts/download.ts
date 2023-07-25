#!/usr/bin/env deno run --allow-all

import { load } from "$std/dotenv/mod.ts";
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
    // Initialize file encoder and decoder
    const encoder = new TextEncoder()
    const decoder = new TextDecoder("utf-8")
    
    // Read the data from a file
    const encoded_data = await Deno.readFile(temp_dir + "/data.min.json")
    const json = JSON.parse(decoder.decode(encoded_data))
    await Deno.writeFile(`../resources/images.min.json`, encoder.encode(JSON.stringify(json["image"]["characters"])))

    const languages = ["ChineseSimplified", "English", "Japanese", "Korean"]
    languages.forEach(async (lang) => {
        // Get a list of available characters
        const characters = Object.keys(json["data"][lang]["characters"])
        
        // Save the list of available characters to a file
        const file_name = `../resources/${lang.toLowerCase()}-characters.min.json`
        await Deno.writeFile(file_name, encoder.encode(JSON.stringify(characters)))
        
        // Iterate over every character in the list and parse their data
        characters.forEach(async (character) => {
            const data = JSON.stringify({
                info: json["data"][lang]["characters"][character],
                constellations: json["data"][lang]["constellations"][character],
                images: json["image"]["characters"][character],
                stats: {
                    character: json["stats"]["characters"][character],
                    talents: json["stats"]["talents"][character],
                }
            })
            const encoded_data = encoder.encode(data)
            const file_name = `../resources/${lang.toLowerCase()}-${character.toLowerCase()}.min.json`
            await Deno.writeFile(file_name, encoded_data)
        })
    })
}

async function download_images() {
    const download_image = async (image: string) => {
        const url = `${env["IMAGE_URL"]}/${image}.png`
        const dest: Destination = {
            file: `${image}.png`,
            dir: "../resources/images"
        }

        await download(url, dest)
            .then(_ => console.log(`Downloaded '${image}' succesfully`))
            .catch(_ => console.log(`Failed to download ${image}`))
    }
    
    const env = await load({ envPath: "../.env" })
    const decoder = new TextDecoder("utf-8")

    // Read the data from a file
    const encoded_data = await Deno.readFile("../resources/images.min.json")
    const json = JSON.parse(decoder.decode(encoded_data))
    const characters = Object.keys(json)

    characters.forEach(async (character) => {
        await download_image(json[character]["nameicon"])
        await download_image(json[character]["namegachasplash"])
        await download_image(json[character]["namegachaslice"])
    })
}

function cleanup() {
    Deno.remove(temp_dir, { recursive: true }) // remove the temporary directory
}

//// Script main function or something like that

const temp_dir = await Deno.makeTempDir({ prefix: "fresshin_temp" })

await download_data() // Download 'github:theBowja/genshin-db-dist/.../data.min.json'
await download_images()

try {
    await parse_data()
} catch (err) {
    console.log(err)
}

cleanup()
