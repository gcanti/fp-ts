import { HKT, HKTS } from './HKT'

export type NaturalTransformation<F extends HKTS, G extends HKTS> = <A>(fa: HKT<A>[F]) => HKT<A>[G]
