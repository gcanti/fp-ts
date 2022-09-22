import * as _ from '../../src/StateReaderTaskEither'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as RTE from '../../src/ReaderTaskEither'
import * as IOE from '../../src/IOEither'
import { identity, pipe } from '../../src/function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean
declare const fsn: _.StateReaderTaskEither<undefined, null, boolean, string | number>
declare const fn: _.StateReaderTaskEither<undefined, null, boolean, number>

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.StateReaderTaskEither<null, { r1: 'r1' }, string, (n: number) => boolean>
declare const fa: _.StateReaderTaskEither<null, { r2: 'r2' }, Error, number>
// $ExpectType StateReaderTaskEither<null, { r1: "r1"; } & { r2: "r2"; }, string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType StateReaderTaskEither<unknown, unknown, never, number>
pipe(
  _.right('a'),
  _.flatMap(() => _.right(1))
)

// $ExpectType StateReaderTaskEither<null, { a: string; } & { b: number; }, never, number>
pipe(
  _.right<string, null, { a: string }>('a'),
  _.flatMap(() => _.right<number, null, { b: number }>(1))
)

// $ExpectType StateReaderTaskEither<null, { a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<string, null, { a: string }, string>('a'),
  _.flatMap(() => _.right<number, null, { b: number }, number>(1))
)

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType StateReaderTaskEither<unknown, unknown, string | number, string>
pipe(sn, _.fromRefinement(isString, identity))

// $ExpectType StateReaderTaskEither<unknown, unknown, Error, string>
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

// $ExpectType StateReaderTaskEither<unknown, unknown, string | number, string | number>
pipe(sn, _.fromPredicate(predicate, identity))

// $ExpectType StateReaderTaskEither<unknown, unknown, Error, string | number>
pipe(
  sn,
  _.fromPredicate(predicate, () => new Error())
)

// $ExpectType StateReaderTaskEither<unknown, unknown, number, number>
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

// $ExpectType StateReaderTaskEither<undefined, null, string | number | boolean, string>
pipe(fsn, _.refine(isString, identity))

// $ExpectType StateReaderTaskEither<undefined, null, boolean | Error, string>
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

// $ExpectType StateReaderTaskEither<undefined, null, string | number | boolean, string | number>
pipe(fsn, _.filter(predicate, identity))

// $ExpectType StateReaderTaskEither<undefined, null, boolean | Error, string | number>
pipe(
  fsn,
  _.filter(predicate, () => new Error())
)

// $ExpectType StateReaderTaskEither<undefined, null, number | boolean, number>
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
// flatMapEitherK
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.flatMapEitherK(() => E.right<number, number>(1))
)

//
// flatMapTaskEitherK
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.flatMapTaskEitherK(() => TE.right<number, number>(1))
)

//
// flatMapReaderTaskEitherK
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.flatMapReaderTaskEitherK(() => RTE.right<number, string, number>(1))
)

//
// flatMapIOEitherK
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.flatMapIOEitherK(() => IOE.right<number, number>(1))
)

//
// do notation
//

// $ExpectType StateReaderTaskEither<void, { readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, void, { readonly a: number }, string>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bind('a3', () => _.right<boolean, void, { readonly b: string }, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType StateReaderTaskEither<void, { readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, void, { readonly a: number }, string>(1),
  _.bindTo('a1'),
  _.apS('a2', _.right('b')),
  _.apS('a3', _.right<boolean, void, { readonly b: string }, number>(true))
)

//
// filter
//

// $ExpectType StateReaderTaskEither<{ d: Date; }, { c: boolean; }, "a1" | "a2", number>
pipe(
  _.left<'a1', { d: Date }, { c: boolean }, number>('a1'),
  _.filter(
    (result) => result > 0,
    () => 'a2' as const
  )
)
