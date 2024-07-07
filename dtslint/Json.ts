import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as _ from '../src/Json'

//
// stringify
//

// @ts-expect-error
_.stringify<_.Json>(undefined)
// @ts-expect-error
_.stringify<_.Json>(() => {
  return
})
// @ts-expect-error
_.stringify<_.Json>(Symbol())
// @ts-expect-error
_.stringify<_.Json>({ a: undefined })
// @ts-expect-error
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
