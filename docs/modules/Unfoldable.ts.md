---
title: Unfoldable.ts
nav_order: 98
parent: Modules
---

# Overview

This class identifies data structures which can be _unfolded_, generalizing `unfoldr` on arrays.

---

<h2 class="text-delta">Table of contents</h2>

- [Unfoldable (interface)](#unfoldable-interface)
- [Unfoldable1 (interface)](#unfoldable1-interface)
- [Unfoldable2 (interface)](#unfoldable2-interface)
- [Unfoldable2C (interface)](#unfoldable2c-interface)
- [Unfoldable3 (interface)](#unfoldable3-interface)
- [Unfoldable3C (interface)](#unfoldable3c-interface)
- [empty (function)](#empty-function)
- [replicate (function)](#replicate-function)
- [replicateA (function)](#replicatea-function)
- [singleton (function)](#singleton-function)

---

# Unfoldable (interface)

**Signature**

```ts
export interface Unfoldable<F> {
  readonly URI: F
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => HKT<F, A>
}
```

Added in v1.0.0

# Unfoldable1 (interface)

**Signature**

```ts
export interface Unfoldable1<F extends URIS> {
  readonly URI: F
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind<F, A>
}
```

# Unfoldable2 (interface)

**Signature**

```ts
export interface Unfoldable2<F extends URIS2> {
  readonly URI: F
  readonly unfoldr: <L, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind2<F, L, A>
}
```

# Unfoldable2C (interface)

**Signature**

```ts
export interface Unfoldable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind2<F, L, A>
}
```

# Unfoldable3 (interface)

**Signature**

```ts
export interface Unfoldable3<F extends URIS3> {
  readonly URI: F
  readonly unfoldr: <U, L, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind3<F, U, L, A>
}
```

# Unfoldable3C (interface)

**Signature**

```ts
export interface Unfoldable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind3<F, U, L, A>
}
```

# empty (function)

The container with no elements - unfolded with zero iterations.

**Signature**

```ts
export function empty<F extends URIS3, U, L, A>(U: Unfoldable3<F> | Unfoldable3C<F, U, L>): Kind3<F, U, L, A>
export function empty<F extends URIS2, L, A>(U: Unfoldable2<F> | Unfoldable2C<F, L>): Kind2<F, L, A>
export function empty<F extends URIS, A>(U: Unfoldable1<F>): Kind<F, A>
export function empty<F, A>(U: Unfoldable<F>): HKT<F, A> { ... }
```

**Example**

```ts
import { empty } from 'fp-ts/lib/Unfoldable'
import { array } from 'fp-ts/lib/Array'

assert.deepStrictEqual(empty(array), [])
```

Added in v1.0.0

# replicate (function)

Replicate a value some natural number of times.

**Signature**

```ts
export function replicate<F extends URIS3>(U: Unfoldable3<F>): <U, L, A>(a: A, n: number) => Kind3<F, U, L, A>
export function replicate<F extends URIS3, U, L>(U: Unfoldable3C<F, U, L>): <A>(a: A, n: number) => Kind3<F, U, L, A>
export function replicate<F extends URIS2>(U: Unfoldable2<F>): <L, A>(a: A, n: number) => Kind2<F, L, A>
export function replicate<F extends URIS2, L>(U: Unfoldable2C<F, L>): <A>(a: A, n: number) => Kind2<F, L, A>
export function replicate<F extends URIS>(U: Unfoldable1<F>): <A>(a: A, n: number) => Kind<F, A>
export function replicate<F>(U: Unfoldable<F>): <A>(a: A, n: number) => HKT<F, A> { ... }
```

**Example**

```ts
import { replicate } from 'fp-ts/lib/Unfoldable'
import { array } from 'fp-ts/lib/Array'

assert.deepStrictEqual(replicate(array)('s', 2), ['s', 's'])
```

Added in v1.0.0

# replicateA (function)

Perform an Applicative action `n` times, and accumulate all the results

**Signature**

```ts
export function replicateA<F extends URIS3, T extends URIS>(
  A: Applicative3<F>,
  UT: Unfoldable1<T> & Traversable1<T>
): <U, L, A>(n: number, ma: Kind3<F, U, L, A>) => Kind3<F, U, L, Kind<T, A>>
export function replicateA<F extends URIS3, T extends URIS, U, L>(
  A: Applicative3C<F, U, L>,
  UT: Unfoldable1<T> & Traversable1<T>
): <A>(n: number, ma: Kind3<F, U, L, A>) => Kind3<F, U, L, Kind<T, A>>
export function replicateA<F extends URIS2, T extends URIS>(
  A: Applicative2<F>,
  UT: Unfoldable1<T> & Traversable1<T>
): <L, A>(n: number, ma: Kind2<F, L, A>) => Kind2<F, L, Kind<T, A>>
export function replicateA<F extends URIS2, T extends URIS, L>(
  A: Applicative2C<F, L>,
  UT: Unfoldable1<T> & Traversable1<T>
): <A>(n: number, ma: Kind2<F, L, A>) => Kind2<F, L, Kind<T, A>>
export function replicateA<F extends URIS, T extends URIS>(
  F: Applicative1<F>,
  UT: Unfoldable1<T> & Traversable1<T>
): <A>(n: number, ma: Kind<F, A>) => Kind<F, Kind<T, A>> { ... }
```

**Example**

```ts
import { replicateA } from 'fp-ts/lib/Unfoldable'
import { array } from 'fp-ts/lib/Array'
import { option, some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(replicateA(option, array)(2, some(1)), some([1, 1]))
assert.deepStrictEqual(replicateA(option, array)(2, none), none)
```

Added in v1.0.0

# singleton (function)

Contain a single value

**Signature**

```ts
export function singleton<F extends URIS3>(U: Unfoldable3<F>): <U, L, A>(a: A) => Kind3<F, U, L, A>
export function singleton<F extends URIS3, U, L>(U: Unfoldable3C<F, U, L>): <A>(a: A) => Kind3<F, U, L, A>
export function singleton<F extends URIS2>(U: Unfoldable2<F>): <L, A>(a: A) => Kind2<F, L, A>
export function singleton<F extends URIS2, L>(U: Unfoldable2C<F, L>): <A>(a: A) => Kind2<F, L, A>
export function singleton<F extends URIS>(U: Unfoldable1<F>): <A>(a: A) => Kind<F, A>
export function singleton<F>(U: Unfoldable<F>): <A>(a: A) => HKT<F, A> { ... }
```

**Example**

```ts
import { singleton } from 'fp-ts/lib/Unfoldable'
import { array } from 'fp-ts/lib/Array'

assert.deepStrictEqual(singleton(array)(1), [1])
```

Added in v1.0.0
