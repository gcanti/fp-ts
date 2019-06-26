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
- [Chain3C (interface)](#chain3c-interface)
- [Chain4 (interface)](#chain4-interface)
- [~~flatten~~ (function)](#flatten-function)

---

# Chain (interface)

**Signature**

```ts
export interface Chain<F> extends Apply<F> {
  readonly chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}
```

Added in v1.0.0

# Chain1 (interface)

**Signature**

```ts
export interface Chain1<F extends URIS> extends Apply1<F> {
  readonly chain: <A, B>(fa: Kind<F, A>, f: (a: A) => Kind<F, B>) => Kind<F, B>
}
```

# Chain2 (interface)

**Signature**

```ts
export interface Chain2<F extends URIS2> extends Apply2<F> {
  readonly chain: <L, A, B>(fa: Kind2<F, L, A>, f: (a: A) => Kind2<F, L, B>) => Kind2<F, L, B>
}
```

# Chain2C (interface)

**Signature**

```ts
export interface Chain2C<F extends URIS2, L> extends Apply2C<F, L> {
  readonly chain: <A, B>(fa: Kind2<F, L, A>, f: (a: A) => Kind2<F, L, B>) => Kind2<F, L, B>
}
```

# Chain3 (interface)

**Signature**

```ts
export interface Chain3<F extends URIS3> extends Apply3<F> {
  readonly chain: <U, L, A, B>(fa: Kind3<F, U, L, A>, f: (a: A) => Kind3<F, U, L, B>) => Kind3<F, U, L, B>
}
```

# Chain3C (interface)

**Signature**

```ts
export interface Chain3C<F extends URIS3, U, L> extends Apply3C<F, U, L> {
  readonly chain: <A, B>(fa: Kind3<F, U, L, A>, f: (a: A) => Kind3<F, U, L, B>) => Kind3<F, U, L, B>
}
```

# Chain4 (interface)

**Signature**

```ts
export interface Chain4<F extends URIS4> extends Apply4<F> {
  readonly chain: <X, U, L, A, B>(fa: Kind4<F, X, U, L, A>, f: (a: A) => Kind4<F, X, U, L, B>) => Kind4<F, X, U, L, B>
}
```

# ~~flatten~~ (function)

Use `pipeable`'s `flatten`

**Signature**

```ts
export function flatten<F extends URIS3>(
  chain: Chain3<F>
): <U, L, A>(mma: Kind3<F, U, L, Kind3<F, U, L, A>>) => Kind3<F, U, L, A>
export function flatten<F extends URIS3, U, L>(
  chain: Chain3C<F, U, L>
): <A>(mma: Kind3<F, U, L, Kind3<F, U, L, A>>) => Kind3<F, U, L, A>
export function flatten<F extends URIS2>(chain: Chain2<F>): <L, A>(mma: Kind2<F, L, Kind2<F, L, A>>) => Kind2<F, L, A>
export function flatten<F extends URIS2, L>(
  chain: Chain2C<F, L>
): <A>(mma: Kind2<F, L, Kind2<F, L, A>>) => Kind2<F, L, A>
export function flatten<F extends URIS>(chain: Chain1<F>): <A>(mma: Kind<F, Kind<F, A>>) => Kind<F, A>
export function flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A> { ... }
```

Added in v1.0.0
