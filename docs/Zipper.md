---
id: Zipper
title: Module Zipper
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts)

## zipper

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L292-L304)

```ts
export const zipper: Applicative1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = { ... }
```

Added in v1.9.0

# Zipper

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L41-L179)

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

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L164-L166)

```ts
ap<B>(fab: Zipper<(a: A) => B>): Zipper<B>  { ... }
```

Added in v1.9.0

## deleteLeft

Deletes the element at focus and moves the focus to the left. If there is no element on the left,
focus is moved to the right.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L140-L143)

```ts
deleteLeft(): Option<Zipper<A>>  { ... }
```

Added in v1.9.0

## deleteRight

Deletes the element at focus and moves the focus to the right. If there is no element on the right,
focus is moved to the left.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L150-L154)

```ts
deleteRight(): Option<Zipper<A>>  { ... }
```

Added in v1.9.0

## down

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L95-L97)

```ts
down(): Option<Zipper<A>>  { ... }
```

Added in v1.9.0

## end

Moves focus to the end of the zipper.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L113-L120)

```ts
end(): Zipper<A>  { ... }
```

Added in v1.9.0

## insertLeft

Inserts an element to the left of focus and focuses on the new element.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L125-L127)

```ts
insertLeft(a: A): Zipper<A>  { ... }
```

Added in v1.9.0

## insertRight

Inserts an element to the right of focus and focuses on the new element.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L132-L134)

```ts
insertRight(a: A): Zipper<A>  { ... }
```

Added in v1.9.0

## inspect

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L173-L175)

```ts
inspect(): string  { ... }
```

Added in v1.9.0

## isOutOfBound

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L71-L73)

```ts
isOutOfBound(index: number): boolean  { ... }
```

Added in v1.9.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L158-L160)

```ts
map<B>(f: (a: A) => B): Zipper<B>  { ... }
```

Added in v1.9.0

## modify

Apply `f` to the focus and update with the result.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L59-L61)

```ts
modify(f: (a: A) => A): Zipper<A>  { ... }
```

Added in v1.9.0

## move

Moves focus in the zipper, or `None` if there is no such element.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L78-L85)

```ts
move(f: (currentIndex: number) => number): Option<Zipper<A>>  { ... }
```

Added in v1.9.0

## reduce

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L170-L172)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.9.0

## start

Moves focus to the start of the zipper.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L102-L108)

```ts
start(): Zipper<A>  { ... }
```

Added in v1.9.0

## toArray

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L65-L67)

```ts
toArray(): Array<A>  { ... }
```

Added in v1.9.0

## toString

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L176-L178)

```ts
toString(): string  { ... }
```

Added in v1.9.0

## up

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L89-L91)

```ts
up(): Option<Zipper<A>>  { ... }
```

Added in v1.9.0

## update

Update the focus in this zipper.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L52-L54)

```ts
update(a: A): Zipper<A>  { ... }
```

Added in v1.9.0

Added in v1.9.0

## fromArray

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L185-L191)

```ts
export const fromArray = <A>(as: Array<A>, focusIndex: number = 0): Option<Zipper<A>> => { ... }
```

Added in v1.9.0

## fromNonEmptyArray

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L197-L199)

```ts
export const fromNonEmptyArray = <A>(nea: NonEmptyArray<A>): Zipper<A> => { ... }
```

Added in v1.9.0

## getMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L281-L286)

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<Zipper<A>> => { ... }
```

Added in v1.9.0

## getSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Zipper.ts#L271-L275)

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Zipper<A>> => { ... }
```

Added in v1.9.0
