---
title: Category.ts
nav_order: 14
parent: Modules
---

## Category overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Category (interface)](#category-interface)
  - [Category2 (interface)](#category2-interface)
  - [Category3 (interface)](#category3-interface)
  - [Category4 (interface)](#category4-interface)

---

# type classes

## Category (interface)

**Signature**

```ts
export interface Category<F> extends Semigroupoid<F> {
  readonly id: <A>() => HKT2<F, A, A>
}
```

Added in v2.0.0

## Category2 (interface)

**Signature**

```ts
export interface Category2<F extends URIS2> extends Semigroupoid2<F> {
  readonly id: <A>() => Kind2<F, A, A>
}
```

Added in v2.0.0

## Category3 (interface)

**Signature**

```ts
export interface Category3<F extends URIS3> extends Semigroupoid3<F> {
  readonly id: <R, A>() => Kind3<F, R, A, A>
}
```

Added in v2.0.0

## Category4 (interface)

**Signature**

```ts
export interface Category4<F extends URIS4> extends Semigroupoid4<F> {
  readonly id: <S, R, A>() => Kind4<F, S, R, A, A>
}
```

Added in v2.0.0
