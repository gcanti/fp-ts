import * as assert from 'assert'
import { Reader, reader, ask, asks, local } from '../src/Reader'

describe('Reader', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    const x = new Reader(() => 1)
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
    const x = ask()
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
})
