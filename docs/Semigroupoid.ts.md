---
title: Semigroupoid.ts
nav_order: 74
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Semigroupoid](#semigroupoid)
- [Semigroupoid2](#semigroupoid2)
- [Semigroupoid3](#semigroupoid3)
- [Semigroupoid3C](#semigroupoid3c)
- [Semigroupoid4](#semigroupoid4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Semigroupoid

**Signature** (interface)

```ts
export interface Semigroupoid<F> {
  readonly URI: F
  readonly compose: <L, A, B>(ab: HKT2<F, A, B>, la: HKT2<F, L, A>) => HKT2<F, L, B>
}
```

Added in v1.0.0

# Semigroupoid2

**Signature** (interface)

```ts
export interface Semigroupoid2<F extends URIS2> {
  readonly URI: F
  readonly compose: <L, A, B>(ab: Type2<F, A, B>, la: Type2<F, L, A>) => Type2<F, L, B>
}
```

# Semigroupoid3

**Signature** (interface)

```ts
export interface Semigroupoid3<F extends URIS3> {
  readonly URI: F
  readonly compose: <U, L, A, B>(ab: Type3<F, U, A, B>, la: Type3<F, U, L, A>) => Type3<F, U, L, B>
}
```

# Semigroupoid3C

**Signature** (interface)

```ts
export interface Semigroupoid3C<F extends URIS3, U> {
  readonly URI: F
  readonly _U: U
  readonly compose: <L, A, B>(ab: Type3<F, U, A, B>, la: Type3<F, U, L, A>) => Type3<F, U, L, B>
}
```

# Semigroupoid4

**Signature** (interface)

```ts
export interface Semigroupoid4<F extends URIS4> {
  readonly URI: F
  readonly compose: <X, U, L, A, B>(ab: Type4<F, X, U, A, B>, la: Type4<F, X, U, L, A>) => Type4<F, X, U, L, B>
}
```
