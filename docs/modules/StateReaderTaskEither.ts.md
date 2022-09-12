---
title: StateReaderTaskEither.ts
nav_order: 92
parent: Modules
---

## StateReaderTaskEither overview

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
  - [apFirstW](#apfirstw)
  - [apSecondW](#apsecondw)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstEitherKW](#chainfirsteitherkw)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainFirstReaderKW](#chainfirstreaderkw)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainFirstW](#chainfirstw)
  - [chainIOEitherK](#chainioeitherk)
  - [chainIOEitherKW](#chainioeitherkw)
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [chainReaderK](#chainreaderk)
  - [chainReaderKW](#chainreaderkw)
  - [chainReaderTaskEitherK](#chainreadertaskeitherk)
  - [chainReaderTaskEitherKW](#chainreadertaskeitherkw)
  - [chainStateK](#chainstatek)
  - [chainTaskEitherK](#chaintaskeitherk)
  - [chainTaskEitherKW](#chaintaskeitherkw)
  - [chainTaskK](#chaintaskk)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
  - [flap](#flap)
  - [flattenW](#flattenw)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [fromReaderK](#fromreaderk)
  - [fromReaderTaskEitherK](#fromreadertaskeitherk)
  - [fromStateK](#fromstatek)
  - [fromTaskEitherK](#fromtaskeitherk)
  - [fromTaskK](#fromtaskk)
  - [local](#local)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksStateReaderTaskEither](#asksstatereadertaskeither)
  - [asksStateReaderTaskEitherW](#asksstatereadertaskeitherw)
  - [fromPredicate](#frompredicate)
  - [fromReaderTaskEither](#fromreadertaskeither)
  - [get](#get)
  - [gets](#gets)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftReader](#leftreader)
  - [leftState](#leftstate)
  - [leftTask](#lefttask)
  - [modify](#modify)
  - [put](#put)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightReader](#rightreader)
  - [rightState](#rightstate)
  - [rightTask](#righttask)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Bifunctor](#bifunctor-1)
  - [Chain](#chain-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [FromState](#fromstate)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [StateReaderTaskEitherF (interface)](#statereadertaskeitherf-interface)
- [model](#model)
  - [StateReaderTaskEither (interface)](#statereadertaskeither-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromReader](#fromreader)
  - [fromReaderEither](#fromreadereither)
  - [fromState](#fromstate)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
- [utils](#utils)
  - [apS](#aps)
  - [apSW](#apsw)
  - [apT](#apt)
  - [apTW](#aptw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [evaluate](#evaluate)
  - [execute](#execute)
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
export declare const alt: <S, R, E, A>(
  second: Lazy<StateReaderTaskEither<S, R, E, A>>
) => (first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <S, R2, E2, B>(
  second: () => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A>(first: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2, B | A>
```

Added in v3.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>
) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <S, R2, E2, A>(
  fa: StateReaderTaskEither<S, R2, E2, A>
) => <R1, E1, B>(fab: StateReaderTaskEither<S, R1, E1, (a: A) => B>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B>
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
) => <S, R>(fea: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, B>
```

Added in v3.0.0

## mapLeft

Map a function over the third type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(
  f: (e: E) => G
) => <S, R, A>(fea: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A>
```

Added in v3.0.0

# Chain

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, S, R, E, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(ma: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, S, R, E = never>(a: A) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

# combinators

## apFirstW

Less strict version of [`apFirst`](#apfirst).

**Signature**

```ts
export declare const apFirstW: <S, R2, E2, B>(
  second: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A>(first: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## apSecondW

Less strict version of [`apSecond`](#apsecond).

**Signature**

```ts
export declare const apSecondW: <S, R2, E2, B>(
  second: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A>(first: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chainEitherK).

**Signature**

```ts
export declare const chainEitherKW: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v3.0.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## chainFirstEitherKW

Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).

**Signature**

```ts
export declare const chainFirstEitherKW: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, A>
```

Added in v3.0.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(
  f: (a: A) => IO<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <S, E = never>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## chainFirstReaderKW

Less strict version of [`chainFirstReaderK`](#chainFirstReaderK).

**Signature**

```ts
export declare const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <S, R2, E = never>(ma: StateReaderTaskEither<S, R2, E, A>) => StateReaderTaskEither<S, R2, E, A>
```

Added in v3.0.0

## chainFirstTaskK

**Signature**

```ts
export declare const chainFirstTaskK: <A, B>(
  f: (a: A) => Task<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## chainFirstW

Less strict version of [`chainFirst`](#chainFirst).

**Signature**

```ts
export declare const chainFirstW: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(first: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainIOEitherKW

Less strict version of [`chainIOEitherK`](#chainIOEitherK).

**Signature**

```ts
export declare const chainIOEitherKW: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v3.0.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(
  f: (a: A) => IO<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(
  f: (a: A) => Option<B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <S, E = never>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainReaderKW

Less strict version of [`chainReaderK`](#chainReaderK).

**Signature**

```ts
export declare const chainReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <S, R2, E = never>(ma: StateReaderTaskEither<S, R2, E, A>) => StateReaderTaskEither<S, R1 & R2, E, B>
```

Added in v3.0.0

## chainReaderTaskEitherK

**Signature**

```ts
export declare const chainReaderTaskEitherK: <A, R, E, B>(
  f: (a: A) => RTE.ReaderTaskEither<R, E, B>
) => <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainReaderTaskEitherKW

Less strict version of [`chainReaderTaskEitherK`](#chainReaderTaskEitherK).

**Signature**

```ts
export declare const chainReaderTaskEitherKW: <A, R, E2, B>(
  f: (a: A) => RTE.ReaderTaskEither<R, E2, B>
) => <S, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v3.0.0

## chainStateK

**Signature**

```ts
export declare const chainStateK: <A, S, B>(
  f: (a: A) => State<S, B>
) => <R, E = never>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainTaskEitherK

**Signature**

```ts
export declare const chainTaskEitherK: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainTaskEitherKW

Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).

**Signature**

```ts
export declare const chainTaskEitherKW: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v3.0.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(
  f: (a: A) => Task<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R, B extends A>(
    mb: StateReaderTaskEither<S, R, E, B>
  ) => StateReaderTaskEither<S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, A>
}
```

Added in v3.0.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterOrElse).

**Signature**

```ts
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, A>
  ) => StateReaderTaskEither<S, R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, R, E1, B extends A>(
    mb: StateReaderTaskEither<S, R, E1, B>
  ) => StateReaderTaskEither<S, R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, A>
  ) => StateReaderTaskEither<S, R, E2 | E1, A>
}
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(
  a: A
) => <S, R, E, B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## flattenW

Less strict version of [`flatten`](#flatten).

**Signature**

```ts
export declare const flattenW: <S, R1, E1, R2, E2, A>(
  mma: StateReaderTaskEither<S, R1, E1, StateReaderTaskEither<S, R2, E2, A>>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => E.Either<E, B>
) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## fromIOEitherK

**Signature**

```ts
export declare const fromIOEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => IOEither<E, B>
) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => <S, R, E>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => Option<B>
) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => R.Reader<R, B>
) => <S, E = never>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## fromReaderTaskEitherK

**Signature**

```ts
export declare const fromReaderTaskEitherK: <A extends readonly unknown[], R, E, B>(
  f: (...a: A) => RTE.ReaderTaskEither<R, E, B>
) => <S>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## fromStateK

**Signature**

```ts
export declare const fromStateK: <A extends readonly unknown[], S, B>(
  f: (...a: A) => State<S, B>
) => <R, E = never>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## fromTaskEitherK

**Signature**

```ts
export declare const fromTaskEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => TaskEither<E, B>
) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => Task<B>
) => <S, R, E>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <S, E, A>(ma: StateReaderTaskEither<S, R1, E, A>) => StateReaderTaskEither<S, R2, E, A>
```

Added in v3.0.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <S, R, E = never>() => StateReaderTaskEither<S, R, E, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderEither`.

**Signature**

```ts
export declare const asks: <R, A, S, E = never>(f: (r: R) => A) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## asksStateReaderTaskEither

**Signature**

```ts
export declare const asksStateReaderTaskEither: <R, S, E, A>(
  f: (r: R) => StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## asksStateReaderTaskEitherW

Less strict version of [`asksStateReaderTaskEitherK`](#asksstatereadertaskeitherk).

**Signature**

```ts
export declare const asksStateReaderTaskEitherW: <R1, S, R2, E, A>(
  f: (r1: R1) => StateReaderTaskEither<S, R2, E, A>
) => StateReaderTaskEither<S, R1 & R2, E, A>
```

Added in v3.0.0

## fromPredicate

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R>(a: A) => StateReaderTaskEither<S, R, A, B>
  <A>(predicate: Predicate<A>): <B extends A, S, R>(b: B) => StateReaderTaskEither<S, R, A, B>
  <A>(predicate: Predicate<A>): <S, R>(a: A) => StateReaderTaskEither<S, R, A, A>
}
```

Added in v3.0.0

## fromReaderTaskEither

**Signature**

```ts
export declare const fromReaderTaskEither: <R, E, A, S>(
  fa: RTE.ReaderTaskEither<R, E, A>
) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## get

Get the current state

**Signature**

```ts
export declare const get: <S, R, E = never>() => StateReaderTaskEither<S, R, E, S>
```

Added in v3.0.0

## gets

Get a value which depends on the current state

**Signature**

```ts
export declare const gets: <S, R, E = never, A = never>(f: (s: S) => A) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E, S, R, A = never>(e: E) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E, S, R, A = never>(me: IO<E>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E, S, A = never>(me: R.Reader<R, E>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## leftState

**Signature**

```ts
export declare const leftState: <S, E, R, A = never>(me: State<S, E>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E, S, R, A = never>(me: Task<E>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## modify

Modify the state by applying a function to the current state

**Signature**

```ts
export declare const modify: <S, R, E = never>(f: Endomorphism<S>) => StateReaderTaskEither<S, R, E, void>
```

Added in v3.0.0

## put

Set the state

**Signature**

```ts
export declare const put: <S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A, S, R, E = never>(a: A) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <A, S, R, E = never>(ma: IO<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, A, S, E = never>(ma: R.Reader<R, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## rightState

**Signature**

```ts
export declare const rightState: <S, A, R, E = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## rightTask

**Signature**

```ts
export declare const rightTask: <A, S, R, E = never>(ma: Task<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <S, R, E, B>(
  second: StateReaderTaskEither<S, R, E, B>
) => <A>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <S, R, E, B>(
  second: StateReaderTaskEither<S, R, E, B>
) => <A>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, S, R, E, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <S, R, E, A>(
  mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt_<StateReaderTaskEitherF>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative_<StateReaderTaskEitherF>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: Apply_<StateReaderTaskEitherF>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor_<StateReaderTaskEitherF>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: Chain_<StateReaderTaskEitherF>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither_<StateReaderTaskEitherF>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO_<StateReaderTaskEitherF>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: FromReader_<StateReaderTaskEitherF>
```

Added in v3.0.0

## FromState

**Signature**

```ts
export declare const FromState: FromState_<StateReaderTaskEitherF>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask_<StateReaderTaskEitherF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor_<StateReaderTaskEitherF>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad_<StateReaderTaskEitherF>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed_<StateReaderTaskEitherF>
```

Added in v3.0.0

## StateReaderTaskEitherF (interface)

**Signature**

```ts
export interface StateReaderTaskEitherF extends HKT {
  readonly type: StateReaderTaskEither<this['S'], this['R'], this['E'], this['A']>
}
```

Added in v3.0.0

# model

## StateReaderTaskEither (interface)

**Signature**

```ts
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, readonly [A, S]>
}
```

Added in v3.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A, S, R>(fa: E.Either<E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A, S, R, E>(fa: IO<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A, S, R>(fa: IOEither<E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromOption

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A, S, R>(fa: Option<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A, S, E>(fa: R.Reader<R, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromReaderEither

**Signature**

```ts
export declare const fromReaderEither: <R, E, A, S>(fa: ReaderEither<R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromState

**Signature**

```ts
export declare const fromState: <S, A, R, E>(fa: State<S, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A, S, R, E>(fa: Task<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <E, A, S, R>(fa: TaskEither<E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

# utils

## apS

**Signature**

```ts
export declare const apS: <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R, E, B>
) => (
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apSW

Less strict version of [`apS`](#apS).

**Signature**

```ts
export declare const apSW: <N extends string, A, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <S, R, E, B>(
  fb: StateReaderTaskEither<S, R, E, B>
) => <A extends readonly unknown[]>(
  fas: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, readonly [...A, B]>
```

Added in v3.0.0

## apTW

Less strict version of [`apT`](#apT).

**Signature**

```ts
export declare const apTW: <S, R2, E2, B>(
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A extends readonly unknown[]>(
  fas: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => StateReaderTaskEither<S, R, E, B>
) => (
  ma: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <S, R, E, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## bindW

Less strict version of [`bind`](#bind).

**Signature**

```ts
export declare const bindW: <N extends string, A, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## evaluate

Run a computation in the `StateReaderTaskEither` monad, discarding the final state

**Signature**

```ts
export declare const evaluate: <S>(
  s: S
) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => RTE.ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## execute

Run a computation in the `StateReaderTaskEither` monad discarding the result

**Signature**

```ts
export declare const execute: <S>(
  s: S
) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => RTE.ReaderTaskEither<R, E, S>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, S, R, E, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
) => (as: readonly A[]) => StateReaderTaskEither<S, R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, S, R, E, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
) => (as: ReadonlyNonEmptyArray<A>) => StateReaderTaskEither<S, R, E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, readonly [A]>
```

Added in v3.0.0
