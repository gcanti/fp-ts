import * as assert from 'assert'
import { constant, Function1 } from '../src/function'
import { ifS, when, branch, or, and, any, all } from '../src/Selective'
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

  it('when', () => {
    const e = jest.fn()
    assert.deepStrictEqual(when(option)(some(false), some(e)), some(undefined))
    assert.deepStrictEqual(e.mock.calls.length, 0)
    assert.deepStrictEqual(when(option)(some(true), some(e)), some(undefined))
    assert.deepStrictEqual(e.mock.calls.length, 1)

    return Promise.all([when(task)(task.of(false), task.of(e)).run(), task.of(undefined).run()])
      .then(([r1, r2]) => {
        assert.deepStrictEqual(r1, r2)
        assert.deepStrictEqual(e.mock.calls.length, 1)
      })
      .then(() => Promise.all([when(task)(task.of(true), task.of(e)).run(), task.of(undefined).run()]))
      .then(([r1, r2]) => {
        assert.deepStrictEqual(r1, r2)
        assert.deepStrictEqual(e.mock.calls.length, 2)
      })
  })

  it('or', () => {
    assert.deepStrictEqual(or(option)(some(false), some(false)), some(false))
    assert.deepStrictEqual(or(option)(some(true), some(false)), some(true))
    assert.deepStrictEqual(or(option)(some(false), some(true)), some(true))
    assert.deepStrictEqual(or(option)(some(true), some(true)), some(true))
  })

  it('and', () => {
    assert.deepStrictEqual(and(option)(some(false), some(false)), some(false))
    assert.deepStrictEqual(and(option)(some(true), some(false)), some(false))
    assert.deepStrictEqual(and(option)(some(false), some(true)), some(false))
    assert.deepStrictEqual(and(option)(some(true), some(true)), some(true))
  })

  it('any', () => {
    assert.deepStrictEqual(any(option)([false, false], option.of), some(false))
    assert.deepStrictEqual(any(option)([false, true], option.of), some(true))
    assert.deepStrictEqual(any(option)([true, true], option.of), some(true))
  })

  it('all', () => {
    assert.deepStrictEqual(all(option)([false, false], option.of), some(false))
    assert.deepStrictEqual(all(option)([false, true], option.of), some(false))
    assert.deepStrictEqual(all(option)([true, true], option.of), some(true))
  })
})
