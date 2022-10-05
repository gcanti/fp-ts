import * as E from '../src/Either'
import { identity, pipe } from '../src/Function'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import type { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
import * as S from '../src/string'
import * as _ from '../src/Writer'
import * as U from './util'

describe('Writer', () => {
  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('tell', () => {
    U.deepStrictEqual(_.tell('w'), ['w', undefined])
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('swap', () => {
    U.deepStrictEqual(_.swap(['w', 'a']), ['a', 'w'])
  })

  it('listen', () => {
    U.deepStrictEqual(_.listen(['w', 'a']), ['w', ['w', 'a']])
  })

  it('pass', () => {
    U.deepStrictEqual(_.pass(['w', ['a', (w: string) => w + 'b'] as const]), ['wb', 'a'])
  })

  it('listens', () => {
    U.deepStrictEqual(
      pipe(
        ['w', 'a'] as const,
        _.listens((w) => w.length)
      ),
      ['w', ['a', 1]]
    )
  })

  it('censor', () => {
    const ws = ['w1', 'w2']
    U.deepStrictEqual(
      pipe(
        [ws, 'a'] as const,
        _.censor((w) => w.filter((w) => w !== 'w1'))
      ),
      [['w2'], 'a']
    )
  })

  // -------------------------------------------------------------------------------------
  // type class operations
  // -------------------------------------------------------------------------------------

  it('map', () => {
    U.deepStrictEqual(pipe(['w', 1] as const, _.map(U.double)), ['w', 2])
  })

  it('mapLeft', () => {
    U.deepStrictEqual(pipe([1, 'a'] as const, _.mapLeft(U.double)), [2, 'a'])
  })

  it('mapBoth', () => {
    U.deepStrictEqual(pipe(['w', 1], _.mapBoth(S.size, U.double)), [1, 2])
  })

  it('extract', () => {
    U.deepStrictEqual(pipe(['w', 'a'] as const, _.extract), 'a')
  })

  it('extend', () => {
    const f = (fa: _.Writer<string, number>): number => _.fst(fa).length + _.snd(fa)
    U.deepStrictEqual(pipe(['ww', 1], _.extend(f)), ['ww', 3])
  })

  it('duplicate', () => {
    U.deepStrictEqual(pipe(['w', 'a'] as const, _.duplicate), ['w', ['w', 'a']])
  })

  it('reduce', () => {
    U.deepStrictEqual(
      pipe(
        ['w', 'b'] as const,
        _.reduce('a', (acc, a) => acc + a)
      ),
      'ab'
    )
  })

  it('foldMap', () => {
    U.deepStrictEqual(pipe(['w', 'a'] as const, _.foldMap(S.Monoid)(identity)), 'a')
  })

  it('reduceRight', () => {
    U.deepStrictEqual(
      pipe(
        ['w', 'b'] as const,
        _.reduceRight('a', (acc, a) => acc + a)
      ),
      'ba'
    )
  })

  it('traverse', () => {
    const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none))
    U.deepStrictEqual(traverse(['w', 2]), O.some(['w', 2] as const))
    U.deepStrictEqual(traverse(['w', 1]), O.none)
  })

  it('sequence', () => {
    const sequence = _.sequence(O.Applicative)
    U.deepStrictEqual(sequence(['w', O.some('a')]), O.some(['w', 'a'] as const))
    U.deepStrictEqual(sequence(['w', O.none]), O.none)
  })

  it('compose', () => {
    U.deepStrictEqual(pipe(['w', 'a'] as const, _.compose(['a', 'b'])), ['w', 'b'])
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getApplicative', () => {
    const M = _.getApplicative(S.Monoid)

    U.deepStrictEqual(M.of('a'), ['', 'a'])

    const fab: _.Writer<string, (n: number) => number> = ['w1', (n: number) => n * 2]
    const fa: _.Writer<string, number> = ['w2', 1]
    U.deepStrictEqual(pipe(fab, M.ap(fa)), ['w1w2', 2])
  })

  it('getMonad', () => {
    const M = _.getMonad(S.Monoid)

    U.deepStrictEqual(M.of('a'), ['', 'a'])

    const fa: _.Writer<string, number> = ['w1', 1]
    const f = (n: number): _.Writer<string, number> => ['w2', n * 2]
    U.deepStrictEqual(pipe(fa, M.flatMap(f)), ['w1w2', 2])
  })

  it('getFlattenableRec', () => {
    const { flatMapRec } = _.getFlattenableRec(RA.getMonoid<number>())
    function seqReq(upper: number): readonly [ReadonlyArray<number>, number] {
      return pipe(
        1,
        flatMapRec((init) => [[init], init >= upper ? E.right(init) : E.left(init + 1)])
      )
    }
    const xs = _.fst(seqReq(10000))
    U.deepStrictEqual(xs.length, 10000)
    U.deepStrictEqual(xs[0], 1)
    U.deepStrictEqual(xs[xs.length - 1], 10000)
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyArrayWithIndex', () => {
    const { of } = _.getFromIdentity(S.Monoid)
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
    const { of } = _.getFromIdentity(S.Monoid)
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
    const { of } = _.getFromIdentity(S.Monoid)
    const sequenceReadonlyArray = _.sequenceReadonlyArray(S.Monoid)
    U.deepStrictEqual(pipe([of('a'), of('b')], sequenceReadonlyArray), of(['a', 'b']))
  })
})
