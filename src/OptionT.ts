import { HKT, HKTS } from './HKT'
import { Monad } from './Monad'
import { getCompositionApplicative } from './Applicative'
import { Option } from './Option'
import * as option from './Option'
import { Lazy } from './function'

export interface OptionT<URI extends HKTS, M extends HKTS> extends Monad<URI> {
  some<A, U = any, V = any>(a: A): HKT<Option<A>, U, V>[M]
  none<U = any, V = any>(): HKT<Option<any>, U, V>[M]
  fromOption<A, U = any, V = any>(oa: Option<A>): HKT<Option<A>, U, V>[M]
  liftT<A, U = any, V = any>(ma: HKT<A, U, V>[M]): HKT<Option<A>, U, V>[M]
  fold<R, A, U = any, V = any>(none: Lazy<R>, some: (a: A) => R, fa: HKT<Option<A>, U, V>[M]): HKT<R, U, V>[M]
  getOrElse<A, U = any, V = any>(f: Lazy<A>, fa: HKT<Option<A>, U, V>[M]): HKT<A, U, V>[M]
}

/** Note: requires an implicit proof that HKT<A>[URI] ~ HKT<Option<A>>[M] */
export function getOptionT<URI extends HKTS, M extends HKTS>(URI: URI, monad: Monad<M>): OptionT<URI, M> {
  const applicative = getCompositionApplicative(URI, monad, option)

  function chain<A, B>(f: (a: A) => HKT<Option<B>>[M], fa: HKT<Option<A>>[M]): HKT<Option<B>>[M] {
    return monad.chain<Option<A>, Option<B>>(e => e.fold<HKT<Option<B>>[M]>(() => fa as any, a => f(a)), fa)
  }

  function none(): HKT<Option<any>>[M] {
    return monad.of(option.none)
  }

  function fromOption<A>(oa: Option<A>): HKT<Option<A>>[M] {
    return monad.of(oa)
  }

  function liftT<A>(ma: HKT<A>[M]): HKT<Option<A>>[M] {
    return monad.map<A, Option<A>>(option.some, ma)
  }

  function fold<R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKT<Option<A>>[M]): HKT<R>[M] {
    return monad.map<Option<A>, R>(o => o.fold(none, some), fa)
  }

  function getOrElse<A>(f: Lazy<A>, fa: HKT<Option<A>>[M]): HKT<A>[M] {
    return monad.map<Option<A>, A>(o => o.getOrElse(f), fa)
  }

  return {
    ...applicative,
    chain,
    some: applicative.of,
    none,
    fromOption,
    liftT,
    fold,
    getOrElse
  }
}
