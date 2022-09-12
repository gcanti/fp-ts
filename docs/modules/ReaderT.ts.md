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
  - [fromNaturalTransformation](#fromnaturaltransformation)
  - [fromReader](#fromreader)
- [utils](#utils)
  - [ap](#ap)
  - [chain](#chain)
  - [map](#map)
  - [of](#of)

---

# constructors

## fromNaturalTransformation

**Signature**

```ts
export declare function fromNaturalTransformation<F extends HKT, G extends HKT>(
  nt: NaturalTransformation<F, G>
): <R, S, FR, E, A>(f: (r: R) => Kind<F, S, FR, E, A>) => Reader<R, Kind<G, S, FR, E, A>>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare function fromReader<F extends HKT>(
  F: Pointed<F>
): <R, A, S, FR, E>(ma: Reader<R, A>) => Reader<R, Kind<F, S, FR, E, A>>
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare function ap<F extends HKT>(
  F: Apply<F>
): <R, S, FR, E, A>(
  fa: Reader<R, Kind<F, S, FR, E, A>>
) => <B>(fab: Reader<R, Kind<F, S, FR, E, (a: A) => B>>) => Reader<R, Kind<F, S, FR, E, B>>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare function chain<M extends HKT>(
  M: Chain<M>
): <A, R, S, FR, E, B>(
  f: (a: A) => Reader<R, Kind<M, S, FR, E, B>>
) => (ma: Reader<R, Kind<M, S, FR, E, A>>) => Reader<R, Kind<M, S, FR, E, B>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends HKT>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <R, S, FR, E>(fa: Reader<R, Kind<F, S, FR, E, A>>) => Reader<R, Kind<F, S, FR, E, B>>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends HKT>(F: Pointed<F>): <A, R, S, FR, E>(a: A) => Reader<R, Kind<F, S, FR, E, A>>
```

Added in v3.0.0
