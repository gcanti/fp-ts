/**
 * @file The `Validation` functor, used for applicative validation
 *
 * The `Applicative` instance collects multiple failures in an arbitrary `Semigroup`.
 *
 * Adapted from https://github.com/purescript/purescript-validation
 */
import { Alt2C } from './Alt'
import { Applicative, Applicative2C } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { Compactable2C, Separated } from './Compactable'
import { Either } from './Either'
import { Filterable2C } from './Filterable'
import { Foldable2 } from './Foldable'
import { Lazy, phantom, Predicate, Refinement } from './function'
import { Functor2 } from './Functor'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { MonadThrow2C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option, isNone, isSome } from './Option'
import { Semigroup } from './Semigroup'
import { fromEquals, Setoid } from './Setoid'
import { Show } from './Show'
import { Traversable2 } from './Traversable'
import { Witherable2C } from './Witherable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Validation: Validation<L, A>
  }
}

export const URI = 'Validation'

export type URI = typeof URI

export interface Failure<L> {
  readonly _tag: 'Failure'
  readonly value: L
}

export interface Success<A> {
  readonly _tag: 'Success'
  readonly value: A
}

/**
 * @example
 * import { Validation, getApplicative, success, failure } from 'fp-ts/lib/Validation'
 * import { NonEmptyArray, getSemigroup, make } from 'fp-ts/lib/NonEmptyArray'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * // curried constructor
 * const person = (name: string) => (age: number): Person => ({ name, age })
 *
 * // validators
 * function validateName(input: string): Validation<NonEmptyArray<string>, string> {
 *   return input.length === 0 ? failure(make<string>('Invalid name: empty string', [])) : success(input)
 * }
 * function validateAge(input: string): Validation<NonEmptyArray<string>, number> {
 *   const n = parseFloat(input)
 *   if (isNaN(n)) {
 *     return failure(make<string>(`Invalid age: not a number ${input}`, []))
 *   }
 *   return n % 1 !== 0 ? failure(make<string>(`Invalid age: not an integer ${n}`, [])) : success(n)
 * }
 *
 * // get an `Applicative` instance for Validation<NonEmptyArray<string>, ?>
 * const A = getApplicative(getSemigroup<string>())
 *
 * function validatePerson(input: Record<string, string>): Validation<NonEmptyArray<string>, Person> {
 *   return A.ap(validateName(input['name']).map(person), validateAge(input['age']))
 * }
 *
 * assert.deepStrictEqual(validatePerson({ name: '', age: '1.2' }), failure(make<string>("Invalid name: empty string", ["Invalid age: not an integer 1.2"])))
 *
 * assert.deepStrictEqual(validatePerson({ name: 'Giulio', age: '44' }), success({ "name": "Giulio", "age": 44 }))
 *
 * @since 1.0.0
 */
export type Validation<L, A> = Failure<L> | Success<A>

/**
 * @since 2.0.0
 */
export function fold<L, A, R>(ma: Validation<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R): R {
  return isFailure(ma) ? onLeft(ma.value) : onRight(ma.value)
}

/**
 * @since 2.0.0
 */
export function mapFailure<L, A, M>(ma: Validation<L, A>, f: (l: L) => M): Validation<M, A> {
  return isFailure(ma) ? failure(f(ma.value)) : ma
}

/**
 * @since 2.0.0
 */
export function swap<L, A>(ma: Validation<L, A>): Validation<A, L> {
  return isFailure(ma) ? success(ma.value) : failure(ma.value)
}

/**
 * @since 2.0.0
 */
export function orElse<L, A, M>(ma: Validation<L, A>, f: (l: L) => Validation<M, A>): Validation<M, A> {
  return isFailure(ma) ? f(ma.value) : ma
}

/**
 * @since 2.0.0
 */
export function getOrElse<L, A>(ma: Validation<L, A>, a: A): A {
  return isFailure(ma) ? a : ma.value
}

/**
 * @since 2.0.0
 */
export function getOrElseL<L, A>(ma: Validation<L, A>, f: (l: L) => A): A {
  return isFailure(ma) ? f(ma.value) : ma.value
}

/**
 * @since 2.0.0
 */
export function filterOrElse<L, A, B extends A>(
  ma: Validation<L, A>,
  refinement: Refinement<A, B>,
  zero: L
): Validation<L, B>
export function filterOrElse<L, A>(ma: Validation<L, A>, predicate: Predicate<A>, zero: L): Validation<L, A>
export function filterOrElse<L, A>(ma: Validation<L, A>, predicate: Predicate<A>, zero: L): Validation<L, A> {
  return isFailure(ma) ? ma : predicate(ma.value) ? ma : failure(zero)
}

/**
 * @since 2.0.0
 */
export function filterOrElseL<L, A, B extends A>(
  ma: Validation<L, A>,
  refinement: Refinement<A, B>,
  zero: (a: A) => L
): Validation<L, B>
export function filterOrElseL<L, A>(ma: Validation<L, A>, predicate: Predicate<A>, zero: (a: A) => L): Validation<L, A>
export function filterOrElseL<L, A>(
  ma: Validation<L, A>,
  predicate: Predicate<A>,
  zero: (a: A) => L
): Validation<L, A> {
  return isFailure(ma) ? ma : predicate(ma.value) ? ma : failure(zero(ma.value))
}

/**
 * @since 1.17.0
 */
export const getShow = <L, A>(SL: Show<L>, SA: Show<A>): Show<Validation<L, A>> => {
  return {
    show: e => fold(e, l => `failure(${SL.show(l)})`, a => `success(${SA.show(a)})`)
  }
}

/**
 * @since 1.0.0
 */
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>> => {
  return fromEquals(
    (x, y) => (isFailure(x) ? isFailure(y) && SL.equals(x.value, y.value) : isSuccess(y) && SA.equals(x.value, y.value))
  )
}

const map = <L, A, B>(ma: Validation<L, A>, f: (a: A) => B): Validation<L, B> => {
  return isFailure(ma) ? ma : success(f(ma.value))
}

/**
 * @since 1.0.0
 */
export const success = <A>(a: A): Validation<never, A> => {
  return { _tag: 'Success', value: a }
}

const of = success

/**
 * @example
 * import { Validation, success, failure, getApplicative } from 'fp-ts/lib/Validation'
 * import { getArrayMonoid } from 'fp-ts/lib/Monoid'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const person = (name: string) => (age: number): Person => ({ name, age })
 *
 * const validateName = (name: string): Validation<string[], string> =>
 *   name.length === 0 ? failure(['invalid name']) : success(name)
 *
 * const validateAge = (age: number): Validation<string[], number> =>
 *   age > 0 && age % 1 === 0 ? success(age) : failure(['invalid age'])
 *
 * const A = getApplicative(getArrayMonoid<string>())
 *
 * const validatePerson = (name: string, age: number): Validation<string[], Person> =>
 *   A.ap(A.map(validateName(name), person), validateAge(age))
 *
 * assert.deepStrictEqual(validatePerson('Nicolas Bourbaki', 45), success({ "name": "Nicolas Bourbaki", "age": 45 }))
 * assert.deepStrictEqual(validatePerson('Nicolas Bourbaki', -1), failure(["invalid age"]))
 * assert.deepStrictEqual(validatePerson('', 0), failure(["invalid name", "invalid age"]))
 *
 * @since 1.0.0
 */
export const getApplicative = <L>(S: Semigroup<L>): Applicative2C<URI, L> => {
  const ap = <A, B>(fab: Validation<L, (a: A) => B>, fa: Validation<L, A>): Validation<L, B> => {
    return isFailure(fab)
      ? isFailure(fa)
        ? failure(S.concat(fab.value, fa.value))
        : failure(fab.value)
      : isFailure(fa)
        ? failure(fa.value)
        : success(fab.value(fa.value))
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
 * **Note**: This function is here just to avoid switching to / from `Either`
 *
 * @since 1.0.0
 */
export const getMonad = <L>(S: Semigroup<L>): Monad2C<URI, L> => {
  const chain = <A, B>(fa: Validation<L, A>, f: (a: A) => Validation<L, B>): Validation<L, B> => {
    return isFailure(fa) ? failure(fa.value) : f(fa.value)
  }

  return {
    ...getApplicative(S),
    chain
  }
}

const reduce = <L, A, B>(ma: Validation<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return isFailure(ma) ? b : f(b, ma.value)
}

const foldMap = <M>(M: Monoid<M>) => <L, A>(fa: Validation<L, A>, f: (a: A) => M): M => {
  return isFailure(fa) ? M.empty : f(fa.value)
}

const foldr = <L, A, B>(fa: Validation<L, A>, b: B, f: (a: A, b: B) => B): B => {
  return isFailure(fa) ? b : f(fa.value, b)
}

const traverse = <F>(F: Applicative<F>) => <L, A, B>(
  ta: Validation<L, A>,
  f: (a: A) => HKT<F, B>
): HKT<F, Validation<L, B>> => {
  return isFailure(ta) ? F.of(failure(ta.value)) : F.map(f(ta.value), of)
}

const sequence = <F>(F: Applicative<F>) => <L, A>(ta: Validation<L, HKT<F, A>>): HKT<F, Validation<L, A>> => {
  return isFailure(ta) ? F.of(failure(ta.value)) : F.map(ta.value, of)
}

const bimap = <L, V, A, B>(ma: Validation<L, A>, f: (u: L) => V, g: (a: A) => B): Validation<V, B> => {
  return isFailure(ma) ? failure(f(ma.value)) : success(g(ma.value))
}

/**
 * @since 1.0.0
 */
export const failure = <L>(l: L): Validation<L, never> => {
  return { _tag: 'Failure', value: l }
}

/**
 * @since 1.0.0
 */
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  f: (a: A) => L
): (a: A) => Validation<L, B>
export function fromPredicate<L, A>(predicate: Predicate<A>, f: (a: A) => L): (a: A) => Validation<L, A>
export function fromPredicate<L, A>(predicate: Predicate<A>, f: (a: A) => L): (a: A) => Validation<L, A> {
  return a => (predicate(a) ? success(a) : failure(f(a)))
}

/**
 * @since 1.0.0
 */
export const fromEither = <L, A>(e: Either<L, A>): Validation<L, A> => {
  switch (e._tag) {
    case 'Left':
      return failure(e.value)
    case 'Right':
      return success(e.value)
  }
}

/**
 * Constructs a new `Validation` from a function that might throw
 *
 * @example
 * import { Validation, failure, success, tryCatch } from 'fp-ts/lib/Validation'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Validation<Error, A> => {
 *   return tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), failure(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), success(1))
 *
 * @since 1.16.0
 */
export const tryCatch = <L, A>(f: Lazy<A>, onError: (e: unknown) => L): Validation<L, A> => {
  try {
    return success(f())
  } catch (e) {
    return failure(onError(e))
  }
}

/**
 * @since 1.0.0
 */
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Validation<L, A>> => {
  const concat = (fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A> => {
    return isFailure(fx)
      ? isFailure(fy)
        ? failure(SL.concat(fx.value, fy.value))
        : failure(fx.value)
      : isFailure(fy)
        ? failure(fy.value)
        : success(SA.concat(fx.value, fy.value))
  }
  return {
    concat
  }
}

/**
 * @since 1.0.0
 */
export const getMonoid = <L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Validation<L, A>> => {
  return {
    ...getSemigroup(SL, SA),
    empty: success(SA.empty)
  }
}

/**
 * @since 1.0.0
 */
export const getAlt = <L>(S: Semigroup<L>): Alt2C<URI, L> => {
  const alt = <A>(fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A> => {
    return isFailure(fx) ? (isFailure(fy) ? failure(S.concat(fx.value, fy.value)) : fy) : fx
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
 *
 * @since 1.0.0
 */
export const isFailure = <L, A>(fa: Validation<L, A>): fa is Failure<L> => {
  return fa._tag === 'Failure'
}

/**
 * Returns `true` if the validation is an instance of `Success`, `false` otherwise
 *
 * @since 1.0.0
 */
export const isSuccess = <L, A>(fa: Validation<L, A>): fa is Success<A> => {
  return fa._tag === 'Success'
}

/**
 * Builds `Compactable` instance for `Validation` given `Monoid` for the failure side
 *
 * @since 1.7.0
 */
export function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L> {
  const compact = <A>(fa: Validation<L, Option<A>>): Validation<L, A> => {
    if (isFailure(fa)) {
      return fa
    }
    if (isNone(fa.value)) {
      return failure(ML.empty)
    }
    return success(fa.value.value)
  }

  const separate = <RL, RR, A>(fa: Validation<L, Either<RL, RR>>): Separated<Validation<L, RL>, Validation<L, RR>> => {
    if (isFailure(fa)) {
      return {
        left: fa,
        right: fa
      }
    }
    switch (fa.value._tag) {
      case 'Left':
        return {
          left: success(fa.value.value),
          right: failure(ML.empty)
        }
      case 'Right':
        return {
          left: failure(ML.empty),
          right: success(fa.value.value)
        }
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
 * Builds `Filterable` instance for `Validation` given `Monoid` for the left side
 *
 * @since 1.7.0
 */
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L> {
  const C = getCompactable(ML)
  const partitionMap = <RL, RR, A>(
    fa: Validation<L, A>,
    f: (a: A) => Either<RL, RR>
  ): Separated<Validation<L, RL>, Validation<L, RR>> => {
    if (isFailure(fa)) {
      return {
        left: fa,
        right: fa
      }
    }
    const e = f(fa.value)
    switch (e._tag) {
      case 'Left':
        return {
          left: success(e.value),
          right: failure(ML.empty)
        }
      case 'Right':
        return {
          left: failure(ML.empty),
          right: success(e.value)
        }
    }
  }
  const partition = <A>(fa: Validation<L, A>, p: Predicate<A>): Separated<Validation<L, A>, Validation<L, A>> => {
    if (isFailure(fa)) {
      return {
        left: fa,
        right: fa
      }
    }
    if (p(fa.value)) {
      return {
        left: failure(ML.empty),
        right: success(fa.value)
      }
    }
    return {
      left: success(fa.value),
      right: failure(ML.empty)
    }
  }
  const filterMap = <A, B>(fa: Validation<L, A>, f: (a: A) => Option<B>): Validation<L, B> => {
    if (isFailure(fa)) {
      return fa
    }
    const optionB = f(fa.value)
    if (isSome(optionB)) {
      return success(optionB.value)
    }
    return failure(ML.empty)
  }
  const filter = <A>(fa: Validation<L, A>, p: Predicate<A>): Validation<L, A> => {
    if (isFailure(fa)) {
      return fa
    }
    const a = fa.value
    if (p(a)) {
      return success(a)
    }
    return failure(ML.empty)
  }
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
 * Builds `Witherable` instance for `Validation` given `Monoid` for the left side
 *
 * @since 1.7.0
 */
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L> {
  const filterableValidation = getFilterable(ML)

  const wither = <F>(
    F: Applicative<F>
  ): (<A, B>(wa: Validation<L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Validation<L, B>>) => {
    const traverseF = traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), filterableValidation.compact)
  }

  const wilt = <F>(
    F: Applicative<F>
  ): (<RL, RR, A>(
    wa: Validation<L, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Validation<L, RL>, Validation<L, RR>>>) => {
    const traverseF = traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), filterableValidation.separate)
  }

  return {
    ...filterableValidation,
    traverse,
    sequence,
    reduce,
    foldMap,
    foldr,
    wither,
    wilt
  }
}

const throwError = failure

/**
 * @since 1.16.0
 */
export const getMonadThrow = <L>(S: Semigroup<L>): MonadThrow2C<URI, L> => {
  return {
    ...getMonad(S),
    throwError,
    fromEither,
    fromOption: (o, e) => (isNone(o) ? throwError(e) : of(o.value))
  }
}

/**
 * @since 1.0.0
 */
export const validation: Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI> = {
  URI,
  map,
  bimap,
  reduce,
  foldMap,
  foldr,
  traverse,
  sequence
}
