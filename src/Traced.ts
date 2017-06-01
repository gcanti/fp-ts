import { Monoid } from './Monoid'
import { Comonad, FantasyComonad } from './Comonad'

declare module './HKT' {
  interface HKT<A, U> {
    Traced: Traced<U, A>
  }
}

export const URI = 'Traced'

export type URI = typeof URI

export class Traced<E, A> implements FantasyComonad<URI, A> {
  readonly _E: E
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly monoid: Monoid<E>, public readonly value: (e: E) => A) { }
  run(e: E): A {
    return this.value(e)
  }
  map<B>(f: (a: A) => B): Traced<E, B> {
    return new Traced<E, B>(this.monoid, e => f(this.run(e)))
  }
  extract(): A {
    return this.run(this.monoid.empty())
  }
  extend<B>(f: (ea: Traced<E, A>) => B): Traced<E, B> {
    return new Traced(
      this.monoid,
      m1 => f(
        new Traced(
          this.monoid,
          m2 => this.run(
            this.monoid.concat(m1, m2)
          )
        )
      )
    )
  }
}

export function map<E, A, B>(f: (a: A) => B, ea: Traced<E, A>): Traced<E, B> {
  return ea.map(f)
}

export function extract<E, A>(ea: Traced<E, A>): A {
  return ea.extract()
}

export function extend<E, A, B>(f: (ea: Traced<E, A>) => B, ea: Traced<E, A>): Traced<E, B> {
  return ea.extend(f)
}

const proof:
  Comonad<URI>
= { map, extract, extend }
// tslint:disable-next-line no-unused-expression
{ proof }
