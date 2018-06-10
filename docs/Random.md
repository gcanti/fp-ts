---
id: Random
title: Module Random
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Random.ts)

## Constants

### random

_constant_

_since 1.0.0_

_Signature_

```ts
random: IO<number>
```

_Description_

Returns a random number between 0 (inclusive) and 1 (exclusive). This is a direct wrapper around JavaScript's
`Math.random()`.

### randomBool

_constant_

_since 1.0.0_

_Signature_

```ts
randomBool: IO<boolean>
```

_Description_

Returns a random boolean value with an equal chance of being `true` or `false`

## Functions

### randomInt

_function_

_since 1.0.0_

_Signature_

```ts
(low: number, high: number): IO<number>
```

_Description_

Takes a range specified by `low` (the first argument) and `high` (the second), and returns a random integer uniformly
distributed in the closed interval `[low, high]`. It is unspecified what happens if `low > high`, or if either of
`low` or `high` is not an integer.

### randomRange

_function_

_since 1.0.0_

_Signature_

```ts
(min: number, max: number): IO<number>
```

_Description_

Returns a random number between a minimum value (inclusive) and a maximum value (exclusive). It is unspecified what
happens if `maximum < minimum`.
