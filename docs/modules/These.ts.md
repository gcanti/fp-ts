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
- [Left (interface)](#left-interface)
- [Right (interface)](#right-interface)
- [These (type alias)](#these-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [these (constant)](#these-constant)
- [both (function)](#both-function)
- [fold (function)](#fold-function)
- [fromEither (function)](#fromeither-function)
- [fromOptions (function)](#fromoptions-function)
- [getLeft (function)](#getleft-function)
- [getLeftOnly (function)](#getleftonly-function)
- [getMonad (function)](#getmonad-function)
- [getRight (function)](#getright-function)
- [getRightOnly (function)](#getrightonly-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getSetoid (function)](#getsetoid-function)
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

# Left (interface)

**Signature**

```ts
export interface Left<L> {
  readonly _tag: 'Left'
  readonly left: L
}
```

# Right (interface)

**Signature**

```ts
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}
```

# These (type alias)

**Signature**

```ts
export type These<L, A> = Left<L> | Right<A> | Both<L, A>
```

Added in v1.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# these (constant)

**Signature**

```ts
export const these: Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI> = ...
```

Added in v1.0.0

# both (function)

**Signature**

```ts
export const both = <L, A>(left: L, right: A): These<L, A> => ...
```

Added in v1.0.0

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

# fromEither (function)

**Signature**

```ts
export const fromEither = <L, A>(fa: Either<L, A>): These<L, A> => ...
```

**Example**

```ts
import { fromEither, left, right } from 'fp-ts/lib/These'
import * as E from 'fp-ts/lib/Either'

assert.deepStrictEqual(fromEither(E.left('a')), left('a'))
assert.deepStrictEqual(fromEither(E.right(1)), right(1))
```

Added in v1.13.0

# fromOptions (function)

Takes a pair of `Option`s and attempts to create a `These` from them

**Signature**

```ts
export const fromOptions = <L, A>(fl: O.Option<L>, fa: O.Option<A>): O.Option<These<L, A>> => ...
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

Added in v1.13.0

# getLeft (function)

Returns an `L` value if possible

**Signature**

```ts
export const getLeft = <L, A>(fa: These<L, A>): O.Option<L> => ...
```

**Example**

```ts
import { getLeft, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(getLeft(left('a')), some('a'))
assert.deepStrictEqual(getLeft(right(1)), none)
assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
```

Added in v1.0.0

# getLeftOnly (function)

Returns the `L` value if and only if the value is constructed with `Left`

**Signature**

```ts
export const getLeftOnly = <L, A>(fa: These<L, A>): O.Option<L> => ...
```

**Example**

```ts
import { getLeftOnly, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
assert.deepStrictEqual(getLeftOnly(right(1)), none)
assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
```

Added in v1.13.0

# getMonad (function)

**Signature**

```ts
export const getMonad = <L>(S: Semigroup<L>): Monad2C<URI, L> => ...
```

Added in v1.0.0

# getRight (function)

Returns an `A` value if possible

**Signature**

```ts
export const getRight = <L, A>(fa: These<L, A>): O.Option<A> => ...
```

**Example**

```ts
import { getRight, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(getRight(left('a')), none)
assert.deepStrictEqual(getRight(right(1)), some(1))
assert.deepStrictEqual(getRight(both('a', 1)), some(1))
```

Added in v1.0.0

# getRightOnly (function)

Returns the `A` value if and only if the value is constructed with `Right`

**Signature**

```ts
export const getRightOnly = <L, A>(fa: These<L, A>): O.Option<A> => ...
```

**Example**

```ts
import { getRightOnly, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(getRightOnly(left('a')), none)
assert.deepStrictEqual(getRightOnly(right(1)), some(1))
assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
```

Added in v1.13.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>> => ...
```

Added in v1.0.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>> => ...
```

Added in v1.0.0

# getShow (function)

**Signature**

```ts
export const getShow = <L, A>(SL: Show<L>, SA: Show<A>): Show<These<L, A>> => ...
```

Added in v1.17.0

# isBoth (function)

Returns `true` if the these is an instance of `Both`, `false` otherwise

**Signature**

```ts
export const isBoth = <L, A>(fa: These<L, A>): fa is Both<L, A> => ...
```

Added in v1.0.0

# isLeft (function)

Returns `true` if the these is an instance of `Left`, `false` otherwise

**Signature**

```ts
export const isLeft = <L, A>(fa: These<L, A>): fa is Left<L> => ...
```

Added in v1.0.0

# isRight (function)

Returns `true` if the these is an instance of `Right`, `false` otherwise

**Signature**

```ts
export const isRight = <L, A>(fa: These<L, A>): fa is Right<A> => ...
```

Added in v1.0.0

# left (function)

**Signature**

```ts
export const left = <L>(left: L): These<L, never> => ...
```

Added in v1.0.0

# leftOrBoth (function)

**Signature**

```ts
export const leftOrBoth = <L, A>(defaultLeft: L, ma: O.Option<A>): These<L, A> => ...
```

**Example**

```ts
import { leftOrBoth, left, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(leftOrBoth('a', none), left('a'))
assert.deepStrictEqual(leftOrBoth('a', some(1)), both('a', 1))
```

Added in v1.13.0

# right (function)

**Signature**

```ts
export const right = <A>(right: A): These<never, A> => ...
```

Added in v1.0.0

# rightOrBoth (function)

**Signature**

```ts
export const rightOrBoth = <L, A>(defaultRight: A, ml: O.Option<L>): These<L, A> => ...
```

**Example**

```ts
import { rightOrBoth, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(rightOrBoth(1, none), right(1))
assert.deepStrictEqual(rightOrBoth(1, some('a')), both('a', 1))
```

Added in v1.13.0

# toTuple (function)

**Signature**

```ts
export const toTuple = <L, A>(defaultLeft: L, defaultRight: A) => (fa: These<L, A>): [L, A] => ...
```

**Example**

```ts
import { toTuple, left, right, both } from 'fp-ts/lib/These'

const to = toTuple('a', 1)
assert.deepStrictEqual(to(left('b')), ['b', 1])
assert.deepStrictEqual(to(right(2)), ['a', 2])
assert.deepStrictEqual(to(both('b', 2)), ['b', 2])
```

Added in v1.0.0
