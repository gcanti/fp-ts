import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
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
import { Lazy } from './function'

export interface OptionT<M> extends ApplicativeComposition<M, OptionURI> {
  chain<A, B>(f: (a: A) => HKT<M, Option<B>>, fa: HKT<M, Option<A>>): HKT<M, Option<B>>
}

export interface OptionT1<M extends HKTS> extends ApplicativeComposition11<M, OptionURI> {
  chain<A, B>(f: (a: A) => HKTAs<M, Option<B>>, fa: HKTAs<M, Option<A>>): HKTAs<M, Option<B>>
}

export interface OptionT2<M extends HKT2S> extends ApplicativeComposition21<M, OptionURI> {
  chain<L, A, B>(f: (a: A) => HKT2As<M, L, Option<B>>, fa: HKT2As<M, L, Option<A>>): HKT2As<M, L, Option<B>>
}

export class Ops {
  chain<F extends HKT2S>(F: Monad<F>): OptionT2<F>['chain']
  chain<F extends HKTS>(F: Monad<F>): OptionT1<F>['chain']
  chain<F>(F: Monad<F>): OptionT<F>['chain']
  chain<F>(F: Monad<F>): OptionT<F>['chain'] {
    return (f, fa) => F.chain(o => o.fold(() => F.of(option.none), a => f(a)), fa)
  }

  some<F extends HKT2S>(F: Applicative<F>): <L, A>(a: A) => HKT2As<F, L, Option<A>>
  some<F extends HKTS>(F: Applicative<F>): <A>(a: A) => HKTAs<F, Option<A>>
  some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>
  some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>> {
    return a => F.of(option.some(a))
  }

  none<F extends HKT2S>(F: Applicative<F>): <L>() => HKT2As<F, L, Option<any>>
  none<F extends HKTS>(F: Applicative<F>): () => HKTAs<F, Option<any>>
  none<F>(F: Applicative<F>): () => HKT<F, Option<any>>
  none<F>(F: Applicative<F>): () => HKT<F, Option<any>> {
    return () => F.of(option.none)
  }

  fromOption<F extends HKT2S>(F: Applicative<F>): <L, A>(fa: Option<A>) => HKT2As<F, L, Option<A>>
  fromOption<F extends HKTS>(F: Applicative<F>): <A>(fa: Option<A>) => HKTAs<F, Option<A>>
  fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>
  fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>> {
    return oa => F.of(oa)
  }

  liftF<F extends HKT2S>(F: Functor<F>): <L, A>(fa: HKT2As<F, L, A>) => HKT2As<F, L, Option<A>>
  liftF<F extends HKTS>(F: Functor<F>): <A>(fa: HKTAs<F, A>) => HKTAs<F, Option<A>>
  liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>
  liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>> {
    return fa => F.map(a => option.some(a), fa)
  }

  fold<F extends HKT2S>(
    F: Functor<F>
  ): <L, R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKT2As<F, L, Option<A>>) => HKT2As<F, L, R>
  fold<F extends HKTS>(F: Functor<F>): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKTAs<F, Option<A>>) => HKTAs<F, R>
  fold<F>(F: Functor<F>): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>
  fold<F>(F: Functor<F>): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R> {
    return (none, some, fa) => F.map(o => o.fold(none, some), fa)
  }

  getOrElse<F extends HKT2S>(F: Functor<F>): <A>(f: Lazy<A>) => <L>(fa: HKT2As<F, L, Option<A>>) => HKT2As<F, L, A>
  getOrElse<F extends HKTS>(F: Functor<F>): <A>(f: Lazy<A>) => (fa: HKTAs<F, Option<A>>) => HKTAs<F, A>
  getOrElse<F>(F: Functor<F>): <A>(f: Lazy<A>) => (fa: HKT<F, Option<A>>) => HKT<F, A>
  getOrElse<F>(F: Functor<F>): <A>(f: Lazy<A>) => (fa: HKT<F, Option<A>>) => HKT<F, A> {
    return f => fa => F.map(o => o.getOrElse(f), fa)
  }

  getOptionT<M extends HKT2S>(M: Monad<M>): OptionT2<M>
  getOptionT<M extends HKTS>(M: Monad<M>): OptionT1<M>
  getOptionT<M>(M: Monad<M>): OptionT<M>
  getOptionT<M>(M: Monad<M>): OptionT<M> {
    const applicativeComposition = getApplicativeComposition(M, option)

    return {
      ...applicativeComposition,
      chain: this.chain(M)
    }
  }
}

const ops = new Ops()
export const chain: Ops['chain'] = ops.chain
export const none: Ops['none'] = ops.none
export const some: Ops['some'] = ops.some
export const fromOption: Ops['fromOption'] = ops.fromOption
export const liftF: Ops['liftF'] = ops.liftF
export const fold: Ops['fold'] = ops.fold
export const getOrElse: Ops['getOrElse'] = ops.getOrElse
export const getOptionT: Ops['getOptionT'] = ops.getOptionT
