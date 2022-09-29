---
title: These.ts
nav_order: 100
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

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Traversable](#traversable)
  - [traverse](#traverse)
- [combinators](#combinators)
  - [fromEitherK](#fromeitherk)
  - [swap](#swap)
- [constructors](#constructors)
  - [both](#both)
  - [fromOption](#fromoption)
  - [fromOptions](#fromoptions)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [leftOrBoth](#leftorboth)
  - [of](#of)
  - [right](#right)
  - [rightOrBoth](#rightorboth)
- [error handling](#error-handling)
  - [mapError](#maperror)
- [guards](#guards)
  - [isBoth](#isboth)
  - [isLeft](#isleft)
  - [isRight](#isright)
- [instances](#instances)
  - [Bifunctor](#bifunctor)
  - [Foldable](#foldable-1)
  - [FromEither](#fromeither)
  - [FromThese](#fromthese)
  - [Functor](#functor)
  - [Pointed](#pointed)
  - [Traversable](#traversable-1)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getEq](#geteq)
  - [getFlattenable](#getflattenable)
  - [getMonad](#getmonad)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
- [interop](#interop)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
- [lifting](#lifting)
  - [fromOptionK](#fromoptionk)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
  - [mapBoth](#mapboth)
- [model](#model)
  - [Both (interface)](#both-interface)
  - [These (type alias)](#these-type-alias)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
- [type lambdas](#type-lambdas)
  - [TheseTypeLambda (interface)](#thesetypelambda-interface)
- [utils](#utils)
  - [elem](#elem)
  - [exists](#exists)
  - [getLeft](#getleft)
  - [getLeftOnly](#getleftonly)
  - [getRight](#getright)
  - [getRightOnly](#getrightonly)
  - [sequence](#sequence)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [toTuple2](#totuple2)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [unit](#unit)

---

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: These<E, A>) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(fa: These<E, A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(fa: These<E, A>) => B
```

Added in v3.0.0

# Traversable

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, FE, B>(
  f: (a: A) => Kind<F, S, R, O, FE, B>
) => <E>(ta: These<E, A>) => Kind<F, S, R, O, FE, These<E, B>>
```

Added in v3.0.0

# combinators

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => These<E, B>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(fa: These<E, A>) => These<A, E>
```

Added in v3.0.0

# constructors

## both

**Signature**

```ts
export declare const both: <E, A>(left: E, right: A) => These<E, A>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => These<E, A>
```

Added in v3.0.0

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

Added in v3.0.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => These<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => These<E, B>
}
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E>(left: E) => These<E, never>
```

Added in v3.0.0

## leftOrBoth

**Signature**

```ts
export declare const leftOrBoth: <E>(e: LazyArg<E>) => <A>(ma: Option<A>) => These<E, A>
```

**Example**

```ts
import { leftOrBoth, left, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(leftOrBoth(() => 'a')(none), left('a'))
assert.deepStrictEqual(leftOrBoth(() => 'a')(some(1)), both('a', 1))
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <A>(right: A) => These<never, A>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A>(right: A) => These<never, A>
```

Added in v3.0.0

## rightOrBoth

**Signature**

```ts
export declare const rightOrBoth: <A>(a: LazyArg<A>) => <E>(me: Option<E>) => These<E, A>
```

**Example**

```ts
import { rightOrBoth, right, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(rightOrBoth(() => 1)(none), right(1))
assert.deepStrictEqual(rightOrBoth(() => 1)(some('a')), both('a', 1))
```

Added in v3.0.0

# error handling

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(f: (e: E) => G) => <A>(self: These<E, A>) => These<G, A>
```

Added in v3.0.0

# guards

## isBoth

Returns `true` if the these is an instance of `Both`, `false` otherwise

**Signature**

```ts
export declare const isBoth: <E, A>(fa: These<E, A>) => fa is Both<E, A>
```

Added in v3.0.0

## isLeft

Returns `true` if the these is an instance of `Left`, `false` otherwise

**Signature**

```ts
export declare const isLeft: <E>(fa: These<E, unknown>) => fa is Left<E>
```

Added in v3.0.0

## isRight

Returns `true` if the these is an instance of `Right`, `false` otherwise

**Signature**

```ts
export declare const isRight: <A>(fa: These<unknown, A>) => fa is Right<A>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<TheseTypeLambda>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<TheseTypeLambda>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: fromEither_.FromEither<TheseTypeLambda>
```

Added in v3.0.0

## FromThese

**Signature**

```ts
export declare const FromThese: fromThese_.FromThese<TheseTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<TheseTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<TheseTypeLambda>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<TheseTypeLambda>
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <E>(
  Semigroup: Semigroup<E>
) => applicative.Applicative<ValidatedTypeLambda<TheseTypeLambda, E>>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <E>(Semigroup: Semigroup<E>) => Apply<ValidatedTypeLambda<TheseTypeLambda, E>>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <E, A>(EE: Eq<E>, EA: Eq<A>) => Eq<These<E, A>>
```

Added in v3.0.0

## getFlattenable

**Signature**

```ts
export declare const getFlattenable: <E>(S: Semigroup<E>) => Flattenable<ValidatedTypeLambda<TheseTypeLambda, E>>
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <E>(S: Semigroup<E>) => Monad<ValidatedTypeLambda<TheseTypeLambda, E>>
```

Added in v3.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <E, A>(SE: Semigroup<E>, SA: Semigroup<A>) => Semigroup<These<E, A>>
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <E, A>(SE: Show<E>, SA: Show<A>) => Show<These<E, A>>
```

Added in v3.0.0

# interop

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => These<E, NonNullable<A>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  onNullable: LazyArg<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => B | null | undefined) => (...a: A) => These<E, NonNullable<B>>
```

Added in v3.0.0

# lifting

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => These<E, B>
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: These<E, (a: A) => B>) => These<E, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: These<E, A>) => These<E, B>
```

Added in v3.0.0

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: These<E, A>) => These<G, B>
```

Added in v3.0.0

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

Added in v3.0.0

## These (type alias)

**Signature**

```ts
export type These<E, A> = Either<E, A> | Both<E, A>
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B, D = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => (fa: These<E, A>) => B | C | D
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: These<never, readonly []>
```

Added in v3.0.0

# type lambdas

## TheseTypeLambda (interface)

**Signature**

```ts
export interface TheseTypeLambda extends TypeLambda {
  readonly type: These<this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## elem

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => (a: A) => <E>(ma: These<E, A>) => boolean
```

Added in v3.0.0

## exists

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => (ma: These<unknown, A>) => boolean
```

Added in v3.0.0

## getLeft

Returns an `E` value if possible

**Signature**

```ts
export declare const getLeft: <E, A>(fa: These<E, A>) => Option<E>
```

**Example**

```ts
import { getLeft, left, right, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(getLeft(left('a')), some('a'))
assert.deepStrictEqual(getLeft(right(1)), none)
assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
```

Added in v3.0.0

## getLeftOnly

Returns the `E` value if and only if the value is constructed with `Left`

**Signature**

```ts
export declare const getLeftOnly: <E, A>(fa: These<E, A>) => Option<E>
```

**Example**

```ts
import { getLeftOnly, left, right, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
assert.deepStrictEqual(getLeftOnly(right(1)), none)
assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
```

Added in v3.0.0

## getRight

Returns an `A` value if possible

**Signature**

```ts
export declare const getRight: <E, A>(fa: These<E, A>) => Option<A>
```

**Example**

```ts
import { getRight, left, right, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(getRight(left('a')), none)
assert.deepStrictEqual(getRight(right(1)), some(1))
assert.deepStrictEqual(getRight(both('a', 1)), some(1))
```

Added in v3.0.0

## getRightOnly

Returns the `A` value if and only if the value is constructed with `Right`

**Signature**

```ts
export declare const getRightOnly: <E, A>(fa: These<E, A>) => Option<A>
```

**Example**

```ts
import { getRightOnly, left, right, both } from 'fp-ts/These'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(getRightOnly(left('a')), none)
assert.deepStrictEqual(getRightOnly(right(1)), some(1))
assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
```

Added in v3.0.0

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <E, FS, FR, FO, FE, A>(fa: These<E, Kind<F, FS, FR, FO, FE, A>>) => Kind<F, FS, FR, FO, FE, These<E, A>>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(getApplicative(S))`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E>(
  S: Semigroup<E>
) => <A>(arr: readonly These<E, A>[]) => These<E, readonly A[]>
```

Added in v3.0.0

## toTuple2

**Signature**

```ts
export declare const toTuple2: <E, A>(e: LazyArg<E>, a: LazyArg<A>) => (fa: These<E, A>) => readonly [E, A]
```

**Example**

```ts
import { toTuple2, left, right, both } from 'fp-ts/These'

const f = toTuple2(
  () => 'a',
  () => 1
)
assert.deepStrictEqual(f(left('b')), ['b', 1])
assert.deepStrictEqual(f(right(2)), ['a', 2])
assert.deepStrictEqual(f(both('b', 2)), ['b', 2])
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(getApplicative(S))`.

**Signature**

```ts
export declare const traverseReadonlyArray: <E>(
  S: Semigroup<E>
) => <A, B>(f: (a: A) => These<E, B>) => (as: readonly A[]) => These<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(S))`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <E>(
  S: Semigroup<E>
) => <A, B>(f: (index: number, a: A) => These<E, B>) => (as: readonly A[]) => These<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(S))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <E>(
  S: Semigroup<E>
) => <A, B>(f: (a: A) => These<E, B>) => (as: readonly [A, ...A[]]) => These<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(S))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <E>(
  S: Semigroup<E>
) => <A, B>(f: (index: number, a: A) => These<E, B>) => (as: readonly [A, ...A[]]) => These<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: These<never, void>
```

Added in v3.0.0
