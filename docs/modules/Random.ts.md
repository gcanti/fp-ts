---
title: Random.ts
nav_order: 69
parent: Modules
---

# Overview

Adapted from https://github.com/purescript/purescript-random

---

<h2 class="text-delta">Table of contents</h2>

- [random (constant)](#random-constant)
- [randomBool (constant)](#randombool-constant)
- [randomInt (function)](#randomint-function)
- [randomRange (function)](#randomrange-function)

---

# random (constant)

Returns a random number between 0 (inclusive) and 1 (exclusive). This is a direct wrapper around JavaScript's
`Math.random()`.

**Signature**

```ts
export const random: IO<number> = ...
```

Added in v1.0.0

# randomBool (constant)

Returns a random boolean value with an equal chance of being `true` or `false`

**Signature**

```ts
export const randomBool: IO<boolean> = ...
```

Added in v1.0.0

# randomInt (function)

Takes a range specified by `low` (the first argument) and `high` (the second), and returns a random integer uniformly
distributed in the closed interval `[low, high]`. It is unspecified what happens if `low > high`, or if either of
`low` or `high` is not an integer.

**Signature**

```ts
export const randomInt = (low: number, high: number): IO<number> => ...
```

Added in v1.0.0

# randomRange (function)

Returns a random number between a minimum value (inclusive) and a maximum value (exclusive). It is unspecified what
happens if `maximum < minimum`.

**Signature**

```ts
export const randomRange = (min: number, max: number): IO<number> => ...
```

Added in v1.0.0
