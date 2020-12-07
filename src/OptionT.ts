/**
 * @since 2.0.0
 */
import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative2C,
  ApplicativeComposition11,
  ApplicativeComposition21,
  ApplicativeComposition2C1,
  ApplicativeCompositionHKT1,
  getApplicativeComposition
} from './Applicative'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C } from './Monad'
import * as O from './Option'
import { Lazy } from './function'

// TODO: remove module in v3

/**
 * @category model
 * @since 2.0.0
 */
export interface OptionT<M, A> extends HKT<M, O.Option<A>> {}

/**
 * @since 2.0.0
 */
export interface OptionM<M> extends ApplicativeCompositionHKT1<M, O.URI> {
  readonly chain: <A, B>(ma: OptionT<M, A>, f: (a: A) => OptionT<M, B>) => OptionT<M, B>
  readonly alt: <A>(fa: OptionT<M, A>, that: Lazy<OptionT<M, A>>) => OptionT<M, A>
  readonly fold: <A, R>(ma: OptionT<M, A>, onNone: Lazy<HKT<M, R>>, onSome: (a: A) => HKT<M, R>) => HKT<M, R>
  readonly getOrElse: <A>(ma: OptionT<M, A>, onNone: Lazy<HKT<M, A>>) => HKT<M, A>
  readonly fromM: <A>(ma: HKT<M, A>) => OptionT<M, A>
  readonly none: <A = never>() => OptionT<M, A>
}

/**
 * @category model
 * @since 2.0.0
 */
export type OptionT1<M extends URIS, A> = Kind<M, O.Option<A>>

/**
 * @since 2.0.0
 */
export interface OptionM1<M extends URIS> extends ApplicativeComposition11<M, O.URI> {
  readonly chain: <A, B>(ma: OptionT1<M, A>, f: (a: A) => OptionT1<M, B>) => OptionT1<M, B>
  readonly alt: <A>(fa: OptionT1<M, A>, that: Lazy<OptionT1<M, A>>) => OptionT1<M, A>
  readonly fold: <A, R>(ma: OptionT1<M, A>, onNone: Lazy<Kind<M, R>>, onSome: (a: A) => Kind<M, R>) => Kind<M, R>
  readonly getOrElse: <A>(ma: OptionT1<M, A>, onNone: Lazy<Kind<M, A>>) => Kind<M, A>
  readonly fromM: <A>(ma: Kind<M, A>) => OptionT1<M, A>
  readonly none: <A = never>() => OptionT1<M, A>
}

/**
 * @category model
 * @since 2.0.0
 */
export type OptionT2<M extends URIS2, E, A> = Kind2<M, E, O.Option<A>>

/**
 * @since 2.0.0
 */
export interface OptionM2<M extends URIS2> extends ApplicativeComposition21<M, O.URI> {
  readonly chain: <E, A, B>(ma: OptionT2<M, E, A>, f: (a: A) => OptionT2<M, E, B>) => OptionT2<M, E, B>
  readonly alt: <E, A>(fa: OptionT2<M, E, A>, that: Lazy<OptionT2<M, E, A>>) => OptionT2<M, E, A>
  readonly fold: <E, A, R>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, R>>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <E, A>(ma: OptionT2<M, E, A>, onNone: Lazy<Kind2<M, E, A>>) => Kind2<M, E, A>
  readonly fromM: <E, A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <E = never, A = never>() => OptionT2<M, E, A>
}

/**
 * @since 2.2.0
 */
export interface OptionM2C<M extends URIS2, E> extends ApplicativeComposition2C1<M, O.URI, E> {
  readonly chain: <A, B>(ma: OptionT2<M, E, A>, f: (a: A) => OptionT2<M, E, B>) => OptionT2<M, E, B>
  readonly alt: <A>(fa: OptionT2<M, E, A>, that: Lazy<OptionT2<M, E, A>>) => OptionT2<M, E, A>
  readonly fold: <A, R>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, R>>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <A>(ma: OptionT2<M, E, A>, onNone: Lazy<Kind2<M, E, A>>) => Kind2<M, E, A>
  readonly fromM: <A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <A = never>() => OptionT2<M, E, A>
}

/**
 * @since 2.0.0
 */
export function getOptionM<M extends URIS2>(M: Monad2<M> & Applicative2<M>): OptionM2<M>
export function getOptionM<M extends URIS2, E>(M: Monad2C<M, E> & Applicative2C<M, E>): OptionM2C<M, E>
export function getOptionM<M extends URIS>(M: Monad1<M> & Applicative1<M>): OptionM1<M>
export function getOptionM<M>(M: Monad<M> & Applicative<M>): OptionM<M>
export function getOptionM<M>(M: Monad<M> & Applicative<M>): OptionM<M> {
  const A = getApplicativeComposition(M, O.Applicative)
  const fnone = M.of(O.none)

  return {
    map: A.map,
    ap: A.ap,
    of: A.of,
    chain: (ma, f) =>
      M.chain(
        ma,
        O.fold(() => fnone, f)
      ),
    alt: (fa, that) =>
      M.chain(
        fa,
        O.fold(that, (a) => M.of(O.some(a)))
      ),
    fold: (ma, onNone, onSome) => M.chain(ma, O.fold(onNone, onSome)),
    getOrElse: (ma, onNone) =>
      M.chain(
        ma,
        O.fold(onNone, (a) => M.of(a))
      ),
    fromM: (ma) => M.map(ma, O.some),
    none: () => fnone
  }
}
