import { HKT, HKTS } from './HKT'
import { Monad } from './Monad'
import { Endomorphism, Kleisli } from './function'

export interface ReaderT<URI extends HKTS, M extends HKTS> extends Monad<URI> {
  run<E, A, U = any, V = any>(e: E, fa: Kleisli<M, E, A, U, V>): HKT<A, U, V>[M]
  ask<E, U = any, V = any>(): Kleisli<M, E, E, U, V>
  asks<E, A, U = any, V = any>(f: (e: E) => A): Kleisli<M, E, A, U, V>
  local<E, A, U = any, V = any>(f: Endomorphism<E>, fa: Kleisli<M, E, A, U, V>): Kleisli<M, E, A, U, V>
}

/** Note: requires an implicit proof that HKT<A, E>[URI] ~ (e: E) => HKT<A>[M] */
export function getReaderT<URI extends HKTS, M extends HKTS>(URI: URI, monad: Monad<M>): ReaderT<URI, M> {
  function of<E, A>(a: A): Kleisli<M, E, A> {
    return () => monad.of(a)
  }

  function map<E, A, B>(f: (a: A) => B, fa: Kleisli<M, E, A>): Kleisli<M, E, B> {
    return e => monad.map(f, fa(e))
  }

  function ap<E, A, B>(fab: Kleisli<M, E, (a: A) => B>, fa: Kleisli<M, E, A>): Kleisli<M, E, B> {
    return e => monad.ap<A, B>(fab(e), fa(e))
  }

  function chain<E, A, B>(f: (a: A) => Kleisli<M, E, B>, fa: Kleisli<M, E, A>): Kleisli<M, E, B> {
    return e => monad.chain<A, B>(a => f(a)(e), fa(e))
  }

  function run<E, A>(e: E, fa: Kleisli<M, E, A>): HKT<A>[M] {
    return fa(e)
  }

  function ask<E>(): Kleisli<M, E, E> {
    return e => monad.of(e)
  }

  function asks<E, A>(f: (e: E) => A): Kleisli<M, E, A> {
    return e => monad.of(f(e))
  }

  function local<E, A>(f: Endomorphism<E>, fa: Kleisli<M, E, A>): Kleisli<M, E, A> {
    return e => fa(f(e))
  }

  return {
    URI,
    of,
    map,
    ap: ap as any,
    chain,
    run,
    ask,
    asks,
    local
  }
}
