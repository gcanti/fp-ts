---
id: TraversableWithIndex
title: Module TraversableWithIndex
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/TraversableWithIndex.ts)

# TraversableWithIndex

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TraversableWithIndex.ts#L30-L32)

```ts
export interface TraversableWithIndex<T, I> extends FunctorWithIndex<T, I>, FoldableWithIndex<T, I>, Traversable2v<T> {
  readonly traverseWithIndex: TraverseWithIndex<T, I>
}
```

A [Traversable](./Traversable.md) with an additional index.
A `TraversableWithIndex` instance must be compatible with its [Traversable](./Traversable.md) instance

```ts
traverse(F)(ta, f) = traverseWithIndex(F)(ta, (_, a) => f(a))
```

with its [FoldableWithIndex](./FoldableWithIndex.md) instance

```ts
foldMapWithIndex(M)(ta, f) = traverseWithIndex(getApplicative(M))(ta, (i, a) => new Const(f(i, a))).value
```

and with its [FunctorWithIndex](./FunctorWithIndex.md) instance

```purescript
mapWithIndex(ta, f) = traverseWithIndex(identity)(ta, (i, a) => new Identity(f(i, a))).value
```

Added in v1.12.0
