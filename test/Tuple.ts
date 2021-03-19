import * as U from './util'
import { getMonoid } from '../src/Array'
import { left, right } from '../src/Either'
import { identity, pipe } from '../src/function'
import * as S from '../src/string'
import * as O from '../src/Option'
import * as _ from '../src/Tuple'
import * as assert from 'assert'

describe('Tuple', () => {
  describe('pipeables', () => {
    it('compose', () => {
      U.deepStrictEqual(pipe([true, 2] as [boolean, number], _.compose([1, 'a'])), [true, 'a'])
    })

    it('mapFst', () => {
      U.deepStrictEqual(pipe([1, 'a'] as [number, string], _.mapFst(U.double)), [2, 'a'])
    })

    it('extract', () => {
      U.deepStrictEqual(pipe([1, 'a'] as [number, string], _.extract), 1)
    })

    it('extend', () => {
      const f = (fa: [number, string]): number => _.snd(fa).length + _.fst(fa)
      U.deepStrictEqual(pipe([1, 'bb'], _.extend(f)), [3, 'bb'])
    })

    it('bimap', () => {
      U.deepStrictEqual(pipe([1, 'a'], _.bimap(S.size, U.double)), [2, 1])
    })

    it('mapSnd', () => {
      U.deepStrictEqual(pipe([1, 'a'] as [number, string], _.mapSnd(S.size)), [1, 1])
    })

    it('duplicate', () => {
      U.deepStrictEqual(pipe([1, 'a'] as [number, string], _.duplicate), [[1, 'a'], 'a'])
    })

    it('reduce', () => {
      U.deepStrictEqual(
        pipe(
          ['b', 1] as [string, number],
          _.reduce('a', (acc, a) => acc + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      U.deepStrictEqual(pipe(['a', 1] as [string, number], _.foldMap(S.Monoid)(identity)), 'a')
    })

    it('reduceRight', () => {
      U.deepStrictEqual(
        pipe(
          ['b', 1] as [string, number],
          _.reduceRight('a', (acc, a) => acc + a)
        ),
        'ba'
      )
    })

    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none))
      assert.deepStrictEqual(traverse([2, 'a']), O.some([2, 'a']))
      U.deepStrictEqual(traverse([1, 'a']), O.none)
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      assert.deepStrictEqual(sequence([O.some(1), 'a']), O.some([1, 'a']))
      U.deepStrictEqual(sequence([O.none, 'a']), O.none)
    })
  })

  it('swap', () => {
    U.deepStrictEqual(_.swap([1, 'a']), ['a', 1])
  })

  it('getApply', () => {
    const apply = _.getApply(S.Monoid)
    U.deepStrictEqual(apply.ap([U.double, 'a'], [1, 'b']), [2, 'ab'])
  })

  it('getApplicative', () => {
    const applicative = _.getApplicative(S.Monoid)
    U.deepStrictEqual(applicative.of(1), [1, ''])
  })

  it('getMonad', () => {
    const monad = _.getMonad(S.Monoid)
    U.deepStrictEqual(
      monad.chain([1, 'a'], (a) => [a * 2, 'b']),
      [2, 'ab']
    )
  })

  it('chainRec', () => {
    const { chainRec } = _.getChainRec(getMonoid<number>())
    function seqReq(upper: number): [number, ReadonlyArray<number>] {
      return chainRec(1, (init) => [init >= upper ? right(init) : left(init + 1), [init]])
    }
    const xs = _.snd(seqReq(10000))
    U.deepStrictEqual(xs.length, 10000)
    U.deepStrictEqual(xs[0], 1)
    U.deepStrictEqual(xs[xs.length - 1], 10000)
  })
})
