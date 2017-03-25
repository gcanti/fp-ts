import { HKT } from './HKT'
import { StaticMonad, FantasyMonad } from './Monad'
import { StaticMonoid } from './Monoid'
import { StaticSemigroup } from './Semigroup'
import { StaticFoldable, FantasyFoldable } from './Foldable'
import { StaticApplicative } from './Applicative'
import { StaticTraversable, FantasyTraversable } from './Traversable'
import { Function1, Function2, Function3, Function4, Curried2, Curried3, Curried4, Kleisli } from './function'
import * as array from './Array'
import { Option, some, none } from './Option'

export type URI = 'NonEmptyArray'

export type HKTNonEmptyArray<A> = HKT<URI, A>

export class NonEmptyArray<A> implements
  FantasyMonad<URI, A>,
  FantasyFoldable<URI, A>,
  FantasyTraversable<URI, A> {

  readonly _hkt: URI
  readonly _hkta: A
  constructor(public readonly head: A, public readonly tail: Array<A>) {}
  toArray(): Array<A> {
    return [this.head].concat(this.tail)
  }
  concatArray(as: Array<A>): NonEmptyArray<A> {
    return new NonEmptyArray(this.head, this.tail.concat(as))
  }
  map<B>(f: Function1<A, B>): NonEmptyArray<B> {
    return new NonEmptyArray(f(this.head), this.tail.map(f))
  }
  of<B>(b: B): NonEmptyArray<B> {
    return of(b)
  }
  ap<B>(fab: NonEmptyArray<Function1<A, B>>): NonEmptyArray<B> {
    return fab.chain(f => map(f, this)) // <= derived
  }
  chain<B>(f: Function1<A, NonEmptyArray<B>>): NonEmptyArray<B> {
    return f(this.head).concatArray(array.chain(a => f(a).toArray(), this.tail))
  }
  concat(y: NonEmptyArray<A>): NonEmptyArray<A> {
    return this.concatArray(y.toArray())
  }
  reduce<B>(f: Function2<B, A, B>, b: B): B {
    return array.reduce(f, b, this.toArray())
  }
  traverse<F, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, NonEmptyArray<B>> {
    return applicative.map(as => unsafeFromArray(as), array.traverse(applicative, f, this.toArray()))
  }
}

export function to<A>(fa: HKTNonEmptyArray<A>): NonEmptyArray<A> {
  return fa as NonEmptyArray<A>
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

export function of<A>(a: A): NonEmptyArray<A> {
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

export function traverse<F, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: HKTNonEmptyArray<A>): HKT<F, NonEmptyArray<B>> {
  return (ta as NonEmptyArray<A>).traverse(applicative, f)
}

declare module './Functor' {
  interface FunctorOps {
    map<A, B>(f: Function1<A, B>, fa: FantasyFunctor<URI, A>): NonEmptyArray<B>
    lift<A, B>(functor: StaticFunctor<URI>, f: Function1<A, B>): Function1<NonEmptyArray<A>, NonEmptyArray<B>>
  }
}

declare module './Apply' {
  interface ApplyOps {
    ap<A, B>(fab: NonEmptyArray<Function1<A, B>>, fa: FantasyApply<URI, A>): NonEmptyArray<B>
    liftA2<A, B, C>(apply: StaticApply<URI>, f: Curried2<A, B, C>): Function2<NonEmptyArray<A>, NonEmptyArray<B>, NonEmptyArray<C>>
    liftA3<A, B, C, D>(apply: StaticApply<URI>, f: Curried3<A, B, C, D>): Function3<NonEmptyArray<A>, NonEmptyArray<B>, NonEmptyArray<C>, NonEmptyArray<D>>
    liftA4<A, B, C, D, E>(apply: StaticApply<URI>, f: Curried4<A, B, C, D, E>): Function4<NonEmptyArray<A>, NonEmptyArray<B>, NonEmptyArray<C>, NonEmptyArray<D>, Option<E>>
  }
}

declare module './Chain' {
  interface MonadOps {
    chain<A, B>(f: Kleisli<URI, A, B>, fa: FantasyMonad<URI, A>): NonEmptyArray<B>
    flatten<A>(mma: NonEmptyArray<NonEmptyArray<A>>): NonEmptyArray<A>
  }
}

declare module './Foldable' {
  interface FoldableOps {
    reduce<A, B>(f: Function2<B, A, B>, b: B, fa: FantasyFoldable<URI, A>): B
    foldMap<M, A>(monoid: StaticMonoid<M>, f: Function1<A, M>, fa: FantasyFoldable<URI, A>): M
    foldMapS<M, A>(foldable: StaticFoldable<URI>, monoid: StaticMonoid<M>, f: Function1<A, M>, fa: HKTNonEmptyArray<A>): M
  }
}

declare module './Traversable' {
  interface TraversableOps {
    traverse<F, T, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: FantasyTraversable<URI, A>): HKT<F, NonEmptyArray<B>>

    sequence<F, A>(
    applicative: StaticApplicative<F>,
    tfa: FantasyTraversable<URI, HKT<F, A>>): HKT<F, NonEmptyArray<A>>

    sequenceS<F, T, A>(
    applicative: StaticApplicative<F>,
    traversable: StaticTraversable<URI>,
    tfa: HKTNonEmptyArray<HKT<F, A>>): HKT<F, HKT<T, A>>
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, concat, reduce, traverse } as (
    StaticMonad<URI> &
    StaticSemigroup<any> &
    StaticFoldable<URI> &
    StaticTraversable<URI>
  )
)
