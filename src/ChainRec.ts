import { HKT, HKTS } from './HKT'
import { StaticChain, FantasyChain } from './Chain'
import { Either, Right } from './Either'
import { isLeft } from './Either'

export interface StaticChainRec<F extends HKTS> extends StaticChain<F> {
  chainRec<A, B>(f: (a: A) => HKT<Either<A, B>>[F], a: A): HKT<B>[F]
}

export interface FantasyChainRec<F extends HKTS, A> extends FantasyChain<F, A> {
  chainRec<A, B>(f: (a: A) => HKT<Either<A, B>>[F]): HKT<B>[F]
}

export function tailRec<A, B>(f: (a: A) => Either<A, B>, a: A): B {
  let v = f(a)
  while (isLeft(v)) {
    v = f(v.value)
  }
  return (v as Right<A, B>).value
}
