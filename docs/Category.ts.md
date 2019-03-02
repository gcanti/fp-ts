---
title: Category.ts
nav_order: 13
---

**Table of contents**

- [Category (interface)](#category-interface)
- [Category2 (interface)](#category2-interface)
- [Category3 (interface)](#category3-interface)
- [Category3C (interface)](#category3c-interface)
- [Category4 (interface)](#category4-interface)# Category (interface)

**Signature**

```ts
export interface Category<F> extends Semigroupoid<F> {
  readonly id: <A>() => HKT2<F, A, A>
}
```

Added in v1.0.0

# Category2 (interface)

**Signature**

```ts
export interface Category2<F extends URIS2> extends Semigroupoid2<F> {
  readonly id: <A>() => Type2<F, A, A>
}
```

# Category3 (interface)

**Signature**

```ts
export interface Category3<F extends URIS3> extends Semigroupoid3<F> {
  readonly id: <U, A>() => Type3<F, U, A, A>
}
```

# Category3C (interface)

**Signature**

```ts
export interface Category3C<F extends URIS3, U> extends Semigroupoid3C<F, U> {
  readonly id: <A>() => Type3<F, U, A, A>
}
```

# Category4 (interface)

**Signature**

```ts
export interface Category4<F extends URIS4> extends Semigroupoid4<F> {
  readonly id: <X, U, A>() => Type4<F, X, U, A, A>
}
```
