---
id: Chain
title: Chain
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Chain.ts)

# Chain

**Signature** (type class)

```ts
export interface Chain<F> extends Apply<F> {
  readonly chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}
```

The `Chain` type class extends the [Apply](./Apply.md) type class with a `chain` operation which composes computations in
sequence, using the return value of one computation to determine the next computation.

Instances must satisfy the following law in addition to the [Apply](./Apply.md) laws:

1. Associativity: `F.chain(F.chain(fa, afb), bfc) <-> F.chain(fa, a => F.chain(afb(a), bfc))`

Note. [Apply](./Apply.md)'s `ap` can be derived: `(fab, fa) => F.chain(fab, f => F.map(f, fa))`

Added in v1.0.0

## flatten

**Signature** (function)

```ts
export function flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>  { ... }
```

Added in v1.0.0
