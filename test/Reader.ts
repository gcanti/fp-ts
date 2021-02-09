import * as U from './util'
import { pipe } from '../src/function'
import * as N from '../src/number'
import * as _ from '../src/Reader'

interface Env {
  readonly count: number
}

describe('Reader', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      U.deepStrictEqual(pipe(_.of(1), _.map(double))({}), 2)
    })

    it('ap', () => {
      const double = (n: number): number => n * 2
      U.deepStrictEqual(pipe(_.of(double), _.ap(_.of(1)))({}), 2)
    })

    it('apFirst', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.apFirst(_.of('b')))({}), 'a')
    })

    it('apSecond', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.apSecond(_.of('b')))({}), 'b')
    })

    it('chain', () => {
      const f = (s: string): _.Reader<object, number> => _.of(s.length)
      U.deepStrictEqual(pipe(_.of('foo'), _.chain(f))({}), 3)
    })

    it('chainFirst', () => {
      const f = (s: string): _.Reader<object, number> => _.of(s.length)
      U.deepStrictEqual(pipe(_.of('foo'), _.chainFirst(f))({}), 'foo')
    })

    it('chain', () => {
      U.deepStrictEqual(pipe(_.of(_.of('a')), _.flatten)({}), 'a')
    })

    it('compose', () => {
      const double = (n: number) => n * 2
      const len = (s: string) => s.length
      U.deepStrictEqual(pipe(double, _.compose(len))('aaa'), 6)
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
      U.deepStrictEqual(reader({ name: 'foo' }), true)
      U.deepStrictEqual(reader({ name: 'a' }), false)
    })
  })

  it('of', () => {
    U.deepStrictEqual(_.of(1)({}), 1)
  })

  it('local', () => {
    interface E {
      readonly name: string
    }
    const x = pipe(
      (s: string) => s.length,
      _.local((e: E) => e.name)
    )
    U.deepStrictEqual(x({ name: 'foo' }), 3)
  })

  it('id', () => {
    const x = _.id<number>()
    U.deepStrictEqual(x(1), 1)
  })

  it('compose', () => {
    const x = (s: string) => s.length
    const y = (n: number) => n >= 2
    const z = pipe(y, _.compose(x))
    U.deepStrictEqual(z('foo'), true)
    U.deepStrictEqual(z('a'), false)
  })

  it('getSemigroup', () => {
    // tslint:disable-next-line: deprecation
    const S = _.getSemigroup(N.SemigroupSum)
    U.deepStrictEqual(S.concat(_.of(1), _.of(2))({}), 3)
  })

  it('getMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = _.getMonoid(N.MonoidSum)
    U.deepStrictEqual(M.concat(_.of(1), M.empty)({}), 1)
    U.deepStrictEqual(M.concat(M.empty, _.of(1))({}), 1)
  })

  it('ask', () => {
    const e: Env = { count: 0 }
    U.deepStrictEqual(_.ask<Env>()(e), e)
  })

  it('asks', () => {
    const e: Env = { count: 0 }
    const f = (e: Env) => e.count + 1
    U.deepStrictEqual(_.asks(f)(e), 1)
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )(undefined),
      { a: 1, b: 'b' }
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(undefined), { a: 1, b: 'b' })
  })

  it('sequenceArray', () => {
    U.deepStrictEqual(pipe([_.of(1), _.of(2)], _.sequenceArray)(undefined), [1, 2])
  })
})
