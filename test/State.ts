import * as assert from 'assert'
import { pipe, tuple } from '../src/function'
import * as _ from '../src/State'

describe('State', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number) => n * 2
      const x = (s: number) => tuple(s - 1, s + 1)
      assert.deepStrictEqual(pipe(x, _.map(double))(0), [-2, 1])
    })

    it('ap', () => {
      const double = (n: number) => n * 2
      assert.deepStrictEqual(pipe(_.state.of(double), _.ap(_.state.of(1)))(0), [2, 0])
    })

    it('apFirst', () => {
      assert.deepStrictEqual(pipe(_.state.of('a'), _.apFirst(_.state.of('b')))(0), ['a', 0])
    })

    it('apSecond', () => {
      assert.deepStrictEqual(pipe(_.state.of('a'), _.apSecond(_.state.of('b')))(0), ['b', 0])
    })

    it('chain', () => {
      const f = (_n: number) => (s: number) => tuple(s - 1, s + 1)
      const x = (s: number) => tuple(s - 1, s + 1)
      assert.deepStrictEqual(pipe(x, _.chain(f))(0), [0, 2])
    })

    it('chainFirst', () => {
      const f = (_n: number) => (s: number) => tuple(s - 1, s + 1)
      const x = (s: number) => tuple(s - 1, s + 1)
      assert.deepStrictEqual(pipe(x, _.chainFirst(f))(0), [-1, 2])
    })

    it('flatten', () => {
      assert.deepStrictEqual(pipe(_.state.of(_.state.of('a')), _.flatten)(0), ['a', 0])
    })
  })

  it('eval', () => {
    assert.deepStrictEqual(_.evalState(_.state.of<number, string>('a'), 0), 'a')
  })

  it('exec', () => {
    assert.deepStrictEqual(_.execState(_.state.of<number, string>('a'), 0), 0)
  })

  it('put', () => {
    assert.deepStrictEqual(_.put(2)(1), [undefined, 2])
  })

  it('get', () => {
    assert.deepStrictEqual(_.get()(1), [1, 1])
  })

  it('modify', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(_.modify(double)(1), [undefined, 2])
  })

  it('gets', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(_.gets(double)(1), [2, 1])
  })
})
