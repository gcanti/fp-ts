---
title: Category.ts
nav_order: 13
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Category (interface)](#category-interface)
- [Category2 (interface)](#category2-interface)
- [Category3 (interface)](#category3-interface)
- [Category4 (interface)](#category4-interface)

---

# Category (interface)

**Signature**

```ts
export interface Category<F> extends Semigroupoid<F> {
  readonly id: <A>() => HKT2<F, A, A>
}
```

Added in v2.0.0

# Category2 (interface)

**Signature**

```ts
export interface Category2<F extends URIS2> extends Semigroupoid2<F> {
  readonly id: <A>() => Type2<F, A, A>
}
```

Added in v2.0.0

# Category3 (interface)

**Signature**

```ts
export interface Category3<F extends URIS3> extends Semigroupoid3<F> {
  readonly id: <U, A>() => Type3<F, U, A, A>
}
```

Added in v2.0.0

# Category4 (interface)

**Signature**

```ts
export interface Category4<F extends URIS4> extends Semigroupoid4<F> {
  readonly id: <X, U, A>() => Type4<F, X, U, A, A>
}
```

Added in v2.0.0
