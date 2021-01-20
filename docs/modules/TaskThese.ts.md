---
title: TaskThese.ts
nav_order: 80
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
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [swap](#swap)
- [constructors](#constructors)
  - [both](#both)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [fromTask](#fromtask)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftTask](#lefttask)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightTask](#righttask)
- [destructors](#destructors)
  - [fold](#fold)
- [instances](#instances)
  - [Bifunctor](#bifunctor-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getMonad](#getmonad)
- [model](#model)
  - [TaskThese (interface)](#taskthese-interface)
- [utils](#utils)
  - [toTuple](#totuple)

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

# Pointed

## of

**Signature**

```ts
export declare const of: <A, E>(a: A) => TaskThese<E, A>
```

Added in v3.0.0

# combinators

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: T.Task<TH.These<E, A>>) => T.Task<TH.These<A, E>>
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
export declare const fromEither: <E, A>(e: Either<E, A>) => TaskThese<E, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A, E>(fa: IO<A>) => TaskThese<E, A>
```

Added in v3.0.0

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
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => TaskThese<E, A>
```

Added in v3.0.0

## fromPredicate

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicate: {
  <A, B>(refinement: Refinement<A, B>): (a: A) => TaskThese<A, B>
  <A>(predicate: Predicate<A>): (a: A) => TaskThese<A, A>
}
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A, E>(fa: T.Task<A>) => TaskThese<E, A>
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
export declare const leftTask: <E, A = never>(me: T.Task<E>) => TaskThese<E, A>
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
export declare const rightTask: <A, E = never>(ma: T.Task<A>) => TaskThese<E, A>
```

Added in v3.0.0

# destructors

## fold

**Signature**

```ts
export declare const fold: <E, R, A>(
  onLeft: (e: E) => T.Task<R>,
  onRight: (a: A) => T.Task<R>,
  onBoth: (e: E, a: A) => T.Task<R>
) => (ma: T.Task<TH.These<E, A>>) => T.Task<R>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'TaskThese'>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither2<'TaskThese'>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'TaskThese'>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask2<'TaskThese'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'TaskThese'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'TaskThese'>
```

Added in v3.0.0

## URI

**Signature**

```ts
export declare const URI: 'TaskThese'
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <E>(A: Apply1<'Task'>, S: Semigroup<E>) => Applicative2C<'TaskThese', E>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <E>(A: Apply1<'Task'>, S: Semigroup<E>) => Apply2C<'TaskThese', E>
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <E>(S: Semigroup<E>) => Monad2C<'TaskThese', E>
```

Added in v3.0.0

# model

## TaskThese (interface)

**Signature**

```ts
export interface TaskThese<E, A> extends Task<These<E, A>> {}
```

Added in v3.0.0

# utils

## toTuple

**Signature**

```ts
export declare const toTuple: <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: T.Task<TH.These<E, A>>) => T.Task<readonly [E, A]>
```

Added in v3.0.0
