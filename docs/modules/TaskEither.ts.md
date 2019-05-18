---
title: TaskEither.ts
nav_order: 83
parent: Modules
---

# Overview

`TaskEither<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Task`.

---

<h2 class="text-delta">Table of contents</h2>

- [TaskEither (interface)](#taskeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [bracket (constant)](#bracket-constant)
- [fold (constant)](#fold-constant)
- [fromEither (constant)](#fromeither-constant)
- [fromIOEither (constant)](#fromioeither-constant)
- [getOrElse (constant)](#getorelse-constant)
- [left (constant)](#left-constant)
- [leftTask (constant)](#lefttask-constant)
- [orElse (constant)](#orelse-constant)
- [right (constant)](#right-constant)
- [rightTask (constant)](#righttask-constant)
- [swap (constant)](#swap-constant)
- [taskEither (constant)](#taskeither-constant)
- [taskEitherSeq (constant)](#taskeitherseq-constant)
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
export interface TaskEither<E, A> extends Task<E.Either<E, A>> {}
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
export const URI = ...
```

Added in v2.0.0

# bracket (constant)

Make sure that a resource is cleaned up in the event of an exception. The
release action is called regardless of whether the body action throws or
returns.

**Signature**

```ts
export const bracket: <E, A, B>(
  acquire: TaskEither<E, A>,
  use: (a: A) => TaskEither<E, B>,
  release: (a: A, e: E.Either<E, B>) => TaskEither<E, void>
) => TaskEither<E, B> = ...
```

Added in v2.0.0

# fold (constant)

**Signature**

```ts
export const fold: <E, A, R>(
  onLeft: (e: E) => Task<R>,
  onRight: (a: A) => Task<R>
) => (ma: TaskEither<E, A>) => Task<R> = ...
```

Added in v2.0.0

# fromEither (constant)

**Signature**

```ts
export const fromEither: <E, A>(ma: E.Either<E, A>) => TaskEither<E, A> = ...
```

Added in v2.0.0

# fromIOEither (constant)

**Signature**

```ts
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskEither<E, A> = ...
```

Added in v2.0.0

# getOrElse (constant)

**Signature**

```ts
export const getOrElse: <E, A>(f: (e: E) => Task<A>) => (ma: TaskEither<E, A>) => Task<A> = ...
```

Added in v2.0.0

# left (constant)

**Signature**

```ts
export const left: <E>(e: E) => TaskEither<E, never> = ...
```

Added in v2.0.0

# leftTask (constant)

**Signature**

```ts
export const leftTask: <E>(me: Task<E>) => TaskEither<E, never> = ...
```

Added in v2.0.0

# orElse (constant)

**Signature**

```ts
export const orElse: <E, A, M>(f: (e: E) => TaskEither<M, A>) => (ma: TaskEither<E, A>) => TaskEither<M, A> = ...
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
export const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E> = ...
```

Added in v2.0.0

# taskEither (constant)

**Signature**

```ts
export const taskEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadTask2<URI> = ...
```

Added in v2.0.0

# taskEitherSeq (constant)

Like `TaskEither` but `ap` is sequential

**Signature**

```ts
export const taskEitherSeq: typeof taskEither = ...
```

Added in v2.0.0

# filterOrElse (function)

**Signature**

```ts
export function filterOrElse<E, A, B extends A>(
  predicate: Refinement<A, B>,
  zero: (a: A) => E
): (ma: TaskEither<E, A>) => TaskEither<E, B>
export function filterOrElse<E, A>(
  predicate: Predicate<A>,
  zero: (a: A) => E
): (ma: TaskEither<E, A>) => TaskEither<E, A> { ... }
```

Added in v2.0.0

# fromOption (function)

**Signature**

```ts
export function fromOption<E, A>(ma: Option<A>, onNone: () => E): TaskEither<E, A> { ... }
```

Added in v2.0.0

# fromPredicate (function)

**Signature**

```ts
export function fromPredicate<E, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => E
): (a: A) => TaskEither<E, B>
export function fromPredicate<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => TaskEither<E, A> { ... }
```

Added in v2.0.0

# getApplyMonoid (function)

**Signature**

```ts
export function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<TaskEither<E, A>> { ... }
```

Added in v2.0.0

# getApplySemigroup (function)

**Signature**

```ts
export function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>> { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>> { ... }
```

Added in v2.0.0

# leftIO (function)

**Signature**

```ts
export function leftIO<E>(me: IO<E>): TaskEither<E, never> { ... }
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
export function tryCatch<E, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E): TaskEither<E, A> { ... }
```

Added in v2.0.0
