import * as _ from '../../src/ReaderEither'
import * as R from '../../src/Reader'
import * as E from '../../src/Either'
import { identity, pipe } from '../../src/function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean
declare const fsn: _.ReaderEither<null, boolean, string | number>
declare const fn: _.ReaderEither<null, boolean, number>

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderEither<{ r1: 'r1' }, string, (n: number) => boolean>
declare const fa: _.ReaderEither<{ r2: 'r2' }, Error, number>
// $ExpectType ReaderEither<{ r1: "r1"; } & { r2: "r2"; }, string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderEither<unknown, never, number>
pipe(
  _.right('a'),
  _.flatMap(() => _.right(1))
)

// $ExpectType ReaderEither<{ a: string; } & { b: number; }, never, number>
pipe(
  _.right<string, { a: string }>('a'),
  _.flatMap(() => _.right<number, { b: number }>(1))
)

// $ExpectType ReaderEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.flatMap(() => _.right<number, { b: number }, number>(1))
)

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType ReaderEither<unknown, string | number, string>
pipe(sn, _.fromRefinement(isString, identity))

// $ExpectType ReaderEither<unknown, Error, string>
pipe(
  sn,
  _.fromRefinement(
    isString,
    (
      _n // $ExpectType string | number
    ) => new Error()
  )
)

pipe(
  sn,
  _.fromRefinement(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    identity
  )
)

// -------------------------------------------------------------------------------------
// fromPredicate
// -------------------------------------------------------------------------------------

// $ExpectType ReaderEither<unknown, string | number, string | number>
pipe(sn, _.fromPredicate(predicate, identity))

// $ExpectType ReaderEither<unknown, Error, string | number>
pipe(
  sn,
  _.fromPredicate(predicate, () => new Error())
)

// $ExpectType ReaderEither<unknown, number, number>
pipe(n, _.fromPredicate(predicate, identity))

pipe(
  n,
  _.fromPredicate(
    (
      _n // $ExpectType number
    ) => true,
    identity
  )
)

// -------------------------------------------------------------------------------------
// refine
// -------------------------------------------------------------------------------------

// $ExpectType ReaderEither<null, string | number | boolean, string>
pipe(fsn, _.refine(isString, identity))

// $ExpectType ReaderEither<null, boolean | Error, string>
pipe(
  fsn,
  _.refine(
    isString,
    (
      _n // $ExpectType string | number
    ) => new Error()
  )
)

pipe(
  fsn,
  _.refine(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    identity
  )
)

// -------------------------------------------------------------------------------------
// filter
// -------------------------------------------------------------------------------------

// $ExpectType ReaderEither<null, string | number | boolean, string | number>
pipe(fsn, _.filter(predicate, identity))

// $ExpectType ReaderEither<null, boolean | Error, string | number>
pipe(
  fsn,
  _.filter(predicate, () => new Error())
)

// $ExpectType ReaderEither<null, number | boolean, number>
pipe(fn, _.filter(predicate, identity))

pipe(
  fn,
  _.filter(
    (
      _n // $ExpectType number
    ) => true,
    identity
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
// flatMapEitherK
//

// $ExpectType ReaderEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.flatMapEitherK(() => E.right<number, number>(1))
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
// filter
//

// $ExpectType ReaderEither<{ c: boolean; }, "a1" | "a2", number>
pipe(
  _.left<'a1', { c: boolean }, number>('a1'),
  _.filter(
    (result) => result > 0,
    () => 'a2' as const
  )
)
