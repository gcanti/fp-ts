import { HKT, HKTS } from './HKT'
import { StaticMonoid } from './Monoid'
import { StaticApplicative } from './Applicative'
import { StaticSemigroup } from './Semigroup'
import { StaticMonad, FantasyMonad } from './Monad'
import { StaticFoldable, FantasyFoldable } from './Foldable'
import { StaticPlus } from './Plus'
import { StaticExtend, FantasyExtend } from './Extend'
import { StaticSetoid } from './Setoid'
import { StaticTraversable, FantasyTraversable } from './Traversable'
import { StaticAlternative, FantasyAlternative } from './Alternative'
import { constant, constFalse, constTrue, Lazy, Predicate } from './function'

declare module './HKT' {
  interface HKT<A> {
    Option: Option<A>
  }
}

export const URI = 'Option'

export type URI = typeof URI

export type Option<A> = None<A> | Some<A>

export class None<A> implements
  FantasyMonad<URI, A>,
  FantasyFoldable<A>,
  FantasyTraversable<URI, A>,
  FantasyAlternative<URI, A>,
  FantasyExtend<URI, A> {

  static of = of
  static empty = empty
  static zero = zero
  static value: Option<any> = new None()
  readonly _tag = 'None'
  readonly _A: A
  readonly _URI: URI
  private constructor() { }
  map<B>(f: (a: A) => B): Option<B> {
    return none
  }
  of<B>(b: B): Option<B> {
    return of(b)
  }
  ap<B>(fab: Option<(a: A) => B>): Option<B> {
    return none
  }
  chain<B>(f: (a: A) => Option<B>): Option<B> {
    return none
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F]) => HKT<Option<B>, U, V>[F] {
    return <B>(f: (a: A) => HKT<B>[F]) => applicative.of(none)
  }
  zero<B>(): Option<B> {
    return zero<B>()
  }
  alt(fa: Option<A>): Option<A> {
    return fa
  }
  extend<B>(f: (ea: Option<A>) => B): Option<B> {
    return none
  }
  fold<B>(n: Lazy<B>, s: (a: A) => B): B {
    return n()
  }
  getOrElse(f: Lazy<A>): A {
    return f()
  }
  concat(semigroup: StaticSemigroup<A>, fy: Option<A>): Option<A> {
    return fy
  }
  equals(setoid: StaticSetoid<A>, fy: Option<A>): boolean {
    return fy.fold(constTrue, constFalse)
  }
  toNullable(): A | null {
    return null
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return 'None'
  }
}

export const none = None.value

export function zero<A>(): Option<A> {
  return none
}

export function empty<A>(): Option<A> {
  return none
}

export class Some<A> implements
  FantasyMonad<URI, A>,
  FantasyFoldable<A>,
  FantasyTraversable<URI, A>,
  FantasyAlternative<URI, A>,
  FantasyExtend<URI, A> {

  static of = of
  static empty = empty
  static zero = zero
  readonly _tag = 'Some'
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: A) {}
  map<B>(f: (a: A) => B): Option<B> {
    return new Some(f(this.value))
  }
  of<B>(b: B): Option<B> {
    return of(b)
  }
  ap<B>(fab: Option<(a: A) => B>): Option<B> {
    return fab.map(f => f(this.value))
  }
  chain<B>(f: (a: A) => Option<B>): Option<B> {
    return f(this.value)
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return this.fold<B>(constant(b), (a: A) => f(b, a))
  }
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F]) => HKT<Option<B>, U, V>[F] {
    return <B>(f: (a: A) => HKT<B>[F]) => applicative.map<B, Option<B>>(some, f(this.value))
  }
  zero<B>(): Option<B> {
    return zero<B>()
  }
  alt(fa: Option<A>): Option<A> {
    return this
  }
  extend<B>(f: (ea: Option<A>) => B): Option<B> {
    return new Some(f(this))
  }
  fold<B>(n: Lazy<B>, s: (a: A) => B): B {
    return s(this.value)
  }
  getOrElse(f: Lazy<A>): A {
    return this.value
  }
  concat(semigroup: StaticSemigroup<A>, fy: Option<A>): Option<A> {
    return fy.fold(() => this, y => new Some(semigroup.concat(this.value, y)))
  }
  equals(setoid: StaticSetoid<A>, fy: Option<A>): boolean {
    return fy.fold(constFalse, y => setoid.equals(this.value, y))
  }
  toNullable(): A | null {
    return this.value
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Some(${JSON.stringify(this.value)})`
  }
}

export function equals<A>(setoid: StaticSetoid<A>, fx: Option<A>, fy: Option<A>): boolean {
  return fx.equals(setoid, fy)
}

export function fold<A, B>(n: Lazy<B>, s: (a: A) => B, fa: Option<A>): B {
  return fa.fold(n, s)
}

export function fromNullable<A>(a: A | null | undefined): Option<A> {
  return a == null ? none : new Some(a)
}

export function toNullable<A>(fa: Option<A>): A | null {
  return fa.toNullable()
}

export function map<A, B>(f: (a: A) => B, fa: Option<A>): Option<B> {
  return fa.map(f)
}

export function of<A>(a: A): Option<A> {
  return new Some(a)
}

export function ap<A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> {
  return fa.ap(fab)
}

export function chain<A, B>(f: (a: A) => Option<B>, fa: Option<A>): Option<B> {
  return fa.chain(f)
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: Option<A>): B {
  return fa.reduce(f, b)
}

export function traverse<F extends HKTS>(applicative: StaticApplicative<F>): <A, B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F], ta: Option<A>) => HKT<Option<B>, U, V>[F] {
  return <A, B>(f: (a: A) => HKT<B>[F], ta: Option<A>) => ta.traverse<F>(applicative)<B>(f)
}

export function alt<A>(fx: Option<A>, fy: Option<A>): Option<A> {
  return fx.alt(fy)
}

export function extend<A, B>(f: (ea: Option<A>) => B, ea: Option<A>): Option<B> {
  return ea.extend(f)
}

/** Maybe monoid returning the leftmost non-None value */
export function getFirstStaticMonoid<A>(): StaticMonoid<Option<A>> {
  return { empty, concat: alt }
}

export function concat<A>(semigroup: StaticSemigroup<A>, fx: Option<A>, fy: Option<A>): Option<A> {
  return fx.concat(semigroup, fy)
}

export function getStaticSemigroup<A>(semigroup: StaticSemigroup<A>): StaticSemigroup<Option<A>> {
  return { concat: (fx, fy) => concat(semigroup, fx, fy) }
}

export function getStaticMonoid<A>(semigroup: StaticSemigroup<A>): StaticMonoid<Option<A>> {
  return { empty, concat: getStaticSemigroup(semigroup).concat }
}

export function isSome<A>(fa: Option<A>): fa is Some<A> {
  return fa._tag === 'Some'
}

export function isNone<A>(fa: Option<A>): fa is None<A> {
  return fa === none
}

export const some = of

export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A> {
  return a => predicate(a) ? some<A>(a) : none
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, reduce, traverse, zero, alt, extend } as (
    StaticMonad<URI> &
    StaticFoldable<URI> &
    StaticPlus<URI> &
    StaticTraversable<URI> &
    StaticAlternative<URI> &
    StaticExtend<URI>
  )
)
