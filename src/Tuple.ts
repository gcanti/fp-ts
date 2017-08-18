import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
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
import { Cokleisli, toString } from './function'
import { ChainRec } from './ChainRec'
import { Chain } from './Chain'
import { Either, isLeft, Right, Left } from './Either'

// https://github.com/purescript/purescript-tuples

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Tuple: Tuple<L, A>
  }
}

export const URI = 'Tuple'

export type URI = typeof URI

export class Tuple<L, A>
  implements FantasySemigroupoid<URI, L, A>,
    FantasyBifunctor<URI, L, A>,
    FantasyComonad<URI, A>,
    FantasyFoldable<A>,
    FantasyTraversable<URI, A> {
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
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Tuple(${toString(this.value)})`
  }
}

/** Returns the first component of a tuple. */
export const fst = <L, A>(fa: Tuple<L, A>): L => fa.fst()

/** Returns the second component of a tuple. */
export const snd = <L, A>(fa: Tuple<L, A>): A => fa.snd()

export const compose = <A, B>(bc: Tuple<A, B>) => <L>(fa: Tuple<L, A>): Tuple<L, B> => {
  return fa.compose(bc)
}

export const map = <L, A, B>(f: (b: A) => B, fa: Tuple<L, A>): Tuple<L, B> => fa.map(f)

export const bimap = <L, A, M, B>(f: (l: L) => M, g: (a: A) => B): ((fla: Tuple<L, A>) => Tuple<M, B>) => fla =>
  fla.bimap(f, g)

export const extract = snd

export const extend = <L, A, B>(f: Cokleisli<URI, A, B>, fa: Tuple<L, A>): Tuple<L, B> => fa.extend(f)

export const reduce = <L, A, B>(f: (c: B, b: A) => B, c: B, fa: Tuple<L, A>): B => fa.reduce(f, c)

export const getSetoid = <L, A>(SA: Setoid<L>, SB: Setoid<A>): Setoid<Tuple<L, A>> => ({
  equals: x => y => {
    const [xa, xb] = x.value
    const [ya, yb] = y.value
    return SA.equals(xa)(ya) && SB.equals(xb)(yb)
  }
})

/**
 * To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
 * `snd`s are `compare`d.
 */
export const getOrd = <L, A>(OA: Ord<L>, OB: Ord<A>): Ord<Tuple<L, A>> => ({
  ...getSetoid(OA, OB),
  compare: x => y => {
    const [xa, xb] = x.value
    const [ya, yb] = y.value
    const ordering = OA.compare(xa)(ya)
    return ordering === 'EQ' ? OB.compare(xb)(yb) : ordering
  }
})

export const getSemigroup = <L, A>(SA: Semigroup<L>, SB: Semigroup<A>): Semigroup<Tuple<L, A>> => ({
  concat: x => y => {
    const [xa, xb] = x.value
    const [ya, yb] = y.value
    return new Tuple([SA.concat(xa)(ya), SB.concat(xb)(yb)])
  }
})

export const getMonoid = <L, A>(MA: Monoid<L>, MB: Monoid<A>): Monoid<Tuple<L, A>> => {
  const empty = new Tuple([MA.empty(), MB.empty()])
  return {
    ...getSemigroup(MA, MB),
    empty: () => empty
  }
}

export const getApply = <L>(S: Semigroup<L>): Apply<URI> => ({
  URI,
  map,
  ap<A, B>(fab: Tuple<L, (b: A) => B>, fa: Tuple<L, A>): Tuple<L, B> {
    return new Tuple([S.concat(fa.fst())(fab.fst()), fab.snd()(fa.snd())])
  }
})

export const getApplicative = <L>(monoidA: Monoid<L>): Applicative<URI> => {
  const empty = monoidA.empty()
  return {
    ...getApply(monoidA),
    of<A>(a: A): Tuple<L, A> {
      return new Tuple([empty, a])
    }
  }
}

export const getChain = <L>(M: Monoid<L>): Chain<URI> => ({
  ...getApply(M),
  chain<A, B>(f: (b: A) => Tuple<L, B>, fa: Tuple<L, A>): Tuple<L, B> {
    const lb = f(fa.snd())
    return new Tuple([M.concat(fa.fst())(lb.fst()), lb.snd()])
  }
})

export const getMonad = <L>(M: Monoid<L>): Monad<URI> => {
  const empty = M.empty()
  return {
    ...getChain(M),
    of<B>(b: B): Tuple<L, B> {
      return new Tuple([empty, b])
    }
  }
}

export const chainRec = <L>(M: Monoid<L>) => <A, B>(f: (a: A) => Tuple<L, Either<A, B>>, a: A): Tuple<L, B> => {
  let result = f(a)
  let acc = M.empty()
  while (isLeft(result.snd())) {
    acc = M.concat(acc)(result.fst())
    result = f((result.snd() as Left<A, B>).value)
  }
  return new Tuple([M.concat(acc)(result.fst()), (result.snd() as Right<A, B>).value])
}

export const getChainRec = <L>(M: Monoid<L>): ChainRec<URI> => ({
  ...getChain(M),
  chainRec: chainRec(M)
})

export class Ops {
  traverse<F extends HKT2S>(
    F: Applicative<F>
  ): <M, L, A, B>(f: (a: A) => HKT2As<F, M, B>, ta: Tuple<L, A>) => HKT2As<F, M, Tuple<L, B>>
  traverse<F extends HKTS>(
    F: Applicative<F>
  ): <L, A, B>(f: (a: A) => HKTAs<F, B>, ta: Tuple<L, A>) => HKTAs<F, Tuple<L, B>>
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Tuple<L, A>) => HKT<F, Tuple<L, B>>
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Tuple<L, A>) => HKT<F, Tuple<L, B>> {
    return (f, ta) => ta.traverse(F)(f)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse

/** Exchange the first and second components of a tuple. */
export const swap = <L, A>(fa: Tuple<L, A>): Tuple<A, L> => new Tuple([fa.snd(), fa.fst()])

export const tuple: Semigroupoid<URI> & Bifunctor<URI> & Comonad<URI> & Foldable<URI> & Traversable<URI> = {
  URI,
  compose,
  map,
  bimap,
  extract,
  extend,
  reduce,
  traverse
}
