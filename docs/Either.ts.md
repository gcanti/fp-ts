---
title: Either.ts
nav_order: 24
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Either](#either)
- [URI](#uri)
- [Left](#left)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [chain](#chain)
  - [bimap](#bimap)
  - [alt](#alt)
  - [orElse](#orelse)
  - [extend](#extend)
  - [reduce](#reduce)
  - [fold](#fold)
  - [getOrElse](#getorelse)
  - [getOrElseL](#getorelsel)
  - [mapLeft](#mapleft)
  - [inspect](#inspect)
  - [toString](#tostring)
  - [isLeft](#isleft)
  - [isRight](#isright)
  - [swap](#swap)
  - [filterOrElse](#filterorelse)
  - [filterOrElseL](#filterorelsel)
  - [~~refineOrElse~~](#refineorelse)
  - [~~refineOrElseL~~](#refineorelsel)
- [Right](#right)
  - [map](#map-1)
  - [ap](#ap-1)
  - [ap\_](#ap%5C_-1)
  - [chain](#chain-1)
  - [bimap](#bimap-1)
  - [alt](#alt-1)
  - [orElse](#orelse-1)
  - [extend](#extend-1)
  - [reduce](#reduce-1)
  - [fold](#fold-1)
  - [getOrElse](#getorelse-1)
  - [getOrElseL](#getorelsel-1)
  - [mapLeft](#mapleft-1)
  - [inspect](#inspect-1)
  - [toString](#tostring-1)
  - [isLeft](#isleft-1)
  - [isRight](#isright-1)
  - [swap](#swap-1)
  - [filterOrElse](#filterorelse-1)
  - [filterOrElseL](#filterorelsel-1)
  - [refineOrElse](#refineorelse)
  - [refineOrElseL](#refineorelsel)
- [URI](#uri-1)
- [either](#either)
- [fromNullable](#fromnullable)
- [fromOption](#fromoption)
- [fromOptionL](#fromoptionl)
- [fromPredicate](#frompredicate)
- [~~fromRefinement~~](#fromrefinement)
- [fromValidation](#fromvalidation)
- [getApplyMonoid](#getapplymonoid)
- [getApplySemigroup](#getapplysemigroup)
- [getCompactable](#getcompactable)
- [getFilterable](#getfilterable)
- [getSemigroup](#getsemigroup)
- [getSetoid](#getsetoid)
- [getWitherable](#getwitherable)
- [isLeft](#isleft-2)
- [isRight](#isright-2)
- [left](#left)
- [right](#right)
- [toError](#toerror)
- [~~tryCatch~~](#trycatch)
- [tryCatch2v](#trycatch2v)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Either

Represents a value of one of two possible types (a disjoint union).

An instance of `Either` is either an instance of `Left` or `Right`.

A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
`None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
dictates that `Left` is used for failure and `Right` is used for success.

For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.

```ts
const parse = (errorMessage: string) => (input: string): Either<string, number> => {
  const n = parseInt(input, 10)
  return isNaN(n) ? left(errorMessage) : right(n)
}
```

`Either` is right-biased, which means that `Right` is assumed to be the default case to operate on. If it is `Left`,
operations like `map`, `chain`, ... return the `Left` value unchanged:

```ts
right(12).map(double) // right(24)
left(23).map(double) // left(23)
```

**Signature** (type alias)

```ts
export type Either<L, A> = Left<L, A> | Right<L, A>
```

Added in v1.0.0

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# Left

Left side of `Either`

**Signature** (class)

```ts
export class Left<L, A> {
  constructor(readonly value: L) { ... }
  ...
}
```

## map

The given function is applied if this is a `Right`

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Either<L, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> { ... }
```

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C> { ... }
```

## chain

Binds the given function across `Right`

**Signature** (method)

```ts
chain<B>(f: (a: A) => Either<L, B>): Either<L, B> { ... }
```

## bimap

**Signature** (method)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B> { ... }
```

## alt

**Signature** (method)

```ts
alt(fy: Either<L, A>): Either<L, A> { ... }
```

## orElse

Lazy version of `alt`

**Signature** (method)

```ts
orElse<M>(fy: (l: L) => Either<M, A>): Either<M, A> { ... }
```

**Example**

```ts
import { right } from 'fp-ts/lib/Either'

assert.deepStrictEqual(right(1).orElse(() => right(2)), right(1))
```

Added in v1.6.0

## extend

**Signature** (method)

```ts
extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> { ... }
```

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## fold

Applies a function to each case in the data structure

**Signature** (method)

```ts
fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B): B { ... }
```

## getOrElse

Returns the value from this `Right` or the given argument if this is a `Left`

**Signature** (method)

```ts
getOrElse(a: A): A { ... }
```

## getOrElseL

Returns the value from this `Right` or the result of given argument if this is a `Left`

**Signature** (method)

```ts
getOrElseL(f: (l: L) => A): A { ... }
```

## mapLeft

Maps the left side of the disjunction

**Signature** (method)

```ts
mapLeft<M>(f: (l: L) => M): Either<M, A> { ... }
```

## inspect

**Signature** (method)

```ts
inspect(): string { ... }
```

## toString

**Signature** (method)

```ts
toString(): string { ... }
```

## isLeft

Returns `true` if the either is an instance of `Left`, `false` otherwise

**Signature** (method)

```ts
isLeft(): this is Left<L, A> { ... }
```

## isRight

Returns `true` if the either is an instance of `Right`, `false` otherwise

**Signature** (method)

```ts
isRight(): this is Right<L, A> { ... }
```

## swap

Swaps the disjunction values

**Signature** (method)

```ts
swap(): Either<A, L> { ... }
```

## filterOrElse

Returns `Right` with the existing value of `Right` if this is a `Right` and the given predicate `p` holds for the
right value, returns `Left(zero)` if this is a `Right` and the given predicate `p` does not hold for the right
value, returns `Left` with the existing value of `Left` if this is a `Left`.

**Signature** (method)

```ts
filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>
filterOrElse(p: Predicate<A>, zero: L): Either<L, A>
filterOrElse(_: Predicate<A>, zero: L): Either<L, A> { ... }
```

**Example**

```ts
import { right, left } from 'fp-ts/lib/Either'

assert.deepStrictEqual(right(12).filterOrElse(n => n > 10, -1), right(12))
assert.deepStrictEqual(right(7).filterOrElse(n => n > 10, -1), left(-1))
assert.deepStrictEqual(left(12).filterOrElse(n => n > 10, -1), left(12))
```

Added in v1.3.0

## filterOrElseL

Lazy version of `filterOrElse`

**Signature** (method)

```ts
filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>
filterOrElseL(p: Predicate<A>, zero: (a: A) => L): Either<L, A>
filterOrElseL(_: Predicate<A>, zero: (a: A) => L): Either<L, A> { ... }
```

Added in v1.3.0

## ~~refineOrElse~~

Use `filterOrElse` instead

**Signature** (method)

```ts
refineOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B> { ... }
```

Added in v1.6.0

## ~~refineOrElseL~~

Lazy version of `refineOrElse`
Use `filterOrElseL` instead

**Signature** (method)

```ts
refineOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B> { ... }
```

Added in v1.6.0

# Right

Right side of `Either`

**Signature** (class)

```ts
export class Right<L, A> {
  constructor(readonly value: A) { ... }
  ...
}
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Either<L, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> { ... }
```

## ap\_

**Signature** (method)

```ts
ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => Either<L, B>): Either<L, B> { ... }
```

## bimap

**Signature** (method)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B> { ... }
```

## alt

**Signature** (method)

```ts
alt(fy: Either<L, A>): Either<L, A> { ... }
```

## orElse

**Signature** (method)

```ts
orElse<M>(fy: (l: L) => Either<M, A>): Either<M, A> { ... }
```

## extend

**Signature** (method)

```ts
extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> { ... }
```

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## fold

**Signature** (method)

```ts
fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B): B { ... }
```

## getOrElse

**Signature** (method)

```ts
getOrElse(a: A): A { ... }
```

## getOrElseL

**Signature** (method)

```ts
getOrElseL(f: (l: L) => A): A { ... }
```

## mapLeft

**Signature** (method)

```ts
mapLeft<M>(f: (l: L) => M): Either<M, A> { ... }
```

## inspect

**Signature** (method)

```ts
inspect(): string { ... }
```

## toString

**Signature** (method)

```ts
toString(): string { ... }
```

## isLeft

**Signature** (method)

```ts
isLeft(): this is Left<L, A> { ... }
```

## isRight

**Signature** (method)

```ts
isRight(): this is Right<L, A> { ... }
```

## swap

**Signature** (method)

```ts
swap(): Either<A, L> { ... }
```

## filterOrElse

**Signature** (method)

```ts
filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>
filterOrElse(p: Predicate<A>, zero: L): Either<L, A>
filterOrElse(p: Predicate<A>, zero: L): Either<L, A> { ... }
```

## filterOrElseL

**Signature** (method)

```ts
filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>
filterOrElseL(p: Predicate<A>, zero: (a: A) => L): Either<L, A>
filterOrElseL(p: Predicate<A>, zero: (a: A) => L): Either<L, A> { ... }
```

## refineOrElse

**Signature** (method)

```ts
refineOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B> { ... }
```

## refineOrElseL

**Signature** (method)

```ts
refineOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# either

**Signature** (constant)

```ts
export const either: Monad2<URI> &
  Foldable2v2<URI> &
  Traversable2v2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI> = ...
```

Added in v1.0.0

# fromNullable

Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`

**Signature** (function)

```ts
export const fromNullable = <L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A> => ...
```

Added in v1.0.0

# fromOption

Takes a default and a `Option` value, if the value is a `Some`, turn it into a `Right`, if the value is a `None` use
the provided default as a `Left`

**Signature** (function)

```ts
export const fromOption = <L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A> => ...
```

Added in v1.0.0

# fromOptionL

Lazy version of `fromOption`

**Signature** (function)

```ts
export const fromOptionL = <L>(defaultValue: Lazy<L>) => <A>(fa: Option<A>): Either<L, A> => ...
```

Added in v1.3.0

# fromPredicate

**Signature** (function)

```ts
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): (a: A) => Either<L, B>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => Either<L, A>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => Either<L, A> { ... }
```

Added in v1.0.0

# ~~fromRefinement~~

Use `fromPredicate` instead

**Signature** (function)

```ts
export const fromRefinement = <L, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => L) => (
  a: A
): Either<L, B> => ...
```

Added in v1.6.0

# fromValidation

**Signature** (function)

```ts
export const fromValidation = <L, A>(fa: Validation<L, A>): Either<L, A> => ...
```

Added in v1.0.0

# getApplyMonoid

**Signature** (function)

```ts
export const getApplyMonoid = <L, A>(M: Monoid<A>): Monoid<Either<L, A>> => ...
```

Added in v1.7.0

# getApplySemigroup

`Apply` semigroup

**Signature** (function)

```ts
export const getApplySemigroup = <L, A>(S: Semigroup<A>): Semigroup<Either<L, A>> => ...
```

**Example**

```ts
import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const S = getApplySemigroup<string, number>(semigroupSum)
assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
```

Added in v1.7.0

# getCompactable

Builds `Compactable` instance for `Either` given `Monoid` for the left side

**Signature** (function)

```ts
export function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L> { ... }
```

Added in v1.7.0

# getFilterable

Builds `Filterable` instance for `Either` given `Monoid` for the left side

**Signature** (function)

```ts
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L> { ... }
```

Added in v1.7.0

# getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
appended using the provided `Semigroup`

**Signature** (function)

```ts
export const getSemigroup = <L, A>(S: Semigroup<A>): Semigroup<Either<L, A>> => ...
```

**Example**

```ts
import { getSemigroup, left, right } from 'fp-ts/lib/Either'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const S = getSemigroup<string, number>(semigroupSum)
assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
```

Added in v1.7.0

# getSetoid

**Signature** (function)

```ts
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Either<L, A>> => ...
```

Added in v1.0.0

# getWitherable

Builds `Witherable` instance for `Either` given `Monoid` for the left side

**Signature** (function)

```ts
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L> { ... }
```

Added in v1.7.0

# isLeft

Returns `true` if the either is an instance of `Left`, `false` otherwise

**Signature** (function)

```ts
export const isLeft = <L, A>(fa: Either<L, A>): fa is Left<L, A> => ...
```

Added in v1.0.0

# isRight

Returns `true` if the either is an instance of `Right`, `false` otherwise

**Signature** (function)

```ts
export const isRight = <L, A>(fa: Either<L, A>): fa is Right<L, A> => ...
```

Added in v1.0.0

# left

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure

**Signature** (function)

```ts
export const left = <L, A>(l: L): Either<L, A> => ...
```

Added in v1.0.0

# right

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure

**Signature** (function)

```ts
export const right = <L, A>(a: A): Either<L, A> => ...
```

Added in v1.0.0

# toError

Default value for the optional `onerror` argument of `tryCatch`

**Signature** (function)

```ts
export const toError = (e: unknown): Error => ...
```

Added in v1.0.0

# ~~tryCatch~~

Use `tryCatch2v` instead

**Signature** (function)

```ts
export const tryCatch = <A>(f: Lazy<A>, onerror: (e: unknown) => Error = toError): Either<Error, A> => ...
```

Added in v1.0.0

# tryCatch2v

Constructs a new `Either` from a function that might throw

**Signature** (function)

```ts
export const tryCatch2v = <L, A>(f: Lazy<A>, onerror: (e: unknown) => L): Either<L, A> => ...
```

**Example**

```ts
import { Either, left, right, tryCatch2v } from 'fp-ts/lib/Either'

const unsafeHead = <A>(as: Array<A>): A => {
  if (as.length > 0) {
    return as[0]
  } else {
    throw new Error('empty array')
  }
}

const head = <A>(as: Array<A>): Either<Error, A> => {
  return tryCatch2v(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
}

assert.deepStrictEqual(head([]), left(new Error('empty array')))
assert.deepStrictEqual(head([1, 2, 3]), right(1))
```

Added in v1.11.0
