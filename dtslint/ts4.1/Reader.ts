import * as _ from '../../src/Reader'
import { pipe } from '../../src/function'

declare function modifyA<R extends { a: string }>(r: R): R

//
// local
//

// $ExpectType Reader<{ a: string; }, string>
pipe(
  _.of<string, { a: string }>('a'),
  _.local((env) => ({
    a: env.a
  }))
)

// $ExpectType Reader<{ b: string; }, string>
pipe(
  _.of<string, { a: string }>('a'),
  _.local((env: { b: string }) => ({
    a: env.b
  }))
)

// $ExpectType Reader<{ b: string; }, string>
pipe(
  _.of<string, { a: string; b: string }>('a'),
  _.local((env: { b: string }) => ({
    ...env,
    a: env.b
  }))
)

// $ExpectType Reader<{ a: string; b: string; }, string>
pipe(_.of<string, { a: string; b: string }>('a'), _.local(modifyA))

//
// chainW
//

// $ExpectType Reader<{ a: string; } & { b: number; }, number>
pipe(
  _.of<string, { a: string }>('a'),
  _.chainW(() => _.of<number, { b: number }>(1))
)

//
// Do
//

// $ExpectType Reader<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of<number, string>(1)),
  _.bind('a2', () => _.of<string, string>('b'))
)
