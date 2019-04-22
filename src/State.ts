import { Monad2 } from './Monad'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    State: State<L, A>
  }
}

export const URI = 'State'

export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface State<S, A> {
  (s: S): [A, S]
}

/**
 * @since 2.0.0
 */
export function run<S, A>(ma: State<S, A>, s: S): [A, S] {
  return ma(s)
}

/**
 * @since 2.0.0
 */
export function evalState<S, A>(ma: State<S, A>, s: S): A {
  return ma(s)[0]
}

/**
 * @since 2.0.0
 */
export function execState<S, A>(ma: State<S, A>, s: S): S {
  return ma(s)[1]
}

const map = <S, A, B>(fa: State<S, A>, f: (a: A) => B): State<S, B> => {
  return s => {
    const [a, s1] = fa(s)
    return [f(a), s1]
  }
}

const of = <S, A>(a: A): State<S, A> => {
  return s => [a, s]
}

const ap = <S, A, B>(fab: State<S, (a: A) => B>, fa: State<S, A>): State<S, B> => {
  return chain(fab, f => map(fa, f)) // <= derived
}

const chain = <S, A, B>(fa: State<S, A>, f: (a: A) => State<S, B>): State<S, B> => {
  return s => {
    const [a, s1] = fa(s)
    return f(a)(s1)
  }
}

/**
 * Get the current state
 *
 * @since 2.0.0
 */
export const get = <S>(): State<S, S> => {
  return s => [s, s]
}

/**
 * Set the state
 *
 * @since 2.0.0
 */
export const put = <S>(s: S): State<S, void> => {
  return () => [undefined, s]
}

/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export const modify = <S>(f: (s: S) => S): State<S, undefined> => {
  return s => [undefined, f(s)]
}

/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export const gets = <S, A>(f: (s: S) => A): State<S, A> => {
  return s => [f(s), s]
}

/**
 * @since 2.0.0
 */
export const state: Monad2<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
