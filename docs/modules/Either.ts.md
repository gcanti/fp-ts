---
title: Either.ts
nav_order: 24
parent: Modules
---

# Overview

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

---

<h2 class="text-delta">Table of contents</h2>

- [Either (type alias)](#either-type-alias)
- [URI (type alias)](#uri-type-alias)
- [Left (class)](#left-class)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
  - [bimap (method)](#bimap-method)
  - [alt (method)](#alt-method)
  - [orElse (method)](#orelse-method)
  - [extend (method)](#extend-method)
  - [reduce (method)](#reduce-method)
  - [fold (method)](#fold-method)
  - [getOrElse (method)](#getorelse-method)
  - [getOrElseL (method)](#getorelsel-method)
  - [mapLeft (method)](#mapleft-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
  - [isLeft (method)](#isleft-method)
  - [isRight (method)](#isright-method)
  - [swap (method)](#swap-method)
  - [filterOrElse (method)](#filterorelse-method)
  - [filterOrElseL (method)](#filterorelsel-method)
  - [~~refineOrElse~~ (method)](#refineorelse-method)
  - [~~refineOrElseL~~ (method)](#refineorelsel-method)
- [Right (class)](#right-class)
  - [map (method)](#map-method-1)
  - [ap (method)](#ap-method-1)
  - [ap\_ (method)](#ap_-method-1)
  - [chain (method)](#chain-method-1)
  - [bimap (method)](#bimap-method-1)
  - [alt (method)](#alt-method-1)
  - [orElse (method)](#orelse-method-1)
  - [extend (method)](#extend-method-1)
  - [reduce (method)](#reduce-method-1)
  - [fold (method)](#fold-method-1)
  - [getOrElse (method)](#getorelse-method-1)
  - [getOrElseL (method)](#getorelsel-method-1)
  - [mapLeft (method)](#mapleft-method-1)
  - [inspect (method)](#inspect-method-1)
  - [toString (method)](#tostring-method-1)
  - [isLeft (method)](#isleft-method-1)
  - [isRight (method)](#isright-method-1)
  - [swap (method)](#swap-method-1)
  - [filterOrElse (method)](#filterorelse-method-1)
  - [filterOrElseL (method)](#filterorelsel-method-1)
  - [refineOrElse (method)](#refineorelse-method)
  - [refineOrElseL (method)](#refineorelsel-method)
- [URI (constant)](#uri-constant)
- [either (constant)](#either-constant)
- [~~getSetoid~~ (constant)](#getsetoid-constant)
- [elem (function)](#elem-function)
- [filterOrElse (function)](#filterorelse-function)
- [fold (function)](#fold-function)
- [fromNullable (function)](#fromnullable-function)
- [fromOption (function)](#fromoption-function)
- [fromOptionL (function)](#fromoptionl-function)
- [fromPredicate (function)](#frompredicate-function)
- [~~fromRefinement~~ (function)](#fromrefinement-function)
- [fromValidation (function)](#fromvalidation-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [~~getCompactable~~ (function)](#getcompactable-function)
- [getEq (function)](#geteq-function)
- [~~getFilterable~~ (function)](#getfilterable-function)
- [getOrElse (function)](#getorelse-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getShow (function)](#getshow-function)
- [getValidation (function)](#getvalidation-function)
- [getValidationMonoid (function)](#getvalidationmonoid-function)
- [getValidationSemigroup (function)](#getvalidationsemigroup-function)
- [getWitherable (function)](#getwitherable-function)
- [isLeft (function)](#isleft-function)
- [isRight (function)](#isright-function)
- [left (function)](#left-function)
- [orElse (function)](#orelse-function)
- [parseJSON (function)](#parsejson-function)
- [right (function)](#right-function)
- [stringifyJSON (function)](#stringifyjson-function)
- [toError (function)](#toerror-function)
- [~~tryCatch~~ (function)](#trycatch-function)
- [tryCatch2v (function)](#trycatch2v-function)

---

# Either (type alias)

**Signature**

```ts
export type Either<L, A> = Left<L, A> | Right<L, A>
```

Added in v1.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Left (class)

Left side of `Either`

**Signature**

```ts
export class Left<L, A> {
  constructor(readonly value: L) { ... }
  ...
}
```

## map (method)

The given function is applied if this is a `Right`

**Signature**

```ts
map<B>(f: (a: A) => B): Either<L, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C> { ... }
```

## chain (method)

Binds the given function across `Right`

**Signature**

```ts
chain<B>(f: (a: A) => Either<L, B>): Either<L, B> { ... }
```

## bimap (method)

**Signature**

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B> { ... }
```

## alt (method)

**Signature**

```ts
alt(fy: Either<L, A>): Either<L, A> { ... }
```

## orElse (method)

Lazy version of `alt`

**Signature**

```ts
orElse<M>(fy: (l: L) => Either<M, A>): Either<M, A> { ... }
```

**Example**

```ts
import { right } from 'fp-ts/lib/Either'

assert.deepStrictEqual(right(1).orElse(() => right(2)), right(1))
```

Added in v1.6.0

## extend (method)

**Signature**

```ts
extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> { ... }
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
fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B): B { ... }
```

## getOrElse (method)

Returns the value from this `Right` or the given argument if this is a `Left`

**Signature**

```ts
getOrElse(a: A): A { ... }
```

## getOrElseL (method)

Returns the value from this `Right` or the result of given argument if this is a `Left`

**Signature**

```ts
getOrElseL(f: (l: L) => A): A { ... }
```

## mapLeft (method)

Maps the left side of the disjunction

**Signature**

```ts
mapLeft<M>(f: (l: L) => M): Either<M, A> { ... }
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

## isLeft (method)

Returns `true` if the either is an instance of `Left`, `false` otherwise

**Signature**

```ts
isLeft(): this is Left<L, A> { ... }
```

## isRight (method)

Returns `true` if the either is an instance of `Right`, `false` otherwise

**Signature**

```ts
isRight(): this is Right<L, A> { ... }
```

## swap (method)

Swaps the disjunction values

**Signature**

```ts
swap(): Either<A, L> { ... }
```

## filterOrElse (method)

Returns `Right` with the existing value of `Right` if this is a `Right` and the given predicate `p` holds for the
right value, returns `Left(zero)` if this is a `Right` and the given predicate `p` does not hold for the right
value, returns `Left` with the existing value of `Left` if this is a `Left`.

**Signature**

```ts
filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>
filterOrElse(p: Predicate<A>, zero: L): Either<L, A> { ... }
```

**Example**

```ts
import { right, left } from 'fp-ts/lib/Either'

assert.deepStrictEqual(right(12).filterOrElse(n => n > 10, -1), right(12))
assert.deepStrictEqual(right(7).filterOrElse(n => n > 10, -1), left(-1))
assert.deepStrictEqual(left<number, number>(12).filterOrElse(n => n > 10, -1), left(12))
```

Added in v1.3.0

## filterOrElseL (method)

Lazy version of `filterOrElse`

**Signature**

```ts
filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>
filterOrElseL(p: Predicate<A>, zero: (a: A) => L): Either<L, A> { ... }
```

Added in v1.3.0

## ~~refineOrElse~~ (method)

Use `filterOrElse` instead

**Signature**

```ts
refineOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B> { ... }
```

Added in v1.6.0

## ~~refineOrElseL~~ (method)

Lazy version of `refineOrElse`
Use `filterOrElseL` instead

**Signature**

```ts
refineOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B> { ... }
```

Added in v1.6.0

# Right (class)

Right side of `Either`

**Signature**

```ts
export class Right<L, A> {
  constructor(readonly value: A) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Either<L, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> { ... }
```

## ap\_ (method)

**Signature**

```ts
ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => Either<L, B>): Either<L, B> { ... }
```

## bimap (method)

**Signature**

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B> { ... }
```

## alt (method)

**Signature**

```ts
alt(fy: Either<L, A>): Either<L, A> { ... }
```

## orElse (method)

**Signature**

```ts
orElse<M>(fy: (l: L) => Either<M, A>): Either<M, A> { ... }
```

## extend (method)

**Signature**

```ts
extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## fold (method)

**Signature**

```ts
fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B): B { ... }
```

## getOrElse (method)

**Signature**

```ts
getOrElse(a: A): A { ... }
```

## getOrElseL (method)

**Signature**

```ts
getOrElseL(f: (l: L) => A): A { ... }
```

## mapLeft (method)

**Signature**

```ts
mapLeft<M>(f: (l: L) => M): Either<M, A> { ... }
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

## isLeft (method)

**Signature**

```ts
isLeft(): this is Left<L, A> { ... }
```

## isRight (method)

**Signature**

```ts
isRight(): this is Right<L, A> { ... }
```

## swap (method)

**Signature**

```ts
swap(): Either<A, L> { ... }
```

## filterOrElse (method)

**Signature**

```ts
filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>
filterOrElse(p: Predicate<A>, zero: L): Either<L, A> { ... }
```

## filterOrElseL (method)

**Signature**

```ts
filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>
filterOrElseL(p: Predicate<A>, zero: (a: A) => L): Either<L, A> { ... }
```

## refineOrElse (method)

**Signature**

```ts
refineOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B> { ... }
```

## refineOrElseL (method)

**Signature**

```ts
refineOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# either (constant)

**Signature**

```ts
export const either: Monad2<URI> &
  Foldable2v2<URI> &
  Traversable2v2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI> &
  MonadThrow2<URI> = ...
```

Added in v1.0.0

# ~~getSetoid~~ (constant)

Use `getEq`

**Signature**

```ts
export const getSetoid: <L, A>(EL: Eq<L>, EA: Eq<A>) => Eq<Either<L, A>> = ...
```

Added in v1.0.0

# elem (function)

**Signature**

```ts
export function elem<A>(E: Eq<A>): (a: A) => <E>(ma: Either<E, A>) => boolean { ... }
```

Added in v1.19.0

# filterOrElse (function)

**Signature**

```ts
export function filterOrElse<E, A, B extends A>(
  refinement: Refinement<A, B>,
  onFalse: (a: A) => E
): (ma: Either<E, A>) => Either<E, B>
export function filterOrElse<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A> { ... }
```

Added in v1.19.0

# fold (function)

**Signature**

```ts
export function fold<E, A, R>(onLeft: (e: E) => R, onRight: (a: A) => R): (ma: Either<E, A>) => R { ... }
```

Added in v1.19.0

# fromNullable (function)

Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`

**Signature**

```ts
export const fromNullable = <L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A> => ...
```

Added in v1.0.0

# fromOption (function)

Takes a default and a `Option` value, if the value is a `Some`, turn it into a `Right`, if the value is a `None` use
the provided default as a `Left`

**Signature**

```ts
export const fromOption = <L>(onNone: L) => <A>(fa: Option<A>): Either<L, A> => ...
```

Added in v1.0.0

# fromOptionL (function)

Lazy version of `fromOption`

**Signature**

```ts
export const fromOptionL = <L>(onNone: Lazy<L>) => <A>(fa: Option<A>): Either<L, A> => ...
```

Added in v1.3.0

# fromPredicate (function)

**Signature**

```ts
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): (a: A) => Either<L, B>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => Either<L, A> { ... }
```

Added in v1.0.0

# ~~fromRefinement~~ (function)

Use `fromPredicate` instead

**Signature**

```ts
export const fromRefinement = <L, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => L) => (
  a: A
): Either<L, B> => ...
```

Added in v1.6.0

# fromValidation (function)

**Signature**

```ts
export const fromValidation = <L, A>(fa: Validation<L, A>): Either<L, A> => ...
```

Added in v1.0.0

# getApplyMonoid (function)

**Signature**

```ts
export const getApplyMonoid = <L, A>(M: Monoid<A>): Monoid<Either<L, A>> => ...
```

Added in v1.7.0

# getApplySemigroup (function)

`Apply` semigroup

**Signature**

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

# ~~getCompactable~~ (function)

Use `getWitherable`

**Signature**

```ts
export function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L> { ... }
```

Added in v1.7.0

# getEq (function)

**Signature**

```ts
export function getEq<L, A>(EL: Eq<L>, EA: Eq<A>): Eq<Either<L, A>> { ... }
```

Added in v1.19.0

# ~~getFilterable~~ (function)

Use `getWitherable`

**Signature**

```ts
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L> { ... }
```

Added in v1.7.0

# getOrElse (function)

**Signature**

```ts
export function getOrElse<E, A>(f: (e: E) => A): (ma: Either<E, A>) => A { ... }
```

Added in v1.19.0

# getSemigroup (function)

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
appended using the provided `Semigroup`

**Signature**

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

# getShow (function)

**Signature**

```ts
export const getShow = <L, A>(SL: Show<L>, SA: Show<A>): Show<Either<L, A>> => ...
```

Added in v1.17.0

# getValidation (function)

**Signature**

```ts
export function getValidation<E>(S: Semigroup<E>): Monad2C<URI, E> & Alt2C<URI, E> { ... }
```

Added in v1.19.0

# getValidationMonoid (function)

**Signature**

```ts
export function getValidationMonoid<E, A>(SE: Semigroup<E>, SA: Monoid<A>): Monoid<Either<E, A>> { ... }
```

Added in v1.19.0

# getValidationSemigroup (function)

**Signature**

```ts
export function getValidationSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<Either<E, A>> { ... }
```

Added in v1.19.0

# getWitherable (function)

Builds `Witherable` instance for `Either` given `Monoid` for the left side

**Signature**

```ts
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L> { ... }
```

Added in v1.7.0

# isLeft (function)

Returns `true` if the either is an instance of `Left`, `false` otherwise

**Signature**

```ts
export const isLeft = <L, A>(fa: Either<L, A>): fa is Left<L, A> => ...
```

Added in v1.0.0

# isRight (function)

Returns `true` if the either is an instance of `Right`, `false` otherwise

**Signature**

```ts
export const isRight = <L, A>(fa: Either<L, A>): fa is Right<L, A> => ...
```

Added in v1.0.0

# left (function)

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure

**Signature**

```ts
export const left = <L, A>(l: L): Either<L, A> => ...
```

Added in v1.0.0

# orElse (function)

**Signature**

```ts
export function orElse<E, A, M>(f: (e: E) => Either<M, A>): (ma: Either<E, A>) => Either<M, A> { ... }
```

Added in v1.19.0

# parseJSON (function)

Converts a JavaScript Object Notation (JSON) string into an object.

**Signature**

```ts
export const parseJSON = <L>(s: string, onError: (reason: unknown) => L): Either<L, unknown> => ...
```

**Example**

```ts
import { parseJSON, toError } from 'fp-ts/lib/Either'

assert.deepStrictEqual(parseJSON('{"a":1}', toError).value, { a: 1 })
assert.deepStrictEqual(parseJSON('{"a":}', toError).value, new SyntaxError('Unexpected token } in JSON at position 5'))
```

Added in v1.16.0

# right (function)

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure

**Signature**

```ts
export const right = <L, A>(a: A): Either<L, A> => ...
```

Added in v1.0.0

# stringifyJSON (function)

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

**Signature**

```ts
export const stringifyJSON = <L>(u: unknown, onError: (reason: unknown) => L): Either<L, string> => ...
```

**Example**

```ts
import { stringifyJSON, toError } from 'fp-ts/lib/Either'

assert.deepStrictEqual(stringifyJSON({ a: 1 }, toError).value, '{"a":1}')
const circular: any = { ref: null }
circular.ref = circular
assert.deepStrictEqual(stringifyJSON(circular, toError).value, new TypeError('Converting circular structure to JSON'))
```

Added in v1.16.0

# toError (function)

Default value for the optional `onerror` argument of `tryCatch`

**Signature**

```ts
export const toError = (e: unknown): Error => ...
```

Added in v1.0.0

# ~~tryCatch~~ (function)

Use `tryCatch2v` instead

**Signature**

```ts
export const tryCatch = <A>(f: Lazy<A>, onerror: (e: unknown) => Error = toError): Either<Error, A> => ...
```

Added in v1.0.0

# tryCatch2v (function)

Constructs a new `Either` from a function that might throw

**Signature**

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
