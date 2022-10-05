import * as E from '../../src/Result'
import { pipe } from '../../src/Function'
import * as _ from '../../src/Json'

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

// $ExpectType Result<unknown, string>
pipe(E.succeed('a'), E.tap(_.stringify))
