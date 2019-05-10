import * as assert from 'assert'
import * as S from '../src/State'
import { tuple } from '../src/function'

describe('State', () => {
  it('eval', () => {
    assert.deepStrictEqual(S.evalState(S.state.of<number, string>('a'), 0), 'a')
  })

  it('exec', () => {
    assert.deepStrictEqual(S.execState(S.state.of<number, string>('a'), 0), 0)
  })

  it('put', () => {
    assert.deepStrictEqual(S.put(2)(1), [undefined, 2])
  })

  it('get', () => {
    assert.deepStrictEqual(S.get()(1), [1, 1])
  })

  it('modify', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(S.modify(double)(1), [undefined, 2])
  })

  it('gets', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(S.gets(double)(1), [2, 1])
  })

  it('map', () => {
    const double = (n: number) => n * 2
    const x = (s: number) => tuple(s - 1, s + 1)
    assert.deepStrictEqual(S.state.map(x, double)(0), [-2, 1])
  })

  it('ap', () => {
    const double = (n: number) => n * 2
    const fab = S.state.of(double)
    const fa = S.state.of(1)
    assert.deepStrictEqual(S.state.ap(fab, fa)(0), [2, 0])
  })

  it('chain', () => {
    const f = (_n: number) => (s: number) => tuple(s - 1, s + 1)
    const x = (s: number) => tuple(s - 1, s + 1)
    assert.deepStrictEqual(S.state.chain(x, f)(0), [0, 2])
  })
})
