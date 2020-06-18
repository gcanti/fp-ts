---
title: TaskEither.ts
nav_order: 88
parent: Modules
---

## TaskEither overview

`TaskEither<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Task`.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [chainW](#chainw)
  - [flatten](#flatten)
- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainIOEitherK](#chainioeitherk)
  - [chainIOEitherKW](#chainioeitherkw)
  - [filterOrElse](#filterorelse)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [orElse](#orelse)
  - [swap](#swap)
  - [tryCatchK](#trycatchk)
- [constructors](#constructors)
  - [fromEither](#fromeither)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftTask](#lefttask)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightTask](#righttask)
  - [tryCatch](#trycatch)
- [destructors](#destructors)
  - [fold](#fold)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
- [instances](#instances)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [altTaskEither](#alttaskeither)
  - [applicativeTaskEitherPar](#applicativetaskeitherpar)
  - [applicativeTaskEitherSeq](#applicativetaskeitherseq)
  - [bifunctorTaskEither](#bifunctortaskeither)
  - [functorTaskEither](#functortaskeither)
  - [getApplyMonoid](#getapplymonoid)
  - [getApplySemigroup](#getapplysemigroup)
  - [getFilterable](#getfilterable)
  - [getSemigroup](#getsemigroup)
  - [getTaskValidation](#gettaskvalidation)
  - [taskEither](#taskeither)
  - [taskEitherSeq](#taskeitherseq)
- [model](#model)
  - [TaskEither (interface)](#taskeither-interface)
- [utils](#utils)
  - [bracket](#bracket)
  - [taskify](#taskify)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `TaskEither` returns `fa` if is a `Right` or the value returned by `that` otherwise.

See also [orElse](#orElse).

**Signature**

```ts
export declare const alt: <E, A>(that: Lazy<TaskEither<E, A>>) => (fa: TaskEither<E, A>) => TaskEither<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

async function test() {
  assert.deepStrictEqual(
    await pipe(
      TE.right(1),
      TE.alt(() => TE.right(2))
    )(),
    E.right(1)
  )
  assert.deepStrictEqual(
    await pipe(
      TE.left('a'),
      TE.alt(() => TE.right(2))
    )(),
    E.right(2)
  )
  assert.deepStrictEqual(
    await pipe(
      TE.left('a'),
      TE.alt(() => TE.left('b'))
    )(),
    E.left('b')
  )
}

test()
```

Added in v2.0.0

# Applicative

## of

**Signature**

```ts
export declare const of: <E, A>(a: A) => TaskEither<E, A>
```

Added in v2.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(fa: TaskEither<E, A>) => <B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B>
```

Added in v2.0.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <E, B>(fb: TaskEither<E, B>) => <A>(fa: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.0.0

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskEither<E, A>) => TaskEither<G, B>
```

Added in v2.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskEither<E, A>) => TaskEither<G, A>
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <D>(ma: TaskEither<D, A>) => TaskEither<E | D, B>
```

Added in v2.6.0

## flatten

**Signature**

```ts
export declare const flatten: <E, A>(mma: TaskEither<E, TaskEither<E, A>>) => TaskEither<E, A>
```

Added in v2.0.0

# combinators

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(f: (a: A) => E.Either<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.4.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chainEitherK).

**Signature**

```ts
export declare const chainEitherKW: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <D>(ma: TaskEither<D, A>) => TaskEither<E | D, B>
```

Added in v2.6.1

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.4.0

## chainIOEitherKW

Less strict version of [`chainIOEitherK`](#chainIOEitherK).

**Signature**

```ts
export declare const chainIOEitherKW: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <D>(ma: TaskEither<D, A>) => TaskEither<E | D, B>
```

Added in v2.6.1

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, A>
}
```

Added in v2.0.0

## fromEitherK

**Signature**

```ts
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => TaskEither<E, B>
```

Added in v2.4.0

## fromIOEitherK

**Signature**

```ts
export declare function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): (...a: A) => TaskEither<E, B>
```

Added in v2.4.0

## orElse

Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.

See also [alt](#alt).

**Signature**

```ts
export declare const orElse: <E, A, M>(onLeft: (e: E) => TaskEither<M, A>) => (ma: TaskEither<E, A>) => TaskEither<M, A>
```

**Example**

```ts
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

async function test() {
  const errorHandler = TE.orElse((error: string) => TE.right(`recovering from ${error}...`))
  assert.deepStrictEqual(await pipe(TE.right('ok'), errorHandler)(), E.right('ok'))
  assert.deepStrictEqual(await pipe(TE.left('ko'), errorHandler)(), E.right('recovering from ko...'))
}

test()
```

Added in v2.0.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E>
```

Added in v2.0.0

## tryCatchK

Converts a function returning a `Promise` to one returning a `TaskEither`.

**Signature**

```ts
export declare function tryCatchK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Promise<B>,
  onRejected: (reason: unknown) => E
): (...a: A) => TaskEither<E, B>
```

Added in v2.5.0

# constructors

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(ma: E.Either<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => TaskEither<E, A>
```

Added in v2.0.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => TaskEither<E, A>
}
```

Added in v2.0.0

## left

**Signature**

```ts
export declare const left: <E = never, A = never>(e: E) => TaskEither<E, A>
```

Added in v2.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E = never, A = never>(me: IO<E>) => TaskEither<E, A>
```

Added in v2.0.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E = never, A = never>(me: T.Task<E>) => TaskEither<E, A>
```

Added in v2.0.0

## right

**Signature**

```ts
export declare const right: <E = never, A = never>(a: A) => TaskEither<E, A>
```

Added in v2.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <E = never, A = never>(ma: IO<A>) => TaskEither<E, A>
```

Added in v2.0.0

## rightTask

**Signature**

```ts
export declare const rightTask: <E = never, A = never>(ma: T.Task<A>) => TaskEither<E, A>
```

Added in v2.0.0

## tryCatch

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

# destructors

## fold

**Signature**

```ts
export declare const fold: <E, A, B>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<B>
) => (ma: TaskEither<E, A>) => T.Task<B>
```

Added in v2.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, A>(onLeft: (e: E) => T.Task<A>) => (ma: TaskEither<E, A>) => T.Task<A>
```

Added in v2.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getOrElse).

**Signature**

```ts
export declare const getOrElseW: <E, B>(onLeft: (e: E) => T.Task<B>) => <A>(ma: TaskEither<E, A>) => T.Task<B | A>
```

Added in v2.6.0

# instances

## URI

**Signature**

```ts
export declare const URI: 'TaskEither'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## altTaskEither

**Signature**

```ts
export declare const altTaskEither: Alt2<'TaskEither'>
```

Added in v2.7.0

## applicativeTaskEitherPar

**Signature**

```ts
export declare const applicativeTaskEitherPar: Applicative2<'TaskEither'>
```

Added in v2.7.0

## applicativeTaskEitherSeq

**Signature**

```ts
export declare const applicativeTaskEitherSeq: Applicative2<'TaskEither'>
```

Added in v2.7.0

## bifunctorTaskEither

**Signature**

```ts
export declare const bifunctorTaskEither: Bifunctor2<'TaskEither'>
```

Added in v2.7.0

## functorTaskEither

**Signature**

```ts
export declare const functorTaskEither: Functor2<'TaskEither'>
```

Added in v2.7.0

## getApplyMonoid

**Signature**

```ts
export declare function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<TaskEither<E, A>>
```

Added in v2.0.0

## getApplySemigroup

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are concatenated using the provided `Semigroup`

**Signature**

```ts
export declare function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>>
```

Added in v2.0.0

## getFilterable

**Signature**

```ts
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>
```

Added in v2.1.0

## getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
concatenated using the provided `Semigroup`

**Signature**

```ts
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<TaskEither<E, A>>
```

Added in v2.0.0

## getTaskValidation

**Signature**

```ts
export declare function getTaskValidation<E>(
  S: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2<URI> & Alt2C<URI, E> & MonadTask2C<URI, E> & MonadThrow2C<URI, E>
```

Added in v2.0.0

## taskEither

**Signature**

```ts
export declare const taskEither: Monad2<'TaskEither'> &
  Bifunctor2<'TaskEither'> &
  Alt2<'TaskEither'> &
  MonadTask2<'TaskEither'> &
  MonadThrow2<'TaskEither'>
```

Added in v2.0.0

## taskEitherSeq

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

# model

## TaskEither (interface)

**Signature**

```ts
export interface TaskEither<E, A> extends Task<Either<E, A>> {}
```

Added in v2.0.0

# utils

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export declare const bracket: <E, A, B>(
  acquire: TaskEither<E, A>,
  use: (a: A) => TaskEither<E, B>,
  release: (a: A, e: E.Either<E, B>) => TaskEither<E, void>
) => TaskEither<E, B>
```

Added in v2.0.0

## taskify

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
