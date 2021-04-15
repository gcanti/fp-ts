/**
 * @since 2.10.0
 */
import { Either, Left } from './Either'
import { NonEmptyArray } from './NonEmptyArray'
import { Option, Some } from './Option'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'

// -------------------------------------------------------------------------------------
// Option
// -------------------------------------------------------------------------------------

/** @internal */
export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === 'Some'

// -------------------------------------------------------------------------------------
// Either
// -------------------------------------------------------------------------------------

/** @internal */
export const isLeft = <E, A>(ma: Either<E, A>): ma is Left<E> => ma._tag === 'Left'

// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------

/** @internal */
export const has = Object.prototype.hasOwnProperty

// -------------------------------------------------------------------------------------
// NonEmptyArray
// -------------------------------------------------------------------------------------

/** @internal */
export const fromReadonlyNonEmptyArray = <A>(as: ReadonlyNonEmptyArray<A>): NonEmptyArray<A> => [as[0], ...as.slice(1)]
