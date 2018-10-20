---
id: Traversable2v
title: Module Traversable2v
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Traversable2v.ts)

## Type classes

### Traversable2v

_type class_

_since 1.10.0_

_Signature_

```ts
interface Traversable2v<T> extends Functor<T>, Foldable2v<T> {
  /**
   * Runs an action for every element in a data structure and accumulates the results
   */
  readonly traverse: Traverse<T>
  readonly sequence: Sequence<T>
}
```

_Description_

`Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
[Applicative](./Applicative.md) functor.

`traverse` signature:

```ts
<F>(F: Applicative<F>) => <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
```

`sequence` signature:

```ts
<F>(F: Applicative<F>) => <A>(ta: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
```

## Functions

### getTraversableComposition

_function_

_since 1.10.0_

_Signature_

```ts
getTraversableComposition<F, G>(
  F: Traversable2v<F>,
  G: Traversable2v<G>
): Traversable2vComposition<F, G>
```
