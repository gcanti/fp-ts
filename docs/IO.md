---
id: IO
title: Module IO
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts)

## io

**Signature** (instance)

```ts
export const io: Monad1<URI> & MonadIO1<URI> = { ... }
```

Added in v1.0.0

# IO

**Signature** (data type)

```ts
export class IO<A> {
  constructor(readonly run: Lazy<A>) {}
  ...
}
```

`IO<A>` represents a synchronous computation that yields a value of type `A` and **never fails**.
If you want to represent a synchronous computation that may fail, please see [IOEither](./IOEither.md).

## ap

**Signature** (method)

```ts
ap<B>(fab: IO<(a: A) => B>): IO<B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method)

```ts
ap_<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C>  { ... }
```

Added in v1.0.0

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method)

```ts
applyFirst<B>(fb: IO<B>): IO<A>  { ... }
```

Added in v1.6.0

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method)

```ts
applySecond<B>(fb: IO<B>): IO<B>  { ... }
```

Added in v1.5.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => IO<B>): IO<B>  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): IO<B>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## getMonoid

**Signature** (function)

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => { ... }
```

Added in v1.0.0

## getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => { ... }
```

Added in v1.0.0
