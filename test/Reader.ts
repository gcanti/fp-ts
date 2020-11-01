import * as assert from 'assert'
import * as _ from '../src/Reader'
import { semigroupSum } from '../src/Semigroup'
import { monoidSum } from '../src/Monoid'
import { pipe } from '../src/function'
import * as RA from '../src/ReadonlyArray'

interface Env {
  readonly count: number
}

describe('Reader', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(_.of(1), _.map(double))({}), 2)
    })

    it('ap', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(_.of(double), _.ap(_.of(1)))({}), 2)
    })

    it('apFirst', () => {
      assert.deepStrictEqual(pipe(_.of('a'), _.apFirst(_.of('b')))({}), 'a')
    })

    it('apSecond', () => {
      assert.deepStrictEqual(pipe(_.of('a'), _.apSecond(_.of('b')))({}), 'b')
    })

    it('chain', () => {
      const f = (s: string): _.Reader<object, number> => _.of(s.length)
      assert.deepStrictEqual(pipe(_.of('foo'), _.chain(f))({}), 3)
    })

    it('chainFirst', () => {
      const f = (s: string): _.Reader<object, number> => _.of(s.length)
      assert.deepStrictEqual(pipe(_.of('foo'), _.chainFirst(f))({}), 'foo')
    })

    it('chain', () => {
      assert.deepStrictEqual(pipe(_.of(_.of('a')), _.flatten)({}), 'a')
    })

    it('compose', () => {
      const double = (n: number) => n * 2
      const len = (s: string) => s.length
      assert.deepStrictEqual(pipe(double, _.compose(len))('aaa'), 6)
    })

    it('promap', () => {
      const x = (s: string) => s.length
      const reader = pipe(
        x,
        _.promap(
          (a: { readonly name: string }) => a.name,
          (n) => n >= 2
        )
      )
      assert.deepStrictEqual(reader({ name: 'foo' }), true)
      assert.deepStrictEqual(reader({ name: 'a' }), false)
    })
  })

  it('of', () => {
    assert.deepStrictEqual(_.of(1)({}), 1)
  })

  it('local', () => {
    interface E {
      readonly name: string
    }
    const x = pipe(
      (s: string) => s.length,
      _.local((e: E) => e.name)
    )
    assert.deepStrictEqual(x({ name: 'foo' }), 3)
  })

  it('id', () => {
    const x = _.id<number>()
    assert.deepStrictEqual(x(1), 1)
  })

  it('compose', () => {
    const x = (s: string) => s.length
    const y = (n: number) => n >= 2
    const z = pipe(y, _.compose(x))
    assert.deepStrictEqual(z('foo'), true)
    assert.deepStrictEqual(z('a'), false)
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup(semigroupSum)
    assert.deepStrictEqual(S.concat(_.of(1), _.of(2))({}), 3)
  })

  it('getMonoid', () => {
    const M = _.getMonoid(monoidSum)
    assert.deepStrictEqual(M.concat(_.of(1), M.empty)({}), 1)
    assert.deepStrictEqual(M.concat(M.empty, _.of(1))({}), 1)
  })

  it('ask', () => {
    const e: Env = { count: 0 }
    assert.deepStrictEqual(_.ask<Env>()(e), e)
  })

  it('asks', () => {
    const e: Env = { count: 0 }
    const f = (e: Env) => e.count + 1
    assert.deepStrictEqual(_.asks(f)(e), 1)
  })

  it('do notation', () => {
    assert.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )(undefined),
      { a: 1, b: 'b' }
    )
  })

  it('apS', () => {
    assert.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(undefined), { a: 1, b: 'b' })
  })

  describe('array utils', () => {
    it('sequenceArray', () => {
      const arr = RA.range(0, 10)
      assert.deepStrictEqual(pipe(arr, RA.map(_.of), _.sequenceArray)(undefined), arr)
    })

    it('traverseArray', () => {
      const arr = RA.range(0, 10)
      assert.deepStrictEqual(pipe(arr, _.traverseArray(_.of))(undefined), arr)
    })

    it('traverseArrayWithIndex', () => {
      const arr = RA.range(0, 10)
      assert.deepStrictEqual(
        pipe(
          arr,
          _.traverseArrayWithIndex((index, _data) => _.of(index))
        )(undefined),
        arr
      )
    })
  })
})
