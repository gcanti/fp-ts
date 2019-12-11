---
title: Semigroupoid.ts
nav_order: 72
parent: Modules
---

# Semigroupoid overview

Added in v2.0.0

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
  readonly compose: <E, A, B>(ab: HKT2<F, A, B>, la: HKT2<F, E, A>) => HKT2<F, E, B>
}
```

Added in v2.0.0

# Semigroupoid2 (interface)

**Signature**

```ts
export interface Semigroupoid2<F extends URIS2> {
  readonly URI: F
  readonly compose: <E, A, B>(ab: Kind2<F, A, B>, la: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v2.0.0

# Semigroupoid2C (interface)

**Signature**

```ts
export interface Semigroupoid2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly compose: <A, B>(ab: Kind2<F, A, B>, la: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v2.0.0

# Semigroupoid3 (interface)

**Signature**

```ts
export interface Semigroupoid3<F extends URIS3> {
  readonly URI: F
  readonly compose: <R, E, A, B>(ab: Kind3<F, R, A, B>, la: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v2.0.0

# Semigroupoid3C (interface)

**Signature**

```ts
export interface Semigroupoid3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly compose: <R, A, B>(ab: Kind3<F, R, A, B>, la: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v2.2.0

# Semigroupoid4 (interface)

**Signature**

```ts
export interface Semigroupoid4<F extends URIS4> {
  readonly URI: F
  readonly compose: <S, R, E, A, B>(ab: Kind4<F, S, R, A, B>, la: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
```

Added in v2.0.0
