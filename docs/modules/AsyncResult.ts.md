---
title: AsyncResult.ts
nav_order: 7
parent: Modules
---

## AsyncResult overview

```ts
interface AsyncResult<E, A> extends Async<Result<E, A>> {}
```

`AsyncResult<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Async`.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fail](#fail)
  - [sleep](#sleep)
  - [succeed](#succeed)
- [conversions](#conversions)
  - [failAsync](#failasync)
  - [failSync](#failsync)
  - [fromAsync](#fromasync)
  - [fromAsyncOption](#fromasyncoption)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromResult](#fromresult)
  - [fromSync](#fromsync)
  - [fromSyncResult](#fromsyncresult)
  - [toUnion](#tounion)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [flatMapError](#flatmaperror)
  - [getOrElse](#getorelse)
  - [getOrElseAsync](#getorelseasync)
  - [getValidatedAlt](#getvalidatedalt)
  - [getValidatedApplicative](#getvalidatedapplicative)
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
  - [Alt](#alt)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Bifunctor](#bifunctor)
  - [CategoryKind](#categorykind)
  - [Flattenable](#flattenable)
  - [FromAsync](#fromasync)
  - [FromIdentity](#fromidentity)
  - [FromResult](#fromresult)
  - [FromSync](#fromsync)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
- [interop](#interop)
  - [fromRejectable](#fromrejectable)
  - [liftRejectable](#liftrejectable)
  - [taskify](#taskify)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftAsync](#liftasync)
  - [liftAsyncOption](#liftasyncoption)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftResult](#liftresult)
  - [liftSync](#liftsync)
  - [liftSyncResult](#liftsyncresult)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [unit](#unit)
- [model](#model)
  - [AsyncResult (interface)](#asyncresult-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
  - [matchAsync](#matchasync)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapAsync](#flatmapasync)
  - [flatMapAsyncOption](#flatmapasyncoption)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [flatMapResult](#flatmapresult)
  - [flatMapSync](#flatmapsync)
  - [flatMapSyncResult](#flatmapsyncresult)
  - [flatten](#flatten)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArrayPar](#sequencereadonlyarraypar)
  - [traverseNonEmptyReadonlyArray](#traversenonemptyreadonlyarray)
  - [traverseNonEmptyReadonlyArrayPar](#traversenonemptyreadonlyarraypar)
  - [traverseNonEmptyReadonlyArrayWithIndex](#traversenonemptyreadonlyarraywithindex)
  - [traverseNonEmptyReadonlyArrayWithIndexPar](#traversenonemptyreadonlyarraywithindexpar)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayPar](#traversereadonlyarraypar)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexPar](#traversereadonlyarraywithindexpar)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [AsyncResultTypeLambda (interface)](#asyncresulttypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [bracket](#bracket)
  - [composeKleisli](#composekleisli)
  - [delay](#delay)
  - [idKleisli](#idkleisli)
  - [swap](#swap)
  - [tap](#tap)

---

# constructors

## fail

**Signature**

```ts
export declare const fail: <E>(e: E) => AsyncResult<E, never>
```

Added in v3.0.0

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: (duration: number) => AsyncResult<never, void>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => AsyncResult<never, A>
```

Added in v3.0.0

# conversions

## failAsync

**Signature**

```ts
export declare const failAsync: <E>(async: async.Async<E>) => AsyncResult<E, never>
```

Added in v3.0.0

## failSync

**Signature**

```ts
export declare const failSync: <E>(sync: Sync<E>) => AsyncResult<E, never>
```

Added in v3.0.0

## fromAsync

**Signature**

```ts
export declare const fromAsync: <A>(async: async.Async<A>) => AsyncResult<never, A>
```

Added in v3.0.0

## fromAsyncOption

**Signature**

```ts
export declare const fromAsyncOption: <E>(onNone: E) => <A>(self: AsyncOption<A>) => AsyncResult<E, A>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: E) => <A>(a: A) => AsyncResult<E, NonNullable<A>>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: E) => <A>(fa: Option<A>) => AsyncResult<E, A>
```

Added in v3.0.0

## fromResult

**Signature**

```ts
export declare const fromResult: <E, A>(either: result.Result<E, A>) => AsyncResult<E, A>
```

Added in v3.0.0

## fromSync

**Signature**

```ts
export declare const fromSync: <A>(sync: Sync<A>) => AsyncResult<never, A>
```

Added in v3.0.0

## fromSyncResult

**Signature**

```ts
export declare const fromSyncResult: <E, A>(syncResult: SyncResult<E, A>) => AsyncResult<E, A>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: AsyncResult<E, A>) => async.Async<E | A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: AsyncResult<never, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => AsyncResult<E2, B>
) => <E1>(
  self: AsyncResult<E1, A>
) => AsyncResult<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  fb: AsyncResult<E2, B>
) => <E1>(
  self: AsyncResult<E1, A>
) => AsyncResult<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <E, A>(self: AsyncResult<E, A>) => AsyncResult<E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: AsyncResult<E, A>) => AsyncResult<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# error handling

## catchAll

Recovers from all errors.

**Signature**

```ts
export declare const catchAll: <E1, E2, B>(
  onError: (e: E1) => AsyncResult<E2, B>
) => <A>(self: AsyncResult<E1, A>) => AsyncResult<E2, B | A>
```

**Example**

```ts
import * as R from 'fp-ts/Result'
import { pipe } from 'fp-ts/Function'
import * as AR from 'fp-ts/AsyncResult'

async function test() {
  const errorHandler = AR.catchAll((error: string) => AR.succeed(`recovering from ${error}...`))
  assert.deepStrictEqual(await pipe(AR.succeed('ok'), errorHandler)(), R.succeed('ok'))
  assert.deepStrictEqual(await pipe(AR.fail('ko'), errorHandler)(), R.succeed('recovering from ko...'))
}

test()
```

Added in v3.0.0

## flatMapError

Creates a composite effect that represents this effect followed by another
one that may depend on the error produced by this one.

**Signature**

```ts
export declare const flatMapError: <E1, E2>(
  f: (e: E1) => async.Async<E2>
) => <A>(self: AsyncResult<E1, A>) => AsyncResult<E2, A>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <B>(onError: B) => <A>(self: AsyncResult<unknown, A>) => async.Async<B | A>
```

Added in v3.0.0

## getOrElseAsync

**Signature**

```ts
export declare const getOrElseAsync: <B>(
  onError: async.Async<B>
) => <A>(self: AsyncResult<unknown, A>) => async.Async<B | A>
```

Added in v3.0.0

## getValidatedAlt

The default [`Alt`](#semigroupkind) instance returns the last error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedAlt: <E>(
  Semigroup: Semigroup<E>
) => alt.Alt<result.ValidatedT<AsyncResultTypeLambda, E>>
```

Added in v3.0.0

## getValidatedApplicative

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedApplicative: <E>(
  Apply: apply.Apply<async.AsyncTypeLambda>,
  Semigroup: Semigroup<E>
) => applicative.Applicative<result.ValidatedT<AsyncResultTypeLambda, E>>
```

Added in v3.0.0

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(f: (e: E) => G) => <A>(self: AsyncResult<E, A>) => AsyncResult<G, A>
```

Added in v3.0.0

## orElse

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `AsyncResult` returns `self` if it is a `Success` or the value returned by `that` otherwise.

**Signature**

```ts
export declare const orElse: <E2, B>(
  that: AsyncResult<E2, B>
) => <E1, A>(self: AsyncResult<E1, A>) => AsyncResult<E2, B | A>
```

**Example**

```ts
import * as E from 'fp-ts/Result'
import { pipe } from 'fp-ts/Function'
import * as TE from 'fp-ts/AsyncResult'

async function test() {
  assert.deepStrictEqual(await pipe(TE.succeed(1), TE.orElse(TE.succeed(2)))(), E.succeed(1))
  assert.deepStrictEqual(await pipe(TE.fail('a'), TE.orElse(TE.succeed(2)))(), E.succeed(2))
  assert.deepStrictEqual(await pipe(TE.fail('a'), TE.orElse(TE.fail('b')))(), E.fail('b'))
}

test()
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, E2>(
  onError: (e: E1) => AsyncResult<E2, unknown>
) => <A>(self: AsyncResult<E1, A>) => AsyncResult<E1 | E2, A>
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <E>(onNone: E) => <A>(self: AsyncResult<E, Option<A>>) => AsyncResult<E, A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: E2): <E1>(
    self: AsyncResult<E1, C>
  ) => AsyncResult<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: E2): <E1>(
    self: AsyncResult<E1, B>
  ) => AsyncResult<E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: E
) => (self: AsyncResult<E, A>) => AsyncResult<E, B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (
    self: AsyncResult<E, C>
  ) => readonly [AsyncResult<E, C>, AsyncResult<E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (
    self: AsyncResult<E, B>
  ) => readonly [AsyncResult<E, B>, AsyncResult<E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C, E>(
  f: (a: A) => result.Result<B, C>,
  onEmpty: E
) => (self: AsyncResult<E, A>) => readonly [AsyncResult<E, B>, AsyncResult<E, C>]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <E>(
  onEmpty: E
) => <A, B>(self: AsyncResult<E, result.Result<A, B>>) => readonly [AsyncResult<E, A>, AsyncResult<E, B>]
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: alt.Alt<AsyncResultTypeLambda>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<AsyncResultTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<AsyncResultTypeLambda>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<AsyncResultTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: kleisliCategory.KleisliCategory<AsyncResultTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<AsyncResultTypeLambda>
```

Added in v3.0.0

## FromAsync

**Signature**

```ts
export declare const FromAsync: fromAsync_.FromAsync<AsyncResultTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<AsyncResultTypeLambda>
```

Added in v3.0.0

## FromResult

**Signature**

```ts
export declare const FromResult: fromResult_.FromResult<AsyncResultTypeLambda>
```

Added in v3.0.0

## FromSync

**Signature**

```ts
export declare const FromSync: fromSync_.FromSync<AsyncResultTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<AsyncResultTypeLambda>
```

Added in v3.0.0

## KleisliComposable

**Signature**

```ts
export declare const KleisliComposable: kleisliComposable.KleisliComposable<AsyncResultTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<AsyncResultTypeLambda>
```

Added in v3.0.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(onNone: E) => Compactable<result.ValidatedT<AsyncResultTypeLambda, E>>
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(onEmpty: E) => Filterable<result.ValidatedT<AsyncResultTypeLambda, E>>
```

Added in v3.0.0

# interop

## fromRejectable

Converts a `Promise` that may reject to a `AsyncResult`.

**Signature**

```ts
export declare const fromRejectable: <A, E>(
  f: LazyArg<Promise<A>>,
  onRejected: (reason: unknown) => E
) => AsyncResult<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Result'
import * as TE from 'fp-ts/AsyncResult'
import { identity } from 'fp-ts/Function'

async function test() {
  assert.deepStrictEqual(await TE.fromRejectable(() => Promise.resolve(1), identity)(), E.succeed(1))
  assert.deepStrictEqual(await TE.fromRejectable(() => Promise.reject('error'), identity)(), E.fail('error'))
}

test()
```

Added in v3.0.0

## liftRejectable

Lifts a function returning a `Promise` that may reject to one returning a `AsyncResult`.

**Signature**

```ts
export declare const liftRejectable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Promise<B>,
  onRejected: (error: unknown) => E
) => (...a: A) => AsyncResult<E, B>
```

Added in v3.0.0

## taskify

Convert a node style callback function to one returning a `AsyncResult`

**Note**. If the function `f` admits multiple overloadings, `taskify` will pick last one. If you want a different
behaviour, add an explicit type annotation

```ts
// readFile admits multiple overloadings

// const readFile: (a: string) => AsyncResult<NodeJS.ErrnoException, Buffer>
const readFile = taskify(fs.readFile)

const readFile2: (filename: string, encoding: string) => AsyncResult<NodeJS.ErrnoException, Buffer> = taskify(
  fs.readFile
)
```

**Signature**

```ts
export declare function taskify<L, R>(
  f: (cb: (e: L | null | undefined, r?: R) => void) => void
): () => AsyncResult<L, R>
export declare function taskify<A, L, R>(
  f: (a: A, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A) => AsyncResult<L, R>
export declare function taskify<A, B, L, R>(
  f: (a: A, b: B, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B) => AsyncResult<L, R>
export declare function taskify<A, B, C, L, R>(
  f: (a: A, b: B, c: C, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C) => AsyncResult<L, R>
export declare function taskify<A, B, C, D, L, R>(
  f: (a: A, b: B, c: C, d: D, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D) => AsyncResult<L, R>
export declare function taskify<A, B, C, D, E, L, R>(
  f: (a: A, b: B, c: C, d: D, e: E, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D, e: E) => AsyncResult<L, R>
```

**Example**

```ts
import { taskify } from 'fp-ts/AsyncResult'
import * as fs from 'fs'

// const stat: (a: string | Buffer) => AsyncResult<NodeJS.ErrnoException, fs.Stats>
const stat = taskify(fs.stat)
assert.strictEqual(stat.length, 0)
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `AsyncResult`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: AsyncResult<E1, A>, fb: AsyncResult<E2, B>) => AsyncResult<E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `AsyncResult`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(
  fa: AsyncResult<E1, A>,
  fb: AsyncResult<E2, B>,
  fc: AsyncResult<E3, C>
) => AsyncResult<E1 | E2 | E3, D>
```

Added in v3.0.0

## liftAsync

**Signature**

```ts
export declare const liftAsync: <A extends readonly unknown[], B>(
  f: (...a: A) => async.Async<B>
) => (...a: A) => AsyncResult<never, B>
```

Added in v3.0.0

## liftAsyncOption

**Signature**

```ts
export declare const liftAsyncOption: <E>(
  onNone: E
) => <A extends readonly unknown[], B>(f: (...a: A) => AsyncOption<B>) => (...a: A) => AsyncResult<E, B>
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => AsyncResult<E, NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => (...a: A) => AsyncResult<E, B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (c: C) => AsyncResult<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (b: B) => AsyncResult<E, B>
}
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => result.Result<E, B>
) => (...a: A) => AsyncResult<E, B>
```

Added in v3.0.0

## liftSync

**Signature**

```ts
export declare const liftSync: <A extends readonly unknown[], B>(
  f: (...a: A) => Sync<B>
) => (...a: A) => AsyncResult<never, B>
```

Added in v3.0.0

## liftSyncResult

**Signature**

```ts
export declare const liftSyncResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => SyncResult<E, B>
) => (...a: A) => AsyncResult<E, B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: <A extends readonly unknown[]>(...x: A) => AsyncResult<never, void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: <A extends readonly unknown[]>(...x: A) => AsyncResult<never, void>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <E>(self: AsyncResult<E, unknown>) => AsyncResult<E, B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: AsyncResult<E, (a: A) => B>) => AsyncResult<E, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: AsyncResult<E, A>) => AsyncResult<E, B>
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
) => (self: AsyncResult<E, A>) => AsyncResult<G, B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: <E>(self: AsyncResult<E, unknown>) => AsyncResult<E, void>
```

Added in v3.0.0

# model

## AsyncResult (interface)

**Signature**

```ts
export interface AsyncResult<E, A> extends Async<Result<E, A>> {}
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => (async: AsyncResult<E, A>) => async.Async<B | C>
```

Added in v3.0.0

## matchAsync

**Signature**

```ts
export declare const matchAsync: <E, B, A, C = B>(
  onError: (e: E) => async.Async<B>,
  onSuccess: (a: A) => async.Async<C>
) => (self: AsyncResult<E, A>) => async.Async<B | C>
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, E2, B>(
  f: (a: A) => AsyncResult<E2, B>
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, B>
```

Added in v3.0.0

## flatMapAsync

**Signature**

```ts
export declare const flatMapAsync: <A, B>(
  f: (a: A) => async.Async<B>
) => <E>(self: AsyncResult<E, A>) => AsyncResult<E, B>
```

Added in v3.0.0

## flatMapAsyncOption

**Signature**

```ts
export declare const flatMapAsyncOption: <A, B, E2>(
  f: (a: A) => AsyncOption<B>,
  onNone: E2
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, B>
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, NonNullable<B>>
```

Added in v3.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: E2
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, B>
```

Added in v3.0.0

## flatMapResult

**Signature**

```ts
export declare const flatMapResult: <A, E2, B>(
  f: (a: A) => result.Result<E2, B>
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, B>
```

Added in v3.0.0

## flatMapSync

**Signature**

```ts
export declare const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => <E>(self: AsyncResult<E, A>) => AsyncResult<E, B>
```

Added in v3.0.0

## flatMapSyncResult

**Signature**

```ts
export declare const flatMapSyncResult: <A, E2, B>(
  f: (a: A) => SyncResult<E2, B>
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, B>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <E1, E2, A>(self: AsyncResult<E1, AsyncResult<E2, A>>) => AsyncResult<E1 | E2, A>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <E2>(
  that: AsyncResult<E2, unknown>
) => <E1, A>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <E2, A>(
  that: AsyncResult<E2, A>
) => <E1>(self: AsyncResult<E1, unknown>) => AsyncResult<E2 | E1, A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E, A>(arr: readonly AsyncResult<E, A>[]) => AsyncResult<E, readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArrayPar

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArrayPar: <E, A>(arr: readonly AsyncResult<E, A>[]) => AsyncResult<E, readonly A[]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArray

Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArray: <A, E, B>(
  f: (a: A) => AsyncResult<E, B>
) => (as: readonly [A, ...A[]]) => AsyncResult<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayPar

Equivalent to `NonEmptyReadonlyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayPar: <A, E, B>(
  f: (a: A) => AsyncResult<E, B>
) => (as: readonly [A, ...A[]]) => AsyncResult<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => AsyncResult<E, B>
) => (as: readonly [A, ...A[]]) => AsyncResult<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndexPar

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndexPar: <A, E, B>(
  f: (index: number, a: A) => AsyncResult<E, B>
) => (as: readonly [A, ...A[]]) => AsyncResult<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, E, B>(
  f: (a: A) => AsyncResult<E, B>
) => (as: readonly A[]) => AsyncResult<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayPar

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayPar: <A, E, B>(
  f: (a: A) => AsyncResult<E, B>
) => (as: readonly A[]) => AsyncResult<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => AsyncResult<E, B>
) => (as: readonly A[]) => AsyncResult<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexPar

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexPar: <A, E, B>(
  f: (index: number, a: A) => AsyncResult<E, B>
) => (as: readonly A[]) => AsyncResult<E, readonly B[]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: AsyncResult<never, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(self: AsyncResult<E, A>) => AsyncResult<E, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <E2, B>(
  fb: AsyncResult<E2, B>
) => <E1, A extends readonly unknown[]>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <E2, B, A, C>(
  that: AsyncResult<E2, B>,
  f: (a: A, b: B) => C
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, C>
```

Added in v3.0.0

# type lambdas

## AsyncResultTypeLambda (interface)

**Signature**

```ts
export interface AsyncResultTypeLambda extends TypeLambda {
  readonly type: AsyncResult<this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <E2, A>(
  fa: AsyncResult<E2, A>
) => <E1, B>(self: AsyncResult<E1, (a: A) => B>) => AsyncResult<E2 | E1, B>
```

Added in v3.0.0

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Failure`

**Signature**

```ts
export declare const bracket: <E1, A, E2, B, E3>(
  acquire: AsyncResult<E1, A>,
  use: (a: A) => AsyncResult<E2, B>,
  release: (a: A, e: result.Result<E2, B>) => AsyncResult<E3, void>
) => AsyncResult<E1 | E2 | E3, B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, E2, C>(
  bfc: (b: B) => AsyncResult<E2, C>
) => <A, E1>(afb: (a: A) => AsyncResult<E1, B>) => (a: A) => AsyncResult<E2 | E1, C>
```

Added in v3.0.0

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (duration: number) => <E, A>(self: AsyncResult<E, A>) => AsyncResult<E, A>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => AsyncResult<never, A>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(self: AsyncResult<E, A>) => AsyncResult<A, E>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, E2>(
  f: (a: A) => AsyncResult<E2, unknown>
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, A>
```

Added in v3.0.0
