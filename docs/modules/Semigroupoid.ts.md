---
title: Semigroupoid.ts
nav_order: 76
parent: Modules
---

## Semigroupoid overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Semigroupoid (interface)](#semigroupoid-interface)
  - [Semigroupoid2 (interface)](#semigroupoid2-interface)
  - [Semigroupoid3 (interface)](#semigroupoid3-interface)
  - [Semigroupoid4 (interface)](#semigroupoid4-interface)

---

# type classes

## Semigroupoid (interface)

**Signature**

```ts
export interface Semigroupoid<F> {
  readonly URI?: F
  readonly compose: <B, C>(bc: HKT2<F, B, C>) => <A>(ab: HKT2<F, A, B>) => HKT2<F, A, C>
}
```

Added in v3.0.0

## Semigroupoid2 (interface)

**Signature**

```ts
export interface Semigroupoid2<F extends URIS2> {
  readonly URI?: F
  readonly compose: <B, C>(bc: Kind2<F, B, C>) => <A>(ab: Kind2<F, A, B>) => Kind2<F, A, C>
}
```

Added in v3.0.0

## Semigroupoid3 (interface)

**Signature**

```ts
export interface Semigroupoid3<F extends URIS3> {
  readonly URI?: F
  readonly compose: <R, B, C>(bc: Kind3<F, R, B, C>) => <A>(ab: Kind3<F, R, A, B>) => Kind3<F, R, A, C>
}
```

Added in v3.0.0

## Semigroupoid4 (interface)

**Signature**

```ts
export interface Semigroupoid4<F extends URIS4> {
  readonly URI?: F
  readonly compose: <S, R, B, C>(bc: Kind4<F, S, R, B, C>) => <A>(ab: Kind4<F, S, R, A, B>) => Kind4<F, S, R, A, C>
}
```

Added in v3.0.0
