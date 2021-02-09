import * as U from './util'
import * as Apply from '../src/Apply'
import { identity, pipe } from '../src/function'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as S from '../src/string'
import * as _ from '../src/These'

describe('These', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number) => n * 2
      U.deepStrictEqual(pipe(_.left(2), _.map(double)), _.left(2))
      U.deepStrictEqual(pipe(_.right(2), _.map(double)), _.right(4))
      U.deepStrictEqual(pipe(_.both(1, 2), _.map(double)), _.both(1, 4))
    })

    it('bimap', () => {
      const len = (s: string): number => s.length
      const double = (n: number): number => n * 2
      U.deepStrictEqual(pipe(_.left('a'), _.bimap(len, double)), _.left(1))
      U.deepStrictEqual(pipe(_.right(2), _.bimap(len, double)), _.right(4))
      U.deepStrictEqual(pipe(_.both('foo', 1), _.bimap(len, double)), _.both(3, 2))
    })

    it('mapLeft', () => {
      const len = (s: string): number => s.length
      U.deepStrictEqual(pipe(_.left('a'), _.mapLeft(len)), _.left(1))
      U.deepStrictEqual(pipe(_.right(2), _.mapLeft(len)), _.right(2))
      U.deepStrictEqual(pipe(_.both('foo', 1), _.mapLeft(len)), _.both(3, 1))
    })

    it('reduce', () => {
      U.deepStrictEqual(
        pipe(
          _.left('b'),
          _.reduce('a', (b, a) => b + a)
        ),
        'a'
      )
      U.deepStrictEqual(
        pipe(
          _.right('b'),
          _.reduce('a', (b, a) => b + a)
        ),
        'ab'
      )
      U.deepStrictEqual(
        pipe(
          _.both(1, 'b'),
          _.reduce('a', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      U.deepStrictEqual(pipe(_.right('a'), _.foldMap(S.Monoid)(identity)), 'a')
      U.deepStrictEqual(pipe(_.left(1), _.foldMap(S.Monoid)(identity)), '')
      U.deepStrictEqual(pipe(_.both(1, 'a'), _.foldMap(S.Monoid)(identity)), 'a')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      U.deepStrictEqual(pipe(_.right('a'), _.reduceRight('', f)), 'a')
      U.deepStrictEqual(pipe(_.left(1), _.reduceRight('', f)), '')
      U.deepStrictEqual(pipe(_.both(1, 'a'), _.reduceRight('', f)), 'a')
    })

    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none))
      U.deepStrictEqual(pipe(_.left('a'), traverse), O.some(_.left('a')))
      U.deepStrictEqual(pipe(_.right(2), traverse), O.some(_.right(2)))
      U.deepStrictEqual(pipe(_.right(1), traverse), O.none)
      U.deepStrictEqual(pipe(_.both('a', 2), traverse), O.some(_.both('a', 2)))
      U.deepStrictEqual(
        pipe(
          _.both('a', 1),
          _.traverse(O.Applicative)((n) => (n >= 2 ? O.some(n) : O.none))
        ),
        O.none
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      U.deepStrictEqual(sequence(_.left('a')), O.some(_.left('a')))
      U.deepStrictEqual(sequence(_.right(O.some(1))), O.some(_.right(1)))
      U.deepStrictEqual(sequence(_.right(O.none)), O.none)
      U.deepStrictEqual(sequence(_.both('a', O.some(1))), O.some(_.both('a', 1)))
      U.deepStrictEqual(sequence(_.both('a', O.none)), O.none)
    })
  })

  it('ap', () => {
    const M = _.getMonad(S.Semigroup)
    const sequenceT = Apply.sequenceT(M)
    U.deepStrictEqual(sequenceT(_.right(1), _.right(2)), _.right([1, 2]))
    U.deepStrictEqual(sequenceT(_.right(1), _.left('b')), _.left('b'))
    U.deepStrictEqual(sequenceT(_.right(1), _.both('b', 2)), _.both('b', [1, 2]))
    U.deepStrictEqual(sequenceT(_.left('a'), _.right(2)), _.left('a'))
    U.deepStrictEqual(sequenceT(_.left('a'), _.left('b')), _.left('ab'))
    U.deepStrictEqual(sequenceT(_.left('a'), _.both('b', 2)), _.left('ab'))
    U.deepStrictEqual(sequenceT(_.both('a', 1), _.right(2)), _.both('a', [1, 2]))
    U.deepStrictEqual(sequenceT(_.both('a', 1), _.left('b')), _.left('ab'))
    U.deepStrictEqual(sequenceT(_.both('a', 1), _.both('b', 2)), _.both('ab', [1, 2]))
  })

  it('chain', () => {
    const M = _.getMonad(S.Monoid)
    const f = (n: number) => (n >= 2 ? (n <= 5 ? _.right(n * 2) : _.both('bar', n)) : _.left('bar'))
    U.deepStrictEqual(M.chain(_.left('foo'), f), _.left('foo'))
    U.deepStrictEqual(M.chain(_.right(2), f), _.right(4))
    U.deepStrictEqual(M.chain(_.right(1), f), _.left('bar'))
    U.deepStrictEqual(M.chain(_.right(6), f), _.both('bar', 6))
    U.deepStrictEqual(M.chain(_.both('foo', 2), f), _.both('foo', 4))
    U.deepStrictEqual(M.chain(_.both('foo', 1), f), _.left('foobar'))
    U.deepStrictEqual(M.chain(_.both('foo', 6), f), _.both('foobar', 6))
  })

  it('getEq', () => {
    const { equals } = _.getEq(N.Eq, N.Eq)
    U.deepStrictEqual(equals(_.left(2), _.left(2)), true)
    U.deepStrictEqual(equals(_.left(2), _.left(3)), false)
    U.deepStrictEqual(equals(_.left(3), _.left(2)), false)
    U.deepStrictEqual(equals(_.left(2), _.right(2)), false)
    U.deepStrictEqual(equals(_.left(2), _.both(2, 2)), false)
    U.deepStrictEqual(equals(_.right(2), _.right(2)), true)
    U.deepStrictEqual(equals(_.right(2), _.right(3)), false)
    U.deepStrictEqual(equals(_.right(3), _.right(2)), false)
    U.deepStrictEqual(equals(_.right(2), _.both(2, 2)), false)
    U.deepStrictEqual(equals(_.both(2, 2), _.both(2, 2)), true)
    U.deepStrictEqual(equals(_.both(2, 3), _.both(3, 2)), false)
  })

  it('getSemigroup', () => {
    const { concat } = _.getSemigroup(S.Semigroup, N.SemigroupSum)
    U.deepStrictEqual(concat(_.left('a'), _.left('b')), _.left('ab'))
    U.deepStrictEqual(concat(_.left('a'), _.right(2)), _.both('a', 2))
    U.deepStrictEqual(concat(_.right(2), _.left('a')), _.both('a', 2))
    U.deepStrictEqual(concat(_.left('a'), _.both('b', 2)), _.both('ab', 2))
    U.deepStrictEqual(concat(_.both('b', 2), _.left('a')), _.both('ba', 2))
    U.deepStrictEqual(concat(_.right(3), _.right(2)), _.right(5))
    U.deepStrictEqual(concat(_.right(3), _.both('b', 2)), _.both('b', 5))
    U.deepStrictEqual(concat(_.both('b', 2), _.right(3)), _.both('b', 5))
    U.deepStrictEqual(concat(_.both('a', 3), _.both('b', 2)), _.both('ab', 5))
  })

  it('fold', () => {
    const double = (n: number) => n * 2
    const len = (s: string) => s.length
    const f = (s: string, n: number) => len(s) + double(n)
    const fold = _.fold(len, double, f)
    U.deepStrictEqual(fold(_.left('foo')), 3)
    U.deepStrictEqual(fold(_.right(1)), 2)
    U.deepStrictEqual(fold(_.both('foo', 1)), 5)
  })

  it('toTuple', () => {
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(pipe(_.left('b'), _.toTuple('a', 1)), ['b', 1])
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(pipe(_.right(2), _.toTuple('a', 1)), ['a', 2])
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(pipe(_.both('b', 2), _.toTuple('a', 1)), ['b', 2])
  })

  it('getLeft', () => {
    U.deepStrictEqual(_.getLeft(_.left('a')), O.some('a'))
    U.deepStrictEqual(_.getLeft(_.right(1)), O.none)
    U.deepStrictEqual(_.getLeft(_.both('a', 1)), O.some('a'))
  })

  it('getRight', () => {
    U.deepStrictEqual(_.getRight(_.left('a')), O.none)
    U.deepStrictEqual(_.getRight(_.right(1)), O.some(1))
    U.deepStrictEqual(_.getRight(_.both('a', 1)), O.some(1))
  })

  it('leftOrBoth', () => {
    U.deepStrictEqual(_.leftOrBoth('a')(O.none), _.left('a'))
    U.deepStrictEqual(_.leftOrBoth('a')(O.some(1)), _.both('a', 1))
  })

  it('rightOrBoth', () => {
    U.deepStrictEqual(_.rightOrBoth(1)(O.none), _.right(1))
    U.deepStrictEqual(_.rightOrBoth(1)(O.some('a')), _.both('a', 1))
  })

  it('getLeftOnly', () => {
    U.deepStrictEqual(_.getLeftOnly(_.left('a')), O.some('a'))
    U.deepStrictEqual(_.getLeftOnly(_.right(1)), O.none)
    U.deepStrictEqual(_.getLeftOnly(_.both('a', 1)), O.none)
  })

  it('getRightOnly', () => {
    U.deepStrictEqual(_.getRightOnly(_.left('a')), O.none)
    U.deepStrictEqual(_.getRightOnly(_.right(1)), O.some(1))
    U.deepStrictEqual(_.getRightOnly(_.both('a', 1)), O.none)
  })

  it('fromOptions', () => {
    U.deepStrictEqual(_.fromOptions(O.none, O.none), O.none)
    U.deepStrictEqual(_.fromOptions(O.some('a'), O.none), O.some(_.left('a')))
    U.deepStrictEqual(_.fromOptions(O.none, O.some(1)), O.some(_.right(1)))
    U.deepStrictEqual(_.fromOptions(O.some('a'), O.some(1)), O.some(_.both('a', 1)))
  })

  it('isLeft', () => {
    U.deepStrictEqual(_.isLeft(_.left(1)), true)
    U.deepStrictEqual(_.isLeft(_.right(1)), false)
    U.deepStrictEqual(_.isLeft(_.both('1', 1)), false)
  })

  it('isRight', () => {
    U.deepStrictEqual(_.isRight(_.left(1)), false)
    U.deepStrictEqual(_.isRight(_.right(1)), true)
    U.deepStrictEqual(_.isRight(_.both('1', 1)), false)
  })

  it('isBoth', () => {
    U.deepStrictEqual(_.isBoth(_.left(1)), false)
    U.deepStrictEqual(_.isBoth(_.right(1)), false)
    U.deepStrictEqual(_.isBoth(_.both('1', 1)), true)
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show, S.Show)
    U.deepStrictEqual(Sh.show(_.left('a')), `left("a")`)
    U.deepStrictEqual(Sh.show(_.right('a')), `right("a")`)
    U.deepStrictEqual(Sh.show(_.both('a', 'b')), `both("a", "b")`)
  })

  it('swap', () => {
    U.deepStrictEqual(_.swap(_.left('a')), _.right('a'))
    U.deepStrictEqual(_.swap(_.right('a')), _.left('a'))
    U.deepStrictEqual(_.swap(_.both('a', 1)), _.both(1, 'a'))
  })
})
