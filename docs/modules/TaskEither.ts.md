---
title: TaskEither.ts
nav_order: 89
parent: Modules
---

# Overview

`TaskEither<L, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
error of type `L`. If you want to represent an asynchronous computation that never fails, please see `Task`.

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [TaskEither (class)](#taskeither-class)
  - [run (method)](#run-method)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [applyFirst (method)](#applyfirst-method)
  - [applySecond (method)](#applysecond-method)
  - [chainFirst (method)](#chainfirst-method)
  - [chainSecond (method)](#chainsecond-method)
  - [chain (method)](#chain-method)
  - [fold (method)](#fold-method)
  - [foldTask (method)](#foldtask-method)
  - [foldTaskEither (method)](#foldtaskeither-method)
  - [getOrElse (method)](#getorelse-method)
  - [getOrElseL (method)](#getorelsel-method)
  - [mapLeft (method)](#mapleft-method)
  - [orElse (method)](#orelse-method)
  - [alt (method)](#alt-method)
  - [bimap (method)](#bimap-method)
  - [attempt (method)](#attempt-method)
  - [filterOrElse (method)](#filterorelse-method)
  - [filterOrElseL (method)](#filterorelsel-method)
- [URI (constant)](#uri-constant)
- [taskEither (constant)](#taskeither-constant)
- [taskEitherSeq (constant)](#taskeitherseq-constant)
- [bracket (function)](#bracket-function)
- [fold (function)](#fold-function)
- [fromEither (function)](#fromeither-function)
- [~~fromIO~~ (function)](#fromio-function)
- [fromIOEither (function)](#fromioeither-function)
- [~~fromLeft~~ (function)](#fromleft-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getOrElse (function)](#getorelse-function)
- [getSemigroup (function)](#getsemigroup-function)
- [~~left~~ (function)](#left-function)
- [left2v (function)](#left2v-function)
- [leftIO (function)](#leftio-function)
- [leftTask (function)](#lefttask-function)
- [orElse (function)](#orelse-function)
- [~~right~~ (function)](#right-function)
- [right2v (function)](#right2v-function)
- [rightIO (function)](#rightio-function)
- [rightTask (function)](#righttask-function)
- [taskify (function)](#taskify-function)
- [tryCatch (function)](#trycatch-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# TaskEither (class)

**Signature**

```ts
export class TaskEither<L, A> {
  constructor(readonly value: Task<Either<L, A>>) { ... }
  ...
}
```

Added in v1.0.0

## run (method)

Runs the inner `Task`

**Signature**

```ts
run(): Promise<Either<L, A>> { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): TaskEither<L, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: TaskEither<L, (b: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C> { ... }
```

## applyFirst (method)

Combine two (parallel) effectful actions, keeping only the result of the first

**Signature**

```ts
applyFirst<B>(fb: TaskEither<L, B>): TaskEither<L, A> { ... }
```

Added in v1.6.0

## applySecond (method)

Combine two (parallel) effectful actions, keeping only the result of the second

**Signature**

```ts
applySecond<B>(fb: TaskEither<L, B>): TaskEither<L, B> { ... }
```

Added in v1.5.0

## chainFirst (method)

Combine two (sequential) effectful actions, keeping only the result of the first

**Signature**

```ts
chainFirst<B>(fb: TaskEither<L, B>): TaskEither<L, A> { ... }
```

Added in v1.12.0

## chainSecond (method)

Combine two (sequential) effectful actions, keeping only the result of the second

**Signature**

```ts
chainSecond<B>(fb: TaskEither<L, B>): TaskEither<L, B> { ... }
```

Added in v1.12.0

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B> { ... }
```

## fold (method)

**Signature**

```ts
fold<R>(onLeft: (l: L) => R, onRight: (a: A) => R): Task<R> { ... }
```

## foldTask (method)

Similar to `fold`, but the result is flattened.

**Signature**

```ts
foldTask<R>(onLeft: (l: L) => Task<R>, onRight: (a: A) => Task<R>): Task<R> { ... }
```

Added in v1.10.0

## foldTaskEither (method)

Similar to `fold`, but the result is flattened.

**Signature**

```ts
foldTaskEither<M, B>(onLeft: (l: L) => TaskEither<M, B>, onRight: (a: A) => TaskEither<M, B>): TaskEither<M, B> { ... }
```

Added in v1.10.0

## getOrElse (method)

Similar to `fold`, return the value from Right or the given argument if Left.

**Signature**

```ts
getOrElse(a: A): Task<A> { ... }
```

Added in v1.17.0

## getOrElseL (method)

**Signature**

```ts
getOrElseL(f: (l: L) => A): Task<A> { ... }
```

Added in v1.17.0

## mapLeft (method)

**Signature**

```ts
mapLeft<M>(f: (l: L) => M): TaskEither<M, A> { ... }
```

## orElse (method)

Transforms the failure value of the `TaskEither` into a new `TaskEither`

**Signature**

```ts
orElse<M>(f: (l: L) => TaskEither<M, A>): TaskEither<M, A> { ... }
```

## alt (method)

**Signature**

```ts
alt(fy: TaskEither<L, A>): TaskEither<L, A> { ... }
```

Added in v1.6.0

## bimap (method)

**Signature**

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): TaskEither<V, B> { ... }
```

Added in v1.2.0

## attempt (method)

Return `Right` if the given action succeeds, `Left` if it throws

**Signature**

```ts
attempt<M = L>(): TaskEither<M, Either<L, A>> { ... }
```

Added in v1.10.0

## filterOrElse (method)

**Signature**

```ts
filterOrElse<B extends A>(p: Refinement<A, B>, zero: L): TaskEither<L, B>
filterOrElse(p: Predicate<A>, zero: L): TaskEither<L, A> { ... }
```

Added in v1.11.0

## filterOrElseL (method)

**Signature**

```ts
filterOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): TaskEither<L, B>
filterOrElseL(p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A> { ... }
```

Added in v1.11.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

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

Added in v1.0.0

# taskEitherSeq (constant)

Like `TaskEither` but `ap` is sequential

**Signature**

```ts
export const taskEitherSeq: typeof taskEither = ...
```

Added in v1.10.0

# bracket (function)

Make sure that a resource is cleaned up in the event of an exception. The
release action is called regardless of whether the body action throws or
returns.

**Signature**

```ts
export const bracket = <L, A, B>(
  acquire: TaskEither<L, A>,
  use: (a: A) => TaskEither<L, B>,
  release: (a: A, e: Either<L, B>) => TaskEither<L, void>
): TaskEither<L, B> => ...
```

Added in v1.10.0

# fold (function)

**Signature**

```ts
export function fold<E, A, R>(
  onLeft: (e: E) => Task<R>,
  onRight: (a: A) => Task<R>
): (ma: TaskEither<E, A>) => Task<R> { ... }
```

Added in v1.19.0

# fromEither (function)

**Signature**

```ts
export const fromEither = <L, A>(fa: Either<L, A>): TaskEither<L, A> => ...
```

Added in v1.0.0

# ~~fromIO~~ (function)

Use `rightIO`

**Signature**

```ts
export const fromIO = <L, A>(fa: IO<A>): TaskEither<L, A> => ...
```

Added in v1.5.0

# fromIOEither (function)

**Signature**

```ts
export const fromIOEither = <L, A>(fa: IOEither<L, A>): TaskEither<L, A> => ...
```

Added in v1.6.0

# ~~fromLeft~~ (function)

Use `left2v`

**Signature**

```ts
export const fromLeft = <L, A>(l: L): TaskEither<L, A> => ...
```

Added in v1.3.0

# getApplyMonoid (function)

**Signature**

```ts
export const getApplyMonoid = <L, A>(M: Monoid<A>): Monoid<TaskEither<L, A>> => ...
```

Added in v1.9.0

# getApplySemigroup (function)

**Signature**

```ts
export const getApplySemigroup = <L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> => ...
```

Added in v1.9.0

# getOrElse (function)

**Signature**

```ts
export function getOrElse<E, A>(f: (e: E) => Task<A>): (ma: TaskEither<E, A>) => Task<A> { ... }
```

Added in v1.19.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> => ...
```

Added in v1.9.0

# ~~left~~ (function)

Use `leftTask`

**Signature**

```ts
export const left = <L, A>(fl: Task<L>): TaskEither<L, A> => ...
```

Added in v1.0.0

# left2v (function)

**Signature**

```ts
export function left2v<L>(l: L): TaskEither<L, never> { ... }
```

Added in v1.19.0

# leftIO (function)

**Signature**

```ts
export function leftIO<E>(me: IO<E>): TaskEither<E, never> { ... }
```

Added in v1.19.0

# leftTask (function)

**Signature**

```ts
export function leftTask<E>(me: Task<E>): TaskEither<E, never> { ... }
```

Added in v1.19.0

# orElse (function)

**Signature**

```ts
export function orElse<E, A, M>(f: (e: E) => TaskEither<M, A>): (ma: TaskEither<E, A>) => TaskEither<M, A> { ... }
```

Added in v1.19.0

# ~~right~~ (function)

Use `rightTask`

**Signature**

```ts
export const right = <L, A>(fa: Task<A>): TaskEither<L, A> => ...
```

Added in v1.0.0

# right2v (function)

**Signature**

```ts
export function right2v<A>(a: A): TaskEither<never, A> { ... }
```

Added in v1.19.0

# rightIO (function)

**Signature**

```ts
export function rightIO<A>(ma: IO<A>): TaskEither<never, A> { ... }
```

Added in v1.19.0

# rightTask (function)

**Signature**

```ts
export function rightTask<A>(ma: Task<A>): TaskEither<never, A> { ... }
```

Added in v1.19.0

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

Added in v1.5.0

# tryCatch (function)

Transforms a `Promise` into a `TaskEither`, catching the possible error.

**Signature**

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
