---
title: Traversable2v.ts
nav_order: 88
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Sequence](#sequence)
- [Sequence1](#sequence1)
- [Sequence2](#sequence2)
- [Sequence2C](#sequence2c)
- [Sequence3](#sequence3)
- [Sequence3C](#sequence3c)
- [SequenceComposition11](#sequencecomposition11)
- [Traversable2v](#traversable2v)
- [Traversable2v1](#traversable2v1)
- [Traversable2v2](#traversable2v2)
- [Traversable2v2C](#traversable2v2c)
- [Traversable2v3](#traversable2v3)
- [Traversable2v3C](#traversable2v3c)
- [Traversable2vComposition](#traversable2vcomposition)
- [Traversable2vComposition11](#traversable2vcomposition11)
- [TraverseComposition11](#traversecomposition11)
- [getTraversableComposition](#gettraversablecomposition)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Sequence

**Signature** (interface)

```ts
export interface Sequence<T> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A>(ta: HKT<T, Type3<F, FU, FL, A>>) => Type3<F, FU, FL, HKT<T, A>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A>(
    ta: HKT<T, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, HKT<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A>(ta: HKT<T, Type2<F, FL, A>>) => Type2<F, FL, HKT<T, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A>(ta: HKT<T, Type2<F, FL, A>>) => Type2<F, FL, HKT<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: HKT<T, Type<F, A>>) => Type<F, HKT<T, A>>
  <F>(F: Applicative<F>): <A>(ta: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
}
```

Added in v1.10.0

# Sequence1

**Signature** (interface)

```ts
export interface Sequence1<T extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A>(ta: Type<T, Type3<F, FU, FL, A>>) => Type3<F, FU, FL, Type<T, A>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A>(
    ta: Type<T, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, Type<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A>(ta: Type<T, Type2<F, FL, A>>) => Type2<F, FL, Type<T, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A>(ta: Type<T, Type2<F, FL, A>>) => Type2<F, FL, Type<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: Type<T, Type<F, A>>) => Type<F, Type<T, A>>
  <F>(F: Applicative<F>): <A>(ta: Type<T, HKT<F, A>>) => HKT<F, Type<T, A>>
}
```

Added in v1.10.0

# Sequence2

**Signature** (interface)

```ts
export interface Sequence2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <TL, FU, FL, A>(
    ta: Type2<T, TL, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, Type2<T, TL, A>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <TL, A>(
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

Added in v1.10.0

# Sequence2C

**Signature** (interface)

```ts
export interface Sequence2C<T extends URIS2, TL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A>(
    ta: Type2<T, TL, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, Type2<T, TL, A>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A>(
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

Added in v1.10.0

# Sequence3

**Signature** (interface)

```ts
export interface Sequence3<T extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <TU, TL, FU, FL, A>(
    ta: Type3<T, TU, TL, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, A>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <TU, TL, A>(
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

Added in v1.10.0

# Sequence3C

**Signature** (interface)

```ts
export interface Sequence3C<T extends URIS3, TU, TL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A>(
    ta: Type3<T, TU, TL, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, A>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A>(
    ta: Type3<T, TU, TL, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, A>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A>(
    ta: Type3<T, TU, TL, Type2<F, FL, A>>
  ) => Type2<F, FL, Type3<T, TU, TL, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A>(
    ta: Type3<T, TU, TL, Type2<F, FL, A>>
  ) => Type2<F, FL, Type3<T, TU, TL, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: Type3<T, TU, TL, Type<F, A>>) => Type<F, Type3<T, TU, TL, A>>
  <F>(F: Applicative<F>): <A>(ta: Type3<T, TU, TL, HKT<F, A>>) => HKT<F, Type3<T, TU, TL, A>>
}
```

Added in v1.10.0

# SequenceComposition11

**Signature** (interface)

```ts
export interface SequenceComposition11<F extends URIS, G extends URIS> {
  <H extends URIS3>(H: Applicative3<H>): <HU, HL, A>(
    fga: Type<F, Type<G, Type3<H, HU, HL, A>>>
  ) => Type3<H, HU, HL, Type<F, Type<G, A>>>
  <H extends URIS3, HU, HL>(H: Applicative3C<H, HU, HL>): <A>(
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

# Traversable2v

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

**Signature** (interface)

```ts
export interface Traversable2v<T> extends Functor<T>, Foldable2v<T> {
  /**
   * Runs an action for every element in a data structure and accumulates the results
   */
  readonly traverse: Traverse<T>
  readonly sequence: Sequence<T>
}
```

Added in v1.10.0

# Traversable2v1

**Signature** (interface)

```ts
export interface Traversable2v1<T extends URIS> extends Functor1<T>, Foldable2v1<T> {
  readonly traverse: Traverse1<T>
  readonly sequence: Sequence1<T>
}
```

Added in v1.10.0

# Traversable2v2

**Signature** (interface)

```ts
export interface Traversable2v2<T extends URIS2> extends Functor2<T>, Foldable2v2<T> {
  readonly traverse: Traverse2<T>
  readonly sequence: Sequence2<T>
}
```

Added in v1.10.0

# Traversable2v2C

**Signature** (interface)

```ts
export interface Traversable2v2C<T extends URIS2, TL> extends Functor2C<T, TL>, Foldable2v2C<T, TL> {
  readonly traverse: Traverse2C<T, TL>
  readonly sequence: Sequence2C<T, TL>
}
```

Added in v1.10.0

# Traversable2v3

**Signature** (interface)

```ts
export interface Traversable2v3<T extends URIS3> extends Functor3<T>, Foldable2v3<T> {
  readonly traverse: Traverse3<T>
  readonly sequence: Sequence3<T>
}
```

Added in v1.10.0

# Traversable2v3C

**Signature** (interface)

```ts
export interface Traversable2v3C<T extends URIS3, TU, TL> extends Functor3C<T, TU, TL>, Foldable2v3C<T, TU, TL> {
  readonly traverse: Traverse3C<T, TU, TL>
  readonly sequence: Sequence3C<T, TU, TL>
}
```

Added in v1.10.0

# Traversable2vComposition

**Signature** (interface)

```ts
export interface Traversable2vComposition<F, G> extends Foldable2vComposition<F, G>, FunctorComposition<F, G> {
  readonly traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(fga: HKT<F, HKT<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, HKT<F, HKT<G, B>>>
  readonly sequence: <H>(H: Applicative<H>) => <A>(fga: HKT<F, HKT<G, HKT<H, A>>>) => HKT<H, HKT<F, HKT<G, A>>>
}
```

# Traversable2vComposition11

**Signature** (interface)

```ts
export interface Traversable2vComposition11<F extends URIS, G extends URIS>
  extends Foldable2vComposition11<F, G>,
    FunctorComposition11<F, G> {
  readonly traverse: TraverseComposition11<F, G>
  readonly sequence: SequenceComposition11<F, G>
}
```

# TraverseComposition11

**Signature** (interface)

```ts
export interface TraverseComposition11<F extends URIS, G extends URIS> {
  <H extends URIS3>(H: Applicative3<H>): <HU, HL, A, B>(
    fga: Type<F, Type<G, A>>,
    f: (a: A) => Type3<H, HU, HL, B>
  ) => Type3<H, HU, HL, Type<F, Type<G, B>>>
  <H extends URIS3, HU, HL>(H: Applicative3C<H, HU, HL>): <A, B>(
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

# getTraversableComposition

Returns the composition of two traversables

**Signature** (function)

```ts
export function getTraversableComposition<F extends URIS, G extends URIS>(
  F: Traversable2v1<F>,
  G: Traversable2v1<G>
): Traversable2vComposition11<F, G>
export function getTraversableComposition<F, G>(
  F: Traversable2v<F>,
  G: Traversable2v<G>
): Traversable2vComposition<F, G>
export function getTraversableComposition<F, G>(
  F: Traversable2v<F>,
  G: Traversable2v<G>
): Traversable2vComposition<F, G> { ... }
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
assert.deepStrictEqual(x.run(), [some(1), none, some(2), some(undefined)])
```

Added in v1.10.0
