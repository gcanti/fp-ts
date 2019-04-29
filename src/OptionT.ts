import {
  ApplicativeComposition01,
  ApplicativeComposition11,
  ApplicativeComposition21,
  ApplicativeComposition2C1,
  ApplicativeComposition3C1,
  getApplicativeComposition
} from './Applicative'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3C } from './Monad'
import { fold, getOrElse, isNone, none, Option, option, some, URI } from './Option'

export interface OptionT<M, A> extends HKT<M, Option<A>> {}

export interface OptionM<M> extends ApplicativeComposition01<M, URI> {
  readonly chain: <A, B>(ma: OptionT<M, A>, f: (a: A) => OptionT<M, B>) => OptionT<M, B>
  readonly fold: <A, R>(ma: OptionT<M, A>, onNone: () => R, onSome: (a: A) => R) => HKT<M, R>
  readonly getOrElse: <A>(ma: OptionT<M, A>, f: () => A) => HKT<M, A>
  readonly fromM: <A>(ma: HKT<M, A>) => OptionT<M, A>
}

type OptionT1<M extends URIS, A> = Type<M, Option<A>>

interface OptionM1<M extends URIS> extends ApplicativeComposition11<M, URI> {
  readonly chain: <A, B>(ma: OptionT1<M, A>, f: (a: A) => OptionT1<M, B>) => OptionT1<M, B>
  readonly fold: <A, R>(ma: OptionT1<M, A>, onNone: () => R, onSome: (a: A) => R) => Type<M, R>
  readonly getOrElse: <A>(ma: OptionT1<M, A>, f: () => A) => Type<M, A>
  readonly fromM: <A>(ma: Type<M, A>) => OptionT1<M, A>
}

type OptionT2<M extends URIS2, L, A> = Type2<M, L, Option<A>>

interface OptionM2<M extends URIS2> extends ApplicativeComposition21<M, URI> {
  readonly chain: <L, A, B>(ma: OptionT2<M, L, A>, f: (a: A) => OptionT2<M, L, B>) => OptionT2<M, L, B>
  readonly fold: <L, A, R>(ma: OptionT2<M, L, A>, onNone: () => R, onSome: (a: A) => R) => Type2<M, L, R>
  readonly getOrElse: <L, A>(ma: OptionT2<M, L, A>, f: () => A) => Type2<M, L, A>
  readonly fromM: <L, A>(ma: Type2<M, L, A>) => OptionT2<M, L, A>
}

interface OptionM2C<M extends URIS2, L> extends ApplicativeComposition2C1<M, URI, L> {
  readonly chain: <A, B>(ma: OptionT2<M, L, A>, f: (a: A) => OptionT2<M, L, B>) => OptionT2<M, L, B>
  readonly fold: <A, R>(ma: OptionT2<M, L, A>, onNone: () => R, onSome: (a: A) => R) => Type2<M, L, R>
  readonly getOrElse: <A>(ma: OptionT2<M, L, A>, f: () => A) => Type2<M, L, A>
  readonly fromM: <A>(ma: Type2<M, L, A>) => OptionT2<M, L, A>
}

type OptionT3<M extends URIS3, U, L, A> = Type3<M, U, L, Option<A>>

interface OptionM3C<M extends URIS3, U, L> extends ApplicativeComposition3C1<M, URI, U, L> {
  readonly chain: <A, B>(ma: OptionT3<M, U, L, A>, f: (a: A) => OptionT3<M, U, L, B>) => OptionT3<M, U, L, B>
  readonly fold: <A, R>(ma: OptionT3<M, U, L, A>, onNone: () => R, onSome: (a: A) => R) => Type3<M, U, L, R>
  readonly getOrElse: <A>(ma: OptionT3<M, U, L, A>, f: () => A) => Type3<M, U, L, A>
  readonly fromM: <A>(ma: Type3<M, U, L, A>) => OptionT3<M, U, L, A>
}

/**
 * @since 2.0.0
 */
export function getOptionM<M extends URIS3, U, L>(M: Monad3C<M, U, L>): OptionM3C<M, U, L>
export function getOptionM<M extends URIS2>(M: Monad2<M>): OptionM2<M>
export function getOptionM<M extends URIS2, L>(M: Monad2C<M, L>): OptionM2C<M, L>
export function getOptionM<M extends URIS>(M: Monad1<M>): OptionM1<M>
export function getOptionM<M>(M: Monad<M>): OptionM<M>
export function getOptionM<M>(M: Monad<M>): OptionM<M> {
  const A = getApplicativeComposition(M, option)
  const fnone = M.of(none)

  return {
    ...A,
    chain: (ma, f) => M.chain(ma, o => (isNone(o) ? fnone : f(o.value))),
    fold: (ma, onNone, onSome) => M.map(ma, o => fold(o, onNone, onSome)),
    getOrElse: (ma, f) => M.map(ma, o => getOrElse(o, f)),
    fromM: ma => M.map(ma, some)
  }
}
