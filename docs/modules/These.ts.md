---
title: These.ts
nav_order: 110
parent: Modules
---

## These overview

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

- [combinators](#combinators)
  - [swap](#swap)
- [constructors](#constructors)
  - [both](#both)
  - [left](#left)
  - [leftOrBoth](#leftorboth)
  - [of](#of)
  - [right](#right)
  - [rightOrBoth](#rightorboth)
- [conversions](#conversions)
  - [fromOption](#fromoption)
  - [fromOptions](#fromoptions)
  - [getLeft](#getleft)
  - [getLeftOnly](#getleftonly)
  - [getRight](#getright)
  - [getRightOnly](#getrightonly)
  - [toTuple2](#totuple2)
  - [~~toTuple~~](#totuple)
- [error handling](#error-handling)
  - [mapLeft](#mapleft)
- [folding](#folding)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [instances](#instances)
  - [Bifunctor](#bifunctor)
  - [Foldable](#foldable)
  - [FromEither](#fromeither)
  - [FromThese](#fromthese)
  - [Functor](#functor)
  - [Pointed](#pointed)
  - [Traversable](#traversable)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getChain](#getchain)
  - [getEq](#geteq)
  - [getMonad](#getmonad)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [~~these~~](#these)
- [lifting](#lifting)
  - [fromOptionK](#fromoptionk)
  - [fromPredicate](#frompredicate)
- [mapping](#mapping)
  - [bimap](#bimap)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [Both (interface)](#both-interface)
  - [These (type alias)](#these-type-alias)
- [pattern matching](#pattern-matching)
  - [fold](#fold)
  - [foldW](#foldw)
  - [match](#match)
  - [matchW](#matchw)
- [refinements](#refinements)
  - [isBoth](#isboth)
  - [isLeft](#isleft)
  - [isRight](#isright)
- [sequencing](#sequencing)
  - [sequence](#sequence)
  - [traverse](#traverse)
- [tuple sequencing](#tuple-sequencing)
  - [ApT](#apt)
- [type lambdas](#type-lambdas)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [utils](#utils)
  - [elem](#elem)
  - [exists](#exists)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)

---

# combinators

## swap

**Signature**

```ts
export declare const swap: <E, A>(fa: These<E, A>) => These<A, E>
```

Added in v2.4.0

# constructors

## both

**Signature**

```ts
export declare function both<E, A>(left: E, right: A): These<E, A>
```

Added in v2.0.0

## left

**Signature**

```ts
export declare function left<E = never, A = never>(left: E): These<E, A>
```

Added in v2.0.0

## leftOrBoth

**Signature**

```ts
export declare function leftOrBoth<E>(e: E): <A>(ma: Option<A>) => These<E, A>
```

**Example**

```ts
import { leftOrBoth, left, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(leftOrBoth('a')(none), left('a'))
assert.deepStrictEqual(leftOrBoth('a')(some(1)), both('a', 1))
```

Added in v2.0.0

## of

**Signature**

```ts
export declare const of: <E = never, A = never>(right: A) => These<E, A>
```

Added in v2.0.0

## right

**Signature**

```ts
export declare function right<E = never, A = never>(right: A): These<E, A>
```

Added in v2.0.0

## rightOrBoth

**Signature**

```ts
export declare function rightOrBoth<A>(a: A): <E>(me: Option<E>) => These<E, A>
```

**Example**

```ts
import { rightOrBoth, right, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(rightOrBoth(1)(none), right(1))
assert.deepStrictEqual(rightOrBoth(1)(some('a')), both('a', 1))
```

Added in v2.0.0

# conversions

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => These<E, A>
```

Added in v2.10.0

## fromOptions

Takes a pair of `Option`s and attempts to create a `These` from them

**Signature**

```ts
export declare const fromOptions: <E, A>(fe: Option<E>, fa: Option<A>) => Option<These<E, A>>
```

**Example**

```ts
import { fromOptions, left, right, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(fromOptions(none, none), none)
assert.deepStrictEqual(fromOptions(some('a'), none), some(left('a')))
assert.deepStrictEqual(fromOptions(none, some(1)), some(right(1)))
assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
```

Added in v2.0.0

## getLeft

Returns an `E` value if possible

**Signature**

```ts
export declare function getLeft<E, A>(fa: These<E, A>): Option<E>
```

**Example**

```ts
import { getLeft, left, right, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(getLeft(left('a')), some('a'))
assert.deepStrictEqual(getLeft(right(1)), none)
assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
```

Added in v2.0.0

## getLeftOnly

Returns the `E` value if and only if the value is constructed with `Left`

**Signature**

```ts
export declare function getLeftOnly<E, A>(fa: These<E, A>): Option<E>
```

**Example**

```ts
import { getLeftOnly, left, right, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
assert.deepStrictEqual(getLeftOnly(right(1)), none)
assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
```

Added in v2.0.0

## getRight

Returns an `A` value if possible

**Signature**

```ts
export declare function getRight<E, A>(fa: These<E, A>): Option<A>
```

**Example**

```ts
import { getRight, left, right, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(getRight(left('a')), none)
assert.deepStrictEqual(getRight(right(1)), some(1))
assert.deepStrictEqual(getRight(both('a', 1)), some(1))
```

Added in v2.0.0

## getRightOnly

Returns the `A` value if and only if the value is constructed with `Right`

**Signature**

```ts
export declare function getRightOnly<E, A>(fa: These<E, A>): Option<A>
```

**Example**

```ts
import { getRightOnly, left, right, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(getRightOnly(left('a')), none)
assert.deepStrictEqual(getRightOnly(right(1)), some(1))
assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
```

Added in v2.0.0

## toTuple2

**Signature**

```ts
export declare const toTuple2: <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: These<E, A>) => readonly [E, A]
```

**Example**

```ts
import { toTuple2, left, right, both } from 'fp-ts/These'

assert.deepStrictEqual(
  toTuple2(
    () => 'a',
    () => 1
  )(left('b')),
  ['b', 1]
)
assert.deepStrictEqual(
  toTuple2(
    () => 'a',
    () => 1
  )(right(2)),
  ['a', 2]
)
assert.deepStrictEqual(
  toTuple2(
    () => 'a',
    () => 1
  )(both('b', 2)),
  ['b', 2]
)
```

Added in v2.10.0

## ~~toTuple~~

Use [`toTuple2`](#totuple2) instead.

**Signature**

```ts
export declare const toTuple: <E, A>(e: E, a: A) => (fa: These<E, A>) => [E, A]
```

Added in v2.0.0

# error handling

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: These<E, A>) => These<G, A>
```

Added in v2.0.0

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: These<E, A>) => M
```

Added in v2.0.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: These<E, A>) => B
```

Added in v2.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: These<E, A>) => B
```

Added in v2.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'These'>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable2<'These'>
```

Added in v2.7.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither2<'These'>
```

Added in v2.10.0

## FromThese

**Signature**

```ts
export declare const FromThese: FromThese2<'These'>
```

Added in v2.11.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'These'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'These'>
```

Added in v2.10.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable2<'These'>
```

Added in v2.7.0

## getApplicative

**Signature**

```ts
export declare function getApplicative<E>(S: Semigroup<E>): Applicative2C<URI, E>
```

Added in v2.7.0

## getApply

**Signature**

```ts
export declare const getApply: <E>(S: Semigroup<E>) => Apply2C<'These', E>
```

Added in v2.10.0

## getChain

**Signature**

```ts
export declare function getChain<E>(S: Semigroup<E>): Chain2C<URI, E>
```

Added in v2.10.0

## getEq

**Signature**

```ts
export declare function getEq<E, A>(EE: Eq<E>, EA: Eq<A>): Eq<These<E, A>>
```

Added in v2.0.0

## getMonad

**Signature**

```ts
export declare function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadThrow2C<URI, E>
```

Added in v2.0.0

## getSemigroup

**Signature**

```ts
export declare function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<These<E, A>>
```

Added in v2.0.0

## getShow

**Signature**

```ts
export declare function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<These<E, A>>
```

Added in v2.0.0

## ~~these~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `T.Functor` instead of `T.these`
(where `T` is from `import T from 'fp-ts/These'`)

**Signature**

```ts
export declare const these: Functor2<'These'> & Bifunctor2<'These'> & Foldable2<'These'> & Traversable2<'These'>
```

Added in v2.0.0

# lifting

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => (...a: A) => These<E, B>
```

Added in v2.10.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => These<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => These<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => These<E, A>
}
```

Added in v2.13.0

# mapping

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: These<E, A>) => These<G, B>
```

Added in v2.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: These<E, (a: A) => B>) => These<E, B>
```

Added in v2.10.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: These<E, A>) => These<E, B>
```

Added in v2.0.0

# model

## Both (interface)

**Signature**

```ts
export interface Both<E, A> {
  readonly _tag: 'Both'
  readonly left: E
  readonly right: A
}
```

Added in v2.0.0

## These (type alias)

**Signature**

```ts
export type These<E, A> = Either<E, A> | Both<E, A>
```

Added in v2.0.0

# pattern matching

## fold

Alias of [`match`](#match).

**Signature**

```ts
export declare const fold: <E, A, B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (fa: These<E, A>) => B
```

Added in v2.0.0

## foldW

Alias of [`matchW`](#matchw).

**Signature**

```ts
export declare const foldW: <E, B, A, C, D>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => (fa: These<E, A>) => B | C | D
```

Added in v2.10.0

## match

**Signature**

```ts
export declare const match: <E, A, B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (fa: These<E, A>) => B
```

Added in v2.10.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <E, B, A, C, D>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => (fa: These<E, A>) => B | C | D
```

Added in v2.10.0

# refinements

## isBoth

Returns `true` if the these is an instance of `Both`, `false` otherwise

**Signature**

```ts
export declare function isBoth<E, A>(fa: These<E, A>): fa is Both<E, A>
```

Added in v2.0.0

## isLeft

Returns `true` if the these is an instance of `Left`, `false` otherwise

**Signature**

```ts
export declare const isLeft: <E>(fa: These<E, unknown>) => fa is Left<E>
```

Added in v2.0.0

## isRight

Returns `true` if the these is an instance of `Right`, `false` otherwise

**Signature**

```ts
export declare const isRight: <A>(fa: These<unknown, A>) => fa is Right<A>
```

Added in v2.0.0

# sequencing

## sequence

**Signature**

```ts
export declare const sequence: Sequence2<'These'>
```

Added in v2.6.3

## traverse

**Signature**

```ts
export declare const traverse: PipeableTraverse2<'These'>
```

Added in v2.6.3

# tuple sequencing

## ApT

**Signature**

```ts
export declare const ApT: These<never, readonly []>
```

Added in v2.11.0

# type lambdas

## URI

**Signature**

```ts
export declare const URI: 'These'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# utils

## elem

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => (a: A) => <E>(ma: These<E, A>) => boolean
```

Added in v2.11.0

## exists

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => (ma: These<unknown, A>) => boolean
```

Added in v2.11.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(S))`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <E>(
  S: Semigroup<E>
) => <A, B>(f: (index: number, a: A) => These<E, B>) => (as: readonly A[]) => These<E, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApplicative(S))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <E>(
  S: Semigroup<E>
) => <A, B>(
  f: (index: number, a: A) => These<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => These<E, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0
