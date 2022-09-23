---
title: TraversableWithIndex.ts
nav_order: 114
parent: Modules
---

## TraversableWithIndex overview

A `Traversable` with an additional index.
A `TraversableWithIndex` instance must be compatible with its `Traversable` instance

```ts
traverse(F)(ta, f) = traverseWithIndex(F)(ta, (_, a) => f(a))
```

with its `FoldableWithIndex` instance

```ts
foldMapWithIndex(M)(ta, f) = traverseWithIndex(getApplicative(M))(ta, (i, a) => new Const(f(i, a))).value
```

and with its `FunctorWithIndex` instance

```purescript
mapWithIndex(ta, f) = traverseWithIndex(identity)(ta, (i, a) => new Identity(f(i, a))).value
```

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [PipeableTraverseWithIndex1 (interface)](#pipeabletraversewithindex1-interface)
  - [PipeableTraverseWithIndex2 (interface)](#pipeabletraversewithindex2-interface)
  - [TraversableWithIndex (interface)](#traversablewithindex-interface)
  - [TraversableWithIndex1 (interface)](#traversablewithindex1-interface)
  - [TraversableWithIndex2 (interface)](#traversablewithindex2-interface)
  - [TraversableWithIndex2C (interface)](#traversablewithindex2c-interface)
  - [TraverseWithIndex (interface)](#traversewithindex-interface)
  - [TraverseWithIndex1 (interface)](#traversewithindex1-interface)
  - [TraverseWithIndex2 (interface)](#traversewithindex2-interface)
  - [TraverseWithIndex2C (interface)](#traversewithindex2c-interface)

---

# utils

## PipeableTraverseWithIndex1 (interface)

**Signature**

```ts
export interface PipeableTraverseWithIndex1<T extends URIS, I> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (i: I, a: A) => Kind<F, B>) => (ta: Kind<T, A>) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(f: (i: I, a: A) => HKT<F, B>) => (ta: Kind<T, A>) => HKT<F, Kind<T, B>>
}
```

Added in v2.6.3

## PipeableTraverseWithIndex2 (interface)

**Signature**

```ts
export interface PipeableTraverseWithIndex2<T extends URIS2, I> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (i: I, a: A) => Kind3<F, R, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (i: I, a: A) => Kind<F, B>
  ) => <E>(ta: Kind2<T, E, A>) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <A, B>(f: (i: I, a: A) => HKT<F, B>) => <E>(ta: Kind2<T, E, A>) => HKT<F, Kind2<T, E, B>>
}
```

Added in v2.6.3

## TraversableWithIndex (interface)

**Signature**

```ts
export interface TraversableWithIndex<T, I> extends FunctorWithIndex<T, I>, FoldableWithIndex<T, I>, Traversable<T> {
  readonly traverseWithIndex: TraverseWithIndex<T, I>
}
```

Added in v2.0.0

## TraversableWithIndex1 (interface)

**Signature**

```ts
export interface TraversableWithIndex1<T extends URIS, I>
  extends FunctorWithIndex1<T, I>,
    FoldableWithIndex1<T, I>,
    Traversable1<T> {
  readonly traverseWithIndex: TraverseWithIndex1<T, I>
}
```

Added in v2.0.0

## TraversableWithIndex2 (interface)

**Signature**

```ts
export interface TraversableWithIndex2<T extends URIS2, I>
  extends FunctorWithIndex2<T, I>,
    FoldableWithIndex2<T, I>,
    Traversable2<T> {
  readonly traverseWithIndex: TraverseWithIndex2<T, I>
}
```

Added in v2.0.0

## TraversableWithIndex2C (interface)

**Signature**

```ts
export interface TraversableWithIndex2C<T extends URIS2, I, E>
  extends FunctorWithIndex2C<T, I, E>,
    FoldableWithIndex2C<T, I, E>,
    Traversable2C<T, E> {
  readonly traverseWithIndex: TraverseWithIndex2C<T, I, E>
}
```

Added in v2.0.0

## TraverseWithIndex (interface)

**Signature**

```ts
export interface TraverseWithIndex<T, I> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, HKT<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, HKT<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: HKT<T, A>, f: (i: I, a: A) => Kind<F, B>) => Kind<F, HKT<T, B>>
  <F>(F: Applicative<F>): <A, B>(ta: HKT<T, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}
```

Added in v2.0.0

## TraverseWithIndex1 (interface)

**Signature**

```ts
export interface TraverseWithIndex1<T extends URIS, I> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    ta: Kind<T, A>,
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    ta: Kind<T, A>,
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    ta: Kind<T, A>,
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, Kind<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    ta: Kind<T, A>,
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, Kind<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Kind<T, A>, f: (i: I, a: A) => Kind<F, B>) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Kind<T, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, Kind<T, B>>
}
```

Added in v2.0.0

## TraverseWithIndex2 (interface)

**Signature**

```ts
export interface TraverseWithIndex2<T extends URIS2, I> {
  <F extends URIS3>(F: Applicative3<F>): <TE, A, R, FE, B>(
    ta: Kind2<T, TE, A>,
    f: (i: I, a: A) => Kind3<F, R, FE, B>
  ) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <TE, A, FE, B>(
    ta: Kind2<T, TE, A>,
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <TE, A, B>(
    ta: Kind2<T, TE, A>,
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <E, A, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => Kind<F, B>
  ) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <E, A, B>(ta: Kind2<T, E, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, Kind2<T, E, B>>
}
```

Added in v2.0.0

## TraverseWithIndex2C (interface)

**Signature**

```ts
export interface TraverseWithIndex2C<T extends URIS2, I, E> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => Kind3<F, R, FE, B>
  ) => Kind3<F, R, FE, Kind2<T, E, B>>
  <F extends URIS3>(F: Applicative3C<F, E>): <A, R, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, Kind2<T, E, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends URIS2>(F: Applicative2C<F, E>): <A, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => Kind2<F, E, Kind2<T, E, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Kind2<T, E, A>,
    f: (i: I, a: A) => Kind<F, B>
  ) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Kind2<T, E, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, Kind2<T, E, B>>
}
```

Added in v2.0.0
