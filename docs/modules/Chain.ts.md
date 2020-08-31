---
title: Chain.ts
nav_order: 15
parent: Modules
---

## Chain overview

The `Chain` type class extends the `Apply` type class with a `chain` operation which composes computations in
sequence, using the return value of one computation to determine the next computation.

Instances must satisfy the following law in addition to the `Apply` laws:

1. Associativity: `F.chain(F.chain(fa, afb), bfc) <-> F.chain(fa, a => F.chain(afb(a), bfc))`

Note. `Apply`'s `ap` can be derived: `(fab, fa) => F.chain(fab, f => F.map(fa, f))`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Chain (interface)](#chain-interface)
  - [Chain1 (interface)](#chain1-interface)
  - [Chain2 (interface)](#chain2-interface)
  - [Chain2C (interface)](#chain2c-interface)
  - [Chain3 (interface)](#chain3-interface)
  - [Chain3C (interface)](#chain3c-interface)
  - [Chain4 (interface)](#chain4-interface)

---

# type classes

## Chain (interface)

**Signature**

```ts
export interface Chain<F> extends Apply<F> {
  readonly chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}
```

Added in v2.0.0

## Chain1 (interface)

**Signature**

```ts
export interface Chain1<F extends URIS> extends Apply1<F> {
  readonly chain: <A, B>(fa: Kind<F, A>, f: (a: A) => Kind<F, B>) => Kind<F, B>
}
```

Added in v2.0.0

## Chain2 (interface)

**Signature**

```ts
export interface Chain2<F extends URIS2> extends Apply2<F> {
  readonly chain: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => Kind2<F, E, B>) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Chain2C (interface)

**Signature**

```ts
export interface Chain2C<F extends URIS2, E> extends Apply2C<F, E> {
  readonly chain: <A, B>(fa: Kind2<F, E, A>, f: (a: A) => Kind2<F, E, B>) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Chain3 (interface)

**Signature**

```ts
export interface Chain3<F extends URIS3> extends Apply3<F> {
  readonly chain: <R, E, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => Kind3<F, R, E, B>) => Kind3<F, R, E, B>
}
```

Added in v2.0.0

## Chain3C (interface)

**Signature**

```ts
export interface Chain3C<F extends URIS3, E> extends Apply3C<F, E> {
  readonly chain: <R, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => Kind3<F, R, E, B>) => Kind3<F, R, E, B>
}
```

Added in v2.2.0

## Chain4 (interface)

**Signature**

```ts
export interface Chain4<F extends URIS4> extends Apply4<F> {
  readonly chain: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, f: (a: A) => Kind4<F, S, R, E, B>) => Kind4<F, S, R, E, B>
}
```

Added in v2.0.0
