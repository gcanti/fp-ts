import * as assert from 'assert'
import * as RA from '../src/ReadonlyArray'
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
      assert.deepStrictEqual(pipe(_.of(double), _.ap(_.of(1)))(0), [2, 0])
    })

    it('apFirst', () => {
      assert.deepStrictEqual(pipe(_.of('a'), _.apFirst(_.of('b')))(0), ['a', 0])
    })

    it('apSecond', () => {
      assert.deepStrictEqual(pipe(_.of('a'), _.apSecond(_.of('b')))(0), ['b', 0])
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
      assert.deepStrictEqual(pipe(_.of(_.of('a')), _.flatten)(0), ['a', 0])
    })
  })

  it('evalState', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(_.evalState(_.of<number, string>('a'), 0), 'a')
  })

  it('execState', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(_.execState(_.of<number, string>('a'), 0), 0)
  })

  it('evaluate', () => {
    assert.deepStrictEqual(pipe(_.of<number, string>('a'), _.evaluate(0)), 'a')
  })

  it('execute', () => {
    assert.deepStrictEqual(pipe(_.of<number, string>('a'), _.execute(0)), 0)
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

  it('do notation', () => {
    assert.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )('state'),
      [{ a: 1, b: 'b' }, 'state']
    )
  })

  it('apS', () => {
    assert.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(undefined), [
      { a: 1, b: 'b' },
      undefined
    ])
  })

  describe('array utils', () => {
    it('sequenceArray', () => {
      const add = (n: number) => (s: number) => tuple(n, n + s)
      const arr = RA.range(0, 10)
      assert.deepStrictEqual(pipe(arr, RA.map(add), _.sequenceArray)(0), [arr, arr.reduce((p, c) => p + c, 0)])
    })

    it('traverseArray', () => {
      const add = (n: number) => (s: number) => tuple(n, n + s)
      const arr = RA.range(0, 10)
      assert.deepStrictEqual(pipe(arr, _.traverseArray(add))(0), [arr, arr.reduce((p, c) => p + c, 0)])
    })
    it('traverseArrayWithIndex', () => {
      const add = (n: number) => (s: number) => tuple(n, n + s)
      const arr = RA.range(0, 10)
      assert.deepStrictEqual(
        pipe(
          arr,
          _.traverseArrayWithIndex((_i, data) => add(data))
        )(0),
        [arr, arr.reduce((p, c) => p + c, 0)]
      )
    })
  })
})
