---
title: ReaderEither.ts
nav_order: 71
parent: Modules
---

## ReaderEither overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Chain](#chain)
  - [chain](#chain)
  - [chainW](#chainw)
- [Functor](#functor)
  - [map](#map)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainFirstReaderKW](#chainfirstreaderkw)
  - [chainFirstW](#chainfirstw)
  - [chainOptionK](#chainoptionk)
  - [chainReaderK](#chainreaderk)
  - [chainReaderKW](#chainreaderkw)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
  - [flap](#flap)
  - [flattenW](#flattenw)
  - [fromEitherK](#fromeitherk)
  - [fromOptionK](#fromoptionk)
  - [fromReaderK](#fromreaderk)
  - [local](#local)
  - [orElse](#orelse)
  - [orElseFirst](#orelsefirst)
  - [orElseFirstW](#orelsefirstw)
  - [orElseW](#orelsew)
  - [orLeft](#orleft)
  - [swap](#swap)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReaderEither](#asksreadereither)
  - [asksReaderEitherW](#asksreadereitherw)
  - [fromPredicate](#frompredicate)
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
  - [getOrElseEW](#getorelseew)
  - [getOrElseW](#getorelsew)
  - [match](#match)
  - [matchE](#matche)
  - [matchEW](#matchew)
  - [matchW](#matchw)
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
  - [URI (type alias)](#uri-type-alias)
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
  - [apSW](#apsw)
  - [apT](#apt)
  - [apTW](#aptw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [bracket](#bracket)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [tupled](#tupled)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <R, E, A>(
  second: Lazy<ReaderEither<R, E, A>>
) => (first: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v3.0.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <R2, E2, B>(
  second: () => ReaderEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2, B | A>
```

Added in v3.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R, E, A>(
  fa: ReaderEither<R, E, A>
) => <B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B>
```

Added in v3.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <R2, E2, A>(
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
export declare const chain: <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v3.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <A, R2, E2, B>(
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

# Pointed

## of

**Signature**

```ts
export declare const of: <A, R, E = never>(a: A) => ReaderEither<R, E, A>
```

Added in v3.0.0

# combinators

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v3.0.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chainEitherK).

**Signature**

```ts
export declare const chainEitherKW: <E2, A, B>(
  f: (a: A) => E.Either<E2, B>
) => <R, E1>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E2 | E1, B>
```

Added in v3.0.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <E = never>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v3.0.0

## chainFirstReaderKW

Less strict version of [`chainReaderK`](#chainReaderK).

**Signature**

```ts
export declare const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2, E = never>(ma: ReaderEither<R2, E, A>) => ReaderEither<R1 & R2, E, A>
```

Added in v3.0.0

## chainFirstW

Less strict version of [`chainFirst`](#chainFirst)

**Signature**

```ts
export declare const chainFirstW: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(first: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v3.0.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <E = never>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v3.0.0

## chainReaderKW

Less strict version of [`chainReaderK`](#chainReaderK).

**Signature**

```ts
export declare const chainReaderKW: <A, R2, B>(
  f: (a: A) => R.Reader<R2, B>
) => <R1, E = never>(ma: ReaderEither<R1, E, A>) => ReaderEither<R1 & R2, E, B>
```

Added in v3.0.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: <A, P, E>(
  refinement: P,
  onFalse: (a: P extends (a: any) => a is infer B ? Exclude<A, B> : A) => E
) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, P extends (a: any) => a is infer B ? B : A>
```

Added in v3.0.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterOrElse).

**Signature**

```ts
export declare const filterOrElseW: <A, P extends Predicate<A>, E2>(
  refinement: P,
  onFalse: (a: P extends (a: any) => a is infer B ? Exclude<A, B> : A) => E2
) => <R, E1>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E2 | E1, P extends (a: any) => a is infer B ? B : A>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, E, B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B>
```

Added in v3.0.0

## flattenW

Less strict version of [`flatten`](#flatten).

**Signature**

```ts
export declare const flattenW: <R1, R2, E1, E2, A>(
  mma: ReaderEither<R1, E1, ReaderEither<R2, E2, A>>
) => ReaderEither<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A, E, B>(f: (...a: A) => E.Either<E, B>) => <R>(...a: A) => ReaderEither<R, E, B>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (...a: A) => Option<B>) => <R>(...a: A) => ReaderEither<R, E, B>
```

Added in v3.0.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => R.Reader<R, B>
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
export declare const orElse: <E1, R, E2, A>(
  onLeft: (e: E1) => ReaderEither<R, E2, A>
) => (ma: ReaderEither<R, E1, A>) => ReaderEither<R, E2, A>
```

Added in v3.0.0

## orElseFirst

**Signature**

```ts
export declare const orElseFirst: <E, R, B>(
  onLeft: (e: E) => ReaderEither<R, E, B>
) => <A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v3.0.0

## orElseFirstW

**Signature**

```ts
export declare const orElseFirstW: <E1, R, E2, B>(
  onLeft: (e: E1) => ReaderEither<R, E2, B>
) => <A>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E1 | E2, A>
```

Added in v3.0.0

## orElseW

Less strict version of [`orElse`](#orElse).

**Signature**

```ts
export declare const orElseW: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderEither<R1, E2, B>
) => <R2, A>(ma: ReaderEither<R2, E1, A>) => ReaderEither<R1 & R2, E2, B | A>
```

Added in v3.0.0

## orLeft

**Signature**

```ts
export declare const orLeft: <E1, R, E2>(
  onLeft: (e: E1) => R.Reader<R, E2>
) => <A>(fa: ReaderEither<R, E1, A>) => ReaderEither<R, E2, A>
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
export declare const asksReaderEither: <R, E, A>(f: (r: R) => ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v3.0.0

## asksReaderEitherW

Less strict version of [`asksReaderEitherK`](#asksreadereitherk).

**Signature**

```ts
export declare const asksReaderEitherW: <R1, R2, E, A>(
  f: (r1: R1) => ReaderEither<R2, E, A>
) => ReaderEither<R1 & R2, E, A>
```

Added in v3.0.0

## fromPredicate

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicate: {
  <A, B>(refinement: Refinement<A, B>): <R>(a: A) => ReaderEither<R, Exclude<A, B>, B>
  <A>(predicate: Predicate<A>): <R, B>(b: B) => ReaderEither<R, B, B>
  <A>(predicate: Predicate<A>): <R>(a: A) => ReaderEither<R, A, A>
}
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E, R, A = never>(e: E) => ReaderEither<R, E, A>
```

Added in v3.0.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E, A = never>(me: R.Reader<R, E>) => ReaderEither<R, E, A>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A, R, E = never>(a: A) => ReaderEither<R, E, A>
```

Added in v3.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, A, E = never>(ma: R.Reader<R, A>) => ReaderEither<R, E, A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <R, E, B>(
  second: ReaderEither<R, E, B>
) => <A>(first: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <R, E, B>(
  second: ReaderEither<R, E, B>
) => <A>(first: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (first: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v3.0.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <R, E, A>(mma: ReaderEither<R, E, ReaderEither<R, E, A>>) => ReaderEither<R, E, A>
```

Added in v3.0.0

# destructors

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, A>(onLeft: (e: E) => A) => <R>(ma: ReaderEither<R, E, A>) => R.Reader<R, A>
```

Added in v3.0.0

## getOrElseE

**Signature**

```ts
export declare const getOrElseE: <E, R, A>(
  onLeft: (e: E) => R.Reader<R, A>
) => (ma: ReaderEither<R, E, A>) => R.Reader<R, A>
```

Added in v3.0.0

## getOrElseEW

Less strict version of [`getOrElseE`](#getOrElseE).

**Signature**

```ts
export declare const getOrElseEW: <E, R2, B>(
  onLeft: (e: E) => R.Reader<R2, B>
) => <R1, A>(ma: ReaderEither<R1, E, A>) => R.Reader<R1 & R2, B | A>
```

Added in v3.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getOrElse).

**Signature**

```ts
export declare const getOrElseW: <E, B>(onLeft: (e: E) => B) => <R, A>(ma: ReaderEither<R, E, A>) => R.Reader<R, B | A>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => <R>(ma: ReaderEither<R, E, A>) => R.Reader<R, B>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare const matchE: <E, R, B, A>(
  onLeft: (e: E) => R.Reader<R, B>,
  onRight: (a: A) => R.Reader<R, B>
) => (ma: ReaderEither<R, E, A>) => R.Reader<R, B>
```

Added in v3.0.0

## matchEW

Less strict version of [`matchE`](#matchE).

**Signature**

```ts
export declare const matchEW: <E, R2, B, A, R3, C>(
  onLeft: (e: E) => R.Reader<R2, B>,
  onRight: (a: A) => R.Reader<R3, C>
) => <R1>(ma: R.Reader<R1, E.Either<E, A>>) => R.Reader<R1 & R2 & R3, B | C>
```

Added in v3.0.0

## matchW

Less strict version of [`match`](#match).

**Signature**

```ts
export declare const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => <R>(ma: R.Reader<R, E.Either<E, A>>) => R.Reader<R, B | C>
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt3<'ReaderEither'>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative3<'ReaderEither'>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: Apply3<'ReaderEither'>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor3<'ReaderEither'>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: Chain3<'ReaderEither'>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither3<'ReaderEither'>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: FromReader3<'ReaderEither'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor3<'ReaderEither'>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad3<'ReaderEither'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed3<'ReaderEither'>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'ReaderEither'
```

Added in v3.0.0

## getAltReaderValidation

**Signature**

```ts
export declare const getAltReaderValidation: <E>(S: Semigroup<E>) => Alt3C<'ReaderEither', E>
```

Added in v3.0.0

## getApplicativeReaderValidation

**Signature**

```ts
export declare const getApplicativeReaderValidation: <E>(S: Semigroup<E>) => Applicative3C<'ReaderEither', E>
```

Added in v3.0.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => Compactable3C<'ReaderEither', E>
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(M: Monoid<E>) => Filterable3C<'ReaderEither', E>
```

Added in v3.0.0

# interop

## toUnion

**Signature**

```ts
export declare const toUnion: <R, E, A>(fa: ReaderEither<R, E, A>) => R.Reader<R, E | A>
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
export declare const fromEither: NaturalTransformation23<'Either', 'ReaderEither'>
```

Added in v3.0.0

## fromOption

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => NaturalTransformation13C<'Option', 'ReaderEither', E>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: NaturalTransformation23R<'Reader', 'ReaderEither'>
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
export declare const apS: <N, A, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderEither<R, E, B>
) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apSW

Less strict version of [`apS`](#apS).

**Signature**

```ts
export declare const apSW: <A, N extends string, R2, E2, B>(
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
export declare const apT: <R, E, B>(
  fb: ReaderEither<R, E, B>
) => <A>(fas: ReaderEither<R, E, A>) => ReaderEither<R, E, readonly [...A, B]>
```

Added in v3.0.0

## apTW

Less strict version of [`apT`](#apT).

**Signature**

```ts
export declare const apTW: <R2, E2, B>(
  fb: ReaderEither<R2, E2, B>
) => <R1, E1, A extends readonly unknown[]>(
  fas: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(
  name: N
) => <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## bindW

Less strict version of [`bind`](#bind).

**Signature**

```ts
export declare const bindW: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
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
  release: (a: A, e: E.Either<E, B>) => ReaderEither<R, E, void>
) => ReaderEither<R, E, B>
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

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

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
