---
title: Chain.ts
nav_order: 14
---

# Overview

The `Chain` type class extends the `Apply` type class with a `chain` operation which composes computations in
sequence, using the return value of one computation to determine the next computation.

Instances must satisfy the following law in addition to the `Apply` laws:

1. Associativity: `F.chain(F.chain(fa, afb), bfc) <-> F.chain(fa, a => F.chain(afb(a), bfc))`

Note. `Apply`'s `ap` can be derived: `(fab, fa) => F.chain(fab, f => F.map(f, fa))`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [Chain](#chain)
- [Chain1](#chain1)
- [Chain2](#chain2)
- [Chain2C](#chain2c)
- [Chain3](#chain3)
- [Chain3C](#chain3c)
- [flatten](#flatten)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Chain

**Signature** (interface)

```ts
export interface Chain<F> extends Apply<F> {
  readonly chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}
```

Added in v1.0.0

# Chain1

**Signature** (interface)

```ts
export interface Chain1<F extends URIS> extends Apply1<F> {
  readonly chain: <A, B>(fa: Type<F, A>, f: (a: A) => Type<F, B>) => Type<F, B>
}
```

# Chain2

**Signature** (interface)

```ts
export interface Chain2<F extends URIS2> extends Apply2<F> {
  readonly chain: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, B>
}
```

# Chain2C

**Signature** (interface)

```ts
export interface Chain2C<F extends URIS2, L> extends Apply2C<F, L> {
  readonly chain: <A, B>(fa: Type2<F, L, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, B>
}
```

# Chain3

**Signature** (interface)

```ts
export interface Chain3<F extends URIS3> extends Apply3<F> {
  readonly chain: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, B>
}
```

# Chain3C

**Signature** (interface)

```ts
export interface Chain3C<F extends URIS3, U, L> extends Apply3C<F, U, L> {
  readonly chain: <A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, B>
}
```

# flatten

**Signature** (function)

```ts
export function flatten<F extends URIS3>(
  chain: Chain3<F>
): <U, L, A>(mma: Type3<F, U, L, Type3<F, U, L, A>>) => Type3<F, U, L, A>
export function flatten<F extends URIS3, U, L>(
  chain: Chain3C<F, U, L>
): <A>(mma: Type3<F, U, L, Type3<F, U, L, A>>) => Type3<F, U, L, A>
export function flatten<F extends URIS2>(chain: Chain2<F>): <L, A>(mma: Type2<F, L, Type2<F, L, A>>) => Type2<F, L, A>
export function flatten<F extends URIS2, L>(
  chain: Chain2C<F, L>
): <A>(mma: Type2<F, L, Type2<F, L, A>>) => Type2<F, L, A>
export function flatten<F extends URIS>(chain: Chain1<F>): <A>(mma: Type<F, Type<F, A>>) => Type<F, A>
export function flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
export function flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A> { ... }
```

Added in v1.0.0
