import * as E from '../../src/Either'
import { pipe } from '../../src/function'
import * as _ from '../../src/Json'

//
// Show
//

// $ExpectError
_.Show.show(undefined)
// $ExpectError
_.Show.show(() => {})
// $ExpectError
_.Show.show(Symbol())
// $ExpectError
_.Show.show({ a: undefined })
// $ExpectError
_.Show.show({ ...{ a: undefined } })

//
// stringify
//

// $ExpectError
_.stringify<_.Json>(undefined)
// $ExpectError
_.stringify<_.Json>(() => {})
// $ExpectError
_.stringify<_.Json>(Symbol())
// $ExpectError
_.stringify<_.Json>({ a: undefined })
// $ExpectError
_.stringify<_.Json>({ ...{ a: undefined } })

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
