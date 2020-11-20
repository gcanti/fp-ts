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

// $ExpectType Reader<string, { a: number; b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of<string, number>(1)),
  _.bind('b', () => _.of<string, string>('b'))
)
