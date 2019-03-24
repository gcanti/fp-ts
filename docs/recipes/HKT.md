---
title: Write type class instances
parent: Recipes
nav_order: 5
---

# How to write type class instances for your data type

Let's start from a simple data structure: `Identity`

```ts
// Identity.ts

export class Identity<A> {
  constructor(readonly value: A) {}
}
```

## Functor instance

Let's see how to add an instance of the `Functor` type class for `Identity`

```ts
// Identity.ts

import { Functor1 } from 'fp-ts/lib/Functor'

export const URI = 'Identity'

export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    Identity: Identity<A>
  }
}

export class Identity<A> {
  constructor(readonly value: A) {}
}

const map = <A, B>(fa: Identity<A>, f: (a: A) => B): Identity<B> => new Identity(f(fa.value))

// Functor instance
export const identity: Functor1<URI> = {
  URI,
  map
}
```

Here's the definition of `Functor1`

```ts
// fp-ts/lib/Functor.ts

export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(fa: Type<F, A>, f: (a: A) => B) => Type<F, B>
}
```

So what's `URI2HKT`, `URIS` and `Type`?

`URI2HKT` is type-level map, it maps a `URI` to a concrete data type, and is populated using the [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) feature

```ts
// fp-ts/lib/HKT.ts

export interface URI2HKT<A> {}
```

```ts
// Identity.ts

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    Identity: Identity<A> // maps the key "Identity" to the type `Identity`
  }
}
```

`URIS` is just `keyof URI2HKT<any>` and is used as a constraint in the `Functor1` interface

`Type<F, A>` is using `URI2HKT` internally so is able to project an abstract data type to a concrete data type.
So if `URI = 'Identity'`, then `Type<URI, number>` is `Identity<number>`.

**Note**. When possible `fp-ts` also defines a `map` method on the data structure in order to provide chainable APIs

```ts
// Identity.ts

export class Identity<A> {
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Identity<B> {
    return new Identity(f(this.value))
  }
}

const map = <A, B>(fa: Identity<A>, f: (a: A) => B): Identity<B> => fa.map(f)

// Functor instance
export const identity: Functor1<URI> = {
  URI,
  map
}
```

## What about type constructors of kind `* -> * -> *`?

There's another triple for that: `URI2HKT2`, `URIS2` and `Type2`

Example: `Either`

```ts
// Either.ts

import { Functor2 } from 'fp-ts/lib/Functor'

export const URI = 'Either'

export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    Either: Either<L, A>
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>

export class Left<L, A> {
  readonly _tag = 'Left'
  constructor(readonly value: L) {}
  map<B>(f: (a: A) => B): Either<L, B> {
    return new Left(this.value)
  }
}

export class Right<L, A> {
  readonly _tag = 'Right'
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Either<L, B> {
    return new Right(f(this.value))
  }
}

const map = <L, A, B>(fa: Either<L, A>, f: (a: A) => B): Either<L, B> => fa.map(f)

// Functor instance
export const either: Functor2<URI> = {
  URI,
  map
}
```

And here's the definition of `Functor2`

```ts
// fp-ts/lib/Functor.ts

export interface Functor2<F extends URIS2> {
  readonly URI: F
  readonly map: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => B) => Type2<F, L, B>
}
```

## How to type functions which abstracts over type classes

Let's see how to type `lift`

```ts
import { HKT } from 'fp-ts/lib/HKT'

export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B> {
  return f => fa => F.map(fa, f)
}
```

Here's the definition of `HKT`

```ts
// fp-ts/lib/HKT.ts

export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}
```

The `HKT` type represents a type constructor of kind `* -> *`.

There are other `HKT<n>` types defined in the `fp-ts/lib/HKT.ts`, one for each kind (up to four):

- `HKT2` for type constructors of kind `* -> * -> *`
- `HKT3` for type constructors of kind `* -> * -> * -> *`
- `HKT4` for type constructors of kind `* -> * -> * -> * -> *`

There's a problem though, this doesn't type check

```ts
const double = (n: number): number => n * 2

//                        v-- the Functor instance of Identity
const doubleIdentity = lift(identity)(double)
```

With the following error

```
Argument of type 'Functor2<"Either">' is not assignable to parameter of type 'Functor<"Either">'
```

We need to add some overloading, one for each kind we want to support

```ts
export function lift<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
export function lift<F extends URIS>(F: Functor1<F>): <A, B>(f: (a: A) => B) => (fa: Type<F, A>) => Type<F, B>
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B> {
  return f => fa => F.map(fa, f)
}
```

Now we can lift `double` to both `Identity` and `Either`

```ts
//                        v-- the Functor instance of Identity
const doubleIdentity = lift(identity)(double)

//                        v-- the Functor instance of Either
const doubleEither = lift(either)(double)
```

- `doubleIdentity` has type `(fa: Identity<number>) => Identity<number>`
- `doubleEither` has type `<L>(fa: Either<L, number>) => Either<L, number>`
