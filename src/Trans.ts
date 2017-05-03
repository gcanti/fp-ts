import { HKT, HKTS } from './HKT'
import { StaticMonad } from './Monad'

export interface StaticTrans<T extends HKTS> extends StaticMonad<T> {
  liftT<M extends HKTS>(monad: StaticMonad<M>): <A>(fa: HKT<A>[M]) => HKT<A>[T]
}
