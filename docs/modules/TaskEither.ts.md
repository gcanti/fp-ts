---
title: TaskEither.ts
nav_order: 97
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

- [Apply](#apply)
  - [ap](#ap)
- [Bifunctor](#bifunctor)
  - [mapBoth](#mapboth)
  - [mapError](#maperror)
- [Flattenable](#flattenable)
  - [flatMap](#flatmap)
- [Functor](#functor)
  - [map](#map)
- [Pointed](#pointed)
  - [of](#of)
- [SemigroupK](#semigroupk)
  - [combineK](#combinek)
- [combinators](#combinators)
  - [delay](#delay)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [flap](#flap)
  - [flatMapEitherK](#flatmapeitherk)
  - [flatMapIOEitherK](#flatmapioeitherk)
  - [flatMapIOK](#flatmapiok)
  - [flatMapOptionK](#flatmapoptionk)
  - [flatMapTaskK](#flatmaptaskk)
  - [flatMapTaskOptionK](#flatmaptaskoptionk)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [fromTaskK](#fromtaskk)
  - [fromTaskOptionK](#fromtaskoptionk)
  - [orElse](#orelse)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [swap](#swap)
  - [tap](#tap)
  - [zipLeftPar](#zipleftpar)
  - [zipRightPar](#ziprightpar)
- [combinatorsError](#combinatorserror)
  - [tapError](#taperror)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftTask](#lefttask)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightTask](#righttask)
  - [sleep](#sleep)
- [destructors](#destructors)
  - [getOrElse](#getorelse)
  - [getOrElseWithEffect](#getorelsewitheffect)
  - [match](#match)
  - [matchWithEffect](#matchwitheffect)
- [instances](#instances)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [Bifunctor](#bifunctor-1)
  - [Flattenable](#flattenable-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [SemigroupK](#semigroupk-1)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
  - [getValidatedApplicative](#getvalidatedapplicative)
  - [getValidatedSemigroupK](#getvalidatedsemigroupk)
- [interop](#interop)
  - [flatMapNullableK](#flatmapnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [toUnion](#tounion)
  - [tryCatch](#trycatch)
  - [tryCatchK](#trycatchk)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [model](#model)
  - [TaskEither (interface)](#taskeither-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromTask](#fromtask)
  - [fromTaskOption](#fromtaskoption)
- [type lambdas](#type-lambdas)
  - [TaskEitherTypeLambda (interface)](#taskeithertypelambda-interface)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apT](#apt)
  - [bind](#bind)
  - [bindPar](#bindpar)
  - [bindTo](#bindto)
  - [bracket](#bracket)
  - [let](#let)
  - [lift2Par](#lift2par)
  - [lift2Seq](#lift2seq)
  - [lift3Par](#lift3par)
  - [lift3Seq](#lift3seq)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArraySeq](#sequencereadonlyarrayseq)
  - [taskify](#taskify)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArraySeq](#traversereadonlyarrayseq)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArraySeq](#traversereadonlynonemptyarrayseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)
  - [tupled](#tupled)
  - [unit](#unit)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E2, A>(
  fa: TaskEither<E2, A>
) => <E1, B>(fab: TaskEither<E1, (a: A) => B>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

# Bifunctor

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

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(f: (e: E) => G) => <A>(self: TaskEither<E, A>) => TaskEither<G, A>
```

Added in v3.0.0

# Flattenable

## flatMap

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const flatMap: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

# Functor

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => TaskEither<never, A>
```

Added in v3.0.0

# SemigroupK

## combineK

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `TaskEither` returns `first` if it is a `Right` or the value returned by `second` otherwise.

See also [orElse](#orElse).

**Signature**

```ts
export declare const combineK: <E2, B>(
  second: LazyArg<TaskEither<E2, B>>
) => <E1, A>(self: TaskEither<E1, A>) => TaskEither<E2, B | A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'

async function test() {
  assert.deepStrictEqual(
    await pipe(
      TE.right(1),
      TE.combineK(() => TE.right(2))
    )(),
    E.right(1)
  )
  assert.deepStrictEqual(
    await pipe(
      TE.left('a'),
      TE.combineK(() => TE.right(2))
    )(),
    E.right(2)
  )
  assert.deepStrictEqual(
    await pipe(
      TE.left('a'),
      TE.combineK(() => TE.left('b'))
    )(),
    E.left('b')
  )
}

test()
```

Added in v3.0.0

# combinators

## delay

Returns an effect that will complete after a time delay (in millis).

**Signature**

```ts
export declare const delay: (duration: number) => <E, A>(self: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <E1>(
    ma: TaskEither<E1, C>
  ) => TaskEither<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <E1>(
    mb: TaskEither<E1, B>
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

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B>
```

Added in v3.0.0

## flatMapEitherK

**Signature**

```ts
export declare const flatMapEitherK: <A, E2, B>(
  f: (a: A) => either.Either<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## flatMapIOEitherK

**Signature**

```ts
export declare const flatMapIOEitherK: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## flatMapIOK

**Signature**

```ts
export declare const flatMapIOK: <A, B>(f: (a: A) => IO<B>) => <E>(self: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

## flatMapOptionK

**Signature**

```ts
export declare const flatMapOptionK: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

## flatMapTaskK

**Signature**

```ts
export declare const flatMapTaskK: <A, B>(f: (a: A) => task.Task<B>) => <E>(self: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

## flatMapTaskOptionK

**Signature**

```ts
export declare const flatMapTaskOptionK: <E2>(
  onNone: LazyArg<E2>
) => <A, B>(f: (a: A) => TaskOption<B>) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## flatten

Derivable from `Flattenable`.

**Signature**

```ts
export declare const flatten: <E1, E2, A>(mma: TaskEither<E1, TaskEither<E2, A>>) => TaskEither<E1 | E2, A>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => either.Either<E, B>
) => (...a: A) => TaskEither<E, B>
```

Added in v3.0.0

## fromIOEitherK

**Signature**

```ts
export declare const fromIOEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => IOEither<E, B>
) => (...a: A) => TaskEither<E, B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => (...a: A) => TaskEither<never, B>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => TaskEither<E, B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => task.Task<B>
) => (...a: A) => TaskEither<never, B>
```

Added in v3.0.0

## fromTaskOptionK

**Signature**

```ts
export declare const fromTaskOptionK: <E>(
  onNone: LazyArg<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => TaskOption<B>) => (...a: A) => TaskEither<E, B>
```

Added in v3.0.0

## orElse

Returns `ma` if is a `Right` or the value returned by `onError ` otherwise.

See also [alt](#alt).

**Signature**

```ts
export declare const orElse: <E1, E2, B>(
  onError: (e: E1) => TaskEither<E2, B>
) => <A>(ma: TaskEither<E1, A>) => TaskEither<E2, B | A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'

async function test() {
  const errorHandler = TE.orElse((error: string) => TE.right(`recovering from ${error}...`))
  assert.deepStrictEqual(await pipe(TE.right('ok'), errorHandler)(), E.right('ok'))
  assert.deepStrictEqual(await pipe(TE.left('ko'), errorHandler)(), E.right('recovering from ko...'))
}

test()
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

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E>
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

## zipLeftPar

Returns an effect that executes both this effect and the specified effect,
in parallel, this effect result returned. If either side fails, then the
other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipLeftPar: <E2, B>(
  second: TaskEither<E2, B>
) => <E1, A>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, A>
```

Added in v3.0.0

## zipRightPar

Returns an effect that executes both this effect and the specified effect,
in parallel, returning result of provided effect. If either side fails,
then the other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipRightPar: <E2, B>(
  second: TaskEither<E2, B>
) => <E1, A>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

# combinatorsError

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, E2, _>(
  onError: (e: E1) => TaskEither<E2, _>
) => <A>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, A>
```

Added in v3.0.0

# constructors

## fromPredicate

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => TaskEither<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => TaskEither<E, B>
}
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E>(e: E) => TaskEither<E, never>
```

Added in v3.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E>(me: IO<E>) => TaskEither<E, never>
```

Added in v3.0.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E>(me: task.Task<E>) => TaskEither<E, never>
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
export declare const rightIO: <A>(ma: IO<A>) => TaskEither<never, A>
```

Added in v3.0.0

## rightTask

**Signature**

```ts
export declare const rightTask: <A>(ma: task.Task<A>) => TaskEither<never, A>
```

Added in v3.0.0

## sleep

Returns an effect that suspends for the specified duration (in millis).

**Signature**

```ts
export declare const sleep: (duration: number) => TaskEither<never, void>
```

Added in v3.0.0

# destructors

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, B>(onError: (e: E) => B) => <A>(ma: TaskEither<E, A>) => task.Task<B | A>
```

Added in v3.0.0

## getOrElseWithEffect

**Signature**

```ts
export declare const getOrElseWithEffect: <E, B>(
  onError: (e: E) => task.Task<B>
) => <A>(ma: TaskEither<E, A>) => task.Task<B | A>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => (ma: TaskEither<E, A>) => task.Task<B | C>
```

Added in v3.0.0

## matchWithEffect

**Signature**

```ts
export declare const matchWithEffect: <E, B, A, C = B>(
  onError: (e: E) => task.Task<B>,
  onSuccess: (a: A) => task.Task<C>
) => (ma: TaskEither<E, A>) => task.Task<B | C>
```

Added in v3.0.0

# instances

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: Applicative<TaskEitherTypeLambda>
```

Added in v3.0.0

## ApplicativeSeq

**Signature**

```ts
export declare const ApplicativeSeq: Applicative<TaskEitherTypeLambda>
```

Added in v3.0.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: Apply<TaskEitherTypeLambda>
```

Added in v3.0.0

## ApplySeq

**Signature**

```ts
export declare const ApplySeq: Apply<TaskEitherTypeLambda>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<TaskEitherTypeLambda>
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

## SemigroupK

**Signature**

```ts
export declare const SemigroupK: semigroupK.SemigroupK<TaskEitherTypeLambda>
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

## getValidatedApplicative

The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
get all errors you need to provide an way to combine them via a `Semigroup`.

See [`getValidatedApplicative`](./Either.ts.html#getvalidatedapplicative).

**Signature**

```ts
export declare const getValidatedApplicative: <E>(
  A: Apply<task.TaskTypeLambda>,
  S: Semigroup<E>
) => Applicative<either.ValidatedTypeLambda<TaskEitherTypeLambda, E>>
```

Added in v3.0.0

## getValidatedSemigroupK

The default [`SemigroupK`](#semigroupk) instance returns the last error, if you want to
get all errors you need to provide an way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedSemigroupK: <E>(
  S: Semigroup<E>
) => semigroupK.SemigroupK<either.ValidatedTypeLambda<TaskEitherTypeLambda, E>>
```

Added in v3.0.0

# interop

## flatMapNullableK

**Signature**

```ts
export declare const flatMapNullableK: <E>(
  onNullable: LazyArg<E>
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: TaskEither<E, A>) => TaskEither<E, NonNullable<B>>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => TaskEither<E, NonNullable<A>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  onNullable: LazyArg<E>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskEither<E, NonNullable<B>>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: TaskEither<E, A>) => task.Task<E | A>
```

Added in v3.0.0

## tryCatch

Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.

See also [`tryCatchK`](#trycatchk).

**Signature**

```ts
export declare const tryCatch: <A, E>(f: LazyArg<Promise<A>>, onRejected: (reason: unknown) => E) => TaskEither<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import { identity } from 'fp-ts/function'

async function test() {
  assert.deepStrictEqual(await TE.tryCatch(() => Promise.resolve(1), identity)(), E.right(1))
  assert.deepStrictEqual(await TE.tryCatch(() => Promise.reject('error'), identity)(), E.left('error'))
}

test()
```

Added in v3.0.0

## tryCatchK

Converts a function returning a `Promise` that may reject to one returning a `TaskEither`.

**Signature**

```ts
export declare const tryCatchK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Promise<B>,
  onRejected: (error: unknown) => E
) => (...a: A) => TaskEither<E, B>
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

# model

## TaskEither (interface)

**Signature**

```ts
export interface TaskEither<E, A> extends Task<Either<E, A>> {}
```

Added in v3.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(fa: either.Either<E, A>) => TaskEither<E, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: IO<A>) => TaskEither<never, A>
```

Added in v3.0.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskEither<E, A>
```

Added in v3.0.0

## fromOption

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromOption: <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => TaskEither<E, A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A>(fa: task.Task<A>) => TaskEither<never, A>
```

Added in v3.0.0

## fromTaskOption

**Signature**

```ts
export declare const fromTaskOption: <E>(onNone: LazyArg<E>) => <A>(fa: TaskOption<A>) => TaskEither<E, A>
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

## ApT

**Signature**

```ts
export declare const ApT: TaskEither<never, readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: TaskEither<never, {}>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <E2, B>(
  fb: TaskEither<E2, B>
) => <E1, A extends readonly unknown[]>(fas: TaskEither<E1, A>) => TaskEither<E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskEither<E2, B>
) => <E1>(fa: TaskEither<E1, A>) => TaskEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindPar

**Signature**

```ts
export declare const bindPar: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  fb: TaskEither<E2, B>
) => <E1>(fa: TaskEither<E1, A>) => TaskEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <E, A>(fa: TaskEither<E, A>) => TaskEither<E, { readonly [K in N]: A }>
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

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(fa: TaskEither<E, A>) => TaskEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## lift2Par

Lifts a binary function into `TaskEither` in parallel.

**Signature**

```ts
export declare const lift2Par: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: TaskEither<E1, A>, fb: TaskEither<E2, B>) => TaskEither<E1 | E2, C>
```

Added in v3.0.0

## lift2Seq

Lifts a binary function into `TaskEither`.

**Signature**

```ts
export declare const lift2Seq: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: TaskEither<E1, A>, fb: TaskEither<E2, B>) => TaskEither<E1 | E2, C>
```

Added in v3.0.0

## lift3Par

Lifts a ternary function into `TaskEither` in parallel.

**Signature**

```ts
export declare const lift3Par: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(fa: TaskEither<E1, A>, fb: TaskEither<E2, B>, fc: TaskEither<E3, C>) => TaskEither<E1 | E2 | E3, D>
```

Added in v3.0.0

## lift3Seq

Lifts a ternary function into `TaskEither`.

**Signature**

```ts
export declare const lift3Seq: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(fa: TaskEither<E1, A>, fb: TaskEither<E2, B>, fc: TaskEither<E3, C>) => TaskEither<E1 | E2 | E3, D>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E, A>(arr: readonly TaskEither<E, A>[]) => TaskEither<E, readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArraySeq

Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.

**Signature**

```ts
export declare const sequenceReadonlyArraySeq: <E, A>(arr: readonly TaskEither<E, A>[]) => TaskEither<E, readonly A[]>
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

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArraySeq

Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArraySeq: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => (as: readonly [A, ...A[]]) => TaskEither<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArraySeq

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplySeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArraySeq: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => (as: readonly [A, ...A[]]) => TaskEither<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: readonly [A, ...A[]]) => TaskEither<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplySeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: readonly [A, ...A[]]) => TaskEither<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(fa: TaskEither<E, A>) => TaskEither<E, readonly [A]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: TaskEither<never, void>
```

Added in v3.0.0
