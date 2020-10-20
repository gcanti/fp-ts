---
title: TaskThese.ts
nav_order: 89
parent: Modules
---

## TaskThese overview

Added in v2.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [MonadIO](#monadio)
  - [fromIO](#fromio)
  - [fromTask](#fromtask)
- [combinators](#combinators)
  - [swap](#swap)
- [constructors](#constructors)
  - [both](#both)
  - [fromIOEither](#fromioeither)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftTask](#lefttask)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightTask](#righttask)
- [destructors](#destructors)
  - [fold](#fold)
  - [toTuple](#totuple)
- [instances](#instances)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [bifunctorTaskThese](#bifunctortaskthese)
  - [functorTaskThese](#functortaskthese)
  - [getApplicative](#getapplicative)
  - [getMonad](#getmonad)
  - [getSemigroup](#getsemigroup)
  - [taskThese](#taskthese)
- [model](#model)
  - [TaskThese (interface)](#taskthese-interface)

---

# Applicative

## of

Wrap a value into the type constructor.

Equivalent to [`right`](#right).

**Signature**

```ts
export declare const of: <E, A>(a: A) => TaskThese<E, A>
```

Added in v2.7.0

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

# MonadIO

## fromIO

**Signature**

```ts
export declare const fromIO: <E, A>(fa: IO<A>) => TaskThese<E, A>
```

Added in v2.7.0

## fromTask

**Signature**

```ts
export declare const fromTask: <E, A>(fa: T.Task<A>) => TaskThese<E, A>
```

Added in v2.7.0

# combinators

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

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A>
```

Added in v2.4.0

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

**Signature**

```ts
export declare const fold: <E, B, A>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<B>,
  onBoth: (e: E, a: A) => T.Task<B>
) => (fa: TaskThese<E, A>) => T.Task<B>
```

Added in v2.4.0

## toTuple

**Signature**

```ts
export declare const toTuple: <E, A>(e: E, a: A) => (fa: TaskThese<E, A>) => T.Task<[E, A]>
```

Added in v2.4.0

# instances

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

## bifunctorTaskThese

**Signature**

```ts
export declare const bifunctorTaskThese: Bifunctor2<'TaskThese'>
```

Added in v2.7.0

## functorTaskThese

**Signature**

```ts
export declare const functorTaskThese: Functor2<'TaskThese'>
```

Added in v2.7.0

## getApplicative

**Signature**

```ts
export declare function getApplicative<E>(A: Apply1<T.URI>, SE: Semigroup<E>): Applicative2C<URI, E>
```

Added in v2.7.0

## getMonad

**Signature**

```ts
export declare function getMonad<E>(SE: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E>
```

Added in v2.4.0

## getSemigroup

**Signature**

```ts
export declare function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<TaskThese<E, A>>
```

Added in v2.4.0

## taskThese

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
