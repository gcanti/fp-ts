import { HKT2, HKT2S } from './HKT'

export interface StaticSemigroupoid<F extends HKT2S> {
  compose<A, B, C>(bc: HKT2<B, C>[F], ab: HKT2<A, B>[F]): HKT2<A, C>[F]
}
