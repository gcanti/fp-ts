---
title: Validation.ts
nav_order: 93
---

# Overview

The `Validation` functor, used for applicative validation

The `Applicative` instance collects multiple failures in an arbitrary `Semigroup`.

Adapted from https://github.com/purescript/purescript-validation

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [URI](#uri)
- [Validation](#validation)
- [Failure](#failure)
  - [map](#map)
  - [bimap](#bimap)
  - [reduce](#reduce)
  - [fold](#fold)
  - [getOrElse](#getorelse)
  - [getOrElseL](#getorelsel)
  - [mapFailure](#mapfailure)
  - [swap](#swap)
  - [inspect](#inspect)
  - [toString](#tostring)
  - [isFailure](#isfailure)
  - [isSuccess](#issuccess)
- [Success](#success)
  - [map](#map-1)
  - [bimap](#bimap-1)
  - [reduce](#reduce-1)
  - [fold](#fold-1)
  - [getOrElse](#getorelse-1)
  - [getOrElseL](#getorelsel-1)
  - [mapFailure](#mapfailure-1)
  - [swap](#swap-1)
  - [inspect](#inspect-1)
  - [toString](#tostring-1)
  - [isFailure](#isfailure-1)
  - [isSuccess](#issuccess-1)
- [URI](#uri-1)
- [validation](#validation)
- [failure](#failure)
- [fromEither](#fromeither)
- [fromPredicate](#frompredicate)
- [getAlt](#getalt)
- [getApplicative](#getapplicative)
- [getCompactable](#getcompactable)
- [getFilterable](#getfilterable)
- [getMonad](#getmonad)
- [getMonoid](#getmonoid)
- [getSemigroup](#getsemigroup)
- [getSetoid](#getsetoid)
- [getWitherable](#getwitherable)
- [isFailure](#isfailure-2)
- [isSuccess](#issuccess-2)
- [success](#success)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# Validation

**Signature** (type alias)

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

# Failure

**Signature** (class)

```ts
export class Failure<L, A> {
  constructor(readonly value: L) { ... }
  ...
}
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Validation<L, B> { ... }
```

## bimap

**Signature** (method)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B> { ... }
```

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## fold

**Signature** (method)

```ts
fold<B>(failure: (l: L) => B, success: (a: A) => B): B { ... }
```

## getOrElse

Returns the value from this `Success` or the given argument if this is a `Failure`

**Signature** (method)

```ts
getOrElse(a: A): A { ... }
```

## getOrElseL

Returns the value from this `Success` or the result of given argument if this is a `Failure`

**Signature** (method)

```ts
getOrElseL(f: (l: L) => A): A { ... }
```

## mapFailure

**Signature** (method)

```ts
mapFailure<M>(f: (l: L) => M): Validation<M, A> { ... }
```

## swap

**Signature** (method)

```ts
swap(): Validation<A, L> { ... }
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

## isFailure

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

**Signature** (method)

```ts
isFailure(): this is Failure<L, A> { ... }
```

## isSuccess

Returns `true` if the validation is an instance of `Success`, `false` otherwise

**Signature** (method)

```ts
isSuccess(): this is Success<L, A> { ... }
```

# Success

**Signature** (class)

```ts
export class Success<L, A> {
  constructor(readonly value: A) { ... }
  ...
}
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Validation<L, B> { ... }
```

## bimap

**Signature** (method)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B> { ... }
```

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## fold

**Signature** (method)

```ts
fold<B>(failure: (l: L) => B, success: (a: A) => B): B { ... }
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

## mapFailure

**Signature** (method)

```ts
mapFailure<M>(f: (l: L) => M): Validation<M, A> { ... }
```

## swap

**Signature** (method)

```ts
swap(): Validation<A, L> { ... }
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

## isFailure

**Signature** (method)

```ts
isFailure(): this is Failure<L, A> { ... }
```

## isSuccess

**Signature** (method)

```ts
isSuccess(): this is Success<L, A> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# validation

**Signature** (constant)

```ts
export const validation: Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = ...
```

Added in v1.0.0

# failure

**Signature** (function)

```ts
export const failure = <L, A>(l: L): Validation<L, A> => ...
```

Added in v1.0.0

# fromEither

**Signature** (function)

```ts
export const fromEither = <L, A>(e: Either<L, A>): Validation<L, A> => ...
```

Added in v1.0.0

# fromPredicate

**Signature** (function)

```ts
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  f: (a: A) => L
): (a: A) => Validation<L, B>
export function fromPredicate<L, A>(predicate: Predicate<A>, f: (a: A) => L): (a: A) => Validation<L, A>
export function fromPredicate<L, A>(predicate: Predicate<A>, f: (a: A) => L): (a: A) => Validation<L, A> { ... }
```

Added in v1.0.0

# getAlt

**Signature** (function)

```ts
export const getAlt = <L>(S: Semigroup<L>): Alt2C<URI, L> => ...
```

Added in v1.0.0

# getApplicative

**Signature** (function)

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

# getCompactable

Builds `Compactable` instance for `Validation` given `Monoid` for the failure side

**Signature** (function)

```ts
export function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L> { ... }
```

Added in v1.7.0

# getFilterable

Builds `Filterable` instance for `Validation` given `Monoid` for the left side

**Signature** (function)

```ts
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L> { ... }
```

Added in v1.7.0

# getMonad

**Note**: This function is here just to avoid switching to / from `Either`

**Signature** (function)

```ts
export const getMonad = <L>(S: Semigroup<L>): Monad2C<URI, L> => ...
```

Added in v1.0.0

# getMonoid

**Signature** (function)

```ts
export const getMonoid = <L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Validation<L, A>> => ...
```

Added in v1.0.0

# getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Validation<L, A>> => ...
```

Added in v1.0.0

# getSetoid

**Signature** (function)

```ts
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>> => ...
```

Added in v1.0.0

# getWitherable

Builds `Witherable` instance for `Validation` given `Monoid` for the left side

**Signature** (function)

```ts
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L> { ... }
```

Added in v1.7.0

# isFailure

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

**Signature** (function)

```ts
export const isFailure = <L, A>(fa: Validation<L, A>): fa is Failure<L, A> => ...
```

Added in v1.0.0

# isSuccess

Returns `true` if the validation is an instance of `Success`, `false` otherwise

**Signature** (function)

```ts
export const isSuccess = <L, A>(fa: Validation<L, A>): fa is Success<L, A> => ...
```

Added in v1.0.0

# success

**Signature** (function)

```ts
export const success = <L, A>(a: A): Validation<L, A> => ...
```

Added in v1.0.0
