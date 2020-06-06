---
title: TaskThese.ts
nav_order: 89
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
- [Model](#model)
  - [TaskThese (interface)](#taskthese-interface)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
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
  - [getMonad](#getmonad)
  - [getSemigroup](#getsemigroup)
  - [taskThese](#taskthese)

---

# Bifunctor

## bimap

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B>
```

Added in v2.4.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A>
```

Added in v2.4.0

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B>
```

Added in v2.4.0

# Model

## TaskThese (interface)

**Signature**

```ts
export interface TaskThese<E, A> extends Task<These<E, A>> {}
```

Added in v2.4.0

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
export declare function leftIO<E = never, A = never>(me: IO<E>): TaskThese<E, A>
```

Added in v2.4.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E = never, A = never>(me: Task<E>) => TaskThese<E, A>
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
export declare function rightIO<E = never, A = never>(ma: IO<A>): TaskThese<E, A>
```

Added in v2.4.0

## rightTask

**Signature**

```ts
export declare const rightTask: <E = never, A = never>(ma: Task<A>) => TaskThese<E, A>
```

Added in v2.4.0

# destructors

## fold

**Signature**

```ts
export declare function fold<E, A, B>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>,
  onBoth: (e: E, a: A) => Task<B>
): (fa: TaskThese<E, A>) => Task<B>
```

Added in v2.4.0

## toTuple

**Signature**

```ts
export declare function toTuple<E, A>(e: E, a: A): (fa: TaskThese<E, A>) => Task<[E, A]>
```

Added in v2.4.0

# instances

## getMonad

**Signature**

```ts
export declare function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E>
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
