import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT2, HKT3, HKT3As } from './HKT'
import { Applicative } from './Applicative'
import { Semigroup } from './Semigroup'
import { Foldable } from './Foldable'
import { Setoid } from './Setoid'
import { Traversable2 } from './Traversable'
import { Alt2 } from './Alt'
import { constFalse, Predicate, toString } from './function'
import { Either } from './Either'
import { Monad2 } from './Monad'

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
    if (fab.isFailure()) {
      return failure(this.semigroup)(this.semigroup.concat(fab.value, this.value))
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
  traverse<F extends HKT3S>(
    F: Applicative<F>
  ): <U, M, B>(f: (a: A) => HKT3<F, U, M, B>) => HKT3As<F, U, M, Validation<L, B>>
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2<F, M, B>) => HKT2As<F, M, Validation<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKTAs<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>> {
    return f => F.of(this as any)
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return failure(this.value)
  }
  /** Returns the value from this `Success` or the given argument if this is a `Failure` */
  getOrElse(a: A): A {
    return a
  }
  /** Returns the value from this `Success` or the result of given argument if this is a `Failure` */
  catchFailure(f: (l: L) => A): A {
    return f(this.value)
  }
  equals(SL: Setoid<L>, SA: Setoid<A>): (fy: Validation<L, A>) => boolean {
    return fy => fy.fold(a => SL.equals(this.value, a), constFalse)
  }
  concat(fy: Validation<L, A>): Validation<L, A> {
    return fy.fold(l => failure<L>(this.semigroup)<A>(this.semigroup.concat(l, this.value)), () => this)
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
    if (fab.isSuccess()) {
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
  traverse<F extends HKT3S>(
    F: Applicative<F>
  ): <U, M, B>(f: (a: A) => HKT3<F, U, M, B>) => HKT3As<F, U, M, Validation<L, B>>
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2<F, M, B>) => HKT2As<F, M, Validation<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKTAs<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>> {
    return f => F.map(f(this.value), b => of(b))
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return success(this.value)
  }
  getOrElse(a: A): A {
    return this.value
  }
  catchFailure(f: (l: L) => A): A {
    return this.value
  }
  equals(SL: Setoid<L>, SA: Setoid<A>): (fy: Validation<L, A>) => boolean {
    return fy => fy.fold(constFalse, y => SA.equals(this.value, y))
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
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>> => {
  return {
    equals: (x, y) =>
      x.fold(lx => y.fold(ly => SL.equals(lx, ly), constFalse), ax => y.fold(constFalse, ay => SA.equals(ax, ay)))
  }
}

const map = <L, A, B>(fa: Validation<L, A>, f: (a: A) => B): Validation<L, B> => {
  return fa.map(f)
}

/** @function */
export const of = <L, A>(a: A): Validation<L, A> => {
  return new Success<L, A>(a)
}

const ap = <L, A, B>(fab: Validation<L, (a: A) => B>, fa: Validation<L, A>): Validation<L, B> => {
  return fa.ap(fab)
}

const chain = <L, A, B>(fa: Validation<L, A>, f: (a: A) => Validation<L, B>): Validation<L, B> => {
  return fa.chain(f)
}

const alt = <L, A>(fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A> => {
  return fx.alt(fy)
}

const reduce = <L, A, B>(fa: Validation<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

function traverse<F>(
  F: Applicative<F>
): <L, A, B>(ta: HKT2<URI, L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>>
function traverse<F>(
  F: Applicative<F>
): <L, A, B>(ta: Validation<L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>> {
  return (ta, f) => ta.traverse(F)(f)
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

const concat = <L, A>(fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A> => {
  return fx.concat(fy)
}

/** @function */
export const getSemigroup = <L, A>(): Semigroup<Validation<L, A>> => {
  return {
    concat
  }
}

/**
 * Returns the value from this `Success` or the result of given argument if this is a `Failure`
 * @function
 */
export const catchFailure = <L, A>(fa: Validation<L, A>, f: (l: L) => A): A => {
  return fa.catchFailure(f)
}

/** @instance */
export const validation: Semigroup<Validation<any, any>> &
  Monad2<URI> &
  Foldable<URI> &
  Traversable2<URI> &
  Alt2<URI> = {
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
