import { HKT, Applicative, Monad, Foldable, Traversable, Bifunctor, Alt, Extend, Setoid } from './cats'
import { identity, ffalse, ftrue } from './function'

export abstract class Either<L, A> extends HKT<HKT<'Either', L>, A> {
  static of = of
  abstract map<B>(f: (a: A) => B): Either<L, B>
  abstract ap<B>(fab: Either<L, (a: A) => B>): Either<L, B>
  abstract chain<B>(f: (a: A) => Either<L, B>): Either<L, B>
  abstract fold<B>(l: (l: L) => B, r: (a: A) => B): B
  abstract bimap<L2, B>(f: (l: L) => L2, g: (a: A) => B): Either<L2, B>
  abstract alt(fy: Either<L, A>): Either<L, A>
  abstract extend<B>(f: (ea: Either<L, A>) => B): Either<L, B>
  abstract reduce<B>(f: (b: B, a: A) => B, b: B): B
  abstract traverse<F, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>): HKT<F, Either<L, B>>
}

export class Left<L, A> extends Either<L, A> {
  constructor(private value: L){ super() }
  map<B>(f: (a: A) => B): Either<L, B> {
    return this as any as Either<L, B>
  }
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    return this as any as Either<L, B>
  }
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return this as any as Either<L, B>
  }
  bimap<L2, B>(f: (l: L) => L2, g: (a: A) => B): Either<L2, B> {
    return new Left<L2, B>(f(this.value))
  }
  alt(fy: Either<L, A>): Either<L, A> {
    return fy
  }
  extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> {
    return this as any as Either<L, B>
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>): HKT<F, Either<L, B>> {
    return applicative.of(this as any as Either<L, B>)
  }
  fold<B>(l: (l: L) => B, r: (a: A) => B): B {
    return l(this.value)
  }
}

export class Right<L, A> extends Either<L, A> {
  constructor(private value: A){ super() }
  map<B>(f: (a: A) => B): Either<L, B> {
    return new Right<L, B>(f(this.value))
  }
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    return fab.fold<Either<L, B>>(identity, f => this.map(f))
  }
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return f(this.value)
  }
  bimap<L2, B>(f: (l: L) => L2, g: (a: A) => B): Either<L2, B> {
    return new Right<L2, B>(g(this.value))
  }
  alt(fy: Either<L, A>): Either<L, A> {
    return this
  }
  extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> {
    return new Right<L, B>(f(this))
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>): HKT<F, Either<L, B>> {
    return applicative.map(b => of<L, B>(b), f(this.value))
  }
  fold<B>(l: (l: L) => B, r: (a: A) => B): B {
    return r(this.value)
  }
}

export function equals<L, A>(setoid: Setoid<A>, fx: Either<L, A>, fy: Either<L, A>): boolean {
  return fx.fold(
    () => fy.fold(ftrue, ffalse),
    x => fy.fold(ffalse, y => setoid.equals(x, y))
  )
}

export function map<L, A, B>(f: (a: A) => B, fa: Either<L, A>): Either<L, B> {
  return fa.map(f)
}

export function of<L, A>(a: A): Either<L, A> {
  return new Right<L, A>(a)
}

export function ap<L, A, B>(fab: Either<L, (a: A) => B>, fa: Either<L, A>): Either<L, B> {
  return fa.ap(fab)
}

export function chain<L, A, B>(f: (a: A) => Either<L, B>, fa: Either<L, A>): Either<L, B> {
  return fa.chain(f)
}

export function bimap<L, L2, A, B>(f: (l: L) => L2, g: (a: A) => B, fa: Either<L, A>): Either<L2, B> {
  return fa.bimap(f, g)
}

export function alt<L, A>(fx: Either<L, A>, fy: Either<L, A>): Either<L, A> {
  return fx.alt(fy)
}

export function extend<L, A, B>(f: (ea: Either<L, A>) => B, ea: Either<L, A>): Either<L, B> {
  return ea.extend(f)
}

export function reduce<L, A, B>(f: (b: B, a: A) => B, b: B, fa: Either<L, A>): B {
  return fa.reduce(f, b)
}

export function traverse<F, L, A, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>, ta: Either<L, A>): HKT<F, Either<L, B>> {
  return ta.traverse(applicative, f)
}

;(
  { map, of, ap, chain, reduce, traverse, bimap, alt, extend } as (
    Monad<HKT<'Either', any>> &
    Foldable<HKT<'Either', any>> &
    Traversable<HKT<'Either', any>> &
    Bifunctor<'Either'> &
    Alt<HKT<'Either', any>> &
    Extend<HKT<'Either', any>>
  )
)
