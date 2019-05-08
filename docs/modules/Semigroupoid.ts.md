---
title: Semigroupoid.ts
nav_order: 73
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Semigroupoid (interface)](#semigroupoid-interface)
- [Semigroupoid2 (interface)](#semigroupoid2-interface)
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

Added in v2.0.0

# Semigroupoid2 (interface)

**Signature**

```ts
export interface Semigroupoid2<F extends URIS2> {
  readonly URI: F
  readonly compose: <L, A, B>(ab: Type2<F, A, B>, la: Type2<F, L, A>) => Type2<F, L, B>
}
```

# Semigroupoid3 (interface)

**Signature**

```ts
export interface Semigroupoid3<F extends URIS3> {
  readonly URI: F
  readonly compose: <U, L, A, B>(ab: Type3<F, U, A, B>, la: Type3<F, U, L, A>) => Type3<F, U, L, B>
}
```

# Semigroupoid3C (interface)

**Signature**

```ts
export interface Semigroupoid3C<F extends URIS3, U> {
  readonly URI: F
  readonly _U: U
  readonly compose: <L, A, B>(ab: Type3<F, U, A, B>, la: Type3<F, U, L, A>) => Type3<F, U, L, B>
}
```

# Semigroupoid4 (interface)

**Signature**

```ts
export interface Semigroupoid4<F extends URIS4> {
  readonly URI: F
  readonly compose: <X, U, L, A, B>(ab: Type4<F, X, U, A, B>, la: Type4<F, X, U, L, A>) => Type4<F, X, U, L, B>
}
```
