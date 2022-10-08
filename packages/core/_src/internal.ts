/**
 * @since 3.0.0
 */
import { identity } from '@fp-ts/core/Function'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import type { None, Option, Some } from '@fp-ts/core/Option'
import type { Reader } from '@fp-ts/core/Reader'
import type { Failure, Result, Success } from '@fp-ts/core/Result'

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
export const getFailure = <E>(self: Result<E, unknown>): Option<E> => (isSuccess(self) ? none : some(self.failure))

/** @internal */
export const getSuccess = <A>(self: Result<unknown, A>): Option<A> => (isFailure(self) ? none : some(self.success))

/** @internal */
export const optionFromNullable = <A>(a: A): Option<NonNullable<A>> => (a == null ? none : some(a as NonNullable<A>))

// -------------------------------------------------------------------------------------
// Result
// -------------------------------------------------------------------------------------

/** @internal */
export const isFailure = <E>(ma: Result<E, unknown>): ma is Failure<E> => ma._tag === 'Failure'

/** @internal */
export const isSuccess = <A>(ma: Result<unknown, A>): ma is Success<A> => ma._tag === 'Success'

/** @internal */
export const fail = <E>(e: E): Result<E, never> => ({ _tag: 'Failure', failure: e })

/** @internal */
export const succeed = <A>(a: A): Result<never, A> => ({ _tag: 'Success', success: a })

/** @internal */
export const fromOption = <E>(onNone: E) =>
  <A>(fa: Option<A>): Result<E, A> => isNone(fa) ? fail(onNone) : succeed(fa.value)

/** @internal */
export const eitherFromNullable = <E>(onNullable: E) =>
  <A>(a: A): Result<E, NonNullable<A>> => a == null ? fail(onNullable) : succeed(a as NonNullable<A>)

// -------------------------------------------------------------------------------------
// NonEmptyReadonlyArray
// -------------------------------------------------------------------------------------

/** @internal */
export const singleton = <A>(a: A): NonEmptyArray<A> => [a]

/** @internal */
export const isNonEmpty = <A>(as: ReadonlyArray<A>): as is NonEmptyReadonlyArray<A> => as.length > 0

/** @internal */
export const head = <A>(as: NonEmptyReadonlyArray<A>): A => as[0]

/** @internal */
export const tail = <A>(as: NonEmptyReadonlyArray<A>): ReadonlyArray<A> => as.slice(1)

// -------------------------------------------------------------------------------------
// empty
// -------------------------------------------------------------------------------------

/** @internal */
export const emptyReadonlyArray: readonly [] = []

/** @internal */
export const emptyReadonlyRecord: {} = {}

/** @internal */
export const emptyReadonlyMap = new Map<never, never>()

/** @internal */
export const emptyReadonlySet = new Set<never>()

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
export const fromNonEmptyReadonlyArray = <A>(as: NonEmptyReadonlyArray<A>): NonEmptyArray<A> => [head(as), ...tail(as)]
