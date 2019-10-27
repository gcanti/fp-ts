import * as assert from 'assert'
import { IO, getSemigroup, io, getMonoid } from '../src/IO'
import { semigroupSum } from '../src/Semigroup'
import { monoidSum } from '../src/Monoid'
import { array, range } from '../src/Array'

describe('IO', () => {
  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = io.of(double)
    const fa = io.of(1)
    assert.strictEqual(io.ap(fab, fa)(), 2)
  })

  it('chain', () => {
    const f = (n: number) => io.of(n * 2)
    assert.strictEqual(io.chain(io.of(1), f)(), 2)
  })

  it('getSemigroup', () => {
    const S = getSemigroup(semigroupSum)
    const log: Array<string> = []
    const append = (message: string): IO<number> => () => log.push(message)
    assert.strictEqual(S.concat(append('a'), append('b'))(), 3)
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('getMonoid', () => {
    const M = getMonoid(monoidSum)
    const log: Array<string> = []
    const append = (message: string): IO<number> => () => log.push(message)
    assert.strictEqual(M.concat(append('a'), M.empty)(), 1)
    assert.strictEqual(M.concat(M.empty, append('b'))(), 2)
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('stack safe', () => {
    array.sequence(io)(range(0, 20000).map(io.of))()
  })
})
