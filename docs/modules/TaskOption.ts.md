---
title: TaskOption.ts
nav_order: 96
parent: Modules
---

## TaskOption overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Alternative](#alternative)
  - [zero](#zero)
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
- [combinators](#combinators)
  - [chainNullableK](#chainnullablek)
  - [chainOptionK](#chainoptionk)
  - [flap](#flap)
  - [fromNullableK](#fromnullablek)
  - [fromOptionK](#fromoptionk)
  - [tryCatchK](#trycatchk)
- [constructors](#constructors)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [fromTask](#fromtask)
  - [none](#none)
  - [some](#some)
  - [tryCatch](#trycatch)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [destructors](#destructors)
  - [fold](#fold)
  - [foldW](#foldw)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Alternative](#alternative-1)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [FromIO](#fromio)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [MonadIO](#monadio)
  - [MonadTask](#monadtask)
  - [Pointed](#pointed-1)
  - [URI (type alias)](#uri-type-alias)
- [model](#model)
  - [TaskOption (interface)](#taskoption-interface)
- [utils](#utils)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [sequenceArray](#sequencearray)
  - [sequenceSeqArray](#sequenceseqarray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseSeqArray](#traverseseqarray)
  - [traverseSeqArrayWithIndex](#traverseseqarraywithindex)

---

# Alt

## alt

**Signature**

```ts
export declare const alt: <A>(second: Lazy<T.Task<O.Option<A>>>) => (first: T.Task<O.Option<A>>) => T.Task<O.Option<A>>
```

Added in v2.10.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <B>(second: Lazy<TaskOption<B>>) => <A>(first: TaskOption<A>) => TaskOption<B | A>
```

Added in v2.10.0

# Alternative

## zero

**Signature**

```ts
export declare const zero: <A>() => TaskOption<A>
```

Added in v2.10.0

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(fa: T.Task<O.Option<A>>) => <B>(fab: T.Task<O.Option<(a: A) => B>>) => T.Task<O.Option<B>>
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
export declare const filter: <A>(predicate: Predicate<A>) => (fga: T.Task<O.Option<A>>) => T.Task<O.Option<A>>
```

Added in v2.10.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fga: T.Task<O.Option<A>>) => T.Task<O.Option<B>>
```

Added in v2.10.0

## partition

**Signature**

```ts
export declare const partition: <A>(
  predicate: Predicate<A>
) => (fga: T.Task<O.Option<A>>) => Separated<T.Task<O.Option<A>>, T.Task<O.Option<A>>>
```

Added in v2.10.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: T.Task<O.Option<A>>) => Separated<T.Task<O.Option<B>>, T.Task<O.Option<C>>>
```

Added in v2.10.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: T.Task<O.Option<A>>) => T.Task<O.Option<B>>
```

Added in v2.10.0

# Monad

## chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => T.Task<O.Option<B>>) => (ma: T.Task<O.Option<A>>) => T.Task<O.Option<B>>
```

Added in v2.10.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => TaskOption<A>
```

Added in v2.10.0

# combinators

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <A, B>(
  f: (a: A) => B
) => (ma: T.Task<O.Option<A>>) => T.Task<O.Option<NonNullable<B>>>
```

Added in v2.10.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <A, B>(f: (a: A) => O.Option<B>) => (ma: T.Task<O.Option<A>>) => T.Task<O.Option<B>>
```

Added in v2.10.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v2.10.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <A, B>(f: (...a: A) => B) => (...a: A) => T.Task<O.Option<NonNullable<B>>>
```

Added in v2.10.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A, B>(f: (...a: A) => O.Option<B>) => (...a: A) => T.Task<O.Option<B>>
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

# constructors

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(e: Either<E, A>) => T.Task<O.Option<A>>
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
export declare const fromNullable: <A>(a: A) => T.Task<O.Option<NonNullable<A>>>
```

Added in v2.10.0

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(ma: O.Option<A>) => TaskOption<A>
```

Added in v2.10.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <A, B>(refinement: Refinement<A, B>): (a: A) => T.Task<O.Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => T.Task<O.Option<A>>
}
```

Added in v2.10.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A>(fa: T.Task<A>) => TaskOption<A>
```

Added in v2.10.0

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

## tryCatch

Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Option` instead.

Note: `f` should never `throw` errors, they are not caught.

See also [`tryCatchK`](#tryCatchK).

**Signature**

```ts
export declare const tryCatch: <A>(f: Lazy<Promise<A>>) => TaskOption<A>
```

Added in v2.10.0

# derivable combinators

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

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => TaskOption<B>) => (first: TaskOption<A>) => TaskOption<A>
```

Added in v2.10.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A>
```

Added in v2.10.0

# destructors

## fold

**Signature**

```ts
export declare const fold: <B, A>(
  onNone: () => T.Task<B>,
  onSome: (a: A) => T.Task<B>
) => (ma: T.Task<O.Option<A>>) => T.Task<B>
```

Added in v2.10.0

## foldW

Less strict version of [`fold`](#fold).

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
export declare const getOrElse: <A>(onNone: Lazy<T.Task<A>>) => (fa: T.Task<O.Option<A>>) => T.Task<A>
```

Added in v2.10.0

## getOrElseW

Less strict version of [`getOrElse`](#getOrElse).

**Signature**

```ts
export declare const getOrElseW: <B>(onNone: Lazy<T.Task<B>>) => <A>(ma: O.Option<A>) => B | A
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

**Signature**

```ts
export declare const ApplicativePar: Applicative1<'TaskOption'>
```

Added in v2.10.0

## ApplicativeSeq

**Signature**

```ts
export declare const ApplicativeSeq: Applicative1<'TaskOption'>
```

Added in v2.10.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: Apply1<'TaskOption'>
```

Added in v2.10.0

## ApplySeq

**Signature**

```ts
export declare const ApplySeq: Apply1<'TaskOption'>
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

# model

## TaskOption (interface)

**Signature**

```ts
export interface TaskOption<A> extends Task<Option<A>> {}
```

Added in v2.10.0

# utils

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
) => (fa: TaskOption<A>) => TaskOption<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskOption<B>
) => (ma: TaskOption<A>) => TaskOption<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: TaskOption<A>) => TaskOption<{ [K in N]: A }>
```

Added in v2.10.0

## sequenceArray

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

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

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseArray: <A, B>(f: (a: A) => TaskOption<B>) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v2.10.0

## traverseArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v2.10.0

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
