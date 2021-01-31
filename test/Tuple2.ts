import { identity, pipe } from '../src/function'
import * as S from '../src/string'
import * as O from '../src/Option'
import * as _ from '../src/Tuple2'
import * as U from './util'

describe('Tuple2', () => {
  describe('combinators', () => {
    it('swap', () => {
      U.deepStrictEqual(_.swap([1, 'a']), ['a', 1])
    })
  })

  describe('type class members', () => {
    it('compose', () => {
      U.deepStrictEqual(pipe([1, 'a'] as const, _.compose([true, 2])), [true, 'a'])
    })

    it('map', () => {
      U.deepStrictEqual(pipe([1, 'a'] as const, _.map(U.double)), [2, 'a'])
    })

    it('extract', () => {
      U.deepStrictEqual(pipe([1, 'a'] as const, _.extract), 1)
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
      U.deepStrictEqual(pipe([1, 'a'] as const, _.mapLeft(len)), [1, 1])
    })

    it('duplicate', () => {
      U.deepStrictEqual(pipe([1, 'a'] as const, _.duplicate), [[1, 'a'], 'a'])
    })

    it('reduce', () => {
      U.deepStrictEqual(
        pipe(
          ['b', 1] as const,
          _.reduce('a', (acc, a) => acc + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      U.deepStrictEqual(pipe(['a', 1] as const, _.foldMap(S.Monoid)(identity)), 'a')
    })

    it('reduceRight', () => {
      U.deepStrictEqual(
        pipe(
          ['b', 1] as const,
          _.reduceRight('a', (acc, a) => acc + a)
        ),
        'ba'
      )
    })

    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none))
      U.deepStrictEqual(traverse([2, 'a']), O.some([2, 'a'] as const))
      U.deepStrictEqual(traverse([1, 'a']), O.none)
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      U.deepStrictEqual(sequence([O.some(1), 'a']), O.some([1, 'a'] as const))
      U.deepStrictEqual(sequence([O.none, 'a']), O.none)
    })
  })

  describe('instances', () => {
    it('getApplicative', () => {
      const A = _.getApplicative(S.Monoid)
      U.deepStrictEqual(A.of(1), [1, ''])
      U.deepStrictEqual(pipe([U.double, 'a'] as const, A.ap([1, 'b'])), [2, 'ab'])
    })

    it('getMonad', () => {
      const M = _.getMonad(S.Monoid)
      U.deepStrictEqual(
        pipe(
          [1, 'a'] as const,
          M.chain((a) => [a * 2, 'b'])
        ),
        [2, 'ab']
      )
    })
  })
})
