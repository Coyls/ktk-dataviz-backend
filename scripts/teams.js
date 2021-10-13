import csv from 'csvtojson';
const csvFilePath = '/home/coyls/Bureau/datavise/raw-data/jo.csv'
import fs from 'fs'

const jsonArray = await csv().fromFile(csvFilePath);

let checkCountry = []
let countries = []

jsonArray.forEach(c => {

    let exist = false

    if (checkCountry.findIndex(check => check === c.Team) !== -1) exist = true

    if (!exist) {
        checkCountry.push(c.Team)

        countries.push({
            name: c.Team,
            noc: c.NOC
        })
    }
})

console.log('countries', countries)
fs.writeFile('countries.json', JSON.stringify(countries), () => console.log("Countries create !"))

// COMMAND CSV
// json2csv -i ./datas/countries.json -f name -o ./datas/countries.csv