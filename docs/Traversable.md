---
id: Traversable
title: Module Traversable
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Traversable.ts)

# ~~Traversable~~ (deprecated)

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Traversable.ts#L33-L38)

```ts
export interface Traversable<T> extends Functor<T>, Foldable<T> {
  /**
   * Runs an action for every element in a data structure and accumulates the results
   */
  readonly traverse: Traverse<T>
}
```

Use [Traversable2v](./Traversable2v.md)

Added in v1.0.0

## ~~getTraversableComposition~~ (deprecated)

Use [Traversable2v](./Traversable2v.md)'s `getTraversableComposition` instead.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Traversable.ts#L381-L391)

```ts
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G>  { ... }
```

Added in v1.0.0

## ~~sequence~~ (deprecated)

Use `sequence` contained in each traversable data structure instead.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Traversable.ts#L364-L366)

```ts
export function sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>  { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { none, option, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(array.sequence(option)([some(1), some(2), some(3)]), some([1, 2, 3]))
assert.deepStrictEqual(array.sequence(option)([none, some(2), some(3)]), none)
```

Added in v1.0.0

## ~~traverse~~ (deprecated)

Use `traverse` contained in each traversable data structure instead.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Traversable.ts#L304-L310)

```ts
export function traverse<F, T>(
  F: Applicative<F>,
  // tslint:disable-next-line: deprecation
  T: Traversable<T>
): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>  { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { none, option, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(array.traverse(option)([1, 2, 3], n => (n >= 0 ? some(n) : none)), some([1, 2, 3]))
assert.deepStrictEqual(array.traverse(option)([-1, 2, 3], n => (n >= 0 ? some(n) : none)), none)
```

Added in v1.0.0
