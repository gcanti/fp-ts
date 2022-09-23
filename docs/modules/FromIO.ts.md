---
title: FromIO.ts
nav_order: 36
parent: Modules
---

## FromIO overview

Lift a computation from the `IO` monad

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [chainFirstIOK](#chainfirstiok)
  - [chainIOK](#chainiok)
  - [fromIOK](#fromiok)
- [type classes](#type-classes)
  - [FromIO (interface)](#fromio-interface)
  - [FromIO1 (interface)](#fromio1-interface)
  - [FromIO2 (interface)](#fromio2-interface)
  - [FromIO2C (interface)](#fromio2c-interface)
  - [FromIO3 (interface)](#fromio3-interface)
  - [FromIO3C (interface)](#fromio3c-interface)
  - [FromIO4 (interface)](#fromio4-interface)

---

# combinators

## chainFirstIOK

**Signature**

```ts
export declare function chainFirstIOK<M extends URIS4>(
  F: FromIO4<M>,
  M: Chain4<M>
): <A, B>(f: (a: A) => IO<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export declare function chainFirstIOK<M extends URIS3>(
  F: FromIO3<M>,
  M: Chain3<M>
): <A, B>(f: (a: A) => IO<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export declare function chainFirstIOK<M extends URIS3, E>(
  F: FromIO3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => IO<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export declare function chainFirstIOK<M extends URIS2>(
  F: FromIO2<M>,
  M: Chain2<M>
): <A, B>(f: (a: A) => IO<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, A>
export declare function chainFirstIOK<M extends URIS2, E>(
  F: FromIO2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => IO<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, A>
export declare function chainFirstIOK<M extends URIS>(
  F: FromIO1<M>,
  M: Chain1<M>
): <A, B>(f: (a: A) => IO<B>) => (first: Kind<M, A>) => Kind<M, A>
export declare function chainFirstIOK<M>(
  F: FromIO<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => IO<B>) => (first: HKT<M, A>) => HKT<M, A>
```

Added in v2.10.0

## chainIOK

**Signature**

```ts
export declare function chainIOK<M extends URIS4>(
  F: FromIO4<M>,
  M: Chain4<M>
): <A, B>(f: (a: A) => IO<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, B>
export declare function chainIOK<M extends URIS3>(
  F: FromIO3<M>,
  M: Chain3<M>
): <A, B>(f: (a: A) => IO<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export declare function chainIOK<M extends URIS3, E>(
  F: FromIO3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => IO<B>) => <R>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export declare function chainIOK<M extends URIS2>(
  F: FromIO2<M>,
  M: Chain2<M>
): <A, B>(f: (a: A) => IO<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, B>
export declare function chainIOK<M extends URIS2, E>(
  F: FromIO2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => IO<B>) => (first: Kind2<M, E, A>) => Kind2<M, E, B>
export declare function chainIOK<M extends URIS>(
  F: FromIO1<M>,
  M: Chain1<M>
): <A, B>(f: (a: A) => IO<B>) => (first: Kind<M, A>) => Kind<M, B>
export declare function chainIOK<M>(
  F: FromIO<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => IO<B>) => (first: HKT<M, A>) => HKT<M, B>
```

Added in v2.10.0

## fromIOK

**Signature**

```ts
export declare function fromIOK<F extends URIS4>(
  F: FromIO4<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <S, R, E>(...a: A) => Kind4<F, S, R, E, B>
export declare function fromIOK<F extends URIS3>(
  F: FromIO3<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <R, E>(...a: A) => Kind3<F, R, E, B>
export declare function fromIOK<F extends URIS3, E>(
  F: FromIO3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <R>(...a: A) => Kind3<F, R, E, B>
export declare function fromIOK<F extends URIS2>(
  F: FromIO2<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <E>(...a: A) => Kind2<F, E, B>
export declare function fromIOK<F extends URIS2, E>(
  F: FromIO2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => Kind2<F, E, B>
export declare function fromIOK<F extends URIS>(
  F: FromIO1<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => Kind<F, B>
export declare function fromIOK<F>(
  F: FromIO<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => HKT<F, B>
```

Added in v2.10.0

# type classes

## FromIO (interface)

**Signature**

```ts
export interface FromIO<F> {
  readonly URI: F
  readonly fromIO: <A>(fa: IO<A>) => HKT<F, A>
}
```

Added in v2.10.0

## FromIO1 (interface)

**Signature**

```ts
export interface FromIO1<F extends URIS> {
  readonly URI: F
  readonly fromIO: <A>(fa: IO<A>) => Kind<F, A>
}
```

Added in v2.10.0

## FromIO2 (interface)

**Signature**

```ts
export interface FromIO2<F extends URIS2> {
  readonly URI: F
  readonly fromIO: <A, E>(fa: IO<A>) => Kind2<F, E, A>
}
```

Added in v2.10.0

## FromIO2C (interface)

**Signature**

```ts
export interface FromIO2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly fromIO: <A>(fa: IO<A>) => Kind2<F, E, A>
}
```

Added in v2.10.0

## FromIO3 (interface)

**Signature**

```ts
export interface FromIO3<F extends URIS3> {
  readonly URI: F
  readonly fromIO: <A, R, E>(fa: IO<A>) => Kind3<F, R, E, A>
}
```

Added in v2.10.0

## FromIO3C (interface)

**Signature**

```ts
export interface FromIO3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly fromIO: <A, R>(fa: IO<A>) => Kind3<F, R, E, A>
}
```

Added in v2.10.0

## FromIO4 (interface)

**Signature**

```ts
export interface FromIO4<F extends URIS4> {
  readonly URI: F
  readonly fromIO: <A, S, R, E>(fa: IO<A>) => Kind4<F, S, R, E, A>
}
```

Added in v2.10.0
