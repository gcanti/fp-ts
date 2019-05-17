import {
  ApplicativeComposition01,
  ApplicativeComposition11,
  ApplicativeComposition21,
  getApplicativeComposition
} from './Applicative'
import { HKT, Type, Type2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { fold, none, Option, option, some, URI } from './Option'

/**
 * @since 2.0.0
 */
export interface OptionT<M, A> extends HKT<M, Option<A>> {}

/**
 * @since 2.0.0
 */
export interface OptionM<M> extends ApplicativeComposition01<M, URI> {
  readonly chain: <A, B>(ma: OptionT<M, A>, f: (a: A) => OptionT<M, B>) => OptionT<M, B>
  readonly alt: <A>(fx: OptionT<M, A>, fy: () => OptionT<M, A>) => OptionT<M, A>
  readonly fold: <A, R>(onNone: () => HKT<M, R>, onSome: (a: A) => HKT<M, R>) => (ma: OptionT<M, A>) => HKT<M, R>
  readonly getOrElse: <A>(onNone: () => HKT<M, A>) => (ma: OptionT<M, A>) => HKT<M, A>
  readonly fromM: <A>(ma: HKT<M, A>) => OptionT<M, A>
  readonly fromOption: <A>(ma: Option<A>) => OptionT<M, A>
  readonly none: () => OptionT<M, never>
}

/**
 * @since 2.0.0
 */
export type OptionT1<M extends URIS, A> = Type<M, Option<A>>

/**
 * @since 2.0.0
 */
export interface OptionM1<M extends URIS> extends ApplicativeComposition11<M, URI> {
  readonly chain: <A, B>(ma: OptionT1<M, A>, f: (a: A) => OptionT1<M, B>) => OptionT1<M, B>
  readonly alt: <A>(fx: OptionT1<M, A>, fy: () => OptionT1<M, A>) => OptionT1<M, A>
  readonly fold: <A, R>(onNone: () => Type<M, R>, onSome: (a: A) => Type<M, R>) => (ma: OptionT1<M, A>) => Type<M, R>
  readonly getOrElse: <A>(onNone: () => Type<M, A>) => (ma: OptionT1<M, A>) => Type<M, A>
  readonly fromM: <A>(ma: Type<M, A>) => OptionT1<M, A>
  readonly fromOption: <A>(ma: Option<A>) => OptionT1<M, A>
  readonly none: () => OptionT1<M, never>
}

/**
 * @since 2.0.0
 */
export type OptionT2<M extends URIS2, L, A> = Type2<M, L, Option<A>>

/**
 * @since 2.0.0
 */
export interface OptionM2<M extends URIS2> extends ApplicativeComposition21<M, URI> {
  readonly chain: <L, A, B>(ma: OptionT2<M, L, A>, f: (a: A) => OptionT2<M, L, B>) => OptionT2<M, L, B>
  readonly alt: <L, A>(fx: OptionT2<M, L, A>, fy: () => OptionT2<M, L, A>) => OptionT2<M, L, A>
  readonly fold: <L, A, R>(
    onNone: () => Type2<M, L, R>,
    onSome: (a: A) => Type2<M, L, R>
  ) => (ma: OptionT2<M, L, A>) => Type2<M, L, R>
  readonly getOrElse: <L, A>(onNone: () => Type2<M, L, A>) => (ma: OptionT2<M, L, A>) => Type2<M, L, A>
  readonly fromM: <L, A>(ma: Type2<M, L, A>) => OptionT2<M, L, A>
  readonly fromOption: <L, A>(ma: Option<A>) => OptionT2<M, L, A>
  readonly none: <L>() => OptionT2<M, L, never>
}

/**
 * @since 2.0.0
 */
export function getOptionM<M extends URIS2>(M: Monad2<M>): OptionM2<M>
export function getOptionM<M extends URIS>(M: Monad1<M>): OptionM1<M>
export function getOptionM<M>(M: Monad<M>): OptionM<M>
export function getOptionM<M>(M: Monad<M>): OptionM<M> {
  const A = getApplicativeComposition(M, option)
  const fnone = M.of(none)

  return {
    ...A,
    chain: (ma, f) => M.chain(ma, fold(() => fnone, f)),
    alt: (fx, fy) => M.chain(fx, fold(fy, a => M.of(some(a)))),
    fold: (onNone, onSome) => ma => M.chain(ma, fold(onNone, onSome)),
    getOrElse: onNone => ma => M.chain(ma, fold(onNone, M.of)),
    fromM: ma => M.map(ma, some),
    fromOption: M.of,
    none: () => fnone
  }
}
