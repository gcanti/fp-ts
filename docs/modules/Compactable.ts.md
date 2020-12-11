---
title: Compactable.ts
nav_order: 15
parent: Modules
---

## Compactable overview

`Compactable` represents data structures which can be _compacted_/_filtered_.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Compactable (interface)](#compactable-interface)
  - [Compactable1 (interface)](#compactable1-interface)
  - [Compactable2 (interface)](#compactable2-interface)
  - [Compactable2C (interface)](#compactable2c-interface)
  - [Compactable3 (interface)](#compactable3-interface)
  - [Compactable3C (interface)](#compactable3c-interface)
  - [Compactable4 (interface)](#compactable4-interface)
- [utils](#utils)
  - [Separated (interface)](#separated-interface)

---

# type classes

## Compactable (interface)

**Signature**

```ts
export interface Compactable<F> {
  readonly URI: F
  /**
   * Compacts a data structure unwrapping inner Option
   */
  readonly compact: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  /**
   * Separates a data structure moving inner Left to the left side and inner Right to the right side of Separated
   */
  readonly separate: <A, B>(fa: HKT<F, Either<A, B>>) => Separated<HKT<F, A>, HKT<F, B>>
}
```

Added in v2.0.0

## Compactable1 (interface)

**Signature**

```ts
export interface Compactable1<F extends URIS> {
  readonly URI: F
  readonly compact: <A>(fa: Kind<F, Option<A>>) => Kind<F, A>
  readonly separate: <A, B>(fa: Kind<F, Either<A, B>>) => Separated<Kind<F, A>, Kind<F, B>>
}
```

Added in v2.0.0

## Compactable2 (interface)

**Signature**

```ts
export interface Compactable2<F extends URIS2> {
  readonly URI: F
  readonly compact: <E, A>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <E, A, B>(fa: Kind2<F, E, Either<A, B>>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}
```

Added in v2.0.0

## Compactable2C (interface)

**Signature**

```ts
export interface Compactable2C<F extends URIS2, E> {
  readonly URI: F
  readonly compact: <A>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <A, B>(fa: Kind2<F, E, Either<A, B>>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}
```

Added in v2.0.0

## Compactable3 (interface)

**Signature**

```ts
export interface Compactable3<F extends URIS3> {
  readonly URI: F
  readonly compact: <R, E, A>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
  readonly separate: <R, E, A, B>(fa: Kind3<F, R, E, Either<A, B>>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}
```

Added in v2.0.0

## Compactable3C (interface)

**Signature**

```ts
export interface Compactable3C<F extends URIS3, E> {
  readonly URI: F
  readonly compact: <R, A>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
  readonly separate: <R, A, B>(fa: Kind3<F, R, E, Either<A, B>>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}
```

Added in v2.2.0

## Compactable4 (interface)

**Signature**

```ts
export interface Compactable4<F extends URIS4> {
  readonly URI: F
  readonly compact: <S, R, E, A>(fa: Kind4<F, S, R, E, Option<A>>) => Kind4<F, S, R, E, A>
  readonly separate: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, Either<A, B>>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
}
```

Added in v2.0.0

# utils

## Separated (interface)

A `Separated` type which holds `left` and `right` parts.

**Signature**

```ts
export interface Separated<A, B> {
  readonly left: A
  readonly right: B
}
```

Added in v2.0.0
