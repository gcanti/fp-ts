import * as assert from 'assert'
import { getFunctionSemiring } from '../src/Semiring'
import { fieldNumber } from '../src/Field'
import { pipe } from '../src/function'

describe('Semiring', () => {
  it('getFunctionSemiring', () => {
    const S = getFunctionSemiring<string, number>(fieldNumber)
    const f1 = (s: string): number => s.length
    const f2 = (s: string): number => s.indexOf('a')
    assert.deepStrictEqual(pipe(f1, S.add(f2))('foo'), 2)
    assert.deepStrictEqual(pipe(f1, S.add(f2))('fooa'), 7)
    assert.deepStrictEqual(S.zero(''), 0)
    assert.deepStrictEqual(S.one(''), 1)
    assert.deepStrictEqual(pipe(f1, S.mul(f2))('foo'), -3)
    assert.deepStrictEqual(pipe(f1, S.mul(f2))('fooa'), 12)
  })
})
