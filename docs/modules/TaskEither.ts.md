---
title: TaskEither.ts
nav_order: 83
parent: Modules
---

# Overview

`TaskEither<L, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
error of type `L`. If you want to represent an asynchronous computation that never fails, please see `Task`.

---

<h2 class="text-delta">Table of contents</h2>

- [TaskEither (interface)](#taskeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [fold (constant)](#fold-constant)
- [foldTask (constant)](#foldtask-constant)
- [fromEither (constant)](#fromeither-constant)
- [fromIOEither (constant)](#fromioeither-constant)
- [getOrElse (constant)](#getorelse-constant)
- [left (constant)](#left-constant)
- [leftTask (constant)](#lefttask-constant)
- [mapLeft (constant)](#mapleft-constant)
- [orElse (constant)](#orelse-constant)
- [right (constant)](#right-constant)
- [rightTask (constant)](#righttask-constant)
- [swap (constant)](#swap-constant)
- [taskEither (constant)](#taskeither-constant)
- [taskEitherSeq (constant)](#taskeitherseq-constant)
- [bracket (function)](#bracket-function)
- [filterOrElse (function)](#filterorelse-function)
- [fromOption (function)](#fromoption-function)
- [fromPredicate (function)](#frompredicate-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getSemigroup (function)](#getsemigroup-function)
- [leftIO (function)](#leftio-function)
- [rightIO (function)](#rightio-function)
- [taskify (function)](#taskify-function)
- [tryCatch (function)](#trycatch-function)

---

# TaskEither (interface)

**Signature**

```ts
export interface TaskEither<L, A> extends Task<E.Either<L, A>> {}
```

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

# fold (constant)

**Signature**

```ts
export const fold: <L, A, R>(ma: TaskEither<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R) => Task<R> = ...
```

Added in v2.0.0

# foldTask (constant)

**Signature**

```ts
export const foldTask: <L, A, R>(
  ma: TaskEither<L, A>,
  onLeft: (l: L) => Task<R>,
  onRight: (a: A) => Task<R>
) => Task<R> = ...
```

Added in v2.0.0

# fromEither (constant)

**Signature**

```ts
export const fromEither: <L, A>(ma: E.Either<L, A>) => TaskEither<L, A> = ...
```

Added in v2.0.0

# fromIOEither (constant)

**Signature**

```ts
export const fromIOEither: <L, A>(fa: IOEither<L, A>) => TaskEither<L, A> = ...
```

Added in v2.0.0

# getOrElse (constant)

**Signature**

```ts
export const getOrElse: <L, A>(ma: TaskEither<L, A>, f: (l: L) => A) => Task<A> = ...
```

Added in v2.0.0

# left (constant)

**Signature**

```ts
export const left: <L>(l: L) => TaskEither<L, never> = ...
```

Added in v2.0.0

# leftTask (constant)

**Signature**

```ts
export const leftTask: <L>(ml: Task<L>) => TaskEither<L, never> = ...
```

Added in v2.0.0

# mapLeft (constant)

**Signature**

```ts
export const mapLeft: <L, A, M>(ma: TaskEither<L, A>, f: (l: L) => M) => TaskEither<M, A> = ...
```

Added in v2.0.0

# orElse (constant)

**Signature**

```ts
export const orElse: <L, A, M>(ma: TaskEither<L, A>, f: (l: L) => TaskEither<M, A>) => TaskEither<M, A> = ...
```

Added in v2.0.0

# right (constant)

**Signature**

```ts
export const right: <A>(a: A) => TaskEither<never, A> = ...
```

Added in v2.0.0

# rightTask (constant)

**Signature**

```ts
export const rightTask: <A>(ma: Task<A>) => TaskEither<never, A> = ...
```

Added in v2.0.0

# swap (constant)

**Signature**

```ts
export const swap: <L, A>(ma: TaskEither<L, A>) => TaskEither<A, L> = ...
```

Added in v2.0.0

# taskEither (constant)

**Signature**

```ts
export const taskEither: Monad2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  MonadIO2<URI> &
  MonadTask2<URI> &
  MonadThrow2<URI> = ...
```

Added in v2.0.0

# taskEitherSeq (constant)

Like `TaskEither` but `ap` is sequential

**Signature**

```ts
export const taskEitherSeq: typeof taskEither = ...
```

Added in v2.0.0

# bracket (function)

Make sure that a resource is cleaned up in the event of an exception. The
release action is called regardless of whether the body action throws or
returns.

**Signature**

```ts
export function bracket<L, A, B>(
  acquire: TaskEither<L, A>,
  use: (a: A) => TaskEither<L, B>,
  release: (a: A, e: E.Either<L, B>) => TaskEither<L, void>
): TaskEither<L, B> { ... }
```

Added in v2.0.0

# filterOrElse (function)

**Signature**

```ts
export function filterOrElse<L, A, B extends A>(
  ma: TaskEither<L, A>,
  p: Refinement<A, B>,
  zero: (a: A) => L
): TaskEither<L, B>
export function filterOrElse<L, A>(ma: TaskEither<L, A>, p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A> { ... }
```

Added in v2.0.0

# fromOption (function)

**Signature**

```ts
export function fromOption<L, A>(ma: Option<A>, onNone: () => L): TaskEither<L, A> { ... }
```

Added in v2.0.0

# fromPredicate (function)

**Signature**

```ts
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): (a: A) => TaskEither<L, B>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => TaskEither<L, A> { ... }
```

Added in v2.0.0

# getApplyMonoid (function)

**Signature**

```ts
export function getApplyMonoid<L, A>(M: Monoid<A>): Monoid<TaskEither<L, A>> { ... }
```

Added in v2.0.0

# getApplySemigroup (function)

**Signature**

```ts
export function getApplySemigroup<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> { ... }
```

Added in v2.0.0

# leftIO (function)

**Signature**

```ts
export function leftIO<L>(ml: IO<L>): TaskEither<L, never> { ... }
```

Added in v2.0.0

# rightIO (function)

**Signature**

```ts
export function rightIO<A>(ma: IO<A>): TaskEither<never, A> { ... }
```

Added in v2.0.0

# taskify (function)

Convert a node style callback function to one returning a `TaskEither`

**Note**. If the function `f` admits multiple overloadings, `taskify` will pick last one. If you want a different
behaviour, add an explicit type annotation

```ts
// readFile admits multiple overloadings

// const readFile: (a: string) => TaskEither<NodeJS.ErrnoException, Buffer>
const readFile = taskify(fs.readFile)

const readFile2: (filename: string, encoding: string) => TaskEither<NodeJS.ErrnoException, Buffer> = taskify(
  fs.readFile
)
```

**Signature**

```ts
export function taskify<L, R>(f: (cb: (e: L | null | undefined, r?: R) => void) => void): () => TaskEither<L, R>
export function taskify<A, L, R>(
  f: (a: A, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A) => TaskEither<L, R>
export function taskify<A, B, L, R>(
  f: (a: A, b: B, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B) => TaskEither<L, R>
export function taskify<A, B, C, L, R>(
  f: (a: A, b: B, c: C, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C) => TaskEither<L, R>
export function taskify<A, B, C, D, L, R>(
  f: (a: A, b: B, c: C, d: D, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D) => TaskEither<L, R>
export function taskify<A, B, C, D, E, L, R>(
  f: (a: A, b: B, c: C, d: D, e: E, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D, e: E) => TaskEither<L, R> { ... }
```

**Example**

```ts
import { taskify } from 'fp-ts/lib/TaskEither'
import * as fs from 'fs'

// const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
const stat = taskify(fs.stat)
assert.strictEqual(stat.length, 0)
```

Added in v2.0.0

# tryCatch (function)

**Signature**

```ts
export function tryCatch<L, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => L): TaskEither<L, A> { ... }
```

Added in v2.0.0
