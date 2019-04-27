import { Alt1 } from './Alt'
import { Applicative } from './Applicative'
import { ChainRec1, tailRec } from './ChainRec'
import { Comonad1 } from './Comonad'
import { Either } from './Either'
import { Foldable1 } from './Foldable'
import { identity as id } from './function'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { fromEquals, Eq } from './Eq'
import { Show } from './Show'
import { Traversable1 } from './Traversable'

declare module './HKT' {
  interface URI2HKT<A> {
    Identity: Identity<A>
  }
}

export const URI = 'Identity'

export type URI = typeof URI

export type Identity<A> = A

/**
 * @since 2.0.0
 */
export const getShow = <A>(S: Show<A>): Show<Identity<A>> => {
  return {
    show: a => S.show(a)
  }
}

/**
 * @since 2.0.0
 */
export const getEq = <A>(E: Eq<A>): Eq<Identity<A>> => {
  return fromEquals((x, y) => E.equals(x, y))
}

const map = <A, B>(fa: Identity<A>, f: (a: A) => B): Identity<B> => {
  return f(fa)
}

const of = <A>(a: A): Identity<A> => {
  return a
}

const ap = <A, B>(fab: Identity<(a: A) => B>, fa: Identity<A>): Identity<B> => {
  return fab(fa)
}

const chain = <A, B>(fa: Identity<A>, f: (a: A) => Identity<B>): Identity<B> => {
  return f(fa)
}

const reduce = <A, B>(fa: Identity<A>, b: B, f: (b: B, a: A) => B): B => {
  return f(b, fa)
}

const foldMap = <M>(_: Monoid<M>) => <A>(fa: Identity<A>, f: (a: A) => M): M => {
  return f(fa)
}

const reduceRight = <A, B>(fa: Identity<A>, b: B, f: (a: A, b: B) => B): B => {
  return f(fa, b)
}

const extend = <A, B>(ea: Identity<A>, f: (ea: Identity<A>) => B): Identity<B> => {
  return f(ea)
}

const extract = <A>(fa: Identity<A>): A => {
  return fa
}

const chainRec = <A, B>(a: A, f: (a: A) => Identity<Either<A, B>>): Identity<B> => {
  return tailRec(a, a => f(a))
}

const traverse = <F>(F: Applicative<F>) => <A, B>(ta: Identity<A>, f: (a: A) => HKT<F, B>): HKT<F, Identity<B>> => {
  return F.map(f(ta), of)
}

const sequence = <F>(F: Applicative<F>) => <A>(ta: Identity<HKT<F, A>>): HKT<F, Identity<A>> => {
  return F.map(ta, of)
}

/**
 * @since 2.0.0
 */
export const identity: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  foldMap,
  reduceRight,
  traverse,
  sequence,
  alt: id,
  extract,
  extend,
  chainRec
}
