---
title: Either.ts
nav_order: 26
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
import { either } from 'fp-ts/lib/Either'

either.map(right(12), double) // right(24)
either.map(left(23), double) // left(23)
```

---

<h2 class="text-delta">Table of contents</h2>

- [Left (interface)](#left-interface)
- [Right (interface)](#right-interface)
- [Either (type alias)](#either-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [either (constant)](#either-constant)
- [elem (function)](#elem-function)
- [filterOrElse (function)](#filterorelse-function)
- [fold (function)](#fold-function)
- [fromNullable (function)](#fromnullable-function)
- [fromOption (function)](#fromoption-function)
- [fromPredicate (function)](#frompredicate-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getCompactable (function)](#getcompactable-function)
- [getEq (function)](#geteq-function)
- [getFilterable (function)](#getfilterable-function)
- [getOrElse (function)](#getorelse-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getShow (function)](#getshow-function)
- [getValidationAlt (function)](#getvalidationalt-function)
- [getValidationApplicative (function)](#getvalidationapplicative-function)
- [getValidationMonad (function)](#getvalidationmonad-function)
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
- [swap (function)](#swap-function)
- [toError (function)](#toerror-function)
- [tryCatch (function)](#trycatch-function)

---

# Left (interface)

**Signature**

```ts
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}
```

Added in v2.0.0

# Right (interface)

**Signature**

```ts
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}
```

Added in v2.0.0

# Either (type alias)

**Signature**

```ts
export type Either<E, A> = Left<E> | Right<A>
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

# either (constant)

**Signature**

```ts
export const either: Monad2<URI> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI> = ...
```

Added in v2.0.0

# elem (function)

**Signature**

```ts
export function elem<A>(E: Eq<A>): <E>(a: A, ma: Either<E, A>) => boolean { ... }
```

Added in v2.0.0

# filterOrElse (function)

**Signature**

```ts
export function filterOrElse<E, A, B extends A>(
  refinement: Refinement<A, B>,
  onFalse: (a: A) => E
): (ma: Either<E, A>) => Either<E, B>
export function filterOrElse<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A> { ... }
```

Added in v2.0.0

# fold (function)

**Signature**

```ts
export function fold<E, A, R>(onLeft: (e: E) => R, onRight: (a: A) => R): (ma: Either<E, A>) => R { ... }
```

Added in v2.0.0

# fromNullable (function)

Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`

**Signature**

```ts
export function fromNullable<E, A>(a: A | null | undefined, e: E): Either<E, A> { ... }
```

Added in v2.0.0

# fromOption (function)

**Signature**

```ts
export function fromOption<E, A>(ma: Option<A>, onNone: () => E): Either<E, A> { ... }
```

Added in v2.0.0

# fromPredicate (function)

**Signature**

```ts
export function fromPredicate<E, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => E
): (a: A) => Either<E, B>
export function fromPredicate<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Either<E, A> { ... }
```

Added in v2.0.0

# getApplyMonoid (function)

**Signature**

```ts
export function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<Either<E, A>> { ... }
```

Added in v2.0.0

# getApplySemigroup (function)

`Apply` semigroup

**Signature**

```ts
export function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<Either<E, A>> { ... }
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

Added in v2.0.0

# getCompactable (function)

Builds `Compactable` instance for `Either` given a `Monoid` for the left side

**Signature**

```ts
export function getCompactable<E>(M: Monoid<E>): Compactable2C<URI, E> { ... }
```

Added in v2.0.0

# getEq (function)

**Signature**

```ts
export function getEq<E, A>(EL: Eq<E>, EA: Eq<A>): Eq<Either<E, A>> { ... }
```

Added in v2.0.0

# getFilterable (function)

Builds `Filterable` instance for `Either` given a `Monoid` for the left side

**Signature**

```ts
export function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E> { ... }
```

Added in v2.0.0

# getOrElse (function)

**Signature**

```ts
export function getOrElse<E, A>(f: (e: E) => A): (ma: Either<E, A>) => A { ... }
```

Added in v2.0.0

# getSemigroup (function)

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
appended using the provided `Semigroup`

**Signature**

```ts
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<Either<E, A>> { ... }
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

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<Either<E, A>> { ... }
```

Added in v2.0.0

# getValidationAlt (function)

**Signature**

```ts
export function getValidationAlt<E>(S: Semigroup<E>): Alt2C<URI, E> { ... }
```

Added in v2.0.0

# getValidationApplicative (function)

**Signature**

```ts
export function getValidationApplicative<E>(
  S: Semigroup<E>
): Applicative2C<URI, E> & Foldable2C<URI, E> & Traversable2C<URI, E> & Bifunctor2C<URI, E> & Extend2C<URI, E> { ... }
```

# getValidationMonad (function)

**Note**: This function is here just to avoid switching to / from `Either`

**Signature**

```ts
export function getValidationMonad<E>(
  S: Semigroup<E>
): Monad2C<URI, E> & Foldable2C<URI, E> & Traversable2C<URI, E> & Bifunctor2C<URI, E> & Extend2C<URI, E> { ... }
```

Added in v2.0.0

# getValidationMonoid (function)

**Signature**

```ts
export function getValidationMonoid<E, A>(SE: Semigroup<E>, SA: Monoid<A>): Monoid<Either<E, A>> { ... }
```

Added in v2.0.0

# getValidationSemigroup (function)

**Signature**

```ts
export function getValidationSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<Either<E, A>> { ... }
```

Added in v2.0.0

# getWitherable (function)

Builds `Witherable` instance for `Either` given `Monoid` for the left side

**Signature**

```ts
export function getWitherable<E>(M: Monoid<E>): Witherable2C<URI, E> { ... }
```

Added in v2.0.0

# isLeft (function)

Returns `true` if the either is an instance of `Left`, `false` otherwise

**Signature**

```ts
export function isLeft<E, A>(ma: Either<E, A>): ma is Left<E> { ... }
```

Added in v2.0.0

# isRight (function)

Returns `true` if the either is an instance of `Right`, `false` otherwise

**Signature**

```ts
export function isRight<E, A>(ma: Either<E, A>): ma is Right<A> { ... }
```

Added in v2.0.0

# left (function)

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure

**Signature**

```ts
export function left<E>(e: E): Either<E, never> { ... }
```

Added in v2.0.0

# orElse (function)

**Signature**

```ts
export function orElse<E, A, M>(f: (e: E) => Either<M, A>): (ma: Either<E, A>) => Either<M, A> { ... }
```

Added in v2.0.0

# parseJSON (function)

Converts a JavaScript Object Notation (JSON) string into an object.

**Signature**

```ts
export function parseJSON<E>(s: string, onError: (reason: unknown) => E): Either<E, unknown> { ... }
```

**Example**

```ts
import { parseJSON, toError, right, left } from 'fp-ts/lib/Either'

assert.deepStrictEqual(parseJSON('{"a":1}', toError), right({ a: 1 }))
assert.deepStrictEqual(parseJSON('{"a":}', toError), left(new SyntaxError('Unexpected token } in JSON at position 5')))
```

Added in v2.0.0

# right (function)

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure

**Signature**

```ts
export function right<A>(a: A): Either<never, A> { ... }
```

Added in v2.0.0

# stringifyJSON (function)

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

**Signature**

```ts
export function stringifyJSON<E>(u: unknown, onError: (reason: unknown) => E): Either<E, string> { ... }
```

**Example**

```ts
import { stringifyJSON, toError, right, left } from 'fp-ts/lib/Either'

assert.deepStrictEqual(stringifyJSON({ a: 1 }, toError), right('{"a":1}'))
const circular: any = { ref: null }
circular.ref = circular
assert.deepStrictEqual(stringifyJSON(circular, toError), left(new TypeError('Converting circular structure to JSON')))
```

Added in v2.0.0

# swap (function)

**Signature**

```ts
export function swap<E, A>(ma: Either<E, A>): Either<A, E> { ... }
```

Added in v2.0.0

# toError (function)

Default value for the `onError` argument of `tryCatch`

**Signature**

```ts
export function toError(e: unknown): Error { ... }
```

Added in v2.0.0

# tryCatch (function)

Constructs a new `Either` from a function that might throw

**Signature**

```ts
export function tryCatch<E, A>(f: Lazy<A>, onError: (e: unknown) => E): Either<E, A> { ... }
```

**Example**

```ts
import { Either, left, right, tryCatch } from 'fp-ts/lib/Either'

const unsafeHead = <A>(as: Array<A>): A => {
  if (as.length > 0) {
    return as[0]
  } else {
    throw new Error('empty array')
  }
}

const head = <A>(as: Array<A>): Either<Error, A> => {
  return tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
}

assert.deepStrictEqual(head([]), left(new Error('empty array')))
assert.deepStrictEqual(head([1, 2, 3]), right(1))
```

Added in v2.0.0
