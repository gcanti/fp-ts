---
title: Zipper.ts
nav_order: 96
---

# Overview

Provides a pointed array, which is a non-empty zipper-like array structure that tracks an index (focus)
position in an array. Focus can be moved forward and backwards through the array.

The array `[1, 2, 3, 4]` with focus on `3` is represented by `new Zipper([1, 2], 3, [4])`

Adapted from

- https://github.com/DavidHarrison/purescript-list-zipper
- https://github.com/thunklife/purescript-zipper
- https://github.com/scalaz/scalaz/blob/series/7.3.x/core/src/main/scala/scalaz/Zipper.scala

**Table of contents**

- [URI (type alias)](#uri-type-alias)
- [Zipper (class)](#zipper-class)
  - [update (method)](#update-method)
  - [modify (method)](#modify-method)
  - [toArray (method)](#toarray-method)
  - [isOutOfBound (method)](#isoutofbound-method)
  - [move (method)](#move-method)
  - [up (method)](#up-method)
  - [down (method)](#down-method)
  - [start (method)](#start-method)
  - [end (method)](#end-method)
  - [insertLeft (method)](#insertleft-method)
  - [insertRight (method)](#insertright-method)
  - [deleteLeft (method)](#deleteleft-method)
  - [deleteRight (method)](#deleteright-method)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [reduce (method)](#reduce-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
- [URI (constant)](#uri-constant)
- [zipper (constant)](#zipper-constant)
- [fromArray (function)](#fromarray-function)
- [fromNonEmptyArray (function)](#fromnonemptyarray-function)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Zipper (class)

**Signature**

```ts
export class Zipper<A> {
  constructor(readonly lefts: Array<A>, readonly focus: A, readonly rights: Array<A>) { ... }
  ...
}
```

Added in v1.9.0

## update (method)

Update the focus in this zipper.

**Signature**

```ts
update(a: A): Zipper<A> { ... }
```

Added in v1.9.0

## modify (method)

Apply `f` to the focus and update with the result.

**Signature**

```ts
modify(f: (a: A) => A): Zipper<A> { ... }
```

Added in v1.9.0

## toArray (method)

**Signature**

```ts
toArray(): Array<A> { ... }
```

Added in v1.9.0

## isOutOfBound (method)

**Signature**

```ts
isOutOfBound(index: number): boolean { ... }
```

Added in v1.9.0

## move (method)

Moves focus in the zipper, or `None` if there is no such element.

**Signature**

```ts
move(f: (currentIndex: number) => number): Option<Zipper<A>> { ... }
```

Added in v1.9.0

## up (method)

**Signature**

```ts
up(): Option<Zipper<A>> { ... }
```

Added in v1.9.0

## down (method)

**Signature**

```ts
down(): Option<Zipper<A>> { ... }
```

Added in v1.9.0

## start (method)

Moves focus to the start of the zipper.

**Signature**

```ts
start(): Zipper<A> { ... }
```

Added in v1.9.0

## end (method)

Moves focus to the end of the zipper.

**Signature**

```ts
end(): Zipper<A> { ... }
```

Added in v1.9.0

## insertLeft (method)

Inserts an element to the left of focus and focuses on the new element.

**Signature**

```ts
insertLeft(a: A): Zipper<A> { ... }
```

Added in v1.9.0

## insertRight (method)

Inserts an element to the right of focus and focuses on the new element.

**Signature**

```ts
insertRight(a: A): Zipper<A> { ... }
```

Added in v1.9.0

## deleteLeft (method)

Deletes the element at focus and moves the focus to the left. If there is no element on the left,
focus is moved to the right.

**Signature**

```ts
deleteLeft(): Option<Zipper<A>> { ... }
```

Added in v1.9.0

## deleteRight (method)

Deletes the element at focus and moves the focus to the right. If there is no element on the right,
focus is moved to the left.

**Signature**

```ts
deleteRight(): Option<Zipper<A>> { ... }
```

Added in v1.9.0

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Zipper<B> { ... }
```

Added in v1.9.0

## ap (method)

**Signature**

```ts
ap<B>(fab: Zipper<(a: A) => B>): Zipper<B> { ... }
```

Added in v1.9.0

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

Added in v1.9.0

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# zipper (constant)

**Signature**

```ts
export const zipper: Applicative1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = ...
```

Added in v1.9.0

# fromArray (function)

**Signature**

```ts
export const fromArray = <A>(as: Array<A>, focusIndex: number = 0): Option<Zipper<A>> => ...
```

Added in v1.9.0

# fromNonEmptyArray (function)

**Signature**

```ts
export const fromNonEmptyArray = <A>(nea: NonEmptyArray<A>): Zipper<A> => ...
```

Added in v1.9.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<Zipper<A>> => ...
```

Added in v1.9.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Zipper<A>> => ...
```

Added in v1.9.0
