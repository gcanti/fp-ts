import * as assert from 'assert'
import { constant } from '../src/function'
import { ifS, whenS } from '../src/Selective'
import { option, some } from '../src/Option'
import { task } from '../src/Task'

describe('Selective', () => {
  it('branch', () => {
    const one = some(constant(1))
    const two = some(constant(2))
    assert.deepStrictEqual(ifS(option)(some(true), one, two), 1)
  })

  it('ifS', () => {
    const one = some(constant(1))
    const two = some(constant(2))
    assert.deepStrictEqual(ifS(option)(some(true), one, two), 1)
  })

  it('whenS', () => {
    const e = jest.fn()
    assert.deepStrictEqual(whenS(option)(some(false), some(e)), some(undefined))
    assert.deepStrictEqual(e.mock.calls.length, 0)
    assert.deepStrictEqual(whenS(option)(some(true), some(e)), some(undefined))
    assert.deepStrictEqual(e.mock.calls.length, 1)

    return Promise.all([whenS(task)(task.of(false), task.of(e)).run(), task.of(undefined).run()])
      .then(([r1, r2]) => {
        assert.deepStrictEqual(r1, r2)
        assert.deepStrictEqual(e.mock.calls.length, 1)
      })
      .then(() => Promise.all([whenS(task)(task.of(true), task.of(e)).run(), task.of(undefined).run()]))
      .then(([r1, r2]) => {
        assert.deepStrictEqual(r1, r2)
        assert.deepStrictEqual(e.mock.calls.length, 2)
      })
  })
})
