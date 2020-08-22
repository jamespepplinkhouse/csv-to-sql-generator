import * as fs from 'fs'
import * as csv from 'csvtojson'

const exec = async () => {
  const inputFile = `data/input.csv`

  const data = await csv()
    .fromString(await fs.promises.readFile(inputFile, { encoding: 'utf-8' }))
    .on('error', err => {
      throw err
    })

  console.log(`KEYS:\n\n${Object.keys(data[0]).join('\n')}\n\n`)
  console.log(`DATA EXAMPLE:\n\n${JSON.stringify(data[0], null, 2)}\n\n`)
}

exec().catch(console.error)
