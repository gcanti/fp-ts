import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3C,
  ApplicativeComposition,
  ApplicativeComposition11,
  ApplicativeComposition21,
  ApplicativeComposition2C1,
  ApplicativeComposition3C1,
  getApplicativeComposition
} from './Applicative'
import { Functor, Functor1, Functor2, Functor2C, Functor3C } from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3C } from './Monad'
import { Option, URI, none as optionNone, option, some as optionSome } from './Option'

export interface OptionT<M> extends ApplicativeComposition<M, URI> {
  readonly chain: <A, B>(f: (a: A) => HKT<M, Option<B>>, fa: HKT<M, Option<A>>) => HKT<M, Option<B>>
}

export interface OptionT1<M extends URIS> extends ApplicativeComposition11<M, URI> {
  readonly chain: <A, B>(f: (a: A) => Type<M, Option<B>>, fa: Type<M, Option<A>>) => Type<M, Option<B>>
}

export interface OptionT2<M extends URIS2> extends ApplicativeComposition21<M, URI> {
  readonly chain: <L, A, B>(f: (a: A) => Type2<M, L, Option<B>>, fa: Type2<M, L, Option<A>>) => Type2<M, L, Option<B>>
}

export interface OptionT2C<M extends URIS2, L> extends ApplicativeComposition2C1<M, URI, L> {
  readonly chain: <A, B>(f: (a: A) => Type2<M, L, Option<B>>, fa: Type2<M, L, Option<A>>) => Type2<M, L, Option<B>>
}

export interface OptionT3C<M extends URIS3, U, L> extends ApplicativeComposition3C1<M, URI, U, L> {
  readonly chain: <A, B>(
    f: (a: A) => Type3<M, U, L, Option<B>>,
    fa: Type3<M, U, L, Option<A>>
  ) => Type3<M, U, L, Option<B>>
}

/**
 * @function
 * @since 1.0.0
 */
export function chain<F extends URIS3, U, L>(F: Monad3C<F, U, L>): OptionT3C<F, U, L>['chain']
export function chain<F extends URIS2>(F: Monad2<F>): OptionT2<F>['chain']
export function chain<F extends URIS2, L>(F: Monad2C<F, L>): OptionT2C<F, L>['chain']
export function chain<F extends URIS>(F: Monad1<F>): OptionT1<F>['chain']
export function chain<F>(F: Monad<F>): OptionT<F>['chain']
export function chain<F>(F: Monad<F>): OptionT<F>['chain'] {
  return (f, fa) => F.chain(fa, o => (o.isNone() ? F.of(optionNone) : f(o.value)))
}

/**
 * @function
 * @since 1.0.0
 */
export function some<F extends URIS3, U, L>(F: Applicative3C<F, U, L>): <A>(a: A) => Type3<F, U, L, Option<A>>
export function some<F extends URIS2>(F: Applicative2<F>): <L, A>(a: A) => Type2<F, L, Option<A>>
export function some<F extends URIS2, L>(F: Applicative2C<F, L>): <A>(a: A) => Type2<F, L, Option<A>>
export function some<F extends URIS>(F: Applicative1<F>): <A>(a: A) => Type<F, Option<A>>
export function some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>
export function some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>> {
  return a => F.of(optionSome(a))
}

/**
 * @function
 * @since 1.0.0
 */
export function none<F extends URIS3, U, L>(F: Applicative3C<F, U, L>): () => Type3<F, U, L, Option<never>>
export function none<F extends URIS2>(F: Applicative2<F>): <L>() => Type2<F, L, Option<never>>
export function none<F extends URIS2, L>(F: Applicative2C<F, L>): () => Type2<F, L, Option<never>>
export function none<F extends URIS>(F: Applicative1<F>): () => Type<F, Option<never>>
export function none<F>(F: Applicative<F>): () => HKT<F, Option<never>>
export function none<F>(F: Applicative<F>): () => HKT<F, Option<never>> {
  return () => F.of(optionNone)
}

/**
 * @function
 * @since 1.0.0
 */
export function fromOption<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A>(fa: Option<A>) => Type3<F, U, L, Option<A>>
export function fromOption<F extends URIS2>(F: Applicative2<F>): <L, A>(fa: Option<A>) => Type2<F, L, Option<A>>
export function fromOption<F extends URIS2, L>(F: Applicative2C<F, L>): <A>(fa: Option<A>) => Type2<F, L, Option<A>>
export function fromOption<F extends URIS>(F: Applicative1<F>): <A>(fa: Option<A>) => Type<F, Option<A>>
export function fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>
export function fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>> {
  return oa => F.of(oa)
}

/**
 * @function
 * @since 1.0.0
 */
export function liftF<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <A>(fa: Type3<F, U, L, A>) => Type3<F, U, L, Option<A>>
export function liftF<F extends URIS2>(F: Functor2<F>): <L, A>(fa: Type2<F, L, A>) => Type2<F, L, Option<A>>
export function liftF<F extends URIS2, L>(F: Functor2C<F, L>): <A>(fa: Type2<F, L, A>) => Type2<F, L, Option<A>>
export function liftF<F extends URIS>(F: Functor1<F>): <A>(fa: Type<F, A>) => Type<F, Option<A>>
export function liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>
export function liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>> {
  return fa => F.map(fa, a => optionSome(a))
}

/**
 * @function
 * @since 1.0.0
 */
export function fold<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <R, A>(r: R, some: (a: A) => R, fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, R>
export function fold<F extends URIS2>(
  F: Functor2<F>
): <L, R, A>(r: R, some: (a: A) => R, fa: Type2<F, L, Option<A>>) => Type2<F, L, R>
export function fold<F extends URIS2, L>(
  F: Functor2C<F, L>
): <R, A>(r: R, some: (a: A) => R, fa: Type2<F, L, Option<A>>) => Type2<F, L, R>
export function fold<F extends URIS>(
  F: Functor1<F>
): <R, A>(r: R, some: (a: A) => R, fa: Type<F, Option<A>>) => Type<F, R>
export function fold<F>(F: Functor<F>): <R, A>(r: R, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>
export function fold<F>(F: Functor<F>): <R, A>(r: R, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R> {
  return (r, some, fa) => F.map(fa, o => (o.isNone() ? r : some(o.value)))
}

/**
 * @function
 * @since 1.0.0
 */
export function getOrElse<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <A>(a: A) => (fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
export function getOrElse<F extends URIS2>(
  F: Functor2<F>
): <A>(a: A) => <L>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
export function getOrElse<F extends URIS2, L>(
  F: Functor2C<F, L>
): <A>(a: A) => (fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
export function getOrElse<F extends URIS>(F: Functor1<F>): <A>(a: A) => (fa: Type<F, Option<A>>) => Type<F, A>
export function getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A>
export function getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A> {
  return a => fa => F.map(fa, o => o.getOrElse(a))
}

/**
 * @function
 * @since 1.0.0
 */
export function getOptionT<M extends URIS3, U, L>(M: Monad3C<M, U, L>): OptionT3C<M, U, L>
export function getOptionT<M extends URIS2>(M: Monad2<M>): OptionT2<M>
export function getOptionT<M extends URIS2, L>(M: Monad2C<M, L>): OptionT2C<M, L>
export function getOptionT<M extends URIS>(M: Monad1<M>): OptionT1<M>
export function getOptionT<M>(M: Monad<M>): OptionT<M>
export function getOptionT<M>(M: Monad<M>): OptionT<M> {
  const applicativeComposition = getApplicativeComposition(M, option)

  return {
    ...applicativeComposition,
    chain: chain(M)
  }
}
