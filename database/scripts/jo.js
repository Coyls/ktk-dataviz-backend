import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const csvFilePath = env.DATA_RAW + 'JO.csv'
const jsonFilePath = env.DATA_JSON + 'jo.json'

const citiesFilePath = env.DATA_JSON + 'city.json'

const cities = require(citiesFilePath)
const jsonArray = await csv().fromFile(csvFilePath);

let jos = []
let joId = 0

jsonArray.forEach(jo => {

    const { id } = cities.find(city => city.name === jo.City)

    const joToPush = {
        year: jo.Year,
        id_city: id,
        season: jo.Season.toLowerCase()
    }

    if (jos.findIndex(({ year, id_city, season }) => year === joToPush.year && id_city === joToPush.id_city && season === joToPush.season) === -1) {
        jos.push({ id: joId, ...joToPush })
        joId++
    }



})

console.log(jos.length + " jos has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(jos), () => console.log("jo.csv created !"))