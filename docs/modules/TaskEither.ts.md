---
title: TaskEither.ts
nav_order: 81
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
- [fromIOEither (constant)](#fromioeither-constant)
- [fromRight (constant)](#fromright-constant)
- [taskEither (constant)](#taskeither-constant)
- [taskEitherSeq (constant)](#taskeitherseq-constant)
- [attempt (function)](#attempt-function)
- [bracket (function)](#bracket-function)
- [filterOrElse (function)](#filterorelse-function)
- [filterOrElseL (function)](#filterorelsel-function)
- [foldTask (function)](#foldtask-function)
- [fromLeft (function)](#fromleft-function)
- [fromPredicate (function)](#frompredicate-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getOrElse (function)](#getorelse-function)
- [getOrElseL (function)](#getorelsel-function)
- [getSemigroup (function)](#getsemigroup-function)
- [left (function)](#left-function)
- [mapLeft (function)](#mapleft-function)
- [orElse (function)](#orelse-function)
- [right (function)](#right-function)
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

# fromIOEither (constant)

**Signature**

```ts
export const fromIOEither: <L, A>(fa: IOEither<L, A>) => TaskEither<L, A> = ...
```

Added in v2.0.0

# fromRight (constant)

**Signature**

```ts
export const fromRight: <A>(a: A) => TaskEither<never, A> = ...
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

# attempt (function)

**Signature**

```ts
export function attempt<L, A>(ma: TaskEither<L, A>): TaskEither<L, E.Either<L, A>> { ... }
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
export function filterOrElse<L, A, B extends A>(ma: TaskEither<L, A>, p: Refinement<A, B>, zero: L): TaskEither<L, B>
export function filterOrElse<L, A>(ma: TaskEither<L, A>, p: Predicate<A>, zero: L): TaskEither<L, A> { ... }
```

Added in v2.0.0

# filterOrElseL (function)

**Signature**

```ts
export function filterOrElseL<L, A, B extends A>(
  ma: TaskEither<L, A>,
  p: Refinement<A, B>,
  zero: (a: A) => L
): TaskEither<L, B>
export function filterOrElseL<L, A>(ma: TaskEither<L, A>, p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A> { ... }
```

Added in v2.0.0

# foldTask (function)

**Signature**

```ts
export function foldTask<L, A, R>(
  ma: TaskEither<L, A>,
  onLeft: (l: L) => Task<R>,
  onRight: (a: A) => Task<R>
): Task<R> { ... }
```

Added in v2.0.0

# fromLeft (function)

**Signature**

```ts
export function fromLeft<L>(l: L): TaskEither<L, never> { ... }
```

Added in v2.0.0

# fromPredicate (function)

**Signature**

```ts
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): ((a: A) => TaskEither<L, B>)
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): ((a: A) => TaskEither<L, A>) { ... }
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

# getOrElse (function)

**Signature**

```ts
export function getOrElse<L, A>(ma: TaskEither<L, A>, a: A): Task<A> { ... }
```

Added in v2.0.0

# getOrElseL (function)

**Signature**

```ts
export function getOrElseL<L, A>(ma: TaskEither<L, A>, f: (l: L) => A): Task<A> { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> { ... }
```

Added in v2.0.0

# left (function)

**Signature**

```ts
export function left<L>(fl: Task<L>): TaskEither<L, never> { ... }
```

Added in v2.0.0

# mapLeft (function)

**Signature**

```ts
export function mapLeft<L, A, M>(ma: TaskEither<L, A>, f: (l: L) => M): TaskEither<M, A> { ... }
```

Added in v2.0.0

# orElse (function)

**Signature**

```ts
export function orElse<L, A, M>(ma: TaskEither<L, A>, f: (l: L) => TaskEither<M, A>): TaskEither<M, A> { ... }
```

Added in v2.0.0

# right (function)

**Signature**

```ts
export function right<A>(fa: Task<A>): TaskEither<never, A> { ... }
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

Transforms a `Promise` into a `TaskEither`, catching the possible error.

**Signature**

```ts
export function tryCatch<L, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => L): TaskEither<L, A> { ... }
```

**Example**

```ts
import { createHash } from 'crypto'
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import { createReadStream } from 'fs'
import { left } from 'fp-ts/lib/Either'

function md5(path: string): TaskEither<string, string> {
  const mkHash = (p: string) =>
    new Promise<string>((resolve, reject) => {
      const hash = createHash('md5')
      const rs = createReadStream(p)
      rs.on('error', (error: Error) => reject(error.message))
      rs.on('data', (chunk: string) => hash.update(chunk))
      rs.on('end', () => resolve(hash.digest('hex')))
    })
  return tryCatch(() => mkHash(path), message => `cannot create md5 hash: ${String(message)}`)
}

md5('foo')().then(x => {
  assert.deepStrictEqual(x, left(`cannot create md5 hash: ENOENT: no such file or directory, open 'foo'`))
})
```

Added in v2.0.0
