---
title: Traversable.ts
nav_order: 93
parent: Modules
---

# Traversable overview

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

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Sequence (interface)](#sequence-interface)
- [Sequence1 (interface)](#sequence1-interface)
- [Sequence2 (interface)](#sequence2-interface)
- [Sequence2C (interface)](#sequence2c-interface)
- [Sequence3 (interface)](#sequence3-interface)
- [SequenceComposition11 (interface)](#sequencecomposition11-interface)
- [Traversable (interface)](#traversable-interface)
- [Traversable1 (interface)](#traversable1-interface)
- [Traversable2 (interface)](#traversable2-interface)
- [Traversable2C (interface)](#traversable2c-interface)
- [Traversable3 (interface)](#traversable3-interface)
- [TraversableComposition (interface)](#traversablecomposition-interface)
- [TraversableComposition11 (interface)](#traversablecomposition11-interface)
- [Traverse (interface)](#traverse-interface)
- [Traverse1 (interface)](#traverse1-interface)
- [Traverse2 (interface)](#traverse2-interface)
- [Traverse2C (interface)](#traverse2c-interface)
- [Traverse3 (interface)](#traverse3-interface)
- [TraverseComposition11 (interface)](#traversecomposition11-interface)
- [getTraversableComposition](#gettraversablecomposition)

---

# Sequence (interface)

**Signature**

```ts
export interface Sequence<T> {
  <F extends URIS3>(F: Applicative3<F>): <R, E, A>(ta: HKT<T, Kind3<F, R, E, A>>) => Kind3<F, R, E, HKT<T, A>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <R, A>(ta: HKT<T, Kind3<F, R, E, A>>) => Kind3<F, R, E, HKT<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <E, A>(ta: HKT<T, Kind2<F, E, A>>) => Kind2<F, E, HKT<T, A>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A>(ta: HKT<T, Kind2<F, E, A>>) => Kind2<F, E, HKT<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: HKT<T, Kind<F, A>>) => Kind<F, HKT<T, A>>
  <F>(F: Applicative<F>): <A>(ta: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
}
```

Added in v2.0.0

# Sequence1 (interface)

**Signature**

```ts
export interface Sequence1<T extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <R, E, A>(ta: Kind<T, Kind3<F, R, E, A>>) => Kind3<F, R, E, Kind<T, A>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <R, A>(ta: Kind<T, Kind3<F, R, E, A>>) => Kind3<F, R, E, Kind<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <E, A>(ta: Kind<T, Kind2<F, E, A>>) => Kind2<F, E, Kind<T, A>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A>(ta: Kind<T, Kind2<F, E, A>>) => Kind2<F, E, Kind<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: Kind<T, Kind<F, A>>) => Kind<F, Kind<T, A>>
  <F>(F: Applicative<F>): <A>(ta: Kind<T, HKT<F, A>>) => HKT<F, Kind<T, A>>
}
```

Added in v2.0.0

# Sequence2 (interface)

**Signature**

```ts
export interface Sequence2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <TE, R, FE, A>(
    ta: Kind2<T, TE, Kind3<F, R, FE, A>>
  ) => Kind3<F, R, FE, Kind2<T, TE, A>>
  <F extends URIS2>(F: Applicative2<F>): <TE, FE, A>(ta: Kind2<T, TE, Kind2<F, FE, A>>) => Kind2<F, FE, Kind2<T, TE, A>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <TE, A>(
    ta: Kind2<T, TE, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind2<T, TE, A>>
  <F extends URIS>(F: Applicative1<F>): <E, A>(ta: Kind2<T, E, Kind<F, A>>) => Kind<F, Kind2<T, E, A>>
  <F>(F: Applicative<F>): <E, A>(ta: Kind2<T, E, HKT<F, A>>) => HKT<F, Kind2<T, E, A>>
}
```

Added in v2.0.0

# Sequence2C (interface)

**Signature**

```ts
export interface Sequence2C<T extends URIS2, E> {
  <F extends URIS3>(F: Applicative3<F>): <R, FE, A>(
    ta: Kind2<T, E, Kind3<F, R, FE, A>>
  ) => Kind3<F, R, FE, Kind2<T, E, A>>
  <F extends URIS2>(F: Applicative2<F>): <FE, A>(ta: Kind2<T, E, Kind2<F, FE, A>>) => Kind2<F, FE, Kind2<T, E, A>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A>(ta: Kind2<T, E, Kind2<F, FE, A>>) => Kind2<F, FE, Kind2<T, E, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: Kind2<T, E, Kind<F, A>>) => Kind<F, Kind2<T, E, A>>
  <F>(F: Applicative<F>): <A>(ta: Kind2<T, E, HKT<F, A>>) => HKT<F, Kind2<T, E, A>>
}
```

Added in v2.0.0

# Sequence3 (interface)

**Signature**

```ts
export interface Sequence3<T extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <TR, TE, FR, FE, A>(
    ta: Kind3<T, TR, TE, Kind3<F, FR, FE, A>>
  ) => Kind3<F, FR, FE, Kind3<T, TR, TE, A>>
  <F extends URIS2>(F: Applicative2<F>): <R, TE, FE, A>(
    ta: Kind3<T, R, TE, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind3<T, R, TE, A>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <R, TE, A>(
    ta: Kind3<T, R, TE, Kind2<F, FE, A>>
  ) => Kind2<F, FE, Kind3<T, R, TE, A>>
  <F extends URIS>(F: Applicative1<F>): <R, E, A>(ta: Kind3<T, R, E, Kind<F, A>>) => Kind<F, Kind3<T, R, E, A>>
  <F>(F: Applicative<F>): <R, E, A>(ta: Kind3<T, R, E, HKT<F, A>>) => HKT<F, Kind3<T, R, E, A>>
}
```

Added in v2.0.0

# SequenceComposition11 (interface)

**Signature**

```ts
export interface SequenceComposition11<F extends URIS, G extends URIS> {
  <H extends URIS3>(H: Applicative3<H>): <R, E, A>(
    fga: Kind<F, Kind<G, Kind3<H, R, E, A>>>
  ) => Kind3<H, R, E, Kind<F, Kind<G, A>>>
  <H extends URIS2>(H: Applicative2<H>): <E, A>(
    fga: Kind<F, Kind<G, Kind2<H, E, A>>>
  ) => Kind2<H, E, Kind<F, Kind<G, A>>>
  <H extends URIS2, E>(H: Applicative2C<H, E>): <A>(
    fga: Kind<F, Kind<G, Kind2<H, E, A>>>
  ) => Kind2<H, E, Kind<F, Kind<G, A>>>
  <H extends URIS>(H: Applicative1<H>): <A>(fga: Kind<F, Kind<G, Kind<H, A>>>) => Kind<H, Kind<F, Kind<G, A>>>
  <H>(H: Applicative<H>): <A>(fga: Kind<F, Kind<G, HKT<H, A>>>) => HKT<H, Kind<F, Kind<G, A>>>
}
```

Added in v2.0.0

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

Added in v2.0.0

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

Added in v2.0.0

# Traverse (interface)

**Signature**

```ts
export interface Traverse<T> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    ta: HKT<T, A>,
    f: (a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    ta: HKT<T, A>,
    f: (a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(ta: HKT<T, A>, f: (a: A) => Kind2<F, E, B>) => Kind2<F, E, HKT<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    ta: HKT<T, A>,
    f: (a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, HKT<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: HKT<T, A>, f: (a: A) => Kind<F, B>) => Kind<F, HKT<T, B>>
  <F>(F: Applicative<F>): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}
```

Added in v2.0.0

# Traverse1 (interface)

**Signature**

```ts
export interface Traverse1<T extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    ta: Kind<T, A>,
    f: (a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    ta: Kind<T, A>,
    f: (a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    ta: Kind<T, A>,
    f: (a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, Kind<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    ta: Kind<T, A>,
    f: (a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, Kind<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Kind<T, A>, f: (a: A) => Kind<F, B>) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Kind<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, Kind<T, B>>
}
```

Added in v2.0.0

# Traverse2 (interface)

**Signature**

```ts
export interface Traverse2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <TE, A, R, FE, B>(
    ta: Kind2<T, TE, A>,
    f: (a: A) => Kind3<F, R, FE, B>
  ) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <TE, A, FE, B>(
    ta: Kind2<T, TE, A>,
    f: (a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <TE, A, B>(
    ta: Kind2<T, TE, A>,
    f: (a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <E, A, B>(
    ta: Kind2<T, E, A>,
    f: (a: A) => Kind<F, B>
  ) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <E, A, B>(ta: Kind2<T, E, A>, f: (a: A) => HKT<F, B>) => HKT<F, Kind2<T, E, B>>
}
```

Added in v2.0.0

# Traverse2C (interface)

**Signature**

```ts
export interface Traverse2C<T extends URIS2, E> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    ta: Kind2<T, E, A>,
    f: (a: A) => Kind3<F, R, FE, B>
  ) => Kind3<F, R, FE, Kind2<T, E, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    ta: Kind2<T, E, A>,
    f: (a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    ta: Kind2<T, E, A>,
    f: (a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Kind2<T, E, A>, f: (a: A) => Kind<F, B>) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Kind2<T, E, A>, f: (a: A) => HKT<F, B>) => HKT<F, Kind2<T, E, B>>
}
```

Added in v2.0.0

# Traverse3 (interface)

**Signature**

```ts
export interface Traverse3<T extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <TR, TE, A, FR, FE, B>(
    ta: Kind3<T, TR, TE, A>,
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => Kind3<F, FR, FE, Kind3<T, TR, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <TR, A, TE, FE, B>(
    ta: Kind3<T, TR, TE, A>,
    f: (a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind3<T, TR, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <R, TE, A, B>(
    ta: Kind3<T, R, TE, A>,
    f: (a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind3<T, R, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <R, E, A, B>(
    ta: Kind3<T, R, E, A>,
    f: (a: A) => Kind<F, B>
  ) => Kind<F, Kind3<T, R, E, B>>
  <F>(F: Applicative<F>): <R, E, A, B>(ta: Kind3<T, R, E, A>, f: (a: A) => HKT<F, B>) => HKT<F, Kind3<T, R, E, B>>
}
```

Added in v2.0.0

# TraverseComposition11 (interface)

**Signature**

```ts
export interface TraverseComposition11<F extends URIS, G extends URIS> {
  <H extends URIS3>(H: Applicative3<H>): <R, E, A, B>(
    fga: Kind<F, Kind<G, A>>,
    f: (a: A) => Kind3<H, R, E, B>
  ) => Kind3<H, R, E, Kind<F, Kind<G, B>>>
  <H extends URIS2>(H: Applicative2<H>): <E, A, B>(
    fga: Kind<F, Kind<G, A>>,
    f: (a: A) => Kind2<H, E, B>
  ) => Kind2<H, E, Kind<F, Kind<G, B>>>
  <H extends URIS2, E>(H: Applicative2C<H, E>): <A, B>(
    fga: Kind<F, Kind<G, A>>,
    f: (a: A) => Kind2<H, E, B>
  ) => Kind2<H, E, Kind<F, Kind<G, B>>>
  <H extends URIS>(H: Applicative1<H>): <A, B>(
    fga: Kind<F, Kind<G, A>>,
    f: (a: A) => Kind<H, B>
  ) => Kind<H, Kind<F, Kind<G, B>>>
  <H>(H: Applicative<H>): <A, B>(fga: Kind<F, Kind<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, Kind<F, Kind<G, B>>>
}
```

Added in v2.0.0

# getTraversableComposition

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
