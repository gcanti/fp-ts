import * as assert from 'assert'
import * as R from '../src/Reader'
import { semigroupSum } from '../src/Semigroup'
import { monoidSum } from '../src/Monoid'

interface Env {
  count: number
}

describe('Reader', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    assert.strictEqual(R.run(R.reader.map(() => 1, double), {}), 2)
  })

  it('of', () => {
    assert.strictEqual(R.reader.of(1)({}), 1)
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const f = R.reader.of(double)
    const x = R.reader.of(1)
    assert.strictEqual(R.reader.ap(f, x)({}), 2)
  })

  it('chain', () => {
    const x = () => 'foo'
    const f = (s: string): R.Reader<object, number> => R.reader.of(s.length)
    assert.strictEqual(R.reader.chain(x, f)({}), 3)
  })

  it('local', () => {
    type E = string
    interface E2 {
      name: string
    }
    const x = R.local((e: E) => e.length, (e2: E2) => e2.name)
    assert.strictEqual(x({ name: 'foo' }), 3)
  })

  it('promap', () => {
    const x = (s: string) => s.length
    const y = R.reader.promap(x, (a: { name: string }) => a.name, n => n >= 2)
    assert.strictEqual(y({ name: 'foo' }), true)
    assert.strictEqual(y({ name: 'a' }), false)
  })

  it('id', () => {
    const x = R.reader.id<number>()
    assert.strictEqual(x(1), 1)
  })

  it('compose', () => {
    const x = (s: string) => s.length
    const y = (n: number) => n >= 2
    const z = R.reader.compose(
      y,
      x
    )
    assert.strictEqual(z('foo'), true)
    assert.strictEqual(z('a'), false)
  })

  it('getSemigroup', () => {
    const S = R.getSemigroup(semigroupSum)
    assert.strictEqual(S.concat(R.reader.of(1), R.reader.of(2))({}), 3)
  })

  it('getMonoid', () => {
    const M = R.getMonoid(monoidSum)
    assert.strictEqual(M.concat(R.reader.of(1), M.empty)({}), 1)
    assert.strictEqual(M.concat(M.empty, R.reader.of(1))({}), 1)
  })

  it('ask', () => {
    const e: Env = { count: 0 }
    assert.strictEqual(R.ask<Env>()(e), e)
  })

  it('asks', () => {
    const e: Env = { count: 0 }
    const f = (e: Env) => e.count + 1
    assert.strictEqual(R.asks(f)(e), 1)
  })
})
