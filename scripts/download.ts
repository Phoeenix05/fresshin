#!/usr/bin/env deno run --allow-env

import { Destination, download } from 'https://deno.land/x/download@v2.0.2/mod.ts'
import { confirm } from 'https://deno.land/x/inquirer@v0.0.4/mod.ts'

async function download_data() {
    const url = "https://raw.githubusercontent.com/theBowja/genshin-db-dist/main/data/standard/data.min.json"
    const dest: Destination = {
        file: "data.min.json",
        dir: "./resources"
    }
    await download(url, dest)
        .then(_ => console.log("Downloaded 'data.min.json' succesfully"))
        .catch(err => console.log(err))
}

await (async () => {
    if (!await confirm({ message: 'This script will ask permissions for everything.' }))
        return
    console.log('Depending on your internet speed this script might take upto couple of minutes.')

    if (!Deno.cwd().endsWith("fresshin")) {
        console.log("This script should be ran in the root of the project. (/<path>/fresshin)")
        return
    }

    await download_data()
})()
