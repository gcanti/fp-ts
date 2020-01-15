import * as assert from 'assert'
import * as R from '../src/Reader'
import { semigroupSum } from '../src/Semigroup'
import { monoidSum } from '../src/Monoid'
import { pipe } from '../src/pipeable'

interface Env {
  readonly count: number
}

describe('Reader', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(R.reader.map(() => 1, double)({}), 2)
  })

  it('of', () => {
    assert.deepStrictEqual(R.reader.of(1)({}), 1)
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const f = R.reader.of(double)
    const x = R.reader.of(1)
    assert.deepStrictEqual(R.reader.ap(f, x)({}), 2)
  })

  it('chain', () => {
    const x = () => 'foo'
    const f = (s: string): R.Reader<object, number> => R.reader.of(s.length)
    assert.deepStrictEqual(R.reader.chain(x, f)({}), 3)
  })

  it('local', () => {
    interface E {
      readonly name: string
    }
    const x = pipe(
      (s: string) => s.length,
      R.local((e: E) => e.name)
    )
    assert.deepStrictEqual(x({ name: 'foo' }), 3)
  })

  it('promap', () => {
    const x = (s: string) => s.length
    const y = R.reader.promap(
      x,
      (a: { readonly name: string }) => a.name,
      n => n >= 2
    )
    assert.deepStrictEqual(y({ name: 'foo' }), true)
    assert.deepStrictEqual(y({ name: 'a' }), false)
  })

  it('id', () => {
    const x = R.reader.id<number>()
    assert.deepStrictEqual(x(1), 1)
  })

  it('compose', () => {
    const x = (s: string) => s.length
    const y = (n: number) => n >= 2
    const z = R.reader.compose(y, x)
    assert.deepStrictEqual(z('foo'), true)
    assert.deepStrictEqual(z('a'), false)
  })

  it('getSemigroup', () => {
    const S = R.getSemigroup(semigroupSum)
    assert.deepStrictEqual(S.concat(R.reader.of(1), R.reader.of(2))({}), 3)
  })

  it('getMonoid', () => {
    const M = R.getMonoid(monoidSum)
    assert.deepStrictEqual(M.concat(R.reader.of(1), M.empty)({}), 1)
    assert.deepStrictEqual(M.concat(M.empty, R.reader.of(1))({}), 1)
  })

  it('ask', () => {
    const e: Env = { count: 0 }
    assert.deepStrictEqual(R.ask<Env>()(e), e)
  })

  it('asks', () => {
    const e: Env = { count: 0 }
    const f = (e: Env) => e.count + 1
    assert.deepStrictEqual(R.asks(f)(e), 1)
  })
})
