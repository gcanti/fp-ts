---
id: Compactable
title: Module Compactable
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Compactable.ts)

## Separated

```ts
interface Separated<A, B> {
  readonly left: A
  readonly right: B
}
```

Added in v1.7.0 (interface)

A `Separated` type which holds `left` and `right` parts.

# Compactable

```ts
interface Compactable<F> {
  readonly URI: F
  /**
   * Compacts a data structure unwrapping inner Option
   */
  readonly compact: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  /**
   * Separates a data structure moving inner Left to the left side and inner Right to the right side of Separated
   */
  readonly separate: <A, B>(fa: HKT<F, Either<A, B>>) => Separated<HKT<F, A>, HKT<F, B>>
}
```

Added in v1.7.0 (type class)

`Compactable` represents data structures which can be _compacted_/_filtered_. This is a generalization of
`catOptions` as a new function `compact`. `compact` has relations with [Functor](./Functor.md), [Applicative](./Applicative.md),
[Monad](./Monad.md), [Plus](./Plus.md), and [Traversable](./Traversable.md) in that we can use these classes to provide the ability to
operate on a data type by eliminating intermediate `None`s. This is useful for representing the filtering out of
values, or failure.
