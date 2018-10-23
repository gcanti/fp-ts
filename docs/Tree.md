---
id: Tree
title: Module Tree
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts)

# Tree

```ts
constructor(readonly value: A, readonly forest: Forest<A>) {}
```

Added in v1.6.0 (data)

Multi-way trees (aka rose trees) and forests, where a forest is

```ts
type Forest<A> = Array<Tree<A>>
```

## ap

```ts
<B>(fab: Tree<(a: A) => B>): Tree<B>
```

Added in v1.6.0 (method)

## ap\_

```ts
<B, C>(this: Tree<(b: B) => C>, fb: Tree<B>): Tree<C>
```

Added in v1.6.0 (method)

Flipped version of [ap](#ap)

## chain

```ts
<B>(f: (a: A) => Tree<B>): Tree<B>
```

Added in v1.6.0 (method)

## extend

```ts
<B>(f: (fa: Tree<A>) => B): Tree<B>
```

Added in v1.6.0 (method)

## extract

```ts
(): A
```

Added in v1.6.0 (method)

## inspect

```ts
(): string
```

Added in v1.6.0 (method)

## map

```ts
<B>(f: (a: A) => B): Tree<B>
```

Added in v1.6.0 (method)

## reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

Added in v1.6.0 (method)

## toString

```ts
(): string
```

Added in v1.6.0 (method)

## tree

```ts
Monad1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI>
```

Added in v1.6.0 (instance)

## drawForest

```ts
(forest: Forest<string>): string
```

Added in v1.6.0 (function)

Neat 2-dimensional drawing of a forest

## drawTree

```ts
(tree: Tree<string>): string
```

Added in v1.6.0 (function)

Neat 2-dimensional drawing of a tree

_Example_

```ts
import { Tree, drawTree } from 'fp-ts/lib/Tree'

const fa = new Tree('a', [new Tree('b', []), new Tree('c', []), new Tree('d', [new Tree('e', []), new Tree('f', [])])])

assert.strictEqual(
  drawTree(fa),
  `a
├─ b
├─ c
└─ d
   ├─ e
   └─ f`
)
```

## getSetoid

```ts
<A>(S: Setoid<A>): Setoid<Tree<A>>
```

Added in v1.6.0 (function)

## unfoldForest

```ts
<A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A>
```

Added in v1.6.0 (function)

Build a tree from a seed value

## unfoldForestM

```ts
unfoldForestM<M>(
  M: Monad<M>
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>>
```

Added in v1.6.0 (function)

Monadic forest builder, in depth-first order

## unfoldTree

```ts
<A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A>
```

Added in v1.6.0 (function)

Build a tree from a seed value

## unfoldTreeM

```ts
unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>>
```

Added in v1.6.0 (function)

Monadic tree builder, in depth-first order
