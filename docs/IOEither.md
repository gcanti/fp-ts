---
id: IOEither
title: Module IOEither
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts)

## ioEither

```ts
Monad2<URI> & Bifunctor2<URI> & Alt2<URI>
```

Added in v1.6.0 (instance)

# IOEither

```ts
constructor(readonly value: IO<Either<L, A>>) {}
```

Added in v1.6.0 (data)

`IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `L`. If you want to represent a synchronous computation that never fails, please see [IO](./IO.md).

## alt

```ts
(fy: IOEither<L, A>): IOEither<L, A>
```

Added in v1.6.0 (method)

## ap

```ts
<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B>
```

Added in v1.6.0 (method)

## ap\_

```ts
<B, C>(this: IOEither<L, (b: B) => C>, fb: IOEither<L, B>): IOEither<L, C>
```

Added in v1.6.0 (method)

Flipped version of [ap](#ap)

## applyFirst

```ts
<B>(fb: IOEither<L, B>): IOEither<L, A>
```

Added in v1.6.0 (method)

Combine two effectful actions, keeping only the result of the first

## applySecond

```ts
<B>(fb: IOEither<L, B>): IOEither<L, B>
```

Added in v1.6.0 (method)

Combine two effectful actions, keeping only the result of the second

## bimap

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B>
```

Added in v1.6.0 (method)

## chain

```ts
<B>(f: (a: A) => IOEither<L, B>): IOEither<L, B>
```

Added in v1.6.0 (method)

## fold

```ts
<R>(left: (l: L) => R, right: (a: A) => R): IO<R>
```

Added in v1.6.0 (method)

## map

```ts
<B>(f: (a: A) => B): IOEither<L, B>
```

Added in v1.6.0 (method)

## mapLeft

```ts
<M>(f: (l: L) => M): IOEither<M, A>
```

Added in v1.6.0 (method)

## orElse

```ts
<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A>
```

Added in v1.6.0 (method)

## run

```ts
(): Either<L, A>
```

Added in v1.6.0 (method)

Runs the inner io

## fromEither

```ts
<L, A>(fa: Either<L, A>): IOEither<L, A>
```

Added in v1.6.0 (function)

## fromLeft

```ts
<L, A>(l: L): IOEither<L, A>
```

Added in v1.6.0 (function)

## left

```ts
<L, A>(fa: IO<L>): IOEither<L, A>
```

Added in v1.6.0 (function)

## right

```ts
<L, A>(fa: IO<A>): IOEither<L, A>
```

Added in v1.6.0 (function)

## tryCatch

```ts
<A>(f: Lazy<A>, onerror: (reason: unknown) => Error = toError): IOEither<Error, A>
```

Added in v1.6.0 (function)
