import { fieldNumber } from '../src/Field'
import { pipe } from '../src/function'
import { getFunctionRing, getTupleRing, negate } from '../src/Ring'
import { deepStrictEqual } from './util'

describe('Ring', () => {
  it('getTupleRing', () => {
    const R = getTupleRing(fieldNumber, fieldNumber, fieldNumber)
    deepStrictEqual(pipe([1, 2, 3], R.add([4, 5, 6])), [5, 7, 9])
    deepStrictEqual(pipe([1, 2, 3], R.mul([4, 5, 6])), [4, 10, 18])
    deepStrictEqual(R.one, [1, 1, 1])
    deepStrictEqual(pipe([1, 2, 3], R.sub([4, 5, 6])), [-3, -3, -3])
    deepStrictEqual(R.zero, [0, 0, 0])
  })

  it('negate', () => {
    deepStrictEqual(negate(fieldNumber)(1), -1)
  })

  it('getFunctionRing', () => {
    const R = getFunctionRing<number, string>(fieldNumber)
    const f1 = (s: string): number => s.length
    const f2 = (s: string): number => s.indexOf('a')
    deepStrictEqual(pipe(f1, R.sub(f2))('foo'), 4)
    deepStrictEqual(pipe(f1, R.sub(f2))('fooa'), 1)
  })
})
