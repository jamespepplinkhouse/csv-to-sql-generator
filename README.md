# csv-to-sql-generator

1. Put CSV data in `data/input.csv`.
1. Run `yarn getinfo` to see keys and example data row.
1. Edit line 16 in `src/index.ts` - put the SQL to generate in there along with placeholders.
1. Run `yarn start` to generate SQL scripts.
1. Output data will appear in `data/output.sql
