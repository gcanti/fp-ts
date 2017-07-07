import { HKT } from './HKT'
import { Setoid } from './Setoid'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Monoid } from './Monoid'
import { Bifunctor, FantasyBifunctor } from './Bifunctor'
import { Comonad, FantasyComonad } from './Comonad'
import { Apply } from './Apply'
import { Monad } from './Monad'
import { Foldable, FantasyFoldable } from './Foldable'
import { Applicative } from './Applicative'
import { Traversable, FantasyTraversable } from './Traversable'
import { Semigroupoid, FantasySemigroupoid } from './Semigroupoid'
import { Cokleisli } from './function'

// https://github.com/purescript/purescript-tuples

export const URI = 'Tuple'

export type URI = typeof URI

export class Tuple<L, A>
  implements FantasySemigroupoid<URI, L, A>,
    FantasyBifunctor<URI, L, A>,
    FantasyComonad<URI, A>,
    FantasyFoldable<A>,
    FantasyTraversable<URI, A> {
  readonly _tag: 'Left' = 'Left'
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(public readonly value: [L, A]) {}
  fst(): L {
    return this.value[0]
  }
  snd(): A {
    return this.value[1]
  }
  compose<B>(ab: Tuple<A, B>): Tuple<L, B> {
    return new Tuple([this.fst(), ab.snd()])
  }
  map<B>(f: (a: A) => B): Tuple<L, B> {
    return new Tuple([this.fst(), f(this.snd())])
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B> {
    return new Tuple([f(this.fst()), g(this.snd())])
  }
  extract(): A {
    return this.snd()
  }
  extend<B>(f: Cokleisli<URI, A, B>): Tuple<L, B> {
    return new Tuple([this.fst(), f(this)])
  }
  reduce<B>(f: (c: B, b: A) => B, c: B): B {
    return f(c, this.snd())
  }
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Tuple<L, B>> {
    return f => F.map(b => new Tuple([this.fst(), b]), f(this.snd()))
  }
}
export function compose<L, A, B>(bc: Tuple<A, B>, fa: Tuple<L, A>): Tuple<L, B> {
  return fa.compose(bc)
}

export function map<L, A, B>(f: (b: A) => B, fa: Tuple<L, A>): Tuple<L, B> {
  return fa.map(f)
}

export function bimap<L, A, M, B>(f: (l: L) => M, g: (a: A) => B, fla: Tuple<L, A>): Tuple<M, B> {
  return fla.bimap(f, g)
}

export const extract = snd

export function extend<L, A, B>(f: Cokleisli<URI, A, B>, fa: Tuple<L, A>): Tuple<L, B> {
  return fa.extend(f)
}

export function reduce<L, A, B>(f: (c: B, b: A) => B, c: B, fa: Tuple<L, A>): B {
  return fa.reduce(f, c)
}

export function traverse<F>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Tuple<L, A>) => HKT<F, Tuple<L, B>> {
  return (f, ta) => ta.traverse(F)(f)
}

export function getSetoid<L, A>(setoidA: Setoid<L>, setoidB: Setoid<A>): Setoid<Tuple<L, A>> {
  return {
    equals(x, y) {
      const [xa, xb] = x.value
      const [ya, yb] = y.value
      return setoidA.equals(xa, ya) && setoidB.equals(xb, yb)
    }
  }
}

/** To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
 * `snd`s are `compare`d.
 */
export function getOrd<L, A>(ordA: Ord<L>, ordB: Ord<A>): Ord<Tuple<L, A>> {
  return {
    equals: getSetoid(ordA, ordB).equals,
    compare(x, y) {
      const [xa, xb] = x.value
      const [ya, yb] = y.value
      const ordering = ordA.compare(xa, ya)
      return ordering === 'EQ' ? ordB.compare(xb, yb) : ordering
    }
  }
}

export function getSemigroup<L, A>(semigroupA: Semigroup<L>, semigroupB: Semigroup<A>): Semigroup<Tuple<L, A>> {
  return {
    concat(x, y) {
      const [xa, xb] = x.value
      const [ya, yb] = y.value
      return new Tuple([semigroupA.concat(xa, ya), semigroupB.concat(xb, yb)])
    }
  }
}

export function getMonoid<L, A>(monoidA: Monoid<L>, monoidB: Monoid<A>): Monoid<Tuple<L, A>> {
  const empty = new Tuple([monoidA.empty(), monoidB.empty()])
  return {
    concat: getSemigroup(monoidA, monoidB).concat,
    empty: () => empty
  }
}

export function getApply<L>(semigroupA: Semigroup<L>): Apply<URI> {
  return {
    URI,
    map,
    ap<A, B>(fab: Tuple<L, (b: A) => B>, fa: Tuple<L, A>): Tuple<L, B> {
      return new Tuple([semigroupA.concat(fa.fst(), fab.fst()), fab.snd()(fa.snd())])
    }
  }
}

export function getMonad<L>(M: Monoid<L>): Monad<URI> {
  const empty = M.empty()
  return {
    ...getApply(M),
    of<B>(b: B): Tuple<L, B> {
      return new Tuple([empty, b])
    },
    chain<A, B>(f: (b: A) => Tuple<L, B>, fa: Tuple<L, A>): Tuple<L, B> {
      const lb = f(fa.snd())
      return new Tuple([M.concat(fa.fst(), lb.fst()), lb.snd()])
    }
  }
}

/** Returns the first component of a tuple. */
export function fst<L, A>(fa: Tuple<L, A>): L {
  return fa.fst()
}

/** Returns the second component of a tuple. */
export function snd<L, A>(fa: Tuple<L, A>): A {
  return fa.snd()
}

/** Exchange the first and second components of a tuple. */
export function swap<L, A>(fa: Tuple<L, A>): Tuple<A, L> {
  return new Tuple([fa.snd(), fa.fst()])
}

const proof: Semigroupoid<URI> & Bifunctor<URI> & Comonad<URI> & Foldable<URI> & Traversable<URI> = {
  URI,
  compose,
  map,
  bimap,
  extract,
  extend,
  reduce,
  traverse
}
// tslint:disable-next-line no-unused-expression
proof
