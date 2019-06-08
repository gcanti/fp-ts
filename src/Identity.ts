import { Alt1 } from './Alt'
import { Applicative } from './Applicative'
import { ChainRec1, tailRec } from './ChainRec'
import { Comonad1 } from './Comonad'
import { Either } from './Either'
import { Foldable2v1 } from './Foldable2v'
import { Lazy, toString } from './function'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { fromEquals, Eq } from './Eq'
import { Show } from './Show'
import { Traversable2v1 } from './Traversable2v'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URI2HKT<A> {
    Identity: Identity<A>
  }
}

export const URI = 'Identity'

export type URI = typeof URI

/**
 * @since 1.0.0
 */
export class Identity<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly value: A) {}
  /** @obsolete */
  map<B>(f: (a: A) => B): Identity<B> {
    return new Identity(f(this.value))
  }
  /** @obsolete */
  ap<B>(fab: Identity<(a: A) => B>): Identity<B> {
    return this.map(fab.value)
  }
  /**
   * Flipped version of `ap`
   * @obsolete
   */
  ap_<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C> {
    return fb.ap(this)
  }
  /** @obsolete */
  chain<B>(f: (a: A) => Identity<B>): Identity<B> {
    return f(this.value)
  }
  /** @obsolete */
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.value)
  }
  /** @obsolete */
  alt(fx: Identity<A>): Identity<A> {
    return this
  }

  /**
   * Lazy version of `alt`
   *
   * @example
   * import { Identity } from 'fp-ts/lib/Identity'
   *
   * const a = new Identity(1)
   * assert.deepStrictEqual(a.orElse(() => new Identity(2)), a)
   *
   * @since 1.6.0
   * @obsolete
   */
  orElse(fx: Lazy<Identity<A>>): Identity<A> {
    return this
  }
  /** @obsolete */
  extract(): A {
    return this.value
  }
  /** @obsolete */
  extend<B>(f: (ea: Identity<A>) => B): Identity<B> {
    return identity.of(f(this))
  }
  /** @obsolete */
  fold<B>(f: (a: A) => B): B {
    return f(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    // tslint:disable-next-line: deprecation
    return `new Identity(${toString(this.value)})`
  }
}

/**
 * @since 1.17.0
 */
export const getShow = <A>(S: Show<A>): Show<Identity<A>> => {
  return {
    show: i => `new Identity(${S.show(i.value)})`
  }
}

/**
 * Use `getEq`
 *
 * @since 1.0.0
 * @deprecated
 */
export const getSetoid: <A>(E: Eq<A>) => Eq<Identity<A>> = getEq

/**
 * @since 1.19.0
 */
export function getEq<A>(E: Eq<A>): Eq<Identity<A>> {
  return fromEquals((x, y) => E.equals(x.value, y.value))
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
  map: (fa, f) => fa.map(f),
  of: a => new Identity(a),
  ap: (fab, fa) => fa.ap(fab),
  chain: (fa, f) => fa.chain(f),
  reduce: (fa, b, f) => fa.reduce(b, f),
  foldMap: _ => (fa, f) => f(fa.value),
  foldr: (fa, b, f) => f(fa.value, b),
  traverse: <F>(F: Applicative<F>) => <A, B>(ta: Identity<A>, f: (a: A) => HKT<F, B>): HKT<F, Identity<B>> => {
    return F.map(f(ta.value), identity.of)
  },
  sequence: <F>(F: Applicative<F>) => <A>(ta: Identity<HKT<F, A>>): HKT<F, Identity<A>> => {
    return F.map(ta.value, identity.of)
  },
  alt: (fx, fy) => fx.alt(fy),
  extract: wa => wa.extract(),
  extend: (wa, f) => wa.extend(f),
  chainRec: <A, B>(a: A, f: (a: A) => Identity<Either<A, B>>): Identity<B> => {
    return new Identity(tailRec(a => f(a).value, a))
  }
}

//
// backporting
//

const {
  alt,
  ap,
  apFirst,
  apSecond,
  chain,
  chainFirst,
  duplicate,
  extend,
  flatten,
  foldMap,
  map,
  reduce,
  reduceRight
} = pipeable(identity)

export { alt, ap, apFirst, apSecond, chain, chainFirst, duplicate, extend, flatten, foldMap, map, reduce, reduceRight }
