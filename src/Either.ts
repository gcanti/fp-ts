import { HKT, HKTS, HKT2S, HKT2, HKTAs, HKT2As } from './HKT'
import { Applicative } from './Applicative'
import { Monad, FantasyMonad } from './Monad'
import { Foldable, FantasyFoldable } from './Foldable'
import { Extend, FantasyExtend } from './Extend'
import { Setoid } from './Setoid'
import { Traversable, FantasyTraversable } from './Traversable'
import { Bifunctor, FantasyBifunctor } from './Bifunctor'
import { Alt, FantasyAlt } from './Alt'
import { ChainRec, tailRec } from './ChainRec'
import { Option, none, some } from './Option'
import { constFalse, Predicate, Lazy, toString } from './function'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Either: Either<L, A>
  }
}

export const URI = 'Either'

export type URI = typeof URI

export type Either<L, A> = Left<L, A> | Right<L, A>

export class Left<L, A>
  implements FantasyMonad<URI, A>,
    FantasyFoldable<A>,
    FantasyTraversable<URI, A>,
    FantasyAlt<URI, A>,
    FantasyExtend<URI, A>,
    FantasyBifunctor<URI, L, A> {
  readonly _tag: 'Left' = 'Left'
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(readonly value: L) {}
  map<B>(f: (a: A) => B): Either<L, B> {
    return this as any
  }
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    return (isLeft(fab) ? fab : this) as any
  }
  ap_<B, C>(this: Either<L, (a: B) => C>, fb: Either<L, B>): Either<L, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return this as any
  }
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B> {
    return new Left(f(this.value))
  }
  alt(fy: Either<L, A>): Either<L, A> {
    return fy
  }
  extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> {
    return this as any
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2<F, M, B>) => HKT2As<F, M, Either<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKTAs<F, Either<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>> {
    return f => F.of(this as any)
  }
  fold<B>(left: (l: L) => B, right: (a: A) => B): B {
    return left(this.value)
  }
  getOrElseValue(a: A): A {
    return a
  }
  /** Returns the value from this `Right` or the given argument if this is a `Left` */
  getOrElse(f: (l: L) => A): A {
    return f(this.value)
  }
  mapLeft<M>(f: (l: L) => M): Either<M, A> {
    return left(f(this.value))
  }
  toOption(): Option<A> {
    return none
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `left(${toString(this.value)})`
  }
}

export class Right<L, A>
  implements FantasyMonad<URI, A>,
    FantasyFoldable<A>,
    FantasyTraversable<URI, A>,
    FantasyAlt<URI, A>,
    FantasyExtend<URI, A> {
  readonly _tag: 'Right' = 'Right'
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Either<L, B> {
    return new Right(f(this.value))
  }
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    if (isRight(fab)) {
      return this.map(fab.value)
    }
    return fab as any
  }
  ap_<B, C>(this: Either<L, (a: B) => C>, fb: Either<L, B>): Either<L, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return f(this.value)
  }
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B> {
    return new Right(g(this.value))
  }
  alt(fy: Either<L, A>): Either<L, A> {
    return this
  }
  extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> {
    return new Right(f(this))
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2<F, M, B>) => HKT2As<F, M, Either<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKTAs<F, Either<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>> {
    return f => F.map(b => of(b), f(this.value))
  }
  fold<B>(left: (l: L) => B, right: (a: A) => B): B {
    return right(this.value)
  }
  getOrElseValue(a: A): A {
    return this.value
  }
  /** Returns the value from this `Right` or the given argument if this is a `Left` */
  getOrElse(f: (l: L) => A): A {
    return this.value
  }
  mapLeft<M>(f: (l: L) => M): Either<M, A> {
    return this as any
  }
  toOption(): Option<A> {
    return some(this.value)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `right(${toString(this.value)})`
  }
}

export const fold = <L, A, B>(left: (l: L) => B, right: (a: A) => B) => (fa: Either<L, A>): B => fa.fold(left, right)

export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Either<L, A>> => ({
  equals: x => y =>
    x.fold(lx => y.fold(ly => SL.equals(lx)(ly), constFalse), ax => y.fold(constFalse, ay => SA.equals(ax)(ay)))
})

/** Returns the value from this `Right` or the given argument if this is a `Left` */
export const getOrElseValue = <L, A>(a: A) => (fa: Either<L, A>): A => fa.getOrElseValue(a)

/** Returns the value from this `Right` or the given argument if this is a `Left` */
export const getOrElse = <L, A>(f: (l: L) => A) => (fa: Either<L, A>): A => fa.getOrElse(f)

export const map = <L, A, B>(f: (a: A) => B, fa: Either<L, A>): Either<L, B> => fa.map(f)

export const of = <L, A>(a: A): Either<L, A> => new Right(a)

export const ap = <L, A, B>(fab: Either<L, (a: A) => B>, fa: Either<L, A>): Either<L, B> => fa.ap(fab)

export const chain = <L, A, B>(f: (a: A) => Either<L, B>, fa: Either<L, A>): Either<L, B> => fa.chain(f)

export const bimap = <L, V, A, B>(f: (u: L) => V, g: (a: A) => B, fla: Either<L, A>): Either<V, B> => fla.bimap(f, g)

export const alt = <L, A>(fx: Either<L, A>, fy: Either<L, A>): Either<L, A> => fx.alt(fy)

export const extend = <L, A, B>(f: (ea: Either<L, A>) => B, ea: Either<L, A>): Either<L, B> => ea.extend(f)

export const reduce = <L, A, B>(f: (b: B, a: A) => B, b: B, fa: Either<L, A>): B => fa.reduce(f, b)

export class Ops {
  traverse<F extends HKT2S>(
    F: Applicative<F>
  ): <M, L, A, B>(f: (a: A) => HKT2<F, M, B>, ta: Either<L, A>) => HKT2As<F, M, Either<L, B>>
  traverse<F extends HKTS>(
    F: Applicative<F>
  ): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Either<L, A>) => HKTAs<F, Either<L, B>>
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: HKT<URI, A>) => HKT<F, Either<L, B>>
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Either<L, A>) => HKT<F, Either<L, B>> {
    return (f, ta) => ta.traverse(F)(f)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse

export const chainRec = <L, A, B>(f: (a: A) => Either<L, Either<A, B>>, a: A): Either<L, B> =>
  tailRec(e => e.fold(l => right(left(l)), r => r.fold(a => left(f(a)), b => right(right(b)))), f(a))

export const isLeft = <L, A>(fa: Either<L, A>): fa is Left<L, A> => fa._tag === 'Left'

export const isRight = <L, A>(fa: Either<L, A>): fa is Right<L, A> => fa._tag === 'Right'

export const left = <L, A>(l: L): Either<L, A> => new Left(l)

export const right = of

export const fromPredicate = <L, A>(predicate: Predicate<A>, l: (a: A) => L) => (a: A): Either<L, A> =>
  predicate(a) ? right(a) : left(l(a))

export const mapLeft = <L, M>(f: (l: L) => M) => <A>(fa: Either<L, A>): Either<M, A> => fa.mapLeft(f)

/**
 * Takes a default and a `Option` value, if the value is a `Some`, turn it into
 * a `Right`, if the value is a `None` use the provided default as a `Left`
 */
export const fromOption = <L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A> =>
  fa.fold(() => left(defaultValue), a => right(a))

/**
 * Takes a default and a nullable value, if the value is not nully, turn it into
 * a `Right`, if the value is nully use the provided default as a `Left`
 */
export const fromNullable = <L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A> =>
  a == null ? left(defaultValue) : right(a)

export const toOption = <L, A>(fa: Either<L, A>): Option<A> => fa.toOption()

export const tryCatch = <A>(f: Lazy<A>): Either<Error, A> => {
  try {
    return right(f())
  } catch (e) {
    return left(e)
  }
}

export const either: Monad<URI> &
  Foldable<URI> &
  Traversable<URI> &
  Bifunctor<URI> &
  Alt<URI> &
  Extend<URI> &
  ChainRec<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  traverse,
  bimap,
  alt,
  extend,
  chainRec
}
