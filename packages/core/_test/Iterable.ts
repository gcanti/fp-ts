import { pipe } from '@fp-ts/core/Function'
import * as _ from '@fp-ts/core/Iterable'
import * as number from '@fp-ts/core/number'
import * as O from '@fp-ts/core/Option'
import * as string from '@fp-ts/core/string'
import * as U from '@fp-ts/core/test/util'

describe('Iterable', () => {
  it('empty', () => {
    U.deepStrictEqual(Array.from(_.empty), [])
  })

  it('map', () => {
    U.deepStrictEqual(
      Array.from(
        pipe(
          [1, 2, 3],
          _.map((n) => n * 2)
        )
      ),
      [2, 4, 6]
    )
  })

  it('foldMap', () => {
    U.deepStrictEqual(
      pipe(
        [1, 2, 3],
        _.foldMap(number.MonoidSum)((n) => n * 2)
      ),
      12
    )
  })

  it('reduceWithIndex', () => {
    U.deepStrictEqual(
      pipe(
        new Map([
          ['a', 'c'],
          ['b', 'd']
        ]),
        _.reduceWithIndex('-', (k, b, a) => b + k + a)
      ),
      '-acbd'
    )
  })

  it('foldMapWithIndex', () => {
    U.deepStrictEqual(
      pipe(
        new Map([
          ['a', 'c'],
          ['b', 'd']
        ]),
        _.foldMapWithIndex(string.Monoid)((k, a) => k + a)
      ),
      'acbd'
    )
  })

  it('reduceRightWithIndex', () => {
    U.deepStrictEqual(
      pipe(
        new Map([
          ['a', 'c'],
          ['b', 'd']
        ]),
        _.reduceRightWithIndex('-', (k, a, b) => b + k + a)
      ),
      '-bdac'
    )
  })

  it('filterMap', () => {
    U.deepStrictEqual(
      Array.from(
        pipe(
          [1, 2, 3],
          _.filterMap((n) => (n < 3 ? O.some(n) : O.none))
        )
      ),
      [1, 2]
    )
  })

  it('intercalate', () => {
    const intercalate = _.intercalate(string.Monoid)
    U.deepStrictEqual(pipe(['a', 'b', 'c'], intercalate(',')), 'a,b,c')
  })

  it('reduceKind', () => {
    const f = _.reduceKind(O.Flattenable)
    U.deepStrictEqual(
      pipe(
        [],
        f(O.some(1), () => O.none)
      ),
      O.some(1)
    )
    U.deepStrictEqual(
      pipe(
        [2],
        f(O.some(1), () => O.none)
      ),
      O.none
    )
    U.deepStrictEqual(
      pipe(
        [2],
        f(O.some(1), (b, a) => O.some(b + a))
      ),
      O.some(3)
    )
  })

  it('traverseWithIndex', () => {
    U.deepStrictEqual(
      pipe(
        ['a', 'bb'],
        _.toEntries,
        _.traverseWithIndex(O.Applicative)((i, s) => (s.length >= 1 ? O.some(s + i) : O.none)),
        O.map(Array.from)
      ),
      O.some(['a0', 'bb1'])
    )
    U.deepStrictEqual(
      pipe(
        ['a', 'bb'],
        _.toEntries,
        _.traverseWithIndex(O.Applicative)((i, s) => (s.length > 1 ? O.some(s + i) : O.none)),
        O.map(Array.from)
      ),
      O.none
    )
  })
})
