---
id: Validation
title: Module Validation
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts)

## Data

### Validation

_data_

_since 1.0.0_

_Signature_

```ts
type Validation<L, A> = Failure<L, A> | Success<L, A>
```

_Description_

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

console.log(validatePerson({ name: '', age: '1.2' }))
// failure(new NonEmptyArray("Invalid name: empty string", ["Invalid age: not an integer 1.2"]))

console.log(validatePerson({ name: 'Giulio', age: '44' }))
// success({ "name": "Giulio", "age": 44 })
```

## Methods

### bimap

_method_

_since 1.0.0_

_Signature_

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B>
```

### fold

_method_

_since 1.0.0_

_Signature_

```ts
<B>(failure: (l: L) => B, success: (a: A) => B): B
```

### getOrElse

_method_

_since 1.0.0_

_Signature_

```ts
(a: A): A
```

_Description_

Returns the value from this `Success` or the given argument if this is a `Failure`

### getOrElseL

_method_

_since 1.0.0_

_Signature_

```ts
(f: (l: L) => A): A
```

_Description_

Returns the value from this `Success` or the result of given argument if this is a `Failure`

### inspect

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

### isFailure

_method_

_since 1.0.0_

_Signature_

```ts
(): this is Failure<L, A>
```

_Description_

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

### isSuccess

_method_

_since 1.0.0_

_Signature_

```ts
(): this is Success<L, A>
```

_Description_

Returns `true` if the validation is an instance of `Success`, `false` otherwise

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): Validation<L, B>
```

### mapFailure

_method_

_since 1.0.0_

_Signature_

```ts
<M>(f: (l: L) => M): Validation<M, A>
```

### reduce

_method_

_since 1.0.0_

_Signature_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### swap

_method_

_since 1.0.0_

_Signature_

```ts
(): Validation<A, L>
```

### toString

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

## Instances

### validation

_instance_

_since 1.0.0_

_Signature_

```ts
Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI>
```

## Functions

### failure

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(l: L): Validation<L, A>
```

### fromEither

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(e: Either<L, A>): Validation<L, A>
```

### fromPredicate

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(predicate: Predicate<A>, f: (a: A) => L) => (a: A): Validation<L, A>
```

### getAlt

_function_

_since 1.0.0_

_Signature_

```ts
<L>(S: Semigroup<L>): Alt2C<URI, L>
```

### getApplicative

_function_

_since 1.0.0_

_Signature_

```ts
<L>(S: Semigroup<L>): Applicative2C<URI, L>
```

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

console.log(validatePerson('Nicolas Bourbaki', 45)) // success({ "name": "Nicolas Bourbaki", "age": 45 })
console.log(validatePerson('Nicolas Bourbaki', -1)) // failure(["invalid age"])
console.log(validatePerson('', 0)) // failure(["invalid name", "invalid age"])
```

### getCompactable

_function_

_since 1.7.0_

_Signature_

```ts
getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L>
```

_Description_

Builds [Compactable](./Compactable.md) instance for [Validation](./Validation.md) given [Monoid](./Monoid.md) for the failure side

### getFilterable

_function_

_since 1.7.0_

_Signature_

```ts
getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L>
```

_Description_

Builds [Filterable](./Filterable.md) instance for [Validation](./Validation.md) given [Monoid](./Monoid.md) for the left side

### getMonad

_function_

_since 1.0.0_

_Signature_

```ts
<L>(S: Semigroup<L>): Monad2C<URI, L>
```

### getMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Validation<L, A>>
```

### getSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Validation<L, A>>
```

### getSetoid

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>>
```

### getWitherable

_function_

_since 1.7.0_

_Signature_

```ts
getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L>
```

_Description_

Builds [Witherable](./Witherable.md) instance for [Validation](./Validation.md) given [Monoid](./Monoid.md) for the left side

### isFailure

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: Validation<L, A>): fa is Failure<L, A>
```

_Description_

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

### isSuccess

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: Validation<L, A>): fa is Success<L, A>
```

_Description_

Returns `true` if the validation is an instance of `Success`, `false` otherwise

### success

_function_

_since 1.0.0_
Alias of

_Signature_

```ts
of
```
