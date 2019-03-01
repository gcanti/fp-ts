---
title: TaskEither.ts
nav_order: 84
---

# Overview

`TaskEither<L, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
error of type `L`. If you want to represent an asynchronous computation that never fails, please see `Task`.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [URI](#uri)
- [TaskEither](#taskeither)
  - [run](#run)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [applyFirst](#applyfirst)
  - [applySecond](#applysecond)
  - [chainFirst](#chainfirst)
  - [chainSecond](#chainsecond)
  - [chain](#chain)
  - [fold](#fold)
  - [foldTask](#foldtask)
  - [foldTaskEither](#foldtaskeither)
  - [mapLeft](#mapleft)
  - [orElse](#orelse)
  - [alt](#alt)
  - [bimap](#bimap)
  - [attempt](#attempt)
  - [filterOrElse](#filterorelse)
  - [filterOrElseL](#filterorelsel)
- [URI](#uri-1)
- [taskEither](#taskeither)
- [taskEitherSeq](#taskeitherseq)
- [bracket](#bracket)
- [fromEither](#fromeither)
- [fromIO](#fromio)
- [fromIOEither](#fromioeither)
- [fromLeft](#fromleft)
- [fromPredicate](#frompredicate)
- [getApplyMonoid](#getapplymonoid)
- [getApplySemigroup](#getapplysemigroup)
- [getSemigroup](#getsemigroup)
- [left](#left)
- [right](#right)
- [taskify](#taskify)
- [tryCatch](#trycatch)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# TaskEither

**Signature** (class)

```ts
export class TaskEither<L, A> {
  constructor(readonly value: Task<Either<L, A>>) { ... }
  ...
}
```

Added in v1.0.0

## run

Runs the inner `Task`

**Signature** (method)

```ts
run(): Promise<Either<L, A>> { ... }
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): TaskEither<L, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B> { ... }
```

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: TaskEither<L, (b: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C> { ... }
```

## applyFirst

Combine two (parallel) effectful actions, keeping only the result of the first

**Signature** (method)

```ts
applyFirst<B>(fb: TaskEither<L, B>): TaskEither<L, A> { ... }
```

Added in v1.6.0

## applySecond

Combine two (parallel) effectful actions, keeping only the result of the second

**Signature** (method)

```ts
applySecond<B>(fb: TaskEither<L, B>): TaskEither<L, B> { ... }
```

Added in v1.5.0

## chainFirst

Combine two (sequential) effectful actions, keeping only the result of the first

**Signature** (method)

```ts
chainFirst<B>(fb: TaskEither<L, B>): TaskEither<L, A> { ... }
```

Added in v1.12.0

## chainSecond

Combine two (sequential) effectful actions, keeping only the result of the second

**Signature** (method)

```ts
chainSecond<B>(fb: TaskEither<L, B>): TaskEither<L, B> { ... }
```

Added in v1.12.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B> { ... }
```

## fold

**Signature** (method)

```ts
fold<R>(onLeft: (l: L) => R, onRight: (a: A) => R): Task<R> { ... }
```

## foldTask

Similar to `fold`, but the result is flattened.

**Signature** (method)

```ts
foldTask<R>(onLeft: (l: L) => Task<R>, onRight: (a: A) => Task<R>): Task<R> { ... }
```

Added in v1.10.0

## foldTaskEither

Similar to `fold`, but the result is flattened.

**Signature** (method)

```ts
foldTaskEither<M, B>(onLeft: (l: L) => TaskEither<M, B>, onRight: (a: A) => TaskEither<M, B>): TaskEither<M, B> { ... }
```

Added in v1.10.0

## mapLeft

**Signature** (method)

```ts
mapLeft<M>(f: (l: L) => M): TaskEither<M, A> { ... }
```

## orElse

Transforms the failure value of the `TaskEither` into a new `TaskEither`

**Signature** (method)

```ts
orElse<M>(f: (l: L) => TaskEither<M, A>): TaskEither<M, A> { ... }
```

## alt

**Signature** (method)

```ts
alt(fy: TaskEither<L, A>): TaskEither<L, A> { ... }
```

Added in v1.6.0

## bimap

**Signature** (method)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): TaskEither<V, B> { ... }
```

Added in v1.2.0

## attempt

Return `Right` if the given action succeeds, `Left` if it throws

**Signature** (method)

```ts
attempt<M = L>(): TaskEither<M, Either<L, A>> { ... }
```

Added in v1.10.0

## filterOrElse

**Signature** (method)

```ts
filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): TaskEither<L, B>
filterOrElse(p: Predicate<A>, zero: L): TaskEither<L, A>
filterOrElse(p: Predicate<A>, zero: L): TaskEither<L, A> { ... }
```

Added in v1.11.0

## filterOrElseL

**Signature** (method)

```ts
filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): TaskEither<L, B>
filterOrElseL(p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A>
filterOrElseL(p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A> { ... }
```

Added in v1.11.0

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# taskEither

**Signature** (constant)

```ts
export const taskEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadTask2<URI> = ...
```

Added in v1.0.0

# taskEitherSeq

Like `TaskEither` but `ap` is sequential

**Signature** (constant)

```ts
export const taskEitherSeq: typeof taskEither = ...
```

Added in v1.10.0

# bracket

Make sure that a resource is cleaned up in the event of an exception. The
release action is called regardless of whether the body action throws or
returns.

**Signature** (function)

```ts
export const bracket = <L, A, B>(
  acquire: TaskEither<L, A>,
  use: (a: A) => TaskEither<L, B>,
  release: (a: A, e: Either<L, B>) => TaskEither<L, void>
): TaskEither<L, B> => ...
```

Added in v1.10.0

# fromEither

**Signature** (function)

```ts
export const fromEither = <L, A>(fa: Either<L, A>): TaskEither<L, A> => ...
```

Added in v1.0.0

# fromIO

**Signature** (function)

```ts
export const fromIO = <L, A>(fa: IO<A>): TaskEither<L, A> => ...
```

Added in v1.5.0

# fromIOEither

**Signature** (function)

```ts
export const fromIOEither = <L, A>(fa: IOEither<L, A>): TaskEither<L, A> => ...
```

Added in v1.6.0

# fromLeft

**Signature** (function)

```ts
export const fromLeft = <L, A>(l: L): TaskEither<L, A> => ...
```

Added in v1.3.0

# fromPredicate

**Signature** (function)

```ts
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): ((a: A) => TaskEither<L, B>)
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): ((a: A) => TaskEither<L, A>)
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): ((a: A) => TaskEither<L, A>) { ... }
```

Added in v1.6.0

# getApplyMonoid

**Signature** (function)

```ts
export const getApplyMonoid = <L, A>(M: Monoid<A>): Monoid<TaskEither<L, A>> => ...
```

Added in v1.9.0

# getApplySemigroup

**Signature** (function)

```ts
export const getApplySemigroup = <L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> => ...
```

Added in v1.9.0

# getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> => ...
```

Added in v1.9.0

# left

**Signature** (function)

```ts
export const left = <L, A>(fl: Task<L>): TaskEither<L, A> => ...
```

Added in v1.0.0

# right

**Signature** (function)

```ts
export const right = <L, A>(fa: Task<A>): TaskEither<L, A> => ...
```

Added in v1.0.0

# taskify

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

**Signature** (function)

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
): (a: A, b: B, c: C, d: D, e: E) => TaskEither<L, R>
export function taskify<L, R>(f: Function): () => TaskEither<L, R> { ... }
```

**Example**

```ts
import { taskify } from 'fp-ts/lib/TaskEither'
import * as fs from 'fs'

// const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
const stat = taskify(fs.stat)
assert.strictEqual(stat.length, 0)
```

Added in v1.5.0

# tryCatch

Transforms a `Promise` into a `TaskEither`, catching the possible error.

**Signature** (function)

```ts
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: unknown) => L): TaskEither<L, A> => ...
```

**Example**

```ts
import { createHash } from 'crypto'
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import { createReadStream } from 'fs'
import { left } from 'fp-ts/lib/Either'

const md5 = (path: string): TaskEither<string, string> => {
  const mkHash = (p: string) =>
    new Promise<string>((resolve, reject) => {
      const hash = createHash('md5')
      const rs = createReadStream(p)
      rs.on('error', (error: Error) => reject(error.message))
      rs.on('data', (chunk: string) => hash.update(chunk))
      rs.on('end', () => {
        return resolve(hash.digest('hex'))
      })
    })
  return tryCatch(() => mkHash(path), message => `cannot create md5 hash: ${String(message)}`)
}

md5('foo')
  .run()
  .then(x => {
    assert.deepStrictEqual(x, left(`cannot create md5 hash: ENOENT: no such file or directory, open 'foo'`))
  })
```

Added in v1.0.0
