import * as N from '../src/number'
import { identity, pipe } from '../src/Function'
import * as _ from '../src/Identity'
import * as S from '../src/string'
import * as O from '../src/Option'
import * as U from './util'

describe('Identity', () => {
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

  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe(1, _.map(U.double)), 2)
    })

    it('ap', () => {
      const fab = U.double
      U.deepStrictEqual(pipe(fab, _.ap(1)), 2)
    })

    it('flatMap', () => {
      U.deepStrictEqual(pipe(1, _.flatMap(U.double)), 2)
    })

    it('orElse', () => {
      const assertAlt = (a: _.Identity<number>, b: _.Identity<number>, expected: number) => {
        U.deepStrictEqual(
          pipe(
            a,
            _.orElse(() => b)
          ),
          expected
        )
      }
      assertAlt(1, 2, 1)
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
        _.succeed(1),
        _.bindTo('a'),
        _.bind('b', () => _.succeed('b'))
      ),
      { a: 1, b: 'b' }
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.succeed(1), _.bindTo('a'), _.bindRight('b', _.succeed('b'))), { a: 1, b: 'b' })
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.succeed(1), _.tupled, _.zipFlatten(_.succeed('b'))), [1, 'b'])
  })
})
