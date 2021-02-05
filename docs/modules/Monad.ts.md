---
title: Monad.ts
nav_order: 48
parent: Modules
---

## Monad overview

`Monad` instances represent type constructors which support sequential composition.

Instances must satisfy the following laws in addition to the `Functor`:

1. Associativity: `flow(chain(afb), chain(bfc)) <-> chain(flow(afb, chain(bfc)))`
2. Left identity: `of(a) |> chain(f) <-> f(a)`
3. Right identity: `fa |> chain(of) <-> fa`

Note. `Functor`'s `map` can be derived: `map = f => chain(flow(f, of))`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [derivables](#derivables)
  - [ap](#ap)
  - [chainFirst](#chainfirst)
- [type classes](#type-classes)
  - [Monad (interface)](#monad-interface)
  - [Monad1 (interface)](#monad1-interface)
  - [Monad2 (interface)](#monad2-interface)
  - [Monad2C (interface)](#monad2c-interface)
  - [Monad3 (interface)](#monad3-interface)
  - [Monad3C (interface)](#monad3c-interface)
  - [Monad4 (interface)](#monad4-interface)
- [utils](#utils)
  - [bind](#bind)

---

# derivables

## ap

**Signature**

```ts
export declare function ap<F extends URIS4>(M: Monad4<F>): Apply4<F>['ap']
export declare function ap<F extends URIS3>(M: Monad3<F>): Apply3<F>['ap']
export declare function ap<F extends URIS3, E>(M: Monad3C<F, E>): Apply3C<F, E>['ap']
export declare function ap<F extends URIS2>(M: Monad2<F>): Apply2<F>['ap']
export declare function ap<F extends URIS2, E>(M: Monad2C<F, E>): Apply2C<F, E>['ap']
export declare function ap<F extends URIS>(M: Monad1<F>): Apply1<F>['ap']
export declare function ap<F>(M: Monad<F>): Apply<F>['ap']
```

Added in v3.0.0

## chainFirst

**Signature**

```ts
export declare function chainFirst<M extends URIS4>(
  M: Monad4<M>
): <A, S, R, E, B>(f: (a: A) => Kind4<M, S, R, E, B>) => (first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export declare function chainFirst<M extends URIS3>(
  M: Monad3<M>
): <A, R, E, B>(f: (a: A) => Kind3<M, R, E, B>) => (first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export declare function chainFirst<M extends URIS3, E>(
  M: Monad3C<M, E>
): <A, R, B>(f: (a: A) => Kind3<M, R, E, B>) => (first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export declare function chainFirst<M extends URIS2>(
  M: Monad2<M>
): <A, E, B>(f: (a: A) => Kind2<M, E, B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export declare function chainFirst<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(f: (a: A) => Kind2<M, E, B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export declare function chainFirst<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Kind<M, B>) => (first: Kind<M, A>) => Kind<M, A>
export declare function chainFirst<M>(M: Monad<M>): <A, B>(f: (a: A) => HKT<M, B>) => (first: HKT<M, A>) => HKT<M, A>
```

Added in v3.0.0

# type classes

## Monad (interface)

**Signature**

```ts
export interface Monad<M> extends Pointed<M> {
  readonly chain: <A, B>(f: (a: A) => HKT<M, B>) => (ma: HKT<M, A>) => HKT<M, B>
}
```

Added in v3.0.0

## Monad1 (interface)

**Signature**

```ts
export interface Monad1<M extends URIS> extends Pointed1<M> {
  readonly chain: <A, B>(f: (a: A) => Kind<M, B>) => (ma: Kind<M, A>) => Kind<M, B>
}
```

Added in v3.0.0

## Monad2 (interface)

**Signature**

```ts
export interface Monad2<M extends URIS2> extends Pointed2<M> {
  readonly chain: <A, E, B>(f: (a: A) => Kind2<M, E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, B>
}
```

Added in v3.0.0

## Monad2C (interface)

**Signature**

```ts
export interface Monad2C<M extends URIS2, E> extends Pointed2C<M, E> {
  readonly chain: <A, B>(f: (a: A) => Kind2<M, E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, B>
}
```

Added in v3.0.0

## Monad3 (interface)

**Signature**

```ts
export interface Monad3<M extends URIS3> extends Pointed3<M> {
  readonly chain: <A, R, E, B>(f: (a: A) => Kind3<M, R, E, B>) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
}
```

Added in v3.0.0

## Monad3C (interface)

**Signature**

```ts
export interface Monad3C<M extends URIS3, E> extends Pointed3C<M, E> {
  readonly chain: <A, R, B>(f: (a: A) => Kind3<M, R, E, B>) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
}
```

Added in v3.0.0

## Monad4 (interface)

**Signature**

```ts
export interface Monad4<M extends URIS4> extends Pointed4<M> {
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
  M: Monad4<M>
): <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind4<M, S, R, E, B>
) => (ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind<M extends URIS3>(
  M: Monad3<M>
): <N extends string, A, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind<M extends URIS3, E>(
  M: Monad3C<M, E>
): <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind<M extends URIS2>(
  M: Monad2<M>
): <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind2<M, E, B>
) => (ma: Kind2<M, E, A>) => Kind2<M, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind<M extends URIS2, E>(
  M: Monad2C<M, E>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind2<M, E, B>
) => (ma: Kind2<M, E, A>) => Kind2<M, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind<M extends URIS>(
  M: Monad1<M>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind<M, B>
) => (ma: Kind<M, A>) => Kind<M, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function bind<M>(
  M: Monad<M>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => HKT<M, B>
) => (ma: HKT<M, A>) => HKT<M, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0
