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
export declare const fromReader: <F extends TypeLambda>(
  F: Pointed<F>
) => <R, A, S>(ma: Reader<R, A>) => Reader<R, Kind<F, S, unknown, never, never, A>>
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  F: Apply<F>
) => <R2, S, FR2, O2, E2, A>(
  fa: Reader<R2, Kind<F, S, FR2, O2, E2, A>>
) => <R1, FR1, O1, E1, B>(
  fab: Reader<R1, Kind<F, S, FR1, O1, E1, (a: A) => B>>
) => Reader<R1 & R2, Kind<F, S, FR1 & FR2, O2 | O1, E2 | E1, B>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <M extends TypeLambda>(
  M: Flattenable<M>
) => <A, R2, S, FR2, O2, E2, B>(
  f: (a: A) => Reader<R2, Kind<M, S, FR2, O2, E2, B>>
) => <R1, FR1, O1, E1>(
  ma: Reader<R1, Kind<M, S, FR1, O1, E1, A>>
) => Reader<R1 & R2, Kind<M, S, FR1 & FR2, O2 | O1, E2 | E1, B>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends TypeLambda>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <R, S, FR, O, E>(fa: Reader<R, Kind<F, S, FR, O, E, A>>) => Reader<R, Kind<F, S, FR, O, E, B>>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends TypeLambda>(
  F: Pointed<F>
): <A, R, S, FR, O, E>(a: A) => Reader<R, Kind<F, S, FR, O, E, A>>
```

Added in v3.0.0
