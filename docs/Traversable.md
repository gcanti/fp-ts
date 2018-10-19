---
id: Traversable
title: Module Traversable
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Traversable.ts)

# ~~Traversable~~ (deprecated)

```ts
interface Traversable<T> extends Functor<T>, Foldable<T> {
  /**
   * Runs an action for every element in a data structure and accumulates the results
   */
  readonly traverse: Traverse<T>
}
```

Added in v1.0.0 (type class)

Use [Traversable2v](./Traversable2v.md)

## getTraversableComposition

```ts
getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G>
```

Added in v1.0.0 (function)

## sequence

```ts
sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
```

Added in v1.0.0 (function)

## ~~traverse~~ (deprecated)

```ts
traverse<F, T>(
  F: Applicative<F>,
  T: Traversable<T>
): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
```

Added in v1.0.0 (function)

Use [Traversable](./Traversable.md) `traverse` instead.
