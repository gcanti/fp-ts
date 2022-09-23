---
title: TaskOption.ts
nav_order: 108
parent: Modules
---

## TaskOption overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Apply](#apply)
  - [ap](#ap)
- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Filterable](#filterable)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
- [Pointed](#pointed)
  - [of](#of)
- [Zero](#zero)
  - [zero](#zero)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainEitherK](#chaineitherk)
  - [chainFirst](#chainfirst)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [chainTaskK](#chaintaskk)
  - [flap](#flap)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [fromTaskK](#fromtaskk)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [guard](#guard)
  - [none](#none)
  - [some](#some)
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
  - [Alternative](#alternative)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [Chain](#chain)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [MonadIO](#monadio)
  - [MonadTask](#monadtask)
  - [Pointed](#pointed-1)
  - [URI (type alias)](#uri-type-alias)
  - [Zero](#zero-1)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [tryCatch](#trycatch)
  - [tryCatchK](#trycatchk)
- [model](#model)
  - [TaskOption (interface)](#taskoption-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromOption](#fromoption)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
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

---

# Alt

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

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v2.10.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(fa: TaskOption<O.Option<A>>) => TaskOption<A>
```

Added in v2.10.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fa: TaskOption<Either<A, B>>) => Separated<TaskOption<A>, TaskOption<B>>
```

Added in v2.10.0

# Filterable

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

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v2.10.0

# Monad

## chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v2.10.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => TaskOption<A>
```

Added in v2.10.0

# Zero

## zero

**Signature**

```ts
export declare const zero: <A>() => TaskOption<A>
```

Added in v2.10.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: TaskOption<B>) => <A>(first: TaskOption<A>) => TaskOption<A>
```

Added in v2.10.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: TaskOption<B>) => <A>(first: TaskOption<A>) => TaskOption<B>
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

Derivable from `Chain`.

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

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v2.10.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A>
```

Added in v2.10.0

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

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B>(
  f: (...a: A) => O.Option<B>
) => (...a: A) => TaskOption<B>
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

# constructors

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

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => TaskOption<void>
```

Added in v2.11.0

## none

**Signature**

```ts
export declare const none: TaskOption<never>
```

Added in v2.10.0

## some

**Signature**

```ts
export declare const some: <A>(a: A) => TaskOption<A>
```

Added in v2.10.0

# destructors

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

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.10.0

## Zero

**Signature**

```ts
export declare const Zero: Zero1<'TaskOption'>
```

Added in v2.11.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: TaskOption<A>) => TaskOption<NonNullable<B>>
```

Added in v2.10.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>>
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

# model

## TaskOption (interface)

**Signature**

```ts
export interface TaskOption<A> extends Task<Option<A>> {}
```

Added in v2.10.0

# natural transformations

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

# utils

## ApT

**Signature**

```ts
export declare const ApT: TaskOption<readonly []>
```

Added in v2.11.0

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

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## sequenceArray

**Signature**

```ts
export declare const sequenceArray: <A>(as: readonly TaskOption<A>[]) => TaskOption<readonly A[]>
```

Added in v2.10.0

## sequenceSeqArray

**Signature**

```ts
export declare const sequenceSeqArray: <A>(as: readonly TaskOption<A>[]) => TaskOption<readonly A[]>
```

Added in v2.10.0

## traverseArray

**Signature**

```ts
export declare const traverseArray: <A, B>(f: (a: A) => TaskOption<B>) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v2.10.0

## traverseArrayWithIndex

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

**Signature**

```ts
export declare const traverseSeqArray: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v2.10.0

## traverseSeqArrayWithIndex

**Signature**

```ts
export declare const traverseSeqArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v2.10.0
