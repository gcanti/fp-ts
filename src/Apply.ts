import { HKT, HKTS, HKT2S, URI2HKT, URI2HKT2 } from './HKT'
import { Functor, FantasyFunctor } from './Functor'
import { Curried2, Curried3, Curried4, identity, constant } from './function'

export interface Apply<F> extends Functor<F> {
  ap<A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>): HKT<F, B>
}

/*

  Implementations of FantasyApply may choose to also implement

  ap_<B, C>(this: HKT<F, (a: A) => B>, fb: HKT<F, B>): HKT<F, C>

*/
export interface FantasyApply<F, A> extends FantasyFunctor<F, A> {
  ap<B>(fab: HKT<F, (a: A) => B>): HKT<F, B>
}

const constIdentity = () => identity

export class Ops {
  applyFirst<F extends HKT2S>(
    apply: Apply<F>
  ): <L, A, B>(fa: URI2HKT2<L, A>[F], fb: URI2HKT2<L, B>[F]) => URI2HKT2<L, A>[F]
  applyFirst<F extends HKTS>(apply: Apply<F>): <A, B>(fa: URI2HKT<A>[F], fb: URI2HKT<B>[F]) => URI2HKT<A>[F]
  applyFirst<F>(apply: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, A>
  applyFirst<F>(apply: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, A> {
    return (fa, fb) => apply.ap(apply.map(a => constant(a), fa), fb)
  }

  applySecond<F extends HKT2S>(
    apply: Apply<F>
  ): <L, A, B>(fa: URI2HKT2<L, A>[F], fb: URI2HKT2<L, B>[F]) => URI2HKT2<L, B>[F]
  applySecond<F extends HKTS>(apply: Apply<F>): <A, B>(fa: URI2HKT<A>[F], fb: URI2HKT<B>[F]) => URI2HKT<B>[F]
  applySecond<F>(apply: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, B>
  applySecond<F>(apply: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, B> {
    return <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => apply.ap(apply.map(constIdentity, fa), fb)
  }

  liftA2<F extends HKT2S, A, B, C>(
    apply: Apply<F>,
    f: Curried2<A, B, C>
  ): <L>(fa: URI2HKT2<L, A>[F], fb: URI2HKT2<L, B>[F]) => URI2HKT2<L, C>[F]
  liftA2<F extends HKTS, A, B, C>(
    apply: Apply<F>,
    f: Curried2<A, B, C>
  ): (fa: URI2HKT<A>[F], fb: URI2HKT<B>[F]) => URI2HKT<C>[F]
  liftA2<F, A, B, C>(apply: Apply<F>, f: Curried2<A, B, C>): (fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, C>
  liftA2<F, A, B, C>(apply: Apply<F>, f: Curried2<A, B, C>): (fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, C> {
    return (fa, fb) => apply.ap(apply.map(f, fa), fb)
  }

  liftA3<F extends HKT2S, A, B, C, D>(
    apply: Apply<F>,
    f: Curried3<A, B, C, D>
  ): <L>(fa: URI2HKT2<L, A>[F], fb: URI2HKT2<L, B>[F], fc: URI2HKT2<L, C>[F]) => URI2HKT2<L, D>[F]
  liftA3<F extends HKTS, A, B, C, D>(
    apply: Apply<F>,
    f: Curried3<A, B, C, D>
  ): (fa: URI2HKT<A>[F], fb: URI2HKT<B>[F], fc: URI2HKT<C>[F]) => URI2HKT<D>[F]
  liftA3<F, A, B, C, D>(
    apply: Apply<F>,
    f: Curried3<A, B, C, D>
  ): (fa: HKT<F, A>, fb: HKT<F, B>, fc: HKT<F, C>) => HKT<F, D>
  liftA3<F, A, B, C, D>(
    apply: Apply<F>,
    f: Curried3<A, B, C, D>
  ): (fa: HKT<F, A>, fb: HKT<F, B>, fc: HKT<F, C>) => HKT<F, D> {
    return (fa, fb, fc) => apply.ap(apply.ap(apply.map(f, fa), fb), fc)
  }

  liftA4<F extends HKT2S, A, B, C, D, E>(
    apply: Apply<F>,
    f: Curried4<A, B, C, D, E>
  ): <L>(
    fa: URI2HKT2<L, A>[F],
    fb: URI2HKT2<L, B>[F],
    fc: URI2HKT2<L, C>[F],
    fd: URI2HKT2<L, D>[F]
  ) => URI2HKT2<L, E>[F]
  liftA4<F extends HKTS, A, B, C, D, E>(
    apply: Apply<F>,
    f: Curried4<A, B, C, D, E>
  ): (fa: URI2HKT<A>[F], fb: URI2HKT<B>[F], fc: URI2HKT<C>[F], fd: URI2HKT<D>[F]) => URI2HKT<E>[F]
  liftA4<F, A, B, C, D, E>(
    apply: Apply<F>,
    f: Curried4<A, B, C, D, E>
  ): (fa: HKT<F, A>, fb: HKT<F, B>, fc: HKT<F, C>, fd: HKT<F, D>) => HKT<F, E>
  liftA4<F, A, B, C, D, E>(
    apply: Apply<F>,
    f: Curried4<A, B, C, D, E>
  ): (fa: HKT<F, A>, fb: HKT<F, B>, fc: HKT<F, C>, fd: HKT<F, D>) => HKT<F, E> {
    return (fa, fb, fc, fd) => apply.ap(apply.ap(apply.ap(apply.map(f, fa), fb), fc), fd)
  }
}

const ops = new Ops()
export const applyFirst: Ops['applyFirst'] = ops.applyFirst
export const applySecond: Ops['applySecond'] = ops.applySecond
export const liftA2: Ops['liftA2'] = ops.liftA2
export const liftA3: Ops['liftA3'] = ops.liftA3
export const liftA4: Ops['liftA4'] = ops.liftA4
