---
id: Witherable
title: Module Witherable
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Witherable.ts)

# Witherable

```ts
interface Witherable<T> extends Traversable<T>, Filterable<T> {
  /**
   * Partition a structure with effects
   */
  wilt: Wilt<T>

  /**
   * Filter a structure  with effects
   */
  wither: Wither<T>
}
```

Added in v1.7.0 (type class)

`Witherable` represents data structures which can be _partitioned_ with effects in some [Applicative](./Applicative.md) functor.

`wilt` signature (see [Compactable](./Compactable.md) `Separated`):

```ts
<F>(F: Applicative<F>) => <RL, RR, A>(wa: HKT<W, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<HKT<W, RL>, HKT<W, RR>>>
```

`wither` signature:

```ts
<F>(F: Applicative<F>) => <A, B>(ta: HKT<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<W, B>>
```
