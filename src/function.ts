/**
 * For use with phantom fields
 *
 * @since 2.0.0
 */
export const phantom: any = undefined

/**
 * Thunk type
 */
export type Lazy<A> = () => A

export type Predicate<A> = (a: A) => boolean

export type Refinement<A, B extends A> = (a: A) => a is B

export type Endomorphism<A> = (a: A) => A

export type BinaryOperation<A, B> = (a1: A, a2: A) => B

/**
 * @example
 * import { FunctionN } from 'fp-ts/lib/function'
 *
 * export const sum: FunctionN<[number, number], number> = (a, b) => a + b
 *
 * @since 2.0.0
 */
export type FunctionN<A extends Array<unknown>, B> = (...args: A) => B

/**
 * @since 2.0.0
 */
export function identity<A>(a: A): A {
  return a
}

/**
 * @since 2.0.0
 */
export const unsafeCoerce: <A, B>(a: A) => B = identity as any

/**
 * @since 2.0.0
 */
export function not<A>(predicate: Predicate<A>): Predicate<A> {
  return a => !predicate(a)
}

/**
 * @since 2.0.0
 */
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> {
  return a => p1(a) || p2(a)
}

/**
 * @since 2.0.0
 */
export function and<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> {
  return a => p1(a) && p2(a)
}

/**
 * @since 2.0.0
 */
export function constant<A>(a: A): Lazy<A> {
  return () => a
}

/**
 * A thunk that returns always `true`
 *
 * @since 2.0.0
 */
export const constTrue = (): boolean => {
  return true
}

/**
 * A thunk that returns always `false`
 *
 * @since 2.0.0
 */
export const constFalse = (): boolean => {
  return false
}

/**
 * A thunk that returns always `null`
 *
 * @since 2.0.0
 */
export const constNull = (): null => {
  return null
}

/**
 * A thunk that returns always `undefined`
 *
 * @since 2.0.0
 */
export const constUndefined = (): undefined => {
  return
}

/**
 * A thunk that returns always `void`
 *
 * @since 2.0.0
 */
export const constVoid = (): void => {
  return
}

/**
 * Flips the order of the arguments of a function of two arguments.
 *
 * @since 2.0.0
 */
export function flip<A, B, C>(f: (a: A, b: B) => C): ((b: B, a: A) => C) {
  return (b, a) => f(a, b)
}

/**
 * The `on` function is used to change the domain of a binary operator.
 *
 * @since 2.0.0
 */
export function on<A, B, C>(op: BinaryOperation<B, C>, f: (a: A) => B): BinaryOperation<A, C> {
  return (a1, a2) => op(f(a1), f(a2))
}

/**
 * @since 2.0.0
 */
export function pipe<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C
export function pipe<A, B, C, D>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (a: A) => D
export function pipe<A, B, C, D, E>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): (a: A) => E
export function pipe<A, B, C, D, E, F>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (a: A) => F
export function pipe<A, B, C, D, E, F, G>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (a: A) => G
export function pipe<A, B, C, D, E, F, G, H>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (a: A) => H
export function pipe<A, B, C, D, E, F, G, H, I>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (a: A) => I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (a: A) => J
export function pipe(...fns: Array<Function>): Function {
  const len = fns.length - 1
  return function(this: any, x: any) {
    let y = x
    for (let i = 0; i <= len; i++) {
      y = fns[i].call(this, y)
    }
    return y
  }
}

/**
 * @since 2.0.0
 */
export function tuple<T extends Array<any>>(...t: T): T {
  return t
}

/**
 * @since 2.0.0
 */
export function increment(n: number): number {
  return n + 1
}

/**
 * @since 2.0.0
 */
export function decrement(n: number): number {
  return n - 1
}
