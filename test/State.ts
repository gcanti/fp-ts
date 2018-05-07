import * as assert from 'assert'
import { State, get, gets, modify, put } from '../src/State'

describe('State', () => {
  it('put', () => {
    assert.deepEqual(put(2).run(1), [undefined, 2])
  })

  it('get', () => {
    assert.deepEqual(get().run(1), [1, 1])
  })

  it('modify', () => {
    const double = (n: number) => n * 2
    assert.deepEqual(modify(double).run(1), [undefined, 2])
  })

  it('gets', () => {
    const double = (n: number) => n * 2
    assert.deepEqual(gets(double).run(1), [2, 1])
  })

  it('map', () => {
    const double = (n: number) => n * 2
    const state = new State<number, number>(s => [s - 1, s + 1])
    assert.deepEqual(state.map(double).run(0), [-2, 1])
  })

  it('chain', () => {
    const f = (n: number) => new State<number, number>(s => [s - 1, s + 1])
    const state = new State<number, number>(s => [s - 1, s + 1])
    assert.deepEqual(state.chain(f).run(0), [0, 2])
  })
})
