---
title: Write type class instances
parent: Guides
nav_order: 2
---

# How to write type class instances for your data type

Let's start from a simple data structure: `Identity`

```ts
// Identity.ts

export type Identity<A> = A
```

## Functor instance

Let's see how to add an instance of the `Functor` type class for `Identity`

```ts
// Identity.ts

import { Functor1 } from 'fp-ts/Functor'

export const URI = 'Identity'

export type URI = typeof URI

declare module 'fp-ts/HKT' {
  interface URItoKind<A> {
    readonly Identity: Identity<A>
  }
}

export type Identity<A> = A

// Functor instance
export const Functor: Functor1<URI> = {
  URI,
  map: (ma, f) => f(ma)
}
```

Here's the definition of `Functor1`

```ts
// fp-ts/Functor.ts

export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(fa: Kind<F, A>, f: (a: A) => B) => Kind<F, B>
}
```

So what's `URItoKind`, `URIS` and `Kind`?

`URItoKind` is type-level map, it maps a `URI` to a concrete data type, and is populated using the [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) feature

```ts
// fp-ts/HKT.ts

export interface URItoKind<A> {}
```

```ts
// Identity.ts

declare module 'fp-ts/HKT' {
  interface URItoKind<A> {
    readonly Identity: Identity<A> // maps the key "Identity" to the type `Identity`
  }
}
```

`URIS` is just `keyof URItoKind<any>` and is used as a constraint in the `Functor1` interface

`Kind<F, A>` is using `URItoKind` internally so is able to project an abstract data type to a concrete data type.
So if `URI = 'Identity'`, then `Kind<URI, number>` is `Identity<number>`.

## What about type constructors of kind `* -> * -> *`?

There's another triple for that: `URItoKind2`, `URIS2` and `Kind2`

Example: `Either`

```ts
// Either.ts

import { Functor2 } from 'fp-ts/Functor'

export const URI = 'Either'

export type URI = typeof URI

declare module 'fp-ts/HKT' {
  interface URItoKind2<E, A> {
    readonly Either: Either<E, A>
  }
}

export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

export type Either<E, A> = Left<E> | Right<A>

export const right = <A, E = never>(a: A): Either<E, A> => ({ _tag: 'Right', right: a })

// Functor instance
export const Functor: Functor2<URI> = {
  URI,
  map: (ma, f) => (ma._tag === 'Left' ? ma : right(f(ma.right)))
}
```

And here's the definition of `Functor2`

```ts
// fp-ts/Functor.ts

export interface Functor2<F extends URIS2> {
  readonly URI: F
  readonly map: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}
```

## How to type functions which abstracts over type classes

Let's see how to type `lift`

```ts
import { HKT } from 'fp-ts/HKT'

export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B> {
  return (f) => (fa) => F.map(fa, f)
}
```

Here's the definition of `HKT`

```ts
// fp-ts/HKT.ts

export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}
```

The `HKT` type represents a type constructor of kind `* -> *`.

There are other `HKT<n>` types defined in the `fp-ts/HKT.ts`, one for each kind (up to four):

- `HKT2` for type constructors of kind `* -> * -> *`
- `HKT3` for type constructors of kind `* -> * -> * -> *`
- `HKT4` for type constructors of kind `* -> * -> * -> * -> *`

There's a problem though, this doesn't type check

```ts
const double = (n: number): number => n * 2

//                             v-- the Functor instance of Identity
const doubleIdentity = lift(identity)(double)
```

With the following error

```
Argument of type 'Functor1<"Identity">' is not assignable to parameter of type 'Functor<"Identity">'
```

We need to add some overloading, one for each kind we want to support

```ts
export function lift<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
export function lift<F extends URIS>(F: Functor1<F>): <A, B>(f: (a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B> {
  return (f) => (fa) => F.map(fa, f)
}
```

Now we can lift `double` to both `Identity` and `Either`

```ts
//                             v-- the Functor instance of Identity
const doubleIdentity = lift(identity)(double)

//                           v-- the Functor instance of Either
const doubleEither = lift(either)(double)
```

- `doubleIdentity` has type `(fa: Identity<number>) => Identity<number>`
- `doubleEither` has type `<E>(fa: Either<E, number>) => Either<E, number>`
