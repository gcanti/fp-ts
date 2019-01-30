---
id: ReaderTaskEither
title: Module ReaderTaskEither
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts)

# ReaderTaskEither

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L33-L94)

```ts
export class ReaderTaskEither<E, L, A> {
  constructor(readonly value: (e: E) => TaskEither<L, A>) {}
  ...
}
```

## alt

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L82-L84)

```ts
alt(fy: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A>  { ... }
```

Added in v1.6.0

## ap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L46-L48)

```ts
ap<B>(fab: ReaderTaskEither<E, L, (a: A) => B>): ReaderTaskEither<E, L, B>  { ... }
```

Added in v1.6.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L52-L54)

```ts
ap_<B, C>(this: ReaderTaskEither<E, L, (b: B) => C>, fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, C>  { ... }
```

Added in v1.6.0

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L58-L60)

```ts
applyFirst<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, A>  { ... }
```

Added in v1.6.0

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L64-L66)

```ts
applySecond<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B>  { ... }
```

Added in v1.6.0

## bimap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L85-L87)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): ReaderTaskEither<E, V, B>  { ... }
```

Added in v1.6.0

## chain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L67-L69)

```ts
chain<B>(f: (a: A) => ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B>  { ... }
```

Added in v1.6.0

## fold

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L70-L72)

```ts
fold<R>(left: (l: L) => R, right: (a: A) => R): Reader<E, Task<R>>  { ... }
```

Added in v1.6.0

## local

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L91-L93)

```ts
local<E2 = E>(f: (e: E2) => E): ReaderTaskEither<E2, L, A>  { ... }
```

Added in v1.6.1

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L43-L45)

```ts
map<B>(f: (a: A) => B): ReaderTaskEither<E, L, B>  { ... }
```

Added in v1.6.0

## mapLeft

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L73-L75)

```ts
mapLeft<M>(f: (l: L) => M): ReaderTaskEither<E, M, A>  { ... }
```

Added in v1.6.0

## orElse

Transforms the failure value of the `ReaderTaskEither` into a new `ReaderTaskEither`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L79-L81)

```ts
orElse<M>(f: (l: L) => ReaderTaskEither<E, M, A>): ReaderTaskEither<E, M, A>  { ... }
```

Added in v1.6.0

## run

Runs the inner `TaskEither`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L40-L42)

```ts
run(e: E): Promise<Either<L, A>>  { ... }
```

Added in v1.6.0

Added in v1.6.0

## readerTaskEither

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L246-L256)

```ts
export const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadIO3<URI> & MonadTask3<URI> = ...
```

Added in v1.6.0

## readerTaskEitherSeq

Like [readerTaskEither](#readertaskeither) but `ap` is sequential

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L262-L265)

```ts
export const readerTaskEitherSeq: typeof readerTaskEither = ...
```

Added in v1.10.0

## ask

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L134-L136)

```ts
export const ask = <E, L>(): ReaderTaskEither<E, L, E> => { ... }
```

Added in v1.6.0

## asks

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L142-L144)

```ts
export const asks = <E, L, A>(f: (e: E) => A): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## fromEither

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L187-L189)

```ts
export const fromEither = <E, L, A>(fa: Either<L, A>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## fromIO

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L194-L196)

```ts
export const fromIO = <E, L, A>(fa: IO<A>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## fromIOEither

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L208-L210)

```ts
export const fromIOEither = <E, L, A>(fa: IOEither<L, A>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## fromLeft

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L201-L203)

```ts
export const fromLeft = <E, L, A>(l: L): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## fromPredicate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L223-L229)

```ts
export function fromPredicate<E, L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): ((a: A) => ReaderTaskEither<E, L, A>)  { ... }
```

Added in v1.6.0

## fromReader

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L180-L182)

```ts
export const fromReader = <E, L, A>(fa: Reader<E, A>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## fromTaskEither

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L172-L174)

```ts
export const fromTaskEither = <E, L, A>(fa: TaskEither<L, A>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## left

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L165-L167)

```ts
export const left = <E, L, A>(fa: Task<L>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## local

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L149-L153)

```ts
export const local = <E, E2 = E>(f: (e: E2) => E) => <L, A>(
  fa: ReaderTaskEither<E, L, A>
): ReaderTaskEither<E2, L, A> => { ... }
```

Added in v1.6.0

## right

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L158-L160)

```ts
export const right = <E, L, A>(fa: Task<A>): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0

## tryCatch

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts#L234-L239)

```ts
export const tryCatch = <E, L, A>(
  f: (e: E) => Promise<A>,
  onrejected: (reason: unknown, e: E) => L
): ReaderTaskEither<E, L, A> => { ... }
```

Added in v1.6.0
