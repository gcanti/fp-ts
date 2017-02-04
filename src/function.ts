export type Predicate<A> = (a: A) => boolean;

export type Fn1<A, B> = (a: A) => B;
export type Fn2<A, B, C> = (a: A, b: B) => C;
export type Fn3<A, B, C, D> = (a: A, b: B, c: C) => D;
export type Fn4<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E;
export type Fn5<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E) => F;
export type Fn6<A, B, C, D, E, F, G> = (a: A, b: B, c: C, d: D, e: E, f: F) => G;
export type Fn7<A, B, C, D, E, F, G, H> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H;
export type Fn8<A, B, C, D, E, F, G, H, I> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => I;
export type Fn9<A, B, C, D, E, F, G, H, I, L> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => L;

export type CurriedFn2<A, B, C> =
  & Fn1<A, Fn1<B, C>>
  & Fn2<A, B, C>;
export type CurriedFn3<A, B, C, D> =
  & Fn1<A, CurriedFn2<B, C, D>>
  & Fn2<A, B, Fn1<C, D>>
  & Fn3<A, B, C, D>;
export type CurriedFn4<A, B, C, D, E> =
  & Fn1<A, CurriedFn3<B, C, D, E>>
  & Fn2<A, B, CurriedFn2<C, D, E>>
  & Fn3<A, B, C, Fn1<D, E>>
  & Fn4<A, B, C, D, E>;
export type CurriedFn5<A, B, C, D, E, F> =
  & Fn1<A, CurriedFn4<B, C, D, E, F>>
  & Fn2<A, B, CurriedFn3<C, D, E, F>>
  & Fn3<A, B, C, CurriedFn2<D, E, F>>
  & Fn4<A, B, C, D, Fn1<E, F>>
  & Fn5<A, B, C, D, E, F>;

/** Returns its first argument and ignores its second. */
export function constant<A>(a: A): () => A {
  return () => a
}

export const ffalse = constant(false)
export const ftrue = constant(true)

export function identity<A>(a: A): A {
  return a
}

/** Flips the order of the arguments to a function of two arguments. */
export function flip<A, B, C>(f: (a: A, b: B) => C): (b: B, a: A) => C {
  return (b, a) => f(a, b)
}

/** The `on` function is used to change the domain of a binary operator. */
export function on<A, B, C>(op: (x: B, y: B) => C, f: (a: A) => B): (x: A, y: A) => C {
  return (x, y) => op(f(x), f(y))
}

export function compose<A, B, C>(bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, C>;
export function compose<A, B, C, D>(cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, D>;
export function compose<A, B, C, D, E>(de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
export function compose<A, B, C, D, E, F>(fe: Fn1<F, E>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, F>;
export function compose<A, B, C, D, E, F, G>(fg: Fn1<F, G>, fe: Fn1<F, E>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, G>;
export function compose<A, B, C, D, E, F, G, H>(fh: Fn1<F, H>, fg: Fn1<F, G>, fe: Fn1<F, E>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, H>;
export function compose<A, B, C, D, E, F, G, H, I>(fi: Fn1<H, I>, fh: Fn1<F, H>, fg: Fn1<F, G>, fe: Fn1<F, E>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, I>;
export function compose<A, B, C, D, E, F, G, H, I, J>(fj: Fn1<I, J>, fi: Fn1<H, I>, fh: Fn1<F, H>, fg: Fn1<F, G>, fe: Fn1<F, E>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, J>;
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

export function pipe<A, B, C>(ab: Fn1<A, B>, bc: Fn1<B, C>): Fn1<A, C>;
export function pipe<A, B, C, D>(ab: Fn1<A, B>, bc: Fn1<B, C>, cd: Fn1<C, D>): Fn1<A, D>;
export function pipe<A, B, C, D, E>(ab: Fn1<A, B>, bc: Fn1<B, C>, cd: Fn1<C, D>, de: Fn1<D, E>): Fn1<A, E>;
export function pipe<A, B, C, D, E, F>(ab: Fn1<A, B>, bc: Fn1<B, C>, cd: Fn1<C, D>, de: Fn1<D, E>, ef: Fn1<E, F>): Fn1<A, F>;
export function pipe<A, B, C, D, E, F, G>(ab: Fn1<A, B>, bc: Fn1<B, C>, cd: Fn1<C, D>, de: Fn1<D, E>, ef: Fn1<E, F>, fg: Fn1<F, G>): Fn1<A, G>;
export function pipe<A, B, C, D, E, F, G, H>(ab: Fn1<A, B>, bc: Fn1<B, C>, cd: Fn1<C, D>, de: Fn1<D, E>, ef: Fn1<E, F>, fg: Fn1<F, G>, gh: Fn1<G, H>): Fn1<A, H>;
export function pipe<A, B, C, D, E, F, G, H, I>(ab: Fn1<A, B>, bc: Fn1<B, C>, cd: Fn1<C, D>, de: Fn1<D, E>, ef: Fn1<E, F>, fg: Fn1<F, G>, gh: Fn1<G, H>, hi: Fn1<H, I>): Fn1<A, I>;
export function pipe<A, B, C, D, E, F, G, H, I, J>(ab: Fn1<A, B>, bc: Fn1<B, C>, cd: Fn1<C, D>, de: Fn1<D, E>, ef: Fn1<E, F>, fg: Fn1<F, G>, gh: Fn1<G, H>, hi: Fn1<H, I>, ij: Fn1<I, J>): Fn1<A, J>;
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

function curried(f: Function, length: number, acc: Array<any>) {
  return function (this: any) {
    const combined = acc.concat(Array.prototype.slice.call(arguments))
    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined)
  }
}

export function curry<A, B, C>(f: Fn2<A, B, C>): CurriedFn2<A, B, C>;
export function curry<A, B, C, D>(f: Fn3<A, B, C, D>): CurriedFn3<A, B, C, D>;
export function curry<A, B, C, D, E>(f: Fn4<A, B, C, D, E>): CurriedFn4<A, B, C, D, E>;
export function curry<A, B, C, D, E, F>(f: Fn5<A, B, C, D, E, F>): CurriedFn5<A, B, C, D, E, F>;
export function curry(f: Function) {
  return curried(f, f.length, [])
}
