import * as assert from 'assert'
import { IO, getSemigroup, io, getMonoid } from '../src/IO'
import { semigroupSum } from '../src/Semigroup'
import { monoidSum } from '../src/Monoid'
import * as E from '../src/Either'

describe('IO', () => {
  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = io.of(double)
    const fa = io.of(1)
    assert.deepStrictEqual(io.ap(fab, fa)(), 2)
  })

  it('chain', () => {
    const f = (n: number) => io.of(n * 2)
    assert.deepStrictEqual(io.chain(io.of(1), f)(), 2)
  })

  it('getSemigroup', () => {
    const S = getSemigroup(semigroupSum)
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): IO<number> => () => log.push(message)
    assert.deepStrictEqual(S.concat(append('a'), append('b'))(), 3)
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('getMonoid', () => {
    const M = getMonoid(monoidSum)
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): IO<number> => () => log.push(message)
    assert.deepStrictEqual(M.concat(append('a'), M.empty)(), 1)
    assert.deepStrictEqual(M.concat(M.empty, append('b'))(), 2)
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('chainRec', () => {
    const f = (n: number) => (n < 15000 ? io.of(E.left(n + 1)) : io.of(E.right('ok ' + n)))
    assert.deepStrictEqual(io.chainRec(0, f)(), 'ok 15000')
  })
})
