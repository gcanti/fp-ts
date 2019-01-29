---
id: Tree
title: Module Tree
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts)

## tree

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L151-L164)

```ts
export const tree: Monad1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = { ... }
```

Added in v1.6.0

# Tree

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L35-L76)

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

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L42-L44)

```ts
ap<B>(fab: Tree<(a: A) => B>): Tree<B>  { ... }
```

Added in v1.6.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L49-L51)

```ts
ap_<B, C>(this: Tree<(b: B) => C>, fb: Tree<B>): Tree<C>  { ... }
```

Added in v1.6.0

## chain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L52-L55)

```ts
chain<B>(f: (a: A) => Tree<B>): Tree<B>  { ... }
```

Added in v1.6.0

## extend

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L59-L61)

```ts
extend<B>(f: (fa: Tree<A>) => B): Tree<B>  { ... }
```

Added in v1.6.0

## extract

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L56-L58)

```ts
extract(): A  { ... }
```

Added in v1.6.0

## inspect

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L70-L72)

```ts
inspect(): string  { ... }
```

Added in v1.6.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L39-L41)

```ts
map<B>(f: (a: A) => B): Tree<B>  { ... }
```

Added in v1.6.0

## reduce

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L62-L69)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.6.0

## toString

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L73-L75)

```ts
toString(): string  { ... }
```

Added in v1.6.0

Added in v1.6.0

## drawForest

Neat 2-dimensional drawing of a forest

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L184-L186)

```ts
export const drawForest = (forest: Forest<string>): string => { ... }
```

Added in v1.6.0

## drawTree

Neat 2-dimensional drawing of a tree

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L210-L212)

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

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L138-L145)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Tree<A>> => { ... }
```

Added in v1.6.0

## unfoldForest

Build a tree from a seed value

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L229-L231)

```ts
export const unfoldForest = <A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A> => { ... }
```

Added in v1.6.0

## unfoldForestM

Monadic forest builder, in depth-first order

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L282-L294)

```ts
export function unfoldForestM<M>(
  M: Monad<M>
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>>  { ... }
```

Added in v1.6.0

## unfoldTree

Build a tree from a seed value

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L219-L222)

```ts
export const unfoldTree = <A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A> => { ... }
```

Added in v1.6.0

## unfoldTreeM

Monadic tree builder, in depth-first order

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts#L254-L257)

```ts
export function unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>>  { ... }
```

Added in v1.6.0
