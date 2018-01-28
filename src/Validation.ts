import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Applicative } from './Applicative'
import { Semigroup } from './Semigroup'
import { Foldable } from './Foldable'
import { Setoid } from './Setoid'
import { Traversable } from './Traversable'
import { Alt } from './Alt'
import { constFalse, Predicate, toString } from './function'
import { Either } from './Either'
import { Monad } from './Monad'

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

export class Failure<L, A> {
  readonly _tag: 'Failure' = 'Failure'
  readonly '-A': A
  readonly '-L': L
  readonly '-URI': URI
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
  /** Binds the given function across `Success` */
  chain<B>(f: (a: A) => Validation<L, B>): Validation<L, B> {
    return this as any
  }
  bimap<M>(S: Semigroup<M>): <B>(f: (l: L) => M, g: (a: A) => B) => Validation<M, B> {
    return (f, g) => failure(S)(f(this.value))
  }
  alt(fy: Validation<L, A>): Validation<L, A> {
    return fy
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
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
  /** Returns the value from this `Success` or the given argument if this is a `Failure` */
  getOrElseValue(a: A): A {
    return a
  }
  /** Returns the value from this `Success` or the result of given argument if this is a `Failure` */
  getOrElse(f: (l: L) => A): A {
    return f(this.value)
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

export class Success<L, A> {
  readonly _tag: 'Success' = 'Success'
  readonly '-A': A
  readonly '-L': L
  readonly '-URI': URI
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
  chain<B>(f: (a: A) => Validation<L, B>): Validation<L, B> {
    return f(this.value)
  }
  bimap<M>(S: Semigroup<M>): <B>(f: (l: L) => M, g: (a: A) => B) => Validation<M, B> {
    return (f, g) => success(g(this.value))
  }
  alt(fy: Validation<L, A>): Validation<L, A> {
    return this
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.value)
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2As<F, M, B>) => HKT2As<F, M, Validation<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>> {
    return f => F.map(f(this.value), b => of(b))
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return success(this.value)
  }
  getOrElseValue(a: A): A {
    return this.value
  }
  getOrElse(f: (l: L) => A): A {
    return this.value
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
export const map = <L, A, B>(fa: Validation<L, A>, f: (a: A) => B): Validation<L, B> => {
  return fa.map(f)
}

/** @function */
export const of = <L, A>(a: A): Validation<L, A> => {
  return new Success<L, A>(a)
}

/** @function */
export const ap = <L, A, B>(fab: Validation<L, (a: A) => B>, fa: Validation<L, A>): Validation<L, B> => {
  return fa.ap(fab)
}

/** @function */
export const chain = <L, A, B>(fa: Validation<L, A>, f: (a: A) => Validation<L, B>): Validation<L, B> => {
  return fa.chain(f)
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
export const reduce = <L, A, B>(fa: Validation<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
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
  return <A>(e: Either<L, A>) => e.fold<Validation<L, A>>(failure(S), success)
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

/**
 * Returns the value from this `Success` or the given argument if this is a `Failure`
 * @function
 */
export const getOrElseValue = <A>(a: A) => <L>(fa: Validation<L, A>): A => {
  return fa.getOrElseValue(a)
}

/**
 * Returns the value from this `Success` or the result of given argument if this is a `Failure`
 * @function
 */
export const getOrElse = <L, A>(f: (l: L) => A) => (fa: Validation<L, A>): A => {
  return fa.getOrElse(f)
}

/** @instance */
export const validation: Semigroup<Validation<any, any>> & Monad<URI> & Foldable<URI> & Traversable<URI> & Alt<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  concat,
  reduce,
  traverse,
  alt
}
