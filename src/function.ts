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
 * import { FunctionN } from 'fp-ts/function'
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
  return (a) => !predicate(a)
}

/**
 * @since 2.0.0
 */
export function constant<A>(a: A): Lazy<A> {
  return () => a
}

/**
 * A thunk that returns always `true`.
 *
 * @since 2.0.0
 */
export const constTrue: Lazy<boolean> =
  /*#__PURE__*/
  constant(true)

/**
 * A thunk that returns always `false`.
 *
 * @since 2.0.0
 */
export const constFalse: Lazy<boolean> =
  /*#__PURE__*/
  constant(false)

/**
 * A thunk that returns always `null`.
 *
 * @since 2.0.0
 */
export const constNull: Lazy<null> =
  /*#__PURE__*/
  constant(null)

/**
 * A thunk that returns always `undefined`.
 *
 * @since 2.0.0
 */
export const constUndefined: Lazy<undefined> =
  /*#__PURE__*/
  constant(undefined)

/**
 * A thunk that returns always `void`.
 *
 * @since 2.0.0
 */
export const constVoid: Lazy<void> = constUndefined

// TODO: remove in v3
/**
 * Flips the order of the arguments of a function of two arguments.
 *
 * @since 2.0.0
 */
export function flip<A, B, C>(f: (a: A, b: B) => C): (b: B, a: A) => C {
  return (b, a) => f(a, b)
}

/**
 * Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.
 *
 * See also [`pipe`](#pipe).
 *
 * @example
 * import { flow } from 'fp-ts/function'
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
      return function (this: unknown) {
        return bc!(ab.apply(this, arguments))
      }
    case 3:
      return function (this: unknown) {
        return cd!(bc!(ab.apply(this, arguments)))
      }
    case 4:
      return function (this: unknown) {
        return de!(cd!(bc!(ab.apply(this, arguments))))
      }
    case 5:
      return function (this: unknown) {
        return ef!(de!(cd!(bc!(ab.apply(this, arguments)))))
      }
    case 6:
      return function (this: unknown) {
        return fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments))))))
      }
    case 7:
      return function (this: unknown) {
        return gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments)))))))
      }
    case 8:
      return function (this: unknown) {
        return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments))))))))
      }
    case 9:
      return function (this: unknown) {
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
 * import { tupled } from 'fp-ts/function'
 *
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 *
 * @since 2.4.0
 */
export function tupled<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B): (a: A) => B {
  return (a) => f(...a)
}

/**
 * Inverse function of `tupled`
 *
 * @since 2.4.0
 */
export function untupled<A extends ReadonlyArray<unknown>, B>(f: (a: A) => B): (...a: A) => B {
  return (...a) => f(a)
}

/**
 * Pipes the value of an expression into a pipeline of functions.
 *
 * See also [`flow`](#flow).
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 *
 * const len = (s: string): number => s.length
 * const double = (n: number): number => n * 2
 *
 * // without pipe
 * assert.strictEqual(double(len('aaa')), 6)
 *
 * // with pipe
 * assert.strictEqual(pipe('aaa', len, double), 6)
 *
 * @since 2.6.3
 */
export function pipe<A>(a: A): A
export function pipe<A, B>(a: A, ab: (a: A) => B): B
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
export function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
export function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E
export function pipe<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): F
export function pipe<A, B, C, D, E, F, G>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): G
export function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): J
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K
): K
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L
): L
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M
): M
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N
): N
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O
): O

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P
): P

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q
): Q

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R
): R

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S
): S

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S,
  st: (s: S) => T
): T
export function pipe(
  a: unknown,
  ab?: Function,
  bc?: Function,
  cd?: Function,
  de?: Function,
  ef?: Function,
  fg?: Function,
  gh?: Function,
  hi?: Function,
  ij?: Function,
  jk?: Function,
  kl?: Function,
  lm?: Function,
  mn?: Function,
  no?: Function,
  op?: Function,
  pq?: Function,
  qr?: Function,
  rs?: Function,
  st?: Function
): unknown {
  switch (arguments.length) {
    case 1:
      return a
    case 2:
      return ab!(a)
    case 3:
      return bc!(ab!(a))
    case 4:
      return cd!(bc!(ab!(a)))
    case 5:
      return de!(cd!(bc!(ab!(a))))
    case 6:
      return ef!(de!(cd!(bc!(ab!(a)))))
    case 7:
      return fg!(ef!(de!(cd!(bc!(ab!(a))))))
    case 8:
      return gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))
    case 9:
      return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))
    case 10:
      return ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))
    case 11:
      return jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))
    case 12:
      return kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))
    case 13:
      return lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))))
    case 14:
      return mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))))
    case 15:
      return no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))))))
    case 16:
      return op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))))))
    case 17:
      return pq!(op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))))))))
    case 18:
      return qr!(pq!(op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))))))))
    case 19:
      return rs!(qr!(pq!(op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))))))))))
    case 20:
      return st!(rs!(qr!(pq!(op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))))))))))
  }
  return
}

/**
 * Type hole simulation
 *
 * @since 2.7.0
 */
export const hole: <T>() => T = absurd as any

/**
 * @internal
 */
export const bind_ = <A, N extends string, B>(
  a: A,
  name: Exclude<N, keyof A>,
  b: B
): { [K in keyof A | N]: K extends keyof A ? A[K] : B } => Object.assign({}, a, { [name]: b }) as any

/**
 * @internal
 */
export const bindTo_ = <N extends string>(name: N) => <B>(b: B): { [K in N]: B } => ({ [name]: b } as any)
