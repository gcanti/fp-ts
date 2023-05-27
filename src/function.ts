/**
 * @since 2.0.0
 */
import { BooleanAlgebra } from './BooleanAlgebra'
import { Monoid } from './Monoid'
import { Ring } from './Ring'
import { Semigroup } from './Semigroup'
import { Semiring } from './Semiring'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.10.0
 */
export const getBooleanAlgebra =
  <B>(B: BooleanAlgebra<B>) =>
  <A = never>(): BooleanAlgebra<(a: A) => B> => ({
    meet: (x, y) => (a) => B.meet(x(a), y(a)),
    join: (x, y) => (a) => B.join(x(a), y(a)),
    zero: () => B.zero,
    one: () => B.one,
    implies: (x, y) => (a) => B.implies(x(a), y(a)),
    not: (x) => (a) => B.not(x(a))
  })

/**
 * Unary functions form a semigroup as long as you can provide a semigroup for the codomain.
 *
 * @example
 * import { Predicate, getSemigroup } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const S1 = getSemigroup(B.SemigroupAll)<number>()
 *
 * assert.deepStrictEqual(S1.concat(f, g)(1), true)
 * assert.deepStrictEqual(S1.concat(f, g)(3), false)
 *
 * const S2 = getSemigroup(B.SemigroupAny)<number>()
 *
 * assert.deepStrictEqual(S2.concat(f, g)(1), true)
 * assert.deepStrictEqual(S2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.10.0
 */
export const getSemigroup =
  <S>(S: Semigroup<S>) =>
  <A = never>(): Semigroup<(a: A) => S> => ({
    concat: (f, g) => (a) => S.concat(f(a), g(a))
  })

/**
 * Unary functions form a monoid as long as you can provide a monoid for the codomain.
 *
 * @example
 * import { Predicate } from 'fp-ts/Predicate'
 * import { getMonoid } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const M1 = getMonoid(B.MonoidAll)<number>()
 *
 * assert.deepStrictEqual(M1.concat(f, g)(1), true)
 * assert.deepStrictEqual(M1.concat(f, g)(3), false)
 *
 * const M2 = getMonoid(B.MonoidAny)<number>()
 *
 * assert.deepStrictEqual(M2.concat(f, g)(1), true)
 * assert.deepStrictEqual(M2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.10.0
 */
export const getMonoid = <M>(M: Monoid<M>): (<A = never>() => Monoid<(a: A) => M>) => {
  const getSemigroupM = getSemigroup(M)
  return <A>() => ({
    concat: getSemigroupM<A>().concat,
    empty: () => M.empty
  })
}

/**
 * @category instances
 * @since 2.10.0
 */
export const getSemiring = <A, B>(S: Semiring<B>): Semiring<(a: A) => B> => ({
  add: (f, g) => (x) => S.add(f(x), g(x)),
  zero: () => S.zero,
  mul: (f, g) => (x) => S.mul(f(x), g(x)),
  one: () => S.one
})

/**
 * @category instances
 * @since 2.10.0
 */
export const getRing = <A, B>(R: Ring<B>): Ring<(a: A) => B> => {
  const S = getSemiring<A, B>(R)
  return {
    add: S.add,
    mul: S.mul,
    one: S.one,
    zero: S.zero,
    sub: (f, g) => (x) => R.sub(f(x), g(x))
  }
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export const apply =
  <A>(a: A) =>
  <B>(f: (a: A) => B): B =>
    f(a)

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
export function constant<A>(a: A): LazyArg<A> {
  return () => a
}

/**
 * A thunk that returns always `true`.
 *
 * @since 2.0.0
 */
export const constTrue: LazyArg<boolean> = /*#__PURE__*/ constant(true)

/**
 * A thunk that returns always `false`.
 *
 * @since 2.0.0
 */
export const constFalse: LazyArg<boolean> = /*#__PURE__*/ constant(false)

/**
 * A thunk that returns always `null`.
 *
 * @since 2.0.0
 */
export const constNull: LazyArg<null> = /*#__PURE__*/ constant(null)

/**
 * A thunk that returns always `undefined`.
 *
 * @since 2.0.0
 */
export const constUndefined: LazyArg<undefined> = /*#__PURE__*/ constant(undefined)

/**
 * A thunk that returns always `void`.
 *
 * @since 2.0.0
 */
export const constVoid: LazyArg<void> = constUndefined

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
 * @since 2.0.0
 */
export function flip<A, B, C>(f: (a: A) => (b: B) => C): (b: B) => (a: A) => C
/** @deprecated */
export function flip<A, B, C>(f: (a: A, b: B) => C): (b: B, a: A) => C
export function flip(f: Function): Function {
  return (...args: Array<any>) => {
    if (args.length > 1) {
      return f(args[1], args[0])
    }

    return (a: any) => f(a)(args[0])
  }
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
type FlowFuncs<A extends ReadonlyArray<unknown>, F extends ReadonlyArray<unknown>>
	= F extends [(...args: A) => unknown] ? F
	: F extends [(...args: A) => infer T, ...infer R] ? [(...args: A) => T, ...FlowFuncs<[T], R>]
	: never

type FlowOutput<A extends ReadonlyArray<unknown>, F extends ReadonlyArray<unknown>>
	= F extends [(...args: A) => infer T] ? T
	: F extends [(...args: A) => infer T, ...infer R] ? FlowOutput<[T], R>
	: never

export function flow<A extends ReadonlyArray<unknown>, F extends ReadonlyArray<unknown>>(...fs: FlowFuncs<A, F>): (...args: A) => FlowOutput<A, F> {
	// @ts-expect-error(TypeScript can't handle the type recursion)
	return (...args) => fs.reduce((x, f) => [f(...x)], args)[0];
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
type PipeFuncs<A, F extends ReadonlyArray<unknown>>
	= F extends [] ? F
	: F extends [(x: A) => infer T, ...infer R] ? [(x: A) => T, ...PipeFuncs<T, R>]
	: never

type PipeOutput<A, F extends ReadonlyArray<unknown>>
	= F extends [] ? A
	: F extends [(x: A) => infer T] ? T
	: F extends [(x: A) => infer T, ...infer R] ? PipeOutput<T, R>
	: never

export function pipe<A, F extends ReadonlyArray<unknown>>(x: A, ...fs: PipeFuncs<A, F>): PipeOutput<A, F> {
	// @ts-expect-error(TypeScript can't handle the type recursion)
	return fs.reduce((x, f) => f(x), x);
}

/**
 * Type hole simulation
 *
 * @since 2.7.0
 */
export const hole: <T>() => T = absurd as any

/**
 * @since 2.11.0
 */
export const SK = <A, B>(_: A, b: B): B => b

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `Refinement` module instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface Refinement<A, B extends A> {
  (a: A): a is B
}

/**
 * Use `Predicate` module instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface Predicate<A> {
  (a: A): boolean
}

/**
 * Use `Predicate` module instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export function not<A>(predicate: Predicate<A>): Predicate<A> {
  return (a) => !predicate(a)
}

/**
 * Use `Endomorphism` module instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface Endomorphism<A> {
  (a: A): A
}

/**
 * Use `Endomorphism` module instead.
 *
 * @category zone of death
 * @since 2.10.0
 * @deprecated
 */
export const getEndomorphismMonoid = <A = never>(): Monoid<Endomorphism<A>> => ({
  concat: (first, second) => flow(first, second),
  empty: identity
})

/**
 * A lazy argument.
 *
 * @since 2.15.0
 */
export interface LazyArg<A> {
  (): A
}

/** @internal */
export const dual: {
  <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
    arity: Parameters<DataFirst>['length'],
    body: DataFirst
  ): DataLast & DataFirst
  <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
    isDataFirst: (args: IArguments) => boolean,
    body: DataFirst
  ): DataLast & DataFirst
} = (arity: any, body: any) => {
  const isDataFirst: (args: IArguments) => boolean = typeof arity === 'number' ? (args) => args.length >= arity : arity
  return function (this: any) {
    const args = Array.from(arguments)
    if (isDataFirst(arguments)) {
      return body.apply(this, args)
    }
    return (self: any) => body(self, ...args)
  }
}

// -------------------------------------------------------------------------------------
// lagacy
// -------------------------------------------------------------------------------------

/**
 * Use `LazyArg` instead.
 *
 * @category lagacy
 * @since 2.0.0
 */
export interface Lazy<A> {
  (): A
}
