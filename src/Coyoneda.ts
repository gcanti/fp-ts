import { identity, compose } from './function'
import { Functor, Functor1 } from './Functor'
import { HKT, Type, URIS } from './HKT'
import { Box, box } from './Box'

class CoyonedaF<F, A, I> {
  constructor(readonly fi: HKT<F, I>, readonly f: (i: I) => A) {}
  map<B>(f: (a: A) => B): Coyoneda<F, B> {
    return new CoyonedaF(
      this.fi,
      compose(
        f,
        this.f
      )
    )
  }

  lower<F extends URIS>(this: CoyonedaF<F, A, I>, F: Functor1<F>): Type<F, A>
  lower(F: Functor<F>): HKT<F, A> {
    return F.map(this.fi, this.f)
  }

  lowerB(): A {
    const s = this.fi as any
    return box.map(s as Box<I>, this.f).value
  }
}

export class Coyoneda<F, A> extends CoyonedaF<F, A, any> {
  private constructor(f: (i: any) => A, fi: HKT<F, any>) {
    super(fi, f)
  }
  static lift<F, A>(fa: HKT<F, A>): Coyoneda<F, A> {
    return new CoyonedaF(fa, identity)
  }

  static liftFromNonFunctor<A>(fa: A) {
    return new CoyonedaF(Box.of(fa), identity)
  }
}
