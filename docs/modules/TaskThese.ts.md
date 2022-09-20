---
title: TaskThese.ts
nav_order: 102
parent: Modules
---

## TaskThese overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [HKT](#hkt)
  - [TaskTheseF (interface)](#taskthesef-interface)
  - [TaskTheseFFixedE (interface)](#tasktheseffixede-interface)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [flap](#flap)
  - [fromEitherK](#fromeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionKOrElse](#fromoptionkorelse)
  - [fromTaskK](#fromtaskk)
  - [fromTheseK](#fromthesek)
  - [swap](#swap)
- [constructors](#constructors)
  - [both](#both)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromPredicateOrElse](#frompredicateorelse)
  - [fromRefinementOrElse](#fromrefinementorelse)
  - [fromTask](#fromtask)
  - [fromThese](#fromthese)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftTask](#lefttask)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightTask](#righttask)
- [destructors](#destructors)
  - [match](#match)
  - [matchE](#matche)
- [instances](#instances)
  - [Bifunctor](#bifunctor-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromTask](#fromtask)
  - [FromThese](#fromthese)
  - [Functor](#functor-1)
  - [Pointed](#pointed-1)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getChain](#getchain)
  - [getMonad](#getmonad)
- [interop](#interop)
  - [fromNullableKOrElse](#fromnullablekorelse)
  - [fromNullableOrElse](#fromnullableorelse)
- [model](#model)
  - [TaskThese (interface)](#taskthese-interface)
- [natural transformations](#natural-transformations)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
- [utils](#utils)
  - [ApT](#apt)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArraySeq](#sequencereadonlyarrayseq)
  - [toTuple2](#totuple2)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArraySeq](#traversereadonlyarrayseq)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArraySeq](#traversereadonlynonemptyarrayseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)

---

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: TaskThese<E, A>) => TaskThese<G, B>
```

Added in v3.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: TaskThese<E, A>) => TaskThese<G, A>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B>
```

Added in v3.0.0

# HKT

## TaskTheseF (interface)

**Signature**

```ts
export interface TaskTheseF extends HKT {
  readonly type: TaskThese<this['Covariant2'], this['Covariant1']>
}
```

Added in v3.0.0

## TaskTheseFFixedE (interface)

**Signature**

```ts
export interface TaskTheseFFixedE<E> extends HKT {
  readonly type: TaskThese<E, this['Covariant1']>
}
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, E = never>(a: A) => TaskThese<E, A>
```

Added in v3.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: TaskThese<E, (a: A) => B>) => TaskThese<E, B>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => TaskThese<E, B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => <E>(...a: A) => TaskThese<E, B>
```

Added in v3.0.0

## fromOptionKOrElse

**Signature**

```ts
export declare const fromOptionKOrElse: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => (...a: A) => TaskThese<E, B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => task.Task<B>
) => <E = never>(...a: A) => TaskThese<E, B>
```

Added in v3.0.0

## fromTheseK

**Signature**

```ts
export declare const fromTheseK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => these.These<E, B>
) => (...a: A) => TaskThese<E, B>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: task.Task<these.These<E, A>>) => task.Task<these.These<A, E>>
```

Added in v3.0.0

# constructors

## both

**Signature**

```ts
export declare const both: <E, A>(e: E, a: A) => TaskThese<E, A>
```

Added in v3.0.0

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(fa: Either<E, A>) => TaskThese<E, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A, E = never>(fa: IO<A>) => TaskThese<E, A>
```

Added in v3.0.0

## fromPredicateOrElse

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicateOrElse: <B extends A, E, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E
) => (b: B) => TaskThese<E, B>
```

Added in v3.0.0

## fromRefinementOrElse

**Signature**

```ts
export declare const fromRefinementOrElse: <C extends A, B extends A, E, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E
) => (c: C) => TaskThese<E, B>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A, E = never>(fa: task.Task<A>) => TaskThese<E, A>
```

Added in v3.0.0

## fromThese

**Signature**

```ts
export declare const fromThese: <E, A>(fa: these.These<E, A>) => TaskThese<E, A>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E, A = never>(e: E) => TaskThese<E, A>
```

Added in v3.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E, A = never>(me: IO<E>) => TaskThese<E, A>
```

Added in v3.0.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E, A = never>(me: task.Task<E>) => TaskThese<E, A>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A, E = never>(a: A) => TaskThese<E, A>
```

Added in v3.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <A, E = never>(ma: IO<A>) => TaskThese<E, A>
```

Added in v3.0.0

## rightTask

**Signature**

```ts
export declare const rightTask: <A, E = never>(ma: task.Task<A>) => TaskThese<E, A>
```

Added in v3.0.0

# destructors

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B, D = B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => (ma: task.Task<these.These<E, A>>) => task.Task<B | C | D>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare const matchE: <E, B, A, C = B, D = B>(
  onLeft: (e: E) => task.Task<B>,
  onRight: (a: A) => task.Task<C>,
  onBoth: (e: E, a: A) => task.Task<D>
) => (ma: task.Task<these.These<E, A>>) => task.Task<B | C | D>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<TaskTheseF>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: fromEither_.FromEither<TaskTheseF>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO_.FromIO<TaskTheseF>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask_.FromTask<TaskTheseF>
```

Added in v3.0.0

## FromThese

**Signature**

```ts
export declare const FromThese: FromThese_.FromThese<TaskTheseF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<TaskTheseF>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<TaskTheseF>
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <E>(A: Apply<task.TaskF>, S: Semigroup<E>) => Applicative<TaskTheseFFixedE<E>>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <E>(A: Apply<task.TaskF>, S: Semigroup<E>) => Apply<TaskTheseFFixedE<E>>
```

Added in v3.0.0

## getChain

**Signature**

```ts
export declare const getChain: <E>(S: Semigroup<E>) => Chain<TaskTheseFFixedE<E>>
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <E>(S: Semigroup<E>) => Monad<TaskTheseFFixedE<E>>
```

Added in v3.0.0

# interop

## fromNullableKOrElse

**Signature**

```ts
export declare const fromNullableKOrElse: <E>(
  onNullable: Lazy<E>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskThese<E, NonNullable<B>>
```

Added in v3.0.0

## fromNullableOrElse

**Signature**

```ts
export declare const fromNullableOrElse: <E>(onNullable: Lazy<E>) => <A>(a: A) => TaskThese<E, NonNullable<A>>
```

Added in v3.0.0

# model

## TaskThese (interface)

**Signature**

```ts
export interface TaskThese<E, A> extends Task<These<E, A>> {}
```

Added in v3.0.0

# natural transformations

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A>
```

Added in v3.0.0

## fromOption

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => TaskThese<E, A>
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: TaskThese<never, readonly []>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(getApplicative(T.ApplicativePar, S))`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E>(
  S: Semigroup<E>
) => <A>(arr: readonly TaskThese<E, A>[]) => TaskThese<E, readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArraySeq

Equivalent to `ReadonlyArray#sequence(getApplicative(T.ApplicativeSeq, S))`.

**Signature**

```ts
export declare const sequenceReadonlyArraySeq: <E>(
  S: Semigroup<E>
) => <A>(arr: readonly TaskThese<E, A>[]) => TaskThese<E, readonly A[]>
```

Added in v3.0.0

## toTuple2

**Signature**

```ts
export declare const toTuple2: <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: TaskThese<E, A>) => task.Task<readonly [E, A]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(getApplicative(T.ApplicativePar, S))`.

**Signature**

```ts
export declare const traverseReadonlyArray: <E>(
  S: Semigroup<E>
) => <A, B>(f: (a: A) => TaskThese<E, B>) => (as: readonly A[]) => TaskThese<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArraySeq

Equivalent to `ReadonlyArray#traverse(getApplicative(T.ApplicativeSeq, S))`.

**Signature**

```ts
export declare const traverseReadonlyArraySeq: <E>(
  S: Semigroup<E>
) => <A, B>(f: (a: A) => TaskThese<E, B>) => (as: readonly A[]) => TaskThese<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.ApplicativePar, S))`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <E>(
  S: Semigroup<E>
) => <A, B>(f: (index: number, a: A) => TaskThese<E, B>) => (as: readonly A[]) => TaskThese<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.ApplicativeSeq, S))`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <E>(
  S: Semigroup<E>
) => <A, B>(f: (index: number, a: A) => TaskThese<E, B>) => (as: readonly A[]) => TaskThese<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(T.ApplyPar, S))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <E>(
  S: Semigroup<E>
) => <A, B>(f: (a: A) => TaskThese<E, B>) => (as: ReadonlyNonEmptyArray<A>) => TaskThese<E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArraySeq

Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(T.ApplySeq, S))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArraySeq: <E>(
  S: Semigroup<E>
) => <A, B>(f: (a: A) => TaskThese<E, B>) => (as: ReadonlyNonEmptyArray<A>) => TaskThese<E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(T.ApplyPar, S))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <E>(
  S: Semigroup<E>
) => <A, B>(
  f: (index: number, a: A) => TaskThese<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskThese<E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(T.ApplySeq, S))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <E>(
  S: Semigroup<E>
) => <A, B>(
  f: (index: number, a: A) => TaskThese<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskThese<E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0
