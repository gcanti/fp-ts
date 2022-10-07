import { pipe } from '../../src/Function'
import * as _ from '../../src/Iterable'
import * as readonlyRecord from '../../src/ReadonlyRecord'
import * as string from '../../src/string'

declare const d1: { [key: string]: number }
declare const r1: Readonly<Record<'a1' | 'a2', number>>

//
// reduceWithIndex
//

// $ExpectType string
pipe(
  d1,
  readonlyRecord.toEntries(string.Ord),
  _.reduceWithIndex('', (k: string, _n) => k)
)

// $ExpectType string
pipe(
  r1,
  readonlyRecord.toEntries(string.Ord),
  _.reduceWithIndex(
    '',
    (
      k, // $ExpectType "a1" | "a2"
      _n
    ) => k
  )
)

//
// foldMapWithIndex
//

// $ExpectType string
pipe(
  d1,
  readonlyRecord.toEntries(string.Ord),
  _.foldMapWithIndex(string.Monoid)((k: string, _n) => k)
)

// $ExpectType string
pipe(
  r1,
  readonlyRecord.toEntries(string.Ord),
  _.foldMapWithIndex(string.Monoid)(
    (
      k, // $ExpectType "a1" | "a2"
      _n // $ExpectType number
    ) => k
  )
)

//
// reduceRightWithIndex
//

// $ExpectType string
pipe(
  d1,
  readonlyRecord.toEntries(string.Ord),
  _.reduceRightWithIndex('', (k: string, _n) => k)
)

// $ExpectType string
pipe(
  r1,
  readonlyRecord.toEntries(string.Ord),
  _.reduceRightWithIndex(
    '',
    (
      k, // $ExpectType "a1" | "a2"
      _n, // $ExpectType number
      _b // $ExpectType string
    ) => k
  )
)
