---
id: Zipper
title: Module Zipper
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts)

# Zipper

```ts
constructor(readonly lefts: Array<A>, readonly focus: A, readonly rights: Array<A>) {
    this.length = lefts.length + 1 + rights.length
  }
```

Added in v1.9.0 (data)

Provides a pointed array, which is a non-empty zipper-like array structure that tracks an index (focus)
position in an array. Focus can be moved forward and backwards through the array.

The array `[1, 2, 3, 4]` with focus on `3` is represented by `new Zipper([1, 2], 3, [4])`

## ap

```ts
<B>(fab: Zipper<(a: A) => B>): Zipper<B>
```

Added in v1.9.0 (method)

## deleteLeft

```ts
(): Option<Zipper<A>>
```

Added in v1.9.0 (method)

Deletes the element at focus and moves the focus to the left. If there is no element on the left,
focus is moved to the right.

## deleteRight

```ts
(): Option<Zipper<A>>
```

Added in v1.9.0 (method)

Deletes the element at focus and moves the focus to the right. If there is no element on the right,
focus is moved to the left.

## down

```ts
(): Option<Zipper<A>>
```

Added in v1.9.0 (method)

## end

```ts
(): Zipper<A>
```

Added in v1.9.0 (method)

Moves focus to the end of the zipper.

## insertLeft

```ts
(a: A): Zipper<A>
```

Added in v1.9.0 (method)

Inserts an element to the left of focus and focuses on the new element.

## insertRight

```ts
(a: A): Zipper<A>
```

Added in v1.9.0 (method)

Inserts an element to the right of focus and focuses on the new element.

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

## isOutOfBound

```ts
(index: number): boolean
```

Added in v1.9.0 (method)

## map

```ts
<B>(f: (a: A) => B): Zipper<B>
```

Added in v1.9.0 (method)

## modify

```ts
(f: (a: A) => A): Zipper<A>
```

Added in v1.9.0 (method)

Apply `f` to the focus and update with the result.

## move

```ts
(f: (currentIndex: number) => number): Option<Zipper<A>>
```

Added in v1.9.0 (method)

Moves focus in the zipper, or `None` if there is no such element.

## reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

Added in v1.9.0 (method)

## start

```ts
(): Zipper<A>
```

Added in v1.9.0 (method)

Moves focus to the start of the zipper.

## toArray

```ts
(): Array<A>
```

Added in v1.9.0 (method)

## toString

```ts
(): string
```

Added in v1.0.0 (method)

## up

```ts
(): Option<Zipper<A>>
```

Added in v1.9.0 (method)

## update

```ts
(a: A): Zipper<A>
```

Added in v1.9.0 (method)

Update the focus in this zipper.

## zipper

```ts
Applicative1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI>
```

Added in v1.9.0 (instance)

## fromArray

```ts
<A>(as: Array<A>, focusIndex: number = 0): Option<Zipper<A>>
```

Added in v1.9.0 (function)

## fromNonEmptyArray

```ts
<A>(nea: NonEmptyArray<A>): Zipper<A>
```

Added in v1.9.0 (function)

## getMonoid

```ts
<A>(M: Monoid<A>): Monoid<Zipper<A>>
```

Added in v1.9.0 (function)

## getSemigroup

```ts
<A>(S: Semigroup<A>): Semigroup<Zipper<A>>
```

Added in v1.9.0 (function)
