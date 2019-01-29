---
id: Zipper
title: Module Zipper
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts)

## zipper

**Signature** (instance)

```ts
export const zipper: Applicative1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = { ... }
```

Added in v1.9.0

# Zipper

**Signature** (data type)

```ts
export class Zipper<A> {
  constructor(readonly lefts: Array<A>, readonly focus: A, readonly rights: Array<A>) {
    this.length = lefts.length + 1 + rights.length
  }
  ...
}
```

Provides a pointed array, which is a non-empty zipper-like array structure that tracks an index (focus)
position in an array. Focus can be moved forward and backwards through the array.

The array `[1, 2, 3, 4]` with focus on `3` is represented by `new Zipper([1, 2], 3, [4])`

## ap

**Signature** (method)

```ts
ap<B>(fab: Zipper<(a: A) => B>): Zipper<B>  { ... }
```

Added in v1.9.0

## deleteLeft

Deletes the element at focus and moves the focus to the left. If there is no element on the left,
focus is moved to the right.

**Signature** (method)

```ts
deleteLeft(): Option<Zipper<A>>  { ... }
```

Added in v1.9.0

## deleteRight

Deletes the element at focus and moves the focus to the right. If there is no element on the right,
focus is moved to the left.

**Signature** (method)

```ts
deleteRight(): Option<Zipper<A>>  { ... }
```

Added in v1.9.0

## down

**Signature** (method)

```ts
down(): Option<Zipper<A>>  { ... }
```

Added in v1.9.0

## end

Moves focus to the end of the zipper.

**Signature** (method)

```ts
end(): Zipper<A>  { ... }
```

Added in v1.9.0

## insertLeft

Inserts an element to the left of focus and focuses on the new element.

**Signature** (method)

```ts
insertLeft(a: A): Zipper<A>  { ... }
```

Added in v1.9.0

## insertRight

Inserts an element to the right of focus and focuses on the new element.

**Signature** (method)

```ts
insertRight(a: A): Zipper<A>  { ... }
```

Added in v1.9.0

## inspect

**Signature** (method)

```ts
inspect(): string  { ... }
```

Added in v1.9.0

## isOutOfBound

**Signature** (method)

```ts
isOutOfBound(index: number): boolean  { ... }
```

Added in v1.9.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Zipper<B>  { ... }
```

Added in v1.9.0

## modify

Apply `f` to the focus and update with the result.

**Signature** (method)

```ts
modify(f: (a: A) => A): Zipper<A>  { ... }
```

Added in v1.9.0

## move

Moves focus in the zipper, or `None` if there is no such element.

**Signature** (method)

```ts
move(f: (currentIndex: number) => number): Option<Zipper<A>>  { ... }
```

Added in v1.9.0

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.9.0

## start

Moves focus to the start of the zipper.

**Signature** (method)

```ts
start(): Zipper<A>  { ... }
```

Added in v1.9.0

## toArray

**Signature** (method)

```ts
toArray(): Array<A>  { ... }
```

Added in v1.9.0

## toString

**Signature** (method)

```ts
toString(): string  { ... }
```

Added in v1.9.0

## up

**Signature** (method)

```ts
up(): Option<Zipper<A>>  { ... }
```

Added in v1.9.0

## update

Update the focus in this zipper.

**Signature** (method)

```ts
update(a: A): Zipper<A>  { ... }
```

Added in v1.9.0

Added in v1.9.0

## fromArray

**Signature** (function)

```ts
export const fromArray = <A>(as: Array<A>, focusIndex: number = 0): Option<Zipper<A>> => { ... }
```

Added in v1.9.0

## fromNonEmptyArray

**Signature** (function)

```ts
export const fromNonEmptyArray = <A>(nea: NonEmptyArray<A>): Zipper<A> => { ... }
```

Added in v1.9.0

## getMonoid

**Signature** (function)

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<Zipper<A>> => { ... }
```

Added in v1.9.0

## getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Zipper<A>> => { ... }
```

Added in v1.9.0
