---
title: Chain.ts
nav_order: 14
parent: Modules
---

# Overview

The `Chain` type class extends the `Apply` type class with a `chain` operation which composes computations in
sequence, using the return value of one computation to determine the next computation.

Instances must satisfy the following law in addition to the `Apply` laws:

1. Associativity: `F.chain(F.chain(fa, afb), bfc) <-> F.chain(fa, a => F.chain(afb(a), bfc))`

Note. `Apply`'s `ap` can be derived: `(fab, fa) => F.chain(fab, f => F.map(f, fa))`

---

<h2 class="text-delta">Table of contents</h2>

- [Chain (interface)](#chain-interface)
- [Chain1 (interface)](#chain1-interface)
- [Chain2 (interface)](#chain2-interface)
- [Chain2C (interface)](#chain2c-interface)
- [Chain3 (interface)](#chain3-interface)
- [Chain4 (interface)](#chain4-interface)
- [flatMap (function)](#flatmap-function)

---

# Chain (interface)

**Signature**

```ts
export interface Chain<F> extends Apply<F> {
  readonly chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}
```

Added in v2.0.0

# Chain1 (interface)

**Signature**

```ts
export interface Chain1<F extends URIS> extends Apply1<F> {
  readonly chain: <A, B>(fa: Type<F, A>, f: (a: A) => Type<F, B>) => Type<F, B>
}
```

Added in v2.0.0

# Chain2 (interface)

**Signature**

```ts
export interface Chain2<F extends URIS2> extends Apply2<F> {
  readonly chain: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, B>
}
```

Added in v2.0.0

# Chain2C (interface)

**Signature**

```ts
export interface Chain2C<F extends URIS2, L> extends Apply2C<F, L> {
  readonly chain: <A, B>(fa: Type2<F, L, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, B>
}
```

Added in v2.0.0

# Chain3 (interface)

**Signature**

```ts
export interface Chain3<F extends URIS3> extends Apply3<F> {
  readonly chain: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, B>
}
```

Added in v2.0.0

# Chain4 (interface)

**Signature**

```ts
export interface Chain4<F extends URIS4> extends Apply4<F> {
  readonly chain: <X, U, L, A, B>(fa: Type4<F, X, U, L, A>, f: (a: A) => Type4<F, X, U, L, B>) => Type4<F, X, U, L, B>
}
```

Added in v2.0.0

# flatMap (function)

**Signature**

```ts
export function flatMap<F extends URIS3>(
  F: Chain3<F>
): <U, L, A, B>(f: (a: A) => Type3<F, U, L, B>) => (fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
export function flatMap<F extends URIS2>(
  F: Chain2<F>
): <L, A, B>(f: (a: A) => Type2<F, L, B>) => (fa: Type2<F, L, A>) => Type2<F, L, B>
export function flatMap<F extends URIS2, L>(
  F: Chain2C<F, L>
): <A, B>(f: (a: A) => Type2<F, L, B>) => (fa: Type2<F, L, A>) => Type2<F, L, B>
export function flatMap<F extends URIS>(F: Chain1<F>): <A, B>(f: (a: A) => Type<F, B>) => (fa: Type<F, A>) => Type<F, B>
export function flatMap<F>(F: Chain<F>): <A, B>(f: (a: A) => HKT<F, B>) => (fa: HKT<F, A>) => HKT<F, B> { ... }
```

Added in v2.0.0
