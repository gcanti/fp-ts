---
title: IOOption.ts
nav_order: 53
parent: Modules
---

## IOOption overview

`IOOption<A>` represents a synchronous computation that either yields a value of type `A` or nothing.

If you want to represent a synchronous computation that never fails, please see `IO`.
If you want to represent a synchronous computation that may fail, please see `IOEither`.

Added in v2.12.0

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
  - [fold](#fold)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
  - [match](#match)
  - [matchE](#matche)
  - [matchEW](#matchew)
  - [matchW](#matchw)
  - [toNullable](#tonullable)
  - [toUndefined](#toundefined)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Alternative](#alternative)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Chain](#chain)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [MonadIO](#monadio)
  - [Pointed](#pointed-1)
  - [URI (type alias)](#uri-type-alias)
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
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)

---

# Alt

## alt

**Signature**

```ts
export declare const alt: <A>(second: Lazy<IOOption<A>>) => (first: IOOption<A>) => IOOption<A>
```

Added in v2.12.0

## altW

Less strict version of [`alt`](#alt).

The `W` suffix (short for **W**idening) means that the return types will be merged.

**Signature**

```ts
export declare const altW: <B>(second: Lazy<IOOption<B>>) => <A>(first: IOOption<A>) => IOOption<B | A>
```

Added in v2.12.0

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(fa: IOOption<A>) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B>
```

Added in v2.12.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(fa: IOOption<O.Option<A>>) => IOOption<A>
```

Added in v2.12.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fa: IOOption<Either<A, B>>) => Separated<IOOption<A>, IOOption<B>>
```

Added in v2.12.0

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

Added in v2.12.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fga: IOOption<A>) => IOOption<B>
```

Added in v2.12.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: IOOption<A>) => Separated<IOOption<A>, IOOption<B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: IOOption<B>) => Separated<IOOption<B>, IOOption<B>>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => Separated<IOOption<A>, IOOption<A>>
}
```

Added in v2.12.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: IOOption<A>) => Separated<IOOption<B>, IOOption<C>>
```

Added in v2.12.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IOOption<A>) => IOOption<B>
```

Added in v2.12.0

# Monad

## chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<B>
```

Added in v2.12.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => IOOption<A>
```

Added in v2.12.0

# Zero

## zero

**Signature**

```ts
export declare const zero: <A>() => IOOption<A>
```

Added in v2.12.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: IOOption<B>) => <A>(first: IOOption<A>) => IOOption<A>
```

Added in v2.12.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: IOOption<B>) => <A>(first: IOOption<A>) => IOOption<B>
```

Added in v2.12.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<B>
```

Added in v2.12.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => IOOption<B>) => (first: IOOption<A>) => IOOption<A>
```

Added in v2.12.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<A>
```

Added in v2.12.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(f: (a: A) => I.IO<B>) => (first: IOOption<A>) => IOOption<A>
```

Added in v2.12.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => I.IO<B>) => (first: IOOption<A>) => IOOption<B>
```

Added in v2.12.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <A, B>(f: (a: A) => O.Option<B>) => (ma: IOOption<A>) => IOOption<B>
```

Added in v2.12.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B>
```

Added in v2.12.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: IOOption<IOOption<A>>) => IOOption<A>
```

Added in v2.12.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => IOOption<B>
```

Added in v2.12.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(f: (...a: A) => I.IO<B>) => (...a: A) => IOOption<B>
```

Added in v2.12.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B>(
  f: (...a: A) => O.Option<B>
) => (...a: A) => IOOption<B>
```

Added in v2.12.0

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

Added in v2.12.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => IOOption<void>
```

Added in v2.12.0

## none

**Signature**

```ts
export declare const none: IOOption<never>
```

Added in v2.12.0

## some

**Signature**

```ts
export declare const some: <A>(a: A) => IOOption<A>
```

Added in v2.12.0

# destructors

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: <B, A>(onNone: () => I.IO<B>, onSome: (a: A) => I.IO<B>) => (ma: IOOption<A>) => I.IO<B>
```

Added in v2.12.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <A>(onNone: Lazy<I.IO<A>>) => (fa: IOOption<A>) => I.IO<A>
```

Added in v2.12.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

The `W` suffix (short for **W**idening) means that the handler return type will be merged.

**Signature**

```ts
export declare const getOrElseW: <B>(onNone: Lazy<I.IO<B>>) => <A>(ma: IOOption<A>) => I.IO<B | A>
```

Added in v2.12.0

## match

**Signature**

```ts
export declare const match: <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: IOOption<A>) => I.IO<B>
```

Added in v2.12.0

## matchE

The `E` suffix (short for **E**ffect) means that the handlers return an effect (`IO`).

**Signature**

```ts
export declare const matchE: <B, A>(onNone: () => I.IO<B>, onSome: (a: A) => I.IO<B>) => (ma: IOOption<A>) => I.IO<B>
```

Added in v2.12.0

## matchEW

Less strict version of [`matchE`](#matche).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchEW: <B, C, A>(
  onNone: () => I.IO<B>,
  onSome: (a: A) => I.IO<C>
) => (ma: IOOption<A>) => I.IO<B | C>
```

Added in v2.12.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <B, A, C>(onNone: () => B, onSome: (a: A) => C) => (ma: IOOption<A>) => I.IO<B | C>
```

Added in v2.12.0

## toNullable

**Signature**

```ts
export declare const toNullable: <A>(ma: IOOption<A>) => I.IO<A | null>
```

Added in v2.12.0

## toUndefined

**Signature**

```ts
export declare const toUndefined: <A>(ma: IOOption<A>) => I.IO<A | undefined>
```

Added in v2.12.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'IOOption'>
```

Added in v2.12.0

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative1<'IOOption'>
```

Added in v2.12.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'IOOption'>
```

Added in v2.12.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'IOOption'>
```

Added in v2.12.0

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'IOOption'>
```

Added in v2.12.0

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'IOOption'>
```

Added in v2.12.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'IOOption'>
```

Added in v2.12.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither1<'IOOption'>
```

Added in v2.12.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO1<'IOOption'>
```

Added in v2.12.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'IOOption'>
```

Added in v2.12.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'IOOption'>
```

Added in v2.12.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO1<'IOOption'>
```

Added in v2.12.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'IOOption'>
```

Added in v2.12.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.12.0

## Zero

**Signature**

```ts
export declare const Zero: Zero1<'IOOption'>
```

Added in v2.12.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: IOOption<A>) => IOOption<NonNullable<B>>
```

Added in v2.12.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => IOOption<NonNullable<A>>
```

Added in v2.12.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => IOOption<NonNullable<B>>
```

Added in v2.12.0

# model

## IOOption (interface)

**Signature**

```ts
export interface IOOption<A> extends IO<Option<A>> {}
```

Added in v2.12.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <A>(fa: Either<unknown, A>) => IOOption<A>
```

Added in v2.12.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: I.IO<A>) => IOOption<A>
```

Added in v2.12.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <A>(fa: IOEither<unknown, A>) => IOOption<A>
```

Added in v2.12.0

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(fa: O.Option<A>) => IOOption<A>
```

Added in v2.12.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: IOOption<readonly []>
```

Added in v2.12.0

## Do

**Signature**

```ts
export declare const Do: IOOption<{}>
```

Added in v2.12.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: IOOption<B>
) => (fa: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.12.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOOption<B>
) => (ma: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.12.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: IOOption<A>) => IOOption<{ readonly [K in N]: A }>
```

Added in v2.12.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## traverseReadonlyArrayWithIndex

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IOOption<B>
) => (as: readonly A[]) => IOOption<readonly B[]>
```

Added in v2.12.0

## traverseReadonlyNonEmptyArrayWithIndex

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IOOption<B>
) => (as: ReadonlyNonEmptyArray<A>) => IOOption<ReadonlyNonEmptyArray<B>>
```

Added in v2.12.0
