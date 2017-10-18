import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Applicative } from './Applicative'
import { Functor, FantasyFunctor } from './Functor'
import { Bifunctor, FantasyBifunctor } from './Bifunctor'
import { Foldable, FantasyFoldable } from './Foldable'
import { Traversable, FantasyTraversable } from './Traversable'
import { Option, none, some } from './Option'
import { Setoid } from './Setoid'
import { Semigroup } from './Semigroup'
import { toString, constFalse } from './function'
import { Monad } from './Monad'

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
  constructor(readonly value: L) {}
  map<B>(f: (a: A) => B): These<L, B> {
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
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return new That(f(this.value))
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
  constructor(readonly l: L, readonly a: A) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return new Both(this.l, f(this.a))
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
  inspect() {
    return this.toString()
  }
  toString() {
    return `both(${toString(this.l)}, ${toString(this.a)})`
  }
}

export const fold = <L, A, B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B) => (fa: These<L, A>): B =>
  fa.fold(this_, that, both)

export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>> => ({
  equals: x => y =>
    x.fold(
      lx => y.fold(ly => SL.equals(lx)(ly), constFalse, constFalse),
      ax => y.fold(constFalse, ay => SA.equals(ax)(ay), constFalse),
      (lx, ax) => y.fold(constFalse, constFalse, (ly, ay) => SL.equals(lx)(ly) && SA.equals(ax)(ay))
    )
})

export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>> => ({
  concat: x => y =>
    x.fold(
      lx => y.fold(ly => this_(SL.concat(lx)(ly)), ay => both(lx, ay), (ly, ay) => both(SL.concat(lx)(ly), ay)),
      ax => y.fold(lx => both(lx, ax), ay => that(SA.concat(ax)(ay)), (ly, ay) => both(ly, SA.concat(ax)(ay))),
      (lx, ax) =>
        y.fold(
          ly => both(SL.concat(lx)(ly), ax),
          ay => both(lx, SA.concat(ax)(ay)),
          (ly, ay) => both(SL.concat(lx)(ly), SA.concat(ax)(ay))
        )
    )
})

export const map = <L, A, B>(f: (a: A) => B, fa: These<L, A>): These<L, B> => fa.map(f)

export const of = <L, A>(a: A): These<L, A> => new That(a)

export const ap = <L>(S: Semigroup<L>) => <A, B>(fab: These<L, (a: A) => B>, fa: These<L, A>) =>
  chain(S)(f => map(f, fa), fab)

export const chain = <L>(S: Semigroup<L>) => <A, B>(f: (a: A) => These<L, B>, fa: These<L, A>): These<L, B> =>
  fa.fold(
    () => fa as any,
    a => f(a),
    (l1, a) => f(a).fold(l2 => this_(S.concat(l1)(l2)), b => both(l1, b), (l2, b) => both(S.concat(l1)(l2), b))
  )

export const getMonad = <L>(S: Semigroup<L>): Monad<URI> => ({
  URI,
  map,
  of,
  ap: ap(S),
  chain: chain(S)
})

export const bimap = <L, M, A, B>(f: (l: L) => M, g: (a: A) => B, fla: These<L, A>): These<M, B> => fla.bimap(f, g)

export const reduce = <L, A, B>(f: (b: B, a: A) => B, b: B, fa: These<L, A>): B => fa.reduce(f, b)

export class Ops {
  traverse<F extends HKT2S>(
    F: Applicative<F>
  ): <M, L, A, B>(f: (a: A) => HKT2As<F, M, B>, ta: These<L, A>) => HKT2As<F, M, These<L, B>>
  traverse<F extends HKTS>(
    F: Applicative<F>
  ): <L, A, B>(f: (a: A) => HKTAs<F, B>, ta: These<L, A>) => HKTAs<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: HKT<URI, A>) => HKT<F, These<L, B>>
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
