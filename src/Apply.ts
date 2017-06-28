import { HKT, HKTS } from './HKT'
import { Functor, FantasyFunctor } from './Functor'
import { Curried2, Curried3, Curried4, identity, constant } from './function'

export interface Apply<F extends HKTS> extends Functor<F> {
  ap<A, B, U = any, V = any>(fab: HKT<(a: A) => B, U, V>[F], fa: HKT<A, U, V>[F]): HKT<B, U, V>[F]
}

/*

  Implementations of FantasyApply may choose to also implement

  ap_<B, C, U = any, V = any>(this: HKT<(a: A) => B, U, V>[F], fb: HKT<B, U, V>[F]): HKT<C, U, V>[F]

*/
export interface FantasyApply<F extends HKTS, A> extends FantasyFunctor<F, A> {
  ap<B, U = any, V = any>(fab: HKT<(a: A) => B, U, V>[F]): HKT<B, U, V>[F]
}

const constIdentity = () => identity

export function applyFirst<F extends HKTS>(
  apply: Apply<F>
): <A, B, U = any, V = any>(fa: HKT<A, U, V>[F], fb: HKT<B, U, V>[F]) => HKT<A, U, V>[F] {
  return <A, B>(fa: HKT<A>[F], fb: HKT<B>[F]) => apply.ap(apply.map(constant, fa), fb)
}

export function applySecond<F extends HKTS>(
  apply: Apply<F>
): <A, B, U = any, V = any>(fa: HKT<A, U, V>[F], fb: HKT<B, U, V>[F]) => HKT<B, U, V>[F] {
  return <A, B>(fa: HKT<A>[F], fb: HKT<B>[F]) => apply.ap(apply.map(constIdentity, fa), fb)
}

export function liftA2<F extends HKTS, A, B, C>(
  apply: Apply<F>,
  f: Curried2<A, B, C>
): <U = any, V = any>(fa: HKT<A, U, V>[F], fb: HKT<B, U, V>[F]) => HKT<C, U, V>[F] {
  return (fa: HKT<A>[F], fb: HKT<B>[F]) => apply.ap<B, C>(apply.map<A, (b: B) => C>(f, fa), fb)
}

export function liftA3<F extends HKTS, A, B, C, D>(
  apply: Apply<F>,
  f: Curried3<A, B, C, D>
): <U = any, V = any>(fa: HKT<A, U, V>[F], fb: HKT<B, U, V>[F], fc: HKT<C, U, V>[F]) => HKT<D, U, V>[F] {
  return (fa: HKT<A>[F], fb: HKT<B>[F], fc: HKT<C>[F]) =>
    apply.ap<C, D>(apply.ap<B, (c: C) => D>(apply.map<A, Curried2<B, C, D>>(f, fa), fb), fc)
}

export function liftA4<F extends HKTS, A, B, C, D, E>(
  apply: Apply<F>,
  f: Curried4<A, B, C, D, E>
): <U = any, V = any>(
  fa: HKT<A, U, V>[F],
  fb: HKT<B, U, V>[F],
  fc: HKT<C, U, V>[F],
  fd: HKT<D, U, V>[F]
) => HKT<E, U, V>[F] {
  return (fa: HKT<A>[F], fb: HKT<B>[F], fc: HKT<C>[F], fd: HKT<D>[F]) =>
    apply.ap<D, E>(
      apply.ap<C, (d: D) => E>(apply.ap<B, Curried2<C, D, E>>(apply.map<A, Curried3<B, C, D, E>>(f, fa), fb), fc),
      fd
    )
}
