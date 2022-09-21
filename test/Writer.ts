import * as E from '../src/Either'
import { identity, pipe } from '../src/function'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import type { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
import * as S from '../src/string'
import { tuple } from '../src/tuple'
import * as _ from '../src/Writer'
import * as U from './util'

describe('Writer', () => {
  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('fromIdentity', () => {
    U.deepStrictEqual(pipe(1, _.fromIdentity('a')), [1, 'a'])
  })

  it('tell', () => {
    U.deepStrictEqual(_.tell(1), [undefined, 1])
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('swap', () => {
    U.deepStrictEqual(_.swap([1, 'a']), ['a', 1])
  })

  it('listen', () => {
    U.deepStrictEqual(_.listen([1, 'a']), [[1, 'a'], 'a'])
  })

  it('pass', () => {
    U.deepStrictEqual(_.pass([tuple(1, (w: string) => w + 'b'), 'a']), [1, 'ab'])
  })

  it('listens', () => {
    const fa: _.Writer<string, number> = [1, 'a']
    U.deepStrictEqual(
      pipe(
        fa,
        _.listens((w) => w.length)
      ),
      [[1, 1], 'a']
    )
  })

  it('censor', () => {
    const fa: _.Writer<ReadonlyArray<string>, number> = [1, ['a', 'b']]
    U.deepStrictEqual(
      pipe(
        fa,
        _.censor((w) => w.filter((a) => a !== 'a'))
      ),
      [1, ['b']]
    )
  })

  // -------------------------------------------------------------------------------------
  // type class operations
  // -------------------------------------------------------------------------------------

  it('map', () => {
    U.deepStrictEqual(pipe([1, 'a'] as const, _.map(U.double)), [2, 'a'])
  })

  it('mapLeft', () => {
    U.deepStrictEqual(pipe(['a', 1] as const, _.mapLeft(U.double)), ['a', 2])
  })

  it('bimap', () => {
    U.deepStrictEqual(pipe([1, 'a'], _.bimap(S.size, U.double)), [2, 1])
  })

  it('extract', () => {
    U.deepStrictEqual(pipe([1, 'a'] as const, _.extract), 1)
  })

  it('extend', () => {
    const f = (fa: _.Writer<string, number>): number => _.snd(fa).length + _.fst(fa)
    U.deepStrictEqual(pipe([1, 'bb'], _.extend(f)), [3, 'bb'])
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

  it('compose', () => {
    U.deepStrictEqual(pipe(['b', true] as const, _.compose([1, 'a'])), [1, true])
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getApplicative', () => {
    const M = _.getApplicative(S.Monoid)

    U.deepStrictEqual(M.of(1), [1, ''])

    const fab: _.Writer<string, (n: number) => number> = [(n: number) => n * 2, 'a']
    const fa: _.Writer<string, number> = [1, 'b']
    U.deepStrictEqual(pipe(fab, M.ap(fa)), [2, 'ab'])
  })

  it('getMonad', () => {
    const M = _.getMonad(S.Monoid)

    U.deepStrictEqual(M.of(1), [1, ''])

    const fa: _.Writer<string, number> = [1, 'a']
    const f = (n: number): _.Writer<string, number> => [n * 2, 'b']
    U.deepStrictEqual(pipe(fa, M.chain(f)), [2, 'ab'])
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

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('evaluate', () => {
    U.deepStrictEqual(pipe([1, 'a'] as const, _.evaluate), 1)
  })

  it('execute', () => {
    U.deepStrictEqual(pipe([1, 'a'] as const, _.execute), 'a')
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyArrayWithIndex', () => {
    const { of } = _.getPointed(S.Monoid)
    const f = (i: number, n: number) => of(n + i)
    const standard = RA.traverseWithIndex(_.getApplicative(S.Monoid))(f)
    const optimized = _.traverseReadonlyArrayWithIndex(S.Monoid)(f)
    const assert = (input: ReadonlyArray<number>) => {
      U.deepStrictEqual(standard(input), optimized(input))
    }
    assert([1, 2, 3])
    assert([0, 2, 3])
    assert([1, 0, 3])
    assert([0, 0, 3])
    assert([-1, 2, 3])
    assert([1, -2, 3])
    assert(RA.empty)
  })

  it('traverseReadonlyNonEmptyArray', () => {
    const { of } = _.getPointed(S.Monoid)
    const f = (n: number) => of(n)
    const standard = RA.traverse(_.getApplicative(S.Monoid))(f)
    const optimized = _.traverseReadonlyNonEmptyArray(S.Monoid)(f)
    const assert = (input: ReadonlyNonEmptyArray<number>) => {
      U.deepStrictEqual(standard(input), optimized(input))
    }
    assert([1, 2, 3])
    assert([0, 2, 3])
    assert([1, 0, 3])
    assert([0, 0, 3])
    assert([-1, 2, 3])
    assert([1, -2, 3])
  })

  it('sequenceReadonlyArray', () => {
    const { of } = _.getPointed(S.Monoid)
    const sequenceReadonlyArray = _.sequenceReadonlyArray(S.Monoid)
    U.deepStrictEqual(pipe([of('a'), of('b')], sequenceReadonlyArray), of(['a', 'b']))
  })
})
