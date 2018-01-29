import { HKT } from './HKT'
import { Chain } from './Chain'
import { Either } from './Either'

/** @typeclass */
export interface ChainRec<F> extends Chain<F> {
  chainRec<A, B>(a: A, f: (a: A) => HKT<F, Either<A, B>>): HKT<F, B>
}

/** @function */
export const tailRec = <A, B>(f: (a: A) => Either<A, B>, a: A): B => {
  let v = f(a)
  while (v.isLeft()) {
    v = f(v.value)
  }
  return v.value
}
