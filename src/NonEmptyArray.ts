import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Monad, FantasyMonad } from './Monad'
import { Comonad, FantasyComonad } from './Comonad'
import { Semigroup } from './Semigroup'
import { Foldable, FantasyFoldable } from './Foldable'
import { Applicative } from './Applicative'
import { Traversable, FantasyTraversable } from './Traversable'
import * as array from './Array'
import { Option, some, none } from './Option'
import { toString } from './function'

declare module './HKT' {
  interface URI2HKT<A> {
    NonEmptyArray: NonEmptyArray<A>
  }
}

export const URI = 'NonEmptyArray'

export type URI = typeof URI

export class NonEmptyArray<A>
  implements FantasyMonad<URI, A>, FantasyComonad<URI, A>, FantasyFoldable<A>, FantasyTraversable<URI, A> {
  static of = of
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly head: A, public readonly tail: Array<A>) {}
  toArray(): Array<A> {
    return [this.head].concat(this.tail)
  }
  concatArray(as: Array<A>): NonEmptyArray<A> {
    return new NonEmptyArray(this.head, this.tail.concat(as))
  }
  map<B>(f: (a: A) => B): NonEmptyArray<B> {
    return new NonEmptyArray(f(this.head), this.tail.map(f))
  }
  of<B>(b: B): NonEmptyArray<B> {
    return of(b)
  }
  ap<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B> {
    return fab.chain(f => this.map(f)) // <= derived
  }
  ap_<B, C>(this: NonEmptyArray<(a: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B> {
    return f(this.head).concatArray(array.chain(a => f(a).toArray(), this.tail))
  }
  concat(y: NonEmptyArray<A>): NonEmptyArray<A> {
    return this.concatArray(y.toArray())
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return array.reduce(f, b, this.toArray())
  }
  traverse<F extends HKT2S>(
    applicative: Applicative<F>
  ): <L, B>(f: (a: A) => HKT2As<F, L, B>) => HKT2As<F, L, NonEmptyArray<B>>
  traverse<F extends HKTS>(applicative: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, NonEmptyArray<B>>
  traverse<F>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, NonEmptyArray<B>>
  traverse<F>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, NonEmptyArray<B>> {
    return f => applicative.map(bs => unsafeFromArray(bs), array.traverse(applicative)(f, this.toArray()))
  }
  extend<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B> {
    return unsafeFromArray(array.extend(as => f(unsafeFromArray(as)), this.toArray()))
  }
  extract(): A {
    return this.head
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `new NonEmptyArray(${toString(this.head)}, ${toString(this.tail)})`
  }
}

function unsafeFromArray<A>(as: Array<A>): NonEmptyArray<A> {
  return new NonEmptyArray(as[0], as.slice(1))
}

export function fromArray<A>(as: Array<A>): Option<NonEmptyArray<A>> {
  return as.length ? some(unsafeFromArray(as)) : none
}

export function map<A, B>(f: (a: A) => B, fa: NonEmptyArray<A>): NonEmptyArray<B> {
  return fa.map(f)
}

export function ap<A, B>(fab: NonEmptyArray<(a: A) => B>, fa: NonEmptyArray<A>): NonEmptyArray<B> {
  return fa.ap(fab)
}

export function of<A>(a: A): NonEmptyArray<A> {
  return new NonEmptyArray(a, [])
}

export function chain<A, B>(f: (a: A) => NonEmptyArray<B>, fa: NonEmptyArray<A>): NonEmptyArray<B> {
  return fa.chain(f)
}

export function concat<A>(fx: NonEmptyArray<A>, fy: NonEmptyArray<A>): NonEmptyArray<A> {
  return fx.concat(fy)
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: NonEmptyArray<A>): B {
  return fa.reduce(f, b)
}

export class Ops {
  traverse<F extends HKT2S>(
    F: Applicative<F>
  ): <L, A, B>(f: (a: A) => HKT2As<F, L, B>, ta: NonEmptyArray<A>) => HKT2As<F, L, NonEmptyArray<B>>
  traverse<F extends HKTS>(
    F: Applicative<F>
  ): <A, B>(f: (a: A) => HKTAs<F, B>, ta: NonEmptyArray<A>) => HKTAs<F, NonEmptyArray<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: NonEmptyArray<A>) => HKT<F, NonEmptyArray<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: NonEmptyArray<A>) => HKT<F, NonEmptyArray<B>> {
    return (f, ta) => ta.traverse(F)(f)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse

export function extend<A, B>(f: (fa: NonEmptyArray<A>) => B, fa: NonEmptyArray<A>): NonEmptyArray<B> {
  return fa.extend(f)
}

export function extract<A>(fa: NonEmptyArray<A>): A {
  return fa.extract()
}

export const nonEmptyArray: Monad<URI> & Comonad<URI> & Semigroup<any> & Foldable<URI> & Traversable<URI> = {
  URI,
  extend,
  extract,
  map,
  of,
  ap,
  chain,
  concat,
  reduce,
  traverse
}
