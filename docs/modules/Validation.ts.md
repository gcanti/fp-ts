---
title: Validation.ts
nav_order: 92
parent: Modules
---

# Overview

The `Validation` functor, used for applicative validation

The `Applicative` instance collects multiple failures in an arbitrary `Semigroup`.

Adapted from https://github.com/purescript/purescript-validation

---

<h2 class="text-delta">Table of contents</h2>

- [Failure (interface)](#failure-interface)
- [Success (interface)](#success-interface)
- [URI (type alias)](#uri-type-alias)
- [Validation (type alias)](#validation-type-alias)
- [URI (constant)](#uri-constant)
- [validation (constant)](#validation-constant)
- [failure (function)](#failure-function)
- [filterOrElse (function)](#filterorelse-function)
- [filterOrElseL (function)](#filterorelsel-function)
- [fold (function)](#fold-function)
- [fromEither (function)](#fromeither-function)
- [fromPredicate (function)](#frompredicate-function)
- [getAlt (function)](#getalt-function)
- [getApplicative (function)](#getapplicative-function)
- [getCompactable (function)](#getcompactable-function)
- [getFilterable (function)](#getfilterable-function)
- [getMonad (function)](#getmonad-function)
- [getMonadThrow (function)](#getmonadthrow-function)
- [getMonoid (function)](#getmonoid-function)
- [getOrElse (function)](#getorelse-function)
- [getOrElseL (function)](#getorelsel-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getSetoid (function)](#getsetoid-function)
- [getShow (function)](#getshow-function)
- [getWitherable (function)](#getwitherable-function)
- [isFailure (function)](#isfailure-function)
- [isSuccess (function)](#issuccess-function)
- [mapFailure (function)](#mapfailure-function)
- [orElse (function)](#orelse-function)
- [success (function)](#success-function)
- [swap (function)](#swap-function)
- [tryCatch (function)](#trycatch-function)

---

# Failure (interface)

**Signature**

```ts
export interface Failure<L> {
  readonly _tag: 'Failure'
  readonly value: L
}
```

# Success (interface)

**Signature**

```ts
export interface Success<A> {
  readonly _tag: 'Success'
  readonly value: A
}
```

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Validation (type alias)

**Signature**

```ts
export type Validation<L, A> = Failure<L> | Success<A>
```

**Example**

```ts
import { Validation, getApplicative, success, failure } from 'fp-ts/lib/Validation'
import { NonEmptyArray, getSemigroup, make } from 'fp-ts/lib/NonEmptyArray'

interface Person {
  readonly name: string
  readonly age: number
}

// curried constructor
const person = (name: string) => (age: number): Person => ({ name, age })

// validators
function validateName(input: string): Validation<NonEmptyArray<string>, string> {
  return input.length === 0 ? failure(make<string>('Invalid name: empty string', [])) : success(input)
}
function validateAge(input: string): Validation<NonEmptyArray<string>, number> {
  const n = parseFloat(input)
  if (isNaN(n)) {
    return failure(make<string>(`Invalid age: not a number ${input}`, []))
  }
  return n % 1 !== 0 ? failure(make<string>(`Invalid age: not an integer ${n}`, [])) : success(n)
}

// get an `Applicative` instance for Validation<NonEmptyArray<string>, ?>
const A = getApplicative(getSemigroup<string>())

function validatePerson(input: Record<string, string>): Validation<NonEmptyArray<string>, Person> {
  return A.ap(A.map(validateName(input['name']), person), validateAge(input['age']))
}

assert.deepStrictEqual(
  validatePerson({ name: '', age: '1.2' }),
  failure(make<string>('Invalid name: empty string', ['Invalid age: not an integer 1.2']))
)

assert.deepStrictEqual(validatePerson({ name: 'Giulio', age: '44' }), success({ name: 'Giulio', age: 44 }))
```

Added in v1.0.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# validation (constant)

**Signature**

```ts
export const validation: Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI> = ...
```

Added in v1.0.0

# failure (function)

**Signature**

```ts
export const failure = <L>(l: L): Validation<L, never> => ...
```

Added in v1.0.0

# filterOrElse (function)

**Signature**

```ts
export function filterOrElse<L, A, B extends A>(
  ma: Validation<L, A>,
  refinement: Refinement<A, B>,
  zero: L
): Validation<L, B>
export function filterOrElse<L, A>(ma: Validation<L, A>, predicate: Predicate<A>, zero: L): Validation<L, A> { ... }
```

Added in v2.0.0

# filterOrElseL (function)

**Signature**

```ts
export function filterOrElseL<L, A, B extends A>(
  ma: Validation<L, A>,
  refinement: Refinement<A, B>,
  zero: (a: A) => L
): Validation<L, B>
export function filterOrElseL<L, A>(ma: Validation<L, A>, predicate: Predicate<A>, zero: (a: A) => L): Validation<L, A> { ... }
```

Added in v2.0.0

# fold (function)

**Signature**

```ts
export function fold<L, A, R>(ma: Validation<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R): R { ... }
```

Added in v2.0.0

# fromEither (function)

**Signature**

```ts
export const fromEither = <L, A>(e: Either<L, A>): Validation<L, A> => ...
```

Added in v1.0.0

# fromPredicate (function)

**Signature**

```ts
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  f: (a: A) => L
): (a: A) => Validation<L, B>
export function fromPredicate<L, A>(predicate: Predicate<A>, f: (a: A) => L): (a: A) => Validation<L, A> { ... }
```

Added in v1.0.0

# getAlt (function)

**Signature**

```ts
export const getAlt = <L>(S: Semigroup<L>): Alt2C<URI, L> => ...
```

Added in v1.0.0

# getApplicative (function)

**Signature**

```ts
export const getApplicative = <L>(S: Semigroup<L>): Applicative2C<URI, L> => ...
```

**Example**

```ts
import { Validation, success, failure, getApplicative } from 'fp-ts/lib/Validation'
import { getArrayMonoid } from 'fp-ts/lib/Monoid'

interface Person {
  name: string
  age: number
}

const person = (name: string) => (age: number): Person => ({ name, age })

const validateName = (name: string): Validation<string[], string> =>
  name.length === 0 ? failure(['invalid name']) : success(name)

const validateAge = (age: number): Validation<string[], number> =>
  age > 0 && age % 1 === 0 ? success(age) : failure(['invalid age'])

const A = getApplicative(getArrayMonoid<string>())

const validatePerson = (name: string, age: number): Validation<string[], Person> =>
  A.ap(A.map(validateName(name), person), validateAge(age))

assert.deepStrictEqual(validatePerson('Nicolas Bourbaki', 45), success({ name: 'Nicolas Bourbaki', age: 45 }))
assert.deepStrictEqual(validatePerson('Nicolas Bourbaki', -1), failure(['invalid age']))
assert.deepStrictEqual(validatePerson('', 0), failure(['invalid name', 'invalid age']))
```

Added in v1.0.0

# getCompactable (function)

Builds `Compactable` instance for `Validation` given `Monoid` for the failure side

**Signature**

```ts
export function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L> { ... }
```

Added in v1.7.0

# getFilterable (function)

Builds `Filterable` instance for `Validation` given `Monoid` for the left side

**Signature**

```ts
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L> { ... }
```

Added in v1.7.0

# getMonad (function)

**Note**: This function is here just to avoid switching to / from `Either`

**Signature**

```ts
export const getMonad = <L>(S: Semigroup<L>): Monad2C<URI, L> => ...
```

Added in v1.0.0

# getMonadThrow (function)

**Signature**

```ts
export const getMonadThrow = <L>(S: Semigroup<L>): MonadThrow2C<URI, L> => ...
```

Added in v1.16.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Validation<L, A>> => ...
```

Added in v1.0.0

# getOrElse (function)

**Signature**

```ts
export function getOrElse<L, A>(ma: Validation<L, A>, a: A): A { ... }
```

Added in v2.0.0

# getOrElseL (function)

**Signature**

```ts
export function getOrElseL<L, A>(ma: Validation<L, A>, f: (l: L) => A): A { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Validation<L, A>> => ...
```

Added in v1.0.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>> => ...
```

Added in v1.0.0

# getShow (function)

**Signature**

```ts
export const getShow = <L, A>(SL: Show<L>, SA: Show<A>): Show<Validation<L, A>> => ...
```

Added in v1.17.0

# getWitherable (function)

Builds `Witherable` instance for `Validation` given `Monoid` for the left side

**Signature**

```ts
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L> { ... }
```

Added in v1.7.0

# isFailure (function)

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

**Signature**

```ts
export const isFailure = <L, A>(fa: Validation<L, A>): fa is Failure<L> => ...
```

Added in v1.0.0

# isSuccess (function)

Returns `true` if the validation is an instance of `Success`, `false` otherwise

**Signature**

```ts
export const isSuccess = <L, A>(fa: Validation<L, A>): fa is Success<A> => ...
```

Added in v1.0.0

# mapFailure (function)

**Signature**

```ts
export function mapFailure<L, A, M>(ma: Validation<L, A>, f: (l: L) => M): Validation<M, A> { ... }
```

Added in v2.0.0

# orElse (function)

**Signature**

```ts
export function orElse<L, A, M>(ma: Validation<L, A>, f: (l: L) => Validation<M, A>): Validation<M, A> { ... }
```

Added in v2.0.0

# success (function)

**Signature**

```ts
export const success = <A>(a: A): Validation<never, A> => ...
```

Added in v1.0.0

# swap (function)

**Signature**

```ts
export function swap<L, A>(ma: Validation<L, A>): Validation<A, L> { ... }
```

Added in v2.0.0

# tryCatch (function)

Constructs a new `Validation` from a function that might throw

**Signature**

```ts
export const tryCatch = <L, A>(f: Lazy<A>, onError: (e: unknown) => L): Validation<L, A> => ...
```

**Example**

```ts
import { Validation, failure, success, tryCatch } from 'fp-ts/lib/Validation'

const unsafeHead = <A>(as: Array<A>): A => {
  if (as.length > 0) {
    return as[0]
  } else {
    throw new Error('empty array')
  }
}

const head = <A>(as: Array<A>): Validation<Error, A> => {
  return tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
}

assert.deepStrictEqual(head([]), failure(new Error('empty array')))
assert.deepStrictEqual(head([1, 2, 3]), success(1))
```

Added in v1.16.0
