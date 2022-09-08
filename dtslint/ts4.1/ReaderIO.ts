import * as _ from '../../src/ReaderIO'
import { pipe } from '../../src/function'

declare function modifyA<R extends { a: string }>(r: R): R

//
// local
//

// $ExpectType ReaderIO<{ a: string; }, string>
pipe(
  _.of<string, { a: string }>('a'),
  _.local((env) => ({
    a: env.a
  }))
)

// $ExpectType ReaderIO<{ b: string; }, string>
pipe(
  _.of<string, { a: string }>('a'),
  _.local((env: { b: string }) => ({
    a: env.b
  }))
)

// $ExpectType ReaderIO<{ b: string; }, string>
pipe(
  _.of<string, { a: string; b: string }>('a'),
  _.local((env: { b: string }) => ({
    ...env,
    a: env.b
  }))
)

// $ExpectType ReaderIO<{ a: string; b: string; }, string>
pipe(_.of<string, { a: string; b: string }>('a'), _.local(modifyA))
