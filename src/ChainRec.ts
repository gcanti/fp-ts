import { HKT, HKTS } from './HKT'
import { Chain, FantasyChain } from './Chain'
import { Either, Right } from './Either'
import { isLeft } from './Either'

export interface ChainRec<F extends HKTS> extends Chain<F> {
  chainRec<A, B, U = any, V = any>(f: (a: A) => HKT<Either<A, B>, U, V>[F], a: A): HKT<B, U, V>[F]
}

export interface FantasyChainRec<F extends HKTS, A> extends FantasyChain<F, A> {
  chainRec<A, B, U = any, V = any>(f: (a: A) => HKT<Either<A, B>, U, V>[F]): HKT<B, U, V>[F]
}

export function tailRec<A, B>(f: (a: A) => Either<A, B>, a: A): B {
  let v = f(a)
  while (isLeft(v)) {
    v = f(v.value)
  }
  return (v as Right<A, B>).value
}
