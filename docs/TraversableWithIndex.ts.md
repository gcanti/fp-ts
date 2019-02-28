---
title: TraversableWithIndex.ts
nav_order: 89
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [TraversableWithIndex](#traversablewithindex)
- [TraversableWithIndex1](#traversablewithindex1)
- [TraversableWithIndex2](#traversablewithindex2)
- [TraversableWithIndex2C](#traversablewithindex2c)
- [TraverseWithIndex](#traversewithindex)
- [TraverseWithIndex1](#traversewithindex1)
- [TraverseWithIndex2](#traversewithindex2)
- [TraverseWithIndex2C](#traversewithindex2c)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# TraversableWithIndex

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

**Signature** (interface)

```ts
export interface TraversableWithIndex<T, I> extends FunctorWithIndex<T, I>, FoldableWithIndex<T, I>, Traversable2v<T> {
  readonly traverseWithIndex: TraverseWithIndex<T, I>
}
```

Added in v1.12.0

# TraversableWithIndex1

**Signature** (interface)

```ts
export interface TraversableWithIndex1<T extends URIS, I>
  extends FunctorWithIndex1<T, I>,
    FoldableWithIndex1<T, I>,
    Traversable2v1<T> {
  readonly traverseWithIndex: TraverseWithIndex1<T, I>
}
```

# TraversableWithIndex2

**Signature** (interface)

```ts
export interface TraversableWithIndex2<T extends URIS2, I>
  extends FunctorWithIndex2<T, I>,
    FoldableWithIndex2<T, I>,
    Traversable2v2<T> {
  readonly traverseWithIndex: TraverseWithIndex2<T, I>
}
```

# TraversableWithIndex2C

**Signature** (interface)

```ts
export interface TraversableWithIndex2C<T extends URIS2, I, L>
  extends FunctorWithIndex2C<T, I, L>,
    FoldableWithIndex2C<T, I, L>,
    Traversable2v2C<T, L> {
  readonly traverseWithIndex: TraverseWithIndex2C<T, I, L>
}
```

# TraverseWithIndex

**Signature** (interface)

```ts
export interface TraverseWithIndex<T, I> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, HKT<T, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, HKT<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, HKT<T, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, HKT<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: HKT<T, A>, f: (i: I, a: A) => Type<F, B>) => Type<F, HKT<T, B>>
  <F>(F: Applicative<F>): <A, B>(ta: HKT<T, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}
```

# TraverseWithIndex1

**Signature** (interface)

```ts
export interface TraverseWithIndex1<T extends URIS, I> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type<T, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type<T, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: Type<T, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type<T, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type<T, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type<T, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Type<T, A>, f: (i: I, a: A) => Type<F, B>) => Type<F, Type<T, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type<T, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, Type<T, B>>
}
```

# TraverseWithIndex2

**Signature** (interface)

```ts
export interface TraverseWithIndex2<T extends URIS2, I> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type2<T, FL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type2<T, FL, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, FL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, FL, B>>
  <F extends URIS>(F: Applicative1<F>): <FL, A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type<F, B>
  ) => Type<F, Type2<T, FL, B>>
  <F>(F: Applicative<F>): <FL, A, B>(ta: Type2<T, FL, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, Type2<T, FL, B>>
}
```

# TraverseWithIndex2C

**Signature** (interface)

```ts
export interface TraverseWithIndex2C<T extends URIS2, I, FL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type2<T, FL, B>>
  <F extends URIS3, FU>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type2<T, FL, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, FL, B>>
  <F extends URIS2>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, FL, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type<F, B>
  ) => Type<F, Type2<T, FL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type2<T, FL, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, Type2<T, FL, B>>
}
```
