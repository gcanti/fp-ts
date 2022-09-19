---
title: ReaderEither.ts
nav_order: 74
parent: Modules
---

## ReaderEither overview

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
- [HKT](#hkt)
  - [ReaderEitherF (interface)](#readereitherf-interface)
  - [ReaderEitherFFixedE (interface)](#readereitherffixede-interface)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainOptionKOrElse](#chainoptionkorelse)
  - [chainReaderK](#chainreaderk)
  - [filterOrElse](#filterorelse)
  - [flap](#flap)
  - [fromEitherK](#fromeitherk)
  - [fromOptionKOrElse](#fromoptionkorelse)
  - [fromReaderK](#fromreaderk)
  - [local](#local)
  - [orElse](#orelse)
  - [orElseFirst](#orelsefirst)
  - [orLeft](#orleft)
  - [refineOrElse](#refineorelse)
  - [swap](#swap)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReaderEither](#asksreadereither)
  - [fromPredicateOrElse](#frompredicateorelse)
  - [fromRefinementOrElse](#fromrefinementorelse)
  - [left](#left)
  - [leftReader](#leftreader)
  - [right](#right)
  - [rightReader](#rightreader)
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
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Bifunctor](#bifunctor-1)
  - [Chain](#chain-1)
  - [FromEither](#fromeither)
  - [FromReader](#fromreader)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [getAltReaderValidation](#getaltreadervalidation)
  - [getApplicativeReaderValidation](#getapplicativereadervalidation)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
- [interop](#interop)
  - [toUnion](#tounion)
- [model](#model)
  - [ReaderEither (interface)](#readereither-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromOption](#fromoption)
  - [fromReader](#fromreader)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bracket](#bracket)
  - [let](#let)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [tupled](#tupled)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <R2, E2, B>(
  second: () => ReaderEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2, B | A>
```

Added in v3.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R2, E2, A>(
  fa: ReaderEither<R2, E2, A>
) => <R1, E1, B>(fab: ReaderEither<R1, E1, (a: A) => B>) => ReaderEither<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

# Bifunctor

## bimap

Map a pair of functions over the two last type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fea: ReaderEither<R, E, A>) => ReaderEither<R, G, B>
```

Added in v3.0.0

## mapLeft

Map a function over the second type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fea: ReaderEither<R, E, A>) => ReaderEither<R, G, A>
```

Added in v3.0.0

# Chain

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v3.0.0

# HKT

## ReaderEitherF (interface)

**Signature**

```ts
export interface ReaderEitherF extends HKT {
  readonly type: ReaderEither<this['Contravariant1'], this['Covariant2'], this['Covariant1']>
}
```

Added in v3.0.0

## ReaderEitherFFixedE (interface)

**Signature**

```ts
export interface ReaderEitherFFixedE<E> extends HKT {
  readonly type: ReaderEither<this['Contravariant1'], E, this['Covariant1']>
}
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, R = unknown, E = never>(a: A) => ReaderEither<R, E, A>
```

Added in v3.0.0

# combinators

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <A, E2, B>(
  f: (a: A) => EitherModule.Either<E2, B>
) => <R, E1>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E2 | E1, B>
```

Added in v3.0.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <A, E2, B>(
  f: (a: A) => EitherModule.Either<E2, B>
) => <R, E1>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E2 | E1, A>
```

Added in v3.0.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: <A, R2, B>(
  f: (a: A) => ReaderModule.Reader<R2, B>
) => <R1, E = never>(ma: ReaderEither<R1, E, A>) => ReaderEither<R1 & R2, E, A>
```

Added in v3.0.0

## chainOptionKOrElse

**Signature**

```ts
export declare const chainOptionKOrElse: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v3.0.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R2, B>(
  f: (a: A) => ReaderModule.Reader<R2, B>
) => <R1, E = never>(ma: ReaderEither<R1, E, A>) => ReaderEither<R1 & R2, E, B>
```

Added in v3.0.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: <B extends A, E2, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E2
) => <R, E1>(mb: ReaderEither<R, E1, B>) => ReaderEither<R, E2 | E1, B>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, E, B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => EitherModule.Either<E, B>
) => <R = unknown>(...a: A) => ReaderEither<R, E, B>
```

Added in v3.0.0

## fromOptionKOrElse

**Signature**

```ts
export declare const fromOptionKOrElse: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => <R = unknown>(...a: A) => ReaderEither<R, E, B>
```

Added in v3.0.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => ReaderModule.Reader<R, B>
) => <E = never>(...a: A) => ReaderEither<R, E, B>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <E, A>(ma: ReaderEither<R1, E, A>) => ReaderEither<R2, E, A>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderEither<R1, E2, B>
) => <R2, A>(ma: ReaderEither<R2, E1, A>) => ReaderEither<R1 & R2, E2, B | A>
```

Added in v3.0.0

## orElseFirst

**Signature**

```ts
export declare const orElseFirst: <E1, R2, E2, B>(
  onLeft: (e: E1) => ReaderEither<R2, E2, B>
) => <R1, A>(ma: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

## orLeft

**Signature**

```ts
export declare const orLeft: <E1, R, E2>(
  onLeft: (e: E1) => ReaderModule.Reader<R, E2>
) => <A>(fa: ReaderEither<R, E1, A>) => ReaderEither<R, E2, A>
```

Added in v3.0.0

## refineOrElse

**Signature**

```ts
export declare const refineOrElse: <C extends A, B extends A, E2, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E2
) => <R, E1>(ma: ReaderEither<R, E1, C>) => ReaderEither<R, E2 | E1, B>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E>
```

Added in v3.0.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R, E = never>() => ReaderEither<R, E, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderEither`.

**Signature**

```ts
export declare const asks: <R, A, E = never>(f: (r: R) => A) => ReaderEither<R, E, A>
```

Added in v3.0.0

## asksReaderEither

**Signature**

```ts
export declare const asksReaderEither: <R1, R2, E, A>(
  f: (r1: R1) => ReaderEither<R2, E, A>
) => ReaderEither<R1 & R2, E, A>
```

Added in v3.0.0

## fromPredicateOrElse

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicateOrElse: <B extends A, E, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E
) => <R = unknown>(b: B) => ReaderEither<R, E, B>
```

Added in v3.0.0

## fromRefinementOrElse

**Signature**

```ts
export declare const fromRefinementOrElse: <C extends A, B extends A, E, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E
) => <R = unknown>(c: C) => ReaderEither<R, E, B>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E, R = unknown, A = never>(e: E) => ReaderEither<R, E, A>
```

Added in v3.0.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E, A = never>(me: ReaderModule.Reader<R, E>) => ReaderEither<R, E, A>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A, R = unknown, E = never>(a: A) => ReaderEither<R, E, A>
```

Added in v3.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, A, E = never>(ma: ReaderModule.Reader<R, A>) => ReaderEither<R, E, A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <R2, E2, B>(
  second: ReaderEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <R2, E2, B>(
  second: ReaderEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(first: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderEither<R1, E1, ReaderEither<R2, E2, A>>
) => ReaderEither<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

# destructors

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, B>(
  onLeft: (e: E) => B
) => <R, A>(ma: ReaderEither<R, E, A>) => ReaderModule.Reader<R, B | A>
```

Added in v3.0.0

## getOrElseE

**Signature**

```ts
export declare const getOrElseE: <E, R2, B>(
  onLeft: (e: E) => ReaderModule.Reader<R2, B>
) => <R1, A>(ma: ReaderEither<R1, E, A>) => ReaderModule.Reader<R1 & R2, B | A>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => <R>(ma: ReaderModule.Reader<R, EitherModule.Either<E, A>>) => ReaderModule.Reader<R, B | C>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare const matchE: <E, R2, B, A, R3, C = B>(
  onLeft: (e: E) => ReaderModule.Reader<R2, B>,
  onRight: (a: A) => ReaderModule.Reader<R3, C>
) => <R1>(ma: ReaderModule.Reader<R1, EitherModule.Either<E, A>>) => ReaderModule.Reader<R1 & R2 & R3, B | C>
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: AltModule.Alt<ReaderEitherF>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: ApplicativeModule.Applicative<ReaderEitherF>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: ApplyModule.Apply<ReaderEitherF>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: BifunctorModule.Bifunctor<ReaderEitherF>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: ChainModule.Chain<ReaderEitherF>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEitherModule.FromEither<ReaderEitherF>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: FromReaderModule.FromReader<ReaderEitherF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: FunctorModule.Functor<ReaderEitherF>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: MonadModule.Monad<ReaderEitherF>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: PointedModule.Pointed<ReaderEitherF>
```

Added in v3.0.0

## getAltReaderValidation

The default [`Alt`](#alt) instance returns the last error, if you want to
get all errors you need to provide an way to concatenate them via a `Semigroup`.

See [`getAltValidation`](./Either.ts.html#getaltvalidation).

**Signature**

```ts
export declare const getAltReaderValidation: <E>(S: Semigroup<E>) => AltModule.Alt<ReaderEitherFFixedE<E>>
```

Added in v3.0.0

## getApplicativeReaderValidation

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide an way to concatenate them via a `Semigroup`.

See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).

**Signature**

```ts
export declare const getApplicativeReaderValidation: <E>(
  S: Semigroup<E>
) => ApplicativeModule.Applicative<ReaderEitherFFixedE<E>>
```

Added in v3.0.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => CompactableModule.Compactable<ReaderEitherFFixedE<E>>
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(M: Monoid<E>) => FilterableModule.Filterable<ReaderEitherFFixedE<E>>
```

Added in v3.0.0

# interop

## toUnion

**Signature**

```ts
export declare const toUnion: <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderModule.Reader<R, E | A>
```

Added in v3.0.0

# model

## ReaderEither (interface)

**Signature**

```ts
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}
```

Added in v3.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A, R = unknown>(fa: EitherModule.Either<E, A>) => ReaderEither<R, E, A>
```

Added in v3.0.0

## fromOption

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A, R = unknown>(fa: Option<A>) => ReaderEither<R, E, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A, E = never>(fa: ReaderModule.Reader<R, A>) => ReaderEither<R, E, A>
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: ReaderEither<unknown, never, readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: ReaderEither<unknown, never, {}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <R2, E2, B>(
  fb: ReaderEither<R2, E2, B>
) => <R1, E1, A extends readonly unknown[]>(
  fas: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => ReaderEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export declare const bracket: <R, E, A, B>(
  aquire: ReaderEither<R, E, A>,
  use: (a: A) => ReaderEither<R, E, B>,
  release: (a: A, e: EitherModule.Either<E, B>) => ReaderEither<R, E, void>
) => ReaderEither<R, E, B>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  fa: ReaderEither<R, E, A>
) => ReaderEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, E, A>(
  arr: readonly ReaderEither<R, E, A>[]
) => ReaderEither<R, E, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (as: readonly A[]) => ReaderEither<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderEither<R, E, B>
) => (as: readonly A[]) => ReaderEither<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderEither<R, E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderEither<R, E, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderEither<R, E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, readonly [A]>
```

Added in v3.0.0
