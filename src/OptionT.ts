import {
  ApplicativeComposition01,
  ApplicativeComposition11,
  ApplicativeComposition21,
  ApplicativeComposition2C1,
  getApplicativeComposition
} from './Applicative'
import { HKT, Type, Type2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C } from './Monad'
import { fold, isNone, none, Option, option, some, URI } from './Option'

export interface OptionT<M, A> extends HKT<M, Option<A>> {}

export interface OptionM<M> extends ApplicativeComposition01<M, URI> {
  readonly chain: <A, B>(ma: OptionT<M, A>, f: (a: A) => OptionT<M, B>) => OptionT<M, B>
  readonly fold: <A, R>(ma: OptionT<M, A>, onNone: () => HKT<M, R>, onSome: (a: A) => HKT<M, R>) => HKT<M, R>
  readonly getOrElse: <A>(ma: OptionT<M, A>, onNone: () => HKT<M, A>) => HKT<M, A>
  readonly fromM: <A>(ma: HKT<M, A>) => OptionT<M, A>
  readonly fromOption: <A>(ma: Option<A>) => OptionT<M, A>
  readonly none: () => OptionT<M, never>
}

type OptionT1<M extends URIS, A> = Type<M, Option<A>>

interface OptionM1<M extends URIS> extends ApplicativeComposition11<M, URI> {
  readonly chain: <A, B>(ma: OptionT1<M, A>, f: (a: A) => OptionT1<M, B>) => OptionT1<M, B>
  readonly fold: <A, R>(ma: OptionT1<M, A>, onNone: () => Type<M, R>, onSome: (a: A) => Type<M, R>) => Type<M, R>
  readonly getOrElse: <A>(ma: OptionT1<M, A>, onNone: () => Type<M, A>) => Type<M, A>
  readonly fromM: <A>(ma: Type<M, A>) => OptionT1<M, A>
  readonly fromOption: <A>(ma: Option<A>) => OptionT1<M, A>
  readonly none: () => OptionT1<M, never>
}

type OptionT2<M extends URIS2, L, A> = Type2<M, L, Option<A>>

interface OptionM2<M extends URIS2> extends ApplicativeComposition21<M, URI> {
  readonly chain: <L, A, B>(ma: OptionT2<M, L, A>, f: (a: A) => OptionT2<M, L, B>) => OptionT2<M, L, B>
  readonly fold: <L, A, R>(
    ma: OptionT2<M, L, A>,
    onNone: () => Type2<M, L, R>,
    onSome: (a: A) => Type2<M, L, R>
  ) => Type2<M, L, R>
  readonly getOrElse: <L, A>(ma: OptionT2<M, L, A>, onNone: () => Type2<M, L, A>) => Type2<M, L, A>
  readonly fromM: <L, A>(ma: Type2<M, L, A>) => OptionT2<M, L, A>
  readonly fromOption: <L, A>(ma: Option<A>) => OptionT2<M, L, A>
  readonly none: <L>() => OptionT2<M, L, never>
}

interface OptionM2C<M extends URIS2, L> extends ApplicativeComposition2C1<M, URI, L> {
  readonly chain: <A, B>(ma: OptionT2<M, L, A>, f: (a: A) => OptionT2<M, L, B>) => OptionT2<M, L, B>
  readonly fold: <A, R>(
    ma: OptionT2<M, L, A>,
    onNone: () => Type2<M, L, R>,
    onSome: (a: A) => Type2<M, L, R>
  ) => Type2<M, L, R>
  readonly getOrElse: <A>(ma: OptionT2<M, L, A>, onNone: () => Type2<M, L, A>) => Type2<M, L, A>
  readonly fromM: <A>(ma: Type2<M, L, A>) => OptionT2<M, L, A>
  readonly fromOption: <A>(ma: Option<A>) => OptionT2<M, L, A>
  readonly none: () => OptionT2<M, L, never>
}

/**
 * @since 2.0.0
 */
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
    fold: (ma, onNone, onSome) => M.chain(ma, o => fold(o, onNone, onSome)),
    getOrElse: (ma, onNone) => M.chain(ma, e => fold(e, onNone, M.of)),
    fromM: ma => M.map(ma, some),
    fromOption: o => M.of(o),
    none: () => fnone
  }
}
