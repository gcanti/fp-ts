import * as assert from 'assert'
import { State, get, gets, modify, put, state } from '../src/State'

describe('State', () => {
  it('eval', () => {
    assert.deepEqual(state.of(1).eval(0), 1)
  })

  it('exec', () => {
    assert.deepEqual(state.of(1).exec(0), 0)
  })

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
    const x = new State<number, number>(s => [s - 1, s + 1])
    assert.deepEqual(x.map(double).run(0), [-2, 1])
    assert.deepEqual(state.map(x, double).run(0), [-2, 1])
  })

  it('ap', () => {
    const double = (n: number) => n * 2
    const fab = state.of(double)
    const fa = state.of(1)
    assert.deepEqual(fa.ap(fab).run(0), [2, 0])
    assert.deepEqual(state.ap(fab, fa).run(0), [2, 0])
    assert.deepEqual(fab.ap_(fa).run(0), [2, 0])
  })

  it('chain', () => {
    const f = (_n: number) => new State<number, number>(s => [s - 1, s + 1])
    const x = new State<number, number>(s => [s - 1, s + 1])
    assert.deepEqual(x.chain(f).run(0), [0, 2])
    assert.deepEqual(state.chain(x, f).run(0), [0, 2])
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
