---
title: FromTask.ts
nav_order: 39
parent: Modules
---

## FromTask overview

Lift a computation from the `Task` monad

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainTaskK](#chaintaskk)
  - [fromTaskK](#fromtaskk)
- [type classes](#type-classes)
  - [FromTask (interface)](#fromtask-interface)
  - [FromTask1 (interface)](#fromtask1-interface)
  - [FromTask2 (interface)](#fromtask2-interface)
  - [FromTask2C (interface)](#fromtask2c-interface)
  - [FromTask3 (interface)](#fromtask3-interface)
  - [FromTask3C (interface)](#fromtask3c-interface)
  - [FromTask4 (interface)](#fromtask4-interface)

---

# combinators

## chainFirstTaskK

**Signature**

```ts
export declare function chainFirstTaskK<M extends URIS4>(
  F: FromTask4<M>,
  M: Chain4<M>
): <A, B>(f: (a: A) => Task<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export declare function chainFirstTaskK<M extends URIS3>(
  F: FromTask3<M>,
  M: Chain3<M>
): <A, B>(f: (a: A) => Task<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export declare function chainFirstTaskK<M extends URIS3, E>(
  F: FromTask3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => Task<B>) => <R>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export declare function chainFirstTaskK<M extends URIS2>(
  F: FromTask2<M>,
  M: Chain2<M>
): <A, B>(f: (a: A) => Task<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, A>
export declare function chainFirstTaskK<M extends URIS2, E>(
  F: FromTask2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => Task<B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export declare function chainFirstTaskK<M extends URIS>(
  F: FromTask1<M>,
  M: Chain1<M>
): <A, B>(f: (a: A) => Task<B>) => (first: Kind<M, A>) => Kind<M, A>
export declare function chainFirstTaskK<M>(
  F: FromTask<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => Task<B>) => (first: HKT<M, A>) => HKT<M, A>
```

Added in v2.10.0

## chainTaskK

**Signature**

```ts
export declare function chainTaskK<M extends URIS4>(
  F: FromTask4<M>,
  M: Chain4<M>
): <A, B>(f: (a: A) => Task<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, B>
export declare function chainTaskK<M extends URIS3>(
  F: FromTask3<M>,
  M: Chain3<M>
): <A, B>(f: (a: A) => Task<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export declare function chainTaskK<M extends URIS3, E>(
  F: FromTask3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => Task<B>) => <R>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export declare function chainTaskK<M extends URIS2>(
  F: FromTask2<M>,
  M: Chain2<M>
): <A, B>(f: (a: A) => Task<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, B>
export declare function chainTaskK<M extends URIS2, E>(
  F: FromTask2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => Task<B>) => (first: Kind2<M, E, A>) => Kind2<M, E, B>
export declare function chainTaskK<M extends URIS>(
  F: FromTask1<M>,
  M: Chain1<M>
): <A, B>(f: (a: A) => Task<B>) => (first: Kind<M, A>) => Kind<M, B>
export declare function chainTaskK<M>(
  F: FromTask<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => Task<B>) => (first: HKT<M, A>) => HKT<M, B>
```

Added in v2.10.0

## fromTaskK

**Signature**

```ts
export declare function fromTaskK<F extends URIS4>(
  F: FromTask4<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => <S, R, E>(...a: A) => Kind4<F, S, R, E, B>
export declare function fromTaskK<F extends URIS3>(
  F: FromTask3<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => <R, E>(...a: A) => Kind3<F, R, E, B>
export declare function fromTaskK<F extends URIS3, E>(
  F: FromTask3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => <R>(...a: A) => Kind3<F, R, E, B>
export declare function fromTaskK<F extends URIS2>(
  F: FromTask2<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => <E>(...a: A) => Kind2<F, E, B>
export declare function fromTaskK<F extends URIS2, E>(
  F: FromTask2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => (...a: A) => Kind2<F, E, B>
export declare function fromTaskK<F extends URIS>(
  F: FromTask1<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => (...a: A) => Kind<F, B>
export declare function fromTaskK<F>(
  F: FromTask<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => (...a: A) => HKT<F, B>
```

Added in v2.10.0

# type classes

## FromTask (interface)

**Signature**

```ts
export interface FromTask<F> extends FromIO<F> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<F, A>
}
```

Added in v2.10.0

## FromTask1 (interface)

**Signature**

```ts
export interface FromTask1<F extends URIS> extends FromIO1<F> {
  readonly fromTask: <A>(fa: Task<A>) => Kind<F, A>
}
```

Added in v2.10.0

## FromTask2 (interface)

**Signature**

```ts
export interface FromTask2<F extends URIS2> extends FromIO2<F> {
  readonly fromTask: <A, E>(fa: Task<A>) => Kind2<F, E, A>
}
```

Added in v2.10.0

## FromTask2C (interface)

**Signature**

```ts
export interface FromTask2C<F extends URIS2, E> extends FromIO2C<F, E> {
  readonly fromTask: <A>(fa: Task<A>) => Kind2<F, E, A>
}
```

Added in v2.10.0

## FromTask3 (interface)

**Signature**

```ts
export interface FromTask3<F extends URIS3> extends FromIO3<F> {
  readonly fromTask: <A, R, E>(fa: Task<A>) => Kind3<F, R, E, A>
}
```

Added in v2.10.0

## FromTask3C (interface)

**Signature**

```ts
export interface FromTask3C<F extends URIS3, E> extends FromIO3C<F, E> {
  readonly fromTask: <A, R>(fa: Task<A>) => Kind3<F, R, E, A>
}
```

Added in v2.10.0

## FromTask4 (interface)

**Signature**

```ts
export interface FromTask4<F extends URIS4> extends FromIO4<F> {
  readonly fromTask: <A, S, R, E>(fa: Task<A>) => Kind4<F, S, R, E, A>
}
```

Added in v2.10.0
