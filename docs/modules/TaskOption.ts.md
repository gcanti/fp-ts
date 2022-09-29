---
title: TaskOption.ts
nav_order: 98
parent: Modules
---

## TaskOption overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Filterable](#filterable)
  - [filterMap](#filtermap)
  - [partitionMap](#partitionmap)
- [Functor](#functor)
  - [map](#map)
- [MonoidK](#monoidk)
  - [emptyK](#emptyk)
- [Pointed](#pointed)
  - [of](#of)
- [SemigroupK](#semigroupk)
  - [combineK](#combinek)
- [combinators](#combinators)
  - [ap](#ap)
  - [delay](#delay)
  - [flap](#flap)
  - [flatMap](#flatmap)
  - [flatMapEitherK](#flatmapeitherk)
  - [flatMapIOK](#flatmapiok)
  - [flatMapTaskEitherK](#flatmaptaskeitherk)
  - [flatMapTaskK](#flatmaptaskk)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [fromTaskEitherK](#fromtaskeitherk)
  - [fromTaskK](#fromtaskk)
  - [tap](#tap)
  - [tapError](#taperror)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [fromRefinement](#fromrefinement)
  - [guard](#guard)
  - [none](#none)
  - [sleep](#sleep)
  - [some](#some)
- [destructors](#destructors)
  - [getOrElse](#getorelse)
  - [getOrElseWithEffect](#getorelsewitheffect)
  - [match](#match)
  - [matchWithEffect](#matchwitheffect)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [Flattenable](#flattenable)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromOption](#fromoption)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [MonoidK](#monoidk-1)
  - [Pointed](#pointed-1)
  - [SemigroupK](#semigroupk-1)
- [interop](#interop)
  - [flatMapNullableK](#flatmapnullablek)
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
- [struct sequencing](#struct-sequencing)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [tuple sequencing](#tuple-sequencing)
  - [DoTuple](#dotuple)
  - [bindTuple](#bindtuple)
  - [bindTupleRight](#bindtupleright)
  - [tupled](#tupled)
- [type lambdas](#type-lambdas)
  - [TaskOptionTypeLambda (interface)](#taskoptiontypelambda-interface)
- [utils](#utils)
  - [filter](#filter)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [partition](#partition)
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
  - [unit](#unit)

---

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(foa: TaskOption<option.Option<A>>) => TaskOption<A>
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fe: TaskOption<Either<A, B>>) => readonly [TaskOption<A>, TaskOption<B>]
```

Added in v3.0.0

# Filterable

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => option.Option<B>) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: TaskOption<A>) => readonly [TaskOption<B>, TaskOption<C>]
```

Added in v3.0.0

# Functor

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

# MonoidK

## emptyK

**Signature**

```ts
export declare const emptyK: <A>() => TaskOption<A>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => TaskOption<A>
```

Added in v3.0.0

# SemigroupK

## combineK

**Signature**

```ts
export declare const combineK: <B>(second: LazyArg<TaskOption<B>>) => <A>(self: TaskOption<A>) => TaskOption<B | A>
```

Added in v3.0.0

# combinators

## ap

**Signature**

```ts
export declare const ap: <A>(fa: TaskOption<A>) => <B>(self: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v3.0.0

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (duration: number) => <A>(self: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => TaskOption<B>) => (self: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## flatMapEitherK

**Signature**

```ts
export declare const flatMapEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## flatMapIOK

**Signature**

```ts
export declare const flatMapIOK: <A, B>(f: (a: A) => IO<B>) => (self: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## flatMapTaskEitherK

**Signature**

```ts
export declare const flatMapTaskEitherK: <A, B>(
  f: (a: A) => TaskEither<unknown, B>
) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## flatMapTaskK

**Signature**

```ts
export declare const flatMapTaskK: <A, B>(f: (a: A) => task.Task<B>) => (self: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## flatten

Derivable from `Flattenable`.

**Signature**

```ts
export declare const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A>
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
  f: (...a: A) => option.Option<B>
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
  f: (...a: A) => task.Task<B>
) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, _>(f: (a: A) => TaskOption<_>) => (self: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <_>(onNone: () => TaskOption<_>) => <A>(self: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <_>(that: TaskOption<_>) => <A>(self: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <A>(that: TaskOption<A>) => <_>(self: TaskOption<_>) => TaskOption<A>
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

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: (duration: number) => TaskOption<void>
```

Added in v3.0.0

## some

**Signature**

```ts
export declare const some: <A>(a: A) => TaskOption<A>
```

Added in v3.0.0

# destructors

## getOrElse

**Signature**

```ts
export declare const getOrElse: <B>(onNone: LazyArg<B>) => <A>(ma: TaskOption<A>) => task.Task<B | A>
```

Added in v3.0.0

## getOrElseWithEffect

**Signature**

```ts
export declare const getOrElseWithEffect: <B>(
  onNone: LazyArg<task.Task<B>>
) => <A>(ma: TaskOption<A>) => task.Task<B | A>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <B, A, C = B>(
  onNone: LazyArg<B>,
  onSome: (a: A) => C
) => (ma: TaskOption<A>) => task.Task<B | C>
```

Added in v3.0.0

## matchWithEffect

**Signature**

```ts
export declare const matchWithEffect: <B, A, C = B>(
  onNone: LazyArg<task.Task<B>>,
  onSome: (a: A) => task.Task<C>
) => (ma: TaskOption<A>) => task.Task<B | C>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<TaskOptionTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<TaskOptionTypeLambda>
```

Added in v3.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: compactable.Compactable<TaskOptionTypeLambda>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: filterable.Filterable<TaskOptionTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<TaskOptionTypeLambda>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: fromEither_.FromEither<TaskOptionTypeLambda>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<TaskOptionTypeLambda>
```

Added in v3.0.0

## FromOption

**Signature**

```ts
export declare const FromOption: fromOption_.FromOption<TaskOptionTypeLambda>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: fromTask_.FromTask<TaskOptionTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<TaskOptionTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<TaskOptionTypeLambda>
```

Added in v3.0.0

## MonoidK

**Signature**

```ts
export declare const MonoidK: monoidK.MonoidK<TaskOptionTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<TaskOptionTypeLambda>
```

Added in v3.0.0

## SemigroupK

**Signature**

```ts
export declare const SemigroupK: semigroupK.SemigroupK<TaskOptionTypeLambda>
```

Added in v3.0.0

# interop

## flatMapNullableK

**Signature**

```ts
export declare const flatMapNullableK: <A, B>(
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
export declare const tryCatch: <A>(f: LazyArg<Promise<A>>) => TaskOption<A>
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
export declare const fromOption: <A>(fa: option.Option<A>) => TaskOption<A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A>(fa: task.Task<A>) => TaskOption<A>
```

Added in v3.0.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <A>(fa: TaskEither<unknown, A>) => TaskOption<A>
```

Added in v3.0.0

# struct sequencing

## Do

**Signature**

```ts
export declare const Do: TaskOption<{}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskOption<B>
) => (self: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: TaskOption<B>
) => (self: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <A>(self: TaskOption<A>) => TaskOption<{ readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# tuple sequencing

## DoTuple

**Signature**

```ts
export declare const DoTuple: TaskOption<readonly []>
```

Added in v3.0.0

## bindTuple

**Signature**

```ts
export declare const bindTuple: <A extends readonly unknown[], B>(
  f: (a: A) => TaskOption<B>
) => (self: TaskOption<A>) => TaskOption<readonly [...A, B]>
```

Added in v3.0.0

## bindTupleRight

**Signature**

```ts
export declare const bindTupleRight: <B>(
  fb: TaskOption<B>
) => <A extends readonly unknown[]>(self: TaskOption<A>) => TaskOption<readonly [...A, B]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: TaskOption<A>) => TaskOption<readonly [A]>
```

Added in v3.0.0

# type lambdas

## TaskOptionTypeLambda (interface)

**Signature**

```ts
export interface TaskOptionTypeLambda extends TypeLambda {
  readonly type: TaskOption<this['Out1']>
}
```

Added in v3.0.0

# utils

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: TaskOption<C>) => TaskOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: TaskOption<B>) => TaskOption<B>
}
```

Added in v3.0.0

## lift2

Lifts a binary function into `TaskOption`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: TaskOption<A>, fb: TaskOption<B>) => TaskOption<C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `TaskOption`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: TaskOption<A>, fb: TaskOption<B>, fc: TaskOption<C>) => TaskOption<D>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: TaskOption<C>
  ) => readonly [TaskOption<C>, TaskOption<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: TaskOption<B>) => readonly [TaskOption<B>, TaskOption<B>]
}
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <A>(arr: readonly TaskOption<A>[]) => TaskOption<readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArrayPar

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArrayPar: <A>(arr: readonly TaskOption<A>[]) => TaskOption<readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayPar

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayPar: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexPar

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexPar: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly A[]) => TaskOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: readonly [A, ...A[]]) => TaskOption<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayPar

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayPar: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: readonly [A, ...A[]]) => TaskOption<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly [A, ...A[]]) => TaskOption<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexPar

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexPar: <A, B>(
  f: (index: number, a: A) => TaskOption<B>
) => (as: readonly [A, ...A[]]) => TaskOption<readonly [B, ...B[]]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: TaskOption<void>
```

Added in v3.0.0
