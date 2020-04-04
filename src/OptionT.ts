/**
 * @since 2.0.0
 */
import {
  ApplicativeComposition11,
  ApplicativeComposition21,
  ApplicativeComposition2C1,
  ApplicativeCompositionHKT1,
  getApplicativeComposition
} from './Applicative'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C } from './Monad'
import { fold, none, Option, option, some, URI } from './Option'

/**
 * @since 2.0.0
 */
export interface OptionT<M, A> extends HKT<M, Option<A>> {}

/**
 * @since 2.0.0
 */
export interface OptionM<M> extends ApplicativeCompositionHKT1<M, URI> {
  readonly chain: <A, B>(ma: OptionT<M, A>, f: (a: A) => OptionT<M, B>) => OptionT<M, B>
  readonly alt: <A>(fx: OptionT<M, A>, fy: () => OptionT<M, A>) => OptionT<M, A>
  readonly fold: <A, R>(ma: OptionT<M, A>, onNone: () => HKT<M, R>, onSome: (a: A) => HKT<M, R>) => HKT<M, R>
  readonly getOrElse: <A>(ma: OptionT<M, A>, onNone: () => HKT<M, A>) => HKT<M, A>
  readonly fromM: <A>(ma: HKT<M, A>) => OptionT<M, A>
  readonly none: <A = never>() => OptionT<M, A>
}

/**
 * @since 2.0.0
 */
export type OptionT1<M extends URIS, A> = Kind<M, Option<A>>

/**
 * @since 2.0.0
 */
export interface OptionM1<M extends URIS> extends ApplicativeComposition11<M, URI> {
  readonly chain: <A, B>(ma: OptionT1<M, A>, f: (a: A) => OptionT1<M, B>) => OptionT1<M, B>
  readonly alt: <A>(fx: OptionT1<M, A>, fy: () => OptionT1<M, A>) => OptionT1<M, A>
  readonly fold: <A, R>(ma: OptionT1<M, A>, onNone: () => Kind<M, R>, onSome: (a: A) => Kind<M, R>) => Kind<M, R>
  readonly getOrElse: <A>(ma: OptionT1<M, A>, onNone: () => Kind<M, A>) => Kind<M, A>
  readonly fromM: <A>(ma: Kind<M, A>) => OptionT1<M, A>
  readonly none: <A = never>() => OptionT1<M, A>
}

/**
 * @since 2.0.0
 */
export type OptionT2<M extends URIS2, E, A> = Kind2<M, E, Option<A>>

/**
 * @since 2.0.0
 */
export interface OptionM2<M extends URIS2> extends ApplicativeComposition21<M, URI> {
  readonly chain: <E, A, B>(ma: OptionT2<M, E, A>, f: (a: A) => OptionT2<M, E, B>) => OptionT2<M, E, B>
  readonly alt: <E, A>(fx: OptionT2<M, E, A>, fy: () => OptionT2<M, E, A>) => OptionT2<M, E, A>
  readonly fold: <E, A, R>(
    ma: OptionT2<M, E, A>,
    onNone: () => Kind2<M, E, R>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <E, A>(ma: OptionT2<M, E, A>, onNone: () => Kind2<M, E, A>) => Kind2<M, E, A>
  readonly fromM: <E, A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <E = never, A = never>() => OptionT2<M, E, A>
}

/**
 * @since 2.2.0
 */
export interface OptionM2C<M extends URIS2, E> extends ApplicativeComposition2C1<M, URI, E> {
  readonly chain: <A, B>(ma: OptionT2<M, E, A>, f: (a: A) => OptionT2<M, E, B>) => OptionT2<M, E, B>
  readonly alt: <A>(fx: OptionT2<M, E, A>, fy: () => OptionT2<M, E, A>) => OptionT2<M, E, A>
  readonly fold: <A, R>(
    ma: OptionT2<M, E, A>,
    onNone: () => Kind2<M, E, R>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <A>(ma: OptionT2<M, E, A>, onNone: () => Kind2<M, E, A>) => Kind2<M, E, A>
  readonly fromM: <A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <A = never>() => OptionT2<M, E, A>
}

/**
 * @since 2.0.0
 */
export function getOptionM<M extends URIS2>(M: Monad2<M>): OptionM2<M>
export function getOptionM<M extends URIS2, E>(M: Monad2C<M, E>): OptionM2C<M, E>
export function getOptionM<M extends URIS>(M: Monad1<M>): OptionM1<M>
export function getOptionM<M>(M: Monad<M>): OptionM<M>
export function getOptionM<M>(M: Monad<M>): OptionM<M> {
  const A = getApplicativeComposition(M, option)
  const fnone = M.of(none)

  return {
    ...A,
    chain: (ma, f) =>
      M.chain(
        ma,
        fold(() => fnone, f)
      ),
    alt: (fx, fy) =>
      M.chain(
        fx,
        fold(fy, (a) => M.of(some(a)))
      ),
    fold: (ma, onNone, onSome) => M.chain(ma, fold(onNone, onSome)),
    getOrElse: (ma, onNone) => M.chain(ma, fold(onNone, M.of)),
    fromM: (ma) => M.map(ma, some),
    none: () => fnone
  }
}
