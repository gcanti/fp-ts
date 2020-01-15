---
title: TaskThese.ts
nav_order: 89
parent: Modules
---

# TaskThese overview

Added in v2.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [TaskThese (interface)](#taskthese-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [bimap](#bimap)
- [both](#both)
- [fold](#fold)
- [fromIOEither](#fromioeither)
- [getMonad](#getmonad)
- [getSemigroup](#getsemigroup)
- [left](#left)
- [leftIO](#leftio)
- [leftTask](#lefttask)
- [map](#map)
- [mapLeft](#mapleft)
- [right](#right)
- [rightIO](#rightio)
- [rightTask](#righttask)
- [swap](#swap)
- [taskThese](#taskthese)
- [toTuple](#totuple)

---

# TaskThese (interface)

**Signature**

```ts
export interface TaskThese<E, A> extends Task<These<E, A>> {}
```

Added in v2.4.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.4.0

# URI

**Signature**

```ts
export const URI: "TaskThese" = ...
```

Added in v2.4.0

# bimap

**Signature**

```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B>
```

Added in v2.4.0

# both

**Signature**

```ts
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> = ...
```

Added in v2.4.0

# fold

**Signature**

```ts
export function fold<E, A, B>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>,
  onBoth: (e: E, a: A) => Task<B>
): (fa: TaskThese<E, A>) => Task<B> { ... }
```

Added in v2.4.0

# fromIOEither

**Signature**

```ts
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A> = ...
```

Added in v2.4.0

# getMonad

**Signature**

```ts
export function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E> { ... }
```

Added in v2.4.0

# getSemigroup

**Signature**

```ts
export function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<TaskThese<E, A>> { ... }
```

Added in v2.4.0

# left

**Signature**

```ts
export const left: <E = never, A = never>(e: E) => TaskThese<E, A> = ...
```

Added in v2.4.0

# leftIO

**Signature**

```ts
export function leftIO<E = never, A = never>(me: IO<E>): TaskThese<E, A> { ... }
```

Added in v2.4.0

# leftTask

**Signature**

```ts
export const leftTask: <E = never, A = never>(me: Task<E>) => TaskThese<E, A> = ...
```

Added in v2.4.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B>
```

Added in v2.4.0

# mapLeft

**Signature**

```ts
<E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A>
```

Added in v2.4.0

# right

**Signature**

```ts
export const right: <E = never, A = never>(a: A) => TaskThese<E, A> = ...
```

Added in v2.4.0

# rightIO

**Signature**

```ts
export function rightIO<E = never, A = never>(ma: IO<A>): TaskThese<E, A> { ... }
```

Added in v2.4.0

# rightTask

**Signature**

```ts
export const rightTask: <E = never, A = never>(ma: Task<A>) => TaskThese<E, A> = ...
```

Added in v2.4.0

# swap

**Signature**

```ts
export const swap: <E, A>(fa: TaskThese<E, A>) => TaskThese<A, E> = ...
```

Added in v2.4.0

# taskThese

**Signature**

```ts
export const taskThese: Functor2<URI> & Bifunctor2<URI> = ...
```

Added in v2.4.0

# toTuple

**Signature**

```ts
export function toTuple<E, A>(e: E, a: A): (fa: TaskThese<E, A>) => Task<[E, A]> { ... }
```

Added in v2.4.0
