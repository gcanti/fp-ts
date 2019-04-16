---
title: These.ts
nav_order: 88
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
- [these (constant)](#these-constant)
- [both (function)](#both-function)
- [fromEither (function)](#fromeither-function)
- [fromOptions (function)](#fromoptions-function)
- [fromThese (function)](#fromthese-function)
- [getMonad (function)](#getmonad-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getSetoid (function)](#getsetoid-function)
- [getShow (function)](#getshow-function)
- [isBoth (function)](#isboth-function)
- [isThat (function)](#isthat-function)
- [isThis (function)](#isthis-function)
- [that (function)](#that-function)
- [thatOrBoth (function)](#thatorboth-function)
- [theseLeft (function)](#theseleft-function)
- [theseRight (function)](#theseright-function)
- [theseThat (function)](#thesethat-function)
- [theseThis (function)](#thesethis-function)
- [thisOrBoth (function)](#thisorboth-function)
- [this\_ (function)](#this_-function)

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
fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B { ... }
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
fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B { ... }
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
fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B { ... }
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

# these (constant)

**Signature**

```ts
export const these: Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = ...
```

Added in v1.0.0

# both (function)

**Signature**

```ts
export const both = <L, A>(l: L, a: A): These<L, A> => ...
```

Added in v1.0.0

# fromEither (function)

**Signature**

```ts
export const fromEither = <L, A>(fa: Either<L, A>): These<L, A> => ...
```

**Example**

```ts
import { fromEither, this_, that } from 'fp-ts/lib/These'
import { left, right } from 'fp-ts/lib/Either'

assert.deepStrictEqual(fromEither(left('a')), this_('a'))
assert.deepStrictEqual(fromEither(right(1)), that(1))
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
import { fromOptions, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(fromOptions(none, none), none)
assert.deepStrictEqual(fromOptions(some('a'), none), some(this_('a')))
assert.deepStrictEqual(fromOptions(none, some(1)), some(that(1)))
assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
```

Added in v1.13.0

# fromThese (function)

**Signature**

```ts
export const fromThese = <L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A] => ...
```

**Example**

```ts
import { fromThese, this_, that, both } from 'fp-ts/lib/These'

const from = fromThese('a', 1)
assert.deepStrictEqual(from(this_('b')), ['b', 1])
assert.deepStrictEqual(from(that(2)), ['a', 2])
assert.deepStrictEqual(from(both('b', 2)), ['b', 2])
```

Added in v1.0.0

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

# isThat (function)

Returns `true` if the these is an instance of `That`, `false` otherwise

**Signature**

```ts
export const isThat = <L, A>(fa: These<L, A>): fa is That<L, A> => ...
```

Added in v1.0.0

# isThis (function)

Returns `true` if the these is an instance of `This`, `false` otherwise

**Signature**

```ts
export const isThis = <L, A>(fa: These<L, A>): fa is This<L, A> => ...
```

Added in v1.0.0

# that (function)

**Signature**

```ts
export const that = <L, A>(a: A): These<L, A> => ...
```

Added in v1.0.0

# thatOrBoth (function)

**Signature**

```ts
export const thatOrBoth = <L, A>(defaultThat: A, ml: Option<L>): These<L, A> => ...
```

**Example**

```ts
import { thatOrBoth, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(thatOrBoth(1, none), that(1))
assert.deepStrictEqual(thatOrBoth(1, some('a')), both('a', 1))
```

Added in v1.13.0

# theseLeft (function)

Returns an `L` value if possible

**Signature**

```ts
export const theseLeft = <L, A>(fa: These<L, A>): Option<L> => ...
```

**Example**

```ts
import { theseLeft, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(theseLeft(this_('a')), some('a'))
assert.deepStrictEqual(theseLeft(that(1)), none)
assert.deepStrictEqual(theseLeft(both('a', 1)), some('a'))
```

Added in v1.0.0

# theseRight (function)

Returns an `A` value if possible

**Signature**

```ts
export const theseRight = <L, A>(fa: These<L, A>): Option<A> => ...
```

**Example**

```ts
import { theseRight, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(theseRight(this_('a')), none)
assert.deepStrictEqual(theseRight(that(1)), some(1))
assert.deepStrictEqual(theseRight(both('a', 1)), some(1))
```

Added in v1.0.0

# theseThat (function)

Returns the `A` value if and only if the value is constructed with `That`

**Signature**

```ts
export const theseThat = <L, A>(fa: These<L, A>): Option<A> => ...
```

**Example**

```ts
import { theseThat, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(theseThat(this_('a')), none)
assert.deepStrictEqual(theseThat(that(1)), some(1))
assert.deepStrictEqual(theseThat(both('a', 1)), none)
```

Added in v1.13.0

# theseThis (function)

Returns the `L` value if and only if the value is constructed with `This`

**Signature**

```ts
export const theseThis = <L, A>(fa: These<L, A>): Option<L> => ...
```

**Example**

```ts
import { theseThis, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(theseThis(this_('a')), some('a'))
assert.deepStrictEqual(theseThis(that(1)), none)
assert.deepStrictEqual(theseThis(both('a', 1)), none)
```

Added in v1.13.0

# thisOrBoth (function)

**Signature**

```ts
export const thisOrBoth = <L, A>(defaultThis: L, ma: Option<A>): These<L, A> => ...
```

**Example**

```ts
import { thisOrBoth, this_, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(thisOrBoth('a', none), this_('a'))
assert.deepStrictEqual(thisOrBoth('a', some(1)), both('a', 1))
```

Added in v1.13.0

# this\_ (function)

**Signature**

```ts
export const this_ = <L, A>(l: L): These<L, A> => ...
```

Added in v1.0.0
