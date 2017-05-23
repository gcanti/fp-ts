import { HKT, HKTS } from './HKT'

export interface StaticSemigroupoid<F extends HKTS> {
  compose<A, B, C, V = any>(bc: HKT<C, B, V>[F], ab: HKT<B, A, V>[F]): HKT<C, A, V>[F]
}
