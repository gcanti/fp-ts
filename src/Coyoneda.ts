import { Functor2 } from './Functor'
import { HKT } from './HKT'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Coyoneda: Coyoneda<L, A,any>
  }
}

export const URI = 'Coyoneda'
export type URI = typeof URI

export class Coyoneda<F, A, X> {
  readonly _A!: A
  readonly _L!: F
  readonly _URI!: URI
  constructor(readonly fx: HKT<F, X>, readonly f: (x: X) => Coyoneda<F, A, X>) {}

  map<B>(f: (a: A) => B): Coyoneda<F, B, X> {
    return new Coyoneda(this.fx, x => this.f(x).map(f))
  }

}

// export const lift = <A>(hack: A) => new Coyoneda(hack)
const map = <F,A, B>(fa: Coyoneda<F, A,any>, f: (a: A) => B): Coyoneda<F, B,any> => {
  return fa.map(f)
}

export const lift = <F>(fa: HKT<F, any>): Coyoneda<F,any,any> => {
  const s = new Coyoneda(fa, a => a)
  return s
}

export const coyoneda: Functor2<URI> = { URI, map }
