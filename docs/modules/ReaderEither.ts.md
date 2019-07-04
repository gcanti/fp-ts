---
title: ReaderEither.ts
nav_order: 64
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderEither (interface)](#readereither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [left (constant)](#left-constant)
- [leftReader (constant)](#leftreader-constant)
- [readerEither (constant)](#readereither-constant)
- [right (constant)](#right-constant)
- [rightReader (constant)](#rightreader-constant)
- [swap (constant)](#swap-constant)
- [ask (function)](#ask-function)
- [asks (function)](#asks-function)
- [fold (function)](#fold-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getOrElse (function)](#getorelse-function)
- [getSemigroup (function)](#getsemigroup-function)
- [local (function)](#local-function)
- [orElse (function)](#orelse-function)

---

# ReaderEither (interface)

**Signature**

```ts
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

Added in v2.0.0

# left (constant)

**Signature**

```ts
export const left: <R, E = ...
```

Added in v2.0.0

# leftReader (constant)

**Signature**

```ts
export const leftReader: <R, E = ...
```

Added in v2.0.0

# readerEither (constant)

**Signature**

```ts
export const readerEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadThrow3<URI> = ...
```

Added in v2.0.0

# right (constant)

**Signature**

```ts
export const right: <R, E = ...
```

Added in v2.0.0

# rightReader (constant)

**Signature**

```ts
export const rightReader: <R, E = ...
```

Added in v2.0.0

# swap (constant)

**Signature**

```ts
export const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E> = ...
```

Added in v2.0.0

# ask (function)

**Signature**

```ts
export function ask<R, E = never>(): ReaderEither<R, E, R> { ... }
```

Added in v2.0.0

# asks (function)

**Signature**

```ts
export function asks<R, E = never, A = never>(f: (r: R) => A): ReaderEither<R, E, A> { ... }
```

Added in v2.0.0

# fold (function)

**Signature**

```ts
export function fold<R, E, A, B>(
  onLeft: (e: E) => Reader<R, B>,
  onRight: (a: A) => Reader<R, B>
): (ma: ReaderEither<R, E, A>) => Reader<R, B> { ... }
```

Added in v2.0.0

# getApplyMonoid (function)

**Signature**

```ts
export function getApplyMonoid<R, E, A>(M: Monoid<A>): Monoid<ReaderEither<R, E, A>> { ... }
```

Added in v2.0.0

# getApplySemigroup (function)

**Signature**

```ts
export function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> { ... }
```

Added in v2.0.0

# getOrElse (function)

**Signature**

```ts
export function getOrElse<R, E, A>(onLeft: (e: E) => Reader<R, A>): (ma: ReaderEither<R, E, A>) => Reader<R, A> { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> { ... }
```

Added in v2.0.0

# local (function)

**Signature**

```ts
export function local<Q, R>(f: (f: Q) => R): <E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<Q, E, A> { ... }
```

Added in v2.0.0

# orElse (function)

**Signature**

```ts
export function orElse<R, E, A, M>(
  onLeft: (e: E) => ReaderEither<R, M, A>
): (ma: ReaderEither<R, E, A>) => ReaderEither<R, M, A> { ... }
```

Added in v2.0.0
