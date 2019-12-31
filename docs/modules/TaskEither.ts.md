---
title: TaskEither.ts
nav_order: 82
parent: Modules
---

# TaskEither overview

`TaskEither<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Task`.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [TaskEither (interface)](#taskeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [fromIOEither (constant)](#fromioeither-constant)
- [left (constant)](#left-constant)
- [leftTask (constant)](#lefttask-constant)
- [right (constant)](#right-constant)
- [rightTask (constant)](#righttask-constant)
- [swap (constant)](#swap-constant)
- [taskEither (constant)](#taskeither-constant)
- [taskEitherSeq (constant)](#taskeitherseq-constant)
- [bracket (function)](#bracket-function)
- [chainEitherK (function)](#chaineitherk-function)
- [chainIOEitherK (function)](#chainioeitherk-function)
- [fold (function)](#fold-function)
- [fromEitherK (function)](#fromeitherk-function)
- [fromIOEitherK (function)](#fromioeitherk-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getFilterable (function)](#getfilterable-function)
- [getOrElse (function)](#getorelse-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getTaskValidation (function)](#gettaskvalidation-function)
- [leftIO (function)](#leftio-function)
- [orElse (function)](#orelse-function)
- [rightIO (function)](#rightio-function)
- [taskify (function)](#taskify-function)
- [tryCatch (function)](#trycatch-function)
- [alt (export)](#alt-export)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [bimap (export)](#bimap-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [filterOrElse (export)](#filterorelse-export)
- [flatten (export)](#flatten-export)
- [fromEither (export)](#fromeither-export)
- [fromOption (export)](#fromoption-export)
- [fromPredicate (export)](#frompredicate-export)
- [map (export)](#map-export)
- [mapLeft (export)](#mapleft-export)

---

# TaskEither (interface)

**Signature**

```ts
export interface TaskEither<E, A> extends Task<Either<E, A>> {}
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
export const URI: "TaskEither" = ...
```

Added in v2.0.0

# fromIOEither (constant)

**Signature**

```ts
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskEither<E, A> = ...
```

Added in v2.0.0

# left (constant)

**Signature**

```ts
export const left: <E = ...
```

Added in v2.0.0

# leftTask (constant)

**Signature**

```ts
export const leftTask: <E = ...
```

Added in v2.0.0

# right (constant)

**Signature**

```ts
export const right: <E = ...
```

Added in v2.0.0

# rightTask (constant)

**Signature**

```ts
export const rightTask: <E = ...
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
export const taskEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadTask2<URI> & MonadThrow2<URI> = ...
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

Make sure that a resource is cleaned up in the event of an exception (_). The release action is called regardless of
whether the body action throws (_) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export function bracket<E, A, B>(
  acquire: TaskEither<E, A>,
  use: (a: A) => TaskEither<E, B>,
  release: (a: A, e: Either<E, B>) => TaskEither<E, void>
): TaskEither<E, B> { ... }
```

Added in v2.0.0

# chainEitherK (function)

**Signature**

```ts
export function chainEitherK<E, A, B>(f: (a: A) => Either<E, B>): (ma: TaskEither<E, A>) => TaskEither<E, B> { ... }
```

Added in v2.4.0

# chainIOEitherK (function)

**Signature**

```ts
export function chainIOEitherK<E, A, B>(f: (a: A) => IOEither<E, B>): (ma: TaskEither<E, A>) => TaskEither<E, B> { ... }
```

Added in v2.4.0

# fold (function)

**Signature**

```ts
export function fold<E, A, B>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>
): (ma: TaskEither<E, A>) => Task<B> { ... }
```

Added in v2.0.0

# fromEitherK (function)

**Signature**

```ts
export function fromEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => TaskEither<E, B> { ... }
```

Added in v2.4.0

# fromIOEitherK (function)

**Signature**

```ts
export function fromIOEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): (...a: A) => TaskEither<E, B> { ... }
```

Added in v2.4.0

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

# getFilterable (function)

**Signature**

```ts
export function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E> { ... }
```

Added in v2.1.0

# getOrElse (function)

**Signature**

```ts
export function getOrElse<E, A>(onLeft: (e: E) => Task<A>): (ma: TaskEither<E, A>) => Task<A> { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>> { ... }
```

Added in v2.0.0

# getTaskValidation (function)

**Signature**

```ts
export function getTaskValidation<E>(
  S: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2C<URI, E> & Alt2C<URI, E> & MonadTask2C<URI, E> & MonadThrow2C<URI, E> { ... }
```

Added in v2.0.0

# leftIO (function)

**Signature**

```ts
export function leftIO<E = never, A = never>(me: IO<E>): TaskEither<E, A> { ... }
```

Added in v2.0.0

# orElse (function)

**Signature**

```ts
export function orElse<E, A, M>(onLeft: (e: E) => TaskEither<M, A>): (ma: TaskEither<E, A>) => TaskEither<M, A> { ... }
```

Added in v2.0.0

# rightIO (function)

**Signature**

```ts
export function rightIO<E = never, A = never>(ma: IO<A>): TaskEither<E, A> { ... }
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

Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.

Note: `f` should never `throw` errors, they are not caught.

**Signature**

```ts
export function tryCatch<E, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E): TaskEither<E, A> { ... }
```

**Example**

```ts
import { left, right } from 'fp-ts/lib/Either'
import { tryCatch } from 'fp-ts/lib/TaskEither'

tryCatch(() => Promise.resolve(1), String)().then(result => {
  assert.deepStrictEqual(result, right(1))
})
tryCatch(() => Promise.reject('error'), String)().then(result => {
  assert.deepStrictEqual(result, left('error'))
})
```

Added in v2.0.0

# alt (export)

**Signature**

```ts
<E, A>(that: () => TaskEither<E, A>) => (fa: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

# ap (export)

**Signature**

```ts
<E, A>(fa: TaskEither<E, A>) => <B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B>
```

Added in v2.0.0

# apFirst (export)

**Signature**

```ts
<E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

# apSecond (export)

**Signature**

```ts
<E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.0.0

# bimap (export)

**Signature**

```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskEither<E, A>) => TaskEither<G, B>
```

Added in v2.0.0

# chain (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.0.0

# chainFirst (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

# filterOrElse (export)

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, A>; }
```

Added in v2.0.0

# flatten (export)

**Signature**

```ts
<E, A>(mma: TaskEither<E, TaskEither<E, A>>) => TaskEither<E, A>
```

Added in v2.0.0

# fromEither (export)

**Signature**

```ts
<E, A>(ma: E.Either<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

# fromOption (export)

**Signature**

```ts
<E>(onNone: () => E) => <A>(ma: Option<A>) => TaskEither<E, A>
```

Added in v2.0.0

# fromPredicate (export)

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => TaskEither<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => TaskEither<E, A>; }
```

Added in v2.0.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.0.0

# mapLeft (export)

**Signature**

```ts
<E, G>(f: (e: E) => G) => <A>(fa: TaskEither<E, A>) => TaskEither<G, A>
```

Added in v2.0.0
