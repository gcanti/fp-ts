import * as _ from '../../src/Either'
import { pipe, flow } from '../../src/function'
import { MonoidAll } from '../../src/boolean'

//
// toUnion
//

// $ExpectType string | number
_.toUnion(_.right<number, string>(1))

//
// getOrElseW
//

// $ExpectType string | null
pipe(
  _.right('a'),
  _.getOrElseW(() => null)
)

//
// chainW
//

// $ExpectType Either<string | number, number>
pipe(
  _.right<string, string>('a'),
  _.chainW(() => _.right<number, number>(1))
)

//
// fromNullable
//

interface D {
  foo: number | undefined
}
declare const f: <K extends keyof D>(key: K) => D[K]

// $ExpectType Either<string, number>
flow(
  f,
  _.fromNullable(() => 'error')
)('foo')

//
// Filterable overlodings
//

declare function isString(x: unknown): x is string
const W = _.getFilterable(MonoidAll)

pipe(_.right<string | number, boolean>(1), W.filter(isString)) // $ExpectType Either<boolean, string>
pipe(_.right<string | number, boolean>(1), W.partition(isString)) // $ExpectType Separated<Either<boolean, unknown>, Either<boolean, string>>

//
// do notation
//

// $ExpectType Either<string | number, { a: number; b: string; c: boolean; }>
pipe(
  _.right<number, string>(1),
  _.bindTo('a'),
  _.bind('b', () => _.right('b')),
  _.bindW('c', () => _.right<boolean, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType Either<string | number, { a: number; b: string; c: boolean; }>
pipe(_.right<number, string>(1), _.bindTo('a'), _.apS('b', _.right('b')), _.apSW('c', _.right<boolean, number>(true)))

//
// Do
//

// $ExpectType Either<string, { a: number; b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.right<number, string>(1)),
  _.bind('b', () => _.right<string, string>('b'))
)

//
// filterOrElseW
//

// $ExpectType Either<"a" | "b", number>
pipe(
  _.left<'a', number>('a'),
  _.filterOrElseW(
    (result) => result > 0,
    () => 'b' as const
  )
)

//
// fromPredicate
//

// $ExpectType (a: string | number) => Either<string | number, string>
_.fromPredicate((u: string | number): u is string => typeof u === 'string')
