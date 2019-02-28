---
id: Filterable
title: Filterable
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Filterable.ts)

# Filterable

**Signature** (type class)

```ts
export interface Filterable<F> extends Functor<F>, Compactable<F> {
  /**
   * Partition a data structure based on an either predicate.
   */
  readonly partitionMap: <RL, RR, A>(fa: HKT<F, A>, f: (a: A) => Either<RL, RR>) => Separated<HKT<F, RL>, HKT<F, RR>>
  /**
   * Partition a data structure based on a boolean predicate.
   */
  readonly partition: <A>(fa: HKT<F, A>, p: Predicate<A>) => Separated<HKT<F, A>, HKT<F, A>>
  /**
   * Map over a data structure and filter based on an option predicate.
   */
  readonly filterMap: <A, B>(fa: HKT<F, A>, f: (a: A) => Option<B>) => HKT<F, B>
  /**
   * Filter a data structure based on a boolean predicate.
   */
  readonly filter: <A>(fa: HKT<F, A>, p: Predicate<A>) => HKT<F, A>
}
```

`Filterable` represents data structures which can be _partitioned_/_filtered_.

Added in v1.7.0

## getFilterableComposition

**Signature** (function)

```ts
export function getFilterableComposition<F, G>(F: Functor<F>, G: Filterable<G>): FilterableComposition<F, G>  { ... }
```

Added in v1.12.0
