/**
 * @since 2.0.0
 */

/**
 * A *thunk*
 *
 * @since 2.0.0
 */
export interface Lazy<A> {
  (): A
}

/**
 * @since 2.0.0
 */
export interface Predicate<A> {
  (a: A): boolean
}

/**
 * @since 2.0.0
 */
export interface Refinement<A, B extends A> {
  (a: A): a is B
}

/**
 * @since 2.0.0
 */
export interface Endomorphism<A> {
  (a: A): A
}

/**
 * @example
 * import { FunctionN } from 'fp-ts/lib/function'
 *
 * export const sum: FunctionN<[number, number], number> = (a, b) => a + b
 *
 * @since 2.0.0
 */
export interface FunctionN<A extends ReadonlyArray<unknown>, B> {
  (...args: A): B
}

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
export function flip<A, B, C>(f: (a: A, b: B) => C): (b: B, a: A) => C {
  return (b, a) => f(a, b)
}

/**
 * Function composition (from left to right).
 *
 * @example
 * import { flow } from 'fp-ts/lib/function'
 *
 * const len = (s: string): number => s.length
 * const double = (n: number): number => n * 2
 *
 * const f = flow(len, double)
 *
 * assert.strictEqual(f('aaa'), 6)
 *
 * @since 2.0.0
 */
export function flow<A extends ReadonlyArray<unknown>, B>(ab: (...a: A) => B): (...a: A) => B
export function flow<A extends ReadonlyArray<unknown>, B, C>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C
export function flow<A extends ReadonlyArray<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...a: A) => D
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): (...a: A) => E
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (...a: A) => F
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (...a: A) => G
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (...a: A) => H
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (...a: A) => I
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (...a: A) => J
export function flow(
  ab: Function,
  bc?: Function,
  cd?: Function,
  de?: Function,
  ef?: Function,
  fg?: Function,
  gh?: Function,
  hi?: Function,
  ij?: Function
): unknown {
  switch (arguments.length) {
    case 1:
      return ab
    case 2:
      return function(this: unknown) {
        return bc!(ab.apply(this, arguments))
      }
    case 3:
      return function(this: unknown) {
        return cd!(bc!(ab.apply(this, arguments)))
      }
    case 4:
      return function(this: unknown) {
        return de!(cd!(bc!(ab.apply(this, arguments))))
      }
    case 5:
      return function(this: unknown) {
        return ef!(de!(cd!(bc!(ab.apply(this, arguments)))))
      }
    case 6:
      return function(this: unknown) {
        return fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments))))))
      }
    case 7:
      return function(this: unknown) {
        return gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments)))))))
      }
    case 8:
      return function(this: unknown) {
        return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments))))))))
      }
    case 9:
      return function(this: unknown) {
        return ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments)))))))))
      }
  }
  return
}

/**
 * @since 2.0.0
 */
export function tuple<T extends ReadonlyArray<any>>(...t: T): T {
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

/**
 * @since 2.0.0
 */
export function absurd<A>(_: never): A {
  throw new Error('Called `absurd` function which should be uncallable')
}

/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * import { tupled } from 'fp-ts/lib/function'
 *
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 *
 * @since 2.4.0
 */
export function tupled<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B): (a: A) => B {
  return a => f(...a)
}

/**
 * Inverse function of `tupled`
 *
 * @since 2.4.0
 */
export function untupled<A extends ReadonlyArray<unknown>, B>(f: (a: A) => B): (...a: A) => B {
  return (...a) => f(a)
}
