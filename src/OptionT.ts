import { HKT, HKT2, URIS, URIS2, Type, Type2 } from './HKT'
import { Functor } from './Functor'
import { Monad } from './Monad'
import {
  Applicative,
  getApplicativeComposition,
  ApplicativeComposition,
  ApplicativeComposition11,
  ApplicativeComposition21
} from './Applicative'
import { Option, URI as OptionURI } from './Option'
import * as option from './Option'

export interface OptionT<M> extends ApplicativeComposition<M, OptionURI> {
  chain<A, B>(f: (a: A) => HKT<M, Option<B>>, fa: HKT<M, Option<A>>): HKT<M, Option<B>>
}

export interface OptionT1<M extends URIS> extends ApplicativeComposition11<M, OptionURI> {
  chain<A, B>(f: (a: A) => HKT<M, Option<B>>, fa: HKT<M, Option<A>>): Type<M, Option<B>>
}

export interface OptionT2<M extends URIS2> extends ApplicativeComposition21<M, OptionURI> {
  chain<L, A, B>(f: (a: A) => HKT2<M, L, Option<B>>, fa: HKT2<M, L, Option<A>>): Type2<M, L, Option<B>>
}

export function chain<F extends URIS2>(F: Monad<F>): OptionT2<F>['chain']
export function chain<F extends URIS>(F: Monad<F>): OptionT1<F>['chain']
export function chain<F>(F: Monad<F>): OptionT<F>['chain']
/** @function */
export function chain<F>(F: Monad<F>): OptionT<F>['chain'] {
  return (f, fa) => F.chain(fa, o => o.fold(F.of(option.none), a => f(a)))
}

export function some<F extends URIS2>(F: Applicative<F>): <L, A>(a: A) => Type2<F, L, Option<A>>
export function some<F extends URIS>(F: Applicative<F>): <A>(a: A) => Type<F, Option<A>>
export function some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>
/** @function */
export function some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>> {
  return a => F.of(option.some(a))
}

export function none<F extends URIS2>(F: Applicative<F>): <L>() => Type2<F, L, Option<never>>
export function none<F extends URIS>(F: Applicative<F>): () => Type<F, Option<never>>
export function none<F>(F: Applicative<F>): () => HKT<F, Option<never>>
/** @function */
export function none<F>(F: Applicative<F>): () => HKT<F, Option<never>> {
  return () => F.of(option.none)
}

export function fromOption<F extends URIS2>(F: Applicative<F>): <L, A>(fa: Option<A>) => Type2<F, L, Option<A>>
export function fromOption<F extends URIS>(F: Applicative<F>): <A>(fa: Option<A>) => Type<F, Option<A>>
export function fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>
/** @function */
export function fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>> {
  return oa => F.of(oa)
}

export function liftF<F extends URIS2>(F: Functor<F>): <L, A>(fa: HKT2<F, L, A>) => Type2<F, L, Option<A>>
export function liftF<F extends URIS>(F: Functor<F>): <A>(fa: HKT<F, A>) => Type<F, Option<A>>
export function liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>
/** @function */
export function liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>> {
  return fa => F.map(fa, a => option.some(a))
}

export function fold<F extends URIS2>(
  F: Functor<F>
): <L, R, A>(r: R, some: (a: A) => R, fa: HKT2<F, L, Option<A>>) => Type2<F, L, R>
export function fold<F extends URIS>(
  F: Functor<F>
): <R, A>(r: R, some: (a: A) => R, fa: HKT<F, Option<A>>) => Type<F, R>
export function fold<F>(F: Functor<F>): <R, A>(r: R, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>
/** @function */
export function fold<F>(F: Functor<F>): <R, A>(r: R, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R> {
  return (r, some, fa) => F.map(fa, o => o.fold(r, some))
}

export function getOrElse<F extends URIS2>(F: Functor<F>): <A>(a: A) => <L>(fa: HKT2<F, L, Option<A>>) => Type2<F, L, A>
export function getOrElse<F extends URIS>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => Type<F, A>
export function getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A>
/** @function */
export function getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A> {
  return a => fa => F.map(fa, o => o.getOrElse(a))
}

export function getOptionT<M extends URIS2>(M: Monad<M>): OptionT2<M>
export function getOptionT<M extends URIS>(M: Monad<M>): OptionT1<M>
export function getOptionT<M>(M: Monad<M>): OptionT<M>
/** @function */
export function getOptionT<M>(M: Monad<M>): OptionT<M> {
  const applicativeComposition = getApplicativeComposition(M, option.option)

  return {
    ...applicativeComposition,
    chain: chain(M)
  }
}
