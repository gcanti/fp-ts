---
title: Traversable.ts
nav_order: 86
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
- [getTraversableComposition (function)](#gettraversablecomposition-function)

---

# Sequence (interface)

**Signature**

```ts
export interface Sequence<T> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A>(ta: HKT<T, Type3<F, FU, FL, A>>) => Type3<F, FU, FL, HKT<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A>(ta: HKT<T, Type2<F, FL, A>>) => Type2<F, FL, HKT<T, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A>(ta: HKT<T, Type2<F, FL, A>>) => Type2<F, FL, HKT<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: HKT<T, Type<F, A>>) => Type<F, HKT<T, A>>
  <F>(F: Applicative<F>): <A>(ta: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
}
```

Added in v2.0.0

# Sequence1 (interface)

**Signature**

```ts
export interface Sequence1<T extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A>(ta: Type<T, Type3<F, FU, FL, A>>) => Type3<F, FU, FL, Type<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A>(ta: Type<T, Type2<F, FL, A>>) => Type2<F, FL, Type<T, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A>(ta: Type<T, Type2<F, FL, A>>) => Type2<F, FL, Type<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: Type<T, Type<F, A>>) => Type<F, Type<T, A>>
  <F>(F: Applicative<F>): <A>(ta: Type<T, HKT<F, A>>) => HKT<F, Type<T, A>>
}
```

Added in v2.0.0

# Sequence2 (interface)

**Signature**

```ts
export interface Sequence2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <TL, FU, FL, A>(
    ta: Type2<T, TL, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, Type2<T, TL, A>>
  <F extends URIS2>(F: Applicative2<F>): <TL, FL, A>(ta: Type2<T, TL, Type2<F, FL, A>>) => Type2<F, FL, Type2<T, TL, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <TL, A>(
    ta: Type2<T, TL, Type2<F, FL, A>>
  ) => Type2<F, FL, Type2<T, TL, A>>
  <F extends URIS>(F: Applicative1<F>): <TL, A>(ta: Type2<T, TL, Type<F, A>>) => Type<F, Type2<T, TL, A>>
  <F>(F: Applicative<F>): <TL, A>(ta: Type2<T, TL, HKT<F, A>>) => HKT<F, Type2<T, TL, A>>
}
```

Added in v2.0.0

# Sequence2C (interface)

**Signature**

```ts
export interface Sequence2C<T extends URIS2, TL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A>(
    ta: Type2<T, TL, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, Type2<T, TL, A>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A>(ta: Type2<T, TL, Type2<F, FL, A>>) => Type2<F, FL, Type2<T, TL, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A>(
    ta: Type2<T, TL, Type2<F, FL, A>>
  ) => Type2<F, FL, Type2<T, TL, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: Type2<T, TL, Type<F, A>>) => Type<F, Type2<T, TL, A>>
  <F>(F: Applicative<F>): <A>(ta: Type2<T, TL, HKT<F, A>>) => HKT<F, Type2<T, TL, A>>
}
```

Added in v2.0.0

# Sequence3 (interface)

**Signature**

```ts
export interface Sequence3<T extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <TU, TL, FU, FL, A>(
    ta: Type3<T, TU, TL, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, A>>
  <F extends URIS2>(F: Applicative2<F>): <TU, TL, FL, A>(
    ta: Type3<T, TU, TL, Type2<F, FL, A>>
  ) => Type2<F, FL, Type3<T, TU, TL, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <TU, TL, A>(
    ta: Type3<T, TU, TL, Type2<F, FL, A>>
  ) => Type2<F, FL, Type3<T, TU, TL, A>>
  <F extends URIS>(F: Applicative1<F>): <TU, TL, A>(ta: Type3<T, TU, TL, Type<F, A>>) => Type<F, Type3<T, TU, TL, A>>
  <F>(F: Applicative<F>): <TU, TL, A>(ta: Type3<T, TU, TL, HKT<F, A>>) => HKT<F, Type3<T, TU, TL, A>>
}
```

Added in v2.0.0

# SequenceComposition11 (interface)

**Signature**

```ts
export interface SequenceComposition11<F extends URIS, G extends URIS> {
  <H extends URIS3>(H: Applicative3<H>): <HU, HL, A>(
    fga: Type<F, Type<G, Type3<H, HU, HL, A>>>
  ) => Type3<H, HU, HL, Type<F, Type<G, A>>>
  <H extends URIS2>(H: Applicative2<H>): <HL, A>(
    fga: Type<F, Type<G, Type2<H, HL, A>>>
  ) => Type2<H, HL, Type<F, Type<G, A>>>
  <H extends URIS2, HL>(H: Applicative2C<H, HL>): <A>(
    fga: Type<F, Type<G, Type2<H, HL, A>>>
  ) => Type2<H, HL, Type<F, Type<G, A>>>
  <H extends URIS>(H: Applicative1<H>): <A>(fga: Type<F, Type<G, Type<H, A>>>) => Type<H, Type<F, Type<G, A>>>
  <H>(H: Applicative<H>): <A>(fga: Type<F, Type<G, HKT<H, A>>>) => HKT<H, Type<F, Type<G, A>>>
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
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: HKT<T, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, HKT<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: HKT<T, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, HKT<T, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: HKT<T, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, HKT<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: HKT<T, A>, f: (a: A) => Type<F, B>) => Type<F, HKT<T, B>>
  <F>(F: Applicative<F>): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}
```

Added in v2.0.0

# Traverse1 (interface)

**Signature**

```ts
export interface Traverse1<T extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type<T, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type<T, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type<T, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type<T, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Type<T, A>, f: (a: A) => Type<F, B>) => Type<F, Type<T, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type<T, B>>
}
```

Added in v2.0.0

# Traverse2 (interface)

**Signature**

```ts
export interface Traverse2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <TL, FU, FL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type2<T, TL, B>>
  <F extends URIS2>(F: Applicative2<F>): <TL, FL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, TL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <TL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, TL, B>>
  <F extends URIS>(F: Applicative1<F>): <TL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type<F, B>
  ) => Type<F, Type2<T, TL, B>>
  <F>(F: Applicative<F>): <TL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type2<T, TL, B>>
}
```

Added in v2.0.0

# Traverse2C (interface)

**Signature**

```ts
export interface Traverse2C<T extends URIS2, TL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type2<T, TL, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, TL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, TL, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type<F, B>) => Type<F, Type2<T, TL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type2<T, TL, B>>
}
```

Added in v2.0.0

# Traverse3 (interface)

**Signature**

```ts
export interface Traverse3<T extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <TU, TL, FU, FL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  <F extends URIS2>(F: Applicative2<F>): <TU, TL, FL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type3<T, TU, TL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <TU, TL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type3<T, TU, TL, B>>
  <F extends URIS>(F: Applicative1<F>): <TU, TL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type<F, B>
  ) => Type<F, Type3<T, TU, TL, B>>
  <F>(F: Applicative<F>): <TU, TL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type3<T, TU, TL, B>>
}
```

Added in v2.0.0

# TraverseComposition11 (interface)

**Signature**

```ts
export interface TraverseComposition11<F extends URIS, G extends URIS> {
  <H extends URIS3>(H: Applicative3<H>): <HU, HL, A, B>(
    fga: Type<F, Type<G, A>>,
    f: (a: A) => Type3<H, HU, HL, B>
  ) => Type3<H, HU, HL, Type<F, Type<G, B>>>
  <H extends URIS2>(H: Applicative2<H>): <HL, A, B>(
    fga: Type<F, Type<G, A>>,
    f: (a: A) => Type2<H, HL, B>
  ) => Type2<H, HL, Type<F, Type<G, B>>>
  <H extends URIS2, HL>(H: Applicative2C<H, HL>): <A, B>(
    fga: Type<F, Type<G, A>>,
    f: (a: A) => Type2<H, HL, B>
  ) => Type2<H, HL, Type<F, Type<G, B>>>
  <H extends URIS>(H: Applicative1<H>): <A, B>(
    fga: Type<F, Type<G, A>>,
    f: (a: A) => Type<H, B>
  ) => Type<H, Type<F, Type<G, B>>>
  <H>(H: Applicative<H>): <A, B>(fga: Type<F, Type<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, Type<F, Type<G, B>>>
}
```

Added in v2.0.0

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
