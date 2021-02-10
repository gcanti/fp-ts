import * as _ from '../../src/Json'

//
// stringify
//

// $ExpectError
_.stringify(undefined)
// $ExpectError
_.stringify(() => {})
// $ExpectError
_.stringify(Symbol())

// tslint:disable-next-line: interface-over-type-literal
type AB = {
  readonly a: string
  readonly b: number
}

const ab: AB = { a: 'a', b: 1 }

const abs: ReadonlyArray<AB> = [{ a: 'a', b: 1 }]

_.stringify({ a: 'a', b: 1 })
_.stringify(ab)
_.stringify([{ a: 'a', b: 1 }])
_.stringify(abs)
