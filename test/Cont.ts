import * as assert from 'assert'
import { Cont, cont } from '../src/Cont'
import { identity } from '../src/function'

describe('Cont', () => {
  it('map', () => {
    const ma = cont.of<number, string>('a')
    const len = (s: string): number => s.length
    assert.strictEqual(cont.map(ma, len)(identity), 1)
  })

  it('ap', () => {
    const mab = cont.of<number, (s: string) => number>((s: string): number => s.length)
    const ma = cont.of<number, string>('a')
    assert.strictEqual(cont.ap(mab, ma)(identity), 1)
  })

  it('chain', () => {
    const f = (s: string): Cont<number, boolean> => c => c(s.length > 2)
    assert.strictEqual(cont.chain(cont.of<number, string>('a'), f)(a => (a ? 1 : 0)), 0)
    assert.strictEqual(cont.chain(cont.of<number, string>('aaa'), f)(a => (a ? 1 : 0)), 1)
  })
})
