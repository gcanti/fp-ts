/**
 * @file Represents a value of one of two possible types (a disjoint union).
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
 */

import { Alt2, Alt2C } from './Alt'
import { Applicative } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { ChainRec2, tailRec } from './ChainRec'
import { Compactable2C, Separated } from './Compactable'
import { Extend2 } from './Extend'
import { Filterable2C } from './Filterable'
import { Foldable2v2 } from './Foldable2v'
import { Lazy, Predicate, Refinement, toString, identity } from './function'
import { HKT } from './HKT'
import { Monad2, Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import { Eq, fromEquals } from './Eq'
import { Traversable2v2 } from './Traversable2v'
import { Validation } from './Validation'
import { Witherable2C } from './Witherable'
import { MonadThrow2 } from './MonadThrow'
import { Show } from './Show'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Either: Either<L, A>
  }
}

export const URI = 'Either'

export type URI = typeof URI

/**
 * @since 1.0.0
 */
export type Either<L, A> = Left<L, A> | Right<L, A>

/**
 * Left side of `Either`
 */
export class Left<L, A> {
  readonly _tag: 'Left' = 'Left'
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: L) {}
  /**
   * The given function is applied if this is a `Right`
   * @obsolete
   */
  map<B>(f: (a: A) => B): Either<L, B> {
    return this as any
  }
  /** @obsolete */
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    return (fab.isLeft() ? fab : this) as any
  }
  /**
   * Flipped version of `ap`
   * @obsolete
   */
  ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C> {
    return fb.ap(this)
  }
  /**
   * Binds the given function across `Right`
   * @obsolete
   */
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return this as any
  }
  /** @obsolete */
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B> {
    return new Left(f(this.value))
  }
  /** @obsolete */
  alt(fy: Either<L, A>): Either<L, A> {
    return fy
  }

  /**
   * Lazy version of `alt`
   *
   * @example
   * import { right } from 'fp-ts/lib/Either'
   *
   * assert.deepStrictEqual(right(1).orElse(() => right(2)), right(1))
   *
   * @since 1.6.0
   * @obsolete
   */
  orElse<M>(fy: (l: L) => Either<M, A>): Either<M, A> {
    return fy(this.value)
  }
  /** @obsolete */
  extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> {
    return this as any
  }
  /** @obsolete */
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return b
  }
  /**
   * Applies a function to each case in the data structure
   * @obsolete
   */
  fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B): B {
    return onLeft(this.value)
  }
  /**
   * Returns the value from this `Right` or the given argument if this is a `Left`
   * @obsolete
   */
  getOrElse(a: A): A {
    return a
  }
  /**
   * Returns the value from this `Right` or the result of given argument if this is a `Left`
   * @obsolete
   */
  getOrElseL(f: (l: L) => A): A {
    return f(this.value)
  }
  /**
   * Maps the left side of the disjunction
   * @obsolete
   */
  mapLeft<M>(f: (l: L) => M): Either<M, A> {
    return new Left(f(this.value))
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    // tslint:disable-next-line: deprecation
    return `left(${toString(this.value)})`
  }
  /**
   * Returns `true` if the either is an instance of `Left`, `false` otherwise
   * @obsolete
   */
  isLeft(): this is Left<L, A> {
    return true
  }
  /**
   * Returns `true` if the either is an instance of `Right`, `false` otherwise
   * @obsolete
   */
  isRight(): this is Right<L, A> {
    return false
  }
  /**
   * Swaps the disjunction values
   * @obsolete
   */
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
   * assert.deepStrictEqual(right(12).filterOrElse(n => n > 10, -1), right(12))
   * assert.deepStrictEqual(right(7).filterOrElse(n => n > 10, -1), left(-1))
   * assert.deepStrictEqual(left<number, number>(12).filterOrElse(n => n > 10, -1), left(12))
   *
   * @since 1.3.0
   * @obsolete
   */
  filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>
  filterOrElse(p: Predicate<A>, zero: L): Either<L, A>
  filterOrElse(_: Predicate<A>, zero: L): Either<L, A> {
    return this
  }
  /**
   * Lazy version of `filterOrElse`
   * @since 1.3.0
   * @obsolete
   */
  filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>
  filterOrElseL(p: Predicate<A>, zero: (a: A) => L): Either<L, A>
  filterOrElseL(_: Predicate<A>, zero: (a: A) => L): Either<L, A> {
    return this
  }
  /**
   * Use `filterOrElse` instead
   * @since 1.6.0
   * @deprecated
   */
  refineOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B> {
    return this as any
  }
  /**
   * Lazy version of `refineOrElse`
   * Use `filterOrElseL` instead
   * @since 1.6.0
   * @deprecated
   */
  refineOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B> {
    return this as any
  }
}

/**
 * Right side of `Either`
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
    // tslint:disable-next-line: deprecation
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
 * @since 1.17.0
 */
export const getShow = <L, A>(SL: Show<L>, SA: Show<A>): Show<Either<L, A>> => {
  return {
    show: e => e.fold(l => `left(${SL.show(l)})`, a => `right(${SA.show(a)})`)
  }
}

/**
 * Use `getEq`
 *
 * @since 1.0.0
 * @deprecated
 */
export const getSetoid: <L, A>(EL: Eq<L>, EA: Eq<A>) => Eq<Either<L, A>> = getEq

/**
 * @since 1.19.0
 */
export function getEq<L, A>(EL: Eq<L>, EA: Eq<A>): Eq<Either<L, A>> {
  return fromEquals((x, y) =>
    x.isLeft() ? y.isLeft() && EL.equals(x.value, y.value) : y.isRight() && EA.equals(x.value, y.value)
  )
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
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 1.7.0
 */
export const getSemigroup = <L, A>(S: Semigroup<A>): Semigroup<Either<L, A>> => {
  return {
    concat: (x, y) => (y.isLeft() ? x : x.isLeft() ? y : right(S.concat(x.value, y.value)))
  }
}

/**
 * `Apply` semigroup
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 1.7.0
 */
export const getApplySemigroup = <L, A>(S: Semigroup<A>): Semigroup<Either<L, A>> => {
  return {
    concat: (x, y) => (x.isLeft() ? x : y.isLeft() ? y : right(S.concat(x.value, y.value)))
  }
}

/**
 * @since 1.7.0
 */
export const getApplyMonoid = <L, A>(M: Monoid<A>): Monoid<Either<L, A>> => {
  return {
    ...getApplySemigroup(M),
    empty: right(M.empty)
  }
}

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @since 1.0.0
 */
export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l)
}

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @since 1.0.0
 */
export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a)
}

/**
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
 * Use `fromPredicate` instead
 *
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
 *
 * @since 1.0.0
 */
export const fromOption = <L>(onNone: L) => <A>(fa: Option<A>): Either<L, A> => {
  return fa.isNone() ? left(onNone) : right(fa.value)
}

/**
 * Lazy version of `fromOption`
 *
 * @since 1.3.0
 */
export const fromOptionL = <L>(onNone: Lazy<L>) => <A>(fa: Option<A>): Either<L, A> => {
  return fa.isNone() ? left(onNone()) : right(fa.value)
}

/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @since 1.0.0
 */
export const fromNullable = <L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A> => {
  return a == null ? left(defaultValue) : right(a)
}

/**
 * Default value for the optional `onerror` argument of `tryCatch`
 *
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
 * Use `tryCatch2v` instead
 *
 * @since 1.0.0
 * @deprecated
 */
export const tryCatch = <A>(f: Lazy<A>, onerror: (e: unknown) => Error = toError): Either<Error, A> => {
  return tryCatch2v(f, onerror)
}

/**
 * Constructs a new `Either` from a function that might throw
 *
 * @example
 * import { Either, left, right, tryCatch2v } from 'fp-ts/lib/Either'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Either<Error, A> => {
 *   return tryCatch2v(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), right(1))
 *
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
 * @since 1.0.0
 */
export const fromValidation = <L, A>(fa: Validation<L, A>): Either<L, A> => {
  return fa.isFailure() ? left(fa.value) : right(fa.value)
}

/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 *
 * @since 1.0.0
 */
export const isLeft = <L, A>(fa: Either<L, A>): fa is Left<L, A> => {
  return fa.isLeft()
}

/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 *
 * @since 1.0.0
 */
export const isRight = <L, A>(fa: Either<L, A>): fa is Right<L, A> => {
  return fa.isRight()
}

/**
 * Use `getWitherable`
 *
 * @since 1.7.0
 * @deprecated
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
    _L: undefined as any,
    compact,
    separate
  }
}

/**
 * Use `getWitherable`
 *
 * @since 1.7.0
 * @deprecated
 */
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L> {
  // tslint:disable-next-line: deprecation
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
    map: either.map,
    partitionMap,
    filterMap,
    partition,
    filter
  }
}

/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @since 1.7.0
 */
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L> {
  // tslint:disable-next-line: deprecation
  const filterableEither = getFilterable(ML)

  const wither = <F>(
    F: Applicative<F>
  ): (<A, B>(wa: Either<L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Either<L, B>>) => {
    const traverseF = either.traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), filterableEither.compact)
  }

  const wilt = <F>(
    F: Applicative<F>
  ): (<RL, RR, A>(
    wa: Either<L, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Either<L, RL>, Either<L, RR>>>) => {
    const traverseF = either.traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), filterableEither.separate)
  }

  return {
    ...filterableEither,
    traverse: either.traverse,
    reduce: either.reduce,
    wither,
    wilt
  }
}

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import { parseJSON, toError } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(parseJSON('{"a":1}', toError).value, { a: 1 })
 * assert.deepStrictEqual(parseJSON('{"a":}', toError).value, new SyntaxError('Unexpected token } in JSON at position 5'))
 *
 * @since 1.16.0
 */
export const parseJSON = <L>(s: string, onError: (reason: unknown) => L): Either<L, unknown> => {
  return tryCatch2v(() => JSON.parse(s), onError)
}

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import { stringifyJSON, toError } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(stringifyJSON({ a: 1 }, toError).value, '{"a":1}')
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(stringifyJSON(circular, toError).value, new TypeError('Converting circular structure to JSON'))
 *
 * @since 1.16.0
 */
export const stringifyJSON = <L>(u: unknown, onError: (reason: unknown) => L): Either<L, string> => {
  return tryCatch2v(() => JSON.stringify(u), onError)
}

const throwError = left

const fromEither = identity

/**
 * @since 1.0.0
 */
export const either: Monad2<URI> &
  Foldable2v2<URI> &
  Traversable2v2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI> &
  MonadThrow2<URI> = {
  URI,
  map: (ma, f) => ma.map(f),
  of: right,
  ap: (mab, ma) => ma.ap(mab),
  chain: (ma, f) => ma.chain(f),
  reduce: (fa, b, f) => fa.reduce(b, f),
  foldMap: M => (fa, f) => (fa.isLeft() ? M.empty : f(fa.value)),
  foldr: (fa, b, f) => (fa.isLeft() ? b : f(fa.value, b)),
  traverse: <F>(F: Applicative<F>) => <L, A, B>(ta: Either<L, A>, f: (a: A) => HKT<F, B>): HKT<F, Either<L, B>> => {
    return ta.isLeft() ? F.of(left(ta.value)) : F.map<B, Either<L, B>>(f(ta.value), right)
  },
  sequence: <F>(F: Applicative<F>) => <L, A>(ta: Either<L, HKT<F, A>>): HKT<F, Either<L, A>> => {
    return ta.isLeft() ? F.of(left(ta.value)) : F.map<A, Either<L, A>>(ta.value, right)
  },
  bimap: (fla, f, g) => fla.bimap(f, g),
  alt: (mx, my) => mx.alt(my),
  extend: (wa, f) => wa.extend(f),
  chainRec: (a, f) => {
    return tailRec(e => {
      if (e.isLeft()) {
        return right(left(e.value))
      } else {
        const r = e.value
        return r.isLeft() ? left(f(r.value)) : right(right(r.value))
      }
    }, f(a))
  },
  throwError,
  fromEither,
  fromOption: (o, e) => (o.isNone() ? throwError(e) : right(o.value))
}

//
// backporting
//

/**
 * @since 1.19.0
 */
export function fold<E, A, R>(onLeft: (e: E) => R, onRight: (a: A) => R): (ma: Either<E, A>) => R {
  return ma => ma.fold(onLeft, onRight)
}

/**
 * @since 1.19.0
 */
export function orElse<E, A, M>(f: (e: E) => Either<M, A>): (ma: Either<E, A>) => Either<M, A> {
  return ma => ma.orElse(f)
}

/**
 * @since 1.19.0
 */
export function getOrElse<E, A>(f: (e: E) => A): (ma: Either<E, A>) => A {
  return ma => ma.getOrElseL(f)
}

/**
 * @since 1.19.0
 */
export function elem<A>(E: Eq<A>): (a: A) => <E>(ma: Either<E, A>) => boolean {
  return a => ma => (isLeft(ma) ? false : E.equals(a, ma.value))
}

/**
 * @since 1.19.0
 */
export function filterOrElse<E, A, B extends A>(
  refinement: Refinement<A, B>,
  onFalse: (a: A) => E
): (ma: Either<E, A>) => Either<E, B>
export function filterOrElse<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A>
export function filterOrElse<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A> {
  return ma => ma.filterOrElseL(predicate, onFalse)
}

/**
 * @since 1.19.0
 */
export function getValidation<E>(S: Semigroup<E>): Monad2C<URI, E> & Alt2C<URI, E> {
  return {
    URI,
    _L: undefined as any,
    map: either.map,
    of: either.of,
    ap: <A, B>(mab: Either<E, (a: A) => B>, ma: Either<E, A>): Either<E, B> =>
      isLeft(mab)
        ? isLeft(ma)
          ? left(S.concat(mab.value, ma.value))
          : (mab as any)
        : isLeft(ma)
        ? ma
        : right(mab.value(ma.value)),
    chain: either.chain,
    alt: (fx, fy) => {
      if (isRight(fx)) {
        return fx
      }
      return isLeft(fy) ? left(S.concat(fx.value, fy.value)) : fy
    }
  }
}

/**
 * @since 1.19.0
 */
export function getValidationSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<Either<E, A>> {
  return {
    concat: (fx, fy) =>
      isLeft(fx)
        ? isLeft(fy)
          ? left(SE.concat(fx.value, fy.value))
          : fx
        : isLeft(fy)
        ? fy
        : right(SA.concat(fx.value, fy.value))
  }
}

/**
 * @since 1.19.0
 */
export function getValidationMonoid<E, A>(SE: Semigroup<E>, SA: Monoid<A>): Monoid<Either<E, A>> {
  return {
    concat: getValidationSemigroup(SE, SA).concat,
    empty: right(SA.empty)
  }
}

const {
  alt,
  ap,
  apFirst,
  apSecond,
  bimap,
  chain,
  chainFirst,
  duplicate,
  extend,
  flatten,
  foldMap,
  map,
  mapLeft,
  reduce,
  reduceRight
} = pipeable(either)

export {
  alt,
  ap,
  apFirst,
  apSecond,
  bimap,
  chain,
  chainFirst,
  duplicate,
  extend,
  flatten,
  foldMap,
  map,
  mapLeft,
  reduce,
  reduceRight
}
