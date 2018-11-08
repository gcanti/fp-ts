import * as func from './function'
import { Functor, Functor1 } from './Functor'
import { HKT, Type, URIS } from './HKT'
import { Identity, identity } from './Identity'

class CoyonedaF<F, A, I> {
  constructor(readonly fi: HKT<F, I>, readonly f: (i: I) => A) {}
  map<B>(f: (a: A) => B): Coyoneda<F, B> {
    return new CoyonedaF(
      this.fi,
      func.compose(
        f,
        this.f
      )
    )
  }

  lower<F extends URIS>(this: CoyonedaF<F, A, I>, F: Functor1<F>): Type<F, A>
  lower(F: Functor<F>): HKT<F, A> {
    return F.map(this.fi, this.f)
  }

  lowerFromNonFunctor(): A {
    const s = this.fi as any
    return identity.map(s as Identity<I>, this.f).value
  }
}

export class Coyoneda<F, A> extends CoyonedaF<F, A, any> {
  private constructor(f: (i: any) => A, fi: HKT<F, any>) {
    super(fi, f)
  }
  static lift<F, A>(fa: HKT<F, A>): Coyoneda<F, A> {
    return new CoyonedaF(fa, func.identity)
  }

  static liftFromNonFunctor<A>(fa: A) {
    return new CoyonedaF(identity.of(fa), func.identity)
  }
}
