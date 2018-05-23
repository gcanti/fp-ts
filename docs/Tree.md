---
id: Tree
title: Module Tree
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Tree.ts)

## Data

### Tree

_data_

_since 1.6.0_

_Signature_

```ts
constructor(readonly value: A, readonly forest: Forest<A>) {}
```

_Description_

Multi-way trees (aka rose trees) and forests, where a forest is

```ts
type Forest<A> = Array<Tree<A>>
```

## Methods

### ap

_method_

_since 1.6.0_

_Signature_

```ts
<B>(fab: Tree<(a: A) => B>): Tree<B>
```

### ap\_

_method_

_since 1.6.0_

_Signature_

```ts
<B, C>(this: Tree<(b: B) => C>, fb: Tree<B>): Tree<C>
```

### chain

_method_

_since 1.6.0_

_Signature_

```ts
<B>(f: (a: A) => Tree<B>): Tree<B>
```

### extend

_method_

_since 1.6.0_

_Signature_

```ts
<B>(f: (fa: Tree<A>) => B): Tree<B>
```

### extract

_method_

_since 1.6.0_

_Signature_

```ts
(): A
```

### inspect

_method_

_since 1.6.0_

_Signature_

```ts
(): string
```

### map

_method_

_since 1.6.0_

_Signature_

```ts
<B>(f: (a: A) => B): Tree<B>
```

### reduce

_method_

_since 1.6.0_

_Signature_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### toString

_method_

_since 1.6.0_

_Signature_

```ts
(): string
```

## Instances

### tree

_instance_

_since 1.6.0_

_Signature_

```ts
Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI>
```

## Functions

### drawForest

_function_

_since 1.6.0_

_Signature_

```ts
(forest: Forest<string>): string
```

_Description_

Neat 2-dimensional drawing of a forest

### drawTree

_function_

_since 1.6.0_

_Signature_

```ts
(tree: Tree<string>): string
```

_Description_

Neat 2-dimensional drawing of a tree

_Example_

```ts
const fa = new Tree('a', [
  new Tree('b', []),
  new Tree('c', []),
  new Tree('d', [new Tree('e', []), new Tree('f', [])])
])
console.log(drawTree(fa))
a
├─ b
├─ c
└─ d
   ├─ e
   └─ f
```

### getSetoid

_function_

_since 1.6.0_

_Signature_

```ts
<A>(S: Setoid<A>): Setoid<Tree<A>>
```

### unfoldForest

_function_

_since 1.6.0_

_Signature_

```ts
<A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A>
```

_Description_

Build a tree from a seed value

### unfoldForestM

_function_

_since 1.6.0_

_Signature_

```ts
unfoldForestM<M>(
  M: Monad<M>
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>>
```

_Description_

Monadic forest builder, in depth-first order

### unfoldTree

_function_

_since 1.6.0_

_Signature_

```ts
<A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A>
```

_Description_

Build a tree from a seed value

### unfoldTreeM

_function_

_since 1.6.0_

_Signature_

```ts
unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>>
```

_Description_

Monadic tree builder, in depth-first order
