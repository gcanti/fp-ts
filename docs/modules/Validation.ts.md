---
title: Validation.ts
nav_order: 93
parent: Modules
---

# Overview

The `Validation` functor, used for applicative validation

The `Applicative` instance collects multiple failures in an arbitrary `Semigroup`.

Adapted from https://github.com/purescript/purescript-validation

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [Validation (type alias)](#validation-type-alias)
- [Failure (class)](#failure-class)
  - [map (method)](#map-method)
  - [bimap (method)](#bimap-method)
  - [reduce (method)](#reduce-method)
  - [fold (method)](#fold-method)
  - [getOrElse (method)](#getorelse-method)
  - [getOrElseL (method)](#getorelsel-method)
  - [mapFailure (method)](#mapfailure-method)
  - [swap (method)](#swap-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
  - [isFailure (method)](#isfailure-method)
  - [isSuccess (method)](#issuccess-method)
- [Success (class)](#success-class)
  - [map (method)](#map-method-1)
  - [bimap (method)](#bimap-method-1)
  - [reduce (method)](#reduce-method-1)
  - [fold (method)](#fold-method-1)
  - [getOrElse (method)](#getorelse-method-1)
  - [getOrElseL (method)](#getorelsel-method-1)
  - [mapFailure (method)](#mapfailure-method-1)
  - [swap (method)](#swap-method-1)
  - [inspect (method)](#inspect-method-1)
  - [toString (method)](#tostring-method-1)
  - [isFailure (method)](#isfailure-method-1)
  - [isSuccess (method)](#issuccess-method-1)
- [URI (constant)](#uri-constant)
- [validation (constant)](#validation-constant)
- [failure (function)](#failure-function)
- [fromEither (function)](#fromeither-function)
- [fromPredicate (function)](#frompredicate-function)
- [getAlt (function)](#getalt-function)
- [getApplicative (function)](#getapplicative-function)
- [getCompactable (function)](#getcompactable-function)
- [getFilterable (function)](#getfilterable-function)
- [getMonad (function)](#getmonad-function)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getSetoid (function)](#getsetoid-function)
- [getWitherable (function)](#getwitherable-function)
- [isFailure (function)](#isfailure-function)
- [isSuccess (function)](#issuccess-function)
- [success (function)](#success-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Validation (type alias)

**Signature**

```ts
export type Validation<L, A> = Failure<L, A> | Success<L, A>
```

**Example**

```ts
import { Validation, getApplicative, success, failure } from 'fp-ts/lib/Validation'
import { NonEmptyArray, getSemigroup } from 'fp-ts/lib/NonEmptyArray'

interface Person {
  readonly name: string
  readonly age: number
}

// curried constructor
const person = (name: string) => (age: number): Person => ({ name, age })

// validators
function validateName(input: string): Validation<NonEmptyArray<string>, string> {
  return input.length === 0 ? failure(new NonEmptyArray('Invalid name: empty string', [])) : success(input)
}
function validateAge(input: string): Validation<NonEmptyArray<string>, number> {
  const n = parseFloat(input)
  if (isNaN(n)) {
    return failure(new NonEmptyArray(`Invalid age: not a number ${input}`, []))
  }
  return n % 1 !== 0 ? failure(new NonEmptyArray(`Invalid age: not an integer ${n}`, [])) : success(n)
}

// get an `Applicative` instance for Validation<NonEmptyArray<string>, ?>
const A = getApplicative(getSemigroup<string>())

function validatePerson(input: Record<string, string>): Validation<NonEmptyArray<string>, Person> {
  return A.ap(validateName(input['name']).map(person), validateAge(input['age']))
}

assert.deepStrictEqual(
  validatePerson({ name: '', age: '1.2' }),
  failure(new NonEmptyArray('Invalid name: empty string', ['Invalid age: not an integer 1.2']))
)

assert.deepStrictEqual(validatePerson({ name: 'Giulio', age: '44' }), success({ name: 'Giulio', age: 44 }))
```

Added in v1.0.0

# Failure (class)

**Signature**

```ts
export class Failure<L, A> {
  constructor(readonly value: L) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Validation<L, B> { ... }
```

## bimap (method)

**Signature**

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## fold (method)

**Signature**

```ts
fold<B>(failure: (l: L) => B, success: (a: A) => B): B { ... }
```

## getOrElse (method)

Returns the value from this `Success` or the given argument if this is a `Failure`

**Signature**

```ts
getOrElse(a: A): A { ... }
```

## getOrElseL (method)

Returns the value from this `Success` or the result of given argument if this is a `Failure`

**Signature**

```ts
getOrElseL(f: (l: L) => A): A { ... }
```

## mapFailure (method)

**Signature**

```ts
mapFailure<M>(f: (l: L) => M): Validation<M, A> { ... }
```

## swap (method)

**Signature**

```ts
swap(): Validation<A, L> { ... }
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

## isFailure (method)

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

**Signature**

```ts
isFailure(): this is Failure<L, A> { ... }
```

## isSuccess (method)

Returns `true` if the validation is an instance of `Success`, `false` otherwise

**Signature**

```ts
isSuccess(): this is Success<L, A> { ... }
```

# Success (class)

**Signature**

```ts
export class Success<L, A> {
  constructor(readonly value: A) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Validation<L, B> { ... }
```

## bimap (method)

**Signature**

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## fold (method)

**Signature**

```ts
fold<B>(failure: (l: L) => B, success: (a: A) => B): B { ... }
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

## mapFailure (method)

**Signature**

```ts
mapFailure<M>(f: (l: L) => M): Validation<M, A> { ... }
```

## swap (method)

**Signature**

```ts
swap(): Validation<A, L> { ... }
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

## isFailure (method)

**Signature**

```ts
isFailure(): this is Failure<L, A> { ... }
```

## isSuccess (method)

**Signature**

```ts
isSuccess(): this is Success<L, A> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# validation (constant)

**Signature**

```ts
export const validation: Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = ...
```

Added in v1.0.0

# failure (function)

**Signature**

```ts
export const failure = <L, A>(l: L): Validation<L, A> => ...
```

Added in v1.0.0

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
import { getArraySemigroup } from 'fp-ts/lib/Semigroup'

interface Person {
  name: string
  age: number
}

const person = (name: string) => (age: number): Person => ({ name, age })

const validateName = (name: string): Validation<string[], string> =>
  name.length === 0 ? failure(['invalid name']) : success(name)

const validateAge = (age: number): Validation<string[], number> =>
  age > 0 && age % 1 === 0 ? success(age) : failure(['invalid age'])

const A = getApplicative(getArraySemigroup<string>())

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

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Validation<L, A>> => ...
```

Added in v1.0.0

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
export const isFailure = <L, A>(fa: Validation<L, A>): fa is Failure<L, A> => ...
```

Added in v1.0.0

# isSuccess (function)

Returns `true` if the validation is an instance of `Success`, `false` otherwise

**Signature**

```ts
export const isSuccess = <L, A>(fa: Validation<L, A>): fa is Success<L, A> => ...
```

Added in v1.0.0

# success (function)

**Signature**

```ts
export const success = <L, A>(a: A): Validation<L, A> => ...
```

Added in v1.0.0
