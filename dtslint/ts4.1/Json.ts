import * as _ from '../../src/Json'
import * as E from '../../src/Either'
import { flow, pipe } from '../../src/function'

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

// tslint:disable-next-line: interface-over-type-literal
interface AB {
  readonly a: string
  readonly b: number
}

const ab: AB = { a: 'a', b: 1 }

const abs: ReadonlyArray<AB> = [{ a: 'a', b: 1 }]

_.stringify({ a: 'a', b: 1 })
_.stringify(ab)
_.stringify([{ a: 'a', b: 1 }])
_.stringify(abs)

// $ExpectType Either<unknown, string>
pipe(E.right('a'), E.chainFirst(_.stringify))
