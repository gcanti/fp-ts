import { flow, pipe } from '@fp-ts/core/Function'
import * as _ from '@fp-ts/core/Reader'
import * as RA from '@fp-ts/core/ReadonlyArray'
import * as S from '@fp-ts/core/string'
import * as U from '@fp-ts/core/test/util'

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

    it('flatMap', () => {
      const f = flow(S.size, _.of)
      U.deepStrictEqual(pipe(_.of('foo'), _.flatMap(f))({}), 3)
    })

    it('flatMap', () => {
      U.deepStrictEqual(pipe(_.of(_.of('a')), _.flatten)({}), 'a')
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
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.bindRight('b', _.of('b')))(undefined), { a: 1, b: 'b' })
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.of(1), _.tupled, _.zipFlatten(_.of('b')))({}), [1, 'b'])
  })

  it('asksReader', () => {
    const e: Env = { count: 0 }
    const f = (e: Env) => _.of(e.count + 1)
    U.deepStrictEqual(_.asksReader(f)(e), 1)
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.of(a + i))
    U.strictEqual(pipe(RA.empty, f)({}), RA.empty)
    U.deepStrictEqual(pipe(['a', 'b'], f)({}), ['a0', 'b1'])
  })

  it('traverseNonEmptyReadonlyArray', () => {
    const f = _.traverseNonEmptyReadonlyArray((a: string) => _.of(a))
    U.deepStrictEqual(pipe(['a', 'b'], f)(null), ['a', 'b'])
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe([_.of('a'), _.of('b')], _.sequenceReadonlyArray)(null), ['a', 'b'])
  })
})
