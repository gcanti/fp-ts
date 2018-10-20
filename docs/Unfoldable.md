---
id: Unfoldable
title: Module Unfoldable
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Unfoldable.ts)

# Unfoldable

```ts
interface Unfoldable<F> {
  readonly URI: F
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => HKT<F, A>
}
```

Added in v1.0.0 (type class)

This class identifies data structures which can be _unfolded_, generalizing `unfoldr` on arrays.

## empty

```ts
empty<F, A>(U: Unfoldable<F>): HKT<F, A>
```

Added in v1.0.0 (function)

The container with no elements - unfolded with zero iterations.

_Example_

```ts
import { empty } from 'fp-ts/lib/Unfoldable'
import { array } from 'fp-ts/lib/Array'

assert.deepEqual(empty(array), [])
```

## replicate

```ts
replicate<F>(U: Unfoldable<F>): <A>(a: A, n: number) => HKT<F, A>
```

Added in v1.0.0 (function)

Replicate a value some natural number of times.

_Example_

```ts
import { replicate } from 'fp-ts/lib/Unfoldable'
import { array } from 'fp-ts/lib/Array'

assert.deepEqual(replicate(array)('s', 2), ['s', 's'])
```

## replicateA

```ts
replicateA<F, T>(
  F: Applicative<F>,
  UT: Unfoldable<T> & Traversable<T>
): <A>(n: number, ma: HKT<F, A>) => HKT<F, HKT<T, A>>
```

Added in v1.0.0 (function)

Perform an Applicative action `n` times, and accumulate all the results

_Example_

```ts
import { replicateA } from 'fp-ts/lib/Unfoldable'
import { array } from 'fp-ts/lib/Array'
import { option, some, none } from 'fp-ts/lib/Option'

assert.deepEqual(replicateA(option, array)(2, some(1)), some([1, 1]))
assert.deepEqual(replicateA(option, array)(2, none), none)
```

## singleton

```ts
singleton<F>(U: Unfoldable<F>): <A>(a: A) => HKT<F, A>
```

Added in v1.0.0 (function)

Contain a single value

_Example_

```ts
import { singleton } from 'fp-ts/lib/Unfoldable'
import { array } from 'fp-ts/lib/Array'

assert.deepEqual(singleton(array)(1), [1])
```
