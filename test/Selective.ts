import * as assert from 'assert'
import { constant, Function1 } from '../src/function'
import { ifS, whenS, branch } from '../src/Selective'
import { option, some } from '../src/Option'
import { task } from '../src/Task'
import { left, right } from '../src/Either'

describe('Selective', () => {
  it('branch', () => {
    const add: Function1<number, number> = a => a + a
    const length: Function1<string, number> = a => a.length
    const addSpy = jest.fn(add)
    const lengthSpy = jest.fn(length)
    assert.deepStrictEqual(branch(option)(some(left<string, number>('foo')), some(lengthSpy), some(addSpy)), some(3))
    assert.deepStrictEqual(addSpy.mock.calls.length, 0)
    assert.deepStrictEqual(lengthSpy.mock.calls.length, 1)
    assert.deepStrictEqual(branch(option)(some(right<string, number>(2)), some(lengthSpy), some(addSpy)), some(4))
    assert.deepStrictEqual(addSpy.mock.calls.length, 1)
    assert.deepStrictEqual(lengthSpy.mock.calls.length, 1)
  })

  it('ifS', () => {
    const one = constant(1)
    const two = constant(2)
    const oneSpy = jest.fn(one)
    const twoSpy = jest.fn(two)
    assert.deepStrictEqual(ifS(option)(some(true), some(oneSpy), some(twoSpy)).map(f => f()), some(one).map(f => f()))
    assert.deepStrictEqual(oneSpy.mock.calls.length, 1)
    assert.deepStrictEqual(twoSpy.mock.calls.length, 0)
    assert.deepStrictEqual(ifS(option)(some(false), some(oneSpy), some(twoSpy)).map(f => f()), some(two).map(f => f()))
    assert.deepStrictEqual(oneSpy.mock.calls.length, 1)
    assert.deepStrictEqual(twoSpy.mock.calls.length, 1)
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
