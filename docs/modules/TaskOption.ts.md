---
title: TaskOption.ts
nav_order: 108
parent: Modules
---

## TaskOption overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [none](#none)
  - [of](#of)
  - [some](#some)
- [conversions](#conversions)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
- [do notation](#do-notation)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [guard](#guard)
  - [let](#let)
- [error handling](#error-handling)
  - [alt](#alt)
  - [altW](#altw)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [separate](#separate)
- [instances](#instances)
  - [Alt](#alt)
  - [Alternative](#alternative)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [Chain](#chain)
  - [Compactable](#compactable)
  - [Filterable](#filterable)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromTask](#fromtask)
  - [Functor](#functor)
  - [Monad](#monad)
  - [MonadIO](#monadio)
  - [MonadTask](#monadtask)
  - [Pointed](#pointed)
  - [Zero](#zero)
- [interop](#interop)
  - [tryCatch](#trycatch)
  - [tryCatchK](#trycatchk)
- [lifting](#lifting)
  - [fromEitherK](#fromeitherk)
  - [fromIOK](#fromiok)
  - [fromNullableK](#fromnullablek)
  - [fromOptionK](#fromoptionk)
  - [fromPredicate](#frompredicate)
  - [fromTaskK](#fromtaskk)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [TaskOption (interface)](#taskoption-interface)
- [pattern matching](#pattern-matching)
  - [fold](#fold)
  - [foldW](#foldw)
  - [match](#match)
  - [matchE](#matche)
  - [matchEW](#matchew)
  - [matchW](#matchw)
- [sequencing](#sequencing)
  - [chain](#chain)
  - [chainEitherK](#chaineitherk)
  - [chainFirst](#chainfirst)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainIOK](#chainiok)
  - [chainNullableK](#chainnullablek)
  - [chainOptionK](#chainoptionk)
  - [chainTaskK](#chaintaskk)
  - [flatten](#flatten)
- [traversing](#traversing)
  - [sequenceArray](#sequencearray)
  - [sequenceSeqArray](#sequenceseqarray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)
  - [traverseSeqArray](#traverseseqarray)
  - [traverseSeqArrayWithIndex](#traverseseqarraywithindex)
- [type lambdas](#type-lambdas)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [utils](#utils)
  - [ApT](#apt)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [zero](#zero)

---

# constructors

## none

**Signature**

```ts
export declare const none: TaskOption<never>
```

Added in v2.10.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => TaskOption<A>
```

Added in v2.10.0

## some

**Signature**

```ts
export declare const some: <A>(a: A) => TaskOption<A>
```

Added in v2.10.0

# conversions

## fromEither

**Signature**

```ts
export declare const fromEither: <A>(fa: Either<unknown, A>) => TaskOption<A>
```

Added in v2.10.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: IO<A>) => TaskOption<A>
```

Added in v2.10.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>>
```

Added in v2.10.0

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(fa: O.Option<A>) => TaskOption<A>
```

Added in v2.10.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A>(fa: T.Task<A>) => TaskOption<A>
```

Added in v2.10.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <A>(fa: TaskEither<unknown, A>) => TaskOption<A>
```

Added in v2.11.0

# do notation

## Do

**Signature**

```ts
export declare const Do: TaskOption<{}>
```

Added in v2.10.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: TaskOption<B>
) => (fa: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskOption<B>
) => (ma: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: TaskOption<A>) => TaskOption<{ readonly [K in N]: A }>
```

Added in v2.10.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => TaskOption<void>
```

Added in v2.11.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

# error handling

## alt

**Signature**

```ts
export declare const alt: <A>(second: Lazy<TaskOption<A>>) => (first: TaskOption<A>) => TaskOption<A>
```

Added in v2.10.0

## altW

Less strict version of [`alt`](#alt).

The `W` suffix (short for **W**idening) means that the return types will be merged.

**Signature**

```ts
export declare const altW: <B>(second: Lazy<TaskOption<B>>) => <A>(first: TaskOption<A>) => TaskOption<B | A>
```

Added in v2.10.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <A>(onNone: Lazy<T.Task<A>>) => (fa: TaskOption<A>) => T.Task<A>
```

Added in v2.10.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

The `W` suffix (short for **W**idening) means that the handler return type will be merged.

**Signature**

```ts
export declare const getOrElseW: <B>(onNone: Lazy<T.Task<B>>) => <A>(ma: TaskOption<A>) => T.Task<B | A>
```

Added in v2.10.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <A>(fa: TaskOption<O.Option<A>>) => TaskOption<A>
```

Added in v2.10.0

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: TaskOption<A>) => TaskOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: TaskOption<B>) => TaskOption<B>
  <A>(predicate: Predicate<A>): (fa: TaskOption<A>) => TaskOption<A>
}
```

Added in v2.10.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fga: TaskOption<A>) => TaskOption<B>
```

Added in v2.10.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: TaskOption<A>) => Separated<TaskOption<A>, TaskOption<B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: TaskOption<B>) => Separated<TaskOption<B>, TaskOption<B>>
  <A>(predicate: Predicate<A>): (fa: TaskOption<A>) => Separated<TaskOption<A>, TaskOption<A>>
}
```

Added in v2.10.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: TaskOption<A>) => Separated<TaskOption<B>, TaskOption<C>>
```

Added in v2.10.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fa: TaskOption<Either<A, B>>) => Separated<TaskOption<A>, TaskOption<B>>
```

Added in v2.10.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'TaskOption'>
```

Added in v2.10.0

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative1<'TaskOption'>
```

Added in v2.10.0

## ApplicativePar

Runs computations in parallel.

**Signature**

```ts
export declare const ApplicativePar: Applicative1<'TaskOption'>
```

Added in v2.10.0

## ApplicativeSeq

Runs computations sequentially.

**Signature**

```ts
export declare const ApplicativeSeq: Applicative1<'TaskOption'>
```

Added in v2.10.0

## ApplyPar

Runs computations in parallel.

**Signature**

```ts
export declare const ApplyPar: Apply1<'TaskOption'>
```

Added in v2.10.0

## ApplySeq

Runs computations sequentially.

**Signature**

```ts
export declare const ApplySeq: Apply1<'TaskOption'>
```

Added in v2.10.0

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'TaskOption'>
```

Added in v2.10.0

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'TaskOption'>
```

Added in v2.10.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'TaskOption'>
```

Added in v2.10.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither1<'TaskOption'>
```

Added in v2.11.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO1<'TaskOption'>
```

Added in v2.10.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask1<'TaskOption'>
```

Added in v2.10.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'TaskOption'>
```

Added in v2.10.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'TaskOption'>
```

Added in v2.10.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO1<'TaskOption'>
```

Added in v2.10.0

## MonadTask

**Signature**

```ts
export declare const MonadTask: MonadTask1<'TaskOption'>
```

Added in v2.10.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'TaskOption'>
```

Added in v2.10.0

## Zero

**Signature**

```ts
export declare const Zero: Zero1<'TaskOption'>
```

Added in v2.11.0

# interop

## tryCatch

Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Option` instead.

See also [`tryCatchK`](#trycatchk).

**Signature**

```ts
export declare const tryCatch: <A>(f: Lazy<Promise<A>>) => TaskOption<A>
```

Added in v2.10.0

## tryCatchK

Converts a function returning a `Promise` to one returning a `TaskOption`.

**Signature**

```ts
export declare const tryCatchK: <A extends readonly unknown[], B>(
  f: (...a: A) => Promise<B>
) => (...a: A) => TaskOption<B>
```

Added in v2.10.0

# lifting

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => TaskOption<B>
```

Added in v2.12.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(f: (...a: A) => IO<B>) => (...a: A) => TaskOption<B>
```

Added in v2.10.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskOption<NonNullable<B>>
```

Added in v2.10.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B>(
  f: (...a: A) => O.Option<B>
) => (...a: A) => TaskOption<B>
```

Added in v2.10.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => TaskOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => TaskOption<B>
  <A>(predicate: Predicate<A>): (a: A) => TaskOption<A>
}
```

Added in v2.10.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => T.Task<B>
) => (...a: A) => TaskOption<B>
```

Added in v2.10.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v2.10.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v2.10.0

# model

## TaskOption (interface)

**Signature**

```ts
export interface TaskOption<A> extends Task<Option<A>> {}
```

Added in v2.10.0

# pattern matching

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: <B, A>(
  onNone: () => T.Task<B>,
  onSome: (a: A) => T.Task<B>
) => (ma: TaskOption<A>) => T.Task<B>
```

Added in v2.10.0

## foldW

Alias of [`matchEW`](#matchew).

**Signature**

```ts
export declare const foldW: <B, C, A>(
  onNone: () => T.Task<B>,
  onSome: (a: A) => T.Task<C>
) => (ma: TaskOption<A>) => T.Task<B | C>
```

Added in v2.10.0

## match

**Signature**

```ts
export declare const match: <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: TaskOption<A>) => T.Task<B>
```

Added in v2.10.0

## matchE

The `E` suffix (short for **E**ffect) means that the handlers return an effect (`Task`).

**Signature**

```ts
export declare const matchE: <B, A>(
  onNone: () => T.Task<B>,
  onSome: (a: A) => T.Task<B>
) => (ma: TaskOption<A>) => T.Task<B>
```

Added in v2.10.0

## matchEW

Less strict version of [`matchE`](#matche).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchEW: <B, C, A>(
  onNone: () => T.Task<B>,
  onSome: (a: A) => T.Task<C>
) => (ma: TaskOption<A>) => T.Task<B | C>
```

Added in v2.10.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <B, A, C>(onNone: () => B, onSome: (a: A) => C) => (ma: TaskOption<A>) => T.Task<B | C>
```

Added in v2.10.0

# sequencing

## chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v2.10.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v2.12.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => TaskOption<B>) => (first: TaskOption<A>) => TaskOption<A>
```

Added in v2.10.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: TaskOption<A>) => TaskOption<A>
```

Added in v2.12.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => (first: TaskOption<A>) => TaskOption<A>
```

Added in v2.10.0

## chainFirstTaskK

**Signature**

```ts
export declare const chainFirstTaskK: <A, B>(f: (a: A) => T.Task<B>) => (first: TaskOption<A>) => TaskOption<A>
```

Added in v2.10.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => (first: TaskOption<A>) => TaskOption<B>
```

Added in v2.10.0

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: TaskOption<A>) => TaskOption<NonNullable<B>>
```

Added in v2.10.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <A, B>(f: (a: A) => O.Option<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v2.10.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => (first: TaskOption<A>) => TaskOption<B>
```

Added in v2.10.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A>
```

Added in v2.10.0

# traversing

## sequenceArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceArray: <A>(as: readonly TaskOption<A>[]) => TaskOption<readonly A[]>
```

Added in v2.10.0

## sequenceSeqArray

Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.

**Signature**

```ts
export declare const sequenceSeqArray: <A>(as: readonly TaskOption<A>[]) => TaskOption<readonly A[]>
```

Added in v2.10.0

## traverseArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseArray: <A, B>(f: (a: A) => TaskOption<B>) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v2.10.0

## traverseArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v2.10.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v2.11.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## traverseSeqArray

Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseSeqArray: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v2.10.0

## traverseSeqArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseSeqArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v2.10.0

# type lambdas

## URI

**Signature**

```ts
export declare const URI: 'TaskOption'
```

Added in v2.10.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.10.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: TaskOption<readonly []>
```

Added in v2.11.0

## ap

**Signature**

```ts
export declare const ap: <A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v2.10.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <B>(second: TaskOption<B>) => <A>(first: TaskOption<A>) => TaskOption<A>
```

Added in v2.10.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <B>(second: TaskOption<B>) => <A>(first: TaskOption<A>) => TaskOption<B>
```

Added in v2.10.0

## zero

**Signature**

```ts
export declare const zero: <A>() => TaskOption<A>
```

Added in v2.10.0
