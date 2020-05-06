import * as _ from '../../src/ReaderTaskEither'
import * as RT from '../../src/ReaderTask'
import { pipe } from '../../src/pipeable'

//
// getOrElseW
//

// $ExpectType ReaderTask<{ a: string; } & { b: number; }, string | null>
pipe(
  _.right<{ a: string }, string, string>('a'),
  _.getOrElseW(() => RT.of<{ b: number }, null>(null))
)

//
// chainW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<{ a: string }, string, string>('a'),
  _.chainW(() => _.right<{ b: number }, number, number>(1))
)
