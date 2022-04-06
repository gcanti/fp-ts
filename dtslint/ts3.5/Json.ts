import * as E from '../../src/Either'
import { pipe } from '../../src/function'
import * as _ from '../../src/Json'

declare const jr: _.JsonRecord

//
// JsonRecord
//

// $ExpectType string | number | boolean | JsonRecord | JsonArray | null | undefined
jr.foo

//
// stringify
//

// $ExpectError
_.stringify<_.Json>(undefined)
// $ExpectError
_.stringify<_.Json>(() => {})
// $ExpectError
_.stringify<_.Json>(Symbol())

// tslint:disable-next-line: interface-over-type-literal
interface AB {
  readonly a: string
  readonly b: number
}

const ab: AB = { a: 'a', b: 1 }

const abs: ReadonlyArray<AB> = [{ a: 'a', b: 1 }]

_.stringify({ a: 'a', b: 1 })
_.stringify(ab)
_.stringify({ ...ab })
_.stringify([{ a: 'a', b: 1 }])
_.stringify(abs)
_.stringify([...abs])

// $ExpectType Either<unknown, string>
pipe(E.right('a'), E.chainFirst(_.stringify))
