import { HKT, URIS, URIS2, Type, Type2, HKT2, HKT3, Type3, URIS3 } from './HKT'
import { Monad1 } from './Monad'
import { Comonad } from './Comonad'
import { Semigroup } from './Semigroup'
import { Foldable } from './Foldable'
import { Applicative } from './Applicative'
import { Traversable1 } from './Traversable'
import * as array from './Array'
import { Option, some, none } from './Option'
import { toString, concat as uncurriedConcat } from './function'

declare module './HKT' {
  interface URI2HKT<A> {
    NonEmptyArray: NonEmptyArray<A>
  }
}

export const URI = 'NonEmptyArray'

export type URI = typeof URI

/**
 * @data
 * @constructor NonEmptyArray
 */
export class NonEmptyArray<A> {
  readonly '-A': A
  readonly '-URI': URI
  constructor(readonly head: A, readonly tail: Array<A>) {}
  toArray(): Array<A> {
    return uncurriedConcat([this.head], this.tail)
  }
  concatArray(as: Array<A>): NonEmptyArray<A> {
    return new NonEmptyArray(this.head, uncurriedConcat(this.tail, as))
  }
  map<B>(f: (a: A) => B): NonEmptyArray<B> {
    return new NonEmptyArray(f(this.head), this.tail.map(f))
  }
  ap<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B> {
    return fab.chain(f => this.map(f)) // <= derived
  }
  ap_<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B> {
    return f(this.head).concatArray(array.chain(this.tail, a => f(a).toArray()))
  }
  concat(y: NonEmptyArray<A>): NonEmptyArray<A> {
    return this.concatArray(y.toArray())
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return array.reduce(this.toArray(), b, f)
  }
  traverse<F extends URIS3>(
    applicative: Applicative<F>
  ): <U, L, B>(f: (a: A) => HKT3<F, U, L, B>) => Type3<F, U, L, NonEmptyArray<B>>
  traverse<F extends URIS2>(
    applicative: Applicative<F>
  ): <L, B>(f: (a: A) => HKT2<F, L, B>) => Type2<F, L, NonEmptyArray<B>>
  traverse<F extends URIS>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => Type<F, NonEmptyArray<B>>
  traverse<F>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, NonEmptyArray<B>>
  traverse<F>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, NonEmptyArray<B>> {
    return f => applicative.map(array.traverse(applicative)(this.toArray(), f), unsafeFromArray)
  }
  extend<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B> {
    return unsafeFromArray(array.extend(as => f(unsafeFromArray(as)), this.toArray()))
  }
  extract(): A {
    return this.head
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new NonEmptyArray(${toString(this.head)}, ${toString(this.tail)})`
  }
}

const unsafeFromArray = <A>(as: Array<A>): NonEmptyArray<A> => {
  return new NonEmptyArray(as[0], as.slice(1))
}

/** @function */
export const fromArray = <A>(as: Array<A>): Option<NonEmptyArray<A>> => {
  return as.length ? some(unsafeFromArray(as)) : none
}

const map = <A, B>(fa: NonEmptyArray<A>, f: (a: A) => B): NonEmptyArray<B> => {
  return fa.map(f)
}

/** @function */
export const of = <A>(a: A): NonEmptyArray<A> => {
  return new NonEmptyArray(a, [])
}

const ap = <A, B>(fab: NonEmptyArray<(a: A) => B>, fa: NonEmptyArray<A>): NonEmptyArray<B> => {
  return fa.ap(fab)
}

const chain = <A, B>(fa: NonEmptyArray<A>, f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B> => {
  return fa.chain(f)
}

const concat = <A>(fx: NonEmptyArray<A>, fy: NonEmptyArray<A>): NonEmptyArray<A> => {
  return fx.concat(fy)
}

/** @function */
export const getSemigroup = <A>(): Semigroup<NonEmptyArray<A>> => {
  return { concat }
}

const reduce = <A, B>(fa: NonEmptyArray<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const extend = <A, B>(f: (fa: NonEmptyArray<A>) => B, fa: NonEmptyArray<A>): NonEmptyArray<B> => {
  return fa.extend(f)
}

const extract = <A>(fa: NonEmptyArray<A>): A => {
  return fa.extract()
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: HKT<URI, A>, f: (a: A) => HKT<F, B>) => HKT<F, NonEmptyArray<B>>
function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: NonEmptyArray<A>, f: (a: A) => HKT<F, B>) => HKT<F, NonEmptyArray<B>> {
  return (ta, f) => ta.traverse(F)(f)
}

/** @instance */
export const nonEmptyArray: Monad1<URI> & Comonad<URI> & Foldable<URI> & Traversable1<URI> = {
  URI,
  extend,
  extract,
  map,
  of,
  ap,
  chain,
  reduce,
  traverse
}
