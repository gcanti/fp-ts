import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Applicative } from './Applicative'
import { Functor } from './Functor'
import { Bifunctor } from './Bifunctor'
import { Foldable } from './Foldable'
import { Traversable } from './Traversable'
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

/**
 * @data
 * @constructor This
 * @constructor That
 * @constructor Both
 */
export type These<L, A> = This<L, A> | That<L, A> | Both<L, A>

export class This<L, A> {
  readonly _tag: 'This' = 'This'
  readonly '-A': A
  readonly '-L': L
  readonly '-URI': URI
  constructor(readonly value: L) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return this as any
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> {
    return this_(f(this.value))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return b
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2As<F, M, B>) => HKT2As<F, M, These<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>> {
    return f => F.of(this as any)
  }
  /** Applies a function to each case in the data structure */
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return this_(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `this_(${toString(this.value)})`
  }
  /** Returns `true` if the these is `This`, `false` otherwise */
  isThis(): this is This<L, A> {
    return true
  }
  /** Returns `true` if the these is `That`, `false` otherwise */
  isThat(): this is That<L, A> {
    return false
  }
  /** Returns `true` if the these is `Both`, `false` otherwise */
  isBoth(): this is Both<L, A> {
    return false
  }
}

export class That<L, A> {
  readonly _tag: 'That' = 'That'
  readonly '-A': A
  readonly '-L': L
  readonly '-URI': URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return new That(f(this.value))
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> {
    return that(g(this.value))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.value)
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2As<F, M, B>) => HKT2As<F, M, These<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>> {
    return f => F.map(f(this.value), b => that(b))
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return that(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `that(${toString(this.value)})`
  }
  isThis(): this is This<L, A> {
    return false
  }
  isThat(): this is That<L, A> {
    return true
  }
  isBoth(): this is Both<L, A> {
    return false
  }
}

export class Both<L, A> {
  readonly _tag: 'Both' = 'Both'
  readonly '-A': A
  readonly '-L': L
  readonly '-URI': URI
  constructor(readonly l: L, readonly a: A) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return new Both(this.l, f(this.a))
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> {
    return both(f(this.l), g(this.a))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.a)
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2As<F, M, B>) => HKT2As<F, M, These<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>> {
    return f => F.map(f(this.a), b => both(this.l, b))
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return both(this.l, this.a)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `both(${toString(this.l)}, ${toString(this.a)})`
  }
  isThis(): this is This<L, A> {
    return false
  }
  isThat(): this is That<L, A> {
    return false
  }
  isBoth(): this is Both<L, A> {
    return true
  }
}

/** @function */
export const fold = <L, A, B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B) => (
  fa: These<L, A>
): B => {
  return fa.fold(this_, that, both)
}

/** @function */
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>> => {
  return {
    equals: (x, y) =>
      x.fold(
        lx => y.fold(ly => SL.equals(lx, ly), constFalse, constFalse),
        ax => y.fold(constFalse, ay => SA.equals(ax, ay), constFalse),
        (lx, ax) => y.fold(constFalse, constFalse, (ly, ay) => SL.equals(lx, ly) && SA.equals(ax, ay))
      )
  }
}

/** @function */
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>> => {
  return {
    concat: (x, y) =>
      x.fold(
        lx => y.fold(ly => this_(SL.concat(lx, ly)), ay => both(lx, ay), (ly, ay) => both(SL.concat(lx, ly), ay)),
        ax => y.fold(lx => both(lx, ax), ay => that(SA.concat(ax, ay)), (ly, ay) => both(ly, SA.concat(ax, ay))),
        (lx, ax) =>
          y.fold(
            ly => both(SL.concat(lx, ly), ax),
            ay => both(lx, SA.concat(ax, ay)),
            (ly, ay) => both(SL.concat(lx, ly), SA.concat(ax, ay))
          )
      )
  }
}

/** @function */
export const map = <L, A, B>(fa: These<L, A>, f: (a: A) => B): These<L, B> => {
  return fa.map(f)
}

/** @function */
export const of = <L, A>(a: A): These<L, A> => {
  return new That<L, A>(a)
}

/** @function */
export const ap = <L>(S: Semigroup<L>) => <A, B>(fab: These<L, (a: A) => B>, fa: These<L, A>) => {
  return chain(S)(fab, f => map(fa, f))
}

/** @function */
export const chain = <L>(S: Semigroup<L>) => <A, B>(fa: These<L, A>, f: (a: A) => These<L, B>): These<L, B> => {
  return fa.fold(
    () => fa as any,
    a => f(a),
    (l1, a) => f(a).fold(l2 => this_(S.concat(l1, l2)), b => both(l1, b), (l2, b) => both(S.concat(l1, l2), b))
  )
}

/** @function */
export const getMonad = <L>(S: Semigroup<L>): Monad<URI> => {
  return {
    URI,
    map,
    of,
    ap: ap(S),
    chain: chain(S)
  }
}

/** @function */
export const bimap = <L, M, A, B>(f: (l: L) => M, g: (a: A) => B, fla: These<L, A>): These<M, B> => {
  return fla.bimap(f, g)
}

/** @function */
export const reduce = <L, A, B>(fa: These<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

export function traverse<F extends HKT2S>(
  F: Applicative<F>
): <M, L, A, B>(f: (a: A) => HKT2As<F, M, B>, ta: These<L, A>) => HKT2As<F, M, These<L, B>>
export function traverse<F extends HKTS>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKTAs<F, B>, ta: These<L, A>) => HKTAs<F, These<L, B>>
export function traverse<F>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: HKT<URI, A>) => HKT<F, These<L, B>>
/** @function */
export function traverse<F>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: These<L, A>) => HKT<F, These<L, B>> {
  return (f, ta) => ta.traverse(F)(f)
}

/**
 * Returns `true` if the these is an instance of `This`, `false` otherwise
 * @function
 */
export const isThis = <L, A>(fa: These<L, A>): fa is This<L, A> => {
  return fa.isThis()
}

/**
 * Returns `true` if the these is an instance of `That`, `false` otherwise
 * @function
 */
export const isThat = <L, A>(fa: These<L, A>): fa is That<L, A> => {
  return fa.isThat()
}

/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 * @function
 */
export const isBoth = <L, A>(fa: These<L, A>): fa is Both<L, A> => {
  return fa.isBoth()
}

/** @function */
export const this_ = <L, A>(l: L): These<L, A> => {
  return new This(l)
}

/**
 * @function
 * @alias of
 */
export const that = of

/** @function */
export const both = <L, A>(l: L, a: A): These<L, A> => {
  return new Both(l, a)
}

/** @function */
export const fromThese = <L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A] => {
  return fa.fold<[L, A]>(l => [l, defaultThat], a => [defaultThis, a], (l, a) => [l, a])
}

/** @function */
export const theseLeft = <L, A>(fa: These<L, A>): Option<L> => {
  return fa.fold(l => some(l), () => none, (l, _) => some(l))
}

/** @function */
export const theseRight = <L, A>(fa: These<L, A>): Option<A> => {
  return fa.fold(() => none, a => some(a), (_, a) => some(a))
}

/** @instance */
export const these: Functor<URI> & Bifunctor<URI> & Foldable<URI> & Traversable<URI> = {
  URI,
  map,
  bimap,
  reduce,
  traverse
}
