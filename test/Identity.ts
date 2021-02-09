import * as U from './util'
import { left, right } from '../src/Either'
import * as N from '../src/number'
import { identity, pipe } from '../src/function'
import * as _ from '../src/Identity'
import * as O from '../src/Option'
import * as S from '../src/string'

describe('Identity', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      U.deepStrictEqual(pipe(1, _.map(double)), 2)
    })

    it('ap', () => {
      const double = (n: number): number => n * 2
      const fab = double
      U.deepStrictEqual(pipe(fab, _.ap(1)), 2)
    })

    it('apFirst', () => {
      U.deepStrictEqual(pipe('a', _.apFirst('b')), 'a')
    })

    it('apSecond', () => {
      U.deepStrictEqual(pipe('a', _.apSecond('b')), 'b')
    })

    it('chain', () => {
      const f = (n: number) => n * 2
      U.deepStrictEqual(pipe(1, _.chain(f)), 2)
    })

    it('chainFirst', () => {
      const f = (n: number) => n * 2
      U.deepStrictEqual(pipe(1, _.chainFirst(f)), 1)
    })

    it('reduce', () => {
      U.deepStrictEqual(
        pipe(
          'b',
          _.reduce('a', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      U.deepStrictEqual(pipe('a', _.foldMap(S.Monoid)(identity)), 'a')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      U.deepStrictEqual(pipe('a', _.reduceRight('', f)), 'a')
    })

    it('alt', () => {
      U.deepStrictEqual(
        pipe(
          1,
          _.alt(() => 2)
        ),
        1
      )
    })

    it('extract', () => {
      U.deepStrictEqual(pipe(1, _.extract), 1)
    })

    it('extend', () => {
      const f = (fa: _.Identity<string>): number => fa.length
      U.deepStrictEqual(pipe('foo', _.extend(f)), 3)
    })

    it('duplicate', () => {
      U.deepStrictEqual(pipe('a', _.duplicate), 'a')
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe('a', _.flatten), 'a')
    })

    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)
      U.deepStrictEqual(pipe(1, traverse(O.some)), O.some(1))
      U.deepStrictEqual(
        pipe(
          1,
          traverse(() => O.none)
        ),
        O.none
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      U.deepStrictEqual(sequence(O.some('a')), O.some('a'))
      U.deepStrictEqual(sequence(O.none), O.none)
    })
  })

  it('getEq', () => {
    const S = _.getEq(N.Eq)
    U.deepStrictEqual(S.equals(1, 1), true)
    U.deepStrictEqual(S.equals(1, 2), false)
    U.deepStrictEqual(S.equals(2, 1), false)
  })

  it('ChainRec', () => {
    const x = _.ChainRec.chainRec<number, number>(0, (a) => (a < 10 ? left(a + 1) : right(a)))
    const expected = 10
    U.deepStrictEqual(x, expected)
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    U.deepStrictEqual(Sh.show('a'), `"a"`)
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      ),
      { a: 1, b: 'b' }
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b'))), { a: 1, b: 'b' })
  })
})
