import * as assert from 'assert'
import { getApplicativeComposition, when } from '../src/Applicative'
import { array } from '../src/Array'
import { io } from '../src/IO'
import { none, option, some } from '../src/Option'

describe('Applicative', () => {
  it('getApplicativeComposition', () => {
    const arrayOption = getApplicativeComposition(array, option)
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

  it('when', () => {
    const log: Array<string> = []
    const action = () => {
      log.push('action called')
    }
    when(io)(false, action)()
    assert.deepStrictEqual(log, [])
    when(io)(true, action)()
    assert.deepStrictEqual(log, ['action called'])
  })
})
