---
title: These.ts
nav_order: 84
parent: Modules
---

# These overview

A data structure providing "inclusive-or" as opposed to `Either`'s "exclusive-or".

If you interpret `Either<E, A>` as suggesting the computation may either fail or succeed (exclusively), then
`These<E, A>` may fail, succeed, or do both at the same time.

There are a few ways to interpret the both case:

- You can think of a computation that has a non-fatal error.
- You can think of a computation that went as far as it could before erroring.
- You can think of a computation that keeps track of errors as it completes.

Another way you can think of `These<E, A>` is saying that we want to handle `E` kind of data, `A` kind of data, or
both `E` and `A` kind of data at the same time. This is particularly useful when it comes to displaying UI's.

(description adapted from https://package.elm-lang.org/packages/joneshf/elm-these)

Adapted from https://github.com/purescript-contrib/purescript-these

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Both (interface)](#both-interface)
- [These (type alias)](#these-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [swap (constant)](#swap-constant)
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
- [bimap (export)](#bimap-export)
- [foldMap (export)](#foldmap-export)
- [map (export)](#map-export)
- [mapLeft (export)](#mapleft-export)
- [reduce (export)](#reduce-export)
- [reduceRight (export)](#reduceright-export)

---

# Both (interface)

**Signature**

```ts
export interface Both<E, A> {
  readonly _tag: 'Both'
  readonly left: E
  readonly right: A
}
```

Added in v2.0.0

# These (type alias)

**Signature**

```ts
export type These<E, A> = Either<E, A> | Both<E, A>
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
export const URI: "These" = ...
```

Added in v2.0.0

# swap (constant)

**Signature**

```ts
export const swap: <E, A>(fa: These<E, A>) => These<A, E> = ...
```

Added in v2.4.0

# these (constant)

**Signature**

```ts
export const these: Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI> = ...
```

Added in v2.0.0

# both (function)

**Signature**

```ts
export function both<E, A>(left: E, right: A): These<E, A> { ... }
```

Added in v2.0.0

# fold (function)

**Signature**

```ts
export function fold<E, A, B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
): (fa: These<E, A>) => B { ... }
```

Added in v2.0.0

# fromOptions (function)

Takes a pair of `Option`s and attempts to create a `These` from them

**Signature**

```ts
export function fromOptions<E, A>(fe: Option<E>, fa: Option<A>): Option<These<E, A>> { ... }
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
export function getEq<E, A>(EE: Eq<E>, EA: Eq<A>): Eq<These<E, A>> { ... }
```

Added in v2.0.0

# getLeft (function)

Returns an `E` value if possible

**Signature**

```ts
export function getLeft<E, A>(fa: These<E, A>): Option<E> { ... }
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

Returns the `E` value if and only if the value is constructed with `Left`

**Signature**

```ts
export function getLeftOnly<E, A>(fa: These<E, A>): Option<E> { ... }
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
export function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> { ... }
```

Added in v2.0.0

# getRight (function)

Returns an `A` value if possible

**Signature**

```ts
export function getRight<E, A>(fa: These<E, A>): Option<A> { ... }
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
export function getRightOnly<E, A>(fa: These<E, A>): Option<A> { ... }
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
export function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<These<E, A>> { ... }
```

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<These<E, A>> { ... }
```

Added in v2.0.0

# isBoth (function)

Returns `true` if the these is an instance of `Both`, `false` otherwise

**Signature**

```ts
export function isBoth<E, A>(fa: These<E, A>): fa is Both<E, A> { ... }
```

Added in v2.0.0

# isLeft (function)

Returns `true` if the these is an instance of `Left`, `false` otherwise

**Signature**

```ts
export function isLeft<E, A>(fa: These<E, A>): fa is Left<E> { ... }
```

Added in v2.0.0

# isRight (function)

Returns `true` if the these is an instance of `Right`, `false` otherwise

**Signature**

```ts
export function isRight<E, A>(fa: These<E, A>): fa is Right<A> { ... }
```

Added in v2.0.0

# left (function)

**Signature**

```ts
export function left<E = never, A = never>(left: E): These<E, A> { ... }
```

Added in v2.0.0

# leftOrBoth (function)

**Signature**

```ts
export function leftOrBoth<E>(e: E): <A>(ma: Option<A>) => These<E, A> { ... }
```

**Example**

```ts
import { leftOrBoth, left, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(leftOrBoth('a')(none), left('a'))
assert.deepStrictEqual(leftOrBoth('a')(some(1)), both('a', 1))
```

Added in v2.0.0

# right (function)

**Signature**

```ts
export function right<E = never, A = never>(right: A): These<E, A> { ... }
```

Added in v2.0.0

# rightOrBoth (function)

**Signature**

```ts
export function rightOrBoth<A>(a: A): <E>(me: Option<E>) => These<E, A> { ... }
```

**Example**

```ts
import { rightOrBoth, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(rightOrBoth(1)(none), right(1))
assert.deepStrictEqual(rightOrBoth(1)(some('a')), both('a', 1))
```

Added in v2.0.0

# toTuple (function)

**Signature**

```ts
export function toTuple<E, A>(e: E, a: A): (fa: These<E, A>) => [E, A] { ... }
```

**Example**

```ts
import { toTuple, left, right, both } from 'fp-ts/lib/These'

assert.deepStrictEqual(toTuple('a', 1)(left('b')), ['b', 1])
assert.deepStrictEqual(toTuple('a', 1)(right(2)), ['a', 2])
assert.deepStrictEqual(toTuple('a', 1)(both('b', 2)), ['b', 2])
```

Added in v2.0.0

# bimap (export)

**Signature**

```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: These<E, A>) => These<G, B>
```

Added in v2.0.0

# foldMap (export)

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: These<E, A>) => M
```

Added in v2.0.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: These<E, A>) => These<E, B>
```

Added in v2.0.0

# mapLeft (export)

**Signature**

```ts
<E, G>(f: (e: E) => G) => <A>(fa: These<E, A>) => These<G, A>
```

Added in v2.0.0

# reduce (export)

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: These<E, A>) => B
```

Added in v2.0.0

# reduceRight (export)

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: These<E, A>) => B
```

Added in v2.0.0
