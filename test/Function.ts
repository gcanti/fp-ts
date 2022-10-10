import * as assert from 'assert'
import * as B from '../src/boolean'
import * as _ from '../src/Function'
import { combineAll } from '../src/typeclasses/Monoid'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as U from './util'

const f = _.increment
const g = U.double

describe('Function', () => {
  it('flip', () => {
    const f = (a: number) => (b: string) => a - b.length
    U.deepStrictEqual(_.flip(f)('aaa')(2), -1)
  })

  it('id', () => {
    const x = _.id<number>()
    U.deepStrictEqual(x(1), 1)
  })

  it('compose', () => {
    U.deepStrictEqual(_.pipe(S.size, _.compose(U.double))('aaa'), 6)
  })

  it('unsafeCoerce', () => {
    U.deepStrictEqual(_.unsafeCoerce, _.identity)
  })

  it('constTrue', () => {
    U.deepStrictEqual(_.constTrue(), true)
  })

  it('constFalse', () => {
    U.deepStrictEqual(_.constFalse(), false)
  })

  it('constNull', () => {
    U.deepStrictEqual(_.constNull(), null)
  })

  it('constUndefined', () => {
    U.deepStrictEqual(_.constUndefined(), undefined)
  })

  it('constVoid', () => {
    U.deepStrictEqual(_.constVoid(), undefined)
  })

  it('increment', () => {
    U.deepStrictEqual(_.increment(2), 3)
  })

  it('decrement', () => {
    U.deepStrictEqual(_.decrement(2), 1)
  })

  it('absurd', () => {
    assert.throws(() => _.absurd<string>(null as any as never))
  })

  it('flow', () => {
    U.deepStrictEqual(_.flow(f)(2), 3)
    U.deepStrictEqual(_.flow(f, g)(2), 6)
    U.deepStrictEqual(_.flow(f, g, f)(2), 7)
    U.deepStrictEqual(_.flow(f, g, f, g)(2), 14)
    U.deepStrictEqual(_.flow(f, g, f, g, f)(2), 15)
    U.deepStrictEqual(_.flow(f, g, f, g, f, g)(2), 30)
    U.deepStrictEqual(_.flow(f, g, f, g, f, g, f)(2), 31)
    U.deepStrictEqual(_.flow(f, g, f, g, f, g, f, g)(2), 62)
    U.deepStrictEqual(_.flow(f, g, f, g, f, g, f, g, f)(2), 63)
    // this is just to satisfy noImplicitReturns and 100% coverage
    U.deepStrictEqual((_.flow as any)(...[f, g, f, g, f, g, f, g, f, g]), undefined)
  })

  it('tupled', () => {
    const f1 = (a: number): number => a * 2
    const f2 = (a: number, b: number): number => a + b
    const u1 = _.tupled(f1)
    const u2 = _.tupled(f2)
    U.deepStrictEqual(u1([1]), 2)
    U.deepStrictEqual(u2([1, 2]), 3)
  })

  it('untupled', () => {
    const f1 = (a: readonly [number]): number => a[0] * 2
    const f2 = (a: readonly [number, number]): number => a[0] + a[1]
    const u1 = _.untupled(f1)
    const u2 = _.untupled(f2)
    U.deepStrictEqual(u1(1), 2)
    U.deepStrictEqual(u2(1, 2), 3)
  })

  it('pipe', () => {
    U.deepStrictEqual(_.pipe(2), 2)
    U.deepStrictEqual(_.pipe(2, f), 3)
    U.deepStrictEqual(_.pipe(2, f, g), 6)
    U.deepStrictEqual(_.pipe(2, f, g, f), 7)
    U.deepStrictEqual(_.pipe(2, f, g, f, g), 14)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f), 15)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g), 30)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f), 31)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g), 62)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f), 63)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g), 126)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f), 127)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g), 254)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f), 255)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 510)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 511)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 1022)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 1023)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 2046)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 2047)
    U.deepStrictEqual((_.pipe as any)(...[2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g]), 4094)
  })

  it('getMonoid', () => {
    const getPredicateMonoidAll = _.getMonoid(B.MonoidAnd)
    const getPredicateMonoidAny = _.getMonoid(B.MonoidOr)

    const isLessThan10 = (n: number) => n <= 10
    const isEven = (n: number) => n % 2 === 0

    U.deepStrictEqual(
      _.pipe([1, 2, 3, 40], RA.filter(combineAll(getPredicateMonoidAll<number>())([isLessThan10, isEven]))),
      [2]
    )
    U.deepStrictEqual(
      _.pipe([1, 2, 3, 40, 41], RA.filter(combineAll(getPredicateMonoidAny<number>())([isLessThan10, isEven]))),
      [1, 2, 3, 40]
    )
  })
})
