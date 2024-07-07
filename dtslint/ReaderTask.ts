import { pipe } from '../src/function'
import * as RIO from '../src/ReaderIO'
import * as _ from '../src/ReaderTask'

interface R1 {
  foo: string
}

interface R2 {
  bar: string
}

//
// fromReaderIO
//

// $ExpectType ReaderTask<R1, boolean>
_.fromReaderIO(RIO.of<R1, boolean>(true))

//
// fromReaderIOK
//

// $ExpectType (a: boolean) => ReaderTask<R1, boolean>
_.fromReaderIOK((a: boolean) => RIO.of<R1, boolean>(a))

//
// chainReaderIOKW
//

// $ExpectType ReaderTask<R1 & R2, boolean>
pipe(
  _.of<R1, number>(1),
  _.chainReaderIOKW(() => RIO.of<R2, boolean>(true))
)

//
// chainReaderIOK
//

// $ExpectType ReaderTask<R1, number>
pipe(
  _.of<R1, number>(1),
  _.chainReaderIOK(() => RIO.of(1))
)

pipe(
  // @ts-expect-error
  _.of<R1, number>(1),
  _.chainReaderIOK(() => RIO.of<R2, boolean>(true))
)

//
// chainFirstReaderIOKW
//

// $ExpectType ReaderTask<R1 & R2, number>
pipe(
  _.of<R1, number>(1),
  _.chainFirstReaderIOKW(() => RIO.of<R2, boolean>(true))
)

//
// chainFirstReaderIOK
//

// $ExpectType ReaderTask<R1, number>
pipe(
  _.of<R1, number>(1),
  _.chainFirstReaderIOK(() => RIO.of(true))
)

pipe(
  // @ts-expect-error
  _.of<R1, number>(1),
  _.chainFirstReaderIOK(() => RIO.of<R2, boolean>(true))
)

//
// Do
//

// $ExpectType ReaderTask<unknown, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of<unknown, number>(1)),
  _.bind('a2', () => _.of<unknown, string>('b'))
)
