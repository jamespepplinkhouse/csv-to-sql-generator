import * as fs from 'fs'
import * as csv from 'csvtojson'
import * as R from 'remeda'

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

  const sqlStatements = data.map(x => {
    const postcodes = R.pipe(
      (x.postcodes as string).split(','),
      R.uniq(),
      R.sortBy(x => x),
      R.map(x => x.trim())
    )

    return `INSERT INTO public.zones (name,company_id,created_by,updated_by,postcode_ids,account_ids,zone_code) VALUES ('${
      x.zoneName
    }','cb1ca184-1a24-494a-a9d3-7345e3f48cb3','auth0|59c21075e41fc65d26b9689b','auth0|59c21075e41fc65d26b9689b','${JSON.stringify(
      postcodes
    )}','["17f8422a-5923-4a04-9eff-3b97d9247a08", "fe5f1d7a-a167-45ab-b6e5-af8aba4b4248", "eb83e043-2280-4414-9279-af2c00a30e76", "f1bf9b8b-2ebd-4ce4-a9da-3353ba326e25", "323f91a6-bf3f-4cd5-b608-3522401d1340", "5bf3591c-bfb0-4b86-9366-787696c28941", "ec89540e-8167-45a9-a6f8-6578b6baed39"]','${
      x.abbrev
    }');`
  })

  console.log(`\nWriting SQL statements to ${outputFile}`)
  console.time('writeFile')
  await fs.promises.writeFile(outputFile, sqlStatements.join('\n'))
  console.timeEnd('writeFile')
  console.log('\n')
}

exec().catch(console.error)
