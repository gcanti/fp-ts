---
title: These.ts
nav_order: 90
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

- [These (type alias)](#these-type-alias)
- [URI (type alias)](#uri-type-alias)
- [Both (class)](#both-class)
  - [map (method)](#map-method)
  - [bimap (method)](#bimap-method)
  - [reduce (method)](#reduce-method)
  - [fold (method)](#fold-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
  - [isThis (method)](#isthis-method)
  - [isThat (method)](#isthat-method)
  - [isBoth (method)](#isboth-method)
- [That (class)](#that-class)
  - [map (method)](#map-method-1)
  - [bimap (method)](#bimap-method-1)
  - [reduce (method)](#reduce-method-1)
  - [fold (method)](#fold-method-1)
  - [inspect (method)](#inspect-method-1)
  - [toString (method)](#tostring-method-1)
  - [isThis (method)](#isthis-method-1)
  - [isThat (method)](#isthat-method-1)
  - [isBoth (method)](#isboth-method-1)
- [This (class)](#this-class)
  - [map (method)](#map-method-2)
  - [bimap (method)](#bimap-method-2)
  - [reduce (method)](#reduce-method-2)
  - [fold (method)](#fold-method-2)
  - [inspect (method)](#inspect-method-2)
  - [toString (method)](#tostring-method-2)
  - [isThis (method)](#isthis-method-2)
  - [isThat (method)](#isthat-method-2)
  - [isBoth (method)](#isboth-method-2)
- [URI (constant)](#uri-constant)
- [getLeft (constant)](#getleft-constant)
- [getLeftOnly (constant)](#getleftonly-constant)
- [getRight (constant)](#getright-constant)
- [getRightOnly (constant)](#getrightonly-constant)
- [~~getSetoid~~ (constant)](#getsetoid-constant)
- [isLeft (constant)](#isleft-constant)
- [isRight (constant)](#isright-constant)
- [left (constant)](#left-constant)
- [right (constant)](#right-constant)
- [these (constant)](#these-constant)
- [toTuple (constant)](#totuple-constant)
- [both (function)](#both-function)
- [fold (function)](#fold-function)
- [fromEither (function)](#fromeither-function)
- [fromOptions (function)](#fromoptions-function)
- [~~fromThese~~ (function)](#fromthese-function)
- [getEq (function)](#geteq-function)
- [getMonad (function)](#getmonad-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getShow (function)](#getshow-function)
- [isBoth (function)](#isboth-function)
- [~~isThat~~ (function)](#isthat-function)
- [~~isThis~~ (function)](#isthis-function)
- [leftOrBoth (function)](#leftorboth-function)
- [rightOrBoth (function)](#rightorboth-function)
- [~~that~~ (function)](#that-function)
- [~~thatOrBoth~~ (function)](#thatorboth-function)
- [~~theseLeft~~ (function)](#theseleft-function)
- [~~theseRight~~ (function)](#theseright-function)
- [~~theseThat~~ (function)](#thesethat-function)
- [~~theseThis~~ (function)](#thesethis-function)
- [~~thisOrBoth~~ (function)](#thisorboth-function)
- [~~this\_~~ (function)](#this_-function)

---

# These (type alias)

**Signature**

```ts
export type These<L, A> = This<L, A> | That<L, A> | Both<L, A>
```

Added in v1.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Both (class)

**Signature**

```ts
export class Both<L, A> {
  constructor(readonly l: L, readonly a: A) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): These<L, B> { ... }
```

## bimap (method)

**Signature**

```ts
bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## fold (method)

**Signature**

```ts
fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B, onBoth: (l: L, a: A) => B): B { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

## isThis (method)

**Signature**

```ts
isThis(): this is This<L, A> { ... }
```

## isThat (method)

**Signature**

```ts
isThat(): this is That<L, A> { ... }
```

## isBoth (method)

**Signature**

```ts
isBoth(): this is Both<L, A> { ... }
```

# That (class)

**Signature**

```ts
export class That<L, A> {
  constructor(readonly value: A) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): These<L, B> { ... }
```

## bimap (method)

**Signature**

```ts
bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## fold (method)

**Signature**

```ts
fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B, onBoth: (l: L, a: A) => B): B { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

## isThis (method)

**Signature**

```ts
isThis(): this is This<L, A> { ... }
```

## isThat (method)

**Signature**

```ts
isThat(): this is That<L, A> { ... }
```

## isBoth (method)

**Signature**

```ts
isBoth(): this is Both<L, A> { ... }
```

# This (class)

**Signature**

```ts
export class This<L, A> {
  constructor(readonly value: L) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): These<L, B> { ... }
```

## bimap (method)

**Signature**

```ts
bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## fold (method)

Applies a function to each case in the data structure

**Signature**

```ts
fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B, onBoth: (l: L, a: A) => B): B { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

## isThis (method)

Returns `true` if the these is `This`, `false` otherwise

**Signature**

```ts
isThis(): this is This<L, A> { ... }
```

## isThat (method)

Returns `true` if the these is `That`, `false` otherwise

**Signature**

```ts
isThat(): this is That<L, A> { ... }
```

## isBoth (method)

Returns `true` if the these is `Both`, `false` otherwise

**Signature**

```ts
isBoth(): this is Both<L, A> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# getLeft (constant)

Returns an `L` value if possible

**Signature**

```ts
export const getLeft: <E, A>(fa: These<E, A>) => Option<E> = ...
```

**Example**

```ts
import { getLeft, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(getLeft(left('a')), some('a'))
assert.deepStrictEqual(getLeft(right(1)), none)
assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
```

Added in v1.19.0

# getLeftOnly (constant)

Returns the `L` value if and only if the value is constructed with `Left`

**Signature**

```ts
export const getLeftOnly: <E, A>(fa: These<E, A>) => Option<E> = ...
```

**Example**

```ts
import { getLeftOnly, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
assert.deepStrictEqual(getLeftOnly(right(1)), none)
assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
```

Added in v1.19.0

# getRight (constant)

Returns an `A` value if possible

**Signature**

```ts
export const getRight: <E, A>(fa: These<E, A>) => Option<A> = ...
```

**Example**

```ts
import { getRight, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(getRight(left('a')), none)
assert.deepStrictEqual(getRight(right(1)), some(1))
assert.deepStrictEqual(getRight(both('a', 1)), some(1))
```

Added in v1.19.0

# getRightOnly (constant)

Returns the `A` value if and only if the value is constructed with `Right`

**Signature**

```ts
export const getRightOnly: <E, A>(fa: These<E, A>) => Option<A> = ...
```

**Example**

```ts
import { getRightOnly, left, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(getRightOnly(left('a')), none)
assert.deepStrictEqual(getRightOnly(right(1)), some(1))
assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
```

Added in v1.19.0

# ~~getSetoid~~ (constant)

Use `getEq`

**Signature**

```ts
export const getSetoid: <L, A>(EL: Eq<L>, EA: Eq<A>) => Eq<These<L, A>> = ...
```

Added in v1.0.0

# isLeft (constant)

Returns `true` if the these is an instance of `Left`, `false` otherwise

**Signature**

```ts
export const isLeft: <E, A>(fa: These<E, A>) => fa is This<E, A> = ...
```

Added in v1.19.0

# isRight (constant)

Returns `true` if the these is an instance of `Right`, `false` otherwise

**Signature**

```ts
export const isRight: <E, A>(fa: These<E, A>) => fa is That<E, A> = ...
```

Added in v1.19.0

# left (constant)

**Signature**

```ts
export const left: <E>(left: E) => These<E, never> = ...
```

Added in v1.19.0

# right (constant)

**Signature**

```ts
export const right: <A>(right: A) => These<never, A> = ...
```

Added in v1.19.0

# these (constant)

**Signature**

```ts
export const these: Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = ...
```

Added in v1.0.0

# toTuple (constant)

**Signature**

```ts
export const toTuple: <E, A>(e: E, a: A) => (fa: These<E, A>) => [E, A] = ...
```

**Example**

```ts
import { toTuple, left, right, both } from 'fp-ts/lib/These'

assert.deepStrictEqual(toTuple('a', 1)(left('b')), ['b', 1])
assert.deepStrictEqual(toTuple('a', 1)(right(2)), ['a', 2])
assert.deepStrictEqual(toTuple('a', 1)(both('b', 2)), ['b', 2])
```

Added in v1.19.0

# both (function)

**Signature**

```ts
export const both = <L, A>(l: L, a: A): These<L, A> => ...
```

Added in v1.0.0

# fold (function)

**Signature**

```ts
export function fold<E, A, R>(
  onLeft: (e: E) => R,
  onRight: (a: A) => R,
  onBoth: (e: E, a: A) => R
): (fa: These<E, A>) => R { ... }
```

Added in v1.19.0

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
export const fromOptions = <L, A>(fl: Option<L>, fa: Option<A>): Option<These<L, A>> => ...
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

# ~~fromThese~~ (function)

Use `toTuple`

**Signature**

```ts
export const fromThese = <L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A] => ...
```

Added in v1.0.0

# getEq (function)

**Signature**

```ts
export function getEq<L, A>(EL: Eq<L>, EA: Eq<A>): Eq<These<L, A>> { ... }
```

Added in v1.19.0

# getMonad (function)

**Signature**

```ts
export const getMonad = <L>(S: Semigroup<L>): Monad2C<URI, L> => ...
```

Added in v1.0.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>> => ...
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

# ~~isThat~~ (function)

Use `isRight`

**Signature**

```ts
export const isThat = <L, A>(fa: These<L, A>): fa is That<L, A> => ...
```

Added in v1.0.0

# ~~isThis~~ (function)

Use `isLeft`

**Signature**

```ts
export const isThis = <L, A>(fa: These<L, A>): fa is This<L, A> => ...
```

Added in v1.0.0

# leftOrBoth (function)

**Signature**

```ts
export function leftOrBoth<E>(defaultLeft: E): <A>(ma: Option<A>) => These<E, A> { ... }
```

**Example**

```ts
import { leftOrBoth, left, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(leftOrBoth('a')(none), left('a'))
assert.deepStrictEqual(leftOrBoth('a')(some(1)), both('a', 1))
```

Added in v1.19.0

# rightOrBoth (function)

**Signature**

```ts
export function rightOrBoth<A>(defaultRight: A): <E>(me: Option<E>) => These<E, A> { ... }
```

**Example**

```ts
import { rightOrBoth, right, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(rightOrBoth(1)(none), right(1))
assert.deepStrictEqual(rightOrBoth(1)(some('a')), both('a', 1))
```

Added in v1.19.0

# ~~that~~ (function)

Use `right`

**Signature**

```ts
export const that = <L, A>(a: A): These<L, A> => ...
```

Added in v1.0.0

# ~~thatOrBoth~~ (function)

Use `rightOrBoth`

**Signature**

```ts
export const thatOrBoth = <L, A>(defaultThat: A, ml: Option<L>): These<L, A> => ...
```

Added in v1.13.0

# ~~theseLeft~~ (function)

Use `getLeft`

**Signature**

```ts
export const theseLeft = <L, A>(fa: These<L, A>): Option<L> => ...
```

Added in v1.0.0

# ~~theseRight~~ (function)

Use `getRight`

**Signature**

```ts
export const theseRight = <L, A>(fa: These<L, A>): Option<A> => ...
```

Added in v1.0.0

# ~~theseThat~~ (function)

Use `getRightOnly`

**Signature**

```ts
export const theseThat = <L, A>(fa: These<L, A>): Option<A> => ...
```

Added in v1.13.0

# ~~theseThis~~ (function)

Use `getLeftOnly`

**Signature**

```ts
export const theseThis = <L, A>(fa: These<L, A>): Option<L> => ...
```

Added in v1.13.0

# ~~thisOrBoth~~ (function)

Use `leftOrBoth`

**Signature**

```ts
export const thisOrBoth = <L, A>(defaultThis: L, ma: Option<A>): These<L, A> => ...
```

Added in v1.13.0

# ~~this\_~~ (function)

Use `left`

**Signature**

```ts
export const this_ = <L, A>(l: L): These<L, A> => ...
```

Added in v1.0.0
