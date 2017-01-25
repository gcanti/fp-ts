import { HKT, Monad, Foldable, Traversable, Applicative } from './cats'
import { identity, constant } from './function'

export abstract class Option<A> extends HKT<'Option', A> {
  abstract map<B>(f: (a: A) => B): Option<B>
  abstract ap<A, B>(fab: Option<(a: A) => B>): Option<B>
  abstract chain<B>(f: (a: any) => Option<B>): Option<B>
  abstract fold<B>(n: () => B, s: (a: A) => B): B
  abstract reduce<A, B>(f: (b: B, a: A) => B, b: B): B
  abstract traverse<F, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>): HKT<F, Option<B>>
}

export class None extends Option<any> {
  map<B>(f: (a: any) => B): Option<B> {
    return none
  }
  ap<B>(fab: Option<(a: any) => B>): Option<B> {
    return none
  }
  chain<B>(f: (a: any) => Option<B>): Option<B> {
    return none
  }
  reduce<A, B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F, B>(applicative: Applicative<F>, f: (a: any) => HKT<F, B>): HKT<F, Option<B>> {
    return applicative.of(none)
  }
  fold<B>(n: () => B, s: (a: any) => B): B {
    return n()
  }
}

export const none: Option<any> = new None

export class Some<A> extends Option<A> {
  constructor(private value: A){ super() }
  map<B>(f: (a: A) => B): Option<B> {
    return new Some(f(this.value))
  }
  ap<B>(fab: Option<(a: A) => B>): Option<B> {
    return fab.map(f => f(this.value))
  }
  chain<B>(f: (a: A) => Option<B>): Option<B> {
    return f(this.value)
  }
  reduce<A, B>(f: (b: B, a: A) => B, b: B): B {
    return this.fold<B>(constant(b), identity)
  }
  traverse<F, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>): HKT<F, Option<B>> {
    return applicative.map(b => new Some(b), f(this.value))
  }
  fold<B>(n: () => B, s: (a: A) => B): B {
    return s(this.value)
  }
}

export function fromNullable<A>(a: A | null | undefined): Option<A> {
  return a == null ? none : new Some(a)
}

export const monad: Monad<'Option'> = {
  map<A, B>(f: (a: A) => B, fa: Option<A>): Option<B> {
    return fa.map(f)
  },
  of<A>(a: A): Option<A> {
    return new Some(a)
  },
  ap<A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> {
    return fa.ap(fab)
  },
  chain<A, B>(f: (a: A) => Option<B>, fa: Option<A>): Option<B> {
    return fa.chain(f)
  }
}

export const foldable: Foldable<'Option'> = {
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: Option<A>): B {
    return fa.reduce(f, b)
  }
}

export const traversable: Traversable<'Option'> = {
  map: monad.map,
  reduce: foldable.reduce,
  traverse<F, A, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>, ta: Option<A>): HKT<F, Option<B>> {
    return ta.traverse(applicative, f)
  }
}
