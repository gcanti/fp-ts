import * as assert from 'assert'
import { IO, getSemigroup, io, getMonoid } from '../src/IO'
import { semigroupSum } from '../src/Semigroup'
import { monoidSum } from '../src/Monoid'

describe('IO', () => {
  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = io.of(double)
    const fa = io.of(1)
    assert.strictEqual(fa.ap(fab).run(), 2)
    assert.strictEqual(fab.ap_(fa).run(), 2)
  })

  it('chain', () => {
    const f = (n: number) => io.of(n * 2)
    assert.strictEqual(
      io
        .of(1)
        .chain(f)
        .run(),
      2
    )
    assert.strictEqual(io.chain(io.of(1), f).run(), 2)
  })

  it('getSemigroup', () => {
    const S = getSemigroup(semigroupSum)
    const log: Array<string> = []
    const append = (message: string): IO<number> => new IO(() => log.push(message))
    assert.strictEqual(S.concat(append('a'), append('b')).run(), 3)
    assert.deepEqual(log, ['a', 'b'])
  })

  it('getMonoid', () => {
    const M = getMonoid(monoidSum)
    const log: Array<string> = []
    const append = (message: string): IO<number> => new IO(() => log.push(message))
    assert.strictEqual(M.concat(append('a'), M.empty).run(), 1)
    assert.strictEqual(M.concat(M.empty, append('b')).run(), 2)
    assert.deepEqual(log, ['a', 'b'])
  })

  it('applySecond', () => {
    const log: Array<string> = []
    const append = (message: string): IO<number> => new IO(() => log.push(message))
    assert.strictEqual(
      append('a')
        .applySecond(append('b'))
        .run(),
      2
    )
    assert.deepEqual(log, ['a', 'b'])
  })

  it('toString', () => {
    assert.strictEqual(io.of(1).toString(), 'new IO(<function0>)')
    assert.strictEqual(io.of(1).inspect(), 'new IO(<function0>)')
  })
})
