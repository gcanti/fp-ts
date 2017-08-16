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
  static of = of
  static empty = empty
  static zero = zero
  static value: Option<never> = new None()
  readonly _tag: 'None' = 'None'
  readonly _A: A
  readonly _URI: URI
  private constructor() {}
  map<B>(f: (a: A) => B): Option<B> {
    return none
  }
  of<B>(b: B): Option<B> {
    return of(b)
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
  zero<B>(): Option<B> {
    return zero()
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
  concat(semigroup: Semigroup<A>, fy: Option<A>): Option<A> {
    return fy
  }
  equals(setoid: Setoid<A>, fy: Option<A>): boolean {
    return fy.fold(constTrue, constFalse)
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

export function zero<A>(): Option<A> {
  return none
}

export function empty<A>(): Option<A> {
  return none
}

export class Some<A>
  implements FantasyMonad<URI, A>,
    FantasyFoldable<A>,
    FantasyTraversable<URI, A>,
    FantasyFilterable<URI, A>,
    FantasyWitherable<URI, A>,
    FantasyAlternative<URI, A>,
    FantasyExtend<URI, A> {
  static of = of
  static empty = empty
  static zero = zero
  readonly _tag: 'Some' = 'Some'
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: A) {}
  map<B>(f: (a: A) => B): Option<B> {
    return new Some(f(this.value))
  }
  of<B>(b: B): Option<B> {
    return of(b)
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
  zero<B>(): Option<B> {
    return zero<B>()
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
  concat(semigroup: Semigroup<A>, fy: Option<A>): Option<A> {
    return fy.fold(() => this, y => new Some(semigroup.concat(this.value)(y)))
  }
  equals(setoid: Setoid<A>, fy: Option<A>): boolean {
    return fy.fold(constFalse, y => setoid.equals(this.value)(y))
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

export function equals<A>(setoid: Setoid<A>, fx: Option<A>, fy: Option<A>): boolean {
  return fx.equals(setoid, fy)
}

export function getSetoid<A>(setoid: Setoid<A>): Setoid<Option<A>> {
  return {
    equals: x => y => equals(setoid, x, y)
  }
}

export function fold<A, B>(n: Lazy<B>, s: (a: A) => B, fa: Option<A>): B {
  return fa.fold(n, s)
}

/** Takes a default value, and a `Option` value. If the `Option` value is
 * `None` the default value is returned, otherwise the value inside the
 * `Some` is returned
 */
export function fromOption<A>(a: A, fa: Option<A>): A {
  return fa.getOrElse(() => a)
}

export function fromNullable<A>(a: A | null | undefined): Option<A> {
  return a == null ? none : new Some(a)
}

export function toNullable<A>(fa: Option<A>): A | null {
  return fa.toNullable()
}

export function map<A, B>(f: (a: A) => B, fa: Option<A>): Option<B> {
  return fa.map(f)
}

export function of<A>(a: A): Option<A> {
  return new Some(a)
}

export function ap<A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> {
  return fa.ap(fab)
}

export function chain<A, B>(f: (a: A) => Option<B>, fa: Option<A>): Option<B> {
  return fa.chain(f)
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: Option<A>): B {
  return fa.reduce(f, b)
}

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

export function alt(fx: Option<never>): <A>(fy: Option<A>) => Option<A>
export function alt<A>(fx: Option<A>): (fy: Option<A>) => Option<A>
export function alt<A>(fx: Option<A>): (fy: Option<A>) => Option<A> {
  return fy => fx.alt(fy)
}

export function extend<A, B>(f: (ea: Option<A>) => B, ea: Option<A>): Option<B> {
  return ea.extend(f)
}

const first = { empty, concat: alt }
const last = getDualMonoid(first)

/** Maybe monoid returning the left-most non-None value */
export function getFirstMonoid<A>(): Monoid<Option<A>> {
  return first
}

/** Maybe monoid returning the right-most non-None value */
export function getLastMonoid<A>(): Monoid<Option<A>> {
  return last
}

export function concat<A>(semigroup: Semigroup<A>, fx: Option<A>, fy: Option<A>): Option<A> {
  return fx.concat(semigroup, fy)
}

export function getSemigroup<A>(semigroup: Semigroup<A>): Semigroup<Option<A>> {
  return { concat: fx => fy => concat(semigroup, fx, fy) }
}

export function getMonoid<A>(semigroup: Semigroup<A>): Monoid<Option<A>> {
  return { empty, concat: getSemigroup(semigroup).concat }
}

export function isSome<A>(fa: Option<A>): fa is Some<A> {
  return fa._tag === 'Some'
}

export function isNone<A>(fa: Option<A>): fa is None<A> {
  return fa === none
}

export const some = of

export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A> {
  return a => (predicate(a) ? some<A>(a) : none)
}

export function partitionMap<A, L, R>(f: (a: A) => Either<L, R>, fa: Option<A>): { left: Option<L>; right: Option<R> } {
  return fa.partitionMap(f)
}

export function wilt<M>(
  M: Applicative<M>
): <A, L, R>(f: (a: A) => HKT<M, Either<L, R>>, ta: Option<A>) => HKT<M, { left: Option<L>; right: Option<R> }> {
  return <A, L, R>(f: (a: A) => HKT<M, Either<L, R>>, ta: Option<A>) => ta.wilt(M)(f)
}

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
