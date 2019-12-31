---
title: StateReaderTaskEither.ts
nav_order: 77
parent: Modules
---

# StateReaderTaskEither overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [StateReaderTaskEither (interface)](#statereadertaskeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [evalState (constant)](#evalstate-constant)
- [execState (constant)](#execstate-constant)
- [fromReaderTaskEither (constant)](#fromreadertaskeither-constant)
- [get (constant)](#get-constant)
- [gets (constant)](#gets-constant)
- [modify (constant)](#modify-constant)
- [put (constant)](#put-constant)
- [right (constant)](#right-constant)
- [rightState (constant)](#rightstate-constant)
- [stateReaderTaskEither (constant)](#statereadertaskeither-constant)
- [stateReaderTaskEitherSeq (constant)](#statereadertaskeitherseq-constant)
- [chainEitherK (function)](#chaineitherk-function)
- [chainIOEitherK (function)](#chainioeitherk-function)
- [chainReaderTaskEitherK (function)](#chainreadertaskeitherk-function)
- [chainTaskEitherK (function)](#chaintaskeitherk-function)
- [fromEitherK (function)](#fromeitherk-function)
- [fromIOEither (function)](#fromioeither-function)
- [fromIOEitherK (function)](#fromioeitherk-function)
- [fromReaderEither (function)](#fromreadereither-function)
- [fromReaderTaskEitherK (function)](#fromreadertaskeitherk-function)
- [fromTaskEither (function)](#fromtaskeither-function)
- [fromTaskEitherK (function)](#fromtaskeitherk-function)
- [left (function)](#left-function)
- [leftIO (function)](#leftio-function)
- [leftReader (function)](#leftreader-function)
- [leftState (function)](#leftstate-function)
- [leftTask (function)](#lefttask-function)
- [rightIO (function)](#rightio-function)
- [rightReader (function)](#rightreader-function)
- [rightTask (function)](#righttask-function)
- [run (function)](#run-function)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [flatten (export)](#flatten-export)
- [fromEither (export)](#fromeither-export)
- [fromOption (export)](#fromoption-export)
- [map (export)](#map-export)

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

# URI (constant)

**Signature**

```ts
export const URI: "StateReaderTaskEither" = ...
```

Added in v2.0.0

# evalState (constant)

Run a computation in the `StateReaderTaskEither` monad, discarding the final state

**Signature**

```ts
export const : <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => RTE.ReaderTaskEither<R, E, A> = ...
```

Added in v2.0.0

# execState (constant)

Run a computation in the `StateReaderTaskEither` monad discarding the result

**Signature**

```ts
export const : <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => RTE.ReaderTaskEither<R, E, S> = ...
```

Added in v2.0.0

# fromReaderTaskEither (constant)

**Signature**

```ts
export const : <S, R, E, A>(ma: RTE.ReaderTaskEither<R, E, A>) => StateReaderTaskEither<S, R, E, A> = ...
```

Added in v2.0.0

# get (constant)

Get the current state

**Signature**

```ts
export const get: <S, R, E = ...
```

Added in v2.0.0

# gets (constant)

Get a value which depends on the current state

**Signature**

```ts
export const gets: <S, R, E = ...
```

Added in v2.0.0

# modify (constant)

Modify the state by applying a function to the current state

**Signature**

```ts
export const modify: <S, R, E = ...
```

Added in v2.0.0

# put (constant)

Set the state

**Signature**

```ts
export const put: <S, R, E = ...
```

Added in v2.0.0

# right (constant)

**Signature**

```ts
export const right: <S, R, E = ...
```

Added in v2.0.0

# rightState (constant)

**Signature**

```ts
export const rightState: <S, R, E = ...
```

Added in v2.0.0

# stateReaderTaskEither (constant)

**Signature**

```ts
export const stateReaderTaskEither: Monad4<URI> & MonadThrow4<URI> = ...
```

Added in v2.0.0

# stateReaderTaskEitherSeq (constant)

Like `stateReaderTaskEither` but `ap` is sequential

**Signature**

```ts
export const stateReaderTaskEitherSeq: typeof stateReaderTaskEither = ...
```

Added in v2.0.0

# chainEitherK (function)

**Signature**

```ts
export function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# chainIOEitherK (function)

**Signature**

```ts
export function chainIOEitherK<E, A, B>(
  f: (a: A) => IOEither<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# chainReaderTaskEitherK (function)

**Signature**

```ts
export function chainReaderTaskEitherK<R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# chainTaskEitherK (function)

**Signature**

```ts
export function chainTaskEitherK<E, A, B>(
  f: (a: A) => TaskEither<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# fromEitherK (function)

**Signature**

```ts
export function fromEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# fromIOEither (function)

**Signature**

```ts
export function fromIOEither<S, R, E, A>(ma: IOEither<E, A>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# fromIOEitherK (function)

**Signature**

```ts
export function fromIOEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# fromReaderEither (function)

**Signature**

```ts
export function fromReaderEither<S, R, E, A>(ma: ReaderEither<R, E, A>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# fromReaderTaskEitherK (function)

**Signature**

```ts
export function fromReaderTaskEitherK<R, E, A extends Array<unknown>, B>(
  f: (...a: A) => ReaderTaskEither<R, E, B>
): <S>(...a: A) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# fromTaskEither (function)

**Signature**

```ts
export function fromTaskEither<S, R, E, A>(ma: TaskEither<E, A>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# fromTaskEitherK (function)

**Signature**

```ts
export function fromTaskEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> { ... }
```

Added in v2.4.0

# left (function)

**Signature**

```ts
export function left<S, R, E = never, A = never>(e: E): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# leftIO (function)

**Signature**

```ts
export function leftIO<S, R, E = never, A = never>(me: IO<E>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# leftReader (function)

**Signature**

```ts
export function leftReader<S, R, E = never, A = never>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# leftState (function)

**Signature**

```ts
export function leftState<S, R, E = never, A = never>(me: State<S, E>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# leftTask (function)

**Signature**

```ts
export function leftTask<S, R, E = never, A = never>(me: Task<E>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# rightIO (function)

**Signature**

```ts
export function rightIO<S, R, E = never, A = never>(ma: IO<A>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# rightReader (function)

**Signature**

```ts
export function rightReader<S, R, E = never, A = never>(ma: Reader<R, A>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# rightTask (function)

**Signature**

```ts
export function rightTask<S, R, E = never, A = never>(ma: Task<A>): StateReaderTaskEither<S, R, E, A> { ... }
```

Added in v2.0.0

# run (function)

**Signature**

```ts
export function run<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S, r: R): Promise<Either<E, [A, S]>> { ... }
```

Added in v2.0.0

# ap (export)

**Signature**

```ts
<S, R, E, A>(fa: StateReaderTaskEither<S, R, E, A>) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

# apFirst (export)

**Signature**

```ts
<S, R, E, B>(fb: StateReaderTaskEither<S, R, E, B>) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

# apSecond (export)

**Signature**

```ts
<S, R, E, B>(fb: StateReaderTaskEither<S, R, E, B>) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

# chain (export)

**Signature**

```ts
<S, R, E, A, B>(f: (a: A) => StateReaderTaskEither<S, R, E, B>) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

# chainFirst (export)

**Signature**

```ts
<S, R, E, A, B>(f: (a: A) => StateReaderTaskEither<S, R, E, B>) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

# flatten (export)

**Signature**

```ts
<S, R, E, A>(mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

# fromEither (export)

**Signature**

```ts
<S, R, E, A>(ma: Either<E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

# fromOption (export)

**Signature**

```ts
<E>(onNone: () => E) => <S, R, A>(ma: Option<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0
