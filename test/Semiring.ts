import { fieldNumber } from '../src/Field'
import { pipe } from '../src/function'
import { getFunctionSemiring } from '../src/Semiring'
import { deepStrictEqual } from './util'

describe('Semiring', () => {
  it('getFunctionSemiring', () => {
    const S = getFunctionSemiring<number, string>(fieldNumber)
    const f1 = (s: string): number => s.length
    const f2 = (s: string): number => s.indexOf('a')
    deepStrictEqual(pipe(f1, S.add(f2))('foo'), 2)
    deepStrictEqual(pipe(f1, S.add(f2))('fooa'), 7)
    deepStrictEqual(S.zero(''), 0)
    deepStrictEqual(S.one(''), 1)
    deepStrictEqual(pipe(f1, S.mul(f2))('foo'), -3)
    deepStrictEqual(pipe(f1, S.mul(f2))('fooa'), 12)
  })
})
