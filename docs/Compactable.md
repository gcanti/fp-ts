---
id: Compactable
title: Module Compactable
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Compactable.ts)

## Separated

**Signature** (interface) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Compactable.ts#L28-L31)

```ts
interface Separated<A, B> {
  readonly left: A
  readonly right: B
}
```

A `Separated` type which holds `left` and `right` parts.

Added in v1.7.0

# Compactable

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Compactable.ts#L44-L54)

```ts
export interface Compactable<F> {
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

`Compactable` represents data structures which can be _compacted_/_filtered_. This is a generalization of
`catOptions` as a new function `compact`. `compact` has relations with [Functor](./Functor.md), [Applicative](./Applicative.md),
[Monad](./Monad.md), [Plus](./Plus.md), and [Traversable](./Traversable.md) in that we can use these classes to provide the ability to
operate on a data type by eliminating intermediate `None`s. This is useful for representing the filtering out of
values, or failure.

Added in v1.7.0

## getCompactableComposition

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Compactable.ts#L191-L206)

```ts
export function getCompactableComposition<F, G>(
  F: Functor<F>,
  G: Compactable<G> & Functor<G>
): CompactableComposition<F, G>  { ... }
```

Added in v1.12.0
