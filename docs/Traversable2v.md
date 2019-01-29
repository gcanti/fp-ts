---
id: Traversable2v
title: Module Traversable2v
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Traversable2v.ts)

# Traversable2v

**Signature** (type class)

```ts
export interface Traversable2v<T> extends Functor<T>, Foldable2v<T> {
  /**
   * Runs an action for every element in a data structure and accumulates the results
   */
  readonly traverse: Traverse<T>
  readonly sequence: Sequence<T>
}
```

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

Added in v1.10.0

## getTraversableComposition

Returns the composition of two traversables

**Signature** (function)

```ts
export function getTraversableComposition<F, G>(
  F: Traversable2v<F>,
  G: Traversable2v<G>
): Traversable2vComposition<F, G>  { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { io, IO } from 'fp-ts/lib/IO'
import { none, option, some } from 'fp-ts/lib/Option'
import { getTraversableComposition } from 'fp-ts/lib/Traversable2v'

const T = getTraversableComposition(array, option)
const state: Record<string, number | undefined> = {
  a: 1,
  b: 2
}
const read = (s: string) => new IO(() => state[s])
const x = T.sequence(io)([some(read('a')), none, some(read('b')), some(read('c'))])
assert.deepEqual(x.run(), [some(1), none, some(2), some(undefined)])
```

Added in v1.10.0
