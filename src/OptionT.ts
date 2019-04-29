import {
  ApplicativeComposition,
  ApplicativeComposition11,
  ApplicativeComposition21,
  ApplicativeComposition2C1,
  ApplicativeComposition3C1,
  getApplicativeComposition
} from './Applicative'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3C } from './Monad'
import { isNone, none, Option, option, URI } from './Option'

interface OptionT<M> extends ApplicativeComposition<M, URI> {
  readonly chain: <A, B>(ma: HKT<M, Option<A>>, f: (a: A) => HKT<M, Option<B>>) => HKT<M, Option<B>>
  readonly fold: <A, R>(ma: HKT<M, Option<A>>, onNone: R, onSome: (a: A) => R) => HKT<M, R>
}

interface OptionT1<M extends URIS> extends ApplicativeComposition11<M, URI> {
  readonly chain: <A, B>(ma: Type<M, Option<A>>, f: (a: A) => Type<M, Option<B>>) => Type<M, Option<B>>
  readonly fold: <A, R>(ma: Type<M, Option<A>>, onNone: R, onSome: (a: A) => R) => Type<M, R>
}

interface OptionT2<M extends URIS2> extends ApplicativeComposition21<M, URI> {
  readonly chain: <L, A, B>(ma: Type2<M, L, Option<A>>, f: (a: A) => Type2<M, L, Option<B>>) => Type2<M, L, Option<B>>
  readonly fold: <L, A, R>(ma: Type2<M, L, Option<A>>, onNone: R, onSome: (a: A) => R) => Type2<M, L, R>
}

interface OptionT2C<M extends URIS2, L> extends ApplicativeComposition2C1<M, URI, L> {
  readonly chain: <A, B>(ma: Type2<M, L, Option<A>>, f: (a: A) => Type2<M, L, Option<B>>) => Type2<M, L, Option<B>>
  readonly fold: <A, R>(ma: Type2<M, L, Option<A>>, onNone: R, onSome: (a: A) => R) => Type2<M, L, R>
}

interface OptionT3C<M extends URIS3, U, L> extends ApplicativeComposition3C1<M, URI, U, L> {
  readonly chain: <A, B>(
    ma: Type3<M, U, L, Option<A>>,
    f: (a: A) => Type3<M, U, L, Option<B>>
  ) => Type3<M, U, L, Option<B>>
  readonly fold: <A, R>(ma: Type3<M, U, L, Option<A>>, onNone: R, onSome: (a: A) => R) => Type3<M, U, L, R>
}

/**
 * @since 2.0.0
 */
export function getOptionT<M extends URIS3, U, L>(M: Monad3C<M, U, L>): OptionT3C<M, U, L>
export function getOptionT<M extends URIS2>(M: Monad2<M>): OptionT2<M>
export function getOptionT<M extends URIS2, L>(M: Monad2C<M, L>): OptionT2C<M, L>
export function getOptionT<M extends URIS>(M: Monad1<M>): OptionT1<M>
export function getOptionT<M>(M: Monad<M>): OptionT<M>
export function getOptionT<M>(M: Monad<M>): OptionT<M> {
  const applicativeComposition = getApplicativeComposition(M, option)
  const fnone = M.of(none)

  return {
    ...applicativeComposition,
    chain: (ma, f) => M.chain(ma, o => (isNone(o) ? fnone : f(o.value))),
    fold: (ma, onNone, onSome) => M.map(ma, o => (isNone(o) ? onNone : onSome(o.value)))
  }
}
