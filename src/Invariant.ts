import { HKT } from './HKT'

/** @typeclass */
export interface Invariant<F> {
  readonly URI: F
  imap<A, B>(fa: HKT<F, A>, f: (a: A) => B, g: (b: B) => A): HKT<F, B>
}
