---
title: Traversable.ts
nav_order: 87
---

**Table of contents**

- [~~Traversable~~ (interface)](#traversable-interface)
- [Traversable1 (interface)](#traversable1-interface)
- [Traversable2 (interface)](#traversable2-interface)
- [Traversable2C (interface)](#traversable2c-interface)
- [Traversable3 (interface)](#traversable3-interface)
- [Traversable3C (interface)](#traversable3c-interface)
- [TraversableComposition (interface)](#traversablecomposition-interface)
- [TraversableComposition11 (interface)](#traversablecomposition11-interface)
- [Traverse (interface)](#traverse-interface)
- [Traverse1 (interface)](#traverse1-interface)
- [Traverse2 (interface)](#traverse2-interface)
- [Traverse2C (interface)](#traverse2c-interface)
- [Traverse3 (interface)](#traverse3-interface)
- [Traverse3C (interface)](#traverse3c-interface)
- [TraverseComposition11 (interface)](#traversecomposition11-interface)
- [~~getTraversableComposition~~ (function)](#gettraversablecomposition-function)
- [~~sequence~~ (function)](#sequence-function)
- [~~traverse~~ (function)](#traverse-function)

# ~~Traversable~~ (interface)

Use `Traversable2v` instead

**Signature**

```ts
export interface Traversable<T> extends Functor<T>, Foldable<T> {
  /**
   * Runs an action for every element in a data structure and accumulates the results
   */
  readonly traverse: Traverse<T>
}
```

# Traversable1 (interface)

**Signature**

```ts
export interface Traversable1<T extends URIS> extends Functor1<T>, Foldable1<T> {
  readonly traverse: Traverse1<T>
}
```

# Traversable2 (interface)

**Signature**

```ts
export interface Traversable2<T extends URIS2> extends Functor2<T>, Foldable2<T> {
  readonly traverse: Traverse2<T>
}
```

# Traversable2C (interface)

**Signature**

```ts
export interface Traversable2C<T extends URIS2, TL> extends Functor2C<T, TL>, Foldable2C<T, TL> {
  readonly traverse: Traverse2C<T, TL>
}
```

# Traversable3 (interface)

**Signature**

```ts
export interface Traversable3<T extends URIS3> extends Functor3<T>, Foldable3<T> {
  readonly traverse: Traverse3<T>
}
```

# Traversable3C (interface)

**Signature**

```ts
export interface Traversable3C<T extends URIS3, TU, TL> extends Functor3C<T, TU, TL>, Foldable3C<T, TU, TL> {
  readonly traverse: Traverse3C<T, TU, TL>
}
```

# TraversableComposition (interface)

**Signature**

```ts
export interface TraversableComposition<F, G> extends FoldableComposition<F, G>, FunctorComposition<F, G> {
  readonly traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(fga: HKT<F, HKT<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, HKT<F, HKT<G, B>>>
}
```

# TraversableComposition11 (interface)

**Signature**

```ts
export interface TraversableComposition11<F extends URIS, G extends URIS>
  extends FoldableComposition11<F, G>,
    FunctorComposition11<F, G> {
  readonly traverse: TraverseComposition11<F, G>
}
```

# Traverse (interface)

**Signature**

```ts
export interface Traverse<T> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: HKT<T, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, HKT<T, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
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

Added in v1.7.0

# Traverse1 (interface)

**Signature**

```ts
export interface Traverse1<T extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type<T, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type<T, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
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

Added in v1.7.0

# Traverse2 (interface)

**Signature**

```ts
export interface Traverse2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <TL, FU, FL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type2<T, TL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <TL, A, B>(
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

Added in v1.7.0

# Traverse2C (interface)

**Signature**

```ts
export interface Traverse2C<T extends URIS2, TL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type2<T, TL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
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

Added in v1.7.0

# Traverse3 (interface)

**Signature**

```ts
export interface Traverse3<T extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <TU, TL, FU, FL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <TU, TL, A, B>(
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

Added in v1.7.0

# Traverse3C (interface)

**Signature**

```ts
export interface Traverse3C<T extends URIS3, TU, TL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type3<T, TU, TL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type3<T, TU, TL, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type<F, B>
  ) => Type<F, Type3<T, TU, TL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type3<T, TU, TL, B>>
}
```

Added in v1.7.0

# TraverseComposition11 (interface)

**Signature**

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

# ~~getTraversableComposition~~ (function)

Use `Traversable2v`'s `getTraversableComposition` instead.

**Signature**

```ts
export function getTraversableComposition<F extends URIS, G extends URIS>(
  F: Traversable1<F>,
  G: Traversable1<G>
): TraversableComposition11<F, G>
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G>
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G> { ... }
```

Added in v1.0.0

# ~~sequence~~ (function)

Use `sequence` contained in each traversable data structure instead.

**Signature**

```ts
export function sequence<F extends URIS2, T extends URIS2>(
  F: Applicative2<F>,
  T: Traversable2<T>
): <LF, LT, A>(tfa: Type2<T, LT, Type2<F, LF, A>>) => Type2<F, LF, Type2<T, LT, A>>
export function sequence<F extends URIS2, T extends URIS2, LF>(
  F: Applicative2C<F, LF>,
  T: Traversable2<T>
): <LT, A>(tfa: Type2<T, LT, Type2<F, LF, A>>) => Type2<F, LF, Type2<T, LT, A>>
export function sequence<F extends URIS, T extends URIS2>(
  F: Applicative1<F>,
  T: Traversable2<T>
): <L, A>(tfa: Type2<T, L, Type<F, A>>) => Type<F, Type2<T, L, A>>
export function sequence<F extends URIS3, T extends URIS>(
  F: Applicative3<F>,
  T: Traversable1<T>
): <U, L, A>(tfa: Type<T, Type3<F, U, L, A>>) => Type3<F, U, L, Type<T, A>>
export function sequence<F extends URIS3, T extends URIS, U, L>(
  F: Applicative3C<F, U, L>,
  T: Traversable1<T>
): <A>(tfa: Type<T, Type3<F, U, L, A>>) => Type3<F, U, L, Type<T, A>>
export function sequence<F extends URIS2, T extends URIS>(
  F: Applicative2<F>,
  T: Traversable1<T>
): <L, A>(tfa: Type<T, Type2<F, L, A>>) => Type2<F, L, Type<T, A>>
export function sequence<F extends URIS2, T extends URIS, L>(
  F: Applicative2C<F, L>,
  T: Traversable1<T>
): <A>(tfa: Type<T, Type2<F, L, A>>) => Type2<F, L, Type<T, A>>
export function sequence<F extends URIS, T extends URIS>(
  F: Applicative1<F>,
  T: Traversable1<T>
): <A>(tfa: Type<T, Type<F, A>>) => Type<F, Type<T, A>>
export function sequence<F, T extends URIS>(
  F: Applicative<F>,
  T: Traversable1<T>
): <A>(tfa: Type<T, HKT<F, A>>) => HKT<F, Type<T, A>>
export function sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
export function sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>> { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { none, option, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(array.sequence(option)([some(1), some(2), some(3)]), some([1, 2, 3]))
assert.deepStrictEqual(array.sequence(option)([none, some(2), some(3)]), none)
```

Added in v1.0.0

# ~~traverse~~ (function)

Use `traverse` contained in each traversable data structure instead.

**Signature**

```ts
export function traverse<F extends URIS3, T extends URIS2>(
  F: Applicative3<F>,
  T: Traversable2<T>
): <UF, LF, LT, A, B>(ta: Type2<T, LT, A>, f: (a: A) => Type3<F, UF, LF, B>) => Type3<F, UF, LF, Type2<T, LT, B>>
export function traverse<F extends URIS2, T extends URIS2>(
  F: Applicative2<F>,
  T: Traversable2<T>
): <LF, LT, A, B>(ta: Type2<T, LT, A>, f: (a: A) => Type2<F, LF, B>) => Type2<F, LF, Type2<T, LT, B>>
export function traverse<F extends URIS2, T extends URIS2, LF>(
  F: Applicative2C<F, LF>,
  T: Traversable2<T>
): <LT, A, B>(ta: Type2<T, LT, A>, f: (a: A) => Type2<F, LF, B>) => Type2<F, LF, Type2<T, LT, B>>
export function traverse<F extends URIS, T extends URIS2>(
  F: Applicative1<F>,
  T: Traversable2<T>
): <LT, A, B>(ta: Type2<T, LT, A>, f: (a: A) => Type<F, B>) => Type<F, Type2<T, LT, B>>
export function traverse<F extends URIS3, T extends URIS>(
  F: Applicative3<F>,
  T: Traversable1<T>
): <U, L, A, B>(ta: Type<T, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Type<T, B>>
export function traverse<F extends URIS2, T extends URIS>(
  F: Applicative2<F>,
  T: Traversable1<T>
): <L, A, B>(ta: Type<T, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Type<T, B>>
export function traverse<F extends URIS2, T extends URIS, L>(
  F: Applicative2C<F, L>,
  T: Traversable1<T>
): <A, B>(ta: Type<T, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Type<T, B>>
export function traverse<F extends URIS, T extends URIS>(
  F: Applicative1<F>,
  T: Traversable1<T>
): <A, B>(ta: Type<T, A>, f: (a: A) => Type<F, B>) => Type<F, Type<T, B>>
export function traverse<F, T>(
  F: Applicative<F>,
  // tslint:disable-next-line: deprecation
  T: Traversable<T>
): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
export function traverse<F, T>(
  F: Applicative<F>,
  // tslint:disable-next-line: deprecation
  T: Traversable<T>
): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>> { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { none, option, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(array.traverse(option)([1, 2, 3], n => (n >= 0 ? some(n) : none)), some([1, 2, 3]))
assert.deepStrictEqual(array.traverse(option)([-1, 2, 3], n => (n >= 0 ? some(n) : none)), none)
```

Added in v1.0.0
