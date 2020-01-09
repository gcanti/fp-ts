---
title: Smart constructors
parent: Functional design
nav_order: 4
---

# Functional design: smart constructors

Sometimes you need guarantees about the values in your program beyond what can be accomplished with the usual type system checks. Smart constructors can be used for this purpose.

## The Problem

```ts
interface Person {
  name: string
  age: number
}

function person(name: string, age: number): Person {
  return { name, age }
}

const p = person('', -1.2) // no error
```

As you can see, `string` and `number` are broad types. How can I define a non empty string? Or positive numbers? Or integers? Or positive integers?

More generally:

> how can I define a **refinement** of a type `T`?

## The recipe

1. define a type `R` which represents the refinement
2. do **not** export a constructor for `R`
3. do export a function (the **smart constructor**) with the following signature

```ts
make: (t: T) => Option<R>
```

## A possible implementation: branded types

A **branded type** is a type `T` intersected with a _unique_ brand

```ts
type BrandedT = T & Brand
```

Let's implement `NonEmptyString` following the recipe above:

1. define a type `NonEmptyString` which represents the refinement

```ts
export interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol // ensures uniqueness across modules / packages
}

export type NonEmptyString = string & NonEmptyStringBrand
```

2. do **not** export a constructor for `NonEmptyString`

```ts
// DON'T do this
export function nonEmptyString(s: string): NonEmptyString { ... }
```

3. do export a smart constructor `make: (s: string) => Option<NonEmptyString>`

```ts
import { Option, none, some } from 'fp-ts/lib/Option'

// runtime check implemented as a custom type guard
function isNonEmptyString(s: string): s is NonEmptyString {
  return s.length > 0
}

export function makeNonEmptyString(s: string): Option<NonEmptyString> {
  return isNonEmptyString(s) ? some(s) : none
}
```

Let's do the same thing for the `age` field

```ts
export interface IntBrand {
  readonly Int: unique symbol
}

export type Int = number & IntBrand

function isInt(n: number): n is Int {
  return Number.isInteger(n) && n >= 0
}

export function makeInt(n: number): Option<Int> {
  return isInt(n) ? some(n) : none
}
```

Usage

```ts
interface Person {
  name: NonEmptyString
  age: Int
}

function person(name: NonEmptyString, age: Int): Person {
  return { name, age }
}

person('', -1.2) // static error

const goodName = makeNonEmptyString('Giulio')
const badName = makeNonEmptyString('')
const goodAge = makeInt(45)
const badAge = makeInt(-1.2)

import { option } from 'fp-ts/lib/Option'

option.chain(goodName, name => option.map(goodAge, age => person(name, age))) // some({ "name": "Giulio", "age": 45 })

option.chain(badName, name => option.map(goodAge, age => person(name, age))) // none

option.chain(goodName, name => option.map(badAge, age => person(name, age))) // none
```

## Conclusion

This seems to just pushing the burden of the runtime check to the caller. That's fair, but the caller in turn might push this burden up to its caller, and so on until you reach the system boundary, where you _should_ do input validation anyway.

For a library that makes easy to do runtime validation at the system boundary and supports branded types, check out [io-ts](https://github.com/gcanti/io-ts)
