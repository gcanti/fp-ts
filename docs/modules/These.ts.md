---
title: These.ts
nav_order: 84
parent: Modules
---

# Overview

A data structure providing "inclusive-or" as opposed to `Either`'s "exclusive-or".

If you interpret `Either<L, A>` as suggesting the computation may either fail or succeed (exclusively), then
`These<L, A>` may fail, succeed, or do both at the same time.

There are a few ways to interpret the both case:

- You can think of a computation that has a non-fatal error.
- You can think of a computation that went as far as it could before erroring.
- You can think of a computation that keeps track of errors as it completes.

Another way you can think of `These<L, A>` is saying that we want to handle `L` kind of data, `A` kind of data, or
both `L` and `A` kind of data at the same time. This is particularly useful when it comes to displaying UI's.

(description adapted from https://package.elm-lang.org/packages/joneshf/elm-these)

Adapted from https://github.com/purescript-contrib/purescript-these

---

<h2 class="text-delta">Table of contents</h2>

- [Both (interface)](#both-interface)
- [These (type alias)](#these-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [these (constant)](#these-constant)
- [both (function)](#both-function)
- [fold (function)](#fold-function)
- [fromOptions (function)](#fromoptions-function)
- [getEq (function)](#geteq-function)
- [getLeft (function)](#getleft-function)
- [getLeftOnly (function)](#getleftonly-function)
- [getMonad (function)](#getmonad-function)
- [getRight (function)](#getright-function)
- [getRightOnly (function)](#getrightonly-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getShow (function)](#getshow-function)
- [isBoth (function)](#isboth-function)
- [isLeft (function)](#isleft-function)
- [isRight (function)](#isright-function)
- [left (function)](#left-function)
- [leftOrBoth (function)](#leftorboth-function)
- [right (function)](#right-function)
- [rightOrBoth (function)](#rightorboth-function)
- [toTuple (function)](#totuple-function)

---

# Both (interface)

**Signature**

```ts
export interface Both<L, A> {
  readonly _tag: 'Both'
  readonly left: L
  readonly right: A
}
```

Added in v2.0.0

# These (type alias)

**Signature**

```ts
export type These<L, A> = Either<L, A> | Both<L, A>
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

Added in v2.0.0

# these (constant)

**Signature**

```ts
export const these: Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI> = ...
```

Added in v2.0.0

# both (function)

**Signature**

```ts
export function both<L, A>(left: L, right: A): These<L, A> { ... }
```

Added in v2.0.0

# fold (function)

**Signature**

```ts
export function fold<L, A, R>(
  fa: These<L, A>,
  onLeft: (l: L) => R,
  onRight: (a: A) => R,
  onBoth: (l: L, a: A) => R
): R { ... }
```

Added in v2.0.0

# fromOptions (function)

Takes a pair of `Option`s and attempts to create a `These` from them

**Signature**

```ts
export function fromOptions<L, A>(fl: Option<L>, fa: Option<A>): Option<These<L, A>> { ... }
```

**Example**

```ts
import { fromOptions, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(fromOptions(none, none), none)
assert.deepStrictEqual(fromOptions(some('a'), none), some(left('a')))
assert.deepStrictEqual(fromOptions(none, some(1)), some(right(1)))
assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
```

Added in v2.0.0

# getEq (function)

**Signature**

```ts
export function getEq<L, A>(SL: Eq<L>, SA: Eq<A>): Eq<These<L, A>> { ... }
```

Added in v2.0.0

# getLeft (function)

Returns an `L` value if possible

**Signature**

```ts
export function getLeft<L, A>(fa: These<L, A>): Option<L> { ... }
```

**Example**

```ts
import { getLeft, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(getLeft(left('a')), some('a'))
assert.deepStrictEqual(getLeft(right(1)), none)
assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
```

Added in v2.0.0

# getLeftOnly (function)

Returns the `L` value if and only if the value is constructed with `Left`

**Signature**

```ts
export function getLeftOnly<L, A>(fa: These<L, A>): Option<L> { ... }
```

**Example**

```ts
import { getLeftOnly, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
assert.deepStrictEqual(getLeftOnly(right(1)), none)
assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
```

Added in v2.0.0

# getMonad (function)

**Signature**

```ts
export function getMonad<L>(S: Semigroup<L>): Monad2C<URI, L> { ... }
```

Added in v2.0.0

# getRight (function)

Returns an `A` value if possible

**Signature**

```ts
export function getRight<L, A>(fa: These<L, A>): Option<A> { ... }
```

**Example**

```ts
import { getRight, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(getRight(left('a')), none)
assert.deepStrictEqual(getRight(right(1)), some(1))
assert.deepStrictEqual(getRight(both('a', 1)), some(1))
```

Added in v2.0.0

# getRightOnly (function)

Returns the `A` value if and only if the value is constructed with `Right`

**Signature**

```ts
export function getRightOnly<L, A>(fa: These<L, A>): Option<A> { ... }
```

**Example**

```ts
import { getRightOnly, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(getRightOnly(left('a')), none)
assert.deepStrictEqual(getRightOnly(right(1)), some(1))
assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>> { ... }
```

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export function getShow<L, A>(SL: Show<L>, SA: Show<A>): Show<These<L, A>> { ... }
```

Added in v2.0.0

# isBoth (function)

Returns `true` if the these is an instance of `Both`, `false` otherwise

**Signature**

```ts
export function isBoth<L, A>(fa: These<L, A>): fa is Both<L, A> { ... }
```

Added in v2.0.0

# isLeft (function)

Returns `true` if the these is an instance of `Left`, `false` otherwise

**Signature**

```ts
export function isLeft<L, A>(fa: These<L, A>): fa is Left<L> { ... }
```

Added in v2.0.0

# isRight (function)

Returns `true` if the these is an instance of `Right`, `false` otherwise

**Signature**

```ts
export function isRight<L, A>(fa: These<L, A>): fa is Right<A> { ... }
```

Added in v2.0.0

# left (function)

**Signature**

```ts
export function left<L>(left: L): These<L, never> { ... }
```

Added in v2.0.0

# leftOrBoth (function)

**Signature**

```ts
export function leftOrBoth<L, A>(defaultLeft: L, ma: Option<A>): These<L, A> { ... }
```

**Example**

```ts
import { leftOrBoth, left, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(leftOrBoth('a', none), left('a'))
assert.deepStrictEqual(leftOrBoth('a', some(1)), both('a', 1))
```

Added in v2.0.0

# right (function)

**Signature**

```ts
export function right<A>(right: A): These<never, A> { ... }
```

Added in v2.0.0

# rightOrBoth (function)

**Signature**

```ts
export function rightOrBoth<L, A>(defaultRight: A, ml: Option<L>): These<L, A> { ... }
```

**Example**

```ts
import { rightOrBoth, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(rightOrBoth(1, none), right(1))
assert.deepStrictEqual(rightOrBoth(1, some('a')), both('a', 1))
```

Added in v2.0.0

# toTuple (function)

**Signature**

```ts
export function toTuple<L, A>(fa: These<L, A>, l: L, a: A): [L, A] { ... }
```

**Example**

```ts
import { toTuple, left, right, both } from 'fp-ts/lib/These'

assert.deepStrictEqual(toTuple(left('b'), 'a', 1), ['b', 1])
assert.deepStrictEqual(toTuple(right(2), 'a', 1), ['a', 2])
assert.deepStrictEqual(toTuple(both('b', 2), 'a', 1), ['b', 2])
```

Added in v2.0.0
