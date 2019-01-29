---
id: Random
title: Module Random
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Random.ts)

## random

Returns a random number between 0 (inclusive) and 1 (exclusive). This is a direct wrapper around JavaScript's
`Math.random()`.

**Signature** (constant)

```ts
export const random: IO<number> = ...
```

Added in v1.0.0

## randomBool

Returns a random boolean value with an equal chance of being `true` or `false`

**Signature** (constant)

```ts
export const randomBool: IO<boolean> = ...
```

Added in v1.0.0

## randomInt

Takes a range specified by `low` (the first argument) and `high` (the second), and returns a random integer uniformly
distributed in the closed interval `[low, high]`. It is unspecified what happens if `low > high`, or if either of
`low` or `high` is not an integer.

**Signature** (function)

```ts
export const randomInt = (low: number, high: number): IO<number> => { ... }
```

Added in v1.0.0

## randomRange

Returns a random number between a minimum value (inclusive) and a maximum value (exclusive). It is unspecified what
happens if `maximum < minimum`.

**Signature** (function)

```ts
export const randomRange = (min: number, max: number): IO<number> => { ... }
```

Added in v1.0.0
