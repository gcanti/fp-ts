import { Alt2 } from './Alt'
import { Applicative } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { ChainRec2, tailRec } from './ChainRec'
import { Compactable2C, Separated } from './Compactable'
import { Extend2 } from './Extend'
import { Filterable2C } from './Filterable'
import { Foldable2v2 } from './Foldable2v'
import { Lazy, phantom, Predicate, Refinement, toString } from './function'
import { HKT } from './HKT'
import { Monad2 } from './Monad'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import { Setoid } from './Setoid'
import { Traversable2v2 } from './Traversable2v'
import { Validation } from './Validation'
import { Witherable2C } from './Witherable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Either: Either<L, A>
  }
}

export const URI = 'Either'

export type URI = typeof URI

/**
 * Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
 * `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
 * dictates that `Left` is used for failure and `Right` is used for success.
 *
 * For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.
 *
 * ```ts
 * const parse = (errorMessage: string) => (input: string): Either<string, number> => {
 *   const n = parseInt(input, 10)
 *   return isNaN(n) ? left(errorMessage) : right(n)
 * }
 * ```
 *
 * `Either` is right-biased, which means that `Right` is assumed to be the default case to operate on. If it is `Left`,
 * operations like `map`, `chain`, ... return the `Left` value unchanged:
 *
 * ```ts
 * right(12).map(double) // right(24)
 * left(23).map(double)  // left(23)
 * ```
 *
 * @data
 * @constructor Left
 * @constructor Right
 * @since 1.0.0
 */
export type Either<L, A> = Left<L, A> | Right<L, A>

/**
 * Left side of {@link Either}
 */
export class Left<L, A> {
  readonly _tag: 'Left' = 'Left'
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: L) {}
  /** The given function is applied if this is a `Right` */
  map<B>(f: (a: A) => B): Either<L, B> {
    return this as any
  }
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    return (fab.isLeft() ? fab : this) as any
  }
  /**
   * Flipped version of {@link ap}
   */
  ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C> {
    return fb.ap(this)
  }
  /** Binds the given function across `Right` */
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return this as any
  }
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B> {
    return new Left(f(this.value))
  }
  alt(fy: Either<L, A>): Either<L, A> {
    return fy
  }

  /**
   * Lazy version of {@link alt}
   *
   * @example
   * import { right } from 'fp-ts/lib/Either'
   *
   * assert.deepEqual(right(1).orElse(() => right(2)), right(1))
   *
   * @since 1.6.0
   */
  orElse<M>(fy: (l: L) => Either<M, A>): Either<M, A> {
    return fy(this.value)
  }
  extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> {
    return this as any
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return b
  }
  /** Applies a function to each case in the data structure */
  fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B): B {
    return onLeft(this.value)
  }
  /** Returns the value from this `Right` or the given argument if this is a `Left` */
  getOrElse(a: A): A {
    return a
  }
  /** Returns the value from this `Right` or the result of given argument if this is a `Left` */
  getOrElseL(f: (l: L) => A): A {
    return f(this.value)
  }
  /** Maps the left side of the disjunction */
  mapLeft<M>(f: (l: L) => M): Either<M, A> {
    return new Left(f(this.value))
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `left(${toString(this.value)})`
  }
  /** Returns `true` if the either is an instance of `Left`, `false` otherwise */
  isLeft(): this is Left<L, A> {
    return true
  }
  /** Returns `true` if the either is an instance of `Right`, `false` otherwise */
  isRight(): this is Right<L, A> {
    return false
  }
  /** Swaps the disjunction values */
  swap(): Either<A, L> {
    return new Right(this.value)
  }
  /**
   * Returns `Right` with the existing value of `Right` if this is a `Right` and the given predicate `p` holds for the
   * right value, returns `Left(zero)` if this is a `Right` and the given predicate `p` does not hold for the right
   * value, returns `Left` with the existing value of `Left` if this is a `Left`.
   *
   * @example
   * import { right, left } from 'fp-ts/lib/Either'
   *
   * assert.deepEqual(right(12).filterOrElse(n => n > 10, -1), right(12))
   * assert.deepEqual(right(7).filterOrElse(n => n > 10, -1), left(-1))
   * assert.deepEqual(left(12).filterOrElse(n => n > 10, -1), left(12))
   *
   * @since 1.3.0
   */
  filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>
  filterOrElse(p: Predicate<A>, zero: L): Either<L, A>
  filterOrElse(_: Predicate<A>, zero: L): Either<L, A> {
    return this
  }
  /**
   * Lazy version of {@link filterOrElse}
   * @since 1.3.0
   */
  filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>
  filterOrElseL(p: Predicate<A>, zero: (a: A) => L): Either<L, A>
  filterOrElseL(_: Predicate<A>, zero: (a: A) => L): Either<L, A> {
    return this
  }
  /**
   * Use {@link filterOrElse} instead
   * @since 1.6.0
   * @deprecated
   */
  refineOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B> {
    return this as any
  }
  /**
   * Lazy version of {@link refineOrElse}
   * Use {@link filterOrElseL} instead
   * @since 1.6.0
   * @deprecated
   */
  refineOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B> {
    return this as any
  }
}

/**
 * Right side of {@link Either}
 */
export class Right<L, A> {
  readonly _tag: 'Right' = 'Right'
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Either<L, B> {
    return new Right(f(this.value))
  }
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    return fab.isRight() ? this.map(fab.value) : left(fab.value)
  }
  ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return f(this.value)
  }
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B> {
    return new Right<V, B>(g(this.value))
  }
  alt(fy: Either<L, A>): Either<L, A> {
    return this
  }
  orElse<M>(fy: (l: L) => Either<M, A>): Either<M, A> {
    return this as any
  }
  extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> {
    return new Right(f(this))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.value)
  }
  fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B): B {
    return onRight(this.value)
  }
  getOrElse(a: A): A {
    return this.value
  }
  getOrElseL(f: (l: L) => A): A {
    return this.value
  }
  mapLeft<M>(f: (l: L) => M): Either<M, A> {
    return new Right(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `right(${toString(this.value)})`
  }
  isLeft(): this is Left<L, A> {
    return false
  }
  isRight(): this is Right<L, A> {
    return true
  }
  swap(): Either<A, L> {
    return new Left(this.value)
  }
  filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>
  filterOrElse(p: Predicate<A>, zero: L): Either<L, A>
  filterOrElse(p: Predicate<A>, zero: L): Either<L, A> {
    return p(this.value) ? this : left(zero)
  }
  filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>
  filterOrElseL(p: Predicate<A>, zero: (a: A) => L): Either<L, A>
  filterOrElseL(p: Predicate<A>, zero: (a: A) => L): Either<L, A> {
    return p(this.value) ? this : left(zero(this.value))
  }
  refineOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B> {
    return p(this.value) ? (this as any) : left(zero)
  }
  refineOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B> {
    return p(this.value) ? (this as any) : left(zero(this.value))
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Either<L, A>> => {
  return {
    equals: (x, y) =>
      x.isLeft() ? y.isLeft() && SL.equals(x.value, y.value) : y.isRight() && SA.equals(x.value, y.value)
  }
}

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getSemigroup<string, number>(semigroupSum)
 * assert.deepEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepEqual(S.concat(right(1), right(2)), right(3))
 *
 * @function
 * @since 1.7.0
 */
export const getSemigroup = <L, A>(S: Semigroup<A>): Semigroup<Either<L, A>> => {
  return {
    concat: (x, y) => (y.isLeft() ? x : x.isLeft() ? y : right(S.concat(x.value, y.value)))
  }
}

/**
 * {@link Apply} semigroup
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepEqual(S.concat(right(1), right(2)), right(3))
 *
 * @function
 * @since 1.7.0
 */
export const getApplySemigroup = <L, A>(S: Semigroup<A>): Semigroup<Either<L, A>> => {
  return {
    concat: (x, y) => (x.isLeft() ? x : y.isLeft() ? y : right(S.concat(x.value, y.value)))
  }
}

/**
 * @function
 * @since 1.7.0
 */
export const getApplyMonoid = <L, A>(M: Monoid<A>): Monoid<Either<L, A>> => {
  return {
    ...getApplySemigroup(M),
    empty: right(M.empty)
  }
}

const map = <L, A, B>(fa: Either<L, A>, f: (a: A) => B): Either<L, B> => {
  return fa.map(f)
}

const of = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a)
}

const ap = <L, A, B>(fab: Either<L, (a: A) => B>, fa: Either<L, A>): Either<L, B> => {
  return fa.ap(fab)
}

const chain = <L, A, B>(fa: Either<L, A>, f: (a: A) => Either<L, B>): Either<L, B> => {
  return fa.chain(f)
}

const bimap = <L, V, A, B>(fla: Either<L, A>, f: (u: L) => V, g: (a: A) => B): Either<V, B> => {
  return fla.bimap(f, g)
}

const alt = <L, A>(fx: Either<L, A>, fy: Either<L, A>): Either<L, A> => {
  return fx.alt(fy)
}

const extend = <L, A, B>(ea: Either<L, A>, f: (ea: Either<L, A>) => B): Either<L, B> => {
  return ea.extend(f)
}

const reduce = <L, A, B>(fa: Either<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const foldMap = <M>(M: Monoid<M>) => <L, A>(fa: Either<L, A>, f: (a: A) => M): M => {
  return fa.isLeft() ? M.empty : f(fa.value)
}

const foldr = <L, A, B>(fa: Either<L, A>, b: B, f: (a: A, b: B) => B): B => {
  return fa.isLeft() ? b : f(fa.value, b)
}

const traverse = <F>(F: Applicative<F>) => <L, A, B>(
  ta: Either<L, A>,
  f: (a: A) => HKT<F, B>
): HKT<F, Either<L, B>> => {
  return ta.isLeft() ? F.of(left(ta.value)) : F.map<B, Either<L, B>>(f(ta.value), of)
}

const sequence = <F>(F: Applicative<F>) => <L, A>(ta: Either<L, HKT<F, A>>): HKT<F, Either<L, A>> => {
  return ta.isLeft() ? F.of(left(ta.value)) : F.map<A, Either<L, A>>(ta.value, right)
}

const chainRec = <L, A, B>(a: A, f: (a: A) => Either<L, Either<A, B>>): Either<L, B> => {
  return tailRec(e => {
    if (e.isLeft()) {
      return right(left(e.value))
    } else {
      const r = e.value
      return r.isLeft() ? left(f(r.value)) : right(right(r.value))
    }
  }, f(a))
}

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 * @function
 * @since 1.0.0
 */
export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l)
}

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 * @function
 * @since 1.0.0
 * @alias of
 */
export const right = of

/**
 * @function
 * @since 1.0.0
 */
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): (a: A) => Either<L, B>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => Either<L, A>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => Either<L, A> {
  return a => (predicate(a) ? right(a) : left(onFalse(a)))
}

/**
 * Use {@link fromPredicate} instead
 * @function
 * @since 1.6.0
 * @deprecated
 */
export const fromRefinement = <L, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => L) => (
  a: A
): Either<L, B> => {
  return refinement(a) ? right(a) : left(onFalse(a))
}

/**
 * Takes a default and a `Option` value, if the value is a `Some`, turn it into a `Right`, if the value is a `None` use
 * the provided default as a `Left`
 * @function
 * @since 1.0.0
 */
export const fromOption = <L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A> => {
  return fa.isNone() ? left(defaultValue) : right(fa.value)
}

/**
 * Lazy version of {@link fromOption}
 * @function
 * @since 1.3.0
 */
export const fromOptionL = <L>(defaultValue: Lazy<L>) => <A>(fa: Option<A>): Either<L, A> => {
  return fa.isNone() ? left(defaultValue()) : right(fa.value)
}

/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 * @function
 * @since 1.0.0
 */
export const fromNullable = <L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A> => {
  return a == null ? left(defaultValue) : right(a)
}

/**
 * Default value for the optional `onerror` argument of `tryCatch`
 * @function
 * @since 1.0.0
 */
export const toError = (e: unknown): Error => {
  if (e instanceof Error) {
    return e
  } else {
    return new Error(String(e))
  }
}

/**
 * Use {@link tryCatch2v}
 * @function
 * @since 1.0.0
 * @deprecated
 */
export const tryCatch = <A>(f: Lazy<A>, onerror: (e: unknown) => Error = toError): Either<Error, A> => {
  return tryCatch2v(f, onerror)
}

/**
 * @function
 * @since 1.11.0
 */
export const tryCatch2v = <L, A>(f: Lazy<A>, onerror: (e: unknown) => L): Either<L, A> => {
  try {
    return right(f())
  } catch (e) {
    return left(onerror(e))
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const fromValidation = <L, A>(fa: Validation<L, A>): Either<L, A> => {
  return fa.isFailure() ? left(fa.value) : right(fa.value)
}

/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 * @function
 * @since 1.0.0
 */
export const isLeft = <L, A>(fa: Either<L, A>): fa is Left<L, A> => {
  return fa.isLeft()
}

/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 * @function
 * @since 1.0.0
 */
export const isRight = <L, A>(fa: Either<L, A>): fa is Right<L, A> => {
  return fa.isRight()
}

/**
 * Builds {@link Compactable} instance for {@link Either} given {@link Monoid} for the left side
 * @function
 * @since 1.7.0
 */
export function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L> {
  const compact = <A>(fa: Either<L, Option<A>>): Either<L, A> => {
    if (fa.isLeft()) {
      return fa as any
    }
    if (fa.value.isNone()) {
      return left(ML.empty)
    }
    return right(fa.value.value)
  }
  const separate = <A, B>(fa: Either<L, Either<A, B>>): Separated<Either<L, A>, Either<L, B>> => {
    if (fa.isLeft()) {
      return {
        left: fa as any,
        right: fa as any
      }
    }
    if (fa.value.isLeft()) {
      return {
        left: right(fa.value.value),
        right: left(ML.empty)
      }
    }
    return {
      left: left(ML.empty),
      right: right(fa.value.value)
    }
  }

  return {
    URI,
    _L: phantom,
    compact,
    separate
  }
}

/**
 * Builds {@link Filterable} instance for {@link Either} given {@link Monoid} for the left side
 * @function
 * @since 1.7.0
 */
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L> {
  const C = getCompactable(ML)
  const partitionMap = <RL, RR, A>(
    fa: Either<L, A>,
    f: (a: A) => Either<RL, RR>
  ): Separated<Either<L, RL>, Either<L, RR>> => {
    if (fa.isLeft()) {
      return {
        left: fa as any,
        right: fa as any
      }
    }
    const e = f(fa.value)
    if (e.isLeft()) {
      return {
        left: right(e.value),
        right: left(ML.empty)
      }
    }
    return {
      left: left(ML.empty),
      right: right(e.value)
    }
  }
  const partition = <A>(fa: Either<L, A>, p: Predicate<A>): Separated<Either<L, A>, Either<L, A>> => {
    if (fa.isLeft()) {
      return {
        left: fa,
        right: fa
      }
    }
    if (p(fa.value)) {
      return {
        left: left(ML.empty),
        right: right(fa.value)
      }
    }
    return {
      left: right(fa.value),
      right: left(ML.empty)
    }
  }
  const filterMap = <A, B>(fa: Either<L, A>, f: (a: A) => Option<B>): Either<L, B> => {
    if (fa.isLeft()) {
      return fa as any
    }
    const optionB = f(fa.value)
    if (optionB.isSome()) {
      return right(optionB.value)
    }
    return left(ML.empty)
  }
  const filter = <A>(fa: Either<L, A>, p: Predicate<A>): Either<L, A> => fa.filterOrElse(p, ML.empty)
  return {
    ...C,
    map,
    partitionMap,
    filterMap,
    partition,
    filter
  }
}

/**
 * Builds {@link Witherable} instance for {@link Either} given {@link Monoid} for the left side
 * @function
 * @since 1.7.0
 */
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L> {
  const filterableEither = getFilterable(ML)

  const wither = <F>(
    F: Applicative<F>
  ): (<A, B>(wa: Either<L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Either<L, B>>) => {
    const traverseF = traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), filterableEither.compact)
  }

  const wilt = <F>(
    F: Applicative<F>
  ): (<RL, RR, A>(
    wa: Either<L, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Either<L, RL>, Either<L, RR>>>) => {
    const traverseF = traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), filterableEither.separate)
  }

  return {
    ...filterableEither,
    traverse,
    reduce,
    wither,
    wilt
  }
}

/**
 * @instance
 * @since 1.0.0
 */
export const either: Monad2<URI> &
  Foldable2v2<URI> &
  Traversable2v2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  foldMap,
  foldr,
  traverse,
  sequence,
  bimap,
  alt,
  extend,
  chainRec
}
