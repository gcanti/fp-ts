---
title: Category.ts
nav_order: 13
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [Category](#category)
- [Category2](#category2)
- [Category3](#category3)
- [Category3C](#category3c)
- [Category4](#category4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Category

**Signature** (interface)

```ts
export interface Category<F> extends Semigroupoid<F> {
  readonly id: <A>() => HKT2<F, A, A>
}
```

Added in v1.0.0

# Category2

**Signature** (interface)

```ts
export interface Category2<F extends URIS2> extends Semigroupoid2<F> {
  readonly id: <A>() => Type2<F, A, A>
}
```

# Category3

**Signature** (interface)

```ts
export interface Category3<F extends URIS3> extends Semigroupoid3<F> {
  readonly id: <U, A>() => Type3<F, U, A, A>
}
```

# Category3C

**Signature** (interface)

```ts
export interface Category3C<F extends URIS3, U> extends Semigroupoid3C<F, U> {
  readonly id: <A>() => Type3<F, U, A, A>
}
```

# Category4

**Signature** (interface)

```ts
export interface Category4<F extends URIS4> extends Semigroupoid4<F> {
  readonly id: <X, U, A>() => Type4<F, X, U, A, A>
}
```
