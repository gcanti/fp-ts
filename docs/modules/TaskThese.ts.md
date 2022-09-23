---
title: TaskThese.ts
nav_order: 109
parent: Modules
---

## TaskThese overview

Added in v2.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [flap](#flap)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [fromTaskK](#fromtaskk)
  - [fromTheseK](#fromthesek)
  - [swap](#swap)
- [constructors](#constructors)
  - [both](#both)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftTask](#lefttask)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightTask](#righttask)
- [destructors](#destructors)
  - [fold](#fold)
  - [foldW](#foldw)
  - [match](#match)
  - [matchE](#matche)
  - [matchEW](#matchew)
  - [matchW](#matchw)
- [instances](#instances)
  - [Bifunctor](#bifunctor-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromTask](#fromtask)
  - [FromThese](#fromthese)
  - [Functor](#functor-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getChain](#getchain)
  - [getMonad](#getmonad)
  - [~~bifunctorTaskThese~~](#bifunctortaskthese)
  - [~~functorTaskThese~~](#functortaskthese)
  - [~~getSemigroup~~](#getsemigroup)
  - [~~taskThese~~](#taskthese)
- [model](#model)
  - [TaskThese (interface)](#taskthese-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromTask](#fromtask)
  - [fromThese](#fromthese)
- [utils](#utils)
  - [ApT](#apt)
  - [toTuple2](#totuple2)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)
  - [~~toTuple~~](#totuple)

---

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B>
```

Added in v2.4.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A>
```

Added in v2.4.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B>
```

Added in v2.4.0

# Pointed

## of

**Signature**

```ts
export declare const of: <E = never, A = never>(a: A) => TaskThese<E, A>
```

Added in v2.7.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: TaskThese<E, (a: A) => B>) => TaskThese<E, B>
```

Added in v2.10.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => <E = never>(...a: A) => TaskThese<E, B>
```

Added in v2.10.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => (...a: A) => TaskThese<E, B>
```

Added in v2.10.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => T.Task<B>
) => <E = never>(...a: A) => TaskThese<E, B>
```

Added in v2.10.0

## fromTheseK

**Signature**

```ts
export declare const fromTheseK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => TH.These<E, B>
) => (...a: A) => TaskThese<E, B>
```

Added in v2.11.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(fa: TaskThese<E, A>) => TaskThese<A, E>
```

Added in v2.4.0

# constructors

## both

**Signature**

```ts
export declare const both: <E, A>(e: E, a: A) => TaskThese<E, A>
```

Added in v2.4.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => TaskThese<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => TaskThese<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => TaskThese<E, A>
}
```

Added in v2.10.0

## left

**Signature**

```ts
export declare const left: <E = never, A = never>(e: E) => TaskThese<E, A>
```

Added in v2.4.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E = never, A = never>(me: IO<E>) => TaskThese<E, A>
```

Added in v2.4.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E = never, A = never>(me: T.Task<E>) => TaskThese<E, A>
```

Added in v2.4.0

## right

**Signature**

```ts
export declare const right: <E = never, A = never>(a: A) => TaskThese<E, A>
```

Added in v2.4.0

## rightIO

**Signature**

```ts
export declare const rightIO: <E = never, A = never>(ma: IO<A>) => TaskThese<E, A>
```

Added in v2.4.0

## rightTask

**Signature**

```ts
export declare const rightTask: <E = never, A = never>(ma: T.Task<A>) => TaskThese<E, A>
```

Added in v2.4.0

# destructors

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: <E, B, A>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<B>,
  onBoth: (e: E, a: A) => T.Task<B>
) => (fa: TaskThese<E, A>) => T.Task<B>
```

Added in v2.4.0

## foldW

Alias of [`matchEW`](#matchew).

**Signature**

```ts
export declare const foldW: <E, B, A, C, D>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<C>,
  onBoth: (e: E, a: A) => T.Task<D>
) => (fa: TaskThese<E, A>) => T.Task<B | C | D>
```

Added in v2.10.0

## match

**Signature**

```ts
export declare const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (fa: TaskThese<E, A>) => T.Task<B>
```

Added in v2.10.0

## matchE

The `E` suffix (short for **E**ffect) means that the handlers return an effect (`Task`).

**Signature**

```ts
export declare const matchE: <E, B, A>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<B>,
  onBoth: (e: E, a: A) => T.Task<B>
) => (fa: TaskThese<E, A>) => T.Task<B>
```

Added in v2.10.0

## matchEW

Less strict version of [`matchE`](#matche).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchEW: <E, B, A, C, D>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<C>,
  onBoth: (e: E, a: A) => T.Task<D>
) => (fa: TaskThese<E, A>) => T.Task<B | C | D>
```

Added in v2.10.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <E, B, A, C, D>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => (ma: TaskThese<E, A>) => T.Task<B | C | D>
```

Added in v2.10.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'TaskThese'>
```

Added in v2.10.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither2<'TaskThese'>
```

Added in v2.10.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'TaskThese'>
```

Added in v2.10.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask2<'TaskThese'>
```

Added in v2.10.0

## FromThese

**Signature**

```ts
export declare const FromThese: FromThese2<'TaskThese'>
```

Added in v2.11.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'TaskThese'>
```

Added in v2.10.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'TaskThese'>
```

Added in v2.10.0

## URI

**Signature**

```ts
export declare const URI: 'TaskThese'
```

Added in v2.4.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.4.0

## getApplicative

**Signature**

```ts
export declare function getApplicative<E>(A: Apply1<T.URI>, S: Semigroup<E>): Applicative2C<URI, E>
```

Added in v2.7.0

## getApply

**Signature**

```ts
export declare const getApply: <E>(A: Apply1<T.URI>, S: Semigroup<E>) => Apply2C<'TaskThese', E>
```

Added in v2.10.0

## getChain

**Signature**

```ts
export declare function getChain<E>(S: Semigroup<E>): Chain2C<URI, E>
```

Added in v2.10.0

## getMonad

**Signature**

```ts
export declare function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E>
```

Added in v2.4.0

## ~~bifunctorTaskThese~~

Use [`Bifunctor`](#bifunctor) instead.

**Signature**

```ts
export declare const bifunctorTaskThese: Bifunctor2<'TaskThese'>
```

Added in v2.7.0

## ~~functorTaskThese~~

Use [`Functor`](#functor) instead.

**Signature**

```ts
export declare const functorTaskThese: Functor2<'TaskThese'>
```

Added in v2.7.0

## ~~getSemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getSemigroup: <E, A>(SE: Semigroup<E>, SA: Semigroup<A>) => Semigroup<TaskThese<E, A>>
```

Added in v2.4.0

## ~~taskThese~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `TT.Functor` instead of `TT.taskThese`
(where `TT` is from `import TT from 'fp-ts/TaskThese'`)

**Signature**

```ts
export declare const taskThese: Functor2<'TaskThese'> & Bifunctor2<'TaskThese'>
```

Added in v2.4.0

# model

## TaskThese (interface)

**Signature**

```ts
export interface TaskThese<E, A> extends Task<These<E, A>> {}
```

Added in v2.4.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(fa: Either<E, A>) => TaskThese<E, A>
```

Added in v2.10.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A, E = never>(fa: IO<A>) => TaskThese<E, A>
```

Added in v2.7.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A>
```

Added in v2.4.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => TaskThese<E, A>
```

Added in v2.10.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A, E = never>(fa: T.Task<A>) => TaskThese<E, A>
```

Added in v2.7.0

## fromThese

**Signature**

```ts
export declare const fromThese: <E, A>(fa: TH.These<E, A>) => TaskThese<E, A>
```

Added in v2.11.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: TaskThese<never, readonly []>
```

Added in v2.11.0

## toTuple2

**Signature**

```ts
export declare const toTuple2: <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: TaskThese<E, A>) => T.Task<readonly [E, A]>
```

Added in v2.10.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.ApplicativePar, S))`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <E>(
  S: Semigroup<E>
) => <A, B>(f: (index: number, a: A) => TaskThese<E, B>) => (as: readonly A[]) => TaskThese<E, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.ApplicativeSeq, S))`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <E>(
  S: Semigroup<E>
) => <A, B>(f: (index: number, a: A) => TaskThese<E, B>) => (as: readonly A[]) => TaskThese<E, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApplicative(T.ApplicativePar, S))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <E>(
  S: Semigroup<E>
) => <A, B>(
  f: (index: number, a: A) => TaskThese<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskThese<E, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApplicative(T.ApplicativeSeq, S))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <E>(
  S: Semigroup<E>
) => <A, B>(
  f: (index: number, a: A) => TaskThese<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskThese<E, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## ~~toTuple~~

Use [`toTuple2`](#totuple2) instead.

**Signature**

```ts
export declare const toTuple: <E, A>(e: E, a: A) => (fa: TaskThese<E, A>) => T.Task<[E, A]>
```

Added in v2.4.0
