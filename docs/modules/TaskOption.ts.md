---
title: TaskOption.ts
nav_order: 101
parent: Modules
---

## TaskOption overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
- [Apply](#apply)
  - [ap](#ap)
- [Chain](#chain)
  - [chain](#chain)
- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Filterable](#filterable)
  - [filterMap](#filtermap)
  - [partitionMap](#partitionmap)
- [Functor](#functor)
  - [map](#map)
- [HKT](#hkt)
  - [TaskOptionF (interface)](#taskoptionf-interface)
- [Pointed](#pointed)
  - [of](#of)
- [Zero](#zero)
  - [zero](#zero)
- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainIOK](#chainiok)
  - [chainTaskEitherK](#chaintaskeitherk)
  - [chainTaskK](#chaintaskk)
  - [flap](#flap)
  - [fromEitherK](#fromeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [fromTaskEitherK](#fromtaskeitherk)
  - [fromTaskK](#fromtaskk)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [fromRefinement](#fromrefinement)
  - [guard](#guard)
  - [none](#none)
  - [some](#some)
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
- [instances](#instances)
  - [Alt](#alt-1)
  - [Alternative](#alternative)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [Chain](#chain-1)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromOption](#fromoption)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
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
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [filter](#filter)
  - [let](#let)
  - [partition](#partition)
  - [refine](#refine)
  - [refinement](#refinement)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArraySeq](#sequencereadonlyarrayseq)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArraySeq](#traversereadonlyarrayseq)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArraySeq](#traversereadonlynonemptyarrayseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)
  - [tupled](#tupled)

---

# Alt

## alt

**Signature**

```ts
export declare const alt: <B>(second: Lazy<TaskOption<B>>) => <A>(first: TaskOption<A>) => TaskOption<B | A>
```

Added in v3.0.0

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v3.0.0

# Chain

## chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(foa: TaskOption<O.Option<A>>) => TaskOption<A>
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fe: TaskOption<Either<A, B>>) => Separated<TaskOption<A>, TaskOption<B>>
```

Added in v3.0.0

# Filterable

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: TaskOption<A>) => Separated<TaskOption<B>, TaskOption<C>>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

# HKT

## TaskOptionF (interface)

**Signature**

```ts
export interface TaskOptionF extends HKT {
  readonly type: TaskOption<this['Covariant1']>
}
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => TaskOption<A>
```

Added in v3.0.0

# Zero

## zero

**Signature**

```ts
export declare const zero: <A>() => TaskOption<A>
```

Added in v3.0.0

# combinators

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => (first: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

## chainFirstTaskK

**Signature**

```ts
export declare const chainFirstTaskK: <A, B>(f: (a: A) => T.Task<B>) => (first: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => (first: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## chainTaskEitherK

**Signature**

```ts
export declare const chainTaskEitherK: <A, B>(
  f: (a: A) => TaskEither<unknown, B>
) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => (first: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(f: (...a: A) => IO<B>) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B>(
  f: (...a: A) => O.Option<B>
) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

## fromTaskEitherK

**Signature**

```ts
export declare const fromTaskEitherK: <A extends readonly unknown[], B>(
  f: (...a: A) => TaskEither<unknown, B>
) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => T.Task<B>
) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

# constructors

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: <B extends A, A = B>(predicate: Predicate<A>) => (b: B) => TaskOption<B>
```

Added in v3.0.0

## fromRefinement

**Signature**

```ts
export declare const fromRefinement: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (c: C) => TaskOption<B>
```

Added in v3.0.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => TaskOption<void>
```

Added in v3.0.0

## none

**Signature**

```ts
export declare const none: TaskOption<never>
```

Added in v3.0.0

## some

**Signature**

```ts
export declare const some: <A>(a: A) => TaskOption<A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: TaskOption<B>) => <A>(first: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: TaskOption<B>) => <A>(first: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => TaskOption<B>) => (first: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A>
```

Added in v3.0.0

# destructors

## getOrElse

**Signature**

```ts
export declare const getOrElse: <B>(onNone: Lazy<B>) => <A>(ma: TaskOption<A>) => T.Task<B | A>
```

Added in v3.0.0

## getOrElseE

**Signature**

```ts
export declare const getOrElseE: <B>(onNone: Lazy<T.Task<B>>) => <A>(ma: TaskOption<A>) => T.Task<B | A>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <B, A, C = B>(onNone: () => B, onSome: (a: A) => C) => (ma: TaskOption<A>) => T.Task<B | C>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare const matchE: <B, A, C = B>(
  onNone: () => T.Task<B>,
  onSome: (a: A) => T.Task<C>
) => (ma: TaskOption<A>) => T.Task<B | C>
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt_<TaskOptionF>
```

Added in v3.0.0

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative_<TaskOptionF>
```

Added in v3.0.0

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: Applicative<TaskOptionF>
```

Added in v3.0.0

## ApplicativeSeq

**Signature**

```ts
export declare const ApplicativeSeq: Applicative<TaskOptionF>
```

Added in v3.0.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: Apply<TaskOptionF>
```

Added in v3.0.0

## ApplySeq

**Signature**

```ts
export declare const ApplySeq: Apply<TaskOptionF>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: Chain_<TaskOptionF>
```

Added in v3.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable_<TaskOptionF>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: FilterableModule.Filterable<TaskOptionF>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEitherModule.FromEither<TaskOptionF>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO_<TaskOptionF>
```

Added in v3.0.0

## FromOption

**Signature**

```ts
export declare const FromOption: FromOptionModule.FromOption<TaskOptionF>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask_<TaskOptionF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor_<TaskOptionF>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad_<TaskOptionF>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed_<TaskOptionF>
```

Added in v3.0.0

## Zero

**Signature**

```ts
export declare const Zero: Zero_<TaskOptionF>
```

Added in v3.0.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: TaskOption<A>) => TaskOption<NonNullable<B>>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskOption<NonNullable<B>>
```

Added in v3.0.0

## tryCatch

Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Option` instead.

Note: `f` should never `throw` errors, they are not caught.

See also [`tryCatchK`](#tryCatchK).

**Signature**

```ts
export declare const tryCatch: <A>(f: Lazy<Promise<A>>) => TaskOption<A>
```

Added in v3.0.0

## tryCatchK

Converts a function returning a `Promise` to one returning a `TaskOption`.

**Signature**

```ts
export declare const tryCatchK: <A extends readonly unknown[], B>(
  f: (...a: A) => Promise<B>
) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

# model

## TaskOption (interface)

**Signature**

```ts
export interface TaskOption<A> extends Task<Option<A>> {}
```

Added in v3.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <A>(fa: Either<unknown, A>) => TaskOption<A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: IO<A>) => TaskOption<A>
```

Added in v3.0.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <A>(fa: IOEither<unknown, A>) => TaskOption<A>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(fa: O.Option<A>) => TaskOption<A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A>(fa: T.Task<A>) => TaskOption<A>
```

Added in v3.0.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <A>(fa: TaskEither<unknown, A>) => TaskOption<A>
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: TaskOption<readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: TaskOption<{}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: TaskOption<B>
) => (fa: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <B>(
  fb: TaskOption<B>
) => <A extends readonly unknown[]>(fas: TaskOption<A>) => TaskOption<readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => TaskOption<B>
) => (ma: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <A>(fa: TaskOption<A>) => TaskOption<{ readonly [K in N]: A }>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: <B extends A, A = B>(predicate: Predicate<A>) => (fb: TaskOption<B>) => TaskOption<B>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: <B extends A, A = B>(
  predicate: Predicate<A>
) => (fb: TaskOption<B>) => Separated<TaskOption<B>, TaskOption<B>>
```

Added in v3.0.0

## refine

**Signature**

```ts
export declare const refine: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (fc: TaskOption<C>) => TaskOption<B>
```

Added in v3.0.0

## refinement

**Signature**

```ts
export declare const refinement: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (fc: TaskOption<C>) => Separated<TaskOption<C>, TaskOption<B>>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <A>(arr: readonly TaskOption<A>[]) => TaskOption<readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArraySeq

Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.

**Signature**

```ts
export declare const sequenceReadonlyArraySeq: <A>(arr: readonly TaskOption<A>[]) => TaskOption<readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArraySeq

Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArraySeq: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArraySeq

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplySeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArraySeq: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplySeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(fa: TaskOption<A>) => TaskOption<readonly [A]>
```

Added in v3.0.0
