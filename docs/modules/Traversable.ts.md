---
title: Traversable.ts
nav_order: 87
parent: Modules
---

# Overview

`Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
`Applicative` functor.

`traverse` signature:

```ts
<F>(F: Applicative<F>) => <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
```

`sequence` signature:

```ts
<F>(F: Applicative<F>) => <A>(ta: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
```

---

<h2 class="text-delta">Table of contents</h2>

- [Traversable (interface)](#traversable-interface)
- [Traversable1 (interface)](#traversable1-interface)
- [Traversable2 (interface)](#traversable2-interface)
- [Traversable2C (interface)](#traversable2c-interface)
- [Traversable3 (interface)](#traversable3-interface)
- [TraversableComposition (interface)](#traversablecomposition-interface)
- [TraversableComposition11 (interface)](#traversablecomposition11-interface)
- [getTraversableComposition (function)](#gettraversablecomposition-function)

---

# Traversable (interface)

**Signature**

```ts
export interface Traversable<T> extends Functor<T>, Foldable<T> {
  /**
   * Runs an action for every element in a data structure and accumulates the results
   */
  readonly traverse: Traverse<T>
  readonly sequence: Sequence<T>
}
```

Added in v2.0.0

# Traversable1 (interface)

**Signature**

```ts
export interface Traversable1<T extends URIS> extends Functor1<T>, Foldable1<T> {
  readonly traverse: Traverse1<T>
  readonly sequence: Sequence1<T>
}
```

Added in v2.0.0

# Traversable2 (interface)

**Signature**

```ts
export interface Traversable2<T extends URIS2> extends Functor2<T>, Foldable2<T> {
  readonly traverse: Traverse2<T>
  readonly sequence: Sequence2<T>
}
```

Added in v2.0.0

# Traversable2C (interface)

**Signature**

```ts
export interface Traversable2C<T extends URIS2, TL> extends Functor2C<T, TL>, Foldable2C<T, TL> {
  readonly traverse: Traverse2C<T, TL>
  readonly sequence: Sequence2C<T, TL>
}
```

Added in v2.0.0

# Traversable3 (interface)

**Signature**

```ts
export interface Traversable3<T extends URIS3> extends Functor3<T>, Foldable3<T> {
  readonly traverse: Traverse3<T>
  readonly sequence: Sequence3<T>
}
```

Added in v2.0.0

# TraversableComposition (interface)

**Signature**

```ts
export interface TraversableComposition<F, G> extends FoldableComposition<F, G>, FunctorComposition<F, G> {
  readonly traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(fga: HKT<F, HKT<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, HKT<F, HKT<G, B>>>
  readonly sequence: <H>(H: Applicative<H>) => <A>(fga: HKT<F, HKT<G, HKT<H, A>>>) => HKT<H, HKT<F, HKT<G, A>>>
}
```

# TraversableComposition11 (interface)

**Signature**

```ts
export interface TraversableComposition11<F extends URIS, G extends URIS>
  extends FoldableComposition11<F, G>,
    FunctorComposition11<F, G> {
  readonly traverse: TraverseComposition11<F, G>
  readonly sequence: SequenceComposition11<F, G>
}
```

# getTraversableComposition (function)

Returns the composition of two traversables

**Signature**

```ts
export function getTraversableComposition<F extends URIS, G extends URIS>(
  F: Traversable1<F>,
  G: Traversable1<G>
): TraversableComposition11<F, G>
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G> { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { io } from 'fp-ts/lib/IO'
import { none, option, some } from 'fp-ts/lib/Option'
import { getTraversableComposition } from 'fp-ts/lib/Traversable'

const T = getTraversableComposition(array, option)
const state: Record<string, number | undefined> = {
  a: 1,
  b: 2
}
const read = (s: string) => () => state[s]
const x = T.sequence(io)([some(read('a')), none, some(read('b')), some(read('c'))])
assert.deepStrictEqual(x(), [some(1), none, some(2), some(undefined)])
```

Added in v2.0.0
