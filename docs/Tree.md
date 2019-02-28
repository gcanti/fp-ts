---
id: Tree
title: Tree
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts)

# Tree

**Signature** (data type)

```ts
export class Tree<A> {
  constructor(readonly value: A, readonly forest: Forest<A>) {}
  ...
}
```

Multi-way trees (aka rose trees) and forests, where a forest is

```ts
type Forest<A> = Array<Tree<A>>
```

## ap

**Signature** (method)

```ts
ap<B>(fab: Tree<(a: A) => B>): Tree<B>  { ... }
```

Added in v1.6.0

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: Tree<(b: B) => C>, fb: Tree<B>): Tree<C>  { ... }
```

Added in v1.6.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => Tree<B>): Tree<B>  { ... }
```

Added in v1.6.0

## extend

**Signature** (method)

```ts
extend<B>(f: (fa: Tree<A>) => B): Tree<B>  { ... }
```

Added in v1.6.0

## extract

**Signature** (method)

```ts
extract(): A  { ... }
```

Added in v1.6.0

## inspect

**Signature** (method)

```ts
inspect(): string  { ... }
```

Added in v1.6.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Tree<B>  { ... }
```

Added in v1.6.0

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.6.0

## toString

**Signature** (method)

```ts
toString(): string  { ... }
```

Added in v1.6.0

Added in v1.6.0

## tree

**Signature** (constant)

```ts
export const tree: Monad1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = ...
```

Added in v1.6.0

## drawForest

Neat 2-dimensional drawing of a forest

**Signature** (function)

```ts
export const drawForest = (forest: Forest<string>): string => { ... }
```

Added in v1.6.0

## drawTree

Neat 2-dimensional drawing of a tree

**Signature** (function)

```ts
export const drawTree = (tree: Tree<string>): string => { ... }
```

**Example**

```ts
import { Tree, drawTree, tree } from 'fp-ts/lib/Tree'

const fa = new Tree('a', [tree.of('b'), tree.of('c'), new Tree('d', [tree.of('e'), tree.of('f')])])

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

Added in v1.6.0

## elem

**Signature** (function)

```ts
export function elem<A>(S: Setoid<A>): (a: A, fa: Tree<A>) => boolean  { ... }
```

Added in v1.14.0

## getSetoid

**Signature** (function)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Tree<A>> => { ... }
```

Added in v1.6.0

## unfoldForest

Build a tree from a seed value

**Signature** (function)

```ts
export const unfoldForest = <A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A> => { ... }
```

Added in v1.6.0

## unfoldForestM

Monadic forest builder, in depth-first order

**Signature** (function)

```ts
export function unfoldForestM<M>(
  M: Monad<M>
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>>  { ... }
```

Added in v1.6.0

## unfoldTree

Build a tree from a seed value

**Signature** (function)

```ts
export const unfoldTree = <A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A> => { ... }
```

Added in v1.6.0

## unfoldTreeM

Monadic tree builder, in depth-first order

**Signature** (function)

```ts
export function unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>>  { ... }
```

Added in v1.6.0
