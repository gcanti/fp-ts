---
title: IOOption.ts
nav_order: 54
parent: Modules
---

## IOOption overview

`IOOption<A>` represents a synchronous computation that either yields a value of type `A` or nothing.

If you want to represent a synchronous computation that never fails, please see `IO`.
If you want to represent a synchronous computation that may fail, please see `IOEither`.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Filterable](#filterable)
  - [filterMap](#filtermap)
  - [partitionMap](#partitionmap)
- [Flattenable](#flattenable)
  - [flatMap](#flatmap)
- [Functor](#functor)
  - [map](#map)
- [MonoidK](#monoidk)
  - [emptyK](#emptyk)
- [Pointed](#pointed)
  - [of](#of)
- [SemigroupK](#semigroupk)
  - [combineK](#combinek)
- [combinators](#combinators)
  - [flap](#flap)
  - [flatMapEitherK](#flatmapeitherk)
  - [flatMapIOK](#flatmapiok)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [tap](#tap)
  - [zipLeftPar](#zipleftpar)
  - [zipRightPar](#ziprightpar)
- [combinatorsError](#combinatorserror)
  - [tapError](#taperror)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [fromRefinement](#fromrefinement)
  - [guard](#guard)
  - [none](#none)
  - [some](#some)
- [destructors](#destructors)
  - [getOrElse](#getorelse)
  - [getOrElseWithEffect](#getorelsewitheffect)
  - [match](#match)
  - [matchWithEffect](#matchwitheffect)
  - [toNullable](#tonullable)
  - [toUndefined](#toundefined)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [Flattenable](#flattenable-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromOption](#fromoption)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [MonoidK](#monoidk-1)
  - [Pointed](#pointed-1)
  - [SemigroupK](#semigroupk-1)
- [interop](#interop)
  - [flatMapNullableK](#flatmapnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [model](#model)
  - [IOOption (interface)](#iooption-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
- [type lambdas](#type-lambdas)
  - [IOOptionTypeLambda (interface)](#iooptiontypelambda-interface)
- [utils](#utils)
  - [Do](#do)
  - [DoT](#dot)
  - [bind](#bind)
  - [bindPar](#bindpar)
  - [bindTPar](#bindtpar)
  - [bindTo](#bindto)
  - [filter](#filter)
  - [let](#let)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [partition](#partition)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [tupled](#tupled)
  - [unit](#unit)

---

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(fa: IOOption<A>) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B>
```

Added in v3.0.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(foa: IOOption<option.Option<A>>) => IOOption<A>
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fe: IOOption<Either<A, B>>) => readonly [IOOption<A>, IOOption<B>]
```

Added in v3.0.0

# Filterable

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => option.Option<B>) => (fga: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: IOOption<A>) => readonly [IOOption<B>, IOOption<C>]
```

Added in v3.0.0

# Flattenable

## flatMap

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

# Functor

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

# MonoidK

## emptyK

**Signature**

```ts
export declare const emptyK: <A>() => IOOption<A>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => IOOption<A>
```

Added in v3.0.0

# SemigroupK

## combineK

**Signature**

```ts
export declare const combineK: <B>(second: LazyArg<IOOption<B>>) => <A>(self: IOOption<A>) => IOOption<B | A>
```

Added in v3.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B>
```

Added in v3.0.0

## flatMapEitherK

**Signature**

```ts
export declare const flatMapEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

## flatMapIOK

**Signature**

```ts
export declare const flatMapIOK: <A, B>(f: (a: A) => io.IO<B>) => (self: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

## flatten

Derivable from `Flattenable`.

**Signature**

```ts
export declare const flatten: <A>(mma: IOOption<IOOption<A>>) => IOOption<A>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => IOOption<B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(f: (...a: A) => io.IO<B>) => (...a: A) => IOOption<B>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B>(
  f: (...a: A) => option.Option<B>
) => (...a: A) => IOOption<B>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, _>(f: (a: A) => IOOption<_>) => (self: IOOption<A>) => IOOption<A>
```

Added in v3.0.0

## zipLeftPar

Returns an effect that executes both this effect and the specified effect,
in parallel, this effect result returned. If either side fails, then the
other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipLeftPar: <B>(second: IOOption<B>) => <A>(self: IOOption<A>) => IOOption<A>
```

Added in v3.0.0

## zipRightPar

Returns an effect that executes both this effect and the specified effect,
in parallel, returning result of provided effect. If either side fails,
then the other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipRightPar: <B>(second: IOOption<B>) => <A>(self: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

# combinatorsError

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <_>(onNone: () => IOOption<_>) => <A>(self: IOOption<A>) => IOOption<A>
```

Added in v3.0.0

# constructors

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: <B extends A, A = B>(predicate: Predicate<A>) => (b: B) => IOOption<B>
```

Added in v3.0.0

## fromRefinement

**Signature**

```ts
export declare const fromRefinement: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (c: C) => IOOption<B>
```

Added in v3.0.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => IOOption<void>
```

Added in v3.0.0

## none

**Signature**

```ts
export declare const none: IOOption<never>
```

Added in v3.0.0

## some

**Signature**

```ts
export declare const some: <A>(a: A) => IOOption<A>
```

Added in v3.0.0

# destructors

## getOrElse

**Signature**

```ts
export declare const getOrElse: <B>(onNone: LazyArg<B>) => <A>(ma: IOOption<A>) => io.IO<B | A>
```

Added in v3.0.0

## getOrElseWithEffect

**Signature**

```ts
export declare const getOrElseWithEffect: <B>(onNone: LazyArg<io.IO<B>>) => <A>(ma: IOOption<A>) => io.IO<B | A>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) => (ma: IOOption<A>) => io.IO<B | C>
```

Added in v3.0.0

## matchWithEffect

**Signature**

```ts
export declare const matchWithEffect: <B, A, C = B>(
  onNone: LazyArg<io.IO<B>>,
  onSome: (a: A) => io.IO<C>
) => (ma: IOOption<A>) => io.IO<B | C>
```

Added in v3.0.0

## toNullable

**Signature**

```ts
export declare const toNullable: <A>(ma: IOOption<A>) => io.IO<A | null>
```

Added in v3.0.0

## toUndefined

**Signature**

```ts
export declare const toUndefined: <A>(ma: IOOption<A>) => io.IO<A | undefined>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<IOOptionTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<IOOptionTypeLambda>
```

Added in v3.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: compactable.Compactable<IOOptionTypeLambda>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: filterable.Filterable<IOOptionTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<IOOptionTypeLambda>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: fromEither_.FromEither<IOOptionTypeLambda>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<IOOptionTypeLambda>
```

Added in v3.0.0

## FromOption

**Signature**

```ts
export declare const FromOption: fromOption_.FromOption<IOOptionTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<IOOptionTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<IOOptionTypeLambda>
```

Added in v3.0.0

## MonoidK

**Signature**

```ts
export declare const MonoidK: monoidK.MonoidK<IOOptionTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<IOOptionTypeLambda>
```

Added in v3.0.0

## SemigroupK

**Signature**

```ts
export declare const SemigroupK: semigroupK.SemigroupK<IOOptionTypeLambda>
```

Added in v3.0.0

# interop

## flatMapNullableK

**Signature**

```ts
export declare const flatMapNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: IOOption<A>) => IOOption<NonNullable<B>>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => IOOption<NonNullable<A>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => IOOption<NonNullable<B>>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => IOOption<void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => IOOption<void>
```

Added in v3.0.0

# model

## IOOption (interface)

**Signature**

```ts
export interface IOOption<A> extends IO<Option<A>> {}
```

Added in v3.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <A>(e: Either<unknown, A>) => io.IO<option.Option<A>>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(ma: io.IO<A>) => IOOption<A>
```

Added in v3.0.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <A>(ma: IOEither<unknown, A>) => IOOption<A>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(fa: option.Option<A>) => IOOption<A>
```

Added in v3.0.0

# type lambdas

## IOOptionTypeLambda (interface)

**Signature**

```ts
export interface IOOptionTypeLambda extends TypeLambda {
  readonly type: IOOption<this['Out1']>
}
```

Added in v3.0.0

# utils

## Do

**Signature**

```ts
export declare const Do: IOOption<{}>
```

Added in v3.0.0

## DoT

**Signature**

```ts
export declare const DoT: IOOption<readonly []>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOOption<B>
) => (self: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindPar

**Signature**

```ts
export declare const bindPar: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: IOOption<B>
) => (self: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTPar

**Signature**

```ts
export declare const bindTPar: <B>(
  fb: IOOption<B>
) => <A extends readonly unknown[]>(self: IOOption<A>) => IOOption<readonly [...A, B]>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(self: IOOption<A>) => IOOption<{ readonly [K in N]: A }>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: IOOption<C>) => IOOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: IOOption<B>) => IOOption<B>
}
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## lift2

Lifts a binary function into `IOOption`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: IOOption<A>, fb: IOOption<B>) => IOOption<C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `IOOption`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: IOOption<A>, fb: IOOption<B>, fc: IOOption<C>) => IOOption<D>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: IOOption<C>
  ) => readonly [IOOption<C>, IOOption<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: IOOption<B>) => readonly [IOOption<B>, IOOption<B>]
}
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <A>(arr: readonly IOOption<A>[]) => IOOption<readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, B>(
  f: (a: A) => IOOption<B>
) => (as: readonly A[]) => IOOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IOOption<B>
) => (as: readonly A[]) => IOOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, B>(
  f: (a: A) => IOOption<B>
) => (as: readonly [A, ...A[]]) => IOOption<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IOOption<B>
) => (as: readonly [A, ...A[]]) => IOOption<readonly [B, ...B[]]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: IOOption<A>) => IOOption<readonly [A]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: IOOption<void>
```

Added in v3.0.0
