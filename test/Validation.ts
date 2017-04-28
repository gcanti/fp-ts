import * as assert from 'assert'

import {
  StaticSemigroup
} from './../src/Semigroup'
import {
  success,
  failure,
  chain
} from '../src/Validation'

describe('Validation', () => {

  const stringSemiGroup: StaticSemigroup<string> = { concat: (a: string, b: string) => a + b }

  it('chain', () => {
    const fSuccess = (s: string) => success(s.length)
    assert.deepEqual(chain(fSuccess, success('abc')), success(3))
    assert.deepEqual(chain(fSuccess, failure(stringSemiGroup, 'err')), failure(stringSemiGroup, 'err'))

    const fError = (s: string) => failure(stringSemiGroup, 'errA')
    assert.deepEqual(chain(fError, success('abc')), failure(stringSemiGroup, 'errA'))
    assert.deepEqual(chain(fError, failure(stringSemiGroup, 'errB')), failure(stringSemiGroup, 'errB'))
  })

})
