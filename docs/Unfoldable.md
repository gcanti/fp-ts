---
id: Unfoldable
title: Module Unfoldable
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Unfoldable.ts)

# Unfoldable

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Unfoldable.ts#L13-L16)

```ts
export interface Unfoldable<F> {
  readonly URI: F
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => HKT<F, A>
}
```

This class identifies data structures which can be _unfolded_, generalizing `unfoldr` on arrays.

Added in v1.0.0

## empty

The container with no elements - unfolded with zero iterations.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Unfoldable.ts#L87-L89)

```ts
export function empty<F, A>(U: Unfoldable<F>): HKT<F, A>  { ... }
```

**Example**

```ts
import { empty } from 'fp-ts/lib/Unfoldable'
import { array } from 'fp-ts/lib/Array'

assert.deepEqual(empty(array), [])
```

Added in v1.0.0

## replicate

Replicate a value some natural number of times.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Unfoldable.ts#L63-L70)

```ts
export function replicate<F>(U: Unfoldable<F>): <A>(a: A, n: number) => HKT<F, A>  { ... }
```

**Example**

```ts
import { replicate } from 'fp-ts/lib/Unfoldable'
import { array } from 'fp-ts/lib/Array'

assert.deepEqual(replicate(array)('s', 2), ['s', 's'])
```

Added in v1.0.0

## replicateA

Perform an Applicative action `n` times, and accumulate all the results

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Unfoldable.ts#L146-L153)

```ts
export function replicateA<F, T>(
  F: Applicative<F>,
  UT: Unfoldable<T> & Traversable<T>
): <A>(n: number, ma: HKT<F, A>) => HKT<F, HKT<T, A>>  { ... }
```

**Example**

```ts
import { replicateA } from 'fp-ts/lib/Unfoldable'
import { array } from 'fp-ts/lib/Array'
import { option, some, none } from 'fp-ts/lib/Option'

assert.deepEqual(replicateA(option, array)(2, some(1)), some([1, 1]))
assert.deepEqual(replicateA(option, array)(2, none), none)
```

Added in v1.0.0

## singleton

Contain a single value

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Unfoldable.ts#L108-L111)

```ts
export function singleton<F>(U: Unfoldable<F>): <A>(a: A) => HKT<F, A>  { ... }
```

**Example**

```ts
import { singleton } from 'fp-ts/lib/Unfoldable'
import { array } from 'fp-ts/lib/Array'

assert.deepEqual(singleton(array)(1), [1])
```

Added in v1.0.0
