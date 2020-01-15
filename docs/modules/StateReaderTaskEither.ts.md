---
title: StateReaderTaskEither.ts
nav_order: 83
parent: Modules
---

# StateReaderTaskEither overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [StateReaderTaskEither (interface)](#statereadertaskeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainEitherK](#chaineitherk)
- [chainFirst](#chainfirst)
- [chainIOEitherK](#chainioeitherk)
- [chainReaderTaskEitherK](#chainreadertaskeitherk)
- [chainTaskEitherK](#chaintaskeitherk)
- [evalState](#evalstate)
- [execState](#execstate)
- [filterOrElse](#filterorelse)
- [flatten](#flatten)
- [fromEither](#fromeither)
- [fromEitherK](#fromeitherk)
- [fromIOEither](#fromioeither)
- [fromIOEitherK](#fromioeitherk)
- [fromOption](#fromoption)
- [fromPredicate](#frompredicate)
- [fromReaderEither](#fromreadereither)
- [fromReaderTaskEither](#fromreadertaskeither)
- [fromReaderTaskEitherK](#fromreadertaskeitherk)
- [fromTaskEither](#fromtaskeither)
- [fromTaskEitherK](#fromtaskeitherk)
- [get](#get)
- [gets](#gets)
- [left](#left)
- [leftIO](#leftio)
- [leftReader](#leftreader)
- [leftState](#leftstate)
- [leftTask](#lefttask)
- [map](#map)
- [modify](#modify)
- [put](#put)
- [right](#right)
- [rightIO](#rightio)
- [rightReader](#rightreader)
- [rightState](#rightstate)
- [rightTask](#righttask)
- [run](#run)
- [stateReaderTaskEither](#statereadertaskeither)
- [stateReaderTaskEitherSeq](#statereadertaskeitherseq)

---

# StateReaderTaskEither (interface)

**Signature**

```ts
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, [A, S]>
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI

**Signature**

```ts
export const URI: "StateReaderTaskEither" = ...
```

Added in v2.0.0

# ap

**Signature**

```ts
<S, R, E, A>(fa: StateReaderTaskEither<S, R, E, A>) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
<S, R, E, B>(fb: StateReaderTaskEither<S, R, E, B>) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
<S, R, E, B>(fb: StateReaderTaskEither<S, R, E, B>) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

# chain

**Signature**

```ts
<S, R, E, A, B>(f: (a: A) => StateReaderTaskEither<S, R, E, B>) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

# chainEitherK

**Signature**

```ts
export function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# chainFirst

**Signature**

```ts
<S, R, E, A, B>(f: (a: A) => StateReaderTaskEither<S, R, E, B>) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

# chainIOEitherK

**Signature**

```ts
export function chainIOEitherK<E, A, B>(
  f: (a: A) => IOEither<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# chainReaderTaskEitherK

**Signature**

```ts
export function chainReaderTaskEitherK<R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# chainTaskEitherK

**Signature**

```ts
export function chainTaskEitherK<E, A, B>(
  f: (a: A) => TaskEither<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# evalState

Run a computation in the `StateReaderTaskEither` monad, discarding the final state

**Signature**

```ts
export const : <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => RTE.ReaderTaskEither<R, E, A> = ...
```

Added in v2.0.0

# execState

Run a computation in the `StateReaderTaskEither` monad discarding the result

**Signature**

```ts
export const : <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => RTE.ReaderTaskEither<R, E, S> = ...
```

Added in v2.0.0

# filterOrElse

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>; }
```

Added in v2.4.4

# flatten

**Signature**

```ts
<S, R, E, A>(mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

# fromEither

**Signature**

```ts
<S, R, E, A>(ma: Either<E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

# fromEitherK

**Signature**

```ts
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# fromIOEither

**Signature**

```ts
export function fromIOEither<S, R, E, A>(ma: IOEither<E, A>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# fromIOEitherK

**Signature**

```ts
export function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# fromOption

**Signature**

```ts
<E>(onNone: () => E) => <S, R, A>(ma: Option<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

# fromPredicate

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(a: A) => StateReaderTaskEither<S, R, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(a: A) => StateReaderTaskEither<S, R, E, A>; }
```

Added in v2.4.4

# fromReaderEither

**Signature**

```ts
export function fromReaderEither<S, R, E, A>(ma: ReaderEither<R, E, A>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# fromReaderTaskEither

**Signature**

```ts
export const : <S, R, E, A>(ma: RTE.ReaderTaskEither<R, E, A>) => StateReaderTaskEither<S, R, E, A> = ...
```

Added in v2.0.0

# fromReaderTaskEitherK

**Signature**

```ts
export function fromReaderTaskEitherK<R, E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => ReaderTaskEither<R, E, B>
): <S>(...a: A) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# fromTaskEither

**Signature**

```ts
export function fromTaskEither<S, R, E, A>(ma: TaskEither<E, A>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# fromTaskEitherK

**Signature**

```ts
export function fromTaskEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# get

Get the current state

**Signature**

```ts
export const get: <S, R, E = never>() => StateReaderTaskEither<S, R, E, S> = ...
```

Added in v2.0.0

# gets

Get a value which depends on the current state

**Signature**

```ts
export const gets: <S, R, E = never, A = never>(f: (s: S) => A) => StateReaderTaskEither<S, R, E, A> = ...
```

Added in v2.0.0

# left

**Signature**

```ts
export function left<S, R, E = never, A = never>(e: E): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# leftIO

**Signature**

```ts
export function leftIO<S, R, E = never, A = never>(me: IO<E>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# leftReader

**Signature**

```ts
export function leftReader<S, R, E = never, A = never>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# leftState

**Signature**

```ts
export function leftState<S, R, E = never, A = never>(me: State<S, E>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# leftTask

**Signature**

```ts
export function leftTask<S, R, E = never, A = never>(me: Task<E>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

# modify

Modify the state by applying a function to the current state

**Signature**

```ts
export const modify: <S, R, E = never>(f: (s: S) => S) => StateReaderTaskEither<S, R, E, void> = ...
```

Added in v2.0.0

# put

Set the state

**Signature**

```ts
export const put: <S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void> = ...
```

Added in v2.0.0

# right

**Signature**

```ts
export const right: <S, R, E = never, A = never>(a: A) => StateReaderTaskEither<S, R, E, A> = ...
```

Added in v2.0.0

# rightIO

**Signature**

```ts
export function rightIO<S, R, E = never, A = never>(ma: IO<A>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# rightReader

**Signature**

```ts
export function rightReader<S, R, E = never, A = never>(ma: Reader<R, A>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# rightState

**Signature**

```ts
export const : <S, R, E = never, A = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A> = ...
```

Added in v2.0.0

# rightTask

**Signature**

```ts
export function rightTask<S, R, E = never, A = never>(ma: Task<A>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# run

**Signature**

```ts
export function run<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S, r: R): Promise<Either<E, [A, S]>> { ... }
```

Added in v2.0.0

# stateReaderTaskEither

**Signature**

```ts
export const stateReaderTaskEither: Monad4<URI> & MonadThrow4<URI> & MonadTask4<URI> = ...
```

Added in v2.0.0

# stateReaderTaskEitherSeq

Like `stateReaderTaskEither` but `ap` is sequential

**Signature**

```ts
export const stateReaderTaskEitherSeq: typeof stateReaderTaskEither = ...
```

Added in v2.0.0
