import { HKT } from './HKT'
import { Chain, FantasyChain } from './Chain'
import { Either } from './Either'
import { isLeft } from './Either'

export interface ChainRec<F> extends Chain<F> {
  chainRec<A, B>(f: (a: A) => HKT<F, Either<A, B>>, a: A): HKT<F, B>
}

export interface FantasyChainRec<F, A> extends FantasyChain<F, A> {
  chainRec<A, B>(f: (a: A) => HKT<F, Either<A, B>>): HKT<F, B>
}

export const tailRec = <A, B>(f: (a: A) => Either<A, B>, a: A): B => {
  let v = f(a)
  while (isLeft(v)) {
    v = f(v.value)
  }
  return v.value
}
