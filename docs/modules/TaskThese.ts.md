---
title: TaskThese.ts
nav_order: 83
parent: Modules
---

# TaskThese overview

Added in v2.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [TaskThese (interface)](#taskthese-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [both (constant)](#both-constant)
- [fromIOEither (constant)](#fromioeither-constant)
- [left (constant)](#left-constant)
- [leftTask (constant)](#lefttask-constant)
- [right (constant)](#right-constant)
- [rightTask (constant)](#righttask-constant)
- [swap (constant)](#swap-constant)
- [taskThese (constant)](#taskthese-constant)
- [fold (function)](#fold-function)
- [getMonad (function)](#getmonad-function)
- [getSemigroup (function)](#getsemigroup-function)
- [leftIO (function)](#leftio-function)
- [rightIO (function)](#rightio-function)
- [toTuple (function)](#totuple-function)
- [bimap (export)](#bimap-export)
- [map (export)](#map-export)
- [mapLeft (export)](#mapleft-export)

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

# URI (constant)

**Signature**

```ts
export const URI: "TaskThese" = ...
```

Added in v2.4.0

# both (constant)

**Signature**

```ts
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> = ...
```

Added in v2.4.0

# fromIOEither (constant)

**Signature**

```ts
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A> = ...
```

Added in v2.4.0

# left (constant)

**Signature**

```ts
export const left: <E = ...
```

Added in v2.4.0

# leftTask (constant)

**Signature**

```ts
export const leftTask: <E = ...
```

Added in v2.4.0

# right (constant)

**Signature**

```ts
export const right: <E = ...
```

Added in v2.4.0

# rightTask (constant)

**Signature**

```ts
export const rightTask: <E = ...
```

Added in v2.4.0

# swap (constant)

**Signature**

```ts
export const swap: <E, A>(fa: TaskThese<E, A>) => TaskThese<A, E> = ...
```

Added in v2.4.0

# taskThese (constant)

**Signature**

```ts
export const taskThese: Functor2<URI> & Bifunctor2<URI> = ...
```

Added in v2.4.0

# fold (function)

**Signature**

```ts
export function fold<E, A, B>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>,
  onBoth: (e: E, a: A) => Task<B>
): (fa: TaskThese<E, A>) => Task<B> { ... }
```

Added in v2.4.0

# getMonad (function)

**Signature**

```ts
export function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E> { ... }
```

Added in v2.4.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<TaskThese<E, A>> { ... }
```

Added in v2.4.0

# leftIO (function)

**Signature**

```ts
export function leftIO<E = never, A = never>(me: IO<E>): TaskThese<E, A> { ... }
```

Added in v2.4.0

# rightIO (function)

**Signature**

```ts
export function rightIO<E = never, A = never>(ma: IO<A>): TaskThese<E, A> { ... }
```

Added in v2.4.0

# toTuple (function)

**Signature**

```ts
export function toTuple<E, A>(e: E, a: A): (fa: TaskThese<E, A>) => Task<[E, A]> { ... }
```

Added in v2.4.0

# bimap (export)

**Signature**

```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B>
```

Added in v2.4.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B>
```

Added in v2.4.0

# mapLeft (export)

**Signature**

```ts
<E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A>
```

Added in v2.4.0
