import { HKT } from './HKT'
import { Chain } from './Chain'
import { Either, Right } from './Either'
import { isLeft } from './Either'

export interface ChainRec<M> extends Chain<M> {
  chainRec<A, B>(f: (a: A) => HKT<M, Either<A, B>>, a: A): B;
}

export function tailRec<A, B>(f: (a: A) => Either<A, B>, a: A): B {
  let v = f(a)
  while (isLeft(v)) {
    v = f(v.value)
  }
  return (v as Right<A, B>).value
}
