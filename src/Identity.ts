import { Alt1 } from './Alt'
import { Applicative } from './Applicative'
import { ChainRec1, tailRec } from './ChainRec'
import { Comonad1 } from './Comonad'
import { Either } from './Either_'
import { Foldable2v1 } from './Foldable2v'
import { Lazy, toString } from './function'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { Setoid, fromEquals } from './Setoid'
import { Traversable2v1 } from './Traversable2v'

declare module './HKT' {
  interface URI2HKT<A> {
    Identity: Identity<A>
  }
}

export const URI = 'Identity'

export type URI = typeof URI

/**
 * @data
 * @constructor Identity
 * @since 1.0.0
 */
export class Identity<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Identity<B> {
    return new Identity(f(this.value))
  }
  ap<B>(fab: Identity<(a: A) => B>): Identity<B> {
    return this.map(fab.value)
  }
  /**
   * Flipped version of {@link ap}
   */
  ap_<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Identity<B>): Identity<B> {
    return f(this.value)
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.value)
  }
  alt(fx: Identity<A>): Identity<A> {
    return this
  }

  /**
   * Lazy version of {@link alt}
   *
   * @example
   * import { Identity } from 'fp-ts/lib/Identity'
   *
   * const a = new Identity(1)
   * assert.deepStrictEqual(a.orElse(() => new Identity(2)), a)
   *
   * @since 1.6.0
   */
  orElse(fx: Lazy<Identity<A>>): Identity<A> {
    return this
  }
  extract(): A {
    return this.value
  }
  extend<B>(f: (ea: Identity<A>) => B): Identity<B> {
    return of(f(this))
  }
  fold<B>(f: (a: A) => B): B {
    return f(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Identity(${toString(this.value)})`
  }
}

/**
 * @since 1.0.0
 */
export const getSetoid = <A>(setoid: Setoid<A>): Setoid<Identity<A>> => {
  return fromEquals((x, y) => setoid.equals(x.value, y.value))
}

const map = <A, B>(fa: Identity<A>, f: (a: A) => B): Identity<B> => {
  return fa.map(f)
}

const of = <A>(a: A): Identity<A> => {
  return new Identity(a)
}

const ap = <A, B>(fab: Identity<(a: A) => B>, fa: Identity<A>): Identity<B> => {
  return fa.ap(fab)
}

const chain = <A, B>(fa: Identity<A>, f: (a: A) => Identity<B>): Identity<B> => {
  return fa.chain(f)
}

const reduce = <A, B>(fa: Identity<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const foldMap = <M>(M: Monoid<M>) => <A>(fa: Identity<A>, f: (a: A) => M): M => {
  return f(fa.value)
}

const foldr = <A, B>(fa: Identity<A>, b: B, f: (a: A, b: B) => B): B => {
  return f(fa.value, b)
}

const alt = <A>(fx: Identity<A>, fy: Identity<A>): Identity<A> => {
  return fx.alt(fy)
}

const extend = <A, B>(ea: Identity<A>, f: (ea: Identity<A>) => B): Identity<B> => {
  return ea.extend(f)
}

const extract = <A>(fa: Identity<A>): A => {
  return fa.value
}

const chainRec = <A, B>(a: A, f: (a: A) => Identity<Either<A, B>>): Identity<B> => {
  return new Identity(tailRec(a => f(a).value, a))
}

const traverse = <F>(F: Applicative<F>) => <A, B>(ta: Identity<A>, f: (a: A) => HKT<F, B>): HKT<F, Identity<B>> => {
  return F.map(f(ta.value), of)
}

const sequence = <F>(F: Applicative<F>) => <A>(ta: Identity<HKT<F, A>>): HKT<F, Identity<A>> => {
  return F.map(ta.value, of)
}

/**
 * @since 1.0.0
 */
export const identity: Monad1<URI> &
  Foldable2v1<URI> &
  Traversable2v1<URI> &
  Alt1<URI> &
  Comonad1<URI> &
  ChainRec1<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  foldMap,
  foldr,
  traverse,
  sequence,
  alt,
  extract,
  extend,
  chainRec
}
