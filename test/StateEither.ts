import * as assert from 'assert'
import * as E from '../src/Either'
import { pipe, SK, tuple } from '../src/function'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
import { State } from '../src/State'
import * as _ from '../src/StateEither'
import * as S from '../src/string'
import * as U from './util'

const state: unknown = {}

describe('StateEither', () => {
  describe('pipeables', () => {
    it('alt', async () => {
      const e1 = pipe(
        _.right('a'),
        _.alt(() => _.left(1)),
        _.evaluate(state)
      )
      U.deepStrictEqual(e1, E.right('a'))
      const e2 = pipe(
        pipe(
          _.left(1),
          _.alt(() => _.right('b')),
          _.evaluate(state)
        )
      )
      U.deepStrictEqual(e2, E.right('b'))
      const e3 = pipe(
        pipe(
          _.left(1),
          _.alt(() => _.left(2)),
          _.evaluate(state)
        )
      )
      U.deepStrictEqual(e3, E.left(2))
    })

    it('map', async () => {
      const e = pipe(_.right('aaa'), _.map(S.size), _.evaluate(state))
      U.deepStrictEqual(e, E.right(3))
    })

    it('ap', async () => {
      const e = pipe(_.right(S.size), _.ap(_.right('aaa')), _.evaluate(state))
      U.deepStrictEqual(e, E.right(3))
    })

    it('apFirst', async () => {
      const e = pipe(_.right('a'), _.apFirst(_.right('b')), _.evaluate(state))
      U.deepStrictEqual(e, E.right('a'))
    })

    it('apSecond', async () => {
      const e = pipe(_.right('a'), _.apSecond(_.right('b')), _.evaluate(state))
      U.deepStrictEqual(e, E.right('b'))
    })

    it('chain', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const e = pipe(_.right('aaa'), _.chain(f), _.evaluate(state))
      U.deepStrictEqual(e, E.right(3))
    })

    it('chainFirst', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const e = pipe(_.right('aaa'), _.chainFirst(f), _.evaluate(state))
      U.deepStrictEqual(e, E.right('aaa'))
    })

    it('flatten', async () => {
      const e = pipe(_.right(_.right('a')), _.flatten, _.evaluate(state))
      U.deepStrictEqual(e, E.right('a'))
    })

    type S = unknown
    type E1 = { readonly left1: unknown }
    type E2 = { readonly left2: unknown }

    it('flattenW', async () => {
      const e = pipe(_.right<S, E1, _.StateEither<S, E2, 'a'>>(_.right('a')), _.flattenW, _.evaluate(state))
      U.deepStrictEqual(e, E.right('a'))
    })

    it('bimap', async () => {
      const gt2 = (n: number): boolean => n > 2
      const e1 = pipe(_.right('aaa'), _.bimap(gt2, S.size), _.evaluate(state))
      U.deepStrictEqual(e1, E.right(3))
      const e2 = pipe(_.left(3), _.bimap(gt2, S.size), _.evaluate(state))
      U.deepStrictEqual(e2, E.left(true))
    })

    it('mapLeft', async () => {
      const gt2 = (n: number): boolean => n > 2
      const e = pipe(_.left(3), _.mapLeft(gt2), _.evaluate(state))
      U.deepStrictEqual(e, E.left(true))
    })

    it('fromPredicate', async () => {
      const predicate = (n: number) => n >= 2
      const gt2 = _.fromPredicate(predicate, (n) => `Invalid number ${n}`)

      const refinement = (u: string | number): u is number => typeof u === 'number'
      const isNumber = _.fromPredicate(refinement, (u) => `Invalid number ${String(u)}`)

      const e1 = pipe(gt2(3), _.evaluate(state))
      const e2 = pipe(gt2(1), _.evaluate(state))
      const e3 = pipe(isNumber(4), _.evaluate(state))
      U.deepStrictEqual(e1, E.right(3))
      U.deepStrictEqual(e2, E.left('Invalid number 1'))
      U.deepStrictEqual(e3, E.right(4))
    })

    it('filterOrElse', async () => {
      const e1 = pipe(
        _.right(12),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        ),
        _.evaluate(state)
      )
      U.deepStrictEqual(e1, E.right(12))

      const e2 = pipe(
        _.right(8),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        ),
        _.evaluate(state)
      )
      U.deepStrictEqual(e2, E.left('a'))
    })
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('run', async () => {
    const ma = _.right('a')
    const e = ma({})
    assert.deepStrictEqual(e, E.right(['a', {}]))
  })

  it('execute', () => {
    const ma = _.right('a')
    const e = pipe(ma, _.execute(state))
    U.deepStrictEqual(e, E.right({}))
  })

  it('rightState', async () => {
    const s: State<unknown, number> = (s) => [1, s]
    const e = pipe(_.rightState(s), _.evaluate(state))
    U.deepStrictEqual(e, E.right(1))
  })

  it('leftState', async () => {
    const s: State<unknown, number> = (s) => [1, s]
    const e = pipe(_.leftState(s), _.evaluate(state))
    U.deepStrictEqual(e, E.left(1))
  })

  it('left', async () => {
    const e = _.left(1)({})
    U.deepStrictEqual(e, E.left(1))
  })

  it('fromEither', () => {
    const e1 = _.fromEither(E.right(1))({})
    assert.deepStrictEqual(e1, E.right([1, {}]))
    const e2 = _.fromEither(E.left(1))({})
    U.deepStrictEqual(e2, E.left(1))
  })

  it('fromOption', async () => {
    const e1 = _.fromOption(() => 'err')(O.some(1))({})
    assert.deepStrictEqual(e1, E.right([1, {}]))
    const e2 = _.fromOption(() => 'err')(O.none)({})
    U.deepStrictEqual(e2, E.left('err'))
  })

  it('chainEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    const x = pipe(_.right('a'), _.chainEitherK(f))(undefined)
    assert.deepStrictEqual(x, E.right([1, undefined]))
  })

  it('put', async () => {
    assert.deepStrictEqual(_.put(2)(1), E.right([undefined, 2]))
  })

  it('get', async () => {
    assert.deepStrictEqual(_.get()(1), E.right([1, 1]))
  })

  it('modify', async () => {
    assert.deepStrictEqual(_.modify(U.double)(1), E.right([undefined, 2]))
  })

  it('gets', async () => {
    U.deepStrictEqual(_.gets(U.double)(1), E.right([2, 1]))
  })

  it('do notation', async () => {
    assert.deepStrictEqual(
      pipe(
        _.right<void, string, number>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(undefined),
      E.right([{ a: 1, b: 'b' }, undefined])
    )
  })

  it('apS', async () => {
    assert.deepStrictEqual(
      pipe(_.right<void, string, number>(1), _.bindTo('a'), _.apS('b', _.right('b')))(undefined),
      E.right([{ a: 1, b: 'b' }, undefined])
    )
  })

  describe('array utils', () => {
    const input: ReadonlyNonEmptyArray<string> = ['a', 'b']

    it('traverseReadonlyArrayWithIndex', async () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.right(a + i) : _.left('e')))
      U.deepStrictEqual(pipe(RA.empty, f)(undefined), E.right(tuple(RA.empty, undefined)))
      U.deepStrictEqual(pipe(input, f)(undefined), E.right(tuple(['a0', 'b1'], undefined)))
      U.deepStrictEqual(pipe(['a', ''], f)(undefined), E.left('e'))
      const append = (_i: number, n: number): _.StateEither<ReadonlyArray<number>, Error, void> =>
        _.modify((a) => [...a, n])
      U.deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.traverseReadonlyArrayWithIndex(append),
          _.map(() => undefined)
        )([]),
        E.right(tuple(undefined, [1, 2, 3]))
      )
    })

    it('sequenceReadonlyArray', () => {
      U.deepStrictEqual(
        pipe([_.right(1), _.right(2)], _.traverseReadonlyArrayWithIndex(SK))(undefined),
        E.right(tuple([1, 2], undefined))
      )
      U.deepStrictEqual(pipe([_.right(3), _.left('a')], _.traverseReadonlyArrayWithIndex(SK))(undefined), E.left('a'))
      U.deepStrictEqual(pipe([_.left('b'), _.right(4)], _.traverseReadonlyArrayWithIndex(SK))(undefined), E.left('b'))
    })

    // old
    it('sequenceArray', async () => {
      U.deepStrictEqual(pipe([_.right(1), _.right(2)], _.sequenceArray)({}), E.right(tuple([1, 2], {})))
      U.deepStrictEqual(pipe([_.right(1), _.left('a')], _.sequenceArray)({}), E.left('a'))
    })

    it('#1486', async () => {
      const append = (n: number): _.StateEither<ReadonlyArray<number>, Error, void> => _.modify((a) => [...a, n])
      U.deepStrictEqual(
        pipe(
          [1, 2, 3],
          // tslint:disable-next-line: deprecation
          _.traverseArray(append),
          _.map(() => undefined)
        )([]),
        E.right(tuple(undefined, [1, 2, 3]))
      )
    })
  })

  it('fromState', async () => {
    const s: State<unknown, number> = (s) => [1, s]
    const e = pipe(_.fromState(s), _.evaluate(state))
    U.deepStrictEqual(e, E.right(1))
  })

  it('fromStateK', async () => {
    const ma = _.fromStateK((n: number): State<number, number> => (s) => [n * 2, s + 1])
    U.deepStrictEqual(ma(3)(2), E.right([6, 3]))
  })

  it('chainStateK', async () => {
    const f = _.chainStateK((n: number): State<number, number> => (s) => [n * 2, s + 1])
    const right: _.StateEither<number, never, number> = _.right(3)
    U.deepStrictEqual(pipe(right, f)(2), E.right([6, 3]))
    const left: _.StateEither<number, string, number> = _.left('a')
    U.deepStrictEqual(pipe(left, f)(2), E.left('a'))
  })
})
