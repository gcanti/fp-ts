import { Comonad2 } from './Comonad'
import { Endomorphism, toString } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3 } from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Store: Store<L, A>
  }
}

export const URI = 'Store'

export type URI = typeof URI

/**
 * @since 1.0.0
 */
export class Store<S, A> {
  readonly _A!: A
  readonly _L!: S
  readonly _URI!: URI
  constructor(readonly peek: (s: S) => A, readonly pos: S) {}
  /**
   * Reposition the focus at the specified position
   * @obsolete
   */
  seek(s: S): Store<S, A> {
    return new Store(this.peek, s)
  }
  /** @obsolete */
  map<B>(f: (a: A) => B): Store<S, B> {
    return new Store(s => f(this.peek(s)), this.pos)
  }
  /** @obsolete */
  extract(): A {
    return this.peek(this.pos)
  }
  /** @obsolete */
  extend<B>(f: (sa: Store<S, A>) => B): Store<S, B> {
    return new Store(s => f(this.seek(s)), this.pos)
  }
  /* istanbul ignore next */
  inspect(): string {
    return this.toString()
  }
  /* istanbul ignore next */
  toString(): string {
    // tslint:disable-next-line: deprecation
    return `new Store(${toString(this.peek)}, ${toString(this.pos)})`
  }
}

/**
 * Extract a value from a position which depends on the current position
 *
 * @since 1.0.0
 */
export function peeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => A {
  return wa => wa.peek(f(wa.pos))
}

/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 1.0.0
 */
export const seeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>): Store<S, A> => {
  return new Store(sa.peek, f(sa.pos))
}

/**
 * Extract a collection of values from positions which depend on the current position
 *
 * @since 1.0.0
 */
export function experiment<F extends URIS3>(
  F: Functor3<F>
): <U, L, S>(f: (s: S) => Type3<F, U, L, S>) => <A>(wa: Store<S, A>) => Type3<F, U, L, A>
export function experiment<F extends URIS2>(
  F: Functor2<F>
): <L, S>(f: (s: S) => Type2<F, L, S>) => <A>(wa: Store<S, A>) => Type2<F, L, A>
export function experiment<F extends URIS2, L>(
  F: Functor2C<F, L>
): <S>(f: (s: S) => Type2<F, L, S>) => <A>(wa: Store<S, A>) => Type2<F, L, A>
export function experiment<F extends URIS>(
  F: Functor1<F>
): <S>(f: (s: S) => Type<F, S>) => <A>(wa: Store<S, A>) => Type<F, A>
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(wa: Store<S, A>) => HKT<F, A>
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(wa: Store<S, A>) => HKT<F, A> {
  return f => wa => F.map(f(wa.pos), s => wa.peek(s))
}

/**
 * @since 1.0.0
 */
export const store: Comonad2<URI> = {
  URI,
  map: (fa, f) => fa.map(f),
  extract: wa => wa.extract(),
  extend: (wa, f) => wa.extend(f)
}

//
// backporting
//

/**
 * Reposition the focus at the specified position
 *
 * @since 1.19.0
 */
export function seek<S>(s: S): <A>(wa: Store<S, A>) => Store<S, A> {
  return wa => new Store(wa.peek, s)
}

const { duplicate, extend, map } = pipeable(store)

export { duplicate, extend, map }
