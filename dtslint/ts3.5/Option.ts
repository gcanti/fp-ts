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

// $ExpectType Option<{ readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of(1)),
  _.bind('a2', () => _.of('b'))
)

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const n: number
declare const sn: string | number
declare const on: _.Option<number>
declare const osn: _.Option<string | number>
declare const isString: (u: unknown) => u is string
declare const isNumber: (sn: string | number) => sn is number
declare const predicate: (sn: string | number) => boolean

//
// filter
//

// $ExpectType Option<string>
pipe(osn, _.filter(isString))
// $ExpectType Option<number>
pipe(on, _.filter(predicate))
// $ExpectType Option<number>
pipe(
  on,
  _.filter(
    (
      x // $ExpectType number
    ) => true
  )
)

//
// partition
//

// $ExpectType Separated<Option<unknown>, Option<string>>
pipe(osn, _.partition(isString))
// $ExpectType Separated<Option<number>, Option<number>>
pipe(on, _.partition(predicate))
// $ExpectType Separated<Option<string | number>, Option<number>>
pipe(osn, _.partition(isNumber))
// $ExpectType Separated<Option<number>, Option<number>>
pipe(
  on,
  _.partition(
    (
      x // $ExpectType number
    ) => true
  )
)

//
// fromPredicate
//

// $ExpectType Option<string>
pipe(sn, _.fromPredicate(isString))
// $ExpectType Option<number>
pipe(n, _.fromPredicate(predicate))
// $ExpectType Option<number>
pipe(
  n,
  _.fromPredicate(
    (
      n // $ExpectType number
    ) => true
  )
)
