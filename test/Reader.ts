import * as assert from 'assert'
import { Reader, reader, ask, asks, local, getSemigroup, getMonoid } from '../src/Reader'
import { semigroupSum } from '../src/Semigroup'
import { monoidSum } from '../src/Monoid'

describe('Reader', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    const x = new Reader<{}, number>(() => 1)
    assert.strictEqual(x.map(double).run({}), 2)
    assert.strictEqual(reader.map(x, double).run({}), 2)
  })

  it('of', () => {
    assert.strictEqual(reader.of(1).run({}), 1)
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const f = reader.of(double)
    const x = reader.of(1)
    assert.strictEqual(x.ap(f).run({}), 2)
    assert.strictEqual(reader.ap(f, x).run({}), 2)
    assert.strictEqual(f.ap_(x).run({}), 2)
  })

  it('chain', () => {
    const x = new Reader<object, string>(() => 'foo')
    const f = (s: string): Reader<object, number> => reader.of(s.length)
    assert.strictEqual(x.chain(f).run({}), 3)
    assert.strictEqual(reader.chain(x, f).run({}), 3)
  })

  it('ask', () => {
    const x = ask<number>()
    assert.strictEqual(x.run(1), 1)
  })

  it('asks', () => {
    const x = asks((s: string) => s.length)
    assert.strictEqual(x.run('foo'), 3)
  })

  it('asks', () => {
    const x = local((s: string) => s + '!')(ask())
    assert.strictEqual(x.run('foo'), 'foo!')
  })

  it('local', () => {
    type E = string
    interface E2 {
      name: string
    }
    const x = local((e2: E2) => e2.name)(new Reader((e: E) => e.length))
    assert.strictEqual(x.run({ name: 'foo' }), 3)
  })

  it('promap', () => {
    const x = new Reader<string, number>(s => s.length)
    const y = reader.promap(x, (a: { name: string }) => a.name, n => n >= 2)
    assert.strictEqual(y.run({ name: 'foo' }), true)
    assert.strictEqual(y.run({ name: 'a' }), false)
  })

  it('id', () => {
    const x = reader.id<number>()
    assert.strictEqual(x.run(1), 1)
  })

  it('compose', () => {
    const x = new Reader<string, number>(s => s.length)
    const y = new Reader<number, boolean>(n => n >= 2)
    const z = reader.compose(
      y,
      x
    )
    assert.strictEqual(z.run('foo'), true)
    assert.strictEqual(z.run('a'), false)
  })

  it('getSemigroup', () => {
    const S = getSemigroup(semigroupSum)
    assert.strictEqual(S.concat(reader.of(1), reader.of(2)).run({}), 3)
  })

  it('getMonoid', () => {
    const M = getMonoid(monoidSum)
    assert.strictEqual(M.concat(reader.of(1), M.empty).run({}), 1)
    assert.strictEqual(M.concat(M.empty, reader.of(1)).run({}), 1)
  })
})
