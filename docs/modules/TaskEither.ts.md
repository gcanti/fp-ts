---
title: TaskEither.ts
nav_order: 88
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
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [bimap](#bimap)
- [bracket](#bracket)
- [chain](#chain)
- [chainEitherK](#chaineitherk)
- [chainEitherKW](#chaineitherkw)
- [chainFirst](#chainfirst)
- [chainIOEitherK](#chainioeitherk)
- [chainIOEitherKW](#chainioeitherkw)
- [chainW](#chainw)
- [filterOrElse](#filterorelse)
- [flatten](#flatten)
- [fold](#fold)
- [fromEither](#fromeither)
- [fromEitherK](#fromeitherk)
- [fromIOEither](#fromioeither)
- [fromIOEitherK](#fromioeitherk)
- [fromOption](#fromoption)
- [fromPredicate](#frompredicate)
- [getApplyMonoid](#getapplymonoid)
- [getApplySemigroup](#getapplysemigroup)
- [getFilterable](#getfilterable)
- [getOrElse](#getorelse)
- [getOrElseW](#getorelsew)
- [getSemigroup](#getsemigroup)
- [getTaskValidation](#gettaskvalidation)
- [left](#left)
- [leftIO](#leftio)
- [leftTask](#lefttask)
- [map](#map)
- [mapLeft](#mapleft)
- [orElse](#orelse)
- [right](#right)
- [rightIO](#rightio)
- [rightTask](#righttask)
- [swap](#swap)
- [taskEither](#taskeither)
- [taskEitherSeq](#taskeitherseq)
- [taskify](#taskify)
- [tryCatch](#trycatch)
- [tryCatchK](#trycatchk)

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

# URI

**Signature**

```ts
export declare const URI: 'TaskEither'
```

Added in v2.0.0

# alt

**Signature**

```ts
export declare const alt: <E, A>(that: () => TaskEither<E, A>) => (fa: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

# ap

**Signature**

```ts
export declare const ap: <E, A>(fa: TaskEither<E, A>) => <B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
export declare const apFirst: <E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
export declare const apSecond: <E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.0.0

# bimap

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskEither<E, A>) => TaskEither<G, B>
```

Added in v2.0.0

# bracket

Make sure that a resource is cleaned up in the event of an exception (_). The release action is called regardless of
whether the body action throws (_) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export declare function bracket<E, A, B>(
  acquire: TaskEither<E, A>,
  use: (a: A) => TaskEither<E, B>,
  release: (a: A, e: Either<E, B>) => TaskEither<E, void>
): TaskEither<E, B>
```

Added in v2.0.0

# chain

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.0.0

# chainEitherK

**Signature**

```ts
export declare function chainEitherK<E, A, B>(f: (a: A) => Either<E, B>): (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.4.0

# chainEitherKW

**Signature**

```ts
export declare const chainEitherKW: <D, A, B>(
  f: (a: A) => E.Either<D, B>
) => <E>(ma: TaskEither<E, A>) => TaskEither<D | E, B>
```

Added in v2.6.1

# chainFirst

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

# chainIOEitherK

**Signature**

```ts
export declare function chainIOEitherK<E, A, B>(f: (a: A) => IOEither<E, B>): (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.4.0

# chainIOEitherKW

**Signature**

```ts
export declare const chainIOEitherKW: <D, A, B>(
  f: (a: A) => IOEither<D, B>
) => <E>(ma: TaskEither<E, A>) => TaskEither<D | E, B>
```

Added in v2.6.1

# chainW

**Signature**

```ts
export declare const chainW: <D, A, B>(
  f: (a: A) => TaskEither<D, B>
) => <E>(ma: TaskEither<E, A>) => TaskEither<D | E, B>
```

Added in v2.6.0

# filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, A>
}
```

Added in v2.0.0

# flatten

**Signature**

```ts
export declare const flatten: <E, A>(mma: TaskEither<E, TaskEither<E, A>>) => TaskEither<E, A>
```

Added in v2.0.0

# fold

**Signature**

```ts
export declare function fold<E, A, B>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>
): (ma: TaskEither<E, A>) => Task<B>
```

Added in v2.0.0

# fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(ma: E.Either<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

# fromEitherK

**Signature**

```ts
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => TaskEither<E, B>
```

Added in v2.4.0

# fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

# fromIOEitherK

**Signature**

```ts
export declare function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): (...a: A) => TaskEither<E, B>
```

Added in v2.4.0

# fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => TaskEither<E, A>
```

Added in v2.0.0

# fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => TaskEither<E, A>
}
```

Added in v2.0.0

# getApplyMonoid

**Signature**

```ts
export declare function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<TaskEither<E, A>>
```

Added in v2.0.0

# getApplySemigroup

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are appended using the provided `Semigroup`

**Signature**

```ts
export declare function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>>
```

Added in v2.0.0

# getFilterable

**Signature**

```ts
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>
```

Added in v2.1.0

# getOrElse

**Signature**

```ts
export declare function getOrElse<E, A>(onLeft: (e: E) => Task<A>): (ma: TaskEither<E, A>) => Task<A>
```

Added in v2.0.0

# getOrElseW

**Signature**

```ts
export declare const getOrElseW: <E, B>(onLeft: (e: E) => Task<B>) => <A>(ma: TaskEither<E, A>) => Task<B | A>
```

Added in v2.6.0

# getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
appended using the provided `Semigroup`

**Signature**

```ts
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>>
```

Added in v2.0.0

# getTaskValidation

**Signature**

```ts
export declare function getTaskValidation<E>(
  S: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2<URI> & Alt2C<URI, E> & MonadTask2C<URI, E> & MonadThrow2C<URI, E>
```

Added in v2.0.0

# left

**Signature**

```ts
export declare const left: <E = never, A = never>(e: E) => TaskEither<E, A>
```

Added in v2.0.0

# leftIO

**Signature**

```ts
export declare function leftIO<E = never, A = never>(me: IO<E>): TaskEither<E, A>
```

Added in v2.0.0

# leftTask

**Signature**

```ts
export declare const leftTask: <E = never, A = never>(me: Task<E>) => TaskEither<E, A>
```

Added in v2.0.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.0.0

# mapLeft

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskEither<E, A>) => TaskEither<G, A>
```

Added in v2.0.0

# orElse

**Signature**

```ts
export declare function orElse<E, A, M>(onLeft: (e: E) => TaskEither<M, A>): (ma: TaskEither<E, A>) => TaskEither<M, A>
```

Added in v2.0.0

# right

**Signature**

```ts
export declare const right: <E = never, A = never>(a: A) => TaskEither<E, A>
```

Added in v2.0.0

# rightIO

**Signature**

```ts
export declare function rightIO<E = never, A = never>(ma: IO<A>): TaskEither<E, A>
```

Added in v2.0.0

# rightTask

**Signature**

```ts
export declare const rightTask: <E = never, A = never>(ma: Task<A>) => TaskEither<E, A>
```

Added in v2.0.0

# swap

**Signature**

```ts
export declare const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E>
```

Added in v2.0.0

# taskEither

**Signature**

```ts
export declare const taskEither: Monad2<'TaskEither'> &
  Bifunctor2<'TaskEither'> &
  Alt2<'TaskEither'> &
  MonadTask2<'TaskEither'> &
  MonadThrow2<'TaskEither'>
```

Added in v2.0.0

# taskEitherSeq

Like `TaskEither` but `ap` is sequential

**Signature**

```ts
export declare const taskEitherSeq: Monad2<'TaskEither'> &
  Bifunctor2<'TaskEither'> &
  Alt2<'TaskEither'> &
  MonadTask2<'TaskEither'> &
  MonadThrow2<'TaskEither'>
```

Added in v2.0.0

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

**Signature**

```ts
export declare function taskify<L, R>(f: (cb: (e: L | null | undefined, r?: R) => void) => void): () => TaskEither<L, R>
export declare function taskify<A, L, R>(
  f: (a: A, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A) => TaskEither<L, R>
export declare function taskify<A, B, L, R>(
  f: (a: A, b: B, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B) => TaskEither<L, R>
export declare function taskify<A, B, C, L, R>(
  f: (a: A, b: B, c: C, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C) => TaskEither<L, R>
export declare function taskify<A, B, C, D, L, R>(
  f: (a: A, b: B, c: C, d: D, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D) => TaskEither<L, R>
export declare function taskify<A, B, C, D, E, L, R>(
  f: (a: A, b: B, c: C, d: D, e: E, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D, e: E) => TaskEither<L, R>
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

# tryCatch

Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.

Note: `f` should never `throw` errors, they are not caught.

**Signature**

```ts
export declare function tryCatch<E, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E): TaskEither<E, A>
```

**Example**

```ts
import { left, right } from 'fp-ts/lib/Either'
import { tryCatch } from 'fp-ts/lib/TaskEither'

tryCatch(() => Promise.resolve(1), String)().then((result) => {
  assert.deepStrictEqual(result, right(1))
})
tryCatch(() => Promise.reject('error'), String)().then((result) => {
  assert.deepStrictEqual(result, left('error'))
})
```

Added in v2.0.0

# tryCatchK

Converts a function returning a `Promise` to one returning a `TaskEither`.

**Signature**

```ts
export declare function tryCatchK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Promise<B>,
  onRejected: (reason: unknown) => E
): (...a: A) => TaskEither<E, B>
```

Added in v2.5.0
