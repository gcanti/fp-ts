import * as _ from '../../src/ReaderTaskEither'
import * as RIO from '../../src/ReaderIO'
import * as RT from '../../src/ReaderTask'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as IOE from '../../src/IOEither'
import { identity, pipe } from '../../src/function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean
declare const fsn: _.ReaderTaskEither<null, boolean, string | number>
declare const fn: _.ReaderTaskEither<null, boolean, number>

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderTaskEither<{ r1: 'r1' }, string, (n: number) => boolean>
declare const fa: _.ReaderTaskEither<{ r2: 'r2' }, Error, number>
// $ExpectType ReaderTaskEither<{ r1: "r1"; } & { r2: "r2"; }, string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// flatMap widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTaskEither<unknown, never, number>
pipe(
  _.right('a'),
  _.flatMap(() => _.right(1))
)

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, never, number>
pipe(
  _.right<string, { a: string }>('a'),
  _.flatMap(() => _.right<number, { b: number }>(1))
)

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.flatMap(() => _.right<number, { b: number }, number>(1))
)

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTaskEither<unknown, string | number, string>
pipe(sn, _.fromPredicate(isString, identity))

// $ExpectType ReaderTaskEither<unknown, Error, string>
pipe(
  sn,
  _.fromPredicate(
    isString,
    (
      _n // $ExpectType string | number
    ) => new Error()
  )
)

pipe(
  sn,
  _.fromPredicate(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    identity
  )
)

// -------------------------------------------------------------------------------------
// fromPredicate
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTaskEither<unknown, string | number, string | number>
pipe(sn, _.fromPredicate(predicate, identity))

// $ExpectType ReaderTaskEither<unknown, Error, string | number>
pipe(
  sn,
  _.fromPredicate(predicate, () => new Error())
)

// $ExpectType ReaderTaskEither<unknown, number, number>
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

// $ExpectType ReaderTaskEither<null, string | number | boolean, string>
pipe(fsn, _.filter(isString, identity))

// $ExpectType ReaderTaskEither<null, boolean | Error, string>
pipe(
  fsn,
  _.filter(
    isString,
    (
      _n // $ExpectType string | number
    ) => new Error()
  )
)

pipe(
  fsn,
  _.filter(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    identity
  )
)

// -------------------------------------------------------------------------------------
// filter
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTaskEither<null, string | number | boolean, string | number>
pipe(fsn, _.filter(predicate, identity))

// $ExpectType ReaderTaskEither<null, boolean | Error, string | number>
pipe(
  fsn,
  _.filter(predicate, () => new Error())
)

// $ExpectType ReaderTaskEither<null, number | boolean, number>
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
// rightReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, never, boolean>
_.rightReaderIO(RIO.of<boolean, { a: string }>(true))

//
// leftReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, boolean, never>
_.leftReaderIO(RIO.of<boolean, { a: string }>(true))

//
// getOrElse
//

// $ExpectType ReaderTask<{ a: string; }, string | null>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.getOrElse(() => null)
)

//
// getOrElseE
//

// $ExpectType ReaderTask<{ a: string; } & { b: number; }, string | null>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.getOrElseE(() => RT.of<null, { b: number }>(null))
)

//
// flatMapEitherK
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.flatMapEitherK(() => E.right<number, number>(1))
)

//
// flatMapTaskEitherK
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.flatMapTaskEitherK(() => TE.right<number, number>(1))
)

//
// flatMapIOEitherK
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.flatMapIOEitherK(() => IOE.right<number, number>(1))
)

//
// do notation
//

// $ExpectType ReaderTaskEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, { readonly a: number }, string>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bind('a3', () => _.right<boolean, { readonly b: string }, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType ReaderTaskEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, { readonly a: number }, string>(1),
  _.bindTo('a1'),
  _.apS('a2', _.right('b')),
  _.apS('a3', _.right<boolean, { readonly b: string }, number>(true))
)

//
// Do
//

// $ExpectType ReaderTaskEither<unknown, string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.right<number, unknown, string>(1)),
  _.bind('a2', () => _.right<string, unknown, string>('b'))
)

//
// filter
//

// $ExpectType ReaderTaskEither<{ c: boolean; }, "a1" | "a2", number>
pipe(
  _.left<'a1', { c: boolean }, number>('a1'),
  _.filter(
    (result) => result > 0,
    () => 'a2' as const
  )
)

//
// fromReaderIOK
//

// $ExpectType <E = never>(a: boolean) => ReaderTaskEither<{ a: string; }, E, boolean>
_.fromReaderIOK((a: boolean) => RIO.of<boolean, { a: string }>(a))

//
// flatMapReaderIOKW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, boolean>
pipe(
  _.right<number, { a: string }, string>(1),
  _.flatMapReaderIOKW(() => RIO.of<boolean, { b: number }>(true))
)

//
// flatMapReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.right<number, { a: string }, string>(1),
  _.flatMapReaderIOK(() => RIO.of(1))
)

pipe(
  _.right<number, { a: string }, string>(1),
  _.flatMapReaderIOK(() => RIO.of<boolean, { b: number }>(true)) // $ExpectError
)

//
// rightReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, never, boolean>
_.rightReaderIO(RIO.of<boolean, { a: string }>(true))

//
// leftReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, boolean, never>
_.leftReaderIO(RIO.of<boolean, { a: string }>(true))

//
// fromReaderIOK
//

// $ExpectType <E = never>(a: boolean) => ReaderTaskEither<{ a: string; }, E, boolean>
_.fromReaderIOK((a: boolean) => RIO.of<boolean, { a: string }>(a))

//
// flatMapReaderIOKW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, boolean>
pipe(
  _.right<number, { a: string }, string>(1),
  _.flatMapReaderIOKW(() => RIO.of<boolean, { b: number }>(true))
)

//
// flatMapReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.right<number, { a: string }, string>(1),
  _.flatMapReaderIOK(() => RIO.of(1))
)

pipe(
  _.right<number, { a: string }, string>(1),
  _.flatMapReaderIOK(() => RIO.of<boolean, { b: number }>(true)) // $ExpectError
)
