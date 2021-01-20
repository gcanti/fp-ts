---
title: Monad.ts
nav_order: 53
parent: Modules
---

## Monad overview

The `Monad` type class combines the operations of the `Chain` and
`Applicative` type classes. Therefore, `Monad` instances represent type
constructors which support sequential composition, and also lifting of
functions of arbitrary arity.

Instances must satisfy the following laws in addition to the `Applicative` and `Chain` laws:

1. Left identity: `M.chain(M.of(a), f) <-> f(a)`
2. Right identity: `M.chain(fa, M.of) <-> fa`

Note. `Functor`'s `map` can be derived: `A.map = (fa, f) => A.chain(fa, a => A.of(f(a)))`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Monad (interface)](#monad-interface)
  - [Monad1 (interface)](#monad1-interface)
  - [Monad2 (interface)](#monad2-interface)
  - [Monad2C (interface)](#monad2c-interface)
  - [Monad3 (interface)](#monad3-interface)
  - [Monad3C (interface)](#monad3c-interface)
  - [Monad4 (interface)](#monad4-interface)
- [utils](#utils)
  - [bind\_](#bind_)
  - [chainFirst\_](#chainfirst_)

---

# type classes

## Monad (interface)

**Signature**

```ts
export interface Monad<F> extends Applicative<F>, Chain<F> {}
```

Added in v2.0.0

## Monad1 (interface)

**Signature**

```ts
export interface Monad1<F extends URIS> extends Applicative1<F>, Chain1<F> {}
```

Added in v2.0.0

## Monad2 (interface)

**Signature**

```ts
export interface Monad2<M extends URIS2> extends Applicative2<M>, Chain2<M> {}
```

Added in v2.0.0

## Monad2C (interface)

**Signature**

```ts
export interface Monad2C<M extends URIS2, L> extends Applicative2C<M, L>, Chain2C<M, L> {}
```

Added in v2.0.0

## Monad3 (interface)

**Signature**

```ts
export interface Monad3<M extends URIS3> extends Applicative3<M>, Chain3<M> {}
```

Added in v2.0.0

## Monad3C (interface)

**Signature**

```ts
export interface Monad3C<M extends URIS3, E> extends Applicative3C<M, E>, Chain3C<M, E> {}
```

Added in v2.2.0

## Monad4 (interface)

**Signature**

```ts
export interface Monad4<M extends URIS4> extends Applicative4<M>, Chain4<M> {}
```

Added in v2.0.0

# utils

## bind\_

**Signature**

```ts
export declare function bind_<M extends URIS4>(
  M: Monad4<M>
): <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind4<M, S, R, E, B>
) => (ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind_<M extends URIS3>(
  M: Monad3<M>
): <N extends string, A, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind_<M extends URIS3, E>(
  M: Monad3C<M, E>
): <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind_<M extends URIS2>(
  M: Monad2<M>
): <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind2<M, E, B>
) => (ma: Kind2<M, E, A>) => Kind2<M, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind_<M extends URIS2, E>(
  M: Monad2C<M, E>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind2<M, E, B>
) => (ma: Kind2<M, E, A>) => Kind2<M, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind_<M extends URIS>(
  M: Monad1<M>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind<M, B>
) => (ma: Kind<M, A>) => Kind<M, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind_<M>(
  M: Monad<M>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => HKT<M, B>
) => (ma: HKT<M, A>) => HKT<M, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.0

## chainFirst\_

**Signature**

```ts
export declare function chainFirst_<M extends URIS4>(
  M: Monad4<M>
): <A, S, R, E, B>(f: (a: A) => Kind4<M, S, R, E, B>) => (first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export declare function chainFirst_<M extends URIS3>(
  M: Monad3<M>
): <A, R, E, B>(f: (a: A) => Kind3<M, R, E, B>) => (first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export declare function chainFirst_<M extends URIS3, E>(
  M: Monad3C<M, E>
): <A, R, B>(f: (a: A) => Kind3<M, R, E, B>) => (first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export declare function chainFirst_<M extends URIS2>(
  M: Monad2<M>
): <A, E, B>(f: (a: A) => Kind2<M, E, B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export declare function chainFirst_<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(f: (a: A) => Kind2<M, E, B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export declare function chainFirst_<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Kind<M, B>) => (first: Kind<M, A>) => Kind<M, A>
export declare function chainFirst_<M>(M: Monad<M>): <A, B>(f: (a: A) => HKT<M, B>) => (first: HKT<M, A>) => HKT<M, A>
```

Added in v2.10.0
