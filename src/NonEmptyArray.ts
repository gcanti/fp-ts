import { HKT } from './HKT'
import { Monad } from './Monad'
import { Semigroup } from './Semigroup'
import { Foldable } from './Foldable'
import { Applicative } from './Applicative'
import { Traversable } from './Traversable'
import { Function1, Function2 } from './function'
import * as arr from './Arr'
import { Option, some, none } from './Option'

export type URI = 'NonEmptyArray'

export type HKTNonEmptyArray<A> = HKT<URI, A>

export class NonEmptyArray<A> {
  __hkt: URI
  __hkta: A
  constructor(public head: A, public tail: Array<A>) {}
  toArray(): Array<A> {
    return [this.head].concat(this.tail)
  }
  concatArray(as: Array<A>): NonEmptyArray<A> {
    return new NonEmptyArray(this.head, this.tail.concat(as))
  }
  map<B>(f: Function1<A, B>): NonEmptyArray<B> {
    return new NonEmptyArray(f(this.head), this.tail.map(f))
  }
  ap<B>(fab: NonEmptyArray<Function1<A, B>>): NonEmptyArray<B> {
    return fab.chain(f => map(f, this)) // <= derived
  }
  chain<B>(f: Function1<A, NonEmptyArray<B>>): NonEmptyArray<B> {
    return f(this.head).concatArray(arr.chain(a => f(a).toArray(), this.tail))
  }
  concat(y: NonEmptyArray<A>): NonEmptyArray<A> {
    return this.concatArray(y.toArray())
  }
  reduce<B>(f: Function2<B, A, B>, b: B): B {
    return arr.reduce(f, b, this.toArray())
  }
  traverse<F, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, NonEmptyArray<B>> {
    return applicative.map(as => unsafeFromArray(as), arr.traverse(applicative, f, this.toArray()))
  }
}

function unsafeFromArray<A>(as: Array<A>): NonEmptyArray<A> {
  return new NonEmptyArray(as[0], as.slice(1))
}

export function fromArray<A>(as: Array<A>): Option<NonEmptyArray<A>> {
  return as.length ? some(unsafeFromArray(as)) : none
}

export function map<A, B>(f: Function1<A, B>, fa: HKTNonEmptyArray<A>): NonEmptyArray<B> {
  return (fa as NonEmptyArray<A>).map(f)
}

export function ap<A, B>(fab: HKTNonEmptyArray<Function1<A, B>>, fa: HKTNonEmptyArray<A>): NonEmptyArray<B> {
  return (fa as NonEmptyArray<A>).ap((fab as NonEmptyArray<Function1<A, B>>))
}

export function of<A>(a: A): HKTNonEmptyArray<A> {
  return new NonEmptyArray(a, [])
}

export function chain<A, B>(f: Function1<A, HKTNonEmptyArray<B>>, fa: HKTNonEmptyArray<A>): NonEmptyArray<B> {
  return (fa as NonEmptyArray<A>).chain(f as Function1<A, NonEmptyArray<B>>)
}

export function concat<A>(fx: HKTNonEmptyArray<A>, fy: HKTNonEmptyArray<A>): NonEmptyArray<A> {
  return (fx as NonEmptyArray<A>).concat(fy as NonEmptyArray<A>)
}

export function reduce<A, B>(f: Function2<B, A, B>, b: B, fa: HKTNonEmptyArray<A>): B {
  return (fa as NonEmptyArray<A>).reduce(f, b)
}

export function traverse<F, A, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>, ta: HKTNonEmptyArray<A>): HKT<F, NonEmptyArray<B>> {
  return (ta as NonEmptyArray<A>).traverse(applicative, f)
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, concat, reduce, traverse } as (
    Monad<URI> &
    Semigroup<any> &
    Foldable<URI> &
    Traversable<URI>
  )
)
