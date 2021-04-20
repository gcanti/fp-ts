import * as _ from '../../src/Reader'
import { pipe } from '../../src/function'

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

// $ExpectType Reader<string, { readonly a: number; readonly b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of<number, string>(1)),
  _.bind('b', () => _.of<string, string>('b'))
)
