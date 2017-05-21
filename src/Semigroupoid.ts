import { HKT, HKTS } from './HKT'

export interface StaticSemigroupoid<F extends HKTS> {
  compose<A, B, C>(bc: HKT<C, B>[F], ab: HKT<B, A>[F]): HKT<C, A>[F]
}
