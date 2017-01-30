import { HKT, Applicative, Monad, Comonad, Foldable, Traversable, Alt } from './cats'

export class Identity<A> extends HKT<'Identity', A> {
  static of = of
  static extract = extract
  constructor(private value: A){ super() }
  map<B>(f: (a: A) => B): Identity<B> {
    return new Identity(f(this.value))
  }
  ap<B>(fab: Identity<(a: A) => B>): Identity<B> {
    return this.map(fab.extract())
  }
  chain<B>(f: (a: A) => Identity<B>): Identity<B> {
    return f(this.extract())
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>): HKT<F, Identity<B>> {
    return applicative.map(b => of<B>(b), f(this.value))
  }
  alt(fx: Identity<A>): Identity<A> {
    return this
  }
  extract(): A {
    return this.value
  }
  extend<B>(f: (ea: Identity<A>) => B): Identity<B> {
    return of(f(this))
  }
  fold<B>(f: (a: A) => B): B {
    return f(this.value)
  }
}

export function map<A, B>(f: (a: A) => B, fa: Identity<A>): Identity<B> {
  return fa.map(f)
}

export function of<A>(a: A): Identity<A> {
  return new Identity(a)
}

export function ap<A, B>(fab: Identity<(a: A) => B>, fa: Identity<A>): Identity<B> {
  return fa.ap(fab)
}

export function chain<A, B>(f: (a: A) => Identity<B>, fa: Identity<A>): Identity<B> {
  return fa.chain(f)
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: Identity<A>): B {
  return fa.reduce(f, b)
}

export function alt<A>(fx: Identity<A>, fy: Identity<A>): Identity<A> {
  return fx.alt(fy)
}

export function traverse<F, A, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>, ta: Identity<A>): HKT<F, Identity<B>> {
  return ta.traverse(applicative, f)
}

export function extend<A, B>(f: (ea: Identity<A>) => B, ea: Identity<A>): Identity<B> {
  return ea.extend(f)
}

export function extract<A>(fa: Identity<A>): A {
  return fa.extract()
}

;(
  { map, of, ap, chain, reduce, traverse, alt, extract, extend } as (
    Monad<'Identity'> &
    Foldable<'Identity'> &
    Traversable<'Identity'> &
    Alt<'Identity'> &
    Comonad<'Identity'>
  )
)
