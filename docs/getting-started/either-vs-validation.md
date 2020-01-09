---
title: Either vs Validation
parent: Getting started
nav_order: 9
---

# Getting started with fp-ts: Either vs Validation

## The problem

Say you must implement a web form to signup for an account. The form contains two field: `username` and `password` and the following validation rules must hold:

- `username` must not be empty
- `username` can't have dashes in it
- `password` needs to have at least 6 characters
- `password` needs to have at least one capital letter
- `password` needs to have at least one number

## Either

The `Either<E, A>` type represents a computation that might fail with an error of type `E` or succeed with a value of type `A`, so is a good candidate for implementing our validation rules.

For example let's encode each `password` rule

```ts
import { Either, left, right } from 'fp-ts/lib/Either'

const minLength = (s: string): Either<string, string> =>
  s.length >= 6 ? right(s) : left('at least 6 characters')

const oneCapital = (s: string): Either<string, string> =>
  /[A-Z]/g.test(s) ? right(s) : left('at least one capital letter')

const oneNumber = (s: string): Either<string, string> =>
  /[0-9]/g.test(s) ? right(s) : left('at least one number')
```

We can chain all the rules using... `chain`

```ts
import { chain } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

const validatePassword = (s: string): Either<string, string> =>
  pipe(
    minLength(s),
    chain(oneCapital),
    chain(oneNumber)
  )
```

Because we are using `Either` the checks are **fail-fast**. That is, any failed check shortcircuits subsequent checks so we will only ever get one error.

```ts
console.log(validatePassword('ab'))
// => left("at least 6 characters")

console.log(validatePassword('abcdef'))
// => left("at least one capital letter")

console.log(validatePassword('Abcdef'))
// => left("at least one number")
```

However this could lead to a bad UX, it would be nice to have all of these errors be reported simultaneously.

The `Validation` abstraction may help here.

## Validation

Validations are much like `Either<E, A>`, they represent a computation that might fail with an error of type `E` or succeed with a value of type `A`, but as opposed to the usual computations involving `Either`, they are able to **collect multiple failures**.

In order to do that we must tell validations how to **combine two values** of type `E`.

That's what [Semigroup](./Semigroup) is all about: combining two values of the same type.

For example we can pack the errors into a non empty array.

The `'fp-ts/lib/Either'` module provides a `getValidation` function that, given a semigroup, returns an alternative [Applicative](./Applicative) instance for `Either`

```ts
import { getSemigroup } from 'fp-ts/lib/NonEmptyArray'
import { getValidation } from 'fp-ts/lib/Either'

const applicativeValidation = getValidation(getSemigroup<string>())
```

However in order to use `applicativeValidation` we must first redefine all the rules so that they return a value of type `Either<NonEmptyArray<string>, string>`.

Instead of rewriting all the previous functions, which is cumbersome, let's define a [combinator](../functional-design/combinators-part-I) that converts a check outputting an `Either<E, A>` into a check outputting a `Either<NonEmptyArray<E>, A>`

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { mapLeft } from 'fp-ts/lib/Either'

function lift<E, A>(check: (a: A) => Either<E, A>): (a: A) => Either<NonEmptyArray<E>, A> {
  return a =>
    pipe(
      check(a),
      mapLeft(a => [a])
    )
}

const minLengthV = lift(minLength)
const oneCapitalV = lift(oneCapital)
const oneNumberV = lift(oneNumber)
```

Let's put all together, I'm going to use the `sequenceT` helper which takes `n` actions and does them from left-to-right, returning the resulting tuple

```ts
import { sequenceT } from 'fp-ts/lib/Apply'
import { map } from 'fp-ts/lib/Either'

function validatePassword(s: string): Either<NonEmptyArray<string>, string> {
  return pipe(
    sequenceT(getValidation(getSemigroup<string>()))(
      minLengthV(s),
      oneCapitalV(s),
      oneNumberV(s)
    ),
    map(() => s)
  )
}
console.log(validatePassword('ab'))
// => left(["at least 6 characters", "at least one capital letter", "at least one number"])
```

## Appendix

Note that the `sequenceT` helper is able to handle actions with different types:

```ts
interface Person {
  name: string
  age: number
}

// Person constructor
const toPerson = ([name, age]: [string, number]): Person => ({
  name,
  age
})

const validateName = (s: string): Either<NonEmptyArray<string>, string> =>
  s.length === 0 ? left(['Invalid name']) : right(s)

const validateAge = (s: string): Either<NonEmptyArray<string>, number> =>
  isNaN(+s) ? left(['Invalid age']) : right(+s)

function validatePerson(name: string, age: string): Either<NonEmptyArray<string>, Person> {
  return pipe(
    sequenceT(applicativeValidation)(validateName(name), validateAge(age)),
    map(toPerson)
  )
}
```
