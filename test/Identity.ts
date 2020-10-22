import * as assert from 'assert'
import { left, right } from '../src/Either'
import { identity, pipe } from '../src/function'
import * as _ from '../src/Identity'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import { eqNumber } from '../src/Eq'
import { showString } from '../src/Show'

describe('Identity', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(1, _.map(double)), 2)
    })

    it('ap', () => {
      const double = (n: number): number => n * 2
      const fab = double
      assert.deepStrictEqual(pipe(fab, _.ap(1)), 2)
    })

    it('apFirst', () => {
      assert.deepStrictEqual(pipe('a', _.apFirst('b')), 'a')
    })

    it('apSecond', () => {
      assert.deepStrictEqual(pipe('a', _.apSecond('b')), 'b')
    })

    it('chain', () => {
      const f = (n: number) => n * 2
      assert.deepStrictEqual(pipe(1, _.chain(f)), 2)
    })

    it('chainFirst', () => {
      const f = (n: number) => n * 2
      assert.deepStrictEqual(pipe(1, _.chainFirst(f)), 1)
    })

    it('reduce', () => {
      assert.deepStrictEqual(
        pipe(
          'b',
          _.reduce('a', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      assert.deepStrictEqual(pipe('a', _.foldMap(monoidString)(identity)), 'a')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      assert.deepStrictEqual(pipe('a', _.reduceRight('', f)), 'a')
    })

    it('alt', () => {
      assert.deepStrictEqual(
        pipe(
          1,
          _.alt(() => 2)
        ),
        1
      )
    })

    it('extract', () => {
      assert.deepStrictEqual(pipe(1, _.extract), 1)
    })

    it('extend', () => {
      const f = (fa: _.Identity<string>): number => fa.length
      assert.deepStrictEqual(pipe('foo', _.extend(f)), 3)
    })

    it('duplicate', () => {
      assert.deepStrictEqual(pipe('a', _.duplicate), 'a')
    })

    it('flatten', () => {
      assert.deepStrictEqual(pipe('a', _.flatten), 'a')
    })

    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)
      assert.deepStrictEqual(pipe(1, traverse(O.some)), O.some(1))
      assert.deepStrictEqual(
        pipe(
          1,
          traverse(() => O.none)
        ),
        O.none
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      assert.deepStrictEqual(sequence(O.some('a')), O.some('a'))
      assert.deepStrictEqual(sequence(O.none), O.none)
    })
  })

  it('getEq', () => {
    const S = _.getEq(eqNumber)
    assert.deepStrictEqual(S.equals(1, 1), true)
    assert.deepStrictEqual(S.equals(1, 2), false)
    assert.deepStrictEqual(S.equals(2, 1), false)
  })

  it('ChainRec', () => {
    const x = _.ChainRec.chainRec<number, number>(0, (a) => (a < 10 ? left(a + 1) : right(a)))
    const expected = 10
    assert.deepStrictEqual(x, expected)
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    assert.deepStrictEqual(S.show('a'), `"a"`)
  })

  it('do notation', () => {
    assert.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      ),
      { a: 1, b: 'b' }
    )
  })

  it('apS', () => {
    assert.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b'))), { a: 1, b: 'b' })
  })
})
