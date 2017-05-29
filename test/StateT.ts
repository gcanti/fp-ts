import * as assert from 'assert'
import {
  getStateT
} from '../src/StateT'
import * as option from '../src/Option'

declare module '../src/HKT' {
  interface HKT<A, U> {
    'Kleisli<Option, S, [A, S]>': (u: U) => option.Option<[A, U]>
  }
}

const stateTOption = getStateT('Kleisli<Option, S, [A, S]>', option)

describe('StateT', () => {

  it('put', () => {
    assert.deepEqual(stateTOption.put(2)(1), option.some([undefined, 2]))
  })

  it('get', () => {
    assert.deepEqual(stateTOption.get()(1), option.some([1, 1]))
  })

  it('modify', () => {
    const double = (n: number) => n * 2
    assert.deepEqual(stateTOption.modify(double)(1), option.some([undefined, 2]))
  })

  it('gets', () => {
    const double = (n: number) => n * 2
    assert.deepEqual(stateTOption.gets(double)(1), option.some([2, 1]))
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
