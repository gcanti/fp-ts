---
title: StateReaderTaskEither.ts
nav_order: 79
parent: Modules
---

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
- [fromEither (function)](#fromeither-function)
- [fromIOEither (function)](#fromioeither-function)
- [fromOption (function)](#fromoption-function)
- [fromTaskEither (function)](#fromtaskeither-function)
- [left (function)](#left-function)
- [leftIO (function)](#leftio-function)
- [leftReader (function)](#leftreader-function)
- [leftState (function)](#leftstate-function)
- [leftTask (function)](#lefttask-function)
- [rightIO (function)](#rightio-function)
- [rightReader (function)](#rightreader-function)
- [rightTask (function)](#righttask-function)
- [run (function)](#run-function)

---

# StateReaderTaskEither (interface)

**Signature**

```ts
export interface StateReaderTaskEither<S, E, L, A> {
  (s: S): ReaderTaskEither<E, L, [A, S]>
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# evalState (constant)

Run a computation in the `StateReaderTaskEither` monad, discarding the final state

**Signature**

```ts
export const  = ...
```

Added in v2.0.0

# execState (constant)

Run a computation in the `StateReaderTaskEither` monad discarding the result

**Signature**

```ts
export const  = ...
```

Added in v2.0.0

# fromReaderTaskEither (constant)

**Signature**

```ts
export const  = ...
```

Added in v2.0.0

# get (constant)

Get the current state

**Signature**

```ts
export const get: <S>() => StateReaderTaskEither<S, unknown, never, S> = ...
```

Added in v2.0.0

# gets (constant)

Get a value which depends on the current state

**Signature**

```ts
export const gets: <S, A>(f: (s: S) => A) => StateReaderTaskEither<S, unknown, never, A> = ...
```

Added in v2.0.0

# modify (constant)

Modify the state by applying a function to the current state

**Signature**

```ts
export const modify: <S>(f: (s: S) => S) => StateReaderTaskEither<S, unknown, never, void> = ...
```

Added in v2.0.0

# put (constant)

Set the state

**Signature**

```ts
export const put: <S>(s: S) => StateReaderTaskEither<S, unknown, never, void> = ...
```

Added in v2.0.0

# right (constant)

**Signature**

```ts
export const right: <S, A>(a: A) => StateReaderTaskEither<S, unknown, never, A> = ...
```

Added in v2.0.0

# rightState (constant)

**Signature**

```ts
export const rightState: <S, A>(ma: State<S, A>) => StateReaderTaskEither<S, unknown, never, A> = ...
```

Added in v2.0.0

# stateReaderTaskEither (constant)

**Signature**

```ts
export const stateReaderTaskEither: Monad4<URI> = ...
```

Added in v2.0.0

# stateReaderTaskEitherSeq (constant)

Like `stateReaderTaskEither` but `ap` is sequential

**Signature**

```ts
export const stateReaderTaskEitherSeq: typeof stateReaderTaskEither = ...
```

Added in v2.0.0

# fromEither (function)

**Signature**

```ts
export function fromEither<S, L, A>(ma: Either<L, A>): StateReaderTaskEither<S, unknown, L, A> { ... }
```

Added in v2.0.0

# fromIOEither (function)

**Signature**

```ts
export function fromIOEither<S, L, A>(ma: IOEither<L, A>): StateReaderTaskEither<S, unknown, L, A> { ... }
```

Added in v2.0.0

# fromOption (function)

**Signature**

```ts
export function fromOption<S, L, A>(ma: Option<A>, onNone: () => L): StateReaderTaskEither<S, unknown, L, A> { ... }
```

Added in v2.0.0

# fromTaskEither (function)

**Signature**

```ts
export function fromTaskEither<S, L, A>(ma: TaskEither<L, A>): StateReaderTaskEither<S, unknown, L, A> { ... }
```

Added in v2.0.0

# left (function)

**Signature**

```ts
export function left<S, L>(l: L): StateReaderTaskEither<S, unknown, L, never> { ... }
```

Added in v2.0.0

# leftIO (function)

**Signature**

```ts
export function leftIO<S, L>(ml: IO<L>): StateReaderTaskEither<S, unknown, L, never> { ... }
```

Added in v2.0.0

# leftReader (function)

**Signature**

```ts
export function leftReader<S, E, L>(ml: Reader<E, L>): StateReaderTaskEither<S, E, L, never> { ... }
```

Added in v2.0.0

# leftState (function)

**Signature**

```ts
export function leftState<S, L>(ml: State<S, L>): StateReaderTaskEither<S, unknown, L, never> { ... }
```

Added in v2.0.0

# leftTask (function)

**Signature**

```ts
export function leftTask<S, L>(ma: Task<L>): StateReaderTaskEither<S, unknown, L, never> { ... }
```

Added in v2.0.0

# rightIO (function)

**Signature**

```ts
export function rightIO<S, A>(ma: IO<A>): StateReaderTaskEither<S, unknown, never, A> { ... }
```

Added in v2.0.0

# rightReader (function)

**Signature**

```ts
export function rightReader<S, E, A>(ma: Reader<E, A>): StateReaderTaskEither<S, E, never, A> { ... }
```

Added in v2.0.0

# rightTask (function)

**Signature**

```ts
export function rightTask<S, A>(ma: Task<A>): StateReaderTaskEither<S, unknown, never, A> { ... }
```

Added in v2.0.0

# run (function)

**Signature**

```ts
export function run<S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S, e: E): Promise<Either<L, [A, S]>> { ... }
```

Added in v2.0.0
