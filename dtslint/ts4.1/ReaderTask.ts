import * as _ from '../../src/ReaderTask'
import { pipe } from '../../src/function'

declare function modifyA<R extends { a: string }>(r: R): R

//
// local
//

// $ExpectType ReaderTask<{ a: string; }, string>
pipe(
  _.of<string, { a: string }>('a'),
  _.local((env) => ({
    a: env.a
  }))
)

// $ExpectType ReaderTask<{ b: string; }, string>
pipe(
  _.of<string, { a: string }>('a'),
  _.local((env: { b: string }) => ({
    a: env.b
  }))
)

// $ExpectType ReaderTask<{ b: string; }, string>
pipe(
  _.of<string, { a: string; b: string }>('a'),
  _.local((env: { b: string }) => ({
    ...env,
    a: env.b
  }))
)

// $ExpectType ReaderTask<{ a: string; b: string; }, string>
pipe(_.of<string, { a: string; b: string }>('a'), _.local(modifyA))

//
// Do
//

// $ExpectType ReaderTask<unknown, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of<number, unknown>(1)),
  _.bind('a2', () => _.of<string, unknown>('b'))
)
