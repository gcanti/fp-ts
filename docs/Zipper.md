---
id: Zipper
title: Module Zipper
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts)

## Data

### Zipper

_data_

_since 1.9.0_

_Signature_

```ts
constructor(readonly lefts: Array<A>, readonly focus: A, readonly rights: Array<A>) {
    this.length = lefts.length + 1 + rights.length
  }
```

_Description_

Provides a pointed array, which is a non-empty zipper-like array structure that tracks an index (focus)
position in an array. Focus can be moved forward and backwards through the array.

_Example_

```ts
The array `[1, 2, 3, 4]` with focus on `3` is represented by `new Zipper([1, 2], 3, [4])`
```

## Methods

### ap

_method_

_since 1.9.0_

_Signature_

```ts
<B>(fab: Zipper<(a: A) => B>): Zipper<B>
```

### deleteLeft

_method_

_since 1.9.0_

_Signature_

```ts
(): Option<Zipper<A>>
```

_Description_

Deletes the element at focus and moves the focus to the left. If there is no element on the left,
focus is moved to the right.

### deleteRight

_method_

_since 1.9.0_

_Signature_

```ts
(): Option<Zipper<A>>
```

_Description_

Deletes the element at focus and moves the focus to the right. If there is no element on the right,
focus is moved to the left.

### down

_method_

_since 1.9.0_

_Signature_

```ts
(): Option<Zipper<A>>
```

### end

_method_

_since 1.9.0_

_Signature_

```ts
(): Zipper<A>
```

_Description_

Moves focus to the end of the zipper.

### insertLeft

_method_

_since 1.9.0_

_Signature_

```ts
(a: A): Zipper<A>
```

_Description_

Inserts an element to the left of focus and focuses on the new element.

### insertRight

_method_

_since 1.9.0_

_Signature_

```ts
(a: A): Zipper<A>
```

_Description_

Inserts an element to the right of focus and focuses on the new element.

### inspect

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

### isOutOfBound

_method_

_since 1.9.0_

_Signature_

```ts
(index: number): boolean
```

### map

_method_

_since 1.9.0_

_Signature_

```ts
<B>(f: (a: A) => B): Zipper<B>
```

### modify

_method_

_since 1.9.0_

_Signature_

```ts
(f: (a: A) => A): Zipper<A>
```

_Description_

Apply `f` to the focus and update with the result.

### move

_method_

_since 1.9.0_

_Signature_

```ts
(f: (currentIndex: number) => number): Option<Zipper<A>>
```

_Description_

Moves focus in the zipper, or `None` if there is no such element.

### reduce

_method_

_since 1.9.0_

_Signature_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### start

_method_

_since 1.9.0_

_Signature_

```ts
(): Zipper<A>
```

_Description_

Moves focus to the start of the zipper.

### toArray

_method_

_since 1.9.0_

_Signature_

```ts
(): Array<A>
```

### toString

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

### up

_method_

_since 1.9.0_

_Signature_

```ts
(): Option<Zipper<A>>
```

### update

_method_

_since 1.9.0_

_Signature_

```ts
(a: A): Zipper<A>
```

_Description_

Update the focus in this zipper.

## Instances

### zipper

_instance_

_since 1.9.0_

_Signature_

```ts
Applicative1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI>
```

## Functions

### fromArray

_function_

_since 1.9.0_

_Signature_

```ts
<A>(as: Array<A>, focusIndex: number = 0): Option<Zipper<A>>
```

### fromNonEmptyArray

_function_

_since 1.9.0_

_Signature_

```ts
<A>(nea: NonEmptyArray<A>): Zipper<A>
```

### getMonoid

_function_

_since 1.9.0_

_Signature_

```ts
<A>(M: Monoid<A>): Monoid<Zipper<A>>
```

### getSemigroup

_function_

_since 1.9.0_

_Signature_

```ts
<A>(S: Semigroup<A>): Semigroup<Zipper<A>>
```
