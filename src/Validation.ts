import { HKT } from './HKT'
import { Applicative, Applicative2C } from './Applicative'
import { Semigroup } from './Semigroup'
import { Foldable2 } from './Foldable'
import { Setoid } from './Setoid'
import { Traversable2 } from './Traversable'
import { Functor2 } from './Functor'
import { Predicate, toString, phantom } from './function'
import { Either } from './Either'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Alt2C } from './Alt'

// Adapeted from https://github.com/purescript/purescript-validation

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Validation: Validation<L, A>
  }
}

export const URI = 'Validation'

export type URI = typeof URI

/**
 * The `Validation` functor, used for applicative validation
 *
 * The `Applicative` instance collects multiple failures in
 * an arbitrary `Semigroup`.
 *
 * @data
 * @constructor Failure
 * @constructor Success
 * @since 1.0.0
 */
export type Validation<L, A> = Failure<L, A> | Success<L, A>

export class Failure<L, A> {
  readonly _tag: 'Failure' = 'Failure'
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: L) {}
  map<B>(f: (a: A) => B): Validation<L, B> {
    return failure(this.value)
  }
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B> {
    return failure(f(this.value))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return b
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return failure(this.value)
  }
  /** Returns the value from this `Success` or the given argument if this is a `Failure` */
  getOrElse(a: A): A {
    return a
  }
  /** Returns the value from this `Success` or the result of given argument if this is a `Failure` */
  getOrElseL(f: (l: L) => A): A {
    return f(this.value)
  }
  mapFailure<M>(f: (l: L) => M): Validation<M, A> {
    return failure(f(this.value))
  }
  swap(): Validation<A, L> {
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
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Validation<L, B> {
    return new Success<L, B>(f(this.value))
  }
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B> {
    return new Success<V, B>(g(this.value))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.value)
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return success(this.value)
  }
  getOrElse(a: A): A {
    return this.value
  }
  getOrElseL(f: (l: L) => A): A {
    return this.value
  }
  mapFailure<M>(f: (l: L) => M): Validation<M, A> {
    return success(this.value)
  }
  swap(): Validation<A, L> {
    return failure(this.value)
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

/**
 * @function
 * @since 1.0.0
 */
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>> => {
  return {
    equals: (x, y) =>
      x.isFailure() ? y.isFailure() && SL.equals(x.value, y.value) : y.isSuccess() && SA.equals(x.value, y.value)
  }
}

const map = <L, A, B>(fa: Validation<L, A>, f: (a: A) => B): Validation<L, B> => {
  return fa.map(f)
}

const of = <L, A>(a: A): Validation<L, A> => {
  return new Success<L, A>(a)
}

/**
 * @function
 * @since 1.0.0
 */
export const getApplicative = <L>(S: Semigroup<L>): Applicative2C<URI, L> => {
  const ap = <A, B>(fab: Validation<L, (a: A) => B>, fa: Validation<L, A>): Validation<L, B> => {
    return fab.isFailure()
      ? fa.isFailure() ? failure(S.concat(fab.value, fa.value)) : failure(fab.value)
      : fa.isFailure() ? failure(fa.value) : success(fab.value(fa.value))
  }

  return {
    URI,
    _L: phantom,
    map,
    of,
    ap
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getMonad = <L>(S: Semigroup<L>): Monad2C<URI, L> => {
  const chain = <A, B>(fa: Validation<L, A>, f: (a: A) => Validation<L, B>): Validation<L, B> => {
    return fa.isFailure() ? failure(fa.value) : f(fa.value)
  }

  return {
    ...getApplicative(S),
    chain
  }
}

const reduce = <L, A, B>(fa: Validation<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const traverse = <F>(F: Applicative<F>) => <L, A, B>(
  ta: Validation<L, A>,
  f: (a: A) => HKT<F, B>
): HKT<F, Validation<L, B>> => {
  return ta.isFailure() ? F.of(failure(ta.value)) : F.map(f(ta.value), of as (a: B) => Validation<L, B>)
}

/**
 * @function
 * @since 1.0.0
 */
export const failure = <L, A>(l: L): Validation<L, A> => {
  return new Failure(l)
}

/**
 * @function
 * @since 1.0.0
 * @alias of
 */
export const success = of

/**
 * @function
 * @since 1.0.0
 */
export const fromPredicate = <L, A>(predicate: Predicate<A>, f: (a: A) => L) => (a: A): Validation<L, A> => {
  return predicate(a) ? success(a) : failure(f(a))
}

/**
 * @function
 * @since 1.0.0
 */
export const fromEither = <L, A>(e: Either<L, A>): Validation<L, A> => {
  return e.isLeft() ? failure(e.value) : success(e.value)
}

/**
 * @function
 * @since 1.0.0
 */
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Validation<L, A>> => {
  const concat = (fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A> => {
    return fx.isFailure()
      ? fy.isFailure() ? failure(SL.concat(fx.value, fy.value)) : failure(fx.value)
      : fy.isFailure() ? failure(fy.value) : success(SA.concat(fx.value, fy.value))
  }
  return {
    concat
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getMonoid = <L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Validation<L, A>> => {
  return {
    ...getSemigroup(SL, SA),
    empty: success(SA.empty)
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getAlt = <L>(S: Semigroup<L>): Alt2C<URI, L> => {
  const alt = <A>(fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A> => {
    return fx.isFailure() ? (fy.isFailure() ? failure(S.concat(fx.value, fy.value)) : fy) : fx
  }
  return {
    URI,
    _L: phantom,
    map,
    alt
  }
}

/**
 * Returns `true` if the validation is an instance of `Failure`, `false` otherwise
 * @function
 * @since 1.0.0
 */
export const isFailure = <L, A>(fa: Validation<L, A>): fa is Failure<L, A> => {
  return fa.isFailure()
}

/**
 * Returns `true` if the validation is an instance of `Success`, `false` otherwise
 * @function
 * @since 1.0.0
 */
export const isSuccess = <L, A>(fa: Validation<L, A>): fa is Success<L, A> => {
  return fa.isSuccess()
}

/**
 * @instance
 * @since 1.0.0
 */
export const validation: Functor2<URI> & Foldable2<URI> & Traversable2<URI> = {
  URI,
  map,
  reduce,
  traverse
}
