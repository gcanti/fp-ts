import { flow, pipe } from '../src/function'
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

    it('apSecond', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.apSecond(_.of('b')))({}), 'b')
    })

    it('chain', () => {
      const f = flow(S.size, _.of)
      U.deepStrictEqual(pipe(_.of('foo'), _.chain(f))({}), 3)
    })

    it('chainFirst', () => {
      const f = flow(S.size, _.of)
      U.deepStrictEqual(pipe(_.of('foo'), _.chainFirst(f))({}), 'foo')
    })

    it('chain', () => {
      U.deepStrictEqual(pipe(_.of(_.of('a')), _.flatten)({}), 'a')
    })

    it('compose', () => {
      U.deepStrictEqual(pipe(S.size, _.compose(U.double))('aaa'), 6)
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

  it('apT', () => {
    U.deepStrictEqual(pipe(_.of(1), _.tupled, _.apT(_.of('b')))({}), [1, 'b'])
  })

  describe('array utils', () => {
    const input: ReadonlyNonEmptyArray<string> = ['a', 'b']

    it('traverseReadonlyArrayWithIndex', () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.of(a + i))
      U.strictEqual(pipe(RA.empty, f)({}), RA.empty)
      U.deepStrictEqual(pipe(input, f)({}), ['a0', 'b1'])
    })
  })

  it('asksE', () => {
    const e: Env = { count: 0 }
    const f = (e: Env) => _.of(e.count + 1)
    U.deepStrictEqual(_.asksE(f)(e), 1)
  })
})
