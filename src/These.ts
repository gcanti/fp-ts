import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
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

declare module './HKT' {
  interface URI2HKT2<L, A> {
    These: These<L, A>
  }
}

export const URI = 'These'

export type URI = typeof URI

export type These<L, A> = This<L, A> | That<L, A> | Both<L, A>

export class This<L, A>
  implements FantasyFunctor<URI, A>, FantasyBifunctor<URI, L, A>, FantasyFoldable<A>, FantasyTraversable<URI, A> {
  readonly _tag: 'This' = 'This'
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(public readonly value: L) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return this as any
  }
  ap<B>(SL: Semigroup<L>, fab: These<L, (a: A) => B>): These<L, B> {
    return fab.fold(() => fab as any, () => this as any, (l, _) => this_(SL.concat(l)(this.value)))
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
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2As<F, M, B>) => HKT2As<F, M, These<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>> {
    return f => F.of(this as any)
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return this_(this.value)
  }
  equals(setoidL: Setoid<L>, setoidA: Setoid<A>): (fy: These<L, A>) => boolean {
    return fy => fy.fold(l => setoidL.equals(l)(this.value), constFalse, constFalse)
  }
  concat(SL: Semigroup<L>, SA: Semigroup<A>): (fy: These<L, A>) => These<L, A> {
    return fy =>
      fy.fold(
        l => this_(SL.concat(this.value)(l)),
        a => both(this.value, a),
        (l, a) => both(SL.concat(this.value)(l), a)
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
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2As<F, M, B>) => HKT2As<F, M, These<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>> {
    return f => F.map(b => that(b), f(this.value))
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return that(this.value)
  }
  equals(setoidL: Setoid<L>, setoidA: Setoid<A>): (fy: These<L, A>) => boolean {
    return fy => fy.fold(constFalse, a => setoidA.equals(a)(this.value), constFalse)
  }
  concat(SL: Semigroup<L>, SA: Semigroup<A>): (fy: These<L, A>) => These<L, A> {
    return fy =>
      fy.fold(
        l => both(l, this.value),
        a => that(SA.concat(this.value)(a)),
        (l, a) => both(l, SA.concat(this.value)(a))
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
  readonly _tag: 'Both' = 'Both'
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(public readonly l: L, public readonly a: A) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return new Both(this.l, f(this.a))
  }
  ap<B>(SL: Semigroup<L>, fab: These<L, (a: A) => B>): These<L, B> {
    return fab.fold(() => fab as any, f => both(this.l, f(this.a)), (l, f) => both(SL.concat(l)(this.l), f(this.a)))
  }
  chain<B>(SL: Semigroup<L>, f: (a: A) => These<L, B>): These<L, B> {
    return f(this.a).fold(
      l => this_(SL.concat(this.l)(l)),
      a => both(this.l, a),
      (l, a) => both(SL.concat(this.l)(l), a)
    )
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> {
    return both(f(this.l), g(this.a))
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.a)
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2As<F, M, B>) => HKT2As<F, M, These<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>> {
    return f => F.map(b => both(this.l, b), f(this.a))
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return both(this.l, this.a)
  }
  equals(setoidL: Setoid<L>, setoidA: Setoid<A>): (fy: These<L, A>) => boolean {
    return fy => fy.fold(constFalse, constFalse, (l, a) => setoidL.equals(l)(this.l) && setoidA.equals(a)(this.a))
  }
  concat(SL: Semigroup<L>, SA: Semigroup<A>): (fy: These<L, A>) => These<L, A> {
    return fy =>
      fy.fold(
        l => both(SL.concat(this.l)(l), this.a),
        a => both(this.l, SA.concat(this.a)(a)),
        (l, a) => both(SL.concat(this.l)(l), SA.concat(this.a)(a))
      )
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `both(${toString(this.l)}, ${toString(this.a)})`
  }
}

export const equals = <L, A>(SL: Setoid<L>, SA: Setoid<A>) => (fx: These<L, A>) => (fy: These<L, A>): boolean =>
  fx.equals(SL, SA)(fy)

export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>> => ({
  equals: equals(SL, SA)
})

export const concat = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>) => (fx: These<L, A>) => (
  fy: These<L, A>
): These<L, A> => fx.concat(SL, SA)(fy)

export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>> => ({
  concat: concat(SL, SA)
})

export const fold = <L, A, B>(that: (l: L) => B, this_: (a: A) => B, both: (l: L, a: A) => B, fa: These<L, A>): B =>
  fa.fold(that, this_, both)

export const map = <L, A, B>(f: (a: A) => B, fa: These<L, A>): These<L, B> => fa.map(f)

export const of = <L, A>(a: A): These<L, A> => new That(a)

export const ap = <L, A, B>(SL: Semigroup<L>, fab: These<L, (a: A) => B>, fa: These<L, A>): These<L, B> =>
  fa.ap(SL, fab)

export const chain = <L, A, B>(SL: Semigroup<L>, f: (a: A) => These<L, B>, fa: These<L, A>): These<L, B> =>
  fa.chain(SL, f)

export const bimap = <L, M, A, B>(f: (l: L) => M, g: (a: A) => B): ((fla: These<L, A>) => These<M, B>) => fla =>
  fla.bimap(f, g)

export const reduce = <L, A, B>(f: (b: B, a: A) => B, b: B, fa: These<L, A>): B => fa.reduce(f, b)

export class Ops {
  traverse<F extends HKT2S>(
    F: Applicative<F>
  ): <M, L, A, B>(f: (a: A) => HKT2As<F, M, B>, ta: These<L, A>) => HKT2As<F, M, These<L, B>>
  traverse<F extends HKTS>(
    F: Applicative<F>
  ): <L, A, B>(f: (a: A) => HKTAs<F, B>, ta: These<L, A>) => HKTAs<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: These<L, A>) => HKT<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: These<L, A>) => HKT<F, These<L, B>> {
    return (f, ta) => ta.traverse(F)(f)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse

export const isThis = <L, A>(fa: These<L, A>): fa is This<L, A> => fa._tag === 'This'

export const isThat = <L, A>(fa: These<L, A>): fa is That<L, A> => fa._tag === 'That'

export const isBoth = <L, A>(fa: These<L, A>): fa is Both<L, A> => fa._tag === 'Both'

export const this_ = <L, A>(l: L): These<L, A> => new This(l)

export const that = of

export const both = <L, A>(l: L, a: A): These<L, A> => new Both(l, a)

export const fromThese = <L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A] =>
  fa.fold<[L, A]>(l => [l, defaultThat], a => [defaultThis, a], (l, a) => [l, a])

export const theseLeft = <L, A>(fa: These<L, A>): Option<L> => fa.fold(l => some(l), () => none, (l, _) => some(l))

export const theseRight = <L, A>(fa: These<L, A>): Option<A> => fa.fold(() => none, a => some(a), (_, a) => some(a))

export const these: Functor<URI> & Bifunctor<URI> & Foldable<URI> & Traversable<URI> = {
  URI,
  map,
  bimap,
  reduce,
  traverse
}
