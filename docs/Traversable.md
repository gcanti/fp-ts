---
id: Traversable
title: Module Traversable
---

[← Back](.)

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

## ~~getTraversableComposition~~ (deprecated)

```ts
getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G>
```

Added in v1.0.0 (function)

Use [Traversable2v](./Traversable2v.md)'s `getTraversableComposition` instead.

## ~~sequence~~ (deprecated)

```ts
sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
```

Added in v1.0.0 (function)

Use `sequence` contained in each traversable data structure instead.

_Example_

```ts
import { array } from 'fp-ts/lib/Array'
import { none, option, some } from 'fp-ts/lib/Option'

assert.deepEqual(array.sequence(option)([some(1), some(2), some(3)]), some([1, 2, 3]))
assert.deepEqual(array.sequence(option)([none, some(2), some(3)]), none)
```

## ~~traverse~~ (deprecated)

```ts
traverse<F, T>(
  F: Applicative<F>,
  T: Traversable<T>
): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
```

Added in v1.0.0 (function)

Use `traverse` contained in each traversable data structure instead.

_Example_

```ts
import { array } from 'fp-ts/lib/Array'
import { none, option, some } from 'fp-ts/lib/Option'

assert.deepEqual(array.traverse(option)([1, 2, 3], n => (n >= 0 ? some(n) : none)), some([1, 2, 3]))
assert.deepEqual(array.traverse(option)([-1, 2, 3], n => (n >= 0 ? some(n) : none)), none)
```
