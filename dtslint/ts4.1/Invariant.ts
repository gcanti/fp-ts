import { HKT } from '../../src/HKT'
import { Invariant } from '../../src/Invariant'

export interface Inv<A> {
  (a: A): [A, A]
}

export interface InvF extends HKT {
  readonly type: Inv<this['Invariant1']>
}

const Invariant: Invariant<InvF> = {
  imap: (f, g) => (fa) => (b) => {
    const [a1, a2] = fa(g(b))
    return [f(a1), f(a2)]
  }
}
