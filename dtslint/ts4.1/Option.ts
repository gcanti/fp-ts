import * as _ from '../../src/Option'
import { pipe, flow } from '../../src/function'

//
// getOrElseW
//

// $ExpectType string | null
pipe(
  _.some('a'),
  _.getOrElseW(() => null)
)

//
// fromNullable
//

declare const x: number | null | undefined
_.fromNullable(x) // $ExpectType Option<number>

interface D {
  foo: number | undefined
}
declare const f: <K extends keyof D>(key: K) => D[K]
// $ExpectType Option<number>
flow(f, _.fromNullable)('foo')

//
// Filterable overlodings
//

declare function isString(x: unknown): x is string

pipe(_.some<string | number>('a'), _.filter(isString)) // $ExpectType Option<string>
pipe(_.some<string | number>('a'), _.partition(isString)) // $ExpectType Separated<Option<unknown>, Option<string>>

//
// Do
//

// $ExpectType Option<{ readonly a: number; readonly b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of(1)),
  _.bind('b', () => _.of('b'))
)

//
// fromPredicate
//
declare const predicate: (u: unknown) => boolean
// $ExpectType Option<number>
pipe(1, _.fromPredicate(predicate))
