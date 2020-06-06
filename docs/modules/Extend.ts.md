---
title: Extend.ts
nav_order: 28
parent: Modules
---

## Extend overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Extend (interface)](#extend-interface)
  - [Extend1 (interface)](#extend1-interface)
  - [Extend2 (interface)](#extend2-interface)
  - [Extend2C (interface)](#extend2c-interface)
  - [Extend3 (interface)](#extend3-interface)
  - [Extend3C (interface)](#extend3c-interface)
  - [Extend4 (interface)](#extend4-interface)

---

# type classes

## Extend (interface)

**Signature**

```ts
export interface Extend<W> extends Functor<W> {
  readonly extend: <A, B>(wa: HKT<W, A>, f: (wa: HKT<W, A>) => B) => HKT<W, B>
}
```

Added in v2.0.0

## Extend1 (interface)

**Signature**

```ts
export interface Extend1<W extends URIS> extends Functor1<W> {
  readonly extend: <A, B>(wa: Kind<W, A>, f: (wa: Kind<W, A>) => B) => Kind<W, B>
}
```

Added in v2.0.0

## Extend2 (interface)

**Signature**

```ts
export interface Extend2<W extends URIS2> extends Functor2<W> {
  readonly extend: <E, A, B>(wa: Kind2<W, E, A>, f: (wa: Kind2<W, E, A>) => B) => Kind2<W, E, B>
}
```

Added in v2.0.0

## Extend2C (interface)

**Signature**

```ts
export interface Extend2C<W extends URIS2, E> extends Functor2C<W, E> {
  readonly extend: <A, B>(wa: Kind2<W, E, A>, f: (wa: Kind2<W, E, A>) => B) => Kind2<W, E, B>
}
```

Added in v2.0.0

## Extend3 (interface)

**Signature**

```ts
export interface Extend3<W extends URIS3> extends Functor3<W> {
  readonly extend: <R, E, A, B>(wa: Kind3<W, R, E, A>, f: (wa: Kind3<W, R, E, A>) => B) => Kind3<W, R, E, B>
}
```

Added in v2.0.0

## Extend3C (interface)

**Signature**

```ts
export interface Extend3C<W extends URIS3, E> extends Functor3C<W, E> {
  readonly extend: <R, A, B>(wa: Kind3<W, R, E, A>, f: (wa: Kind3<W, R, E, A>) => B) => Kind3<W, R, E, B>
}
```

Added in v2.2.0

## Extend4 (interface)

**Signature**

```ts
export interface Extend4<W extends URIS4> extends Functor4<W> {
  readonly extend: <S, R, E, A, B>(wa: Kind4<W, S, R, E, A>, f: (wa: Kind4<W, S, R, E, A>) => B) => Kind4<W, S, R, E, B>
}
```

Added in v2.0.0
