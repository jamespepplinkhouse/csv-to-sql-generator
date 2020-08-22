import * as fs from 'fs'
import * as csv from 'csvtojson'

const exec = async () => {
  const inputFile = `data/input.csv`
  const outputFile = `data/output.sql`

  const data = await csv()
    .fromString(await fs.promises.readFile(inputFile, { encoding: 'utf-8' }))
    .on('error', err => {
      throw err
    })

  console.log(JSON.stringify(data))

  const sqlStatements = data.map(x => `TEST ${x.firstName} TEST;`)

  await fs.promises.writeFile(outputFile, sqlStatements.join('\n'))
}

exec().catch(console.error)
