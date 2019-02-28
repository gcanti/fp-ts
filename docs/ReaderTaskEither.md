---
id: ReaderTaskEither
title: ReaderTaskEither
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts)

# ReaderTaskEither

**Signature** (data type)

```ts
export class ReaderTaskEither<E, L, A> {
  constructor(readonly value: (e: E) => TaskEither<L, A>) {}
  ...
}
```

## alt

**Signature** (method)

```ts
alt(fy: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A>  { ... }
```

Added in v1.6.0

## ap

**Signature** (method)

```ts
ap<B>(fab: ReaderTaskEither<E, L, (a: A) => B>): ReaderTaskEither<E, L, B>  { ... }
```

Added in v1.6.0

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: ReaderTaskEither<E, L, (b: B) => C>, fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, C>  { ... }
```

Added in v1.6.0

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method)

```ts
applyFirst<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, A>  { ... }
```

Added in v1.6.0

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method)

```ts
applySecond<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B>  { ... }
```

Added in v1.6.0

## bimap

**Signature** (method)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): ReaderTaskEither<E, V, B>  { ... }
```

Added in v1.6.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B>  { ... }
```

Added in v1.6.0

## fold

**Signature** (method)

```ts
fold<R>(left: (l: L) => R, right: (a: A) => R): Reader<E, Task<R>>  { ... }
```

Added in v1.6.0

## local

**Signature** (method)

```ts
local<E2 = E>(f: (e: E2) => E): ReaderTaskEither<E2, L, A>  { ... }
```

Added in v1.6.1

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): ReaderTaskEither<E, L, B>  { ... }
```

Added in v1.6.0

## mapLeft

**Signature** (method)

```ts
mapLeft<M>(f: (l: L) => M): ReaderTaskEither<E, M, A>  { ... }
```

Added in v1.6.0

## orElse

Transforms the failure value of the `ReaderTaskEither` into a new `ReaderTaskEither`

**Signature** (method)

```ts
orElse<M>(f: (l: L) => ReaderTaskEither<E, M, A>): ReaderTaskEither<E, M, A>  { ... }
```

Added in v1.6.0

## run

Runs the inner `TaskEither`

**Signature** (method)

```ts
run(e: E): Promise<Either<L, A>>  { ... }
```

Added in v1.6.0

Added in v1.6.0

## readerTaskEither

**Signature** (constant)

```ts
export const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadIO3<URI> & MonadTask3<URI> = ...
```

Added in v1.6.0

## readerTaskEitherSeq

Like `readerTaskEither` but `ap` is sequential

**Signature** (constant)

```ts
export const readerTaskEitherSeq: typeof readerTaskEither = ...
```

Added in v1.10.0

## ask

**Signature** (function)

```ts
export const ask = <E, L>(): ReaderTaskEither<E, L, E> => { ... }
```

Added in v1.6.0

## asks

**Signature** (function)

```ts
export const asks = <E, L, A>(f: (e: E) => A): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## fromEither

**Signature** (function)

```ts
export const fromEither = <E, L, A>(fa: Either<L, A>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## fromIO

**Signature** (function)

```ts
export const fromIO = <E, L, A>(fa: IO<A>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## fromIOEither

**Signature** (function)

```ts
export const fromIOEither = <E, L, A>(fa: IOEither<L, A>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## fromLeft

**Signature** (function)

```ts
export const fromLeft = <E, L, A>(l: L): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## fromPredicate

**Signature** (function)

```ts
export function fromPredicate<E, L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): ((a: A) => ReaderTaskEither<E, L, A>)  { ... }
```

Added in v1.6.0

## fromReader

**Signature** (function)

```ts
export const fromReader = <E, L, A>(fa: Reader<E, A>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## fromTaskEither

**Signature** (function)

```ts
export const fromTaskEither = <E, L, A>(fa: TaskEither<L, A>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## left

**Signature** (function)

```ts
export const left = <E, L, A>(fa: Task<L>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## local

**Signature** (function)

```ts
export const local = <E, E2 = E>(f: (e: E2) => E) => <L, A>(
  fa: ReaderTaskEither<E, L, A>
): ReaderTaskEither<E2, L, A> => { ... }
```

Added in v1.6.0

## right

**Signature** (function)

```ts
export const right = <E, L, A>(fa: Task<A>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## tryCatch

**Signature** (function)

```ts
export const tryCatch = <E, L, A>(
  f: (e: E) => Promise<A>,
  onrejected: (reason: unknown, e: E) => L
): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0
