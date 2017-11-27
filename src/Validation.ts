import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Functor } from './Functor'
import { Applicative } from './Applicative'
import { Semigroup } from './Semigroup'
import { FantasyApply } from './Apply'
import { Foldable, FantasyFoldable } from './Foldable'
import { Setoid } from './Setoid'
import { Traversable, FantasyTraversable } from './Traversable'
import { Alt, FantasyAlt } from './Alt'
import { constFalse, Predicate, toString } from './function'
import { Option, some, none } from './Option'
import { Either, left, right } from './Either'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Validation: Validation<L, A>
  }
}

export const URI = 'Validation'

export type URI = typeof URI

/**
 * A data-type like Either but with an accumulating `Applicative`
 * @data
 * @constructor Failure
 * @constructor Success
 */
export type Validation<L, A> = Failure<L, A> | Success<L, A>

export class Failure<L, A>
  implements FantasyApply<URI, A>, FantasyFoldable<A>, FantasyTraversable<URI, A>, FantasyAlt<URI, A> {
  readonly _tag: 'Failure' = 'Failure'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(readonly semigroup: Semigroup<L>, readonly value: L) {}
  map<B>(f: (a: A) => B): Validation<L, B> {
    return this as any
  }
  ap<B>(fab: Validation<L, (a: A) => B>): Validation<L, B> {
    if (isFailure(fab)) {
      return failure(this.semigroup)(this.semigroup.concat(fab.value)(this.value))
    }
    return this as any
  }
  ap_<B, C>(this: Validation<L, (b: B) => C>, fb: Validation<L, B>): Validation<L, C> {
    return fb.ap(this)
  }
  bimap<M>(S: Semigroup<M>): <B>(f: (l: L) => M, g: (a: A) => B) => Validation<M, B> {
    return (f, g) => failure(S)(f(this.value))
  }
  alt(fy: Validation<L, A>): Validation<L, A> {
    return fy
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2As<F, M, B>) => HKT2As<F, M, Validation<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>> {
    return f => F.of(this as any)
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return failure(this.value)
  }
  equals(SL: Setoid<L>, SA: Setoid<A>): (fy: Validation<L, A>) => boolean {
    return fy => fy.fold(SL.equals(this.value), constFalse)
  }
  concat(fy: Validation<L, A>): Validation<L, A> {
    return fy.fold(l => failure<L>(this.semigroup)<A>(this.semigroup.concat(l)(this.value)), () => this)
  }
  mapFailure<M>(S: Semigroup<M>): (f: (l: L) => M) => Validation<M, A> {
    return f => failure(S)(f(this.value))
  }
  swap(S: Semigroup<A>): Validation<A, L> {
    return success(this.value)
  }
  toOption(): Option<A> {
    return none
  }
  toEither(): Either<L, A> {
    return left(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `failure(${toString(this.value)})`
  }
  /** Returns `true` if the validation is an instance of `Failure`, `false` otherwise */
  isFailure(): this is Failure<L, A> {
    return true
  }
  /** Returns `true` if the validation is an instance of `Success`, `false` otherwise */
  isSuccess(): this is Success<L, A> {
    return false
  }
}

export class Success<L, A>
  implements FantasyApply<URI, A>, FantasyFoldable<A>, FantasyTraversable<URI, A>, FantasyAlt<URI, A> {
  readonly _tag: 'Success' = 'Success'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Validation<L, B> {
    return new Success<L, B>(f(this.value))
  }
  ap<B>(fab: Validation<L, (a: A) => B>): Validation<L, B> {
    if (isSuccess(fab)) {
      return this.map(fab.value)
    }
    return fab as any
  }
  ap_<B, C>(this: Validation<L, (b: B) => C>, fb: Validation<L, B>): Validation<L, C> {
    return fb.ap(this)
  }
  bimap<M>(S: Semigroup<M>): <B>(f: (l: L) => M, g: (a: A) => B) => Validation<M, B> {
    return (f, g) => success(g(this.value))
  }
  alt(fy: Validation<L, A>): Validation<L, A> {
    return this
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2As<F, M, B>) => HKT2As<F, M, Validation<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>> {
    return f => F.map(b => of(b), f(this.value))
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return success(this.value)
  }
  equals(SL: Setoid<L>, SA: Setoid<A>): (fy: Validation<L, A>) => boolean {
    return fy => fy.fold(constFalse, y => SA.equals(this.value)(y))
  }
  concat(fy: Validation<L, A>): Validation<L, A> {
    return this
  }
  mapFailure<M>(S: Semigroup<M>): (f: (l: L) => M) => Validation<M, A> {
    return f => this as any
  }
  swap(S: Semigroup<A>): Validation<A, L> {
    return failure(S)(this.value)
  }
  toOption(): Option<A> {
    return some(this.value)
  }
  toEither(): Either<L, A> {
    return right(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `success(${toString(this.value)})`
  }
  isFailure(): this is Failure<L, A> {
    return false
  }
  isSuccess(): this is Success<L, A> {
    return true
  }
}

/** @function */
export const fold = <L, A, B>(failure: (l: L) => B, success: (a: A) => B) => (fa: Validation<L, A>): B => {
  return fa.fold(failure, success)
}

/** @function */
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>> => {
  return {
    equals: x => y =>
      x.fold(lx => y.fold(ly => SL.equals(lx)(ly), constFalse), ax => y.fold(constFalse, ay => SA.equals(ax)(ay)))
  }
}

/** @function */
export const map = <L, A, B>(f: (a: A) => B, fa: Validation<L, A>): Validation<L, B> => {
  return fa.map(f)
}

/** @function */
export const of = <L, A>(a: A): Validation<L, A> => {
  return new Success(a)
}

/** @function */
export const ap = <L, A, B>(fab: Validation<L, (a: A) => B>, fa: Validation<L, A>): Validation<L, B> => {
  return fa.ap(fab)
}

/** @function */
export const bimap = <M>(S: Semigroup<M>) => <L, A, B>(f: (l: L) => M, g: (a: A) => B) => (
  fa: Validation<L, A>
): Validation<M, B> => {
  return fa.bimap(S)(f, g)
}

/** @function */
export const alt = <L, A>(fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A> => {
  return fx.alt(fy)
}

/** @function */
export const reduce = <L, A, B>(f: (b: B, a: A) => B, b: B, fa: Validation<L, A>): B => {
  return fa.reduce(f, b)
}

export function traverse<F extends HKT2S>(
  F: Applicative<F>
): <M, L, A, B>(f: (a: A) => HKT2As<F, M, B>, ta: Validation<L, A>) => HKT2As<F, M, Validation<L, B>>
export function traverse<F extends HKTS>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKTAs<F, B>, ta: Validation<L, A>) => HKTAs<F, Validation<L, B>>
export function traverse<F>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: HKT<URI, A>) => HKT<F, Validation<L, B>>
/** @function */
export function traverse<F>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Validation<L, A>) => HKT<F, Validation<L, B>> {
  return (f, ta) => ta.traverse(F)(f)
}

/**
 * Returns `true` if the validation is an instance of `Failure`, `false` otherwise
 * @function
 */
export const isFailure = <L, A>(fa: Validation<L, A>): fa is Failure<L, A> => {
  return fa.isFailure()
}

/**
 * Returns `true` if the validation is an instance of `Success`, `false` otherwise
 * @function
 */
export const isSuccess = <L, A>(fa: Validation<L, A>): fa is Success<L, A> => {
  return fa.isSuccess()
}

/** @function */
export const failure = <L>(L: Semigroup<L>) => <A>(l: L): Validation<L, A> => {
  return new Failure(L, l)
}

/**
 * @function
 * @alias of
 */
export const success = of

/** @function */
export const fromPredicate = <L>(S: Semigroup<L>) => <A>(predicate: Predicate<A>, f: (a: A) => L) => (
  a: A
): Validation<L, A> => {
  return predicate(a) ? success(a) : failure(S)(f(a))
}

/** @function */
export const fromEither = <L>(S: Semigroup<L>): (<A>(e: Either<L, A>) => Validation<L, A>) => {
  const f = failure(S)
  return e => e.fold(l => f(l), a => success(a))
}

/** @function */
export const concat = <L, A>(fx: Validation<L, A>) => (fy: Validation<L, A>): Validation<L, A> => {
  return fx.concat(fy)
}

/** @function */
export const getSemigroup = <L, A>(): Semigroup<Validation<L, A>> => {
  return {
    concat
  }
}

/** @function */
export const mapFailure = <M>(S: Semigroup<M>) => <L>(f: (l: L) => M) => <A>(
  fa: Validation<L, A>
): Validation<M, A> => {
  return fa.mapFailure(S)(f)
}

/** @function */
export const swap = <A>(S: Semigroup<A>) => <L>(fa: Validation<L, A>): Validation<A, L> => {
  return fa.swap(S)
}

/** @function */
export const toOption = <L, A>(fa: Validation<L, A>): Option<A> => {
  return fa.toOption()
}

/** @function */
export const toEither = <L, A>(fa: Validation<L, A>): Either<L, A> => {
  return fa.toEither()
}

/** @instance */
export const validation: Semigroup<Validation<any, any>> &
  Functor<URI> &
  Applicative<URI> &
  Foldable<URI> &
  Traversable<URI> &
  Alt<URI> = {
  URI,
  ap,
  map,
  of,
  concat,
  reduce,
  traverse,
  alt
}
