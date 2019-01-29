---
id: IOEither
title: Module IOEither
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts)

## ioEither

**Signature** (instance)

```ts
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> = { ... }
```

Added in v1.6.0

# IOEither

**Signature** (data type)

```ts
export class IOEither<L, A> {
  constructor(readonly value: IO<Either<L, A>>) {}
  ...
}
```

`IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `L`. If you want to represent a synchronous computation that never fails, please see [IO](./IO.md).

## alt

**Signature** (method)

```ts
alt(fy: IOEither<L, A>): IOEither<L, A>  { ... }
```

Added in v1.6.0

## ap

**Signature** (method)

```ts
ap<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B>  { ... }
```

Added in v1.6.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method)

```ts
ap_<B, C>(this: IOEither<L, (b: B) => C>, fb: IOEither<L, B>): IOEither<L, C>  { ... }
```

Added in v1.6.0

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method)

```ts
applyFirst<B>(fb: IOEither<L, B>): IOEither<L, A>  { ... }
```

Added in v1.6.0

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method)

```ts
applySecond<B>(fb: IOEither<L, B>): IOEither<L, B>  { ... }
```

Added in v1.6.0

## bimap

**Signature** (method)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B>  { ... }
```

Added in v1.6.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => IOEither<L, B>): IOEither<L, B>  { ... }
```

Added in v1.6.0

## fold

**Signature** (method)

```ts
fold<R>(left: (l: L) => R, right: (a: A) => R): IO<R>  { ... }
```

Added in v1.6.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): IOEither<L, B>  { ... }
```

Added in v1.6.0

## mapLeft

**Signature** (method)

```ts
mapLeft<M>(f: (l: L) => M): IOEither<M, A>  { ... }
```

Added in v1.6.0

## orElse

**Signature** (method)

```ts
orElse<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A>  { ... }
```

Added in v1.6.0

## run

Runs the inner io

**Signature** (method)

```ts
run(): Either<L, A>  { ... }
```

Added in v1.6.0

Added in v1.6.0

## fromEither

**Signature** (function)

```ts
export const fromEither = <L, A>(fa: Either<L, A>): IOEither<L, A> => { ... }
```

Added in v1.6.0

## fromLeft

**Signature** (function)

```ts
export const fromLeft = <L, A>(l: L): IOEither<L, A> => { ... }
```

Added in v1.6.0

## left

**Signature** (function)

```ts
export const left = <L, A>(fa: IO<L>): IOEither<L, A> => { ... }
```

Added in v1.6.0

## right

**Signature** (function)

```ts
export const right = <L, A>(fa: IO<A>): IOEither<L, A> => { ... }
```

Added in v1.6.0

## ~~tryCatch~~ (deprecated)

Use [tryCatch2v](#trycatch2v)

**Signature** (function)

```ts
export const tryCatch = <A>(f: Lazy<A>, onerror: (reason: unknown) => Error = toError): IOEither<Error, A> => { ... }
```

Added in v1.6.0

## tryCatch2v

**Signature** (function)

```ts
export const tryCatch2v = <L, A>(f: Lazy<A>, onerror: (reason: unknown) => L): IOEither<L, A> => { ... }
```

Added in v1.11.0
