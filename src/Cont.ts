import { getContM } from './ContT'
import { identity } from './Identity'
import { Monad2 } from './Monad'

const T = getContM(identity)

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Cont: Cont<L, A>
  }
}

export const URI = 'Cont'

export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface Cont<R, A> {
  (c: (a: A) => R): R
}

/**
 * @since 2.0.0
 */
export const cont: Monad2<URI> = {
  URI,
  map: T.map,
  of: T.of,
  ap: T.ap,
  chain: T.chain
}
