import { left } from '../src/ReaderTaskEither'
import { Program, run } from './libs/program'

const main: Program<{}, void> = left(new Error('"npm publish" can not be directly run; please use "npm run release"\n'))

run(main({}))
