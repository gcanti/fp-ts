import * as N from '../src/number'
import { identity, pipe } from '../src/function'
import * as _ from '../src/Identity'
import * as S from '../src/string'
import * as O from '../src/Option'
import * as U from './util'

describe('Identity', () => {
  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe(1, _.map(U.double)), 2)
    })

    it('ap', () => {
      const fab = U.double
      U.deepStrictEqual(pipe(fab, _.ap(1)), 2)
    })

    it('apSecond', () => {
      U.deepStrictEqual(pipe('a', _.apSecond('b')), 'b')
    })

    it('chain', () => {
      U.deepStrictEqual(pipe(1, _.chain(U.double)), 2)
    })

    it('chainFirst', () => {
      U.deepStrictEqual(pipe(1, _.chainFirst(U.double)), 1)
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

    it('combineK', () => {
      const assertSemigroupK = (a: _.Identity<number>, b: _.Identity<number>, expected: number) => {
        U.deepStrictEqual(
          pipe(
            a,
            _.combineK(() => b)
          ),
          expected
        )
      }
      assertSemigroupK(1, 2, 1)
    })

    it('extract', () => {
      U.deepStrictEqual(pipe(1, _.extract), 1)
    })

    it('extend', () => {
      U.deepStrictEqual(pipe('foo', _.extend(S.size)), 3)
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
    const E = _.getEq(N.Eq)
    U.deepStrictEqual(E.equals(1)(1), true)
    U.deepStrictEqual(E.equals(1)(2), false)
    U.deepStrictEqual(E.equals(2)(1), false)
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

  it('apT', () => {
    U.deepStrictEqual(pipe(_.of(1), _.tupled, _.apT(_.of('b'))), [1, 'b'])
  })
})
