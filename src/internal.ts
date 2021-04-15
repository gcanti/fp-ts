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

const _hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * This wrapper is needed to workaround https://github.com/gcanti/fp-ts/issues/1249.
 *
 * @internal
 */
export function hasOwnProperty(this: any, k: string, r?: object) {
  /* istanbul ignore next */
  return _hasOwnProperty.call(r === undefined ? this : r, k)
}

// -------------------------------------------------------------------------------------
// NonEmptyArray
// -------------------------------------------------------------------------------------

/** @internal */
export const fromReadonlyNonEmptyArray = <A>(as: ReadonlyNonEmptyArray<A>): NonEmptyArray<A> => [as[0], ...as.slice(1)]
