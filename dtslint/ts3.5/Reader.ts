import * as _ from '../../src/Reader'
import { pipe } from '../../src/function'

//
// chainW
//

// $ExpectType Reader<{ a: string; } & { b: number; }, number>
pipe(
  _.of<{ a: string }, string>('a'),
  _.chainW(() => _.of<{ b: number }, number>(1))
)

//
// Do
//

// $ExpectType Reader<string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of<string, number>(1)),
  _.bind('a2', () => _.of<string, string>('b'))
)
