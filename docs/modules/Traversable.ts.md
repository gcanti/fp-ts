---
title: Traversable.ts
nav_order: 88
parent: Modules
---

## Traversable overview

`Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
`Applicative` functor.

- `traverse` runs an action for every element in a data structure, and accumulates the results.
- `sequence` runs the actions _contained_ in a data structure, and accumulates the results.

The `traverse` and `sequence` functions should be compatible in the following sense:

- `traverse(A)(f)(xs) <-> sequence(A)(A.map(f)(xs))`
- `sequence(A)(xs) <-> traverse(A)(identity)(xs)`

where `A` is an `Applicative` instance

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [sequence](#sequence)
  - [traverse](#traverse)
- [type classes](#type-classes)
  - [Traversable (interface)](#traversable-interface)
  - [Traversable1 (interface)](#traversable1-interface)
  - [Traversable2 (interface)](#traversable2-interface)
  - [Traversable2C (interface)](#traversable2c-interface)
  - [Traversable3 (interface)](#traversable3-interface)
- [utils](#utils)
  - [Sequence (interface)](#sequence-interface)
  - [Sequence1 (interface)](#sequence1-interface)
  - [Sequence2 (interface)](#sequence2-interface)
  - [Sequence2C (interface)](#sequence2c-interface)
  - [Sequence3 (interface)](#sequence3-interface)
  - [Traverse (interface)](#traverse-interface)
  - [Traverse1 (interface)](#traverse1-interface)
  - [Traverse2 (interface)](#traverse2-interface)
  - [Traverse2C (interface)](#traverse2c-interface)
  - [Traverse3 (interface)](#traverse3-interface)

---

# combinators

## sequence

`sequence` composition.

**Signature**

```ts
export declare function sequence<T extends URIS, G extends URIS>(
  T: Traversable1<T>,
  G: Traversable1<G>
): {
  <F extends URIS>(F: Applicative1<F>): <A>(tgfa: Kind<T, Kind<G, Kind<F, A>>>) => Kind<F, Kind<T, Kind<G, A>>>
  <F>(F: Applicative<F>): <A>(tgfa: HKT<T, HKT<G, HKT<F, A>>>) => HKT<F, HKT<T, HKT<G, A>>>
}
export declare function sequence<T, G>(
  T: Traversable<T>,
  G: Traversable<G>
): <F>(F: Applicative<F>) => <A>(tgfa: HKT<T, HKT<G, HKT<F, A>>>) => HKT<F, HKT<T, HKT<G, A>>>
```

Added in v3.0.0

## traverse

`traverse` composition.

**Signature**

```ts
export declare function traverse<T extends URIS, G extends URIS>(
  T: Traversable1<T>,
  G: Traversable1<G>
): {
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => (tga: Kind<T, Kind<G, A>>) => Kind<F, Kind<T, Kind<G, B>>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (tga: Kind<T, Kind<G, A>>) => HKT<F, Kind<T, Kind<G, B>>>
}
export declare function traverse<T, G>(
  T: Traversable<T>,
  G: Traversable<G>
): <F>(F: Applicative<F>) => <A, B>(f: (a: A) => HKT<F, B>) => (tga: HKT<T, HKT<G, A>>) => HKT<F, HKT<T, HKT<G, B>>>
```

Added in v3.0.0

# type classes

## Traversable (interface)

**Signature**

```ts
export interface Traversable<T> extends Functor<T> {
  readonly traverse: Traverse<T>
  readonly sequence: Sequence<T>
}
```

Added in v3.0.0

## Traversable1 (interface)

**Signature**

```ts
export interface Traversable1<T extends URIS> extends Functor1<T> {
  readonly traverse: Traverse1<T>
  readonly sequence: Sequence1<T>
}
```

Added in v3.0.0

## Traversable2 (interface)

**Signature**

```ts
export interface Traversable2<T extends URIS2> extends Functor2<T> {
  readonly traverse: Traverse2<T>
  readonly sequence: Sequence2<T>
}
```

Added in v3.0.0

## Traversable2C (interface)

**Signature**

```ts
export interface Traversable2C<T extends URIS2, E> extends Functor2C<T, E> {
  readonly traverse: Traverse2C<T, E>
  readonly sequence: Sequence2C<T, E>
}
```

Added in v3.0.0

## Traversable3 (interface)

**Signature**

```ts
export interface Traversable3<T extends URIS3> extends Functor3<T> {
  readonly traverse: Traverse3<T>
  readonly sequence: Sequence3<T>
}
```

Added in v3.0.0

# utils

## Sequence (interface)

**Signature**

```ts
export interface Sequence<T> {
  <F extends URIS4>(F: Applicative4<F>): <S, R, E, A>(ta: HKT<T, Kind4<F, S, R, E, A>>) => Kind4<F, S, R, E, HKT<T, A>>
  <F extends URIS3>(F: Applicative3<F>): <R, E, A>(ta: HKT<T, Kind3<F, R, E, A>>) => Kind3<F, R, E, HKT<T, A>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <R, A>(ta: HKT<T, Kind3<F, R, E, A>>) => Kind3<F, R, E, HKT<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <E, A>(ta: HKT<T, Kind2<F, E, A>>) => Kind2<F, E, HKT<T, A>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A>(ta: HKT<T, Kind2<F, E, A>>) => Kind2<F, E, HKT<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: HKT<T, Kind<F, A>>) => Kind<F, HKT<T, A>>
  <F>(F: Applicative<F>): <A>(ta: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
}
```

Added in v3.0.0

## Sequence1 (interface)

**Signature**

```ts
export interface Sequence1<T extends URIS> {
  <F extends URIS4>(F: Applicative4<F>): <S, R, E, A>(
    ta: Kind<T, Kind4<F, S, R, E, A>>
  ) => Kind4<F, S, R, E, Kind<T, A>>
  <F extends URIS3>(F: Applicative3<F>): <R, E, A>(ta: Kind<T, Kind3<F, R, E, A>>) => Kind3<F, R, E, Kind<T, A>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <R, A>(ta: Kind<T, Kind3<F, R, E, A>>) => Kind3<F, R, E, Kind<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <E, A>(ta: Kind<T, Kind2<F, E, A>>) => Kind2<F, E, Kind<T, A>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A>(ta: Kind<T, Kind2<F, E, A>>) => Kind2<F, E, Kind<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: Kind<T, Kind<F, A>>) => Kind<F, Kind<T, A>>
  <F>(F: Applicative<F>): <A>(ta: Kind<T, HKT<F, A>>) => HKT<F, Kind<T, A>>
}
```

Added in v3.0.0

## Sequence2 (interface)

**Signature**

```ts
export interface Sequence2<T extends URIS2> {
  <F extends URIS4>(F: Applicative4<F>): <TE, S, R, FE, A>(
    ta: Kind2<T, TE, Kind4<F, S, R, FE, A>>
  ) => Kind4<F, S, R, FE, Kind2<T, TE, A>>
  <F extends URIS3>(F: Applicative3<F>): <TE, R, FE, A>(
    ta: Kind2<T, TE, Kind3<F, R, FE, A>>
  ) => Kind3<F, R, FE, Kind2<T, TE, A>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <TE, R, A>(
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

Added in v3.0.0

## Sequence2C (interface)

**Signature**

```ts
export interface Sequence2C<T extends URIS2, E> {
  <F extends URIS4>(F: Applicative4<F>): <S, R, FE, A>(
    ta: Kind2<T, E, Kind4<F, S, R, FE, A>>
  ) => Kind4<F, S, R, FE, Kind2<T, E, A>>
  <F extends URIS3>(F: Applicative3<F>): <R, FE, A>(
    ta: Kind2<T, E, Kind3<F, R, FE, A>>
  ) => Kind3<F, R, FE, Kind2<T, E, A>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <R, A>(
    ta: Kind2<T, E, Kind3<F, R, FE, A>>
  ) => Kind3<F, R, FE, Kind2<T, E, A>>
  <F extends URIS2>(F: Applicative2<F>): <FE, A>(ta: Kind2<T, E, Kind2<F, FE, A>>) => Kind2<F, FE, Kind2<T, E, A>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A>(ta: Kind2<T, E, Kind2<F, FE, A>>) => Kind2<F, FE, Kind2<T, E, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: Kind2<T, E, Kind<F, A>>) => Kind<F, Kind2<T, E, A>>
  <F>(F: Applicative<F>): <A>(ta: Kind2<T, E, HKT<F, A>>) => HKT<F, Kind2<T, E, A>>
}
```

Added in v3.0.0

## Sequence3 (interface)

**Signature**

```ts
export interface Sequence3<T extends URIS3> {
  <F extends URIS4>(F: Applicative4<F>): <TR, TE, S, FR, FE, A>(
    ta: Kind3<T, TR, TE, Kind4<F, FR, S, FE, A>>
  ) => Kind4<F, S, FR, FE, Kind3<T, TR, TE, A>>
  <F extends URIS3>(F: Applicative3<F>): <TR, TE, FR, FE, A>(
    ta: Kind3<T, TR, TE, Kind3<F, FR, FE, A>>
  ) => Kind3<F, FR, FE, Kind3<T, TR, TE, A>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <TR, TE, FR, A>(
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

Added in v3.0.0

## Traverse (interface)

**Signature**

```ts
export interface Traverse<T> {
  <F extends URIS4>(F: Applicative4<F>): <A, S, R, E, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => (ta: HKT<T, A>) => Kind4<F, S, R, E, HKT<T, B>>
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ta: HKT<T, A>) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ta: HKT<T, A>) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ta: HKT<T, A>) => Kind2<F, E, HKT<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ta: HKT<T, A>) => Kind2<F, E, HKT<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, B>) => (ta: HKT<T, A>) => Kind<F, HKT<T, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (ta: HKT<T, A>) => HKT<F, HKT<T, B>>
}
```

Added in v3.0.0

## Traverse1 (interface)

**Signature**

```ts
export interface Traverse1<T extends URIS> {
  <F extends URIS4>(F: Applicative4<F>): <A, S, R, E, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => (ta: Kind<T, A>) => Kind4<F, S, R, E, Kind<T, B>>
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, B>) => (ta: Kind<T, A>) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (ta: Kind<T, A>) => HKT<F, Kind<T, B>>
}
```

Added in v3.0.0

## Traverse2 (interface)

**Signature**

```ts
export interface Traverse2<T extends URIS2> {
  <F extends URIS4>(F: Applicative4<F>): <A, S, R, FE, B>(
    f: (a: A) => Kind4<F, S, R, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind4<F, S, R, FE, Kind2<T, TE, B>>
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (a: A) => Kind3<F, R, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <A, R, B>(
    f: (a: A) => Kind3<F, R, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind<F, Kind2<T, TE, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => <TE>(ta: Kind2<T, TE, A>) => HKT<F, Kind2<T, TE, B>>
}
```

Added in v3.0.0

## Traverse2C (interface)

**Signature**

```ts
export interface Traverse2C<T extends URIS2, E> {
  <F extends URIS4>(F: Applicative4<F>): <A, S, R, FE, B>(
    f: (a: A) => Kind4<F, S, R, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind4<F, S, R, FE, Kind2<T, E, B>>
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (a: A) => Kind3<F, R, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind3<F, R, FE, Kind2<T, E, B>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <A, R, B>(
    f: (a: A) => Kind3<F, R, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind3<F, R, FE, Kind2<T, E, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => (ta: Kind2<T, E, A>) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (ta: Kind2<T, E, A>) => HKT<F, Kind2<T, E, B>>
}
```

Added in v3.0.0

## Traverse3 (interface)

**Signature**

```ts
export interface Traverse3<T extends URIS3> {
  <F extends URIS4>(F: Applicative4<F>): <A, S, FR, FE, B>(
    f: (a: A) => Kind4<F, S, FR, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind4<F, S, FR, FE, Kind3<T, TR, TE, B>>
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind3<F, FR, FE, Kind3<T, TR, TE, B>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <A, FR, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind3<F, FR, FE, Kind3<T, TR, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind2<F, FE, Kind3<T, TR, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <R, TE>(ta: Kind3<T, R, TE, A>) => Kind2<F, FE, Kind3<T, R, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => <R, E>(ta: Kind3<T, R, E, A>) => Kind<F, Kind3<T, R, E, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => <R, E>(ta: Kind3<T, R, E, A>) => HKT<F, Kind3<T, R, E, B>>
}
```

Added in v3.0.0
