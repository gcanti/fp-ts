import * as _ from '../../src/TaskOption'
import * as T from '../../src/Task'
import { pipe } from '../../src/function'

//
// getOrElseW
//

// $ExpectType Task<string | null>
pipe(
  _.some('a'),
  _.getOrElseW(() => null)
)

//
// getOrElseEW
//

// $ExpectType Task<string | null>
pipe(
  _.some('a'),
  _.getOrElseEW(() => T.of(null))
)

//
// matchW
//

// $ExpectType Task<number | boolean>
pipe(
  _.some('a'),
  _.matchW(
    () => 1,
    () => true
  )
)

//
// matchEW
//

// $ExpectType Task<number | boolean>
pipe(
  _.some('a'),
  _.matchEW(
    () => T.of(1),
    () => T.of(true)
  )
)

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const n: number
declare const sn: string | number
declare const on: _.TaskOption<number>
declare const osn: _.TaskOption<string | number>
declare const isString: (u: unknown) => u is string
declare const isNumber: (sn: string | number) => sn is number
declare const predicate: (sn: string | number) => boolean

//
// filter
//

// $ExpectType TaskOption<string>
pipe(osn, _.filter(isString))
// $ExpectType TaskOption<number>
pipe(on, _.filter(predicate))
// $ExpectType TaskOption<number>
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

// $ExpectType Separated<TaskOption<unknown>, TaskOption<string>>
pipe(osn, _.partition(isString))
// $ExpectType Separated<TaskOption<number>, TaskOption<number>>
pipe(on, _.partition(predicate))
// $ExpectType Separated<TaskOption<string>, TaskOption<number>>
pipe(osn, _.partition(isNumber))
// $ExpectType Separated<TaskOption<number>, TaskOption<number>>
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

// $ExpectType TaskOption<string>
pipe(sn, _.fromPredicate(isString))
// $ExpectType TaskOption<number>
pipe(n, _.fromPredicate(predicate))
// $ExpectType TaskOption<number>
pipe(
  n,
  _.fromPredicate(
    (
      n // $ExpectType number
    ) => true
  )
)
