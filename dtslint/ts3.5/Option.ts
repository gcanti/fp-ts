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
// Do
//

// $ExpectType Option<{ readonly a: number; readonly b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of(1)),
  _.bind('b', () => _.of('b'))
)

//
// filter
//

declare function isString(x: unknown): x is string

_.option.filter(_.some<string | number>('a'), isString) // $ExpectType Option<string>
pipe(_.some<string | number>('a'), _.filter(isString)) // $ExpectType Option<string>

//
// partition
//
_.option.partition(_.some<string | number>('a'), isString) // $ExpectType Separated<Option<string | number>, Option<string>>
pipe(_.some<string | number>('a'), _.partition(isString)) // $ExpectType Separated<Option<unknown>, Option<string>>
