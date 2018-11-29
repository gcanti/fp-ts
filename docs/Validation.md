---
id: Validation
title: Module Validation
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts)

## validation

```ts
Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2v2<URI>
```

Added in v1.0.0 (instance)

# Validation

```ts
type Validation<L, A> = Failure<L, A> | Success<L, A>
```

Added in v1.0.0 (data)

The `Validation` functor, used for applicative validation

The `Applicative` instance collects multiple failures in an arbitrary `Semigroup`.

_Example_

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

assert.deepEqual(
  validatePerson({ name: '', age: '1.2' }),
  failure(new NonEmptyArray('Invalid name: empty string', ['Invalid age: not an integer 1.2']))
)

assert.deepEqual(validatePerson({ name: 'Giulio', age: '44' }), success({ name: 'Giulio', age: 44 }))
```

## bimap

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B>
```

Added in v1.0.0 (method)

## fold

```ts
<B>(failure: (l: L) => B, success: (a: A) => B): B
```

Added in v1.0.0 (method)

## getOrElse

```ts
(a: A): A
```

Added in v1.0.0 (method)

Returns the value from this `Success` or the given argument if this is a `Failure`

## getOrElseL

```ts
(f: (l: L) => A): A
```

Added in v1.0.0 (method)

Returns the value from this `Success` or the result of given argument if this is a `Failure`

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

## isFailure

```ts
(): this is Failure<L, A>
```

Added in v1.0.0 (method)

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

## isSuccess

```ts
(): this is Success<L, A>
```

Added in v1.0.0 (method)

Returns `true` if the validation is an instance of `Success`, `false` otherwise

## map

```ts
<B>(f: (a: A) => B): Validation<L, B>
```

Added in v1.0.0 (method)

## mapFailure

```ts
<M>(f: (l: L) => M): Validation<M, A>
```

Added in v1.0.0 (method)

## reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

Added in v1.0.0 (method)

## swap

```ts
(): Validation<A, L>
```

Added in v1.0.0 (method)

## toString

```ts
(): string
```

Added in v1.0.0 (method)

## failure

```ts
<L, A>(l: L): Validation<L, A>
```

Added in v1.0.0 (function)

## fromEither

```ts
<L, A>(e: Either<L, A>): Validation<L, A>
```

Added in v1.0.0 (function)

## fromPredicate

```ts
fromPredicate<L, A>(predicate: Predicate<A>, f: (a: A) => L): (a: A) => Validation<L, A>
```

Added in v1.0.0 (function)

## getAlt

```ts
<L>(S: Semigroup<L>): Alt2C<URI, L>
```

Added in v1.0.0 (function)

## getApplicative

```ts
<L>(S: Semigroup<L>): Applicative2C<URI, L>
```

Added in v1.0.0 (function)

_Example_

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

assert.deepEqual(validatePerson('Nicolas Bourbaki', 45), success({ name: 'Nicolas Bourbaki', age: 45 }))
assert.deepEqual(validatePerson('Nicolas Bourbaki', -1), failure(['invalid age']))
assert.deepEqual(validatePerson('', 0), failure(['invalid name', 'invalid age']))
```

## getCompactable

```ts
getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L>
```

Added in v1.7.0 (function)

Builds [Compactable](./Compactable.md) instance for [Validation](./Validation.md) given [Monoid](./Monoid.md) for the failure side

## getFilterable

```ts
getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L>
```

Added in v1.7.0 (function)

Builds [Filterable](./Filterable.md) instance for [Validation](./Validation.md) given [Monoid](./Monoid.md) for the left side

## getMonad

```ts
<L>(S: Semigroup<L>): Monad2C<URI, L>
```

Added in v1.0.0 (function)

## getMonoid

```ts
<L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Validation<L, A>>
```

Added in v1.0.0 (function)

## getSemigroup

```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Validation<L, A>>
```

Added in v1.0.0 (function)

## getSetoid

```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>>
```

Added in v1.0.0 (function)

## getWitherable

```ts
getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L>
```

Added in v1.7.0 (function)

Builds [Witherable](./Witherable.md) instance for [Validation](./Validation.md) given [Monoid](./Monoid.md) for the left side

## isFailure

```ts
<L, A>(fa: Validation<L, A>): fa is Failure<L, A>
```

Added in v1.0.0 (function)

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

## isSuccess

```ts
<L, A>(fa: Validation<L, A>): fa is Success<L, A>
```

Added in v1.0.0 (function)

Returns `true` if the validation is an instance of `Success`, `false` otherwise

## success

Alias of [of](#of)

Added in v1.0.0 (function)
