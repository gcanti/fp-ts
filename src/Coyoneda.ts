import { compose,identity } from './function'

export class Coyoneda {

  constructor(readonly x: any, readonly f: any) {}

  map<A,B>(f: (a: A) => B): Coyoneda {
    return new Coyoneda(this.x, compose(this.f,f))
  }

  lower() {
    return this.x.map(this.f)
  }
}

export const lift = <A>(val: A): Coyoneda => {
  const s = new Coyoneda(val, identity)
  return s
}

// export const coyoneda: Functor2<URI> = { URI, map }
