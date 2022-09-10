---
title: FromWriter.ts
nav_order: 40
parent: Modules
---

## FromWriter overview

The `FromWriter` type class represents those data types which support accumulators.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [fromWriterK](#fromwriterk)
- [type classes](#type-classes)
  - [FromWriter (interface)](#fromwriter-interface)
  - [FromWriter1 (interface)](#fromwriter1-interface)
  - [FromWriter2 (interface)](#fromwriter2-interface)
  - [FromWriter2C (interface)](#fromwriter2c-interface)
  - [FromWriter3 (interface)](#fromwriter3-interface)
  - [FromWriter3C (interface)](#fromwriter3c-interface)
  - [FromWriter4 (interface)](#fromwriter4-interface)

---

# combinators

## fromWriterK

**Signature**

```ts
export declare function fromWriterK<F extends URIS4>(
  F: FromWriter4<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) => <S, R>(...a: A) => Kind4<F, S, R, E, B>
export declare function fromWriterK<F extends URIS3>(
  F: FromWriter3<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) => <R>(...a: A) => Kind3<F, R, E, B>
export declare function fromWriterK<F extends URIS3, E>(
  F: FromWriter3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Writer<E, B>) => <R>(...a: A) => Kind3<F, R, E, B>
export declare function fromWriterK<F extends URIS2>(
  F: FromWriter2<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) => (...a: A) => Kind2<F, E, B>
export declare function fromWriterK<F extends URIS2, E>(
  F: FromWriter2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Writer<E, B>) => (...a: A) => Kind2<F, E, B>
export declare function fromWriterK<F extends URIS>(
  F: FromWriter1<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) => (...a: A) => Kind<F, B>
export declare function fromWriterK<F>(
  F: FromWriter<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) => (...a: A) => HKT2<F, E, B>
```

Added in v3.0.0

# type classes

## FromWriter (interface)

**Signature**

```ts
export interface FromWriter<F> {
  readonly URI?: F
  readonly fromWriter: <E, A>(e: Writer<E, A>) => HKT2<F, E, A>
}
```

Added in v3.0.0

## FromWriter1 (interface)

**Signature**

```ts
export interface FromWriter1<F extends URIS> {
  readonly URI?: F
  readonly fromWriter: NaturalTransformation21<URI, F>
}
```

Added in v3.0.0

## FromWriter2 (interface)

**Signature**

```ts
export interface FromWriter2<F extends URIS2> {
  readonly URI?: F
  readonly fromWriter: NaturalTransformation22<URI, F>
}
```

Added in v3.0.0

## FromWriter2C (interface)

**Signature**

```ts
export interface FromWriter2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromWriter: NaturalTransformation22C<URI, F, E>
}
```

Added in v3.0.0

## FromWriter3 (interface)

**Signature**

```ts
export interface FromWriter3<F extends URIS3> {
  readonly URI?: F
  readonly fromWriter: NaturalTransformation23<URI, F>
}
```

Added in v3.0.0

## FromWriter3C (interface)

**Signature**

```ts
export interface FromWriter3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromWriter: NaturalTransformation23C<URI, F, E>
}
```

Added in v3.0.0

## FromWriter4 (interface)

**Signature**

```ts
export interface FromWriter4<F extends URIS4> {
  readonly URI?: F
  readonly fromWriter: NaturalTransformation24<URI, F>
}
```

Added in v3.0.0
