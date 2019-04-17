import { constant, constIdentity } from './function'
import { Monad2 } from './Monad'

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
  constructor(readonly run: (s: S) => [A, S]) {}
  eval(s: S): A {
    return this.run(s)[0]
  }
  exec(s: S): S {
    return this.run(s)[1]
  }
  map<B>(f: (a: A) => B): State<S, B> {
    return new State(s => {
      const [a, s1] = this.run(s)
      return [f(a), s1]
    })
  }
  ap<B>(fab: State<S, (a: A) => B>): State<S, B> {
    return fab.chain(f => this.map(f)) // <= derived
  }
  /**
   * Flipped version of `ap`
   */
  ap_<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C> {
    return fb.ap(this)
  }
  /**
   * Combine two effectful actions, keeping only the result of the first
   * @since 1.7.0
   */
  applyFirst<B>(fb: State<S, B>): State<S, A> {
    return fb.ap(this.map(constant))
  }
  /**
   * Combine two effectful actions, keeping only the result of the second
   * @since 1.7.0
   */
  applySecond<B>(fb: State<S, B>): State<S, B> {
    return fb.ap(this.map(constIdentity as () => (b: B) => B))
  }
  chain<B>(f: (a: A) => State<S, B>): State<S, B> {
    return new State(s => {
      const [a, s1] = this.run(s)
      return f(a).run(s1)
    })
  }
}

const map = <S, A, B>(fa: State<S, A>, f: (a: A) => B): State<S, B> => {
  return fa.map(f)
}

const of = <S, A>(a: A): State<S, A> => {
  return new State(s => [a, s])
}

const ap = <S, A, B>(fab: State<S, (a: A) => B>, fa: State<S, A>): State<S, B> => {
  return fa.ap(fab)
}

const chain = <S, A, B>(fa: State<S, A>, f: (a: A) => State<S, B>): State<S, B> => {
  return fa.chain(f)
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
  map,
  of,
  ap,
  chain
}
