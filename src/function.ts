import { HKT } from './HKT'

/**
 * @since 1.0.0
 */
export const identity = <A>(a: A): A => {
  return a
}

/**
 * @since 1.0.0
 */
export const unsafeCoerce: <A, B>(a: A) => B = identity as any

/**
 * Thunk type
 */
export type Lazy<A> = () => A

/**
 * @example
 * import { FunctionN } from 'fp-ts/lib/function'
 *
 * export const sum: FunctionN<[number, number], number> = (a, b) => a + b
 *
 * @since 1.16.0
 */
export type FunctionN<A extends Array<unknown>, B> = (...args: A) => B

/** @deprecated */
export type Function1<A, B> = (a: A) => B
/** @deprecated */
export type Function2<A, B, C> = (a: A, b: B) => C
/** @deprecated */
export type Function3<A, B, C, D> = (a: A, b: B, c: C) => D
/** @deprecated */
export type Function4<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E
/** @deprecated */
export type Function5<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E) => F
/** @deprecated */
export type Function6<A, B, C, D, E, F, G> = (a: A, b: B, c: C, d: D, e: E, f: F) => G
/** @deprecated */
export type Function7<A, B, C, D, E, F, G, H> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H
/** @deprecated */
export type Function8<A, B, C, D, E, F, G, H, I> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => I
/** @deprecated */
export type Function9<A, B, C, D, E, F, G, H, I, J> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => J

/** @deprecated */
export type Curried2<A, B, C> = (a: A) => (b: B) => C
/** @deprecated */
export type Curried3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D
/** @deprecated */
export type Curried4<A, B, C, D, E> = (a: A) => (b: B) => (c: C) => (d: D) => E
/** @deprecated */
export type Curried5<A, B, C, D, E, F> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F
/** @deprecated */
export type Curried6<A, B, C, D, E, F, G> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => G
/** @deprecated */
export type Curried7<A, B, C, D, E, F, G, H> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => H
/** @deprecated */
export type Curried8<A, B, C, D, E, F, G, H, I> = (
  a: A
) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => I
/** @deprecated */
export type Curried9<A, B, C, D, E, F, G, H, I, J> = (
  a: A
) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => J

export type Predicate<A> = (a: A) => boolean

export type Refinement<A, B extends A> = (a: A) => a is B

/**
 * @since 1.0.0
 */
export const not = <A>(predicate: Predicate<A>): Predicate<A> => {
  return a => !predicate(a)
}

/**
 * @since 1.0.0
 * @deprecated
 */
export function or<A, B1 extends A, B2 extends A>(p1: Refinement<A, B1>, p2: Refinement<A, B2>): Refinement<A, B1 | B2>
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> {
  return a => p1(a) || p2(a)
}

/**
 * @since 1.0.0
 * @deprecated
 */
export const and = <A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> => {
  return a => p1(a) && p2(a)
}

export type Endomorphism<A> = (a: A) => A

/** @deprecated */
export type BinaryOperation<A, B> = (a1: A, a2: A) => B

/** @deprecated */
export type Kleisli<F, A, B> = (a: A) => HKT<F, B>
/** @deprecated */
export type Cokleisli<F, A, B> = (fa: HKT<F, A>) => B

/**
 * @since 1.0.0
 */
export const constant = <A>(a: A): Lazy<A> => {
  return () => a
}

/**
 * A thunk that returns always `true`
 *
 * @since 1.0.0
 */
export const constTrue = (): boolean => {
  return true
}

/**
 * A thunk that returns always `false`
 *
 * @since 1.0.0
 */
export const constFalse = (): boolean => {
  return false
}

/**
 * A thunk that returns always `null`
 *
 * @since 1.0.0
 */
export const constNull = (): null => {
  return null
}

/**
 * A thunk that returns always `undefined`
 *
 * @since 1.0.0
 */
export const constUndefined = (): undefined => {
  return
}

/**
 * A thunk that returns always `void`
 *
 * @since 1.14.0
 */
export const constVoid = (): void => {
  return
}

/**
 * Flips the order of the arguments to a function of two arguments.
 *
 * @since 1.0.0
 */
// tslint:disable-next-line: deprecation
export const flip = <A, B, C>(f: Curried2<A, B, C>): Curried2<B, A, C> => {
  return b => a => f(a)(b)
}

/**
 * The `on` function is used to change the domain of a binary operator.
 *
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const on = <B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B): BinaryOperation<A, C> => {
  return (x, y) => op(f(x), f(y))
}

/**
 * @since 1.0.0
 * @deprecated
 */
export function compose<A, B, C>(bc: (b: B) => C, ab: (a: A) => B): (a: A) => C
/** @deprecated */
export function compose<A, B, C, D>(cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => D
/** @deprecated */
export function compose<A, B, C, D, E>(de: (d: D) => E, cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => E
/** @deprecated */
export function compose<A, B, C, D, E, F>(
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => F
/** @deprecated */
export function compose<A, B, C, D, E, F, G>(
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => G
/** @deprecated */
export function compose<A, B, C, D, E, F, G, H>(
  gh: (g: G) => H,
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => H
/** @deprecated */
export function compose<A, B, C, D, E, F, G, H, I>(
  hi: (h: H) => I,
  gh: (g: G) => H,
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => I
/** @deprecated */
export function compose<A, B, C, D, E, F, G, H, I, J>(
  ij: (i: I) => J,
  hi: (h: H) => I,
  gh: (g: G) => H,
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => J
export function compose(...fns: Array<Function>): Function {
  const len = fns.length - 1
  return function(this: any, x: any) {
    let y = x
    for (let i = len; i > -1; i--) {
      y = fns[i].call(this, y)
    }
    return y
  }
}

/**
 * @since 1.0.0
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
 * @since 1.0.0
 * @deprecated
 */
export const concat = <A>(x: Array<A>, y: Array<A>): Array<A> => {
  const lenx = x.length
  if (lenx === 0) {
    return y
  }
  const leny = y.length
  if (leny === 0) {
    return x
  }
  const r = Array(lenx + leny)
  for (let i = 0; i < lenx; i++) {
    r[i] = x[i]
  }
  for (let i = 0; i < leny; i++) {
    r[i + lenx] = y[i]
  }
  return r
}

/**
 * @since 1.0.0
 * @deprecated
 */
export function curried(f: Function, n: number, acc: Array<any>) {
  return function(this: any, x: any) {
    // tslint:disable-next-line: deprecation
    const combined = concat(acc, [x])
    // tslint:disable-next-line: deprecation
    return n === 0 ? f.apply(this, combined) : curried(f, n - 1, combined)
  }
}

/**
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export function curry<A, B, C>(f: Function2<A, B, C>): Curried2<A, B, C>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function curry<A, B, C, D>(f: Function3<A, B, C, D>): Curried3<A, B, C, D>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function curry<A, B, C, D, E>(f: Function4<A, B, C, D, E>): Curried4<A, B, C, D, E>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function curry<A, B, C, D, E, F>(f: Function5<A, B, C, D, E, F>): Curried5<A, B, C, D, E, F>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function curry<A, B, C, D, E, F, G>(f: Function6<A, B, C, D, E, F, G>): Curried6<A, B, C, D, E, F, G>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function curry<A, B, C, D, E, F, G, H>(f: Function7<A, B, C, D, E, F, G, H>): Curried7<A, B, C, D, E, F, G, H>
/** @deprecated */
export function curry<A, B, C, D, E, F, G, H, I>(
  // tslint:disable-next-line: deprecation
  f: Function8<A, B, C, D, E, F, G, H, I>
): // tslint:disable-next-line: deprecation
Curried8<A, B, C, D, E, F, G, H, I>
/** @deprecated */
export function curry<A, B, C, D, E, F, G, H, I, J>(
  // tslint:disable-next-line: deprecation
  f: Function9<A, B, C, D, E, F, G, H, I, J>
): // tslint:disable-next-line: deprecation
Curried9<A, B, C, D, E, F, G, H, I, J>
export function curry(f: Function) {
  // tslint:disable-next-line: deprecation
  return curried(f, f.length - 1, [])
}

/* tslint:disable-next-line */
const getFunctionName = (f: Function): string => (f as any).displayName || f.name || `<function${f.length}>`

/**
 * @since 1.0.0
 * @deprecated
 */
export const toString = (x: any): string => {
  if (typeof x === 'string') {
    return JSON.stringify(x)
  }
  if (x instanceof Date) {
    return `new Date('${x.toISOString()}')`
  }
  if (Array.isArray(x)) {
    // tslint:disable-next-line: deprecation
    return `[${x.map(toString).join(', ')}]`
  }
  if (typeof x === 'function') {
    return getFunctionName(x)
  }
  if (x == null) {
    return String(x)
  }
  if (typeof x.toString === 'function' && x.toString !== Object.prototype.toString) {
    return x.toString()
  }
  try {
    return JSON.stringify(x, null, 2)
  } catch (e) {
    return String(x)
  }
}

/**
 * @since 1.0.0
 */
export const tuple = <T extends Array<any>>(...t: T): T => {
  return t
}

/**
 * @since 1.0.0
 * @deprecated
 */
export const tupleCurried = <A>(a: A) => <B>(b: B): [A, B] => {
  return [a, b]
}

/**
 * Applies a function to an argument ($)
 *
 * @since 1.0.0
 * @deprecated
 */
export const apply = <A, B>(f: (a: A) => B) => (a: A): B => {
  return f(a)
}

/**
 * Applies an argument to a function (#)
 *
 * @since 1.0.0
 * @deprecated
 */
export const applyFlipped = <A>(a: A) => <B>(f: (a: A) => B): B => {
  return f(a)
}

/**
 * For use with phantom fields
 *
 * @since 1.0.0
 * @deprecated
 */
export const phantom: any = undefined

/**
 * A thunk that returns always the `identity` function.
 * For use with `applySecond` methods.
 *
 * @since 1.5.0
 * @deprecated
 */
export const constIdentity = (): (<A>(a: A) => A) => {
  return identity
}

/**
 * @since 1.9.0
 */
export const increment = (n: number): number => {
  return n + 1
}

/**
 * @since 1.9.0
 */
export const decrement = (n: number): number => {
  return n - 1
}

/**
 * @since 1.18.0
 */
export function absurd<A>(_: never): A {
  throw new Error('Called `absurd` function which should be uncallable')
}
