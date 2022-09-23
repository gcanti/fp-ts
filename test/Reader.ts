import { pipe } from '../src/function'
import * as N from '../src/number'
import * as _ from '../src/Reader'
import * as RA from '../src/ReadonlyArray'
import { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
import * as S from '../src/string'
import * as U from './util'

interface Env {
  readonly count: number
}

describe('Reader', () => {
  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe(_.of(1), _.map(U.double))({}), 2)
    })

    it('ap', () => {
      U.deepStrictEqual(pipe(_.of(U.double), _.ap(_.of(1)))({}), 2)
    })

    it('apFirst', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.apFirst(_.of('b')))({}), 'a')
    })

    it('apFirstW', () => {
      const fb = _.of<{ readonly k: string }, boolean>(true)
      U.deepStrictEqual(pipe(_.of<{ readonly x: number }, string>('foo'), _.apFirstW(fb))({ x: 1, k: 'v' }), 'foo')
    })

    it('apSecond', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.apSecond(_.of('b')))({}), 'b')
    })

    it('apSecondW', () => {
      const fb = _.of<{ readonly k: string }, boolean>(true)
      U.deepStrictEqual(pipe(_.of<{ readonly x: number }, string>('foo'), _.apSecondW(fb))({ x: 1, k: 'v' }), true)
    })

    it('chain', () => {
      const f = (s: string): _.Reader<object, number> => _.of(s.length)
      U.deepStrictEqual(pipe(_.of('foo'), _.chain(f))({}), 3)
    })

    it('chainFirst', () => {
      const f = (s: string): _.Reader<object, number> => _.of(s.length)
      U.deepStrictEqual(pipe(_.of('foo'), _.chainFirst(f))({}), 'foo')
    })

    it('chainFirstW', () => {
      const f = (s: string) => _.of(s.length)
      U.deepStrictEqual(pipe(_.of<object, string>('foo'), _.chainFirstW(f))({}), 'foo')
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.of(_.of('a')), _.flatten)({}), 'a')
    })

    type R1 = { readonly env1: unknown }
    type R2 = { readonly env2: unknown }

    it('flattenW', () => {
      U.deepStrictEqual(pipe(_.of<R1, _.Reader<R2, 'a'>>(_.of('a')), _.flattenW)({ env1: '', env2: '' }), 'a')
    })

    it('compose', () => {
      U.deepStrictEqual(pipe(U.double, _.compose(S.size))('aaa'), 6)
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
    const S = _.getSemigroup(N.SemigroupSum)
    U.deepStrictEqual(S.concat(_.of(1), _.of(2))({}), 3)
  })

  it('getMonoid', () => {
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
        _.bind('b', () => _.of('b')),
        _.let('c', ({ a, b }) => [a, b])
      )(undefined),
      { a: 1, b: 'b', c: [1, 'b'] }
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(undefined), { a: 1, b: 'b' })
  })

  describe('array utils', () => {
    const input: ReadonlyNonEmptyArray<string> = ['a', 'b']

    it('traverseReadonlyArrayWithIndex', () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.of(a + i))
      U.strictEqual(pipe(RA.empty, f)({}), RA.empty)
      U.deepStrictEqual(pipe(input, f)({}), ['a0', 'b1'])
    })

    it('sequenceArray', () => {
      U.deepStrictEqual(pipe([_.of(1), _.of(2)], _.sequenceArray)(undefined), [1, 2])
    })
  })

  it('asksReader', () => {
    const e: Env = { count: 0 }
    const f = (e: Env) => _.of(e.count + 1)
    U.deepStrictEqual(_.asksReader(f)(e), 1)
  })
})
