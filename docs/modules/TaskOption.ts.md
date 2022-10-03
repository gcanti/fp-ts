---
title: TaskOption.ts
nav_order: 99
parent: Modules
---

## TaskOption overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [delay](#delay)
  - [tap](#tap)
- [constructors](#constructors)
  - [none](#none)
  - [of](#of)
  - [sleep](#sleep)
  - [some](#some)
- [conversions](#conversions)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [guard](#guard)
  - [let](#let)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [getOrElse](#getorelse)
  - [getOrElseTask](#getorelsetask)
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
  - [CategoryKind](#categorykind)
  - [Compactable](#compactable)
  - [ComposableKind](#composablekind)
  - [Filterable](#filterable)
  - [Flattenable](#flattenable)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromOption](#fromoption)
  - [FromTask](#fromtask)
  - [Functor](#functor)
  - [Monad](#monad)
  - [MonoidKind](#monoidkind)
  - [Pointed](#pointed)
  - [SemigroupKind](#semigroupkind)
- [interop](#interop)
  - [fromRejectable](#fromrejectable)
  - [liftRejectable](#liftrejectable)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftEither](#lifteither)
  - [liftIO](#liftio)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftTask](#lifttask)
  - [liftTaskEither](#lifttaskeither)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [TaskOption (interface)](#taskoption-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
  - [matchTask](#matchtask)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapEither](#flatmapeither)
  - [flatMapIO](#flatmapio)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapTask](#flatmaptask)
  - [flatMapTaskEither](#flatmaptaskeither)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
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
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [TaskOptionTypeLambda (interface)](#taskoptiontypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [composeKind](#composekind)
  - [emptyKind](#emptykind)
  - [flatten](#flatten)
  - [idKind](#idkind)
  - [orElse](#orelse)
  - [unit](#unit)

---

# combinators

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (duration: number) => <A>(self: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, _>(f: (a: A) => TaskOption<_>) => (self: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

# constructors

## none

**Signature**

```ts
export declare const none: TaskOption<never>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => TaskOption<A>
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

# conversions

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

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>>
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

# do notation

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

A variant of `bind` that sequentially ignores the scope.

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

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => TaskOption<void>
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

# error handling

## catchAll

Lazy version of `orElse`.

**Signature**

```ts
export declare const catchAll: <B>(that: LazyArg<TaskOption<B>>) => <A>(self: TaskOption<A>) => TaskOption<B | A>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <B>(onNone: B) => <A>(self: TaskOption<A>) => task.Task<B | A>
```

Added in v3.0.0

## getOrElseTask

**Signature**

```ts
export declare const getOrElseTask: <B>(onNone: task.Task<B>) => <A>(self: TaskOption<A>) => task.Task<B | A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <_>(onNone: TaskOption<_>) => <A>(self: TaskOption<A>) => TaskOption<A>
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <A>(foa: TaskOption<option.Option<A>>) => TaskOption<A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: TaskOption<C>) => TaskOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: TaskOption<B>) => TaskOption<B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => option.Option<B>) => (fa: TaskOption<A>) => TaskOption<B>
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

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: TaskOption<A>) => readonly [TaskOption<B>, TaskOption<C>]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fe: TaskOption<Either<A, B>>) => readonly [TaskOption<A>, TaskOption<B>]
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

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: categoryKind.CategoryKind<TaskOptionTypeLambda>
```

Added in v3.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: compactable.Compactable<TaskOptionTypeLambda>
```

Added in v3.0.0

## ComposableKind

**Signature**

```ts
export declare const ComposableKind: composableKind.ComposableKind<TaskOptionTypeLambda>
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

## MonoidKind

**Signature**

```ts
export declare const MonoidKind: monoidKind.MonoidKind<TaskOptionTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<TaskOptionTypeLambda>
```

Added in v3.0.0

## SemigroupKind

**Signature**

```ts
export declare const SemigroupKind: semigroupKind.SemigroupKind<TaskOptionTypeLambda>
```

Added in v3.0.0

# interop

## fromRejectable

Converts a `Promise` that may reject to a `TaskOption`.

**Signature**

```ts
export declare const fromRejectable: <A>(f: LazyArg<Promise<A>>) => TaskOption<A>
```

Added in v3.0.0

## liftRejectable

Lifts a function returning a `Promise` to one returning a `TaskOption`.

**Signature**

```ts
export declare const liftRejectable: <A extends readonly unknown[], B>(
  f: (...a: A) => Promise<B>
) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

# lifting

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

## liftEither

**Signature**

```ts
export declare const liftEither: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

## liftIO

**Signature**

```ts
export declare const liftIO: <A extends readonly unknown[], B>(f: (...a: A) => IO<B>) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskOption<NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B>(
  f: (...a: A) => option.Option<B>
) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => TaskOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => TaskOption<B>
}
```

Added in v3.0.0

## liftTask

**Signature**

```ts
export declare const liftTask: <A extends readonly unknown[], B>(
  f: (...a: A) => task.Task<B>
) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

## liftTaskEither

**Signature**

```ts
export declare const liftTaskEither: <A extends readonly unknown[], B>(
  f: (...a: A) => TaskEither<unknown, B>
) => (...a: A) => TaskOption<B>
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

# model

## TaskOption (interface)

**Signature**

```ts
export interface TaskOption<A> extends Task<Option<A>> {}
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <B, A, C = B>(
  onNone: LazyArg<B>,
  onSome: (a: A) => C
) => (ma: TaskOption<A>) => task.Task<B | C>
```

Added in v3.0.0

## matchTask

**Signature**

```ts
export declare const matchTask: <B, A, C = B>(
  onNone: LazyArg<task.Task<B>>,
  onSome: (a: A) => task.Task<C>
) => (ma: TaskOption<A>) => task.Task<B | C>
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => TaskOption<B>) => (self: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## flatMapEither

**Signature**

```ts
export declare const flatMapEither: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## flatMapIO

**Signature**

```ts
export declare const flatMapIO: <A, B>(f: (a: A) => IO<B>) => (self: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: TaskOption<A>) => TaskOption<NonNullable<B>>
```

Added in v3.0.0

## flatMapTask

**Signature**

```ts
export declare const flatMapTask: <A, B>(f: (a: A) => task.Task<B>) => (self: TaskOption<A>) => TaskOption<B>
```

Added in v3.0.0

## flatMapTaskEither

**Signature**

```ts
export declare const flatMapTaskEither: <A, B>(
  f: (a: A) => TaskEither<unknown, B>
) => (ma: TaskOption<A>) => TaskOption<B>
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

# traversing

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

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: TaskOption<readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: TaskOption<A>) => TaskOption<readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <B>(
  fb: TaskOption<B>
) => <A extends readonly unknown[]>(self: TaskOption<A>) => TaskOption<readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <B, A, C>(
  that: TaskOption<B>,
  f: (a: A, b: B) => C
) => (self: TaskOption<A>) => TaskOption<C>
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

## ap

**Signature**

```ts
export declare const ap: <A>(fa: TaskOption<A>) => <B>(self: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v3.0.0

## composeKind

**Signature**

```ts
export declare const composeKind: <B, C>(
  bfc: (b: B) => TaskOption<C>
) => <A>(afb: (a: A) => TaskOption<B>) => (a: A) => TaskOption<C>
```

Added in v3.0.0

## emptyKind

**Signature**

```ts
export declare const emptyKind: <A>() => TaskOption<A>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A>
```

Added in v3.0.0

## idKind

**Signature**

```ts
export declare const idKind: <A>() => (a: A) => TaskOption<A>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <B>(that: TaskOption<B>) => <A>(self: TaskOption<A>) => TaskOption<B | A>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: TaskOption<void>
```

Added in v3.0.0
