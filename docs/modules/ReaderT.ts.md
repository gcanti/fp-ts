---
title: ReaderT.ts
nav_order: 71
parent: Modules
---

## ReaderT overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [~~ReaderT1~~ (interface)](#readert1-interface)
  - [~~ReaderT2~~ (interface)](#readert2-interface)
  - [~~ReaderT~~ (interface)](#readert-interface)
- [utils](#utils)
  - [ap](#ap)
  - [ask](#ask)
  - [asks](#asks)
  - [chain](#chain)
  - [fromReader](#fromreader)
  - [map](#map)
  - [of](#of)
  - [~~ReaderM1~~ (interface)](#readerm1-interface)
  - [~~ReaderM2C~~ (interface)](#readerm2c-interface)
  - [~~ReaderM2~~ (interface)](#readerm2-interface)
  - [~~ReaderM3~~ (interface)](#readerm3-interface)
  - [~~ReaderM~~ (interface)](#readerm-interface)
  - [~~ReaderT3~~ (interface)](#readert3-interface)
  - [~~getReaderM~~](#getreaderm)

---

# model

## ~~ReaderT1~~ (interface)

**Signature**

```ts
export interface ReaderT1<M extends URIS, R, A> {
  (r: R): Kind<M, A>
}
```

Added in v2.0.0

## ~~ReaderT2~~ (interface)

**Signature**

```ts
export interface ReaderT2<M extends URIS2, R, E, A> {
  (r: R): Kind2<M, E, A>
}
```

Added in v2.0.0

## ~~ReaderT~~ (interface)

**Signature**

```ts
export interface ReaderT<M, R, A> {
  (r: R): HKT<M, A>
}
```

Added in v2.0.0

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

Added in v2.10.0

## ask

**Signature**

```ts
export declare function ask<F extends URIS2>(F: Pointed2<F>): <R, E>() => Reader<R, Kind2<F, E, R>>
export declare function ask<F extends URIS>(F: Pointed1<F>): <R>() => Reader<R, Kind<F, R>>
export declare function ask<F>(F: Pointed<F>): <R>() => Reader<R, HKT<F, R>>
```

Added in v2.10.0

## asks

**Signature**

```ts
export declare function asks<F extends URIS2>(F: Pointed2<F>): <R, A, E>(f: (r: R) => A) => Reader<R, Kind2<F, E, A>>
export declare function asks<F extends URIS>(F: Pointed1<F>): <R, A>(f: (r: R) => A) => Reader<R, Kind<F, A>>
export declare function asks<F>(F: Pointed<F>): <R, A>(f: (r: R) => A) => Reader<R, HKT<F, A>>
```

Added in v2.10.0

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

Added in v2.10.0

## fromReader

**Signature**

```ts
export declare function fromReader<F extends URIS2>(
  F: Pointed2<F>
): <R, A, E>(ma: Reader<R, A>) => Reader<R, Kind2<F, E, A>>
export declare function fromReader<F extends URIS>(F: Pointed1<F>): <R, A>(ma: Reader<R, A>) => Reader<R, Kind<F, A>>
export declare function fromReader<F>(F: Pointed<F>): <R, A>(ma: Reader<R, A>) => Reader<R, HKT<F, A>>
```

Added in v2.10.0

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

Added in v2.10.0

## of

**Signature**

```ts
export declare function of<F extends URIS2>(F: Pointed2<F>): <A, R, ME>(a: A) => Reader<R, Kind2<F, ME, A>>
export declare function of<F extends URIS>(F: Pointed1<F>): <A, R>(a: A) => Reader<R, Kind<F, A>>
export declare function of<F>(F: Pointed<F>): <A, R>(a: A) => Reader<R, HKT<F, A>>
```

Added in v2.10.0

## ~~ReaderM1~~ (interface)

**Signature**

```ts
export interface ReaderM1<M extends URIS> {
  readonly map: <R, A, B>(ma: ReaderT1<M, R, A>, f: (a: A) => B) => ReaderT1<M, R, B>
  readonly of: <R, A>(a: A) => ReaderT1<M, R, A>
  readonly ap: <R, A, B>(mab: ReaderT1<M, R, (a: A) => B>, ma: ReaderT1<M, R, A>) => ReaderT1<M, R, B>
  readonly chain: <R, A, B>(ma: ReaderT1<M, R, A>, f: (a: A) => ReaderT1<M, R, B>) => ReaderT1<M, R, B>
  readonly ask: <R>() => ReaderT1<M, R, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT1<M, R, A>
  readonly local: <R1, A, R2>(ma: ReaderT1<M, R1, A>, f: (d: R2) => R1) => ReaderT1<M, R2, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT1<M, R, A>
  readonly fromM: <R, A>(ma: Kind<M, A>) => ReaderT1<M, R, A>
}
```

Added in v2.0.0

## ~~ReaderM2C~~ (interface)

**Signature**

```ts
export interface ReaderM2C<M extends URIS2, E> {
  readonly map: <R, A, B>(ma: ReaderT2<M, R, E, A>, f: (a: A) => B) => ReaderT2<M, R, E, B>
  readonly of: <R, A>(a: A) => ReaderT2<M, R, E, A>
  readonly ap: <R, A, B>(mab: ReaderT2<M, R, E, (a: A) => B>, ma: ReaderT2<M, R, E, A>) => ReaderT2<M, R, E, B>
  readonly chain: <R, A, B>(ma: ReaderT2<M, R, E, A>, f: (a: A) => ReaderT2<M, R, E, B>) => ReaderT2<M, R, E, B>
  readonly ask: <R>() => ReaderT2<M, R, E, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT2<M, R, E, A>
  readonly local: <R1, A, R2>(ma: ReaderT2<M, R1, E, A>, f: (d: R2) => R1) => ReaderT2<M, R2, E, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT2<M, R, E, A>
  readonly fromM: <R, A>(ma: Kind2<M, E, A>) => ReaderT2<M, R, E, A>
}
```

Added in v2.2.0

## ~~ReaderM2~~ (interface)

**Signature**

```ts
export interface ReaderM2<M extends URIS2> {
  readonly map: <R, E, A, B>(ma: ReaderT2<M, R, E, A>, f: (a: A) => B) => ReaderT2<M, R, E, B>
  readonly of: <R, E, A>(a: A) => ReaderT2<M, R, E, A>
  readonly ap: <R, E, A, B>(mab: ReaderT2<M, R, E, (a: A) => B>, ma: ReaderT2<M, R, E, A>) => ReaderT2<M, R, E, B>
  readonly chain: <R, E, A, B>(ma: ReaderT2<M, R, E, A>, f: (a: A) => ReaderT2<M, R, E, B>) => ReaderT2<M, R, E, B>
  readonly ask: <R, E>() => ReaderT2<M, R, E, R>
  readonly asks: <R, E, A>(f: (r: R) => A) => ReaderT2<M, R, E, A>
  readonly local: <R1, E, A, R2>(ma: ReaderT2<M, R1, E, A>, f: (d: R2) => R1) => ReaderT2<M, R2, E, A>
  readonly fromReader: <R, E, A>(ma: Reader<R, A>) => ReaderT2<M, R, E, A>
  readonly fromM: <R, E, A>(ma: Kind2<M, E, A>) => ReaderT2<M, R, E, A>
}
```

Added in v2.0.0

## ~~ReaderM3~~ (interface)

**Signature**

```ts
export interface ReaderM3<M extends URIS3> {
  readonly map: <R, U, E, A, B>(ma: ReaderT3<M, R, U, E, A>, f: (a: A) => B) => ReaderT3<M, R, U, E, B>
  readonly of: <R, U, E, A>(a: A) => ReaderT3<M, R, U, E, A>
  readonly ap: <R, U, E, A, B>(
    mab: ReaderT3<M, R, U, E, (a: A) => B>,
    ma: ReaderT3<M, R, U, E, A>
  ) => ReaderT3<M, R, U, E, B>
  readonly chain: <R, U, E, A, B>(
    ma: ReaderT3<M, R, U, E, A>,
    f: (a: A) => ReaderT3<M, R, U, E, B>
  ) => ReaderT3<M, R, U, E, B>
  readonly ask: <R, U, E>() => ReaderT3<M, R, U, E, R>
  readonly asks: <R, U, E, A>(f: (r: R) => A) => ReaderT3<M, R, U, E, A>
  readonly local: <R1, U, E, A, R2>(ma: ReaderT3<M, R1, U, E, A>, f: (d: R2) => R1) => ReaderT3<M, R2, U, E, A>
  readonly fromReader: <R, U, E, A>(ma: Reader<R, A>) => ReaderT3<M, R, U, E, A>
  readonly fromM: <R, U, E, A>(ma: Kind3<M, U, E, A>) => ReaderT3<M, R, U, E, A>
}
```

Added in v2.0.0

## ~~ReaderM~~ (interface)

**Signature**

```ts
export interface ReaderM<M> {
  readonly map: <R, A, B>(ma: ReaderT<M, R, A>, f: (a: A) => B) => ReaderT<M, R, B>
  readonly of: <R, A>(a: A) => ReaderT<M, R, A>
  readonly ap: <R, A, B>(mab: ReaderT<M, R, (a: A) => B>, ma: ReaderT<M, R, A>) => ReaderT<M, R, B>
  readonly chain: <R, A, B>(ma: ReaderT<M, R, A>, f: (a: A) => ReaderT<M, R, B>) => ReaderT<M, R, B>
  readonly ask: <R>() => ReaderT<M, R, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT<M, R, A>
  readonly local: <R1, A, R2>(ma: ReaderT<M, R1, A>, f: (d: R2) => R1) => ReaderT<M, R2, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT<M, R, A>
  readonly fromM: <R, A>(ma: HKT<M, A>) => ReaderT<M, R, A>
}
```

Added in v2.0.0

## ~~ReaderT3~~ (interface)

**Signature**

```ts
export interface ReaderT3<M extends URIS3, R, U, E, A> {
  (r: R): Kind3<M, U, E, A>
}
```

Added in v2.0.0

## ~~getReaderM~~

**Signature**

```ts
export declare function getReaderM<M extends URIS3>(M: Monad3<M>): ReaderM3<M>
export declare function getReaderM<M extends URIS2>(M: Monad2<M>): ReaderM2<M>
export declare function getReaderM<M extends URIS2, E>(M: Monad2C<M, E>): ReaderM2C<M, E>
export declare function getReaderM<M extends URIS>(M: Monad1<M>): ReaderM1<M>
export declare function getReaderM<M>(M: Monad<M>): ReaderM<M>
```

Added in v2.0.0
