import * as _ from '../../src/Either'
import { pipe } from '../../src/pipeable'
import { flow } from '../../src/function'
import { monoidAll } from '../../src/Monoid'

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
flow(f, _.fromNullable('error'))('foo')

//
// Witherable overlodings
//

declare function isString(x: unknown): x is string
const W = _.getWitherable(monoidAll)

W.filter(_.right<boolean, string | number>(1), isString) // $ExpectType Either<boolean, string>
W.partition(_.right<boolean, string | number>(1), isString) // $ExpectType Separated<Either<boolean, string | number>, Either<boolean, string>>

//
// do notation
//

// $ExpectType Either<string | number, { a: number; b: string; c: boolean; }>
pipe(
  _.right<string, number>(1),
  _.bindTo('a'),
  _.bind('b', () => _.right('b')),
  _.bindW('c', () => _.right<number, boolean>(true))
)
