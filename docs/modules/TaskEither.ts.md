---
title: TaskEither.ts
nav_order: 98
parent: Modules
---

## TaskEither overview

```ts
interface TaskEither<E, A> extends Task<Either<E, A>> {}
```

`TaskEither<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Task`.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [delay](#delay)
- [constructors](#constructors)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftTask](#lefttask)
  - [of](#of)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightTask](#righttask)
  - [sleep](#sleep)
- [conversions](#conversions)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromTask](#fromtask)
  - [fromTaskOption](#fromtaskoption)
  - [toUnion](#tounion)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [getOrElse](#getorelse)
  - [getOrElseTask](#getorelsetask)
  - [getValidatedApplicative](#getvalidatedapplicative)
  - [getValidatedSemigroupKind](#getvalidatedsemigroupkind)
  - [mapError](#maperror)
  - [orElse](#orelse)
  - [tapError](#taperror)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [separate](#separate)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Bifunctor](#bifunctor)
  - [CategoryKind](#categorykind)
  - [ComposableKind](#composablekind)
  - [Flattenable](#flattenable)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromTask](#fromtask)
  - [Functor](#functor)
  - [Monad](#monad)
  - [Pointed](#pointed)
  - [SemigroupKind](#semigroupkind)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
- [interop](#interop)
  - [fromRejectable](#fromrejectable)
  - [liftRejectable](#liftrejectable)
  - [taskify](#taskify)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftEither](#lifteither)
  - [liftIO](#liftio)
  - [liftIOEither](#liftioeither)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftTask](#lifttask)
  - [liftTaskOption](#lifttaskoption)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
  - [mapBoth](#mapboth)
- [model](#model)
  - [TaskEither (interface)](#taskeither-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
  - [matchTask](#matchtask)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapEither](#flatmapeither)
  - [flatMapIO](#flatmapio)
  - [flatMapIOEither](#flatmapioeither)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [flatMapTask](#flatmaptask)
  - [flatMapTaskOption](#flatmaptaskoption)
  - [flatten](#flatten)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArrayPar](#sequencereadonlyarraypar)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayPar](#traversereadonlyarraypar)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexPar](#traversereadonlyarraywithindexpar)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayPar](#traversereadonlynonemptyarraypar)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexPar](#traversereadonlynonemptyarraywithindexpar)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [TaskEitherTypeLambda (interface)](#taskeithertypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [bracket](#bracket)
  - [composeKind](#composekind)
  - [idKind](#idkind)
  - [swap](#swap)
  - [tap](#tap)
  - [unit](#unit)

---

# combinators

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (duration: number) => <E, A>(self: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v3.0.0

# constructors

## left

**Signature**

```ts
export declare const left: <E>(e: E) => TaskEither<E, never>
```

Added in v3.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E>(io: IO<E>) => TaskEither<E, never>
```

Added in v3.0.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E>(task: task.Task<E>) => TaskEither<E, never>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => TaskEither<never, A>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A>(a: A) => TaskEither<never, A>
```

Added in v3.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <A>(io: IO<A>) => TaskEither<never, A>
```

Added in v3.0.0

## rightTask

**Signature**

```ts
export declare const rightTask: <A>(task: task.Task<A>) => TaskEither<never, A>
```

Added in v3.0.0

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: (duration: number) => TaskEither<never, void>
```

Added in v3.0.0

# conversions

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(either: either.Either<E, A>) => TaskEither<E, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(io: IO<A>) => TaskEither<never, A>
```

Added in v3.0.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A>(ioEither: IOEither<E, A>) => TaskEither<E, A>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => TaskEither<E, NonNullable<A>>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => TaskEither<E, A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A>(task: task.Task<A>) => TaskEither<never, A>
```

Added in v3.0.0

## fromTaskOption

**Signature**

```ts
export declare const fromTaskOption: <E>(onNone: LazyArg<E>) => <A>(self: TaskOption<A>) => TaskEither<E, A>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: TaskEither<E, A>) => task.Task<E | A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: TaskEither<never, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskEither<E2, B>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  fb: TaskEither<E2, B>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <E, A>(self: TaskEither<E, A>) => TaskEither<E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: TaskEither<E, A>) => TaskEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# error handling

## catchAll

Recovers from all errors.

**Signature**

```ts
export declare const catchAll: <E1, E2, B>(
  onError: (e: E1) => TaskEither<E2, B>
) => <A>(self: TaskEither<E1, A>) => TaskEither<E2, B | A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/Function'
import * as TE from 'fp-ts/TaskEither'

async function test() {
  const errorHandler = TE.catchAll((error: string) => TE.right(`recovering from ${error}...`))
  assert.deepStrictEqual(await pipe(TE.right('ok'), errorHandler)(), E.right('ok'))
  assert.deepStrictEqual(await pipe(TE.left('ko'), errorHandler)(), E.right('recovering from ko...'))
}

test()
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, B>(onError: (e: E) => B) => <A>(self: TaskEither<E, A>) => task.Task<B | A>
```

Added in v3.0.0

## getOrElseTask

**Signature**

```ts
export declare const getOrElseTask: <E, B>(
  onError: (e: E) => task.Task<B>
) => <A>(self: TaskEither<E, A>) => task.Task<B | A>
```

Added in v3.0.0

## getValidatedApplicative

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedApplicative: <E>(
  Apply: apply.Apply<task.TaskTypeLambda>,
  Semigroup: Semigroup<E>
) => applicative.Applicative<either.ValidatedTypeLambda<TaskEitherTypeLambda, E>>
```

Added in v3.0.0

## getValidatedSemigroupKind

The default [`SemigroupKind`](#semigroupkind) instance returns the last error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedSemigroupKind: <E>(
  Semigroup: Semigroup<E>
) => semigroupKind.SemigroupKind<either.ValidatedTypeLambda<TaskEitherTypeLambda, E>>
```

Added in v3.0.0

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(f: (e: E) => G) => <A>(self: TaskEither<E, A>) => TaskEither<G, A>
```

Added in v3.0.0

## orElse

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `TaskEither` returns `self` if it is a `Right` or the value returned by `that` otherwise.

**Signature**

```ts
export declare const orElse: <E2, B>(
  that: TaskEither<E2, B>
) => <E1, A>(self: TaskEither<E1, A>) => TaskEither<E2, B | A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/Function'
import * as TE from 'fp-ts/TaskEither'

async function test() {
  assert.deepStrictEqual(await pipe(TE.right(1), TE.orElse(TE.right(2)))(), E.right(1))
  assert.deepStrictEqual(await pipe(TE.left('a'), TE.orElse(TE.right(2)))(), E.right(2))
  assert.deepStrictEqual(await pipe(TE.left('a'), TE.orElse(TE.left('b')))(), E.left('b'))
}

test()
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, E2, _>(
  onError: (e: E1) => TaskEither<E2, _>
) => <A>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, A>
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <E>(onNone: LazyArg<E>) => <A>(self: TaskEither<E, Option<A>>) => TaskEither<E, A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <E1>(
    self: TaskEither<E1, C>
  ) => TaskEither<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <E1>(
    self: TaskEither<E1, B>
  ) => TaskEither<E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => (self: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (
    self: TaskEither<E, C>
  ) => readonly [TaskEither<E, C>, TaskEither<E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (
    self: TaskEither<E, B>
  ) => readonly [TaskEither<E, B>, TaskEither<E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C, E>(
  f: (a: A) => either.Either<B, C>,
  onEmpty: (a: A) => E
) => (self: TaskEither<E, A>) => readonly [TaskEither<E, B>, TaskEither<E, C>]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <E>(
  onEmpty: LazyArg<E>
) => <A, B>(self: TaskEither<E, either.Either<A, B>>) => readonly [TaskEither<E, A>, TaskEither<E, B>]
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<TaskEitherTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<TaskEitherTypeLambda>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<TaskEitherTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: categoryKind.CategoryKind<TaskEitherTypeLambda>
```

Added in v3.0.0

## ComposableKind

**Signature**

```ts
export declare const ComposableKind: composableKind.ComposableKind<TaskEitherTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<TaskEitherTypeLambda>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: fromEither_.FromEither<TaskEitherTypeLambda>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<TaskEitherTypeLambda>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: fromTask_.FromTask<TaskEitherTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<TaskEitherTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<TaskEitherTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<TaskEitherTypeLambda>
```

Added in v3.0.0

## SemigroupKind

**Signature**

```ts
export declare const SemigroupKind: semigroupKind.SemigroupKind<TaskEitherTypeLambda>
```

Added in v3.0.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(
  M: Monoid<E>
) => Compactable<either.ValidatedTypeLambda<TaskEitherTypeLambda, E>>
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(M: Monoid<E>) => Filterable<either.ValidatedTypeLambda<TaskEitherTypeLambda, E>>
```

Added in v3.0.0

# interop

## fromRejectable

Converts a `Promise` that may reject to a `TaskEither`.

**Signature**

```ts
export declare const fromRejectable: <A, E>(
  f: LazyArg<Promise<A>>,
  onRejected: (reason: unknown) => E
) => TaskEither<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import { identity } from 'fp-ts/Function'

async function test() {
  assert.deepStrictEqual(await TE.fromRejectable(() => Promise.resolve(1), identity)(), E.right(1))
  assert.deepStrictEqual(await TE.fromRejectable(() => Promise.reject('error'), identity)(), E.left('error'))
}

test()
```

Added in v3.0.0

## liftRejectable

Lifts a function returning a `Promise` that may reject to one returning a `TaskEither`.

**Signature**

```ts
export declare const liftRejectable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Promise<B>,
  onRejected: (error: unknown) => E
) => (...a: A) => TaskEither<E, B>
```

Added in v3.0.0

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
import { taskify } from 'fp-ts/TaskEither'
import * as fs from 'fs'

// const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
const stat = taskify(fs.stat)
assert.strictEqual(stat.length, 0)
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `TaskEither`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: TaskEither<E1, A>, fb: TaskEither<E2, B>) => TaskEither<E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `TaskEither`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(fa: TaskEither<E1, A>, fb: TaskEither<E2, B>, fc: TaskEither<E3, C>) => TaskEither<E1 | E2 | E3, D>
```

Added in v3.0.0

## liftEither

**Signature**

```ts
export declare const liftEither: <A extends readonly unknown[], E, B>(
  f: (...a: A) => either.Either<E, B>
) => (...a: A) => TaskEither<E, B>
```

Added in v3.0.0

## liftIO

**Signature**

```ts
export declare const liftIO: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => (...a: A) => TaskEither<never, B>
```

Added in v3.0.0

## liftIOEither

**Signature**

```ts
export declare const liftIOEither: <A extends readonly unknown[], E, B>(
  f: (...a: A) => IOEither<E, B>
) => (...a: A) => TaskEither<E, B>
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: LazyArg<E>
) => (...a: A) => TaskEither<E, NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => TaskEither<E, B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => TaskEither<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => TaskEither<E, B>
}
```

Added in v3.0.0

## liftTask

**Signature**

```ts
export declare const liftTask: <A extends readonly unknown[], B>(
  f: (...a: A) => task.Task<B>
) => (...a: A) => TaskEither<never, B>
```

Added in v3.0.0

## liftTaskOption

**Signature**

```ts
export declare const liftTaskOption: <E>(
  onNone: LazyArg<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => TaskOption<B>) => (...a: A) => TaskEither<E, B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => TaskEither<never, void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => TaskEither<never, void>
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => (self: TaskEither<E, A>) => TaskEither<G, B>
```

Added in v3.0.0

# model

## TaskEither (interface)

**Signature**

```ts
export interface TaskEither<E, A> extends Task<Either<E, A>> {}
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => (task: TaskEither<E, A>) => task.Task<B | C>
```

Added in v3.0.0

## matchTask

**Signature**

```ts
export declare const matchTask: <E, B, A, C = B>(
  onError: (e: E) => task.Task<B>,
  onSuccess: (a: A) => task.Task<C>
) => (self: TaskEither<E, A>) => task.Task<B | C>
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## flatMapEither

**Signature**

```ts
export declare const flatMapEither: <A, E2, B>(
  f: (a: A) => either.Either<E2, B>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## flatMapIO

**Signature**

```ts
export declare const flatMapIO: <A, B>(f: (a: A) => IO<B>) => <E>(self: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

## flatMapIOEither

**Signature**

```ts
export declare const flatMapIOEither: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: LazyArg<E2>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, NonNullable<B>>
```

Added in v3.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E2
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## flatMapTask

**Signature**

```ts
export declare const flatMapTask: <A, B>(f: (a: A) => task.Task<B>) => <E>(self: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

## flatMapTaskOption

**Signature**

```ts
export declare const flatMapTaskOption: <A, B, E2>(
  f: (a: A) => TaskOption<B>,
  onNone: LazyArg<E2>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <E1, E2, A>(self: TaskEither<E1, TaskEither<E2, A>>) => TaskEither<E1 | E2, A>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E, A>(arr: readonly TaskEither<E, A>[]) => TaskEither<E, readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArrayPar

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArrayPar: <E, A>(arr: readonly TaskEither<E, A>[]) => TaskEither<E, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayPar

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayPar: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexPar

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexPar: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => (as: readonly [A, ...A[]]) => TaskEither<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayPar

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayPar: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => (as: readonly [A, ...A[]]) => TaskEither<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: readonly [A, ...A[]]) => TaskEither<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexPar

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexPar: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: readonly [A, ...A[]]) => TaskEither<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <E2, _>(
  that: TaskEither<E2, _>
) => <E1, A>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <E2, A>(
  that: TaskEither<E2, A>
) => <E1, _>(self: TaskEither<E1, _>) => TaskEither<E2 | E1, A>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: TaskEither<never, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(self: TaskEither<E, A>) => TaskEither<E, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <E2, B>(
  fb: TaskEither<E2, B>
) => <E1, A extends readonly unknown[]>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <E2, B, A, C>(
  that: TaskEither<E2, B>,
  f: (a: A, b: B) => C
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, C>
```

Added in v3.0.0

# type lambdas

## TaskEitherTypeLambda (interface)

**Signature**

```ts
export interface TaskEitherTypeLambda extends TypeLambda {
  readonly type: TaskEither<this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <E2, A>(
  fa: TaskEither<E2, A>
) => <E1, B>(self: TaskEither<E1, (a: A) => B>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export declare const bracket: <E1, A, E2, B, E3>(
  acquire: TaskEither<E1, A>,
  use: (a: A) => TaskEither<E2, B>,
  release: (a: A, e: either.Either<E2, B>) => TaskEither<E3, void>
) => TaskEither<E1 | E2 | E3, B>
```

Added in v3.0.0

## composeKind

**Signature**

```ts
export declare const composeKind: <B, E2, C>(
  bfc: (b: B) => TaskEither<E2, C>
) => <A, E1>(afb: (a: A) => TaskEither<E1, B>) => (a: A) => TaskEither<E2 | E1, C>
```

Added in v3.0.0

## idKind

**Signature**

```ts
export declare const idKind: <A>() => (a: A) => TaskEither<never, A>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(self: TaskEither<E, A>) => TaskEither<A, E>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, E2, _>(
  f: (a: A) => TaskEither<E2, _>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, A>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: TaskEither<never, void>
```

Added in v3.0.0
