import { ReadonlyNonEmptyArray } from '../../src/ReadonlyNonEmptyArray';
import * as _ from '../../src/Task'
import { pipe } from '../../src/function'

declare const ras: ReadonlyArray<string>
declare const rneas: ReadonlyNonEmptyArray<string>
declare const ratas: ReadonlyArray<_.Task<string>>
declare const rneatas: ReadonlyNonEmptyArray<_.Task<string>>

//
// Do
//

// $ExpectType Task<{ a: number; b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of(1)),
  _.bind('b', () => _.of('b'))
)

//
// traverseArrayWithIndex
//

pipe(ras, _.traverseArrayWithIndex((_k, s) => _.of(s.length))) // $ExpectType Task<ReadonlyArray<number>>
pipe(rneas, _.traverseArrayWithIndex((_k, s) => _.of(s.length))) // $ExpectType Task<ReadonlyNonEmptyArray<number>>

//
// traverseArray
//

pipe(ras, _.traverseArray((s) => _.of(s.length))) // $ExpectType Task<ReadonlyArray<number>>
pipe(rneas, _.traverseArray((s) => _.of(s.length))) // $ExpectType Task<ReadonlyNonEmptyArray<number>>

//
// sequenceArray
//

pipe(ratas, _.sequenceArray) // $ExpectType Task<ReadonlyArray<string>>
pipe(rneatas, _.sequenceArray) // $ExpectType Task<ReadonlyNonEmptyArray<string>>

//
// traverseSeqArrayWithIndex
//

pipe(ras, _.traverseSeqArrayWithIndex((_k, s) => _.of(s.length))) // $ExpectType Task<ReadonlyArray<number>>
pipe(rneas, _.traverseSeqArrayWithIndex((_k, s) => _.of(s.length))) // $ExpectType Task<ReadonlyNonEmptyArray<number>>

//
// traverseArray
//

pipe(ras, _.traverseSeqArray((s) => _.of(s.length))) // $ExpectType Task<ReadonlyArray<number>>
pipe(rneas, _.traverseSeqArray((s) => _.of(s.length))) // $ExpectType Task<ReadonlyNonEmptyArray<number>>

//
// sequenceSeqArray
//

pipe(ratas, _.sequenceSeqArray) // $ExpectType Task<ReadonlyArray<string>>
pipe(rneatas, _.sequenceSeqArray) // $ExpectType Task<ReadonlyNonEmptyArray<string>>
