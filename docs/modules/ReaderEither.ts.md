---
title: ReaderEither.ts
nav_order: 79
parent: Modules
---

## ReaderEither overview

Added in v2.0.0

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
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [MonadThrow](#monadthrow)
  - [throwError](#throwerror)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apFirstW](#apfirstw)
  - [apSecond](#apsecond)
  - [apSecondW](#apsecondw)
  - [asksReaderEither](#asksreadereither)
  - [asksReaderEitherW](#asksreadereitherw)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirst](#chainfirst)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstEitherKW](#chainfirsteitherkw)
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainFirstReaderKW](#chainfirstreaderkw)
  - [chainFirstW](#chainfirstw)
  - [chainOptionK](#chainoptionk)
  - [chainReaderK](#chainreaderk)
  - [chainReaderKW](#chainreaderkw)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
  - [flap](#flap)
  - [flatten](#flatten)
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
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [leftReader](#leftreader)
  - [right](#right)
  - [rightReader](#rightreader)
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
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Bifunctor](#bifunctor-1)
  - [Chain](#chain)
  - [FromEither](#fromeither)
  - [FromReader](#fromreader)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [MonadThrow](#monadthrow-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getAltReaderValidation](#getaltreadervalidation)
  - [getApplicativeReaderValidation](#getapplicativereadervalidation)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
  - [~~getApplyMonoid~~](#getapplymonoid)
  - [~~getApplySemigroup~~](#getapplysemigroup)
  - [~~getReaderValidation~~](#getreadervalidation)
  - [~~getSemigroup~~](#getsemigroup)
  - [~~readerEither~~](#readereither)
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
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [let](#let)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <R, E, A>(
  that: () => ReaderEither<R, E, A>
) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## altW

Less strict version of [`alt`](#alt).

The `W` suffix (short for **W**idening) means that the environment, the error and the return types will be merged.

**Signature**

```ts
export declare const altW: <R2, E2, B>(
  that: () => ReaderEither<R2, E2, B>
) => <R1, E1, A>(fa: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2, B | A>
```

Added in v2.9.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R, E, A>(
  fa: ReaderEither<R, E, A>
) => <B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B>
```

Added in v2.0.0

## apW

Less strict version of [`ap`](#ap).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const apW: <R2, E2, A>(
  fa: ReaderEither<R2, E2, A>
) => <R1, E1, B>(fab: ReaderEither<R1, E1, (a: A) => B>) => ReaderEither<R1 & R2, E2 | E1, B>
```

Added in v2.8.0

# Bifunctor

## bimap

Map a pair of functions over the two last type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, B>
```

Added in v2.0.0

## mapLeft

Map a function over the second type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, A>
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

## chainW

Less strict version of [`chain`](#chain).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainW: <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, B>
```

Added in v2.6.0

# MonadThrow

## throwError

**Signature**

```ts
export declare const throwError: <R, E, A>(e: E) => ReaderEither<R, E, A>
```

Added in v2.7.0

# Pointed

## of

**Signature**

```ts
export declare const of: <R = unknown, E = never, A = never>(a: A) => ReaderEither<R, E, A>
```

Added in v2.8.5

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <R, E, B>(
  second: ReaderEither<R, E, B>
) => <A>(first: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## apFirstW

Less strict version of [`apFirst`](#apfirst)

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const apFirstW: <R2, E2, B>(
  second: ReaderEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, A>
```

Added in v2.12.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <R, E, B>(
  second: ReaderEither<R, E, B>
) => <A>(first: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

## apSecondW

Less strict version of [`apSecond`](#apsecond)

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const apSecondW: <R2, E2, B>(
  second: ReaderEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, B>
```

Added in v2.12.0

## asksReaderEither

Effectfully accesses the environment.

**Signature**

```ts
export declare const asksReaderEither: <R, E, A>(f: (r: R) => ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.11.0

## asksReaderEitherW

Less strict version of [`asksReaderEither`](#asksreadereither).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const asksReaderEitherW: <R1, R2, E, A>(
  f: (r1: R1) => ReaderEither<R2, E, A>
) => ReaderEither<R1 & R2, E, A>
```

Added in v2.11.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.4.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chaineitherk).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const chainEitherKW: <E2, A, B>(
  f: (a: A) => E.Either<E2, B>
) => <R, E1>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E2 | E1, B>
```

Added in v2.6.1

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.12.0

## chainFirstEitherKW

Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const chainFirstEitherKW: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <R, E1>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E2 | E1, A>
```

Added in v2.12.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <E>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.11.0

## chainFirstReaderKW

Less strict version of [`chainReaderK`](#chainreaderk).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2, E>(ma: ReaderEither<R2, E, A>) => ReaderEither<R1 & R2, E, A>
```

Added in v2.11.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst)

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, A>
```

Added in v2.8.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.10.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <E>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.11.0

## chainReaderKW

Less strict version of [`chainReaderK`](#chainreaderk).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const chainReaderKW: <A, R2, B>(
  f: (a: A) => R.Reader<R2, B>
) => <R1, E>(ma: ReaderEither<R1, E, A>) => ReaderEither<R1 & R2, E, B>
```

Added in v2.11.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderEither<R, E, A>
  ) => ReaderEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(
    mb: ReaderEither<R, E, B>
  ) => ReaderEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
}
```

Added in v2.0.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterorelse).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderEither<R, E1, A>
  ) => ReaderEither<R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1, B extends A>(
    mb: ReaderEither<R, E1, B>
  ) => ReaderEither<R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderEither<R, E1, A>
  ) => ReaderEither<R, E2 | E1, A>
}
```

Added in v2.9.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, E, B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B>
```

Added in v2.10.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <R, E, A>(mma: ReaderEither<R, E, ReaderEither<R, E, A>>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## flattenW

Less strict version of [`flatten`](#flatten).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const flattenW: <R1, R2, E1, E2, A>(
  mma: ReaderEither<R1, E1, ReaderEither<R2, E2, A>>
) => ReaderEither<R1 & R2, E1 | E2, A>
```

Added in v2.11.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => E.Either<E, B>
) => <R = unknown>(...a: A) => ReaderEither<R, E, B>
```

Added in v2.4.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => <R = unknown>(...a: A) => ReaderEither<R, E, B>
```

Added in v2.10.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => R.Reader<R, B>
) => <E = never>(...a: A) => ReaderEither<R, E, B>
```

Added in v2.11.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <E, A>(ma: ReaderEither<R1, E, A>) => ReaderEither<R2, E, A>
```

Added in v2.0.0

## orElse

**Signature**

```ts
export declare const orElse: <E1, R, E2, A>(
  onLeft: (e: E1) => ReaderEither<R, E2, A>
) => (ma: ReaderEither<R, E1, A>) => ReaderEither<R, E2, A>
```

Added in v2.0.0

## orElseFirst

**Signature**

```ts
export declare const orElseFirst: <E, R, B>(
  onLeft: (e: E) => ReaderEither<R, E, B>
) => <A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.11.0

## orElseFirstW

The `W` suffix (short for **W**idening) means that the environment types and the return types will be merged.

**Signature**

```ts
export declare const orElseFirstW: <E1, R2, E2, B>(
  onLeft: (e: E1) => ReaderEither<R2, E2, B>
) => <R1, A>(ma: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, A>
```

Added in v2.11.0

## orElseW

Less strict version of [`orElse`](#orelse).

The `W` suffix (short for **W**idening) means that the environment types and the return types will be merged.

**Signature**

```ts
export declare const orElseW: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderEither<R1, E2, B>
) => <R2, A>(ma: ReaderEither<R2, E1, A>) => ReaderEither<R1 & R2, E2, B | A>
```

Added in v2.10.0

## orLeft

**Signature**

```ts
export declare const orLeft: <E1, R, E2>(
  onLeft: (e: E1) => R.Reader<R, E2>
) => <A>(fa: ReaderEither<R, E1, A>) => ReaderEither<R, E2, A>
```

Added in v2.11.0

## swap

**Signature**

```ts
export declare const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E>
```

Added in v2.0.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R, E = never>() => ReaderEither<R, E, R>
```

Added in v2.0.0

## asks

Projects a value from the global context in a `ReaderEither`.

**Signature**

```ts
export declare const asks: <R, A, E = never>(f: (r: R) => A) => ReaderEither<R, E, A>
```

Added in v2.0.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R = unknown>(a: A) => ReaderEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R = unknown, B extends A = A>(b: B) => ReaderEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R = unknown>(a: A) => ReaderEither<R, E, A>
}
```

Added in v2.0.0

## left

**Signature**

```ts
export declare const left: <R, E = never, A = never>(e: E) => ReaderEither<R, E, A>
```

Added in v2.0.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E = never, A = never>(me: R.Reader<R, E>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## right

**Signature**

```ts
export declare const right: <R, E = never, A = never>(a: A) => ReaderEither<R, E, A>
```

Added in v2.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, E = never, A = never>(ma: R.Reader<R, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# destructors

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: <R, E, A, B>(
  onLeft: (e: E) => R.Reader<R, B>,
  onRight: (a: A) => R.Reader<R, B>
) => (ma: ReaderEither<R, E, A>) => R.Reader<R, B>
```

Added in v2.0.0

## foldW

Alias of [`matchEW`](#matchew).

**Signature**

```ts
export declare const foldW: <E, R2, B, A, R3, C>(
  onLeft: (e: E) => R.Reader<R2, B>,
  onRight: (a: A) => R.Reader<R3, C>
) => <R1>(ma: ReaderEither<R1, E, A>) => R.Reader<R1 & R2 & R3, B | C>
```

Added in v2.10.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, R, A>(
  onLeft: (e: E) => R.Reader<R, A>
) => (ma: ReaderEither<R, E, A>) => R.Reader<R, A>
```

Added in v2.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

The `W` suffix (short for **W**idening) means that the handler return type will be merged.

**Signature**

```ts
export declare const getOrElseW: <R2, E, B>(
  onLeft: (e: E) => R.Reader<R2, B>
) => <R1, A>(ma: ReaderEither<R1, E, A>) => R.Reader<R1 & R2, B | A>
```

Added in v2.6.0

## match

**Signature**

```ts
export declare const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => <R>(ma: ReaderEither<R, E, A>) => R.Reader<R, B>
```

Added in v2.10.0

## matchE

The `E` suffix (short for **E**ffect) means that the handlers return an effect (`Reader`).

**Signature**

```ts
export declare const matchE: <R, E, A, B>(
  onLeft: (e: E) => R.Reader<R, B>,
  onRight: (a: A) => R.Reader<R, B>
) => (ma: ReaderEither<R, E, A>) => R.Reader<R, B>
```

Added in v2.10.0

## matchEW

Less strict version of [`matchE`](#matche).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchEW: <E, R2, B, A, R3, C>(
  onLeft: (e: E) => R.Reader<R2, B>,
  onRight: (a: A) => R.Reader<R3, C>
) => <R1>(ma: ReaderEither<R1, E, A>) => R.Reader<R1 & R2 & R3, B | C>
```

Added in v2.10.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => <R>(ma: R.Reader<R, E.Either<E, A>>) => R.Reader<R, B | C>
```

Added in v2.10.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt3<'ReaderEither'>
```

Added in v2.7.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative3<'ReaderEither'>
```

Added in v2.7.0

## Apply

**Signature**

```ts
export declare const Apply: Apply3<'ReaderEither'>
```

Added in v2.10.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor3<'ReaderEither'>
```

Added in v2.7.0

## Chain

**Signature**

```ts
export declare const Chain: Chain3<'ReaderEither'>
```

Added in v2.10.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither3<'ReaderEither'>
```

Added in v2.10.0

## FromReader

**Signature**

```ts
export declare const FromReader: FromReader3<'ReaderEither'>
```

Added in v2.11.0

## Functor

**Signature**

```ts
export declare const Functor: Functor3<'ReaderEither'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad3<'ReaderEither'>
```

Added in v2.7.0

## MonadThrow

**Signature**

```ts
export declare const MonadThrow: MonadThrow3<'ReaderEither'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed3<'ReaderEither'>
```

Added in v2.10.0

## URI

**Signature**

```ts
export declare const URI: 'ReaderEither'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## getAltReaderValidation

The default [`Alt`](#alt) instance returns the last error, if you want to
get all errors you need to provide a way to concatenate them via a `Semigroup`.

See [`getAltValidation`](./Either.ts.html#getaltvalidation).

**Signature**

```ts
export declare function getAltReaderValidation<E>(S: Semigroup<E>): Alt3C<URI, E>
```

Added in v2.7.0

## getApplicativeReaderValidation

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide a way to concatenate them via a `Semigroup`.

See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).

**Signature**

```ts
export declare function getApplicativeReaderValidation<E>(S: Semigroup<E>): Applicative3C<URI, E>
```

Added in v2.7.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => Compactable3C<'ReaderEither', E>
```

Added in v2.10.0

## getFilterable

**Signature**

```ts
export declare function getFilterable<E>(M: Monoid<E>): Filterable3C<URI, E>
```

Added in v2.10.0

## ~~getApplyMonoid~~

Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.

**Signature**

```ts
export declare const getApplyMonoid: <R, E, A>(M: Monoid<A>) => Monoid<ReaderEither<R, E, A>>
```

Added in v2.0.0

## ~~getApplySemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getApplySemigroup: <R, E, A>(S: Semigroup<A>) => Semigroup<ReaderEither<R, E, A>>
```

Added in v2.0.0

## ~~getReaderValidation~~

Use [`getApplicativeReaderValidation`](#getapplicativereadervalidation) and [`getAltReaderValidation`](#getaltreadervalidation) instead.

**Signature**

```ts
export declare function getReaderValidation<E>(
  SE: Semigroup<E>
): Monad3C<URI, E> & Bifunctor3<URI> & Alt3C<URI, E> & MonadThrow3C<URI, E>
```

Added in v2.3.0

## ~~getSemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getSemigroup: <R, E, A>(S: Semigroup<A>) => Semigroup<ReaderEither<R, E, A>>
```

Added in v2.0.0

## ~~readerEither~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `RE.Functor` instead of `RE.readerEither`
(where `R` is from `import R from 'fp-ts/ReaderEither'`)

**Signature**

```ts
export declare const readerEither: Monad3<'ReaderEither'> &
  Bifunctor3<'ReaderEither'> &
  Alt3<'ReaderEither'> &
  MonadThrow3<'ReaderEither'>
```

Added in v2.0.0

# interop

## toUnion

**Signature**

```ts
export declare const toUnion: <R, E, A>(fa: ReaderEither<R, E, A>) => R.Reader<R, E | A>
```

Added in v2.10.0

# model

## ReaderEither (interface)

**Signature**

```ts
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}
```

Added in v2.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A, R = unknown>(fa: E.Either<E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A, R = unknown>(fa: Option<A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A, E = never>(fa: R.Reader<R, A>) => ReaderEither<R, E, A>
```

Added in v2.11.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: ReaderEither<unknown, never, readonly []>
```

Added in v2.11.0

## Do

**Signature**

```ts
export declare const Do: ReaderEither<unknown, never, {}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderEither<R, E, B>
) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

Less strict version of [`apS`](#aps).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const apSW: <A, N extends string, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(
  name: N
) => <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, { readonly [K in N]: A }>
```

Added in v2.8.0

## bindW

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const bindW: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  fa: ReaderEither<R, E, A>
) => ReaderEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## sequenceArray

**Signature**

```ts
export declare const sequenceArray: <R, E, A>(arr: readonly ReaderEither<R, E, A>[]) => ReaderEither<R, E, readonly A[]>
```

Added in v2.9.0

## traverseArray

**Signature**

```ts
export declare const traverseArray: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (as: readonly A[]) => ReaderEither<R, E, readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

**Signature**

```ts
export declare const traverseArrayWithIndex: <R, E, A, B>(
  f: (index: number, a: A) => ReaderEither<R, E, B>
) => (as: readonly A[]) => ReaderEither<R, E, readonly B[]>
```

Added in v2.9.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderEither<R, E, B>
) => (as: readonly A[]) => ReaderEither<R, E, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderEither<R, E, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderEither<R, E, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0
