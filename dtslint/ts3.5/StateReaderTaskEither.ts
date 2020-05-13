import * as _ from '../../src/StateReaderTaskEither'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as RTE from '../../src/ReaderTaskEither'
import * as IOE from '../../src/IOEither'
import { pipe } from '../../src/pipeable'

//
// chainW
//

// $ExpectType StateReaderTaskEither<boolean, { a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<boolean, { a: string }, string, string>('a'),
  _.chainW(() => _.right<boolean, { b: number }, number, number>(1))
)

//
// chainEitherKW
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainEitherKW(() => E.right<number, number>(1))
)

//
// chainTaskEitherKW
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainTaskEitherKW(() => TE.right<number, number>(1))
)

//
// chainReaderTaskEitherKW
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainReaderTaskEitherKW(() => RTE.right<string, number, number>(1))
)

//
// chainIOEitherKW
//

// $ExpectType StateReaderTaskEither<string, string, string | number, number>
pipe(
  _.right<string, string, string, string>('a'),
  _.chainIOEitherKW(() => IOE.right<number, number>(1))
)
