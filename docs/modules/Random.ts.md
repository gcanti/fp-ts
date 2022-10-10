---
title: Random.ts
nav_order: 53
parent: Modules
---

## Random overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [random](#random)
  - [randomBool](#randombool)
  - [randomElem](#randomelem)
  - [randomInt](#randomint)
  - [randomRange](#randomrange)

---

# utils

## random

Returns a random number between 0 (inclusive) and 1 (exclusive). This is a direct wrapper around JavaScript's
`Math.random()`.

**Signature**

```ts
export declare const random: sync.Sync<number>
```

Added in v3.0.0

## randomBool

Returns a random boolean value with an equal chance of being `true` or `false`

**Signature**

```ts
export declare const randomBool: sync.Sync<boolean>
```

Added in v3.0.0

## randomElem

Returns a random element of a `NonEmptyReadonlyArray`.

**Signature**

```ts
export declare const randomElem: <A>(as: readonly [A, ...A[]]) => sync.Sync<A>
```

Added in v3.0.0

## randomInt

Takes a range specified by `low` (the first argument) and `high` (the second), and returns a random integer uniformly
distributed in the closed interval `[low, high]`. It is unspecified what happens if `low > high`, or if either of
`low` or `high` is not an integer.

**Signature**

```ts
export declare const randomInt: (low: number, high: number) => Sync<number>
```

Added in v3.0.0

## randomRange

Returns a random number between a minimum value (inclusive) and a maximum value (exclusive). It is unspecified what
happens if `maximum < minimum`.

**Signature**

```ts
export declare const randomRange: (min: number, max: number) => Sync<number>
```

Added in v3.0.0
