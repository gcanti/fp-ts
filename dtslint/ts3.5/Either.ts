import * as _ from '../../src/Either'
import { pipe, flow, identity } from '../../src/function'
import * as RA from '../../src/ReadonlyArray'

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
// do notation
//

// $ExpectType Either<string | number, { readonly a: number; readonly b: string; readonly c: boolean; }>
pipe(
  _.right<string, number>(1),
  _.bindTo('a'),
  _.bind('b', () => _.right('b')),
  _.bindW('c', () => _.right<number, boolean>(true))
)

//
// pipeable sequence S
//

// $ExpectType Either<string | number, { readonly a: number; readonly b: string; readonly c: boolean; }>
pipe(_.right<string, number>(1), _.bindTo('a'), _.apS('b', _.right('b')), _.apSW('c', _.right<number, boolean>(true)))

//
// Do
//

// $ExpectType Either<string, { readonly a: number; readonly b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of<string, number>(1)),
  _.bind('b', () => _.of<string, string>('b'))
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
// stringifyJSON
//

// $ExpectType Either<unknown, string>
pipe(
  _.right('a'),
  _.chainFirst((s) => _.stringifyJSON(s, identity))
)

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const n: number
declare const sn: string | number
declare const en: _.Either<boolean, number>
declare const esn: _.Either<boolean, string | number>
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean

//
// fromPredicate
//

// $ExpectType Either<boolean, string>
pipe(
  sn,
  _.fromPredicate(isString, () => false)
)
// $ExpectType Either<boolean, number>
pipe(
  n,
  _.fromPredicate(predicate, () => false)
)
// $ExpectType Either<boolean, number>
pipe(
  n,
  _.fromPredicate(
    (
      n // $ExpectType number
    ) => true,
    () => false
  )
)

//
// filterOrElse
//

// $ExpectType Either<boolean, string>
pipe(
  esn,
  _.filterOrElse(isString, () => false)
)
// $ExpectType Either<boolean, number>
pipe(
  en,
  _.filterOrElse(predicate, () => false)
)
// $ExpectType Either<boolean, number>
pipe(
  en,
  _.filterOrElse(
    (
      n // $ExpectType number
    ) => true,
    () => false
  )
)

//
// exists
//

declare const es: _.Either<string, number>[]
const x = pipe(es, RA.filter(_.exists((n) => n > 0)))
