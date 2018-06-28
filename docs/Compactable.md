---
id: Compactable
title: Module Compactable
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Compactable.ts)

## Interfaces

### Separated

_type_

_since 1.7.0_

_Signature_

```ts
interface Separated<A, B> {
  readonly left: A
  readonly right: B
}
```

_Description_

A `Separated` type which holds `left` and `right` parts.

## Type classes

### Compactable

_type class_

_since 1.7.0_

_Signature_

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

_Description_

`Compactable` represents data structures which can be _compacted_/_filtered_. This is a generalization of
`catOptions` as a new function `compact`. `compact` has relations with [Functor](./Functor.md), [Applicative](./Applicative.md),
[Monad](./Monad.md), [Plus](./Plus.md), and [Traversable](./Traversable.md) in that we can use these classes to provide the ability to
operate on a data type by eliminating intermediate `None`s. This is useful for representing the filtering out of
values, or failure.
