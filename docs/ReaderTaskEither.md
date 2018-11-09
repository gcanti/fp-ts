---
id: ReaderTaskEither
title: Module ReaderTaskEither
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts)

## readerTaskEither

```ts
Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadIO3<URI> & MonadTask3<URI>
```

Added in v1.6.0 (instance)

## readerTaskEitherSeq

```ts
typeof readerTaskEither
```

Added in v1.10.0 (instance)

Like [readerTaskEither](#readertaskeither) but `ap` is sequential

# ReaderTaskEither

```ts
constructor(readonly value: (e: E) => TaskEither<L, A>) {}
```

Added in v1.6.0 (data)

## alt

```ts
(fy: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A>
```

Added in v1.6.0 (method)

## ap

```ts
<B>(fab: ReaderTaskEither<E, L, (a: A) => B>): ReaderTaskEither<E, L, B>
```

Added in v1.6.0 (method)

## ap\_

```ts
<B, C>(this: ReaderTaskEither<E, L, (b: B) => C>, fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, C>
```

Added in v1.6.0 (method)

Flipped version of [ap](#ap)

## applyFirst

```ts
<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, A>
```

Added in v1.6.0 (method)

Combine two effectful actions, keeping only the result of the first

## applySecond

```ts
<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B>
```

Added in v1.6.0 (method)

Combine two effectful actions, keeping only the result of the second

## bimap

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): ReaderTaskEither<E, V, B>
```

Added in v1.6.0 (method)

## chain

```ts
<B>(f: (a: A) => ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B>
```

Added in v1.6.0 (method)

## fold

```ts
<R>(left: (l: L) => R, right: (a: A) => R): Reader<E, Task<R>>
```

Added in v1.6.0 (method)

## local

```ts
<E2 = E>(f: (e: E2) => E): ReaderTaskEither<E2, L, A>
```

Added in v1.6.1 (method)

## map

```ts
<B>(f: (a: A) => B): ReaderTaskEither<E, L, B>
```

Added in v1.6.0 (method)

## mapLeft

```ts
<M>(f: (l: L) => M): ReaderTaskEither<E, M, A>
```

Added in v1.6.0 (method)

## orElse

```ts
<M>(f: (l: L) => ReaderTaskEither<E, M, A>): ReaderTaskEither<E, M, A>
```

Added in v1.6.0 (method)

Transforms the failure value of the `ReaderTaskEither` into a new `ReaderTaskEither`

## run

```ts
(e: E): Promise<Either<L, A>>
```

Added in v1.6.0 (method)

Runs the inner `TaskEither`

## ask

```ts
<E, L>(): ReaderTaskEither<E, L, E>
```

Added in v1.6.0 (function)

## asks

```ts
<E, L, A>(f: (e: E) => A): ReaderTaskEither<E, L, A>
```

Added in v1.6.0 (function)

## fromEither

```ts
<E, L, A>(fa: Either<L, A>): ReaderTaskEither<E, L, A>
```

Added in v1.6.0 (function)

## fromIO

```ts
<E, L, A>(fa: IO<A>): ReaderTaskEither<E, L, A>
```

Added in v1.6.0 (function)

## fromIOEither

```ts
<E, L, A>(fa: IOEither<L, A>): ReaderTaskEither<E, L, A>
```

Added in v1.6.0 (function)

## fromLeft

```ts
<E, L, A>(l: L): ReaderTaskEither<E, L, A>
```

Added in v1.6.0 (function)

## fromPredicate

```ts
<E, L, A>(
  predicate: Predicate<A>,
  whenFalse: (a: A) => L
): ((a: A) => ReaderTaskEither<E, L, A>)
```

Added in v1.6.0 (function)

## fromReader

```ts
<E, L, A>(fa: Reader<E, A>): ReaderTaskEither<E, L, A>
```

Added in v1.6.0 (function)

## fromTaskEither

```ts
<E, L, A>(fa: TaskEither<L, A>): ReaderTaskEither<E, L, A>
```

Added in v1.6.0 (function)

## left

```ts
<E, L, A>(fa: Task<L>): ReaderTaskEither<E, L, A>
```

Added in v1.6.0 (function)

## local

```ts
<E, E2 = E>(f: (e: E2) => E) => <L, A>(
  fa: ReaderTaskEither<E, L, A>
): ReaderTaskEither<E2, L, A>
```

Added in v1.6.0 (function)

## right

```ts
<E, L, A>(fa: Task<A>): ReaderTaskEither<E, L, A>
```

Added in v1.6.0 (function)

## tryCatch

```ts
<E, L, A>(
  f: (e: E) => Promise<A>,
  onrejected: (reason: {}) => L
): ReaderTaskEither<E, L, A>
```

Added in v1.6.0 (function)
