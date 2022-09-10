---
title: StateT.ts
nav_order: 93
parent: Modules
---

## StateT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [StateT (interface)](#statet-interface)
  - [StateT1 (interface)](#statet1-interface)
  - [StateT2 (interface)](#statet2-interface)
  - [StateT3 (interface)](#statet3-interface)
  - [ap](#ap)
  - [chain](#chain)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [fromF](#fromf)
  - [fromState](#fromstate)
  - [map](#map)
  - [of](#of)

---

# utils

## StateT (interface)

**Signature**

```ts
export interface StateT<M, S, A> {
  (s: S): HKT<M, readonly [A, S]>
}
```

Added in v3.0.0

## StateT1 (interface)

**Signature**

```ts
export interface StateT1<M extends URIS, S, A> {
  (s: S): Kind<M, readonly [A, S]>
}
```

Added in v3.0.0

## StateT2 (interface)

**Signature**

```ts
export interface StateT2<M extends URIS2, S, E, A> {
  (s: S): Kind2<M, E, readonly [A, S]>
}
```

Added in v3.0.0

## StateT3 (interface)

**Signature**

```ts
export interface StateT3<M extends URIS3, S, R, E, A> {
  (s: S): Kind3<M, R, E, readonly [A, S]>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare function ap<M extends URIS3>(
  M: Chain3<M>
): <S, R, E, A>(fa: StateT3<M, S, R, E, A>) => <B>(fab: StateT3<M, S, R, E, (a: A) => B>) => StateT3<M, S, R, E, B>
export declare function ap<M extends URIS3, E>(
  M: Chain3C<M, E>
): <S, R, A>(fa: StateT3<M, S, R, E, A>) => <B>(fab: StateT3<M, S, R, E, (a: A) => B>) => StateT3<M, S, R, E, B>
export declare function ap<M extends URIS2>(
  M: Chain2<M>
): <S, E, A>(fa: StateT2<M, S, E, A>) => <B>(fab: StateT2<M, S, E, (a: A) => B>) => StateT2<M, S, E, B>
export declare function ap<M extends URIS2, E>(
  M: Chain2C<M, E>
): <S, A>(fa: StateT2<M, S, E, A>) => <B>(fab: StateT2<M, S, E, (a: A) => B>) => StateT2<M, S, E, B>
export declare function ap<M extends URIS>(
  M: Chain1<M>
): <S, A>(fa: StateT1<M, S, A>) => <B>(fab: StateT1<M, S, (a: A) => B>) => StateT1<M, S, B>
export declare function ap<M>(
  M: Chain<M>
): <S, A>(fa: StateT<M, S, A>) => <B>(fab: StateT<M, S, (a: A) => B>) => StateT<M, S, B>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare function chain<M extends URIS3>(
  M: Chain3<M>
): <A, S, R, E, B>(f: (a: A) => StateT3<M, S, R, E, B>) => (ma: StateT3<M, S, R, E, A>) => StateT3<M, S, R, E, B>
export declare function chain<M extends URIS3, E>(
  M: Chain3C<M, E>
): <A, S, R, B>(f: (a: A) => StateT3<M, S, R, E, B>) => (ma: StateT3<M, S, R, E, A>) => StateT3<M, S, R, E, B>
export declare function chain<M extends URIS2>(
  M: Chain2<M>
): <A, S, E, B>(f: (a: A) => StateT2<M, S, E, B>) => (ma: StateT2<M, S, E, A>) => StateT2<M, S, E, B>
export declare function chain<M extends URIS2, E>(
  M: Chain2C<M, E>
): <A, S, B>(f: (a: A) => StateT2<M, S, E, B>) => (ma: StateT2<M, S, E, A>) => StateT2<M, S, E, B>
export declare function chain<M extends URIS>(
  M: Chain1<M>
): <A, S, B>(f: (a: A) => StateT1<M, S, B>) => (ma: StateT1<M, S, A>) => StateT1<M, S, B>
export declare function chain<M>(
  M: Chain<M>
): <A, S, B>(f: (a: A) => StateT<M, S, B>) => (ma: StateT<M, S, A>) => StateT<M, S, B>
```

Added in v3.0.0

## evaluate

**Signature**

```ts
export declare function evaluate<F extends URIS3>(
  F: Functor3<F>
): <S>(s: S) => <R, E, A>(ma: StateT3<F, S, R, E, A>) => Kind3<F, R, E, A>
export declare function evaluate<F extends URIS3, E>(
  F: Functor3C<F, E>
): <S>(s: S) => <R, A>(ma: StateT3<F, S, R, E, A>) => Kind3<F, R, E, A>
export declare function evaluate<F extends URIS2>(
  F: Functor2<F>
): <S>(s: S) => <E, A>(ma: StateT2<F, S, E, A>) => Kind2<F, E, A>
export declare function evaluate<F extends URIS2, E>(
  F: Functor2C<F, E>
): <S>(s: S) => <A>(ma: StateT2<F, S, E, A>) => Kind2<F, E, A>
export declare function evaluate<F extends URIS>(F: Functor1<F>): <S>(s: S) => <A>(ma: StateT1<F, S, A>) => Kind<F, A>
export declare function evaluate<F>(F: Functor<F>): <S>(s: S) => <A>(ma: StateT<F, S, A>) => HKT<F, A>
```

Added in v3.0.0

## execute

**Signature**

```ts
export declare function execute<F extends URIS3>(
  F: Functor3<F>
): <S>(s: S) => <R, E, A>(ma: StateT3<F, S, R, E, A>) => Kind3<F, R, E, S>
export declare function execute<F extends URIS3, E>(
  F: Functor3C<F, E>
): <S>(s: S) => <R, A>(ma: StateT3<F, S, R, E, A>) => Kind3<F, R, E, S>
export declare function execute<F extends URIS2>(
  F: Functor2<F>
): <S>(s: S) => <E, A>(ma: StateT2<F, S, E, A>) => Kind2<F, E, S>
export declare function execute<F extends URIS2, E>(
  F: Functor2C<F, E>
): <S>(s: S) => <A>(ma: StateT2<F, S, E, A>) => Kind2<F, E, S>
export declare function execute<F extends URIS>(F: Functor1<F>): <S>(s: S) => <A>(ma: StateT1<F, S, A>) => Kind<F, S>
export declare function execute<F>(F: Functor<F>): <S>(s: S) => <A>(ma: StateT<F, S, A>) => HKT<F, S>
```

Added in v3.0.0

## fromF

**Signature**

```ts
export declare function fromF<F extends URIS3>(
  F: Functor3<F>
): <R, E, A, S>(ma: Kind3<F, R, E, A>) => StateT3<F, S, R, E, A>
export declare function fromF<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, A, S>(ma: Kind3<F, R, E, A>) => StateT3<F, S, R, E, A>
export declare function fromF<F extends URIS2>(F: Functor2<F>): <E, A, S>(ma: Kind2<F, E, A>) => StateT2<F, S, E, A>
export declare function fromF<F extends URIS2, E>(F: Functor2C<F, E>): <A, S>(ma: Kind2<F, E, A>) => StateT2<F, S, E, A>
export declare function fromF<F extends URIS>(F: Functor1<F>): <A, S>(ma: Kind<F, A>) => StateT1<F, S, A>
export declare function fromF<F>(F: Functor<F>): <A, S>(ma: HKT<F, A>) => StateT<F, S, A>
```

Added in v3.0.0

## fromState

**Signature**

```ts
export declare function fromState<F extends URIS3>(
  F: Pointed3<F>
): <S, A, R, E>(sa: State<S, A>) => StateT3<F, S, R, E, A>
export declare function fromState<F extends URIS3, E>(
  F: Pointed3C<F, E>
): <S, A, R>(sa: State<S, A>) => StateT3<F, S, R, E, A>
export declare function fromState<F extends URIS2>(F: Pointed2<F>): <S, A, E>(sa: State<S, A>) => StateT2<F, S, E, A>
export declare function fromState<F extends URIS2, E>(
  F: Pointed2C<F, E>
): <S, A>(sa: State<S, A>) => StateT2<F, S, E, A>
export declare function fromState<F extends URIS>(F: Pointed1<F>): <S, A>(sa: State<S, A>) => StateT1<F, S, A>
export declare function fromState<F>(F: Pointed<F>): <S, A>(sa: State<S, A>) => StateT<F, S, A>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: StateT3<F, S, R, E, A>) => StateT3<F, S, R, E, B>
export declare function map<F extends URIS3, E>(
  F: Functor3C<F, E>
): <A, B>(f: (a: A) => B) => <S, R>(fa: StateT3<F, S, R, E, A>) => StateT3<F, S, R, E, B>
export declare function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <S, E>(fa: StateT2<F, S, E, A>) => StateT2<F, S, E, B>
export declare function map<F extends URIS2, E>(
  F: Functor2C<F, E>
): <A, B>(f: (a: A) => B) => <S>(fa: StateT2<F, S, E, A>) => StateT2<F, S, E, B>
export declare function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <S>(fa: StateT1<F, S, A>) => StateT1<F, S, B>
export declare function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <S>(fa: StateT<F, S, A>) => StateT<F, S, B>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends URIS3>(F: Pointed3<F>): <A, S, R, E>(a: A) => StateT3<F, S, R, E, A>
export declare function of<F extends URIS3, E>(F: Pointed3C<F, E>): <A, S, R>(a: A) => StateT3<F, S, R, E, A>
export declare function of<F extends URIS2>(F: Pointed2<F>): <A, S, E>(a: A) => StateT2<F, S, E, A>
export declare function of<F extends URIS2, E>(F: Pointed2C<F, E>): <A, S>(a: A) => StateT2<F, S, E, A>
export declare function of<F extends URIS>(F: Pointed1<F>): <A, S>(a: A) => StateT1<F, S, A>
export declare function of<F>(F: Pointed<F>): <A, S>(a: A) => StateT<F, S, A>
```

Added in v3.0.0
