import * as fs from 'fs'
import * as csv from 'csvtojson'

const exec = async () => {
  const inputFile = `data/input.csv`
  const outputFile = `data/output.sql`

  console.log(`\nReading CSV data from ${inputFile}`)
  console.time('readFile')
  const data = await csv()
    .fromString(await fs.promises.readFile(inputFile, { encoding: 'utf-8' }))
    .on('error', err => {
      throw err
    })
  console.timeEnd('readFile')

  console.log(`Found ${data.length} rows in CSV`)

  const sqlStatements = data.map(x => `TEST ${x.firstName} TEST;`)

  console.log(`\nWriting SQL statements to ${outputFile}`)
  console.time('writeFile')
  await fs.promises.writeFile(outputFile, sqlStatements.join('\n'))
  console.timeEnd('writeFile')
  console.log('\n')
}

exec().catch(console.error)
