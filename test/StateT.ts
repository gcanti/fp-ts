import * as assert from 'assert'
import * as option from '../src/Option'
import { state } from '../src/State'
import { getStateT } from '../src/StateT'

describe('StateT', () => {
  const T = getStateT(option.option)

  it('map', () => {
    const double = (n: number) => n * 2
    const s1 = (s: number) => option.some<[number, number]>([s - 1, s + 1])
    assert.deepStrictEqual(T.map(s1, double)(0), option.some([-2, 1]))
  })

  it('of', () => {
    const x = T.of(1)
    assert.deepStrictEqual(x(0), option.some([1, 0]))
  })

  it('ap', () => {
    const double = (n: number) => n * 2
    const fab = T.of(double)
    const fa = T.of(1)
    assert.deepStrictEqual(T.ap(fab, fa)(0), option.some([2, 0]))
  })

  it('chain', () => {
    const f = (_n: number) => (s: number) => option.some<[number, number]>([s - 1, s + 1])
    const s2 = (s: number) => option.some<[number, number]>([s - 1, s + 1])
    assert.deepStrictEqual(T.chain(s2, f)(0), option.some([0, 2]))
  })

  it('put', () => {
    assert.deepStrictEqual(T.put(2)(), option.some([undefined, 2]))
  })

  it('get', () => {
    assert.deepStrictEqual(T.get(1), option.some([1, 1]))
  })

  it('modify', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(T.modify(double)(1), option.some([undefined, 2]))
  })

  it('gets', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(T.gets(double)(1), option.some([2, 1]))
  })

  it('fromState', () => {
    const fromState = T.fromState
    const f = fromState(state.of<void, number>(1))
    assert.deepStrictEqual(f(undefined), option.some([1, undefined]))
  })

  it('fromM', () => {
    assert.deepStrictEqual(T.fromM(option.some(1))(undefined), option.some([1, undefined]))
  })
})
