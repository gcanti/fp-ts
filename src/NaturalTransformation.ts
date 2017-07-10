import { HKT } from './HKT'

export type NaturalTransformation<F, G> = <A>(fa: HKT<F, A>) => HKT<G, A>
