---
id: ChainRec
title: ChainRec
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/ChainRec.ts)

# ChainRec

**Signature** (type class)

```ts
export interface ChainRec<F> extends Chain<F> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => HKT<F, Either<A, B>>) => HKT<F, B>
}
```

Added in v1.0.0

## tailRec

**Signature** (function)

```ts
export const tailRec = <A, B>(f: (a: A) => Either<A, B>, a: A): B => { ... }
```

Added in v1.0.0
