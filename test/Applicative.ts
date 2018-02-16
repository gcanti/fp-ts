import * as assert from 'assert'
import { when, getApplicativeComposition } from '../src/Applicative'
import { array } from '../src/Array'
import { IO, io } from '../src/IO'
import { option, some, none } from '../src/Option'

describe('Applicative', () => {
  it('getApplicativeComposition', () => {
    const arrayOption = getApplicativeComposition(array, option)
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    assert.deepEqual(arrayOption.ap([some(double), some(inc)], [some(1), some(2)]), [
      some(2),
      some(4),
      some(2),
      some(3)
    ])
    assert.deepEqual(arrayOption.ap([some(double), none], [some(1), some(2)]), [some(2), some(4), none, none])
  })

  it('when', () => {
    const log: Array<string> = []
    const action = new IO(() => {
      log.push('action called')
    })
    when(io)(false, action).run()
    assert.deepEqual(log, [])
    when(io)(true, action).run()
    assert.deepEqual(log, ['action called'])
  })
})
