import * as assert from 'assert'
import * as option from '../src/Option'
import { state } from '../src/State'
import * as stateT from '../src/StateT'

// tslint:disable-next-line: deprecation
const stateTOption = stateT.getStateT(option.option)

describe('StateT', () => {
  it('put', () => {
    assert.deepStrictEqual(stateT.put(option.option)(2)(), option.some([undefined, 2]))
  })

  it('get', () => {
    assert.deepStrictEqual(stateT.get(option.option)()(1), option.some([1, 1]))
  })

  it('modify', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(stateT.modify(option.option)(double)(1), option.some([undefined, 2]))
  })

  it('gets', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(stateT.gets(option.option)(double)(1), option.some([2, 1]))
  })

  it('map', () => {
    const double = (n: number) => n * 2
    const state = (s: number) => option.some<[number, number]>([s - 1, s + 1])
    assert.deepStrictEqual(stateTOption.map(double, state)(0), option.some([-2, 1]))
  })

  it('getStateT2v', () => {
    const stateTOption2v = stateT.getStateT2v(option.option)

    // map
    const double = (n: number) => n * 2
    const s1 = (s: number) => option.some<[number, number]>([s - 1, s + 1])
    assert.deepStrictEqual(stateTOption2v.map(s1, double)(0), option.some([-2, 1]))

    // aof
    const x = stateTOption2v.of(1)
    assert.deepStrictEqual(x(0), option.some([1, 0]))

    // ap
    const fab = stateTOption2v.of(double)
    const fa = stateTOption2v.of(1)
    assert.deepStrictEqual(stateTOption2v.ap(fab, fa)(0), option.some([2, 0]))

    // chain
    const f = (_n: number) => (s: number) => option.some<[number, number]>([s - 1, s + 1])
    const s2 = (s: number) => option.some<[number, number]>([s - 1, s + 1])
    assert.deepStrictEqual(stateTOption2v.chain(s2, f)(0), option.some([0, 2]))
  })

  it('of', () => {
    const x = stateTOption.of(1)
    assert.deepStrictEqual(x(0), option.some([1, 0]))
  })

  it('ap', () => {
    const double = (n: number) => n * 2
    const fab = stateTOption.of(double)
    const fa = stateTOption.of(1)
    assert.deepStrictEqual(stateTOption.ap(fab, fa)(0), option.some([2, 0]))
  })

  it('chain', () => {
    const f = (_n: number) => (s: number) => option.some<[number, number]>([s - 1, s + 1])
    const state = (s: number) => option.some<[number, number]>([s - 1, s + 1])
    assert.deepStrictEqual(stateTOption.chain(f, state)(0), option.some([0, 2]))
  })

  it('fromState', () => {
    const fromState = stateT.fromState(option.option)
    const f = fromState(state.of<void, number>(1))
    assert.deepStrictEqual(f(undefined), option.some([1, undefined]))
  })

  it('liftF', () => {
    const liftF = stateT.liftF(option.option)
    assert.deepStrictEqual(liftF<void, number>(option.some(1))(undefined), option.some([1, undefined]))
  })
})
