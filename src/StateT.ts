import { HKT, HKTS } from './HKT'
import { Monad } from './Monad'
import { Kleisli, Endomorphism } from './function'

export interface StateT<URI extends HKTS, M extends HKTS> extends Monad<URI> {
  run<S, A, U = any, V = any>(s: S, fa: Kleisli<M, S, [A, S], U, V>): HKT<[A, S], U, V>[M]
  eval<S, A, U = any, V = any>(s: S, fa: Kleisli<M, S, [A, S], U, V>): HKT<A, U, V>[M]
  exec<S, A, U = any, V = any>(s: S, fa: Kleisli<M, S, [A, S], U, V>): HKT<S, U, V>[M]
  get<S, U = any, V = any>(): Kleisli<M, S, [S, S], U, V>
  put<S, U = any, V = any>(s: S): Kleisli<M, S, [void, S], U, V>
  modify<S, U = any, V = any>(f: Endomorphism<S>): Kleisli<M, S, [void, S], U, V>
  gets<S, A, U = any, V = any>(f: (s: S) => A): Kleisli<M, S, [A, S], U, V>
}

/** Note: requires an implicit proof that HKT<A, S>[URI] ~ (s: S) => HKT<[A, S]>[M] */
export function getStateT<URI extends HKTS, M extends HKTS>(URI: URI, monad: Monad<M>): StateT<URI, M> {
  function of<S, A>(a: A): Kleisli<M, S, [A, S]> {
    return s => monad.of<[A, S]>([a, s])
  }

  function map<S, A, B>(f: (a: A) => B, fa: Kleisli<M, S, [A, S]>): Kleisli<M, S, [B, S]> {
    return s => monad.map<[A, S], [B, S]>(([a, s1]) => [f(a), s1], fa(s))
  }

  function ap<S, A, B>(fab: Kleisli<M, S, [(a: A) => B, S]>, fa: Kleisli<M, S, [A, S]>): Kleisli<M, S, [B, S]> {
    return chain<S, (a: A) => B, B>(f => map(f, fa), fab) // <- derived
  }

  function chain<S, A, B>(f: (a: A) => Kleisli<M, S, [B, S]>, fa: Kleisli<M, S, [A, S]>): Kleisli<M, S, [B, S]> {
    return s => monad.chain<[A, S], [B, S]>(([a, s1]) => f(a)(s1), fa(s))
  }

  function run<S, A>(s: S, fa: Kleisli<M, S, [A, S]>): HKT<[A, S]>[M] {
    return fa(s)
  }

  function eval_<S, A>(s: S, fa: Kleisli<M, S, [A, S]>): HKT<A>[M] {
    return monad.map(([a, _]) => a, fa(s))
  }

  function exec<S, A>(s: S, fa: Kleisli<M, S, [A, S]>): HKT<S>[M] {
    return monad.map(([_, s]) => s, fa(s))
  }

  function get<S>(): Kleisli<M, S, [S, S]> {
    return s => monad.of<[S, S]>([s, s])
  }

  function put<S>(s: S): Kleisli<M, S, [void, S]> {
    return () => monad.of<[void, S]>([undefined, s])
  }

  function modify<S>(f: Endomorphism<S>): Kleisli<M, S, [void, S]> {
    return s => monad.of<[void, S]>([undefined, f(s)])
  }

  function gets<S, A>(f: (s: S) => A): Kleisli<M, S, [A, S]> {
    return s => monad.of<[A, S]>([f(s), s])
  }

  return {
    URI,
    of,
    map,
    ap: ap as any,
    chain,
    run,
    eval: eval_,
    exec,
    get,
    put,
    modify,
    gets
  }
}
