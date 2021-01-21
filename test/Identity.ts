import { eqNumber } from '../src/Eq'
import { identity, pipe } from '../src/function'
import * as _ from '../src/Identity'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import { showString } from '../src/Show'
import { deepStrictEqual } from './util'

describe('Identity', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      deepStrictEqual(pipe(1, _.map(double)), 2)
    })

    it('ap', () => {
      const double = (n: number): number => n * 2
      const fab = double
      deepStrictEqual(pipe(fab, _.ap(1)), 2)
    })

    it('apSecond', () => {
      deepStrictEqual(pipe('a', _.apSecond('b')), 'b')
    })

    it('chain', () => {
      const f = (n: number) => n * 2
      deepStrictEqual(pipe(1, _.chain(f)), 2)
    })

    it('chainFirst', () => {
      const f = (n: number) => n * 2
      deepStrictEqual(pipe(1, _.chainFirst(f)), 1)
    })

    it('reduce', () => {
      deepStrictEqual(
        pipe(
          'b',
          _.reduce('a', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      deepStrictEqual(pipe('a', _.foldMap(monoidString)(identity)), 'a')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      deepStrictEqual(pipe('a', _.reduceRight('', f)), 'a')
    })

    it('alt', () => {
      const assertAlt = (a: _.Identity<number>, b: _.Identity<number>, expected: number) => {
        deepStrictEqual(
          pipe(
            a,
            _.alt(() => b)
          ),
          expected
        )
      }
      assertAlt(1, 2, 1)
    })

    it('extract', () => {
      deepStrictEqual(pipe(1, _.extract), 1)
    })

    it('extend', () => {
      const f = (fa: _.Identity<string>): number => fa.length
      deepStrictEqual(pipe('foo', _.extend(f)), 3)
    })

    it('duplicate', () => {
      deepStrictEqual(pipe('a', _.duplicate), 'a')
    })

    it('flatten', () => {
      deepStrictEqual(pipe('a', _.flatten), 'a')
    })

    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)
      deepStrictEqual(pipe(1, traverse(O.some)), O.some(1))
      deepStrictEqual(
        pipe(
          1,
          traverse(() => O.none)
        ),
        O.none
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      deepStrictEqual(sequence(O.some('a')), O.some('a'))
      deepStrictEqual(sequence(O.none), O.none)
    })
  })

  it('getEq', () => {
    const S = _.getEq(eqNumber)
    deepStrictEqual(S.equals(1)(1), true)
    deepStrictEqual(S.equals(1)(2), false)
    deepStrictEqual(S.equals(2)(1), false)
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    deepStrictEqual(S.show('a'), `"a"`)
  })

  it('do notation', () => {
    deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      ),
      { a: 1, b: 'b' }
    )
  })

  it('apS', () => {
    deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b'))), { a: 1, b: 'b' })
  })

  it('apT', () => {
    deepStrictEqual(pipe(_.of(1), _.tupled, _.apT(_.of('b'))), [1, 'b'])
  })
})
