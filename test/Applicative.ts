import * as assert from 'assert'
import { getApplicativeComposition } from '../src/Applicative'
import * as A from '../src/ReadonlyArray'
import { none, option, some } from '../src/Option'

describe('Applicative', () => {
  it('getApplicativeComposition', () => {
    const arrayOption = getApplicativeComposition(A.applicativeArray, option)
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    assert.deepStrictEqual(arrayOption.ap([some(double), some(inc)], [some(1), some(2)]), [
      some(2),
      some(4),
      some(2),
      some(3)
    ])
    assert.deepStrictEqual(arrayOption.ap([some(double), none], [some(1), some(2)]), [some(2), some(4), none, none])
  })
})
