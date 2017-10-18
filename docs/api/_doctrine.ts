import { parse } from 'doctrine'

const result = parse(
  `/**
  * @function
  * @alias of
  */`,
  { unwrap: true }
)

console.log(result)
