import * as _ from '../../src/StateReaderTaskEither'
import { pipe } from '../../src/pipeable'

//
// chainW
//

// $ExpectType StateReaderTaskEither<boolean, { a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<boolean, { a: string }, string, string>('a'),
  _.chainW(() => _.right<boolean, { b: number }, number, number>(1))
)
