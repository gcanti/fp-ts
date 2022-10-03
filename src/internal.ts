/**
 * @since 3.0.0
 */
import type { Either, Left, Right } from './Either'
import { identity } from './Function'
import type { None, Option, Some } from './Option'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Reader } from './Reader'

// -------------------------------------------------------------------------------------
// Option
// -------------------------------------------------------------------------------------

/** @internal */
export const isNone = (fa: Option<unknown>): fa is None => fa._tag === 'None'

/** @internal */
export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === 'Some'

/** @internal */
export const none: Option<never> = { _tag: 'None' }

/** @internal */
export const some = <A>(a: A): Option<A> => ({ _tag: 'Some', value: a })

/** @internal */
export const getLeft = <E>(self: Either<E, unknown>): Option<E> => (isRight(self) ? none : some(self.left))

/** @internal */
export const getRight = <A>(self: Either<unknown, A>): Option<A> => (isLeft(self) ? none : some(self.right))

/** @internal */
export const optionFromNullable = <A>(a: A): Option<NonNullable<A>> => (a == null ? none : some(a as NonNullable<A>))

// -------------------------------------------------------------------------------------
// Either
// -------------------------------------------------------------------------------------

/** @internal */
export const isLeft = <E>(ma: Either<E, unknown>): ma is Left<E> => ma._tag === 'Left'

/** @internal */
export const isRight = <A>(ma: Either<unknown, A>): ma is Right<A> => ma._tag === 'Right'

/** @internal */
export const left = <E>(e: E): Either<E, never> => ({ _tag: 'Left', left: e })

/** @internal */
export const right = <A>(a: A): Either<never, A> => ({ _tag: 'Right', right: a })

/** @internal */
export const fromOption =
  <E>(onNone: E) =>
  <A>(fa: Option<A>): Either<E, A> =>
    isNone(fa) ? left(onNone) : right(fa.value)

/** @internal */
export const eitherFromNullable =
  <E>(onNullable: E) =>
  <A>(a: A): Either<E, NonNullable<A>> =>
    a == null ? left(onNullable) : right(a as NonNullable<A>)

// -------------------------------------------------------------------------------------
// ReadonlyNonEmptyArray
// -------------------------------------------------------------------------------------

/** @internal */
export const singleton = <A>(a: A): NonEmptyArray<A> => [a]

/** @internal */
export const isNonEmpty = <A>(as: ReadonlyArray<A>): as is ReadonlyNonEmptyArray<A> => as.length > 0

/** @internal */
export const head = <A>(as: ReadonlyNonEmptyArray<A>): A => as[0]

/** @internal */
export const tail = <A>(as: ReadonlyNonEmptyArray<A>): ReadonlyArray<A> => as.slice(1)

// -------------------------------------------------------------------------------------
// empty
// -------------------------------------------------------------------------------------

/** @internal */
export const Zip: readonly [] = []

/** @internal */
export const Do: {} = {}

// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------

/** @internal */
export const has = Object.prototype.hasOwnProperty

// -------------------------------------------------------------------------------------
// Reader
// -------------------------------------------------------------------------------------

/** @internal */
export const ask: <R>() => Reader<R, R> = () => identity

// -------------------------------------------------------------------------------------
// NonEmptyArray
// -------------------------------------------------------------------------------------

/**
 * @internal
 * @since 3.0.0
 */
export type NonEmptyArray<A> = [A, ...Array<A>]

/** @internal */
export const fromReadonlyNonEmptyArray = <A>(as: ReadonlyNonEmptyArray<A>): NonEmptyArray<A> => [head(as), ...tail(as)]
