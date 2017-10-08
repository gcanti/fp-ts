import { HKT } from './HKT'

export interface Invariant<F> {
  readonly URI: F
  imap<A, B>(f: (a: A) => B, g: (b: B) => A, fa: HKT<F, A>): HKT<F, B>
}
