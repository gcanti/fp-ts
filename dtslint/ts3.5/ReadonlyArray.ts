import * as _ from '../../src/ReadonlyArray'
import { pipe } from '../../src/pipeable'

declare const rus: ReadonlyArray<unknown>
declare const rns: ReadonlyArray<number>
declare const rss: ReadonlyArray<string>
declare const rtns: ReadonlyArray<readonly [number, string]>

//
// zip
//

_.zip(rns, rss) // $ExpectType readonly (readonly [number, string])[]

//
// zipWith
//

_.zipWith(rns, rss, (n, s) => [n, s] as const) // $ExpectType readonly (readonly [number, string])[]

//
// unzip
//

_.unzip(rtns) // $ExpectType readonly [readonly number[], readonly string[]]
pipe(rtns, _.unzip) // $ExpectType readonly [readonly number[], readonly string[]]

//
// filter
//

// $ExpectType readonly number[]
pipe(
  rus,
  _.filter((u: unknown): u is number => typeof u === 'number')
)

//
// filterWithIndex
//

// $ExpectType readonly number[]
pipe(
  rus,
  _.filterWithIndex((_, u: unknown): u is number => typeof u === 'number')
)

//
// partition
//

// $ExpectType Separated<readonly unknown[], readonly number[]>
pipe(
  rus,
  _.partition((u: unknown): u is number => typeof u === 'number')
)

//
// partitionWithIndex
//

// $ExpectType Separated<readonly unknown[], readonly number[]>
pipe(
  rus,
  _.partitionWithIndex((_, u: unknown): u is number => typeof u === 'number')
)

//
// spanLeft
//

// $ExpectType Spanned<number, unknown>
pipe(
  rus,
  _.spanLeft((u: unknown): u is number => typeof u === 'number')
)
