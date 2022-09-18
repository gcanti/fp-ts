import * as _ from '../../src/ReaderEither'
import * as R from '../../src/Reader'
import * as E from '../../src/Either'
import { pipe } from '../../src/function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderEither<{ r1: 'r1' }, string, (n: number) => boolean>
declare const fa: _.ReaderEither<{ r2: 'r2' }, Error, number>
// $ExpectType ReaderEither<{ r1: "r1"; } & { r2: "r2"; }, string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// chain widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderEither<unknown, never, number>
pipe(
  _.right('a'),
  _.chain(() => _.right(1))
)

// $ExpectType ReaderEither<{ a: string; } & { b: number; }, never, number>
pipe(
  _.right<string, { a: string }>('a'),
  _.chain(() => _.right<number, { b: number }>(1))
)

// $ExpectType ReaderEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.chain(() => _.right<number, { b: number }, number>(1))
)

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType ReaderEither<unknown, string | number, string>
pipe(sn, _.fromRefinement(isString))
pipe(
  sn,
  _.fromRefinement(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number'
  )
)

// -------------------------------------------------------------------------------------
// fromPredicate
// -------------------------------------------------------------------------------------

// $ExpectType ReaderEither<unknown, string | number, string | number>
pipe(sn, _.fromPredicate(predicate))
// $ExpectType ReaderEither<unknown, number, number>
pipe(n, _.fromPredicate(predicate))
// $ExpectType ReaderEither<unknown, number, number>
pipe(
  n,
  _.fromPredicate(
    (
      _n // $ExpectType number
    ) => true
  )
)

//
// -------------------------------------------------------------------------------------
//

//
// getOrElse
//

// $ExpectType Reader<{ a: string; }, string | null>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.getOrElse(() => null)
)

//
// getOrElseE
//

// $ExpectType Reader<{ a: string; } & { b: number; }, string | null>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.getOrElseE(() => R.of<null, { b: number }>(null))
)

//
// chainEitherK
//

// $ExpectType ReaderEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.chainEitherK(() => E.right<number, number>(1))
)

//
// do notation
//

// $ExpectType ReaderEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, { readonly a: number }, string>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bind('a3', () => _.right<boolean, { readonly b: string }, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType ReaderEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, { readonly a: number }, string>(1),
  _.bindTo('a1'),
  _.apS('a2', _.right('b')),
  _.apS('a3', _.right<boolean, { readonly b: string }, number>(true))
)

//
// Do
//

// $ExpectType ReaderEither<unknown, string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.right<number, unknown, string>(1)),
  _.bind('a2', () => _.right<string, unknown, string>('b'))
)

//
// filterOrElse
//

// $ExpectType ReaderEither<{ c: boolean; }, "a1" | "a2", number>
pipe(
  _.left<'a1', { c: boolean }, number>('a1'),
  _.filterOrElse(
    (result) => result > 0,
    () => 'a2' as const
  )
)
