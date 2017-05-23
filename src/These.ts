import { HKT, HKTS, HKT2, HKT2S } from './HKT'
import { StaticApplicative } from './Applicative'
import { Option, none, some } from './Option'
import { StaticSetoid } from './Setoid'
import { StaticSemigroup } from './Semigroup'
import { constFalse } from './function'

// Data type isomorphic to `α ∨ β ∨ (α ∧ β)`
// adapted from https://github.com/purescript-contrib/purescript-these

declare module './HKT' {
  interface HKT<A> {
    These: These<any, A>
  }
  interface HKT2<A, B> {
    These: These<A, B>
  }
}

export const URI = 'These'

export type URI = typeof URI

export type These<L, A> = This<L, A> | That<L, A> | Both<L, A>

export class This<L, A> {
  static of = of
  readonly _tag = 'This'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: L) { }
  map<B>(f: (a: A) => B): These<L, B> {
    return this as any
  }
  ap<B>(semigroupL: StaticSemigroup<L>, fab: These<L, (a: A) => B>): These<L, B> {
    return fab.fold(
      () => fab as any,
      () => this as any,
      (l, _) => this_<L, B>(semigroupL.concat(l, this.value))
    )
  }
  chain<B>(semigroupL: StaticSemigroup<L>, f: (a: A) => These<L, B>): These<L, B> {
    return this as any
  }
  bimap<L2, B>(f: (l: L) => L2, g: (a: A) => B): These<L2, B> {
    return this_<L2, B>(f(this.value))
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F extends HKT2S>(applicative: StaticApplicative<F>): <L2, B>(f: (a: A) => HKT2<L2, B>[F]) => HKT2<L2, These<L, B>>[F]
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B>(f: (a: A) => HKT<B>[F]) => HKT<These<L, B>>[F]
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B>(f: (a: A) => HKT<B>[F]) => HKT<These<L, B>>[F] {
    return <B>(f: (a: A) => HKT<B>[F]) => applicative.of(this)
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return this_(this.value)
  }
  equals(setoidL: StaticSetoid<L>, setoidA: StaticSetoid<A>, fy: These<L, A>): boolean {
    return fy.fold(
      l => setoidL.equals(l, this.value),
      constFalse,
      constFalse
    )
  }
  concat(semigroupL: StaticSemigroup<L>, semigroupA: StaticSemigroup<A>, fy: These<L, A>): These<L, A> {
    return fy.fold(
      l => this_<L, A>(semigroupL.concat(this.value, l)),
      a => both(this.value, a),
      (l, a) => both(semigroupL.concat(this.value, l), a)
    )
  }
}

export class That<L, A> {
  static of = of
  readonly _tag = 'That'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: A) { }
  map<B>(f: (a: A) => B): These<L, B> {
    return new That<L, B>(f(this.value))
  }
  ap<B>(semigroupL: StaticSemigroup<L>, fab: These<L, (a: A) => B>): These<L, B> {
    return fab.fold(
      () => fab as any,
      f => that(f(this.value)),
      (l, f) => both(l, f(this.value))
    )
  }
  chain<B>(semigroupL: StaticSemigroup<L>, f: (a: A) => These<L, B>): These<L, B> {
    return f(this.value)
  }
  bimap<L2, B>(f: (l: L) => L2, g: (a: A) => B): These<L2, B> {
    return that<L2, B>(g(this.value))
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F extends HKT2S>(applicative: StaticApplicative<F>): <L2, B>(f: (a: A) => HKT2<L2, B>[F]) => HKT2<L2, These<L, B>>[F]
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B>(f: (a: A) => HKT<B>[F]) => HKT<These<L, B>>[F]
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B>(f: (a: A) => HKT<B>[F]) => HKT<These<L, B>>[F] {
    return <B>(f: (a: A) => HKT<B>[F]) => applicative.map((b: B) => that<L, B>(b), f(this.value))
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return that(this.value)
  }
  equals(setoidL: StaticSetoid<L>, setoidA: StaticSetoid<A>, fy: These<L, A>): boolean {
    return fy.fold(
      constFalse,
      a => setoidA.equals(a, this.value),
      constFalse
    )
  }
  concat(semigroupL: StaticSemigroup<L>, semigroupA: StaticSemigroup<A>, fy: These<L, A>): These<L, A> {
    return fy.fold(
      l => both(l, this.value),
      a => that<L, A>(semigroupA.concat(this.value, a)),
      (l, a) => both(l, semigroupA.concat(this.value, a))
    )
  }
}

export class Both<L, A> {
  static of = of
  readonly _tag = 'Both'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly l: L, public readonly a: A) { }
  map<B>(f: (a: A) => B): These<L, B> {
    return new Both<L, B>(this.l, f(this.a))
  }
  ap<B>(semigroupL: StaticSemigroup<L>, fab: These<L, (a: A) => B>): These<L, B> {
    return fab.fold(
      () => fab as any,
      f => both(this.l, f(this.a)),
      (l, f) => both(semigroupL.concat(l, this.l), f(this.a))
    )
  }
  chain<B>(semigroupL: StaticSemigroup<L>, f: (a: A) => These<L, B>): These<L, B> {
    return f(this.a).fold(
      l => this_<L, B>(semigroupL.concat(this.l, l)),
      a => both(this.l, a),
      (l, a) => both(semigroupL.concat(this.l, l), a)
    )
  }
  bimap<L2, B>(f: (l: L) => L2, g: (a: A) => B): These<L2, B> {
    return both(f(this.l), g(this.a))
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.a)
  }
  traverse<F extends HKT2S>(applicative: StaticApplicative<F>): <L2, B>(f: (a: A) => HKT2<L2, B>[F]) => HKT2<L2, These<L, B>>[F]
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B>(f: (a: A) => HKT<B>[F]) => HKT<These<L, B>>[F]
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B>(f: (a: A) => HKT<B>[F]) => HKT<These<L, B>>[F] {
    return <B>(f: (a: A) => HKT<B>[F]) => applicative.map((b: B) => both(this.l, b), f(this.a))
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return both(this.l, this.a)
  }
  equals(setoidL: StaticSetoid<L>, setoidA: StaticSetoid<A>, fy: These<L, A>): boolean {
    return fy.fold(
      constFalse,
      constFalse,
      (l, a) => setoidL.equals(l, this.l) && setoidA.equals(a, this.a)
    )
  }
  concat(semigroupL: StaticSemigroup<L>, semigroupA: StaticSemigroup<A>, fy: These<L, A>): These<L, A> {
    return fy.fold(
      l => both(semigroupL.concat(this.l, l), this.a),
      a => both(this.l, semigroupA.concat(this.a, a)),
      (l, a) => both(semigroupL.concat(this.l, l), semigroupA.concat(this.a, a))
    )
  }
}

export function equals<L, A>(setoidL: StaticSetoid<L>, setoidA: StaticSetoid<A>, fx: These<L, A>, fy: These<L, A>): boolean {
  return fx.equals(setoidL, setoidA, fy)
}

export function concat<L, A>(semigroupL: StaticSemigroup<L>, semigroupA: StaticSemigroup<A>, fx: These<L, A>, fy: These<L, A>): These<L, A> {
  return fx.concat(semigroupL, semigroupA, fy)
}

export function fold<L, A, B>(that: (l: L) => B, this_: (a: A) => B, both: (l: L, a: A) => B, fa: These<L, A>): B {
  return fa.fold(that, this_, both)
}

export function map<L, A, B>(f: (a: A) => B, fa: These<L, A>): These<L, B> {
  return fa.map(f)
}
export function of<L, A>(a: A): These<L, A> {
  return new That<L, A>(a)
}

export function ap<L, A, B>(semigroupL: StaticSemigroup<L>, fab: These<L, (a: A) => B>, fa: These<L, A>): These<L, B> {
  return fa.ap(semigroupL, fab)
}

export function chain<L, A, B>(semigroupL: StaticSemigroup<L>, f: (a: A) => These<L, B>, fa: These<L, A>): These<L, B> {
  return fa.chain(semigroupL, f)
}

export function bimap<L, L2, A, B>(f: (l: L) => L2, g: (a: A) => B, fa: These<L, A>): These<L2, B> {
  return fa.bimap(f, g)
}

export function reduce<L, A, B>(f: (b: B, a: A) => B, b: B, fa: These<L, A>): B {
  return fa.reduce(f, b)
}

export function traverse<F extends HKT2S>(applicative: StaticApplicative<F>): <L2, L, A, B>(f: (a: A) => HKT2<L2, B>[F], ta: These<L, A>) => HKT2<L2, These<L, B>>[F]
export function traverse<F extends HKTS>(applicative: StaticApplicative<F>): <L, A, B>(f: (a: A) => HKT<B>[F], ta: These<L, A>) => HKT<These<L, B>>[F]
export function traverse<F extends HKTS>(applicative: StaticApplicative<F>): <L, A, B>(f: (a: A) => HKT<B>[F], ta: These<L, A>) => HKT<These<L, B>>[F] {
  return <L, A, B>(f: (a: A) => HKT<B>[F], ta: These<L, A>) => ta.traverse<F>(applicative)<B>(f)
}

export function isThis<L, A>(fa: These<L, A>): fa is This<L, A> {
  return fa._tag === 'This'
}

export function isThat<L, A>(fa: These<L, A>): fa is That<L, A> {
  return fa._tag === 'That'
}

export function isBoth<L, A>(fa: These<L, A>): fa is Both<L, A> {
  return fa._tag === 'Both'
}

export function this_<L, A>(l: L): These<L, A> {
  return new This<L, A>(l)
}

export function that<L, A>(a: A): These<L, A> {
  return new That<L, A>(a)
}

export function both<L, A>(b: L, a: A): These<L, A> {
  return new Both<L, A>(b, a)
}

export function fromThese<L, A>(defaultThis: L, defaultThat: A, fa: These<L, A>): [L, A] {
  return fa.fold<[L, A]>(
    l => [l, defaultThat],
    a => [defaultThis, a],
    (l, a) => [l, a]
  )
}

export function theseLeft<L, A>(fa: These<L, A>): Option<L> {
  return fa.fold(
    l => some(l),
    () => none,
    (l, _) => some(l)
  )
}

export function theseRight<L, A>(fa: These<L, A>): Option<A> {
  return fa.fold(
    () => none,
    a => some(a),
    (_, a) => some(a)
  )
}
