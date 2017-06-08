import { liftA2 } from './Apply'
import { Monad } from './Monad'
import { Semigroup } from './Semigroup'
import { Monoid } from './Monoid'
import { fold } from './Array'
import { toString } from './function'

declare module './HKT' {
  interface HKT<A, U> {
    Mealy: Mealy<U, A>
  }
}

export const URI = 'Mealy'

export type URI = typeof URI

export class Mealy<I, A> {
  static of = of
  constructor(public readonly value: (i: I) => [A, Mealy<I, A>]) {}
  run(i: I): [A, Mealy<I, A>] {
    return this.value(i)
  }
  eval(i: I): A {
    return this.run(i)[0]
  }
  exec(i: I): Mealy<I, A> {
    return this.run(i)[1]
  }
  map<B>(f: (a: A) => B): Mealy<I, B> {
    return new Mealy<I, B>(i => {
      const [a, m] = this.run(i)
      return [f(a), m.map(f)]
    })
  }
  of<I2, B>(b: B): Mealy<I2, B> {
    return of(b)
  }
  ap<B>(fab: Mealy<I, (a: A) => B>): Mealy<I, B> {
    return new Mealy<I, B>(i => {
      const [f, m1] = fab.run(i)
      const [a, m2] = this.run(i)
      return [f(a), m2.ap(m1)]
    })
  }
  chain<B>(f: (a: A) => Mealy<I, B>): Mealy<I, B> {
    return new Mealy<I, B>(i => {
      const [a, ma] = this.run(i)
      const b = f(a).eval(i)
      return [b, ma.chain(f)]
    })
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `new Mealy(${toString(this.value)})`
  }
}

export function map<I, A, B>(f: (a: A) => B, fa: Mealy<I, A>): Mealy<I, B> {
  return fa.map(f)
}

export function of<I, A>(a: A): Mealy<I, A> {
  const m: Mealy<I, A> = new Mealy(i => [a, m])
  return m
}

export function ap<I, A, B>(fab: Mealy<I, (a: A) => B>, fa: Mealy<I, A>): Mealy<I, B> {
  return fa.ap(fab)
}

export function chain<I, A, B>(f: (a: A) => Mealy<I, B>, fa: Mealy<I, A>): Mealy<I, B> {
  return fa.chain(f)
}

/** A 'Mealy' machine modeled with explicit state */
export function unfold<S, I, A>(f: (s: S, i: I) => [A, S]): (s: S) => Mealy<I, A> {
  function go(s: S): Mealy<I, A> {
    return new Mealy<I, A>(i => {
      const [a, t] = f(s, i)
      return [a, go(t)]
    })
  }
  return go
}

export function getSemigroup<I, A>(semigroup: Semigroup<A>): Semigroup<Mealy<I, A>> {
  const concat = zipWith<I, A, A, A>(x => y => semigroup.concat(x, y))
  return { concat }
}

export function getMonoid<I, A>(monoid: Monoid<A>): Monoid<Mealy<I, A>> {
  const semigroup = getSemigroup(monoid)
  const empty = of(monoid.empty())
  return { ...semigroup, empty: () => empty }
}

export function zipWith<I, A, B, C>(f: (a: A) => (b: B) => C): (fa: Mealy<I, A>, fb: Mealy<I, B>) => Mealy<I, C> {
  const g = liftA2(proof, f)
  return (fa: Mealy<I, A>, fb: Mealy<I, B>) => g(fa, fb)
}

export function flippedZipWith<I, A, B>(
  fa: Mealy<I, A>,
  fb: Mealy<I, B>
): <C>(f: (a: A) => (b: B) => C) => Mealy<I, C> {
  return <C>(f: (a: A) => (b: B) => C) => zipWith(f)(fa, fb)
}

export function scanl<I, A, B>(f: (b: B, a: A) => B): (b: B, fa: Mealy<I, A>) => Mealy<I, B> {
  function go(b: B, fa: Mealy<I, A>): Mealy<I, B> {
    return new Mealy<I, B>(i => {
      const [a, m] = fa.run(i)
      const b2 = f(b, a)
      return [b2, go(b2, m)]
    })
  }
  return go
}

export function collect<I, A>(fa: Mealy<I, A>): Mealy<I, Array<A>> {
  return scanl<I, A, Array<A>>((b, a) => b.concat(a))([], fa)
}

/** Fast forward a mealy machine forward */
export function driveMealy<I, A>(fa: Mealy<I, A>, seq: Array<I>): Mealy<I, A> {
  return fold(() => fa, (head, tail) => driveMealy(fa.exec(head), tail), seq)
}

const proof: Monad<URI> = { URI, map, of, ap, chain }
// tslint:disable-next-line no-unused-expression
proof
