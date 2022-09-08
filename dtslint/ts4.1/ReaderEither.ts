import * as _ from '../../src/ReaderEither'
import * as R from '../../src/Reader'
import * as E from '../../src/Either'
import { pipe } from '../../src/function'

declare function modifyA<R extends { a: string }>(r: R): R

//
// local
//

// $ExpectType ReaderEither<{ a: string; }, number, string>
pipe(
  _.of<string, { a: string }, number>('a'),
  _.local((env) => ({
    a: env.a
  }))
)

// $ExpectType ReaderEither<{ b: string; }, number, string>
pipe(
  _.of<string, { a: string }, number>('a'),
  _.local((env: { b: string }) => ({
    a: env.b
  }))
)

// $ExpectType ReaderEither<{ b: string; }, number, string>
pipe(
  _.of<string, { a: string; b: string }, number>('a'),
  _.local((env: { b: string }) => ({
    ...env,
    a: env.b
  }))
)

// $ExpectType ReaderEither<{ a: string; b: string; }, number, string>
pipe(_.of<string, { a: string; b: string }, number>('a'), _.local(modifyA))

//
// getOrElseW
//

// $ExpectType Reader<{ a: string; }, string | null>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.getOrElseW(() => null)
)

//
// getOrElseEW
//

// $ExpectType Reader<{ a: string; } & { b: number; }, string | null>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.getOrElseEW(() => R.of<null, { b: number }>(null))
)

//
// chainW
//

// $ExpectType ReaderEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.chainW(() => _.right<number, { b: number }, number>(1))
)

//
// chainEitherKW
//

// $ExpectType ReaderEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.chainEitherKW(() => E.right<number, number>(1))
)

//
// do notation
//

// $ExpectType ReaderEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, { readonly a: number }, string>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bindW('a3', () => _.right<boolean, { readonly b: string }, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType ReaderEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, { readonly a: number }, string>(1),
  _.bindTo('a1'),
  _.apS('a2', _.right('b')),
  _.apSW('a3', _.right<boolean, { readonly b: string }, number>(true))
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
// filterOrElseW
//

// $ExpectType ReaderEither<{ c: boolean; }, "a1" | "a2", number>
pipe(
  _.left<'a1', { c: boolean }, number>('a1'),
  _.filterOrElseW(
    (result) => result > 0,
    () => 'a2' as const
  )
)
