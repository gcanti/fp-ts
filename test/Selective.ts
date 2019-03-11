import * as assert from 'assert'
import { whenS } from '../src/Selective'
import { option, some } from '../src/Option'
import { task } from '../src/Task'

describe('Selective', () => {
  it('whenS', () => {
    const e = jest.fn()
    assert.deepStrictEqual(whenS(option)(some(false), some(e)), some(undefined))
    assert.equal(e.mock.calls.length, 0)
    assert.deepStrictEqual(whenS(option)(some(true), some(e)), some(undefined))
    assert.equal(e.mock.calls.length, 1)

    Promise.all([whenS(task)(task.of(false), task.of(e)).run(), task.of(undefined).run])
      .then(([r1, r2]) => {
        assert.deepStrictEqual(r1, r2)
        assert.equal(e.mock.calls.length, 1)
      })
      .then(() => Promise.all([whenS(task)(task.of(true), task.of(e)).run(), task.of(undefined).run()]))
      .then(([r1, r2]) => {
        assert.deepStrictEqual(r1, r2)
        assert.equal(e.mock.calls.length, 2)
      })
  })
})
