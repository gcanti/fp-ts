---
id: Validation
title: Validation
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts)

# Validation

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L77-L77)

```ts
export type Validation<L, A> = Failure<L, A> | Success<L, A>

export class Failure<L, A> {
  constructor(readonly value: L) {}
  ...
}

export class Success<L, A> {
  constructor(readonly value: A) {}
  ...
}
```

The `Validation` functor, used for applicative validation

The `Applicative` instance collects multiple failures in an arbitrary `Semigroup`.

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

## bimap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L88-L90)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B>  { ... }
```

Added in v1.0.0

## fold

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L94-L96)

```ts
fold<B>(failure: (l: L) => B, success: (a: A) => B): B  { ... }
```

Added in v1.0.0

## getOrElse

Returns the value from this `Success` or the given argument if this is a `Failure`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L98-L100)

```ts
getOrElse(a: A): A  { ... }
```

Added in v1.0.0

## getOrElseL

Returns the value from this `Success` or the result of given argument if this is a `Failure`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L102-L104)

```ts
getOrElseL(f: (l: L) => A): A  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L111-L113)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## isFailure

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L118-L120)

```ts
isFailure(): this is Failure<L, A>  { ... }
```

Added in v1.0.0

## isSuccess

Returns `true` if the validation is an instance of `Success`, `false` otherwise

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L122-L124)

```ts
isSuccess(): this is Success<L, A>  { ... }
```

Added in v1.0.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L85-L87)

```ts
map<B>(f: (a: A) => B): Validation<L, B>  { ... }
```

Added in v1.0.0

## mapFailure

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L105-L107)

```ts
mapFailure<M>(f: (l: L) => M): Validation<M, A>  { ... }
```

Added in v1.0.0

## reduce

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L91-L93)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.0.0

## swap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L108-L110)

```ts
swap(): Validation<A, L>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L114-L116)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## success

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L292-L292)

```ts
export const success = ...
```

Added in v1.0.0

## validation

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L530-L539)

```ts
export const validation: Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = ...
```

Added in v1.0.0

## failure

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L284-L286)

```ts
export const failure = <L, A>(l: L): Validation<L, A> => { ... }
```

Added in v1.0.0

## fromEither

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L309-L311)

```ts
export const fromEither = <L, A>(e: Either<L, A>): Validation<L, A> => { ... }
```

Added in v1.0.0

## fromPredicate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L302-L304)

```ts
export function fromPredicate<L, A>(predicate: Predicate<A>, f: (a: A) => L): (a: A) => Validation<L, A>  { ... }
```

Added in v1.0.0

## getAlt

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L344-L354)

```ts
export const getAlt = <L>(S: Semigroup<L>): Alt2C<URI, L> => { ... }
```

Added in v1.0.0

## getApplicative

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L218-L236)

```ts
export const getApplicative = <L>(S: Semigroup<L>): Applicative2C<URI, L> => { ... }
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

## getCompactable

Builds [Compactable](./Compactable.md) instance for [Validation](./Validation.md) given [Monoid](./Monoid.md) for the failure side

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L379-L414)

```ts
export function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L>  { ... }
```

Added in v1.7.0

## getFilterable

Builds [Filterable](./Filterable.md) instance for [Validation](./Validation.md) given [Monoid](./Monoid.md) for the left side

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L421-L491)

```ts
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L>  { ... }
```

Added in v1.7.0

## getMonad

**Note**: This function is here just to avoid switching to / from [Either](./Either.md)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L243-L252)

```ts
export const getMonad = <L>(S: Semigroup<L>): Monad2C<URI, L> => { ... }
```

Added in v1.0.0

## getMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L334-L339)

```ts
export const getMonoid = <L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Validation<L, A>> => { ... }
```

Added in v1.0.0

## getSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L316-L329)

```ts
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Validation<L, A>> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L174-L179)

```ts
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>> => { ... }
```

Added in v1.0.0

## getWitherable

Builds [Witherable](./Witherable.md) instance for [Validation](./Validation.md) given [Monoid](./Monoid.md) for the left side

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L498-L525)

```ts
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L>  { ... }
```

Added in v1.7.0

## isFailure

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L361-L363)

```ts
export const isFailure = <L, A>(fa: Validation<L, A>): fa is Failure<L, A> => { ... }
```

Added in v1.0.0

## isSuccess

Returns `true` if the validation is an instance of `Success`, `false` otherwise

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts#L370-L372)

```ts
export const isSuccess = <L, A>(fa: Validation<L, A>): fa is Success<L, A> => { ... }
```

Added in v1.0.0

## success

Alias of [of](#of)

Added in v1.0.0
