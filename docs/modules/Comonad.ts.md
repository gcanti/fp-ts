---
title: Comonad.ts
nav_order: 18
parent: Modules
---

## Comonad overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Comonad (interface)](#comonad-interface)
  - [Comonad1 (interface)](#comonad1-interface)
  - [Comonad2 (interface)](#comonad2-interface)
  - [Comonad2C (interface)](#comonad2c-interface)
  - [Comonad3 (interface)](#comonad3-interface)

---

# type classes

## Comonad (interface)

**Signature**

```ts
export interface Comonad<W> extends Extend<W> {
  readonly extract: <A>(wa: HKT<W, A>) => A
}
```

Added in v2.0.0

## Comonad1 (interface)

**Signature**

```ts
export interface Comonad1<W extends URIS> extends Extend1<W> {
  readonly extract: <A>(wa: Kind<W, A>) => A
}
```

Added in v2.0.0

## Comonad2 (interface)

**Signature**

```ts
export interface Comonad2<W extends URIS2> extends Extend2<W> {
  readonly extract: <E, A>(wa: Kind2<W, E, A>) => A
}
```

Added in v2.0.0

## Comonad2C (interface)

**Signature**

```ts
export interface Comonad2C<W extends URIS2, E> extends Extend2C<W, E> {
  readonly extract: <A>(wa: Kind2<W, E, A>) => A
}
```

Added in v2.0.0

## Comonad3 (interface)

**Signature**

```ts
export interface Comonad3<W extends URIS3> extends Extend3<W> {
  readonly extract: <R, E, A>(wa: Kind3<W, R, E, A>) => A
}
```

Added in v2.0.0
