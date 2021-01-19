/**
 * @since 2.0.0
 */
import {
  ApplicativeCompositionHKT2C,
  ApplicativeComposition12C,
  ApplicativeComposition22C,
  getApplicativeComposition
} from './Applicative'
import { Either, getValidation, isLeft, isRight, left, URI } from './Either'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { Semigroup } from './Semigroup'
import { Lazy } from './function'

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 * @deprecated
 */
export interface ValidationT<M, E, A> extends HKT<M, Either<E, A>> {}

/**
 * @since 2.0.0
 * @deprecated
 */
export interface ValidationM<M, E> extends ApplicativeCompositionHKT2C<M, URI, E> {
  // tslint:disable-next-line: deprecation
  readonly chain: <A, B>(ma: ValidationT<M, E, A>, f: (a: A) => ValidationT<M, E, B>) => ValidationT<M, E, B>
  // tslint:disable-next-line: deprecation
  readonly alt: <A>(fa: ValidationT<M, E, A>, that: Lazy<ValidationT<M, E, A>>) => ValidationT<M, E, A>
}

/**
 * @since 2.0.0
 * @deprecated
 */
export type ValidationT1<M extends URIS, E, A> = Kind<M, Either<E, A>>

/**
 * @since 2.0.0
 * @deprecated
 */
export interface ValidationM1<M extends URIS, E> extends ApplicativeComposition12C<M, URI, E> {
  // tslint:disable-next-line: deprecation
  readonly chain: <A, B>(ma: ValidationT1<M, E, A>, f: (a: A) => ValidationT1<M, E, B>) => ValidationT1<M, E, B>
  // tslint:disable-next-line: deprecation
  readonly alt: <A>(fa: ValidationT1<M, E, A>, that: Lazy<ValidationT1<M, E, A>>) => ValidationT1<M, E, A>
}

/**
 * @since 2.0.0
 * @deprecated
 */
export type ValidationT2<M extends URIS2, R, E, A> = Kind2<M, R, Either<E, A>>

/**
 * @since 2.0.0
 * @deprecated
 */
export interface ValidationM2<M extends URIS2, E> extends ApplicativeComposition22C<M, URI, E> {
  readonly chain: <R, A, B>(
    // tslint:disable-next-line: deprecation
    ma: ValidationT2<M, R, E, A>,
    // tslint:disable-next-line: deprecation
    f: (a: A) => ValidationT2<M, R, E, B>
    // tslint:disable-next-line: deprecation
  ) => ValidationT2<M, R, E, B>
  // tslint:disable-next-line: deprecation
  readonly alt: <R, A>(fa: ValidationT2<M, R, E, A>, that: Lazy<ValidationT2<M, R, E, A>>) => ValidationT2<M, R, E, A>
}

/**
 * Use `EitherT` instead.
 *
 * @since 2.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export function getValidationM<E, M extends URIS2>(S: Semigroup<E>, M: Monad2<M>): ValidationM2<M, E>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function getValidationM<E, M extends URIS>(S: Semigroup<E>, M: Monad1<M>): ValidationM1<M, E>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function getValidationM<E, M>(S: Semigroup<E>, M: Monad<M>): ValidationM<M, E>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function getValidationM<E, M>(S: Semigroup<E>, M: Monad<M>): ValidationM<M, E> {
  const A = getApplicativeComposition(M, getValidation(S))

  return {
    map: A.map,
    ap: A.ap,
    of: A.of,
    chain: /* istanbul ignore next */ (ma, f) => M.chain(ma, (e) => (isLeft(e) ? M.of(left(e.left)) : f(e.right))),
    alt: (me, that) =>
      M.chain(me, (e1) =>
        isRight(e1) ? M.of(e1) : M.map(that(), (e2) => (isLeft(e2) ? left(S.concat(e1.left, e2.left)) : e2))
      )
  }
}
