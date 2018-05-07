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

  it('applySecond', () => {
    const log: Array<string> = []
    const append = (message: string): IO<number> => new IO(() => log.push(message))
    assert.strictEqual(
      append('a')
        .applySecond(append('b'))
        .run(),
      2
    )
    assert.deepEqual(log, ['a', 'b'])
  })
})
