import * as assert from 'assert'
import * as option from '../src/Option'
import { state } from '../src/State'
import * as stateT from '../src/StateT'

const stateTOption = stateT.getStateT(option.option)

describe('StateT', () => {
  it('put', () => {
    assert.deepEqual(stateT.put(option.option)(2)(), option.some([undefined, 2]))
  })

  it('get', () => {
    assert.deepEqual(stateT.get(option.option)()(1), option.some([1, 1]))
  })

  it('modify', () => {
    const double = (n: number) => n * 2
    assert.deepEqual(stateT.modify(option.option)(double)(1), option.some([undefined, 2]))
  })

  it('gets', () => {
    const double = (n: number) => n * 2
    assert.deepEqual(stateT.gets(option.option)(double)(1), option.some([2, 1]))
  })

  it('map', () => {
    const double = (n: number) => n * 2
    const state = (s: number) => option.some<[number, number]>([s - 1, s + 1])
    assert.deepEqual(stateTOption.map(double, state)(0), option.some([-2, 1]))
  })

  it('of', () => {
    const x = stateTOption.of(1)
    assert.deepEqual(x(0), option.some([1, 0]))
  })

  it('ap', () => {
    const double = (n: number) => n * 2
    const fab = stateTOption.of(double)
    const fa = stateTOption.of(1)
    assert.deepEqual(stateTOption.ap(fab, fa)(0), option.some([2, 0]))
  })

  it('chain', () => {
    const f = (_n: number) => (s: number) => option.some<[number, number]>([s - 1, s + 1])
    const state = (s: number) => option.some<[number, number]>([s - 1, s + 1])
    assert.deepEqual(stateTOption.chain(f, state)(0), option.some([0, 2]))
  })

  it('fromState', () => {
    const fromState = stateT.fromState(option.option)
    const f = fromState(state.of<void, number>(1))
    assert.deepEqual(f(undefined), option.some([1, undefined]))
  })

  it('liftF', () => {
    const liftF = stateT.liftF(option.option)
    assert.deepEqual(liftF<void, number>(option.some(1))(undefined), option.some([1, undefined]))
  })
})
