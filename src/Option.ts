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
import { Filterable, FantasyFilterable } from './Filterable'
import { Either } from './Either'
import { Witherable, FantasyWitherable } from './Witherable'
import { constant, constFalse, constTrue, Lazy, Predicate, toString } from './function'

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
    FantasyFilterable<URI, A>,
    FantasyWitherable<URI, A>,
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
  partitionMap<L, R>(f: (a: A) => Either<L, R>): { left: Option<L>; right: Option<R> } {
    return { left: none, right: none }
  }
  wilt<M>(
    M: Applicative<M>
  ): <L, R>(f: (a: A) => HKT<M, Either<L, R>>) => HKT<M, { left: Option<L>; right: Option<R> }> {
    return <L, R>(f: (a: A) => HKT<M, Either<L, R>>) => M.of({ left: none, right: none })
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
  getOrElse(f: Lazy<A>): A {
    return f()
  }
  concat(S: Semigroup<A>): (fy: Option<A>) => Option<A> {
    return fy => fy
  }
  equals(S: Setoid<A>): (fy: Option<A>) => boolean {
    return fy => fy.fold(constTrue, constFalse)
  }
  toNullable(): A | null {
    return null
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return 'none'
  }
  contains(setoid: Setoid<A>, a: A): boolean {
    return false
  }
  isNone(): boolean {
    return true
  }
  isSome(): boolean {
    return false
  }
  exists(p: (a: A) => boolean): boolean {
    return false
  }
}

export const none = None.value

export class Some<A>
  implements FantasyMonad<URI, A>,
    FantasyFoldable<A>,
    FantasyTraversable<URI, A>,
    FantasyFilterable<URI, A>,
    FantasyWitherable<URI, A>,
    FantasyAlternative<URI, A>,
    FantasyExtend<URI, A> {
  readonly _tag: 'Some' = 'Some'
  readonly _A: A
  readonly _URI: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Option<B> {
    return new Some(f(this.value))
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
  partitionMap<L, R>(f: (a: A) => Either<L, R>): { left: Option<L>; right: Option<R> } {
    return f(this.value).fold<{ left: Option<L>; right: Option<R> }>(
      l => ({ left: some(l), right: none }),
      a => ({ left: none, right: some(a) })
    )
  }
  wilt<M>(
    M: Applicative<M>
  ): <L, R>(f: (a: A) => HKT<M, Either<L, R>>) => HKT<M, { left: Option<L>; right: Option<R> }> {
    return <L, R>(f: (a: A) => HKT<M, Either<L, R>>) =>
      M.map(
        e =>
          e.fold<{ left: Option<L>; right: Option<R> }>(
            l => ({ left: some(l), right: none }),
            r => ({ left: none, right: some(r) })
          ),
        f(this.value)
      )
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
  getOrElse(f: Lazy<A>): A {
    return this.value
  }
  concat(S: Semigroup<A>): (fy: Option<A>) => Option<A> {
    return fy => fy.fold(() => this, y => new Some(S.concat(this.value)(y)))
  }
  equals(S: Setoid<A>): (fy: Option<A>) => boolean {
    return fy => fy.fold(constFalse, y => S.equals(this.value)(y))
  }
  toNullable(): A | null {
    return this.value
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `some(${toString(this.value)})`
  }
  contains(setoid: Setoid<A>, a: A): boolean {
    return setoid.equals(this.value)(a)
  }
  isNone(): boolean {
    return false
  }
  isSome(): boolean {
    return true
  }
  exists(p: (a: A) => boolean): boolean {
    return p(this.value)
  }
}

export const equals = <A>(S: Setoid<A>) => (fx: Option<A>) => (fy: Option<A>): boolean => fx.equals(S)(fy)

export const getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>> => ({
  equals: equals(S)
})

export const map = <A, B>(f: (a: A) => B, fa: Option<A>): Option<B> => fa.map(f)

export const of = <A>(a: A): Option<A> => new Some(a)

export const ap = <A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> => fa.ap(fab)

export const chain = <A, B>(f: (a: A) => Option<B>, fa: Option<A>): Option<B> => fa.chain(f)

export const reduce = <A, B>(f: (b: B, a: A) => B, b: B, fa: Option<A>): B => fa.reduce(f, b)

// overload here to support 'none' as first argument
export function alt(fx: Option<never>): <A>(fy: Option<A>) => Option<A>
export function alt<A>(fx: Option<A>): (fy: Option<A>) => Option<A>
export function alt<A>(fx: Option<A>): (fy: Option<A>) => Option<A> {
  return fy => fx.alt(fy)
}

export const extend = <A, B>(f: (ea: Option<A>) => B, ea: Option<A>): Option<B> => ea.extend(f)

export const zero = <A>(): Option<A> => none

export const empty = zero

const first = { empty, concat: alt }
const last = getDualMonoid(first)

/** Maybe monoid returning the left-most non-None value */
export const getFirstMonoid = <A>(): Monoid<Option<A>> => first

/** Maybe monoid returning the right-most non-None value */
export const getLastMonoid = <A>(): Monoid<Option<A>> => last

export const concat = <A>(S: Semigroup<A>) => (fx: Option<A>) => (fy: Option<A>): Option<A> => fx.concat(S)(fy)

export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Option<A>> => ({
  concat: concat(S)
})

export const getMonoid = <A>(S: Semigroup<A>): Monoid<Option<A>> => ({ ...getSemigroup(S), empty })

export const partitionMap = <A, L, R>(
  f: (a: A) => Either<L, R>,
  fa: Option<A>
): { left: Option<L>; right: Option<R> } => fa.partitionMap(f)

export const wilt = <M>(M: Applicative<M>) => <A, L, R>(
  f: (a: A) => HKT<M, Either<L, R>>,
  ta: Option<A>
): HKT<M, { left: Option<L>; right: Option<R> }> => ta.wilt(M)(f)

export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === 'Some'

export const isNone = <A>(fa: Option<A>): fa is None<A> => fa === none

export const fold = <A, B>(n: Lazy<B>, s: (a: A) => B, fa: Option<A>): B => fa.fold(n, s)

/**
 * Takes a default value, and a `Option` value. If the `Option` value is
 * `None` the default value is returned, otherwise the value inside the
 * `Some` is returned
 */
export const fromOption = <A>(a: A) => (fa: Option<A>): A => fa.getOrElse(() => a)

export const fromNullable = <A>(a: A | null | undefined): Option<A> => (a == null ? none : new Some(a))

export const toNullable = <A>(fa: Option<A>): A | null => fa.toNullable()

export const some = of

export const fromPredicate = <A>(predicate: Predicate<A>) => (a: A): Option<A> => (predicate(a) ? some(a) : none)

export class Ops {
  traverse<F extends HKT2S>(
    F: Applicative<F>
  ): <L, A, B>(f: (a: A) => HKT2As<F, L, B>, ta: Option<A>) => HKT2As<F, L, Option<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <A, B>(f: (a: A) => HKTAs<F, B>, ta: Option<A>) => HKTAs<F, Option<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Option<A>) => HKT<F, Option<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Option<A>) => HKT<F, Option<B>> {
    return (f, ta) => ta.traverse(F)(f)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse

export const option: Monad<URI> &
  Foldable<URI> &
  Plus<URI> &
  Traversable<URI> &
  Alternative<URI> &
  Extend<URI> &
  Filterable<URI> &
  Witherable<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  traverse,
  zero,
  alt,
  extend,
  partitionMap,
  wilt
}
