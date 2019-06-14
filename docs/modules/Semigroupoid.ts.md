---
title: Semigroupoid.ts
nav_order: 78
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Semigroupoid (interface)](#semigroupoid-interface)
- [Semigroupoid2 (interface)](#semigroupoid2-interface)
- [Semigroupoid2C (interface)](#semigroupoid2c-interface)
- [Semigroupoid3 (interface)](#semigroupoid3-interface)
- [Semigroupoid3C (interface)](#semigroupoid3c-interface)
- [Semigroupoid4 (interface)](#semigroupoid4-interface)

---

# Semigroupoid (interface)

**Signature**

```ts
export interface Semigroupoid<F> {
  readonly URI: F
  readonly compose: <L, A, B>(ab: HKT2<F, A, B>, la: HKT2<F, L, A>) => HKT2<F, L, B>
}
```

Added in v1.0.0

# Semigroupoid2 (interface)

**Signature**

```ts
export interface Semigroupoid2<F extends URIS2> {
  readonly URI: F
  readonly compose: <L, A, B>(ab: Kind2<F, A, B>, la: Kind2<F, L, A>) => Kind2<F, L, B>
}
```

# Semigroupoid2C (interface)

**Signature**

```ts
export interface Semigroupoid2C<F extends URIS2, L> {
  readonly URI: F
  readonly compose: <A, B>(ab: Kind2<F, A, B>, la: Kind2<F, L, A>) => Kind2<F, L, B>
}
```

# Semigroupoid3 (interface)

**Signature**

```ts
export interface Semigroupoid3<F extends URIS3> {
  readonly URI: F
  readonly compose: <U, L, A, B>(ab: Kind3<F, U, A, B>, la: Kind3<F, U, L, A>) => Kind3<F, U, L, B>
}
```

# Semigroupoid3C (interface)

**Signature**

```ts
export interface Semigroupoid3C<F extends URIS3, U> {
  readonly URI: F
  readonly _U: U
  readonly compose: <L, A, B>(ab: Kind3<F, U, A, B>, la: Kind3<F, U, L, A>) => Kind3<F, U, L, B>
}
```

# Semigroupoid4 (interface)

**Signature**

```ts
export interface Semigroupoid4<F extends URIS4> {
  readonly URI: F
  readonly compose: <X, U, L, A, B>(ab: Kind4<F, X, U, A, B>, la: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, B>
}
```
