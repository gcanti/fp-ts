import { HKT, HKTS, URI2HKT } from './HKT'
import { Functor } from './Functor'
import { Monad } from './Monad'
import { Chain } from './Chain'
import { Applicative, getApplicativeComposition, ApplicativeComposition, ApplicativeComposition11 } from './Applicative'
import { Option, URI as OptionURI } from './Option'
import * as option from './Option'
import { Lazy } from './function'

export interface OptionT<M> extends ApplicativeComposition<M, OptionURI> {
  chain<A, B>(f: (a: A) => HKT<M, Option<B>>, fa: HKT<M, Option<A>>): HKT<M, Option<B>>
}

export interface OptionT1<M extends HKTS> extends ApplicativeComposition11<M, OptionURI> {
  chain<A, B>(f: (a: A) => URI2HKT<Option<B>>[M], fa: URI2HKT<Option<A>>[M]): URI2HKT<Option<B>>[M]
}

export class Ops {
  chain<F extends HKTS>(F: Chain<F>): OptionT1<F>['chain']
  chain<F>(F: Chain<F>): OptionT<F>['chain']
  chain<F>(F: Chain<F>): OptionT<F>['chain'] {
    return (f, fa) => F.chain(o => o.fold(() => fa as any, a => f(a)), fa)
  }

  some<F extends HKTS>(F: Applicative<F>): <A>(a: A) => URI2HKT<Option<A>>[F]
  some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>
  some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>> {
    return a => F.of(option.some(a))
  }

  none<F extends HKTS>(F: Applicative<F>): () => URI2HKT<Option<any>>[F]
  none<F>(F: Applicative<F>): () => HKT<F, Option<any>>
  none<F>(F: Applicative<F>): () => HKT<F, Option<any>> {
    return () => F.of(option.none)
  }

  fromOption<F extends HKTS>(F: Applicative<F>): <A>(fa: Option<A>) => URI2HKT<Option<A>>[F]
  fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>
  fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>> {
    return oa => F.of(oa)
  }

  liftF<F extends HKTS>(F: Functor<F>): <A>(fa: URI2HKT<A>[F]) => URI2HKT<Option<A>>[F]
  liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>
  liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>> {
    return fa => F.map(a => option.some(a), fa)
  }

  fold<F extends HKTS>(
    F: Functor<F>
  ): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: URI2HKT<Option<A>>[F]) => URI2HKT<R>[F]
  fold<F>(F: Functor<F>): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>
  fold<F>(F: Functor<F>): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R> {
    return (none, some, fa) => F.map(o => o.fold(none, some), fa)
  }

  getOrElse<F extends HKTS>(F: Functor<F>): <A>(f: Lazy<A>, fa: URI2HKT<Option<A>>[F]) => URI2HKT<A>[F]
  getOrElse<F>(F: Functor<F>): <A>(f: Lazy<A>, fa: HKT<F, Option<A>>) => HKT<F, A>
  getOrElse<F>(F: Functor<F>): <A>(f: Lazy<A>, fa: HKT<F, Option<A>>) => HKT<F, A> {
    return (f, fa) => F.map(o => o.getOrElse(f), fa)
  }

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
