---
title: ReaderT.ts
nav_order: 75
parent: Modules
---

## ReaderT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromReader](#fromreader)
- [utils](#utils)
  - [ap](#ap)
  - [flatMap](#flatmap)
  - [map](#map)
  - [of](#of)

---

# constructors

## fromReader

**Signature**

```ts
export declare const fromReader: <F extends HKT>(
  F: Pointed<F>
) => <R, A, S, FR = unknown, W = never, E = never>(ma: Reader<R, A>) => Reader<R, Kind<F, S, FR, W, E, A>>
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <F extends HKT>(
  F: Apply<F>
) => <R2, S, FR2, W2, E2, A>(
  fa: Reader<R2, Kind<F, S, FR2, W2, E2, A>>
) => <R1, FR1, W1, E1, B>(
  fab: Reader<R1, Kind<F, S, FR1, W1, E1, (a: A) => B>>
) => Reader<R1 & R2, Kind<F, S, FR1 & FR2, W2 | W1, E2 | E1, B>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <M extends HKT>(
  M: Flat<M>
) => <A, R2, S, FR2, W2, E2, B>(
  f: (a: A) => Reader<R2, Kind<M, S, FR2, W2, E2, B>>
) => <R1, FR1, W1, E1>(
  ma: Reader<R1, Kind<M, S, FR1, W1, E1, A>>
) => Reader<R1 & R2, Kind<M, S, FR1 & FR2, W2 | W1, E2 | E1, B>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends HKT>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <R, S, FR, W, E>(fa: Reader<R, Kind<F, S, FR, W, E, A>>) => Reader<R, Kind<F, S, FR, W, E, B>>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends HKT>(
  F: Pointed<F>
): <A, R, S, FR, W, E>(a: A) => Reader<R, Kind<F, S, FR, W, E, A>>
```

Added in v3.0.0
