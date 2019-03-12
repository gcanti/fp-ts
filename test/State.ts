import * as assert from 'assert'
import { State, get, gets, modify, put, state } from '../src/State'

describe('State', () => {
  it('eval', () => {
    assert.deepStrictEqual(state.of<number, string>('a').eval(0), 'a')
  })

  it('exec', () => {
    assert.deepStrictEqual(state.of<number, string>('a').exec(0), 0)
  })

  it('put', () => {
    assert.deepStrictEqual(put(2).run(1), [undefined, 2])
  })

  it('get', () => {
    assert.deepStrictEqual(get().run(1), [1, 1])
  })

  it('modify', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(modify(double).run(1), [undefined, 2])
  })

  it('gets', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(gets(double).run(1), [2, 1])
  })

  it('map', () => {
    const double = (n: number) => n * 2
    const x = new State<number, number>(s => [s - 1, s + 1])
    assert.deepStrictEqual(x.map(double).run(0), [-2, 1])
    assert.deepStrictEqual(state.map(x, double).run(0), [-2, 1])
  })

  it('ap', () => {
    const double = (n: number) => n * 2
    const fab = state.of(double)
    const fa = state.of(1)
    assert.deepStrictEqual(fa.ap(fab).run(0), [2, 0])
    assert.deepStrictEqual(state.ap(fab, fa).run(0), [2, 0])
    assert.deepStrictEqual(fab.ap_(fa).run(0), [2, 0])
  })

  it('chain', () => {
    const f = (_n: number) => new State<number, number>(s => [s - 1, s + 1])
    const x = new State<number, number>(s => [s - 1, s + 1])
    assert.deepStrictEqual(x.chain(f).run(0), [0, 2])
    assert.deepStrictEqual(state.chain(x, f).run(0), [0, 2])
  })

  it('applyFirst', () => {
    type S = Array<string>
    const fa = gets<S, number>(() => 1)
    const fb = gets<S, string>(() => 'foo')
    assert.strictEqual(fa.applyFirst(fb).eval([]), 1)
  })

  it('applySecond', () => {
    type S = Array<string>
    const fa = gets<S, number>(() => 1)
    const fb = gets<S, string>(() => 'foo')
    assert.strictEqual(fa.applySecond(fb).eval([]), 'foo')
  })
})
