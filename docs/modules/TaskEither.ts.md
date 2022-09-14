---
title: TaskEither.ts
nav_order: 99
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

- [Alt](#alt)
  - [alt](#alt)
- [Apply](#apply)
  - [ap](#ap)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Chain](#chain)
  - [chain](#chain)
- [Functor](#functor)
  - [map](#map)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainIOEitherK](#chainioeitherk)
  - [chainIOEitherKW](#chainioeitherkw)
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [chainTaskK](#chaintaskk)
  - [chainTaskOptionK](#chaintaskoptionk)
  - [chainTaskOptionKW](#chaintaskoptionkw)
  - [filterOrElse](#filterorelse)
  - [flap](#flap)
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
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [destructors](#destructors)
  - [getOrElse](#getorelse)
  - [getOrElseE](#getorelsee)
  - [match](#match)
  - [matchE](#matche)
  - [matchEW](#matchew)
- [instances](#instances)
  - [Alt](#alt-1)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [Bifunctor](#bifunctor-1)
  - [Chain](#chain-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [TaskEitherF (interface)](#taskeitherf-interface)
  - [TaskEitherFE (interface)](#taskeitherfe-interface)
  - [getAltTaskValidation](#getalttaskvalidation)
  - [getApplicativeTaskValidation](#getapplicativetaskvalidation)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
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
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bracket](#bracket)
  - [taskify](#taskify)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)
  - [tupled](#tupled)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `TaskEither` returns `first` if it is a `Right` or the value returned by `second` otherwise.

See also [orElse](#orElse).

**Signature**

```ts
export declare const alt: <E2, B>(
  second: Lazy<TaskEither<E2, B>>
) => <E1, A>(first: TaskEither<E1, A>) => TaskEither<E2, B | A>
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

Added in v3.0.0

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

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: TaskEither<E, A>) => TaskEither<G, B>
```

Added in v3.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: TaskEither<E, A>) => TaskEither<G, A>
```

Added in v3.0.0

# Chain

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, E = never>(a: A) => TaskEither<E, A>
```

Added in v3.0.0

# combinators

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, A>
```

Added in v3.0.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => <E>(first: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v3.0.0

## chainFirstTaskK

**Signature**

```ts
export declare const chainFirstTaskK: <A, B>(f: (a: A) => T.Task<B>) => <E>(first: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v3.0.0

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

## chainIOEitherKW

Less strict version of [`chainIOEitherK`](#chainIOEitherK).

**Signature**

```ts
export declare const chainIOEitherKW: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => <E>(first: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => <E>(first: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

## chainTaskOptionK

**Signature**

```ts
export declare const chainTaskOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
```

Added in v3.0.0

## chainTaskOptionKW

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const chainTaskOptionKW: <E2>(
  onNone: Lazy<E2>
) => <A, B>(f: (a: A) => TaskOption<B>) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: TaskEither<E1, A>
  ) => TaskEither<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(
    mb: TaskEither<E1, B>
  ) => TaskEither<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: TaskEither<E1, A>) => TaskEither<E2 | E1, A>
}
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => E.Either<E, B>
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
) => <E = never>(...a: A) => TaskEither<E, B>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => (...a: A) => TaskEither<E, B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => T.Task<B>
) => <E = never>(...a: A) => TaskEither<E, B>
```

Added in v3.0.0

## fromTaskOptionK

**Signature**

```ts
export declare const fromTaskOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => TaskOption<B>) => (...a: A) => TaskEither<E, B>
```

Added in v3.0.0

## orElse

Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.

See also [alt](#alt).

**Signature**

```ts
export declare const orElse: <E1, E2, B>(
  onLeft: (e: E1) => TaskEither<E2, B>
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

## orElseFirst

**Signature**

```ts
export declare const orElseFirst: <E1, E2, B>(
  onLeft: (e: E1) => TaskEither<E2, B>
) => <A>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, A>
```

Added in v3.0.0

## orElseFirstIOK

**Signature**

```ts
export declare const orElseFirstIOK: <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v3.0.0

## orElseFirstTaskK

**Signature**

```ts
export declare const orElseFirstTaskK: <E, B>(
  onLeft: (e: E) => T.Task<B>
) => <A>(ma: TaskEither<E, A>) => TaskEither<E, A>
```

Added in v3.0.0

## orLeft

**Signature**

```ts
export declare const orLeft: <E1, E2>(onLeft: (e: E1) => T.Task<E2>) => <A>(fa: TaskEither<E1, A>) => TaskEither<E2, A>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E>
```

Added in v3.0.0

# constructors

## fromPredicate

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => TaskEither<A, B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => TaskEither<B, B>
  <A>(predicate: Predicate<A>): (a: A) => TaskEither<A, A>
}
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E, A = never>(e: E) => TaskEither<E, A>
```

Added in v3.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E, A = never>(me: IO<E>) => TaskEither<E, A>
```

Added in v3.0.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E, A = never>(me: T.Task<E>) => TaskEither<E, A>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A, E = never>(a: A) => TaskEither<E, A>
```

Added in v3.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <A, E = never>(ma: IO<A>) => TaskEither<E, A>
```

Added in v3.0.0

## rightTask

**Signature**

```ts
export declare const rightTask: <A, E = never>(ma: T.Task<A>) => TaskEither<E, A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E2, B>(
  second: TaskEither<E2, B>
) => <E1, A>(first: TaskEither<E1, A>) => TaskEither<E2 | E1, A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E2, B>(
  second: TaskEither<E2, B>
) => <E1, A>(first: TaskEither<E1, A>) => TaskEither<E2 | E1, B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <E1>(first: TaskEither<E1, A>) => TaskEither<E2 | E1, A>
```

Added in v3.0.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <E1, E2, A>(mma: TaskEither<E1, TaskEither<E2, A>>) => TaskEither<E1 | E2, A>
```

Added in v3.0.0

# destructors

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, B>(onLeft: (e: E) => B) => <A>(ma: TaskEither<E, A>) => T.Task<B | A>
```

Added in v3.0.0

## getOrElseE

**Signature**

```ts
export declare const getOrElseE: <E, B>(onLeft: (e: E) => T.Task<B>) => <A>(ma: TaskEither<E, A>) => T.Task<B | A>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => (ma: TaskEither<E, A>) => T.Task<B | C>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare const matchE: <E, B, A>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<B>
) => (ma: TaskEither<E, A>) => T.Task<B>
```

Added in v3.0.0

## matchEW

Less strict version of [`matchE`](#matchE).

**Signature**

```ts
export declare const matchEW: <E, B, A, C>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<C>
) => (ma: TaskEither<E, A>) => T.Task<B | C>
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt_<TaskEitherF>
```

Added in v3.0.0

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: Applicative<TaskEitherF>
```

Added in v3.0.0

## ApplicativeSeq

**Signature**

```ts
export declare const ApplicativeSeq: Applicative<TaskEitherF>
```

Added in v3.0.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: Apply<TaskEitherF>
```

Added in v3.0.0

## ApplySeq

**Signature**

```ts
export declare const ApplySeq: Apply<TaskEitherF>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor_<TaskEitherF>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: Chain_<TaskEitherF>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither_<TaskEitherF>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO_<TaskEitherF>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask_<TaskEitherF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor_<TaskEitherF>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad_<TaskEitherF>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed_<TaskEitherF>
```

Added in v3.0.0

## TaskEitherF (interface)

**Signature**

```ts
export interface TaskEitherF extends HKT {
  readonly type: TaskEither<this['Covariant2'], this['Covariant1']>
}
```

Added in v3.0.0

## TaskEitherFE (interface)

**Signature**

```ts
export interface TaskEitherFE<E> extends HKT {
  readonly type: TaskEither<E, this['Covariant1']>
}
```

Added in v3.0.0

## getAltTaskValidation

The default [`Alt`](#alt) instance returns the last error, if you want to
get all errors you need to provide an way to concatenate them via a `Semigroup`.

See [`getAltValidation`](./Either.ts.html#getaltvalidation).

**Signature**

```ts
export declare const getAltTaskValidation: <E>(S: Semigroup<E>) => Alt_<TaskEitherFE<E>>
```

Added in v3.0.0

## getApplicativeTaskValidation

The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
get all errors you need to provide an way to concatenate them via a `Semigroup`.

See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).

**Signature**

```ts
export declare const getApplicativeTaskValidation: <E>(
  A: Apply<T.TaskF>,
  S: Semigroup<E>
) => Applicative<TaskEitherFE<E>>
```

Added in v3.0.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => Compactable<TaskEitherFE<E>>
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(M: Monoid<E>) => Filterable<TaskEitherFE<E>>
```

Added in v3.0.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <E>(
  e: E
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: TaskEither<E, A>) => TaskEither<E, NonNullable<B>>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(e: E) => <A>(a: A) => TaskEither<E, NonNullable<A>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  e: E
) => <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskEither<E, NonNullable<B>>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: TaskEither<E, A>) => T.Task<E | A>
```

Added in v3.0.0

## tryCatch

Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.

See also [`tryCatchK`](#trycatchk).

**Signature**

```ts
export declare const tryCatch: <A>(f: Lazy<Promise<A>>) => TaskEither<unknown, A>
```

**Example**

```ts
import { left, right } from 'fp-ts/Either'
import { tryCatch } from 'fp-ts/TaskEither'

tryCatch(() => Promise.resolve(1))().then((result) => {
  assert.deepStrictEqual(result, right(1))
})
tryCatch(() => Promise.reject('error'))().then((result) => {
  assert.deepStrictEqual(result, left('error'))
})
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
export declare const fromEither: <E, A>(fa: E.Either<E, A>) => TaskEither<E, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A, E = never>(fa: IO<A>) => TaskEither<E, A>
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
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => TaskEither<E, A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A, E = never>(fa: T.Task<A>) => TaskEither<E, A>
```

Added in v3.0.0

## fromTaskOption

**Signature**

```ts
export declare const fromTaskOption: <E>(onNone: Lazy<E>) => <A>(fa: TaskOption<A>) => TaskEither<E, A>
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

## apS

**Signature**

```ts
export declare const apS: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  fb: TaskEither<E2, B>
) => <E1>(fa: TaskEither<E1, A>) => TaskEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
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
  f: <A2 extends A>(a: A | A2) => TaskEither<E2, B>
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
  release: (a: A, e: E.Either<E2, B>) => TaskEither<E3, void>
) => TaskEither<E1 | E2 | E3, B>
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

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskEither<E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskEither<E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(fa: TaskEither<E, A>) => TaskEither<E, readonly [A]>
```

Added in v3.0.0
