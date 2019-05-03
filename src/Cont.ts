import { Monad2 } from './Monad'

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
export interface Cont<L, A> {
  (c: (a: A) => L): L
}

/**
 * @since 2.0.0
 */
export const cont: Monad2<URI> = {
  URI,
  map: (ma, f) => c => ma(a => c(f(a))),
  of: a => c => c(a),
  ap: (mab, ma) => c => mab(f => ma(a => c(f(a)))),
  chain: (ma, f) => c => ma(a => f(a)(c))
}
