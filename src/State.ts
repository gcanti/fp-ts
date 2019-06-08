import { constant, constIdentity } from './function'
import { Monad2 } from './Monad'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    State: State<L, A>
  }
}

export const URI = 'State'

export type URI = typeof URI

/**
 * @since 1.0.0
 */
export class State<S, A> {
  readonly _A!: A
  readonly _L!: S
  readonly _URI!: URI
  constructor(readonly run: (s: S) => [A, S]) {}
  /** @obsolete */
  eval(s: S): A {
    return this.run(s)[0]
  }
  /** @obsolete */
  exec(s: S): S {
    return this.run(s)[1]
  }
  /** @obsolete */
  map<B>(f: (a: A) => B): State<S, B> {
    return new State(s => {
      const [a, s1] = this.run(s)
      return [f(a), s1]
    })
  }
  /** @obsolete */
  ap<B>(fab: State<S, (a: A) => B>): State<S, B> {
    return fab.chain(f => this.map(f)) // <= derived
  }
  /**
   * Flipped version of `ap`
   * @obsolete
   */
  ap_<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C> {
    return fb.ap(this)
  }
  /**
   * Combine two effectful actions, keeping only the result of the first
   * @since 1.7.0
   * @obsolete
   */
  applyFirst<B>(fb: State<S, B>): State<S, A> {
    return fb.ap(this.map(constant))
  }
  /**
   * Combine two effectful actions, keeping only the result of the second
   * @since 1.7.0
   * @obsolete
   */
  applySecond<B>(fb: State<S, B>): State<S, B> {
    // tslint:disable-next-line: deprecation
    return fb.ap(this.map(constIdentity as () => (b: B) => B))
  }
  /** @obsolete */
  chain<B>(f: (a: A) => State<S, B>): State<S, B> {
    return new State(s => {
      const [a, s1] = this.run(s)
      return f(a).run(s1)
    })
  }
}

/**
 * Get the current state
 *
 * @since 1.0.0
 */
export const get = <S>(): State<S, S> => {
  return new State(s => [s, s])
}

/**
 * Set the state
 *
 * @since 1.0.0
 */
export const put = <S>(s: S): State<S, void> => {
  return new State(() => [undefined, s])
}

/**
 * Modify the state by applying a function to the current state
 *
 * @since 1.0.0
 */
export const modify = <S>(f: (s: S) => S): State<S, undefined> => {
  return new State(s => [undefined, f(s)])
}

/**
 * Get a value which depends on the current state
 *
 * @since 1.0.0
 */
export const gets = <S, A>(f: (s: S) => A): State<S, A> => {
  return new State(s => [f(s), s])
}

/**
 * @since 1.0.0
 */
export const state: Monad2<URI> = {
  URI,
  map: (fa, f) => fa.map(f),
  of,
  ap: (fab, fa) => fa.ap(fab),
  chain: (fa, f) => fa.chain(f)
}

//
// backporting
//

/**
 * @since 1.19.0
 */
export function of<S, A>(a: A): State<S, A> {
  return new State(s => [a, s])
}

/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 1.19.0
 */
export function evalState<S, A>(ma: State<S, A>, s: S): A {
  return ma.eval(s)
}

/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 1.19.0
 */
export function execState<S, A>(ma: State<S, A>, s: S): S {
  return ma.exec(s)
}

const { ap, apFirst, apSecond, chain, chainFirst, flatten, map } = pipeable(state)

export { ap, apFirst, apSecond, chain, chainFirst, flatten, map }
