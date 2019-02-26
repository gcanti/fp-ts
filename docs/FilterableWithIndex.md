---
id: FilterableWithIndex
title: FilterableWithIndex
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/FilterableWithIndex.ts)

# FilterableWithIndex

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/FilterableWithIndex.ts#L19-L27)

```ts
export interface FilterableWithIndex<F, I> extends FunctorWithIndex<F, I>, Filterable<F> {
  readonly partitionMapWithIndex: <RL, RR, A>(
    fa: HKT<F, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<HKT<F, RL>, HKT<F, RR>>
  readonly partitionWithIndex: <A>(fa: HKT<F, A>, p: (i: I, a: A) => boolean) => Separated<HKT<F, A>, HKT<F, A>>
  readonly filterMapWithIndex: <A, B>(fa: HKT<F, A>, f: (i: I, a: A) => Option<B>) => HKT<F, B>
  readonly filterWithIndex: <A>(fa: HKT<F, A>, p: (i: I, a: A) => boolean) => HKT<F, A>
}
```

Added in v1.12.0
