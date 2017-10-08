import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Monoid, getDualMonoid } from './Monoid'
import { Applicative } from './Applicative'
import { Semigroup } from './Semigroup'
import { Monad, FantasyMonad } from './Monad'
import { Foldable, FantasyFoldable } from './Foldable'
import { Plus } from './Plus'
import { Extend, FantasyExtend } from './Extend'
import { Setoid } from './Setoid'
import { Traversable, FantasyTraversable } from './Traversable'
import { Alternative, FantasyAlternative } from './Alternative'
import { constant, Lazy, Predicate, toString } from './function'

declare module './HKT' {
  interface URI2HKT<A> {
    Option: Option<A>
  }
}

export const URI = 'Option'

export type URI = typeof URI

export type Option<A> = None<A> | Some<A>

export class None<A>
  implements FantasyMonad<URI, A>,
    FantasyFoldable<A>,
    FantasyTraversable<URI, A>,
    FantasyAlternative<URI, A>,
    FantasyExtend<URI, A> {
  static value: Option<never> = new None()
  readonly _tag: 'None' = 'None'
  readonly _A: A
  readonly _URI: URI
  private constructor() {}
  map<B>(f: (a: A) => B): Option<B> {
    return none
  }
  /** Maps `f` over this Option's value. If the value returned from `f` is null or undefined, returns `None` */
  mapNullable<B>(f: (a: A) => B | null | undefined): Option<B> {
    return none
  }
  ap<B>(fab: Option<(a: A) => B>): Option<B> {
    return none
  }
  ap_<B, C>(this: Option<(a: B) => C>, fb: Option<B>): Option<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Option<B>): Option<B> {
    return none
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <L, B>(f: (a: A) => HKT2As<F, L, B>) => HKT2As<F, L, Option<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, Option<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Option<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Option<B>> {
    return f => F.of(none)
  }
  alt(fa: Option<A>): Option<A> {
    return fa
  }
  extend<B>(f: (ea: Option<A>) => B): Option<B> {
    return none
  }
  fold<B>(n: Lazy<B>, s: (a: A) => B): B {
    return n()
  }
  getOrElseValue(a: A): A {
    return a
  }
  getOrElse(f: Lazy<A>): A {
    return f()
  }
  toNullable(): A | null {
    return null
  }
  toUndefined(): A | undefined {
    return undefined
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return 'none'
  }
  /** Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise */
  contains(S: Setoid<A>, a: A): boolean {
    return false
  }
  /** Returns `true` if the option is `None`, false otherwise. */
  isNone(): boolean {
    return true
  }
  /** Returns `true` if the option is an instance of `Some`, `false` otherwise */
  isSome(): boolean {
    return false
  }
  /** Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value */
  exists(p: (a: A) => boolean): boolean {
    return false
  }
  /** Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value. Otherwise returns `None` */
  filter(p: Predicate<A>): Option<A> {
    return none
  }
}

export const none = None.value

export class Some<A>
  implements FantasyMonad<URI, A>,
    FantasyFoldable<A>,
    FantasyTraversable<URI, A>,
    FantasyAlternative<URI, A>,
    FantasyExtend<URI, A> {
  readonly _tag: 'Some' = 'Some'
  readonly _A: A
  readonly _URI: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Option<B> {
    return new Some(f(this.value))
  }
  /** Maps `f` over this Option's value. If the value returned from `f` is null or undefined, returns `None` */
  mapNullable<B>(f: (a: A) => B | null | undefined): Option<B> {
    return fromNullable(f(this.value))
  }
  ap<B>(fab: Option<(a: A) => B>): Option<B> {
    return fab.map(f => f(this.value))
  }
  ap_<B, C>(this: Option<(a: B) => C>, fb: Option<B>): Option<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Option<B>): Option<B> {
    return f(this.value)
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return this.fold(constant(b), a => f(b, a))
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <L, B>(f: (a: A) => HKT2As<F, L, B>) => HKT2As<F, L, Option<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, Option<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Option<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Option<B>> {
    return f => F.map(b => some(b), f(this.value))
  }
  alt(fa: Option<A>): Option<A> {
    return this
  }
  extend<B>(f: (ea: Option<A>) => B): Option<B> {
    return new Some(f(this))
  }
  fold<B>(n: Lazy<B>, s: (a: A) => B): B {
    return s(this.value)
  }
  getOrElseValue(a: A): A {
    return this.value
  }
  getOrElse(f: Lazy<A>): A {
    return this.value
  }
  toNullable(): A | null {
    return this.value
  }
  toUndefined(): A | undefined {
    return this.value
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `some(${toString(this.value)})`
  }
  /** Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise */
  contains(S: Setoid<A>, a: A): boolean {
    return S.equals(this.value)(a)
  }
  /** Returns `true` if the option is `None`, false otherwise */
  isNone(): boolean {
    return false
  }
  /** Returns `true` if the option is an instance of `Some`, `false` otherwise */
  isSome(): boolean {
    return true
  }
  /** Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value */
  exists(p: (a: A) => boolean): boolean {
    return p(this.value)
  }
  /** Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value. Otherwise returns `None` */
  filter(p: Predicate<A>): Option<A> {
    return this.exists(p) ? this : none
  }
}

export const fold = <A, B>(n: Lazy<B>, s: (a: A) => B) => (fa: Option<A>): B => fa.fold(n, s)

export const getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>> => ({
  equals: x => y => x.fold(() => y.isNone(), ax => y.fold(() => false, ay => S.equals(ax)(ay)))
})

export const map = <A, B>(f: (a: A) => B, fa: Option<A>): Option<B> => fa.map(f)

/** Maps `f` over this Option's value. If the value returned from `f` is null or undefined, returns `None` */
export const mapNullable = <A, B>(f: (a: A) => B | null | undefined, fa: Option<A>): Option<B> => fa.mapNullable(f)

export const of = <A>(a: A): Option<A> => new Some(a)

export const ap = <A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> => fa.ap(fab)

export const chain = <A, B>(f: (a: A) => Option<B>, fa: Option<A>): Option<B> => fa.chain(f)

export const reduce = <A, B>(f: (b: B, a: A) => B, b: B, fa: Option<A>): B => fa.reduce(f, b)

/** Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value. Otherwise returns none */
export const filter = <A>(p: Predicate<A>) => (fa: Option<A>): Option<A> => fa.filter(p)

export const alt = <A>(fx: Option<A>, fy: Option<A>): Option<A> => fx.alt(fy)

export const extend = <A, B>(f: (ea: Option<A>) => B, ea: Option<A>): Option<B> => ea.extend(f)

export const zero = <A>(): Option<A> => none

export const empty = zero

/** Option monoid returning the left-most non-None value */
export const getFirstMonoid = <A>(): Monoid<Option<A>> => ({
  concat: x => y => alt(x, y),
  empty
})

/** Option monoid returning the right-most non-None value */
export const getLastMonoid = <A>(): Monoid<Option<A>> => getDualMonoid(getFirstMonoid())

export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Option<A>> => ({
  concat: x => y => x.fold(() => y, ax => y.fold(() => x, ay => some(S.concat(ax)(ay))))
})

export const getMonoid = <A>(S: Semigroup<A>): Monoid<Option<A>> => ({ ...getSemigroup(S), empty })

export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === 'Some'

export const isNone = <A>(fa: Option<A>): fa is None<A> => fa === none

/**
 * Takes a default value, and a `Option` value. If the `Option` value is
 * `None` the default value is returned, otherwise the value inside the
 * `Some` is returned
 */
export const getOrElseValue = <A>(a: A) => (fa: Option<A>): A => fa.getOrElseValue(a)

export const getOrElse = <A>(f: Lazy<A>) => (fa: Option<A>): A => fa.getOrElse(f)

export const fromNullable = <A>(a: A | null | undefined): Option<A> => (a == null ? none : new Some(a))

export const toNullable = <A>(fa: Option<A>): A | null => fa.toNullable()

export const toUndefined = <A>(fa: Option<A>): A | undefined => fa.toUndefined()

export const some = of

export const fromPredicate = <A>(predicate: Predicate<A>) => (a: A): Option<A> => (predicate(a) ? some(a) : none)

export class Ops {
  traverse<F extends HKT2S>(
    F: Applicative<F>
  ): <L, A, B>(f: (a: A) => HKT2As<F, L, B>, ta: Option<A>) => HKT2As<F, L, Option<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <A, B>(f: (a: A) => HKTAs<F, B>, ta: Option<A>) => HKTAs<F, Option<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: HKT<URI, A>) => HKT<F, Option<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Option<A>) => HKT<F, Option<B>> {
    return (f, ta) => ta.traverse(F)(f)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse

export const option: Monad<URI> & Foldable<URI> & Plus<URI> & Traversable<URI> & Alternative<URI> & Extend<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  traverse,
  zero,
  alt,
  extend
}
