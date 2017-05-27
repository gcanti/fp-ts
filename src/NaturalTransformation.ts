import { HKT, HKTS } from './HKT'

export type NaturalTransformation<F extends HKTS, G extends HKTS> = <A, U = any, V = any>(fa: HKT<A, U, V>[F]) => HKT<A, U, V>[G]
