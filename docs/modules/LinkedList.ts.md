---
title: LinkedList.ts
nav_order: 47
parent: Modules
---

# Overview

Adapted from https://github.com/purescript/purescript-lists

---

<h2 class="text-delta">Table of contents</h2>

- [LinkedList (type alias)](#linkedlist-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [linkedList (constant)](#linkedlist-constant)
- [nil (constant)](#nil-constant)
- [cons (function)](#cons-function)
- [foldMap (function)](#foldmap-function)
- [isCons (function)](#iscons-function)
- [isNil (function)](#isnil-function)
- [length (function)](#length-function)
- [map (function)](#map-function)
- [range (function)](#range-function)
- [reduce (function)](#reduce-function)
- [reduceRight (function)](#reduceright-function)
- [singleton (function)](#singleton-function)
- [snoc (function)](#snoc-function)
- [toArray (function)](#toarray-function)

---

# LinkedList (type alias)

**Signature**

```ts
export type LinkedList<A> = Nil | Cons<A>
```

Added in v2.1.1

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.1.1

# URI (constant)

**Signature**

```ts
export const URI: "LinkedList" = ...
```

Added in v2.1.1

# linkedList (constant)

**Signature**

```ts
export const linkedList: Functor1<URI> & Foldable1<URI> & Traversable1<URI> = ...
```

Added in v2.1.1

# nil (constant)

**Signature**

```ts
export const nil: Nil = ...
```

Added in v2.1.1

# cons (function)

**Signature**

```ts
export function cons<A>(head: A, tail: LinkedList<A>): LinkedList<A> { ... }
```

Added in v2.1.1

# foldMap (function)

**Signature**

```ts
export function foldMap<M>(M: Monoid<M>): <A>(f: (a: A) => M) => (fa: LinkedList<A>) => M { ... }
```

Added in v2.1.1

# isCons (function)

**Signature**

```ts
export function isCons<A>(a: LinkedList<A>): a is Cons<A> { ... }
```

Added in v2.1.1

# isNil (function)

**Signature**

```ts
export function isNil<A>(a: LinkedList<A>): a is Nil { ... }
```

Added in v2.1.1

# length (function)

Gets the length of a list.

**Signature**

```ts
export function length<A>(fa: LinkedList<A>): number { ... }
```

Added in v2.1.1

# map (function)

**Signature**

```ts
export function map<A, B>(f: (a: A) => B): (fa: LinkedList<A>) => LinkedList<B> { ... }
```

Added in v2.1.1

# range (function)

Create a list containing a range of integers, including both endpoints.

**Signature**

```ts
export function range(start: number, end: number): LinkedList<number> { ... }
```

Added in v2.1.1

# reduce (function)

**Signature**

```ts
export function reduce<A, B>(b: B, f: (b: B, a: A) => B): (fa: LinkedList<A>) => B { ... }
```

Added in v2.1.1

# reduceRight (function)

**Signature**

```ts
export function reduceRight<A, B>(b: B, f: (a: A, b: B) => B): (fa: LinkedList<A>) => B { ... }
```

Added in v2.1.1

# singleton (function)

Creates a list with a single element.

**Signature**

```ts
export function singleton<A>(head: A): LinkedList<A> { ... }
```

Added in v2.1.1

# snoc (function)

Appends an element to the end of a list, creating a new list.

**Signature**

```ts
export function snoc<A>(fa: LinkedList<A>, a: A): LinkedList<A> { ... }
```

Added in v2.1.1

# toArray (function)

Gets an array from a list.

**Signature**

```ts
export function toArray<A>(fa: LinkedList<A>): Array<A> { ... }
```

Added in v2.1.1
