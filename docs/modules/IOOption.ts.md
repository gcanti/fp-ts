---
title: IOOption.ts
nav_order: 53
parent: Modules
---

## IOOption overview

`IOOption<A>` represents a synchronous computation that either yields a value of type `A` or nothing.

If you want to represent a synchronous computation that never fails, please see `IO`.
If you want to represent a synchronous computation that may fail, please see `IOEither`.

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
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [Functor](#functor)
  - [map](#map)
- [HKT](#hkt)
  - [IOOptionF (interface)](#iooptionf-interface)
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
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [flap](#flap)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [guard](#guard)
  - [none](#none)
  - [some](#some)
- [destructors](#destructors)
  - [getOrElse](#getorelse)
  - [getOrElseE](#getorelsee)
  - [match](#match)
  - [matchE](#matche)
  - [toNullable](#tonullable)
  - [toUndefined](#toundefined)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Alternative](#alternative)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Chain](#chain-1)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [Zero](#zero-1)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
- [model](#model)
  - [IOOption (interface)](#iooption-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)

---

# Alt

## alt

**Signature**

```ts
export declare const alt: <B>(second: Lazy<IOOption<B>>) => <A>(first: IOOption<A>) => IOOption<B | A>
```

Added in v3.0.0

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(fa: IOOption<A>) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B>
```

Added in v3.0.0

# Chain

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(foa: IOOption<O.Option<A>>) => IOOption<A>
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fe: IOOption<Either<A, B>>) => Separated<IOOption<A>, IOOption<B>>
```

Added in v3.0.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: IOOption<A>) => IOOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: IOOption<B>) => IOOption<B>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => IOOption<A>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fga: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: IOOption<A>) => Separated<IOOption<A>, IOOption<B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: IOOption<B>) => Separated<IOOption<B>, IOOption<B>>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => Separated<IOOption<A>, IOOption<A>>
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: IOOption<A>) => Separated<IOOption<B>, IOOption<C>>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

# HKT

## IOOptionF (interface)

**Signature**

```ts
export interface IOOptionF extends HKT {
  readonly type: IOOption<this['Covariant1']>
}
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => IOOption<A>
```

Added in v3.0.0

# Zero

## zero

**Signature**

```ts
export declare const zero: <A>() => IOOption<A>
```

Added in v3.0.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: IOOption<B>) => <A>(first: IOOption<A>) => IOOption<A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: IOOption<B>) => <A>(first: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => IOOption<B>) => (first: IOOption<A>) => IOOption<A>
```

Added in v3.0.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<A>
```

Added in v3.0.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(f: (a: A) => I.IO<B>) => (first: IOOption<A>) => IOOption<A>
```

Added in v3.0.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => I.IO<B>) => (first: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <A, B>(f: (a: A) => O.Option<B>) => (ma: IOOption<A>) => IOOption<B>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B>
```

Added in v3.0.0

## flatten

Derivable from `Chain`.

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
export declare const fromIOK: <A extends readonly unknown[], B>(f: (...a: A) => I.IO<B>) => (...a: A) => IOOption<B>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B>(
  f: (...a: A) => O.Option<B>
) => (...a: A) => IOOption<B>
```

Added in v3.0.0

# constructors

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => IOOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => IOOption<B>
  <A>(predicate: Predicate<A>): (a: A) => IOOption<A>
}
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
export declare const getOrElse: <B>(onNone: Lazy<B>) => <A>(ma: IOOption<A>) => I.IO<B | A>
```

Added in v3.0.0

## getOrElseE

**Signature**

```ts
export declare const getOrElseE: <B>(onNone: Lazy<I.IO<B>>) => <A>(ma: IOOption<A>) => I.IO<B | A>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <B, A, C = B>(onNone: () => B, onSome: (a: A) => C) => (ma: IOOption<A>) => I.IO<B | C>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare const matchE: <B, A, C = B>(
  onNone: () => I.IO<B>,
  onSome: (a: A) => I.IO<C>
) => (ma: IOOption<A>) => I.IO<B | C>
```

Added in v3.0.0

## toNullable

**Signature**

```ts
export declare const toNullable: <A>(ma: IOOption<A>) => I.IO<A | null>
```

Added in v3.0.0

## toUndefined

**Signature**

```ts
export declare const toUndefined: <A>(ma: IOOption<A>) => I.IO<A | undefined>
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt_<IOOptionF>
```

Added in v3.0.0

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative_<IOOptionF>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative_<IOOptionF>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: Apply_<IOOptionF>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: Chain_<IOOptionF>
```

Added in v3.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable_<IOOptionF>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable_<IOOptionF>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither_<IOOptionF>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO_<IOOptionF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor_<IOOptionF>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad_<IOOptionF>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed_<IOOptionF>
```

Added in v3.0.0

## Zero

**Signature**

```ts
export declare const Zero: Zero_<IOOptionF>
```

Added in v3.0.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <A, B>(
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
export declare const fromEither: <A>(e: Either<unknown, A>) => I.IO<O.Option<A>>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(ma: I.IO<A>) => IOOption<A>
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
export declare const fromOption: <A>(fa: O.Option<A>) => IOOption<A>
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: IOOption<readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: IOOption<{}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: IOOption<B>
) => (fa: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => IOOption<B>
) => (ma: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(fa: IOOption<A>) => IOOption<{ readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
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

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IOOption<B>
) => (as: readonly A[]) => IOOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, B>(
  f: (a: A) => IOOption<B>
) => (as: ReadonlyNonEmptyArray<A>) => IOOption<ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IOOption<B>
) => (as: ReadonlyNonEmptyArray<A>) => IOOption<ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0
