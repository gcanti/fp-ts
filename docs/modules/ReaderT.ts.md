---
title: ReaderT.ts
nav_order: 58
parent: Modules
---

## ReaderT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ap\_](#ap_)
  - [ask\_](#ask_)
  - [asks\_](#asks_)
  - [chain\_](#chain_)
  - [fromReader\_](#fromreader_)
  - [map\_](#map_)
  - [of\_](#of_)

---

# utils

## ap\_

**Signature**

```ts
export declare function ap_<F extends URIS2>(
  F: Apply2<F>
): <R, E, A>(
  fa: Reader<R, Kind2<F, E, A>>
) => <B>(fab: Reader<R, Kind2<F, E, (a: A) => B>>) => Reader<R, Kind2<F, E, B>>
export declare function ap_<F extends URIS>(
  F: Apply1<F>
): <R, A>(fa: Reader<R, Kind<F, A>>) => <B>(fab: Reader<R, Kind<F, (a: A) => B>>) => Reader<R, Kind<F, B>>
export declare function ap_<F>(
  F: Apply<F>
): <R, A>(fa: Reader<R, HKT<F, A>>) => <B>(fab: Reader<R, HKT<F, (a: A) => B>>) => Reader<R, HKT<F, B>>
```

Added in v3.0.0

## ask\_

**Signature**

```ts
export declare function ask_<M extends URIS2>(M: Pointed2<M>): <R, E>() => Reader<R, Kind2<M, E, R>>
export declare function ask_<M extends URIS>(M: Pointed1<M>): <R>() => Reader<R, Kind<M, R>>
export declare function ask_<M>(M: Pointed<M>): <R>() => Reader<R, HKT<M, R>>
```

Added in v3.0.0

## asks\_

**Signature**

```ts
export declare function asks_<M extends URIS2>(
  M: Pointed2<M>
): <R, E = never, A = never>(f: (r: R) => A) => Reader<R, Kind2<M, E, A>>
export declare function asks_<M extends URIS>(M: Pointed1<M>): <R, A = never>(f: (r: R) => A) => Reader<R, Kind<M, A>>
export declare function asks_<M>(M: Pointed<M>): <R, A = never>(f: (r: R) => A) => Reader<R, HKT<M, A>>
```

Added in v3.0.0

## chain\_

**Signature**

```ts
export declare function chain_<M extends URIS2>(
  M: Monad2<M>
): <A, R, E, B>(f: (a: A) => Reader<R, Kind2<M, E, B>>) => (ma: Reader<R, Kind2<M, E, A>>) => Reader<R, Kind2<M, E, B>>
export declare function chain_<M extends URIS>(
  M: Monad1<M>
): <A, R, B>(f: (a: A) => Reader<R, Kind<M, B>>) => (ma: Reader<R, Kind<M, A>>) => Reader<R, Kind<M, B>>
export declare function chain_<M>(
  M: Monad<M>
): <A, R, B>(f: (a: A) => Reader<R, HKT<M, B>>) => (ma: Reader<R, HKT<M, A>>) => Reader<R, HKT<M, B>>
```

Added in v3.0.0

## fromReader\_

**Signature**

```ts
export declare function fromReader_<M extends URIS2>(
  M: Pointed2<M>
): <R, E = never, A = never>(ma: Reader<R, A>) => Reader<R, Kind2<M, E, A>>
export declare function fromReader_<M extends URIS>(
  M: Pointed1<M>
): <R, A = never>(ma: Reader<R, A>) => Reader<R, Kind<M, A>>
export declare function fromReader_<M>(M: Pointed<M>): <R, A = never>(ma: Reader<R, A>) => Reader<R, HKT<M, A>>
```

Added in v3.0.0

## map\_

**Signature**

```ts
export declare function map_<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <R, FE>(fa: Reader<R, Kind2<F, FE, A>>) => Reader<R, Kind2<F, FE, B>>
export declare function map_<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, Kind<F, A>>) => Reader<R, Kind<F, B>>
export declare function map_<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, HKT<F, A>>) => Reader<R, HKT<F, B>>
```

Added in v3.0.0

## of\_

**Signature**

```ts
export declare function of_<M extends URIS2>(M: Pointed2<M>): <A, R, ME>(a: A) => Reader<R, Kind2<M, ME, A>>
export declare function of_<M extends URIS>(M: Pointed1<M>): <A, R>(a: A) => Reader<R, Kind<M, A>>
export declare function of_<M>(M: Pointed<M>): <A, R>(a: A) => Reader<R, HKT<M, A>>
```

Added in v3.0.0
