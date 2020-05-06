import * as _ from '../../src/ReaderEither'
import * as R from '../../src/Reader'
import { pipe } from '../../src/pipeable'

//
// getOrElseW
//

// $ExpectType Reader<{ a: string; } & { b: number; }, string | null>
pipe(
  _.right<{ a: string }, string, string>('a'),
  _.getOrElseW(() => R.of<{ b: number }, null>(null))
)

//
// chainW
//

// $ExpectType ReaderEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<{ a: string }, string, string>('a'),
  _.chainW(() => _.right<{ b: number }, number, number>(1))
)
