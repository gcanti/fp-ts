import { HKT, HKTS } from './HKT'
import { Setoid } from './Setoid'
import { Ord } from './Ord'
import { Semigroupoid } from './Semigroupoid'
import { Semigroup } from './Semigroup'
import { Monoid } from './Monoid'
import { Bifunctor } from './Bifunctor'
import { Comonad } from './Comonad'
import { Apply } from './Apply'
import { Monad } from './Monad'
import { Foldable } from './Foldable'
import { Applicative } from './Applicative'
import { Traversable } from './Traversable'
import { Cokleisli } from './function'

// https://github.com/purescript/purescript-tuples

declare module './HKT' {
  interface HKT<A, U> {
    Tuple: Tuple<U, A>
  }
}

export const URI = 'Tuple'

export type URI = typeof URI

export type Tuple<A, B> = [A, B]

export function compose<A, B, C>(bc: Tuple<B, C>, ab: Tuple<A, B>): Tuple<A, C> {
  return [ab[0], bc[1]]
}

export function map<A, B, C>(f: (b: B) => C, ab: Tuple<A, B>): Tuple<A, C> {
  return [ab[0], f(ab[1])]
}

export function bimap<A, B, C, D>(f: (a: A) => B, g: (c: C) => D, ac: Tuple<A, C>): Tuple<B, D> {
  return [f(ac[0]), g(ac[1])]
}

export const extract = snd

export function extend<A, B, C>(f: Cokleisli<URI, B, C>, ab: Tuple<A, B>): Tuple<A, C> {
  return [ab[0], f(ab)]
}

export function reduce<A, B, C>(f: (c: C, b: B) => C, c: C, fa: Tuple<A, B>): C {
  return f(c, fa[1])
}

export function traverse<F extends HKTS>(applicative: Applicative<F>): <A, B, C, U = any, V = any>(f: (b: B) => HKT<C, U, V>[F], ta: Tuple<A, B>) => HKT<Tuple<A, C>, U, V>[F] {
  return <A, B, C>(f: (b: B) => HKT<C>[F], ta: Tuple<A, B>) => applicative.map(c => [ta[0], c] as Tuple<A, C>, f(ta[1]))
}

export function getSetoid<A, B>(setoidA: Setoid<A>, setoidB: Setoid<B>): Setoid<Tuple<A, B>> {
  return {
    equals([xa, xb], [ya, yb]) {
      return setoidA.equals(xa, ya) && setoidB.equals(xb, yb)
    }
  }
}

/** To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
 * `snd`s are `compare`d.
 */
export function getOrd<A, B>(ordA: Ord<A>, ordB: Ord<B>): Ord<Tuple<A, B>> {
  return {
    equals: getSetoid(ordA, ordB).equals,
    compare([xa, xb], [ya, yb]) {
      const ordering = ordA.compare(xa, ya)
      return ordering === 'EQ' ? ordB.compare(xb, yb) : ordering
    }
  }
}

export function getSemigroup<A, B>(semigroupA: Semigroup<A>, semigroupB: Semigroup<B>): Semigroup<Tuple<A, B>> {
  return {
    concat([xa, xb], [ya, yb]) {
      return [semigroupA.concat(xa, ya), semigroupB.concat(xb, yb)]
    }
  }
}

export function getMonoid<A, B>(monoidA: Monoid<A>, monoidB: Monoid<B>): Monoid<Tuple<A, B>> {
  const empty = [monoidA.empty(), monoidB.empty()] as Tuple<A, B>
  return {
    concat: getSemigroup(monoidA, monoidB).concat,
    empty: () => empty
  }
}

export function getApply<A>(semigroupA: Semigroup<A>): Apply<URI> {
  return {
    URI,
    map,
    ap<B, C>(af: Tuple<A, (b: B) => C>, ab: Tuple<A, B>): Tuple<A, C> {
      return [semigroupA.concat(ab[0], af[0]), af[1](ab[1])]
    }
  }
}

export function getMonad<A>(monoidA: Monoid<A>): Monad<URI> {
  const empty = monoidA.empty()
  return {
    ...getApply(monoidA),
    of<B>(b: B): Tuple<A, B> {
      return [empty, b]
    },
    chain<B, C>(f: (b: B) => Tuple<A, C>, ab: Tuple<A, B>): Tuple<A, C> {
      const ac = f(ab[1])
      return [monoidA.concat(ab[0], ac[0]), ac[1]]
    }
  }
}

/** Returns the first component of a tuple. */
export function fst<A, B>(ab: Tuple<A, B>): A {
  return ab[0]
}

/** Returns the second component of a tuple. */
export function snd<A, B>(ab: Tuple<A, B>): B {
  return ab[1]
}

/** Exchange the first and second components of a tuple. */
export function swap<A, B>(ab: Tuple<A, B>): Tuple<B, A> {
  return [ab[1], ab[0]]
}

export function tuple<A>(a: A): <B>(b: B) => Tuple<A, B> {
  return <B>(b: B) => [a, b] as [A, B]
}

// tslint:disable-next-line no-unused-expression
;(
  { compose, map, bimap, extract, extend, reduce } as (
    Semigroupoid<URI> &
    Bifunctor<URI> &
    Comonad<URI> &
    Foldable<URI> &
    Traversable<URI>
  )
)
