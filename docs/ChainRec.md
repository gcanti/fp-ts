---
id: ChainRec
title: ChainRec
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/ChainRec.ts)

# ChainRec

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ChainRec.ts#L9-L11)

```ts
export interface ChainRec<F> extends Chain<F> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => HKT<F, Either<A, B>>) => HKT<F, B>
}
```

Added in v1.0.0

## tailRec

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ChainRec.ts#L36-L42)

```ts
export const tailRec = <A, B>(f: (a: A) => Either<A, B>, a: A): B => { ... }
```

Added in v1.0.0
