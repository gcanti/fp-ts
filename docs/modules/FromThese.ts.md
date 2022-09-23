---
title: FromThese.ts
nav_order: 40
parent: Modules
---

## FromThese overview

The `FromThese` type class represents those data types which support errors and warnings.

Added in v2.11.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [fromTheseK](#fromthesek)
- [type classes](#type-classes)
  - [FromThese (interface)](#fromthese-interface)
  - [FromThese2 (interface)](#fromthese2-interface)
  - [FromThese2C (interface)](#fromthese2c-interface)
  - [FromThese3 (interface)](#fromthese3-interface)
  - [FromThese3C (interface)](#fromthese3c-interface)
  - [FromThese4 (interface)](#fromthese4-interface)

---

# combinators

## fromTheseK

**Signature**

```ts
export declare function fromTheseK<F extends URIS4>(
  F: FromThese4<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => These<E, B>) => <S, R>(...a: A) => Kind4<F, S, R, E, B>
export declare function fromTheseK<F extends URIS3>(
  F: FromThese3<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => These<E, B>) => <R>(...a: A) => Kind3<F, R, E, B>
export declare function fromTheseK<F extends URIS3, E>(
  F: FromThese3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => These<E, B>) => <R>(...a: A) => Kind3<F, R, E, B>
export declare function fromTheseK<F extends URIS2>(
  F: FromThese2<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => These<E, B>) => (...a: A) => Kind2<F, E, B>
export declare function fromTheseK<F extends URIS2, E>(
  F: FromThese2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => These<E, B>) => (...a: A) => Kind2<F, E, B>
export declare function fromTheseK<F>(
  F: FromThese<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => These<E, B>) => (...a: A) => HKT2<F, E, B>
```

Added in v2.11.0

# type classes

## FromThese (interface)

**Signature**

```ts
export interface FromThese<F> {
  readonly URI: F
  readonly fromThese: <E, A>(e: These<E, A>) => HKT2<F, E, A>
}
```

Added in v2.11.0

## FromThese2 (interface)

**Signature**

```ts
export interface FromThese2<F extends URIS2> {
  readonly URI: F
  readonly fromThese: <E, A>(fa: These<E, A>) => Kind2<F, E, A>
}
```

Added in v2.11.0

## FromThese2C (interface)

**Signature**

```ts
export interface FromThese2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly fromThese: <A>(fa: These<E, A>) => Kind2<F, E, A>
}
```

Added in v2.11.0

## FromThese3 (interface)

**Signature**

```ts
export interface FromThese3<F extends URIS3> {
  readonly URI: F
  readonly fromThese: <E, A, R>(fa: These<E, A>) => Kind3<F, R, E, A>
}
```

Added in v2.11.0

## FromThese3C (interface)

**Signature**

```ts
export interface FromThese3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly fromThese: <A, R>(fa: These<E, A>) => Kind3<F, R, E, A>
}
```

Added in v2.11.0

## FromThese4 (interface)

**Signature**

```ts
export interface FromThese4<F extends URIS4> {
  readonly URI: F
  readonly fromThese: <E, A, S, R>(fa: These<E, A>) => Kind4<F, S, R, E, A>
}
```

Added in v2.11.0
