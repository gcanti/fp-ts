# How `HKT`, `URI2HKT`, `URIS` and `Type` work

## Introduction

Here's the definition of `HKT`

```ts
// HKT.ts

export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}
```

and `Functor`

```ts
// Functor.ts
import { HKT } from 'fp-ts/lib/HKT'

export interface Functor<F> {
  readonly URI: F
  map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}

export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B> {
  return f => fa => F.map(fa, f)
}
```

We can define an instance of `Functor` for `Identity`

```ts
// Identity.ts
import { Functor } from 'fp-ts/lib/Functor'

export const URI = 'Identity'

export type URI = typeof URI

export class Identity<A> {
  readonly _A!: A // --> these phantom fields make `Identity` an `HKT`, note that both `A` and `URI` here are types
  readonly _URI!: URI // ----^
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Identity<B> {
    return new Identity(f(this.value))
  }
}

const map = <A, B>(fa: Identity<A>, f: (a: A) => B): Identity<B> => {
  return fa.map(f)
}

export const identity: Functor<URI> = {
  URI, // --> these fields make `identity` an instance of `Functor`, note that both `URI` and `map` here are values
  map // ----^
}
```

## The problem

`Identity` behaves as expected when using its `map`

```ts
const double = (n: number): number => n * 2

// x: Identity<number>
const x = Identity(1).map(double)
```

However there's a problem with functions which abstracts over `Functor` like `lift`

```ts
// liftedDouble: (fa: HKT<"Identity", number>) => HKT<"Identity", number>
const liftedDouble = lift(identity)(double)

// x: HKT<"Identity", number>
const x = liftedDouble(new Identity(1))
```

`x` is not usable

```ts
x.value // static error: Property 'value' does not exist on type 'HKT<"Identity", number>'
```

## The solution

We must somehow teach TypeScript that `HKT<"Identity", number>` is really `Identity<number>`, or more generally that
`HKT<"Identity", A>` is `Identity<A>` for all `A`.

### First step: build a type level map `URI -> Type constructor`

The type level map is named `URI2HKT`

```ts
// HKT.ts

export interface URI2HKT<A> {}
```

Adding an entry means to leverage the module augmentation feature

```ts
// Identity.ts

declare module './HKT' {
  interface URI2HKT<A> {
    Identity: Identity<A> // maps the key "Identity" to the type `Identity`
  }
}
```

**Note**. The value of the key must be the same value used to define the `URI` constant and type in the file
`Identity.ts`.

### Second step: add a specialized overloading to `lift`

If `F` is an `URI` which corresponds to a key in `URI2HKT` then we can add a specialized overloading for it to `lift`

```ts
import { HKT, URIS, Type } from 'fp-ts/lib/HKT'

// specialized overloading
export function lift<F extends URIS>(F: Functor1<F>): <A, B>(f: (a: A) => B) => (fa: Type<F, A>) => Type<F, B>
// keep the generic signature
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B> {
  return f => fa => F.map(f, fa)
}
```

### Third step: change the Identity instance

```ts
// Identity.ts
import { Functor1 } from 'fp-ts/lib/Functor'

export const identity: Functor1<URI> = {
  URI,
  map
}
```

As soon as we add the specialized overloading we get the desired behavior

```ts
// liftedDouble: (fa: Identity<number>) => Identity<number>
const liftedDouble = lift(identity)(double)

// x: Identity<number>
const x = liftedDouble(new Identity(1))

x.value // ok
```

## Higher kinded types

Those steps handle type constructors of kind `* -> *`, we must repeat the process for type constructors with higher
kind, leading to

* `HKT2`, `URI2HKT2`, `URIS2`, `Type2` for type constructors with kind `* -> * -> *`
* `HKT3`, `URI2HKT3`, `URIS3`, `Type3` for type constructors with kind `* -> * -> * -> *`
