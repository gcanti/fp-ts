import * as assert from 'assert'
import { getFunctionSemiring } from '../src/Semiring'
import { fieldNumber } from '../src/Field'

describe('Semiring', () => {
  it('getFunctionSemiring', () => {
    const S = getFunctionSemiring<string, number>(fieldNumber)
    const f1 = (s: string): number => s.length
    const f2 = (s: string): number => s.indexOf('a')
    assert.strictEqual(S.add(f1, f2)('foo'), 2)
    assert.strictEqual(S.add(f1, f2)('fooa'), 7)
    assert.strictEqual(S.zero(''), 0)
    assert.strictEqual(S.one(''), 1)
    assert.strictEqual(S.mul(f1, f2)('foo'), -3)
    assert.strictEqual(S.mul(f1, f2)('fooa'), 12)
  })
})
