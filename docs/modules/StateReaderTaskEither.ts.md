---
title: StateReaderTaskEither.ts
nav_order: 77
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [StateReaderTaskEither (interface)](#statereadertaskeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [fromReaderTaskEither (constant)](#fromreadertaskeither-constant)
- [fromRight (constant)](#fromright-constant)
- [fromState (constant)](#fromstate-constant)
- [stateReaderTaskEither (constant)](#statereadertaskeither-constant)
- [stateReaderTaskEitherSeq (constant)](#statereadertaskeitherseq-constant)
- [evalState (function)](#evalstate-function)
- [execState (function)](#execstate-function)
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

# fromReaderTaskEither (constant)

**Signature**

```ts
export const  = ...
```

Added in v2.0.0

# fromRight (constant)

**Signature**

```ts
export const fromRight: <S, A>(a: A) => StateReaderTaskEither<S, unknown, never, A> = ...
```

Added in v2.0.0

# fromState (constant)

**Signature**

```ts
export const fromState: <S, A>(ma: State<S, A>) => StateReaderTaskEither<S, unknown, never, A> = ...
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

# evalState (function)

**Signature**

```ts
export function evalState<S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S, e: E): Promise<Either<L, A>> { ... }
```

Added in v2.0.0

# execState (function)

**Signature**

```ts
export function execState<S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S, e: E): Promise<Either<L, S>> { ... }
```

Added in v2.0.0

# run (function)

**Signature**

```ts
export function run<S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S, e: E): Promise<Either<L, [A, S]>> { ... }
```

Added in v2.0.0
