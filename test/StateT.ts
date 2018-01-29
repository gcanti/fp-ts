import * as assert from 'assert'
import * as stateT from '../src/StateT'
import * as option from '../src/Option'

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

  it('chain', () => {
    const f = (n: number) => (s: number) => option.some<[number, number]>([s - 1, s + 1])
    const state = (s: number) => option.some<[number, number]>([s - 1, s + 1])
    assert.deepEqual(stateTOption.chain(f, state)(0), option.some([0, 2]))
  })
})
