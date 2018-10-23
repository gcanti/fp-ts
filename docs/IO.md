---
id: IO
title: Module IO
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts)

# IO

```ts
constructor(readonly run: Lazy<A>) {}
```

Added in v1.0.0 (data)

`IO<A>` represents a synchronous computation that yields a value of type `A` and **never fails**.
If you want to represent a synchronous computation that may fail, please see [IOEither](./IOEither.md).

## ap

```ts
<B>(fab: IO<(a: A) => B>): IO<B>
```

Added in v1.0.0 (method)

## ap\_

```ts
<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C>
```

Added in v1.0.0 (method)

Flipped version of [ap](#ap)

## applyFirst

```ts
<B>(fb: IO<B>): IO<A>
```

Added in v1.6.0 (method)

Combine two effectful actions, keeping only the result of the first

## applySecond

```ts
<B>(fb: IO<B>): IO<B>
```

Added in v1.5.0 (method)

Combine two effectful actions, keeping only the result of the second

## chain

```ts
<B>(f: (a: A) => IO<B>): IO<B>
```

Added in v1.0.0 (method)

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

## map

```ts
<B>(f: (a: A) => B): IO<B>
```

Added in v1.0.0 (method)

## toString

```ts
(): string
```

Added in v1.0.0 (method)

## io

```ts
Monad1<URI> & MonadIO1<URI>
```

Added in v1.0.0 (instance)

## getMonoid

```ts
<A>(M: Monoid<A>): Monoid<IO<A>>
```

Added in v1.0.0 (function)

## getSemigroup

```ts
<A>(S: Semigroup<A>): Semigroup<IO<A>>
```

Added in v1.0.0 (function)
