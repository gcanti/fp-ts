---
title: TaskEither.ts
nav_order: 107
parent: Modules
---

## TaskEither overview

```ts
interface TaskEither<E, A> extends Task<Either<E, A>> {}
```

`TaskEither<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Task`.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [MonadTask](#monadtask)
  - [throwError](#throwerror)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apFirstW](#apfirstw)
  - [apSecond](#apsecond)
  - [apSecondW](#apsecondw)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirst](#chainfirst)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstEitherKW](#chainfirsteitherkw)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainFirstW](#chainfirstw)
  - [chainIOEitherK](#chainioeitherk)
  - [chainIOEitherKW](#chainioeitherkw)
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [chainTaskK](#chaintaskk)
  - [chainTaskOptionK](#chaintaskoptionk)
  - [chainTaskOptionKW](#chaintaskoptionkw)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
  - [flap](#flap)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [fromTaskK](#fromtaskk)
  - [fromTaskOptionK](#fromtaskoptionk)
  - [orElse](#orelse)
  - [orElseFirst](#orelsefirst)
  - [orElseFirstIOK](#orelsefirstiok)
  - [orElseFirstTaskK](#orelsefirsttaskk)
  - [orElseFirstW](#orelsefirstw)
  - [orElseW](#orelsew)
  - [orLeft](#orleft)
  - [swap](#swap)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftTask](#lefttask)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightTask](#righttask)
- [destructors](#destructors)
  - [fold](#fold)
  - [foldW](#foldw)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
  - [match](#match)
  - [matchE](#matche)
  - [matchEW](#matchew)
  - [matchW](#matchw)
- [instances](#instances)
  - [Alt](#alt-1)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [Bifunctor](#bifunctor-1)
  - [Chain](#chain)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [MonadIO](#monadio)
  - [MonadTask](#monadtask-1)
  - [MonadThrow](#monadthrow)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getAltTaskValidation](#getalttaskvalidation)
  - [getApplicativeTaskValidation](#getapplicativetaskvalidation)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
  - [~~getApplyMonoid~~](#getapplymonoid)
  - [~~getApplySemigroup~~](#getapplysemigroup)
  - [~~getSemigroup~~](#getsemigroup)
  - [~~getTaskValidation~~](#gettaskvalidation)
  - [~~taskEitherSeq~~](#taskeitherseq)
  - [~~taskEither~~](#taskeither)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [toUnion](#tounion)
  - [tryCatch](#trycatch)
  - [tryCatchK](#trycatchk)
- [model](#model)
  - [TaskEither (interface)](#taskeither-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromTask](#fromtask)
  - [fromTaskOption](#fromtaskoption)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [bracket](#bracket)
  - [bracketW](#bracketw)
  - [let](#let)
  - [sequenceArray](#sequencearray)
  - [sequenceSeqArray](#sequenceseqarray)
  - [taskify](#taskify)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)
  - [traverseSeqArray](#traverseseqarray)
  - [traverseSeqArrayWithIndex](#traverseseqarraywithindex)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `TaskEither` returns `fa` if is a `Right` or the value returned by `that` otherwise.

See also [orElse](#orelse).

**Signature**

```ts
export declare const alt: <E, A>(that: Lazy<TaskEither<E, A>>) => (fa: TaskEither<E, A>) => TaskEither<E, A>
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

## altW

Less strict version of [`alt`](#alt).

The `W` suffix (short for **W**idening) means that the error and the return types will be merged.

**Signature**

```ts
export declare const altW: <E2, B>(
  that: Lazy<TaskEither<E2, B>>
) => <E1, A>(fa: TaskEither<E1, A>) => TaskEither<E2, B | A>
```

Added in v2.9.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(fa: TaskEither<E, A>) => <B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B>
```

Added in v2.0.0

## apW

Less strict version of [`ap`](#ap).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const apW: <E2, A>(
  fa: TaskEither<E2, A>
) => <E1, B>(fab: TaskEither<E1, (a: A) => B>) => TaskEither<E2 | E1, B>
```

Added in v2.8.0

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

## chainW

Less strict version of [`chain`](#chain).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const chainW: <E2, A, B>(
  f: (a: A) => TaskEither<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v2.6.0

# MonadTask

## throwError

**Signature**

```ts
export declare const throwError: <E, A>(e: E) => TaskEither<E, A>
```

Added in v2.7.0

# Pointed

## of

**Signature**

```ts
export declare const of: <E = never, A = never>(a: A) => TaskEither<E, A>
```

Added in v2.0.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(second: TaskEither<E, B>) => <A>(first: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

## apFirstW

Less strict version of [`apFirst`](#apfirst).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const apFirstW: <E2, B>(
  second: TaskEither<E2, B>
) => <E1, A>(first: TaskEither<E1, A>) => TaskEither<E2 | E1, A>
```

Added in v2.12.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(second: TaskEither<E, B>) => <A>(first: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.0.0

## apSecondW

Less strict version of [`apSecond`](#apsecond).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const apSecondW: <E2, B>(
  second: TaskEither<E2, B>
) => <E1, A>(first: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v2.12.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(f: (a: A) => E.Either<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.4.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chaineitherk).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const chainEitherKW: <E2, A, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v2.6.1

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => (ma: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.12.0

## chainFirstEitherKW

Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const chainFirstEitherKW: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, A>
```

Added in v2.12.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => <E>(first: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.10.0

## chainFirstTaskK

**Signature**

```ts
export declare const chainFirstTaskK: <A, B>(f: (a: A) => T.Task<B>) => <E>(first: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.10.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

The `W` suffix (short for **W**idening) means that the error types will be merged.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: <E2, A, B>(
  f: (a: A) => TaskEither<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, A>
```

Added in v2.8.0

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.4.0

## chainIOEitherKW

Less strict version of [`chainIOEitherK`](#chainioeitherk).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const chainIOEitherKW: <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v2.6.1

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => <E>(first: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.10.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.10.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => <E>(first: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.10.0

## chainTaskOptionK

**Signature**

```ts
export declare const chainTaskOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v2.11.0

## chainTaskOptionKW

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const chainTaskOptionKW: <E2>(
  onNone: Lazy<E2>
) => <A, B>(f: (a: A) => TaskOption<B>) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v2.12.3

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(mb: TaskEither<E, B>) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, A>
}
```

Added in v2.0.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterorelse).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: TaskEither<E1, A>
  ) => TaskEither<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(
    mb: TaskEither<E1, B>
  ) => TaskEither<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, A>
}
```

Added in v2.9.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B>
```

Added in v2.10.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <E, A>(mma: TaskEither<E, TaskEither<E, A>>) => TaskEither<E, A>
```

Added in v2.0.0

## flattenW

Less strict version of [`flatten`](#flatten).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const flattenW: <E1, E2, A>(mma: TaskEither<E1, TaskEither<E2, A>>) => TaskEither<E1 | E2, A>
```

Added in v2.11.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => E.Either<E, B>
) => (...a: A) => TaskEither<E, B>
```

Added in v2.4.0

## fromIOEitherK

**Signature**

```ts
export declare const fromIOEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => IOEither<E, B>
) => (...a: A) => TaskEither<E, B>
```

Added in v2.4.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => <E = never>(...a: A) => TaskEither<E, B>
```

Added in v2.10.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => (...a: A) => TaskEither<E, B>
```

Added in v2.10.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => T.Task<B>
) => <E = never>(...a: A) => TaskEither<E, B>
```

Added in v2.10.0

## fromTaskOptionK

**Signature**

```ts
export declare const fromTaskOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => TaskOption<B>) => (...a: A) => TaskEither<E, B>
```

Added in v2.11.0

## orElse

Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.

See also [alt](#alt).

**Signature**

```ts
export declare const orElse: <E1, A, E2>(
  onLeft: (e: E1) => TaskEither<E2, A>
) => (ma: TaskEither<E1, A>) => TaskEither<E2, A>
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

Added in v2.0.0

## orElseFirst

**Signature**

```ts
export declare const orElseFirst: <E, B>(
  onLeft: (e: E) => TaskEither<E, B>
) => <A>(ma: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.11.0

## orElseFirstIOK

**Signature**

```ts
export declare const orElseFirstIOK: <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.12.0

## orElseFirstTaskK

**Signature**

```ts
export declare const orElseFirstTaskK: <E, B>(
  onLeft: (e: E) => T.Task<B>
) => <A>(ma: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v2.12.0

## orElseFirstW

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const orElseFirstW: <E1, E2, B>(
  onLeft: (e: E1) => TaskEither<E2, B>
) => <A>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, A>
```

Added in v2.11.0

## orElseW

Less strict version of [`orElse`](#orelse).

The `W` suffix (short for **W**idening) means that the return types will be merged.

**Signature**

```ts
export declare const orElseW: <E1, E2, B>(
  onLeft: (e: E1) => TaskEither<E2, B>
) => <A>(ma: TaskEither<E1, A>) => TaskEither<E2, B | A>
```

Added in v2.10.0

## orLeft

**Signature**

```ts
export declare const orLeft: <E1, E2>(onLeft: (e: E1) => T.Task<E2>) => <A>(fa: TaskEither<E1, A>) => TaskEither<E2, A>
```

Added in v2.11.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E>
```

Added in v2.0.0

# constructors

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => TaskEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => TaskEither<E, B>
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

# destructors

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: <E, A, B>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<B>
) => (ma: TaskEither<E, A>) => T.Task<B>
```

Added in v2.0.0

## foldW

Alias of [`matchEW`](#matchew).

**Signature**

```ts
export declare const foldW: <E, B, A, C>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<C>
) => (ma: TaskEither<E, A>) => T.Task<B | C>
```

Added in v2.10.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, A>(onLeft: (e: E) => T.Task<A>) => (ma: TaskEither<E, A>) => T.Task<A>
```

Added in v2.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

The `W` suffix (short for **W**idening) means that the handler return type will be merged.

**Signature**

```ts
export declare const getOrElseW: <E, B>(onLeft: (e: E) => T.Task<B>) => <A>(ma: TaskEither<E, A>) => T.Task<B | A>
```

Added in v2.6.0

## match

**Signature**

```ts
export declare const match: <E, B, A>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: TaskEither<E, A>) => T.Task<B>
```

Added in v2.10.0

## matchE

The `E` suffix (short for **E**ffect) means that the handlers return an effect (`Task`).

**Signature**

```ts
export declare const matchE: <E, A, B>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<B>
) => (ma: TaskEither<E, A>) => T.Task<B>
```

Added in v2.10.0

## matchEW

Less strict version of [`matchE`](#matche).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchEW: <E, B, A, C>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<C>
) => (ma: TaskEither<E, A>) => T.Task<B | C>
```

Added in v2.10.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => (ma: TaskEither<E, A>) => T.Task<B | C>
```

Added in v2.10.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt2<'TaskEither'>
```

Added in v2.7.0

## ApplicativePar

Runs computations in parallel.

**Signature**

```ts
export declare const ApplicativePar: Applicative2<'TaskEither'>
```

Added in v2.7.0

## ApplicativeSeq

Runs computations sequentially.

**Signature**

```ts
export declare const ApplicativeSeq: Applicative2<'TaskEither'>
```

Added in v2.7.0

## ApplyPar

Runs computations in parallel.

**Signature**

```ts
export declare const ApplyPar: Apply2<'TaskEither'>
```

Added in v2.10.0

## ApplySeq

Runs computations sequentially.

**Signature**

```ts
export declare const ApplySeq: Apply2<'TaskEither'>
```

Added in v2.10.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'TaskEither'>
```

Added in v2.7.0

## Chain

**Signature**

```ts
export declare const Chain: Chain2<'TaskEither'>
```

Added in v2.10.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither2<'TaskEither'>
```

Added in v2.10.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'TaskEither'>
```

Added in v2.10.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask2<'TaskEither'>
```

Added in v2.10.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'TaskEither'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'TaskEither'>
```

Added in v2.10.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO2<'TaskEither'>
```

Added in v2.10.0

## MonadTask

**Signature**

```ts
export declare const MonadTask: MonadTask2<'TaskEither'>
```

Added in v2.10.0

## MonadThrow

**Signature**

```ts
export declare const MonadThrow: MonadThrow2<'TaskEither'>
```

Added in v2.10.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'TaskEither'>
```

Added in v2.10.0

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

## getAltTaskValidation

The default [`Alt`](#alt) instance returns the last error, if you want to
get all errors you need to provide a way to concatenate them via a `Semigroup`.

See [`getAltValidation`](./Either.ts.html#getaltvalidation).

**Signature**

```ts
export declare function getAltTaskValidation<E>(S: Semigroup<E>): Alt2C<URI, E>
```

Added in v2.7.0

## getApplicativeTaskValidation

The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
get all errors you need to provide a way to concatenate them via a `Semigroup`.

**Signature**

```ts
export declare function getApplicativeTaskValidation<E>(A: Apply1<T.URI>, S: Semigroup<E>): Applicative2C<URI, E>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as S from 'fp-ts/Semigroup'
import * as string from 'fp-ts/string'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'

interface User {
  readonly id: string
  readonly name: string
}

const remoteDatabase: ReadonlyArray<User> = [
  { id: 'id1', name: 'John' },
  { id: 'id2', name: 'Mary' },
  { id: 'id3', name: 'Joey' },
]

const fetchUser = (id: string): TE.TaskEither<string, User> =>
  pipe(
    remoteDatabase,
    RA.findFirst((user) => user.id === id),
    TE.fromOption(() => `${id} not found`)
  )

async function test() {
  assert.deepStrictEqual(
    await pipe(['id4', 'id5'], RA.traverse(TE.ApplicativePar)(fetchUser))(),
    E.left('id4 not found') // <= first error
  )

  const Applicative = TE.getApplicativeTaskValidation(T.ApplyPar, pipe(string.Semigroup, S.intercalate(', ')))

  assert.deepStrictEqual(
    await pipe(['id4', 'id5'], RA.traverse(Applicative)(fetchUser))(),
    E.left('id4 not found, id5 not found') // <= all errors
  )
}

test()
```

Added in v2.7.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => Compactable2C<'TaskEither', E>
```

Added in v2.10.0

## getFilterable

**Signature**

```ts
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>
```

Added in v2.1.0

## ~~getApplyMonoid~~

Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.

**Signature**

```ts
export declare const getApplyMonoid: <E, A>(M: Monoid<A>) => Monoid<TaskEither<E, A>>
```

Added in v2.0.0

## ~~getApplySemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getApplySemigroup: <E, A>(S: Semigroup<A>) => Semigroup<TaskEither<E, A>>
```

Added in v2.0.0

## ~~getSemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getSemigroup: <E, A>(S: Semigroup<A>) => Semigroup<TaskEither<E, A>>
```

Added in v2.0.0

## ~~getTaskValidation~~

Use [`getApplicativeTaskValidation`](#getapplicativetaskvalidation) and [`getAltTaskValidation`](#getalttaskvalidation) instead.

**Signature**

```ts
export declare function getTaskValidation<E>(
  SE: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2<URI> & Alt2C<URI, E> & MonadTask2C<URI, E> & MonadThrow2C<URI, E>
```

Added in v2.0.0

## ~~taskEitherSeq~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `TE.Functor` instead of `TE.taskEitherSeq`
(where `TE` is from `import TE from 'fp-ts/TaskEither'`)

**Signature**

```ts
export declare const taskEitherSeq: Monad2<'TaskEither'> &
  Bifunctor2<'TaskEither'> &
  Alt2<'TaskEither'> &
  MonadTask2<'TaskEither'> &
  MonadThrow2<'TaskEither'>
```

Added in v2.0.0

## ~~taskEither~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `TE.Functor` instead of `TE.taskEither`
(where `TE` is from `import TE from 'fp-ts/TaskEither'`)

**Signature**

```ts
export declare const taskEither: Monad2<'TaskEither'> &
  Bifunctor2<'TaskEither'> &
  Alt2<'TaskEither'> &
  MonadTask2<'TaskEither'> &
  MonadThrow2<'TaskEither'>
```

Added in v2.0.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <E>(
  e: E
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: TaskEither<E, A>) => TaskEither<E, NonNullable<B>>
```

Added in v2.12.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(e: E) => <A>(a: A) => TaskEither<E, NonNullable<A>>
```

Added in v2.12.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  e: E
) => <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskEither<E, NonNullable<B>>
```

Added in v2.12.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: TaskEither<E, A>) => T.Task<E | A>
```

Added in v2.10.0

## tryCatch

Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.

See also [`tryCatchK`](#trycatchk).

**Signature**

```ts
export declare const tryCatch: <E, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E) => TaskEither<E, A>
```

**Example**

```ts
import { left, right } from 'fp-ts/Either'
import { tryCatch } from 'fp-ts/TaskEither'

tryCatch(() => Promise.resolve(1), String)().then((result) => {
  assert.deepStrictEqual(result, right(1))
})
tryCatch(() => Promise.reject('error'), String)().then((result) => {
  assert.deepStrictEqual(result, left('error'))
})
```

Added in v2.0.0

## tryCatchK

Converts a function returning a `Promise` to one returning a `TaskEither`.

**Signature**

```ts
export declare const tryCatchK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => Promise<B>,
  onRejected: (reason: unknown) => E
) => (...a: A) => TaskEither<E, B>
```

Added in v2.5.0

# model

## TaskEither (interface)

**Signature**

```ts
export interface TaskEither<E, A> extends Task<Either<E, A>> {}
```

Added in v2.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(fa: E.Either<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A, E = never>(fa: IO<A>) => TaskEither<E, A>
```

Added in v2.7.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskEither<E, A>
```

Added in v2.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => TaskEither<E, A>
```

Added in v2.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A, E = never>(fa: T.Task<A>) => TaskEither<E, A>
```

Added in v2.7.0

## fromTaskOption

**Signature**

```ts
export declare const fromTaskOption: <E>(onNone: Lazy<E>) => <A>(fa: TaskOption<A>) => TaskEither<E, A>
```

Added in v2.11.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: TaskEither<never, readonly []>
```

Added in v2.11.0

## Do

**Signature**

```ts
export declare const Do: TaskEither<never, {}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: TaskEither<E, B>
) => (fa: TaskEither<E, A>) => TaskEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

Less strict version of [`apS`](#aps).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const apSW: <A, N extends string, E2, B>(
  name: Exclude<N, keyof A>,
  fb: TaskEither<E2, B>
) => <E1>(fa: TaskEither<E1, A>) => TaskEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskEither<E, B>
) => (ma: TaskEither<E, A>) => TaskEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: TaskEither<E, A>) => TaskEither<E, { readonly [K in N]: A }>
```

Added in v2.8.0

## bindW

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskEither<E2, B>
) => <E1>(fa: TaskEither<E1, A>) => TaskEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

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

## bracketW

Less strict version of [`bracket`](#bracket).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const bracketW: <E1, A, E2, B, E3>(
  acquire: TaskEither<E1, A>,
  use: (a: A) => TaskEither<E2, B>,
  release: (a: A, e: E.Either<E2, B>) => TaskEither<E3, void>
) => TaskEither<E1 | E2 | E3, B>
```

Added in v2.12.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(fa: TaskEither<E, A>) => TaskEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## sequenceArray

**Signature**

```ts
export declare const sequenceArray: <A, E>(arr: readonly TaskEither<E, A>[]) => TaskEither<E, readonly A[]>
```

Added in v2.9.0

## sequenceSeqArray

**Signature**

```ts
export declare const sequenceSeqArray: <A, E>(arr: readonly TaskEither<E, A>[]) => TaskEither<E, readonly A[]>
```

Added in v2.9.0

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

Added in v2.0.0

## traverseArray

**Signature**

```ts
export declare const traverseArray: <A, B, E>(
  f: (a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

**Signature**

```ts
export declare const traverseArrayWithIndex: <A, B, E>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v2.9.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskEither<E, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskEither<E, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## traverseSeqArray

**Signature**

```ts
export declare const traverseSeqArray: <A, B, E>(
  f: (a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v2.9.0

## traverseSeqArrayWithIndex

**Signature**

```ts
export declare const traverseSeqArrayWithIndex: <A, B, E>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: readonly A[]) => TaskEither<E, readonly B[]>
```

Added in v2.9.0
