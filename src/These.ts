import { HKT } from './HKT'
import { Applicative } from './Applicative'
import { Functor, FantasyFunctor } from './Functor'
import { Bifunctor, FantasyBifunctor } from './Bifunctor'
import { Foldable, FantasyFoldable } from './Foldable'
import { Traversable, FantasyTraversable } from './Traversable'
import { Option, none, some } from './Option'
import { Setoid } from './Setoid'
import { Semigroup } from './Semigroup'
import { constFalse, toString } from './function'

// Data type isomorphic to `α ∨ β ∨ (α ∧ β)`
// adapted from https://github.com/purescript-contrib/purescript-these

export const URI = 'These'

export type URI = typeof URI

export type These<L, A> = This<L, A> | That<L, A> | Both<L, A>

export class This<L, A>
  implements FantasyFunctor<URI, A>, FantasyBifunctor<URI, L, A>, FantasyFoldable<A>, FantasyTraversable<URI, A> {
  static of = of
  readonly _tag: 'This' = 'This'
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(public readonly value: L) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return this as any
  }
  ap<B>(SL: Semigroup<L>, fab: These<L, (a: A) => B>): These<L, B> {
    return fab.fold(() => fab as any, () => this as any, (l, _) => this_(SL.concat(l, this.value)))
  }
  chain<B>(SL: Semigroup<L>, f: (a: A) => These<L, B>): These<L, B> {
    return this as any
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> {
    return this_(f(this.value))
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>> {
    return f => F.of(this as any)
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return this_(this.value)
  }
  equals(setoidL: Setoid<L>, setoidA: Setoid<A>, fy: These<L, A>): boolean {
    return fy.fold(l => setoidL.equals(l, this.value), constFalse, constFalse)
  }
  concat(SL: Semigroup<L>, SA: Semigroup<A>, fy: These<L, A>): These<L, A> {
    return fy.fold(
      l => this_(SL.concat(this.value, l)),
      a => both(this.value, a),
      (l, a) => both(SL.concat(this.value, l), a)
    )
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `this_(${toString(this.value)})`
  }
}

export class That<L, A>
  implements FantasyFunctor<URI, A>, FantasyBifunctor<URI, L, A>, FantasyFoldable<A>, FantasyTraversable<URI, A> {
  static of = of
  readonly _tag: 'That' = 'That'
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(public readonly value: A) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return new That(f(this.value))
  }
  ap<B>(SL: Semigroup<L>, fab: These<L, (a: A) => B>): These<L, B> {
    return fab.fold(() => fab as any, f => that(f(this.value)), (l, f) => both(l, f(this.value)))
  }
  chain<B>(SL: Semigroup<L>, f: (a: A) => These<L, B>): These<L, B> {
    return f(this.value)
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> {
    return that(g(this.value))
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>> {
    return f => F.map(b => that(b), f(this.value))
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return that(this.value)
  }
  equals(setoidL: Setoid<L>, setoidA: Setoid<A>, fy: These<L, A>): boolean {
    return fy.fold(constFalse, a => setoidA.equals(a, this.value), constFalse)
  }
  concat(SL: Semigroup<L>, SA: Semigroup<A>, fy: These<L, A>): These<L, A> {
    return fy.fold(
      l => both(l, this.value),
      a => that(SA.concat(this.value, a)),
      (l, a) => both(l, SA.concat(this.value, a))
    )
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `that(${toString(this.value)})`
  }
}

export class Both<L, A>
  implements FantasyFunctor<URI, A>, FantasyBifunctor<URI, L, A>, FantasyFoldable<A>, FantasyTraversable<URI, A> {
  static of = of
  readonly _tag: 'Both' = 'Both'
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(public readonly l: L, public readonly a: A) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return new Both(this.l, f(this.a))
  }
  ap<B>(SL: Semigroup<L>, fab: These<L, (a: A) => B>): These<L, B> {
    return fab.fold(() => fab as any, f => both(this.l, f(this.a)), (l, f) => both(SL.concat(l, this.l), f(this.a)))
  }
  chain<B>(SL: Semigroup<L>, f: (a: A) => These<L, B>): These<L, B> {
    return f(this.a).fold(
      l => this_(SL.concat(this.l, l)),
      a => both(this.l, a),
      (l, a) => both(SL.concat(this.l, l), a)
    )
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> {
    return both(f(this.l), g(this.a))
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.a)
  }
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>> {
    return f => F.map(b => both(this.l, b), f(this.a))
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return both(this.l, this.a)
  }
  equals(setoidL: Setoid<L>, setoidA: Setoid<A>, fy: These<L, A>): boolean {
    return fy.fold(constFalse, constFalse, (l, a) => setoidL.equals(l, this.l) && setoidA.equals(a, this.a))
  }
  concat(SL: Semigroup<L>, SA: Semigroup<A>, fy: These<L, A>): These<L, A> {
    return fy.fold(
      l => both(SL.concat(this.l, l), this.a),
      a => both(this.l, SA.concat(this.a, a)),
      (l, a) => both(SL.concat(this.l, l), SA.concat(this.a, a))
    )
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `both(${toString(this.l)}, ${toString(this.a)})`
  }
}

export function equals<L, A>(SL: Setoid<L>, SA: Setoid<A>): (fx: These<L, A>, fy: These<L, A>) => boolean {
  return (fx, fy) => fx.equals(SL, SA, fy)
}

export function getSetoid<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>> {
  return {
    equals: equals(SL, SA)
  }
}

export function concat<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): (fx: These<L, A>, fy: These<L, A>) => These<L, A> {
  return (fx, fy) => fx.concat(SL, SA, fy)
}

export function getSemigroup<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>> {
  return {
    concat: concat(SL, SA)
  }
}

export function fold<L, A, B>(that: (l: L) => B, this_: (a: A) => B, both: (l: L, a: A) => B, fa: These<L, A>): B {
  return fa.fold(that, this_, both)
}

export function map<L, A, B>(f: (a: A) => B, fa: These<L, A>): These<L, B> {
  return fa.map(f)
}

export function of<L, A>(a: A): These<L, A> {
  return new That(a)
}

export function ap<L, A, B>(SL: Semigroup<L>, fab: These<L, (a: A) => B>, fa: These<L, A>): These<L, B> {
  return fa.ap(SL, fab)
}

export function chain<L, A, B>(SL: Semigroup<L>, f: (a: A) => These<L, B>, fa: These<L, A>): These<L, B> {
  return fa.chain(SL, f)
}

export function bimap<L, M, A, B>(f: (l: L) => M, g: (a: A) => B, fa: These<L, A>): These<M, B> {
  return fa.bimap(f, g)
}

export function reduce<L, A, B>(f: (b: B, a: A) => B, b: B, fa: These<L, A>): B {
  return fa.reduce(f, b)
}

export class Ops {
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: These<L, A>) => HKT<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: These<L, A>) => HKT<F, These<L, B>> {
    return <L, A, B>(f: (a: A) => HKT<F, B>, ta: These<L, A>) => ta.traverse(F)(f)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse

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
  return new This(l)
}

export const that = of

export function both<L, A>(b: L, a: A): These<L, A> {
  return new Both(b, a)
}

export function fromThese<L, A>(defaultThis: L, defaultThat: A, fa: These<L, A>): [L, A] {
  return fa.fold<[L, A]>(l => [l, defaultThat], a => [defaultThis, a], (l, a) => [l, a])
}

export function theseLeft<L, A>(fa: These<L, A>): Option<L> {
  return fa.fold(l => some(l), () => none, (l, _) => some(l))
}

export function theseRight<L, A>(fa: These<L, A>): Option<A> {
  return fa.fold(() => none, a => some(a), (_, a) => some(a))
}

export const these: Functor<URI> & Bifunctor<URI> & Foldable<URI> & Traversable<URI> = {
  URI,
  map,
  bimap,
  reduce,
  traverse
}
