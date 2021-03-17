import { identity, pipe } from '../src/function'
import * as S from '../src/string'
import * as O from '../src/Option'
import * as _ from '../src/Tuple2'
import * as U from './util'
import * as RA from '../src/ReadonlyArray'
import * as E from '../src/Either'

describe('Tuple2', () => {
  describe('combinators', () => {
    it('swap', () => {
      U.deepStrictEqual(_.swap([1, 'a']), ['a', 1])
    })
  })

  describe('type class members', () => {
    it('compose', () => {
      U.deepStrictEqual(pipe(_.tuple2(1, 'a'), _.compose([true, 2])), [true, 'a'])
    })

    it('map', () => {
      U.deepStrictEqual(pipe(_.tuple2(1, 'a'), _.map(U.double)), [2, 'a'])
    })

    it('extract', () => {
      U.deepStrictEqual(pipe(_.tuple2(1, 'a'), _.extract), 1)
    })

    it('extend', () => {
      const f = (fa: readonly [number, string]): number => _.snd(fa).length + _.fst(fa)
      U.deepStrictEqual(pipe([1, 'bb'], _.extend(f)), [3, 'bb'])
    })

    it('bimap', () => {
      const len = (s: string): number => s.length
      U.deepStrictEqual(pipe([1, 'a'], _.bimap(len, U.double)), [2, 1])
    })

    it('mapLeft', () => {
      const len = (s: string): number => s.length
      U.deepStrictEqual(pipe(_.tuple2(1, 'a'), _.mapLeft(len)), [1, 1])
    })

    it('duplicate', () => {
      U.deepStrictEqual(pipe(_.tuple2(1, 'a'), _.duplicate), [[1, 'a'], 'a'])
    })

    it('reduce', () => {
      U.deepStrictEqual(
        pipe(
          _.tuple2('b', 1),
          _.reduce('a', (acc, a) => acc + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      U.deepStrictEqual(pipe(_.tuple2('a', 1), _.foldMap(S.Monoid)(identity)), 'a')
    })

    it('reduceRight', () => {
      U.deepStrictEqual(
        pipe(
          _.tuple2('b', 1),
          _.reduceRight('a', (acc, a) => acc + a)
        ),
        'ba'
      )
    })

    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none))
      U.deepStrictEqual(traverse([2, 'a']), O.some(_.tuple2(2, 'a')))
      U.deepStrictEqual(traverse([1, 'a']), O.none)
    })
  })

  describe('instances', () => {
    it('getApplicative', () => {
      const A = _.getApplicative(S.Monoid)
      U.deepStrictEqual(A.of(1), [1, ''])
      U.deepStrictEqual(pipe(_.tuple2(U.double, 'a'), A.ap([1, 'b'])), [2, 'ab'])
    })

    it('getMonad', () => {
      const M = _.getMonad(S.Monoid)
      U.deepStrictEqual(
        pipe(
          _.tuple2(1, 'a'),
          M.chain((a) => [a * 2, 'b'])
        ),
        [2, 'ab']
      )
    })
  })

  it('getChainRec', () => {
    const { chainRec } = _.getChainRec(RA.getMonoid<number>())
    function seqReq(upper: number): readonly [number, ReadonlyArray<number>] {
      return pipe(
        1,
        chainRec((init) => [init >= upper ? E.right(init) : E.left(init + 1), [init]])
      )
    }
    const xs = _.snd(seqReq(10000))
    U.deepStrictEqual(xs.length, 10000)
    U.deepStrictEqual(xs[0], 1)
    U.deepStrictEqual(xs[xs.length - 1], 10000)
  })
})
