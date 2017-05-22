import { HKT, HKTS } from './HKT'
import { StaticMonad } from './Monad'
import { Reader } from './Reader'
import * as reader from './Reader'
import { Endomorphism } from './function'

export interface StaticReaderT<M extends HKTS> {
  of<E, A, U = any, V = any>(a: A): Reader<E, HKT<A, U, V>[M]>
  map<E, A, B, U = any, V = any>(f: (a: A) => B, fa: Reader<E, HKT<A, U, V>[M]>): Reader<E, HKT<B, U, V>[M]>
  ap<E, A, B, U = any, V = any>(fab: Reader<E, HKT<(a: A) => B, U, V>[M]>, fa: Reader<E, HKT<A, U, V>[M]>): Reader<E, HKT<B, U, V>[M]>
  chain<E, A, B, U = any, V = any>(f: (a: A) => Reader<E, HKT<B, U, V>[M]>, fa: Reader<E, HKT<A, U, V>[M]>): Reader<E, HKT<B, U, V>[M]>
  ask<E, U = any, V = any>(): Reader<E, HKT<E, U, V>[M]>
  asks<E, A, U = any, V = any>(f: (e: E) => A): Reader<E, HKT<A, U, V>[M]>
  local<E, A, U = any, V = any>(f: Endomorphism<E>, fa: Reader<E, HKT<A, U, V>[M]>): Reader<E, HKT<A, U, V>[M]>
}

export function getStaticReaderT<M extends HKTS>(monad: StaticMonad<M>): StaticReaderT<M> {
  function of<E, A>(a: A): Reader<E, HKT<A>[M]> {
    return reader.of<E, HKT<A>[M]>(monad.of(a))
  }

  function map<E, A, B>(f: (a: A) => B, fa: Reader<E, HKT<A>[M]>): Reader<E, HKT<B>[M]> {
    return fa.map(ma => monad.map(f, ma))
  }

  function ap<E, A, B>(fab: Reader<E, HKT<(a: A) => B>[M]>, fa: Reader<E, HKT<A>[M]>): Reader<E, HKT<B>[M]> {
    return chain<E, (a: A) => B, B>(f => map(f, fa), fab) // <- derived
  }

  function chain<E, A, B>(f: (a: A) => Reader<E, HKT<B>[M]>, fa: Reader<E, HKT<A>[M]>): Reader<E, HKT<B>[M]> {
    return new reader.Reader((e: E) => monad.chain<A, B>(a => f(a).run(e), fa.run(e)))
  }

  function ask<E>(): Reader<E, HKT<E>[M]> {
    return reader.ask<E>().map(e => monad.of(e))
  }

  function asks<E, A>(f: (e: E) => A): Reader<E, HKT<A>[M]> {
    return reader.asks(f).map(a => monad.of(a))
  }

  function local<E, A>(f: Endomorphism<E>, fa: Reader<E, HKT<A>[M]>): Reader<E, HKT<A>[M]> {
    return reader.local(f, fa)
  }

  return {
    of,
    map,
    ap,
    chain,
    ask,
    asks,
    local
  }
}
