import * as assert from 'assert'
import { IO, getSemigroup } from '../src/IO'
import { semigroupVoid } from '../src/Semigroup'

describe('IO', () => {
  it('getSemigroup', () => {
    const S = getSemigroup(semigroupVoid)
    const log: Array<string> = []
    const append = (message: string) =>
      new IO(() => {
        log.push(message)
      })
    S.concat(append('a'), append('b')).run()
    assert.deepEqual(log, ['a', 'b'])
  })
})
