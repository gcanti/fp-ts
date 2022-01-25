---
title: Divisible.ts
nav_order: 25
parent: Modules
---

## Divisible overview

Added in v2.12.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Divisible (interface)](#divisible-interface)
  - [Divisible1 (interface)](#divisible1-interface)
  - [Divisible2 (interface)](#divisible2-interface)
  - [Divisible2C (interface)](#divisible2c-interface)
  - [Divisible3 (interface)](#divisible3-interface)
  - [Divisible3C (interface)](#divisible3c-interface)
  - [Divisible4 (interface)](#divisible4-interface)

---

# type classes

## Divisible (interface)

**Signature**

```ts
export interface Divisible<F> extends Contravariant<F> {
  readonly divide: <C, B, A>(f: (a: A) => [B, C], first: HKT<F, B>, second: HKT<F, C>) => HKT<F, A>
  readonly conquer: HKT<F, unknown>
}
```

Added in v2.12.0

## Divisible1 (interface)

**Signature**

```ts
export interface Divisible1<F extends URIS> extends Contravariant1<F> {
  readonly divide: <C, B, A>(f: (a: A) => [B, C], first: Kind<F, B>, second: Kind<F, C>) => Kind<F, A>
  readonly conquer: Kind<F, unknown>
}
```

Added in v2.12.0

## Divisible2 (interface)

**Signature**

```ts
export interface Divisible2<F extends URIS2> extends Contravariant2<F> {
  readonly divide: <E, C, B, A>(f: (a: A) => [B, C], first: Kind2<F, E, B>, second: Kind2<F, E, C>) => Kind2<F, E, A>
  readonly conquer: Kind2<F, unknown, unknown>
}
```

Added in v2.12.0

## Divisible2C (interface)

**Signature**

```ts
export interface Divisible2C<F extends URIS2, E> extends Contravariant2C<F, E> {
  readonly divide: <C, B, A>(f: (a: A) => [B, C], first: Kind2<F, E, B>, second: Kind2<F, E, C>) => Kind2<F, E, A>
  readonly conquer: Kind2<F, E, unknown>
}
```

Added in v2.12.0

## Divisible3 (interface)

**Signature**

```ts
export interface Divisible3<F extends URIS3> extends Contravariant3<F> {
  readonly divide: <R, E, C, B, A>(
    f: (a: A) => [B, C],
    first: Kind3<F, R, E, B>,
    second: Kind3<F, R, E, C>
  ) => Kind3<F, R, E, A>
  readonly conquer: Kind3<F, unknown, unknown, unknown>
}
```

Added in v2.12.0

## Divisible3C (interface)

**Signature**

```ts
export interface Divisible3C<F extends URIS3, E> extends Contravariant3C<F, E> {
  readonly divide: <R, C, B, A>(
    f: (a: A) => [B, C],
    first: Kind3<F, R, E, B>,
    second: Kind3<F, R, E, C>
  ) => Kind3<F, R, E, A>
  readonly conquer: Kind3<F, unknown, unknown, unknown>
}
```

Added in v2.12.0

## Divisible4 (interface)

**Signature**

```ts
export interface Divisible4<F extends URIS4> extends Contravariant4<F> {
  readonly divide: <S, R, E, C, B, A>(
    f: (a: A) => [B, C],
    first: Kind4<F, S, R, E, B>,
    second: Kind4<F, S, R, E, C>
  ) => Kind4<F, S, R, E, A>
  readonly conquer: Kind4<F, unknown, unknown, unknown, unknown>
}
```

Added in v2.12.0
