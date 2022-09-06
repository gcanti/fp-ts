---
title: Chain.ts
nav_order: 14
parent: Modules
---

## Chain overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [ap](#ap)
  - [chainFirst](#chainfirst)
- [type classes](#type-classes)
  - [Chain (interface)](#chain-interface)
  - [Chain1 (interface)](#chain1-interface)
  - [Chain2 (interface)](#chain2-interface)
  - [Chain2C (interface)](#chain2c-interface)
  - [Chain3 (interface)](#chain3-interface)
  - [Chain3C (interface)](#chain3c-interface)
  - [Chain4 (interface)](#chain4-interface)
- [utils](#utils)
  - [bind](#bind)

---

# combinators

## ap

**Signature**

```ts
export declare function ap<F extends URIS4>(M: Chain4<F>): Apply4<F>['ap']
export declare function ap<F extends URIS3>(M: Chain3<F>): Apply3<F>['ap']
export declare function ap<F extends URIS3, E>(M: Chain3C<F, E>): Apply3C<F, E>['ap']
export declare function ap<F extends URIS2>(M: Chain2<F>): Apply2<F>['ap']
export declare function ap<F extends URIS2, E>(M: Chain2C<F, E>): Apply2C<F, E>['ap']
export declare function ap<F extends URIS>(M: Chain1<F>): Apply1<F>['ap']
export declare function ap<F>(M: Chain<F>): Apply<F>['ap']
```

Added in v3.0.0

## chainFirst

**Signature**

```ts
export declare function chainFirst<M extends URIS4>(
  M: Chain4<M>
): <A, S, R, E, B>(f: (a: A) => Kind4<M, S, R, E, B>) => (first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export declare function chainFirst<M extends URIS3>(
  M: Chain3<M>
): <A, R, E, B>(f: (a: A) => Kind3<M, R, E, B>) => (first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export declare function chainFirst<M extends URIS3, E>(
  M: Chain3C<M, E>
): <A, R, B>(f: (a: A) => Kind3<M, R, E, B>) => (first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export declare function chainFirst<M extends URIS2>(
  M: Chain2<M>
): <A, E, B>(f: (a: A) => Kind2<M, E, B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export declare function chainFirst<M extends URIS2, E>(
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => Kind2<M, E, B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export declare function chainFirst<M extends URIS>(
  M: Chain1<M>
): <A, B>(f: (a: A) => Kind<M, B>) => (first: Kind<M, A>) => Kind<M, A>
export declare function chainFirst<M>(M: Chain<M>): <A, B>(f: (a: A) => HKT<M, B>) => (first: HKT<M, A>) => HKT<M, A>
```

Added in v3.0.0

# type classes

## Chain (interface)

**Signature**

```ts
export interface Chain<M> extends Functor<M> {
  readonly chain: <A, B>(f: (a: A) => HKT<M, B>) => (ma: HKT<M, A>) => HKT<M, B>
}
```

Added in v3.0.0

## Chain1 (interface)

**Signature**

```ts
export interface Chain1<M extends URIS> extends Functor1<M> {
  readonly chain: <A, B>(f: (a: A) => Kind<M, B>) => (ma: Kind<M, A>) => Kind<M, B>
}
```

Added in v3.0.0

## Chain2 (interface)

**Signature**

```ts
export interface Chain2<M extends URIS2> extends Functor2<M> {
  readonly chain: <A, E, B>(f: (a: A) => Kind2<M, E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, B>
}
```

Added in v3.0.0

## Chain2C (interface)

**Signature**

```ts
export interface Chain2C<M extends URIS2, E> extends Functor2C<M, E> {
  readonly chain: <A, B>(f: (a: A) => Kind2<M, E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, B>
}
```

Added in v3.0.0

## Chain3 (interface)

**Signature**

```ts
export interface Chain3<M extends URIS3> extends Functor3<M> {
  readonly chain: <A, R, E, B>(f: (a: A) => Kind3<M, R, E, B>) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
}
```

Added in v3.0.0

## Chain3C (interface)

**Signature**

```ts
export interface Chain3C<M extends URIS3, E> extends Functor3C<M, E> {
  readonly chain: <A, R, B>(f: (a: A) => Kind3<M, R, E, B>) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
}
```

Added in v3.0.0

## Chain4 (interface)

**Signature**

```ts
export interface Chain4<M extends URIS4> extends Functor4<M> {
  readonly chain: <A, S, R, E, B>(
    f: (a: A) => Kind4<M, S, R, E, B>
  ) => (ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, B>
}
```

Added in v3.0.0

# utils

## bind

**Signature**

```ts
export declare function bind<M extends URIS4>(
  M: Chain4<M>
): <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Kind4<M, S, R, E, B>
) => (ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind<M extends URIS3>(
  M: Chain3<M>
): <N extends string, A, R, E, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind<M extends URIS3, E>(
  M: Chain3C<M, E>
): <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind<M extends URIS2>(
  M: Chain2<M>
): <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Kind2<M, E, B>
) => (ma: Kind2<M, E, A>) => Kind2<M, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind<M extends URIS2, E>(
  M: Chain2C<M, E>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Kind2<M, E, B>
) => (ma: Kind2<M, E, A>) => Kind2<M, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind<M extends URIS>(
  M: Chain1<M>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Kind<M, B>
) => (ma: Kind<M, A>) => Kind<M, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind<M>(
  M: Chain<M>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => HKT<M, B>
) => (ma: HKT<M, A>) => HKT<M, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0
