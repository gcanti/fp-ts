/**
 * @since 3.0.0
 */
import type { BooleanAlgebra } from './BooleanAlgebra'
import type { Monoid } from './Monoid'
import type { Ring } from './Ring'
import type { Semigroup } from './Semigroup'
import type { Semiring } from './Semiring'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getBooleanAlgebra =
  <B>(BA: BooleanAlgebra<B>) =>
  <A = never>(): BooleanAlgebra<(a: A) => B> => ({
    meet: (second) => (first) => (a) => BA.meet(second(a))(first(a)),
    join: (second) => (first) => (a) => BA.join(second(a))(first(a)),
    zero: () => BA.zero,
    one: () => BA.one,
    implies: (second) => (first) => (a) => BA.implies(second(a))(first(a)),
    not: (x) => (a) => BA.not(x(a))
  })

/**
 * Unary functions form a semigroup as long as you can provide a semigroup for the codomain.
 *
 * @example
 * import { Predicate } from 'fp-ts/Predicate'
 * import { pipe, getSemigroup } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const S1 = getSemigroup(B.SemigroupAll)<number>()
 *
 * assert.deepStrictEqual(pipe(f, S1.combine(g))(1), true)
 * assert.deepStrictEqual(pipe(f, S1.combine(g))(3), false)
 *
 * const S2 = getSemigroup(B.SemigroupAny)<number>()
 *
 * assert.deepStrictEqual(pipe(f, S2.combine(g))(1), true)
 * assert.deepStrictEqual(pipe(f, S2.combine(g))(3), true)
 *
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup =
  <S>(S: Semigroup<S>) =>
  <A = never>(): Semigroup<(a: A) => S> => ({
    combine: (second) => (first) => (a) => S.combine(second(a))(first(a))
  })

/**
 * Unary functions form a monoid as long as you can provide a monoid for the codomain.
 *
 * @example
 * import { Predicate } from 'fp-ts/Predicate'
 * import { getMonoid, pipe } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const M1 = getMonoid(B.MonoidAll)<number>()
 *
 * assert.deepStrictEqual(pipe(f, M1.combine(g))(1), true)
 * assert.deepStrictEqual(pipe(f, M1.combine(g))(3), false)
 *
 * const M2 = getMonoid(B.MonoidAny)<number>()
 *
 * assert.deepStrictEqual(pipe(f, M2.combine(g))(1), true)
 * assert.deepStrictEqual(pipe(f, M2.combine(g))(3), true)
 *
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <M>(M: Monoid<M>): (<A = never>() => Monoid<(a: A) => M>) => {
  const getSemigroupM = getSemigroup(M)
  return <A>() => ({
    combine: getSemigroupM<A>().combine,
    empty: () => M.empty
  })
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemiring = <B, A>(S: Semiring<B>): Semiring<(a: A) => B> => ({
  add: (second) => (first) => (x) => S.add(second(x))(first(x)),
  zero: () => S.zero,
  mul: (second) => (first) => (x) => S.mul(second(x))(first(x)),
  one: () => S.one
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getRing = <B, A>(R: Ring<B>): Ring<(a: A) => B> => {
  const S = getSemiring<B, A>(R)
  return {
    add: S.add,
    mul: S.mul,
    one: S.one,
    zero: S.zero,
    sub: (second) => (first) => (x) => R.sub(second(x))(first(x))
  }
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apply =
  <A>(a: A) =>
  <B>(f: (a: A) => B): B =>
    f(a)

/**
 * A *thunk*
 *
 * @since 3.0.0
 */
export interface Lazy<A> {
  (): A
}

/**
 * @example
 * import { FunctionN } from 'fp-ts/function'
 *
 * export const sum: FunctionN<[number, number], number> = (a, b) => a + b
 *
 * @since 3.0.0
 */
export interface FunctionN<A extends ReadonlyArray<unknown>, B> {
  (...args: A): B
}

/**
 * @since 3.0.0
 */
export const identity = <A>(a: A): A => a

/**
 * @since 3.0.0
 */
export const unsafeCoerce: <A, B>(a: A) => B = identity as any

/**
 * @since 3.0.0
 */
export const constant =
  <A>(a: A): Lazy<A> =>
  () =>
    a

/**
 * A thunk that returns always `true`.
 *
 * @since 3.0.0
 */
export const constTrue: Lazy<boolean> =
  /*#__PURE__*/
  constant(true)

/**
 * A thunk that returns always `false`.
 *
 * @since 3.0.0
 */
export const constFalse: Lazy<boolean> =
  /*#__PURE__*/
  constant(false)

/**
 * A thunk that returns always `null`.
 *
 * @since 3.0.0
 */
export const constNull: Lazy<null> =
  /*#__PURE__*/
  constant(null)

/**
 * A thunk that returns always `undefined`.
 *
 * @since 3.0.0
 */
export const constUndefined: Lazy<undefined> =
  /*#__PURE__*/
  constant(undefined)

/**
 * A thunk that returns always `void`.
 *
 * @since 3.0.0
 */
export const constVoid: Lazy<void> = constUndefined

/**
 * Flips the arguments of a curried function.
 *
 * @example
 * import { flip } from 'fp-ts/function'
 *
 * const f = (a: number) => (b: string) => a - b.length
 *
 * assert.strictEqual(flip(f)('aaa')(2), -1)
 *
 * @since 3.0.0
 */
export const flip =
  <A, B, C>(f: (a: A) => (b: B) => C): ((b: B) => (a: A) => C) =>
  (b) =>
  (a) =>
    f(a)(b)

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
 * @since 3.0.0
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
 * @since 3.0.0
 */
export const increment = (n: number): number => n + 1

/**
 * @since 3.0.0
 */
export const decrement = (n: number): number => n - 1

/**
 * @since 3.0.0
 */
export const absurd = <A>(_: never): A => {
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
 * @since 3.0.0
 */
export const tupled =
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B): ((a: A) => B) =>
  (a) =>
    f(...a)

/**
 * Inverse function of `tupled`
 *
 * @since 3.0.0
 */
export const untupled =
  <A extends ReadonlyArray<unknown>, B>(f: (a: A) => B): ((...a: A) => B) =>
  (...a) =>
    f(a)

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
 * @since 3.0.0
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
  hi?: Function
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
    default: {
      let ret = arguments[0]
      for (let i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret)
      }
      return ret
    }
  }
}

/**
 * Type hole simulation
 *
 * @since 3.0.0
 */
export const hole: <T>() => T = absurd as any

/**
 * `SK` function (SKI combinator calculus).
 *
 * @since 3.0.0
 */
export const SK = <A, B>(_: A, b: B): B => b
