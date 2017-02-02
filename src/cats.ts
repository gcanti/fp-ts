import { identity, constant } from './function'

export abstract class HKT<F, A> {
  __hkt: F;
  __hkta: A;
}

export type HKT2<F, A, B> = HKT<HKT<F, A>, B>;

export interface Setoid<M> {
  equals(x: M, y: M): boolean
}

export const setoidPimitive: Setoid<any> = {
  equals: (x, y) => x === y
}

export interface Semigroup<M> {
  concat(x: M, y: M): M
}

export function getProductSemigroup<A, B>(asemigroup: Semigroup<A>, bsemigroup: Semigroup<B>): Semigroup<[A, B]> {
  return { concat: ([xa, xb], [ya, yb]) => [asemigroup.concat(xa, ya), bsemigroup.concat(xb, yb)] }
}

export function getDualSemigroup<A>(semigroup: Semigroup<A>): Semigroup<A> {
  return { concat: (x, y) => semigroup.concat(y, x) }
}

export interface Monoid<M> extends Semigroup<M> {
  empty(): M
}

export function getProductMonoid<A, B>(amonoid: Monoid<A>, bmonoid: Monoid<B>): Monoid<[A, B]> {
  const empty: [A, B] = [amonoid.empty(), bmonoid.empty()]
  return {
    empty: constant(empty),
    concat: getProductSemigroup(amonoid, bmonoid).concat
  }
}

export function getDualMonoid<A>(monoid: Monoid<A>): Monoid<A> {
  const { concat } = getDualSemigroup(monoid)
  return { empty: monoid.empty, concat }
}

/** Boolean monoid under conjunction */
export const monoidAll: Monoid<boolean> = {
  empty: constant(true),
  concat: (x, y) => x && y
}

/** Boolean monoid under disjunction */
export const monoidAny: Monoid<boolean> = {
  empty: constant(false),
  concat: (x, y) => x || y
}

/** Monoid under array concatenation */
export const monoidArray: Monoid<Array<any>> = {
  empty: constant([]),
  concat: (x, y) => x.concat(y)
}

/** Monoid under addition */
export const monoidSum: Monoid<number> = {
  empty: constant(0),
  concat: (x, y) => x + y
}

/** Monoid under multiplication */
export const monoidProduct: Monoid<number> = {
  empty: constant(1),
  concat: (x, y) => x * y
}

export const monoidString: Monoid<string> = {
  empty: constant(''),
  concat: (x, y) => x + y
}

export interface Functor<F> {
  map<A, B>(f: (a: A) => B, fa: HKT<F, A>): HKT<F, B>
}

export interface Contravariant<F> {
  contramap<A, B>(f: (a: B) => A, fa: HKT<F, A>): HKT<F, B>
}

export function lift<F, A, B>(functor: Functor<F>, f: (a: A) => B): (fa: HKT<F, A>) => HKT<F, B> {
  return fa => functor.map(f, fa)
}

export interface PointedFunctor<F> extends Functor<F> {
  of<A>(a: A): HKT<F, A>
}

export interface Bifunctor<F> extends Functor<HKT<F, any>> {
  bimap<A, B, C, D>(f: (a: A) => B, g: (c: C) => D, fac: HKT2<F, A, C>): HKT2<F, B, D>
}

export interface Apply<F> extends Functor<F> {
  ap<A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>): HKT<F, B>
}

export interface Applicative<F> extends PointedFunctor<F>, Apply<F> {}

export function liftA2<F, A, B, C>(apply: Apply<F>, f: (a: A, b: B) => C): (fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, C> {
  return (fa, fb) => apply.ap(apply.map((a: A) => (b: B) => f(a, b), fa), fb)
}

export interface Chain<F> extends Apply<F> {
  chain<A, B>(f: (a: A) => HKT<F, B>, fa: HKT<F, A>): HKT<F, B>
}

export interface Monad<F> extends Applicative<F>, Chain<F> {}

export interface Copointed<F> extends Functor<F> {
  extract<A>(ca: HKT<F, A>): A
}

export interface Extend<F> {
  extend<A, B>(f: (ea: HKT<F, A>) => B, ea: HKT<F, A>): HKT<F, B>
}

export interface Comonad<F> extends Extend<F>, Copointed<F> {}

export interface Foldable<F> {
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: HKT<F, A>): B
}

/** A default implementation of `foldMap` using `foldl`. */
export function foldMap<F, M, A>(foldable: Foldable<F>, monoid: Monoid<M>, f: (a: A) => M, fa: HKT<F, A>): M {
  return foldable.reduce((acc, x) => monoid.concat(f(x), acc), monoid.empty(), fa)
}

export interface Traversable<T> extends Functor<T>, Foldable<T> {
  traverse<F, A, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>, ta: HKT<T, A>): HKT<F, HKT<T, B>>;
}

export function sequence<F, T, A>(
  applicative: Applicative<F>,
  traversable: Traversable<T>,
  tfa: HKT<T, HKT<F, A>>): HKT<F, HKT<T, A>> {
  return traversable.traverse<F, HKT<F, A>, A>(applicative, identity, tfa)
}

export interface Alt<F> extends Functor<F> {
  alt<A>(fx: HKT<F, A>, fy: HKT<F, A>): HKT<F, A>
}

export interface Plus<F> extends Alt<F> {
  zero(): HKT<F, any>
}

export interface Alternative<F> extends Applicative<F>, Plus<F> {}

