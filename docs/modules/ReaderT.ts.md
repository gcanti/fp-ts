---
title: ReaderT.ts
nav_order: 63
parent: Modules
---

## ReaderT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ap](#ap)
  - [ask](#ask)
  - [asks](#asks)
  - [chain](#chain)
  - [fromReader](#fromreader)
  - [map](#map)
  - [of](#of)

---

# utils

## ap

**Signature**

```ts
export declare function ap<F extends URIS2>(
  F: Apply2<F>
): <R, E, A>(
  fa: Reader<R, Kind2<F, E, A>>
) => <B>(fab: Reader<R, Kind2<F, E, (a: A) => B>>) => Reader<R, Kind2<F, E, B>>
export declare function ap<F extends URIS>(
  F: Apply1<F>
): <R, A>(fa: Reader<R, Kind<F, A>>) => <B>(fab: Reader<R, Kind<F, (a: A) => B>>) => Reader<R, Kind<F, B>>
export declare function ap<F>(
  F: Apply<F>
): <R, A>(fa: Reader<R, HKT<F, A>>) => <B>(fab: Reader<R, HKT<F, (a: A) => B>>) => Reader<R, HKT<F, B>>
```

Added in v3.0.0

## ask

**Signature**

```ts
export declare function ask<F extends URIS2>(F: Pointed2<F>): <R, E>() => Reader<R, Kind2<F, E, R>>
export declare function ask<F extends URIS>(F: Pointed1<F>): <R>() => Reader<R, Kind<F, R>>
export declare function ask<F>(F: Pointed<F>): <R>() => Reader<R, HKT<F, R>>
```

Added in v3.0.0

## asks

**Signature**

```ts
export declare function asks<F extends URIS2>(F: Pointed2<F>): <R, A, E>(f: (r: R) => A) => Reader<R, Kind2<F, E, A>>
export declare function asks<F extends URIS>(F: Pointed1<F>): <R, A>(f: (r: R) => A) => Reader<R, Kind<F, A>>
export declare function asks<F>(F: Pointed<F>): <R, A>(f: (r: R) => A) => Reader<R, HKT<F, A>>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare function chain<M extends URIS2>(
  M: Chain2<M>
): <A, R, E, B>(f: (a: A) => Reader<R, Kind2<M, E, B>>) => (ma: Reader<R, Kind2<M, E, A>>) => Reader<R, Kind2<M, E, B>>
export declare function chain<M extends URIS>(
  M: Chain1<M>
): <A, R, B>(f: (a: A) => Reader<R, Kind<M, B>>) => (ma: Reader<R, Kind<M, A>>) => Reader<R, Kind<M, B>>
export declare function chain<M>(
  M: Chain<M>
): <A, R, B>(f: (a: A) => Reader<R, HKT<M, B>>) => (ma: Reader<R, HKT<M, A>>) => Reader<R, HKT<M, B>>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare function fromReader<F extends URIS2>(
  F: Pointed2<F>
): <R, A, E>(ma: Reader<R, A>) => Reader<R, Kind2<F, E, A>>
export declare function fromReader<F extends URIS>(F: Pointed1<F>): <R, A>(ma: Reader<R, A>) => Reader<R, Kind<F, A>>
export declare function fromReader<F>(F: Pointed<F>): <R, A>(ma: Reader<R, A>) => Reader<R, HKT<F, A>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <R, FE>(fa: Reader<R, Kind2<F, FE, A>>) => Reader<R, Kind2<F, FE, B>>
export declare function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, Kind<F, A>>) => Reader<R, Kind<F, B>>
export declare function map<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, HKT<F, A>>) => Reader<R, HKT<F, B>>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends URIS2>(F: Pointed2<F>): <A, R, ME>(a: A) => Reader<R, Kind2<F, ME, A>>
export declare function of<F extends URIS>(F: Pointed1<F>): <A, R>(a: A) => Reader<R, Kind<F, A>>
export declare function of<F>(F: Pointed<F>): <A, R>(a: A) => Reader<R, HKT<F, A>>
```

Added in v3.0.0
