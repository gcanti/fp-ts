import { HKT } from './HKT'

export type Lazy<A> = () => A

export type Function1<A, B> = (a: A) => B
export type Function2<A, B, C> = (a: A, b: B) => C
export type Function3<A, B, C, D> = (a: A, b: B, c: C) => D
export type Function4<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E
export type Function5<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E) => F
export type Function6<A, B, C, D, E, F, G> = (a: A, b: B, c: C, d: D, e: E, f: F) => G
export type Function7<A, B, C, D, E, F, G, H> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H
export type Function8<A, B, C, D, E, F, G, H, I> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => I
export type Function9<A, B, C, D, E, F, G, H, I, J> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => J

export type Curried2<A, B, C> = (a: A) => (b: B) => C
export type Curried3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D
export type Curried4<A, B, C, D, E> = (a: A) => (b: B) => (c: C) => (d: D) => E
export type Curried5<A, B, C, D, E, F> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F
export type Curried6<A, B, C, D, E, F, G> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => G
export type Curried7<A, B, C, D, E, F, G, H> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => H
export type Curried8<A, B, C, D, E, F, G, H, I> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => I
export type Curried9<A, B, C, D, E, F, G, H, I, J> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => J

export type Predicate<A> = Function1<A, boolean>

export type Endomorphism<A> = Function1<A, A>

export type BinaryOperation<A, B> = Function2<A, A, B>

export type ClosedBinaryOperation<A> = BinaryOperation<A, A>

export type Kleisli<F, A, B> = Function1<A, HKT<F, B>>
export type Cokleisli<F, A, B> = Function1<HKT<F, A>, B>

export function constant<A>(a: A): Lazy<A> {
  return () => a
}

export const constFalse = constant(false)
export const constTrue = constant(true)

export function identity<A>(a: A): A {
  return a
}

/** Flips the order of the arguments to a function of two arguments. */
export function flip<A, B, C>(f: Function2<A, B, C>): Function2<B, A, C> {
  return (b, a) => f(a, b)
}

/** The `on` function is used to change the domain of a binary operator. */
export function on<A, B, C>(op: BinaryOperation<B, C>, f: Function1<A, B>): BinaryOperation<A, C> {
  return (x, y) => op(f(x), f(y))
}

export function compose<A, B, C>(bc: Function1<B, C>, ab: Function1<A, B>): Function1<A, C>
export function compose<A, B, C, D>(cd: Function1<C, D>, bc: Function1<B, C>, ab: Function1<A, B>): Function1<A, D>
export function compose<A, B, C, D, E>(de: Function1<D, E>, cd: Function1<C, D>, bc: Function1<B, C>, ab: Function1<A, B>): Function1<A, E>
export function compose<A, B, C, D, E, F>(fe: Function1<F, E>, de: Function1<D, E>, cd: Function1<C, D>, bc: Function1<B, C>, ab: Function1<A, B>): Function1<A, F>
export function compose<A, B, C, D, E, F, G>(fg: Function1<F, G>, fe: Function1<F, E>, de: Function1<D, E>, cd: Function1<C, D>, bc: Function1<B, C>, ab: Function1<A, B>): Function1<A, G>
export function compose<A, B, C, D, E, F, G, H>(fh: Function1<F, H>, fg: Function1<F, G>, fe: Function1<F, E>, de: Function1<D, E>, cd: Function1<C, D>, bc: Function1<B, C>, ab: Function1<A, B>): Function1<A, H>
export function compose<A, B, C, D, E, F, G, H, I>(fi: Function1<H, I>, fh: Function1<F, H>, fg: Function1<F, G>, fe: Function1<F, E>, de: Function1<D, E>, cd: Function1<C, D>, bc: Function1<B, C>, ab: Function1<A, B>): Function1<A, I>
export function compose<A, B, C, D, E, F, G, H, I, J>(fj: Function1<I, J>, fi: Function1<H, I>, fh: Function1<F, H>, fg: Function1<F, G>, fe: Function1<F, E>, de: Function1<D, E>, cd: Function1<C, D>, bc: Function1<B, C>, ab: Function1<A, B>): Function1<A, J>
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

export function pipe<A, B, C>(ab: Function1<A, B>, bc: Function1<B, C>): Function1<A, C>
export function pipe<A, B, C, D>(ab: Function1<A, B>, bc: Function1<B, C>, cd: Function1<C, D>): Function1<A, D>
export function pipe<A, B, C, D, E>(ab: Function1<A, B>, bc: Function1<B, C>, cd: Function1<C, D>, de: Function1<D, E>): Function1<A, E>
export function pipe<A, B, C, D, E, F>(ab: Function1<A, B>, bc: Function1<B, C>, cd: Function1<C, D>, de: Function1<D, E>, ef: Function1<E, F>): Function1<A, F>
export function pipe<A, B, C, D, E, F, G>(ab: Function1<A, B>, bc: Function1<B, C>, cd: Function1<C, D>, de: Function1<D, E>, ef: Function1<E, F>, fg: Function1<F, G>): Function1<A, G>
export function pipe<A, B, C, D, E, F, G, H>(ab: Function1<A, B>, bc: Function1<B, C>, cd: Function1<C, D>, de: Function1<D, E>, ef: Function1<E, F>, fg: Function1<F, G>, gh: Function1<G, H>): Function1<A, H>
export function pipe<A, B, C, D, E, F, G, H, I>(ab: Function1<A, B>, bc: Function1<B, C>, cd: Function1<C, D>, de: Function1<D, E>, ef: Function1<E, F>, fg: Function1<F, G>, gh: Function1<G, H>, hi: Function1<H, I>): Function1<A, I>
export function pipe<A, B, C, D, E, F, G, H, I, J>(ab: Function1<A, B>, bc: Function1<B, C>, cd: Function1<C, D>, de: Function1<D, E>, ef: Function1<E, F>, fg: Function1<F, G>, gh: Function1<G, H>, hi: Function1<H, I>, ij: Function1<I, J>): Function1<A, J>
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

function curried(f: Function, n: number, acc: Array<any>) {
  return function(this: any, x: any) {
    const combined = acc.concat([x])
    return n === 0 ? f.apply(this, combined) : curried(f, n - 1, combined)
  }
}

export function curry<A, B, C>(f: Function2<A, B, C>): Curried2<A, B, C>
export function curry<A, B, C, D>(f: Function3<A, B, C, D>): Curried3<A, B, C, D>
export function curry<A, B, C, D, E>(f: Function4<A, B, C, D, E>): Curried4<A, B, C, D, E>
export function curry<A, B, C, D, E, F>(f: Function5<A, B, C, D, E, F>): Curried5<A, B, C, D, E, F>
export function curry<A, B, C, D, E, F, G>(f: Function6<A, B, C, D, E, F, G>): Curried6<A, B, C, D, E, F, G>
export function curry<A, B, C, D, E, F, G, H>(f: Function7<A, B, C, D, E, F, G, H>): Curried7<A, B, C, D, E, F, G, H>
export function curry<A, B, C, D, E, F, G, H, I>(f: Function8<A, B, C, D, E, F, G, H, I>): Curried8<A, B, C, D, E, F, G, H, I>
export function curry<A, B, C, D, E, F, G, H, I, K>(f: Function9<A, B, C, D, E, F, G, H, I, K>): Curried9<A, B, C, D, E, F, G, H, I, K>
export function curry(f: Function) {
  return curried(f, f.length - 1, [])
}
