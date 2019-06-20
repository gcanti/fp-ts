---
title: IOEither.ts
nav_order: 43
parent: Modules
---

# Overview

`IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.

---

<h2 class="text-delta">Table of contents</h2>

- [IOEither (interface)](#ioeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [ioEither (constant)](#ioeither-constant)
- [left (constant)](#left-constant)
- [leftIO (constant)](#leftio-constant)
- [right (constant)](#right-constant)
- [rightIO (constant)](#rightio-constant)
- [swap (constant)](#swap-constant)
- [bracket (function)](#bracket-function)
- [fold (function)](#fold-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getIOValidation (function)](#getiovalidation-function)
- [getOrElse (function)](#getorelse-function)
- [getSemigroup (function)](#getsemigroup-function)
- [orElse (function)](#orelse-function)
- [tryCatch (function)](#trycatch-function)

---

# IOEither (interface)

**Signature**

```ts
export interface IOEither<E, A> extends IO<Either<E, A>> {}
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

# ioEither (constant)

**Signature**

```ts
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadThrow2<URI> = ...
```

Added in v2.0.0

# left (constant)

**Signature**

```ts
export const left: <E = ...
```

Added in v2.0.0

# leftIO (constant)

**Signature**

```ts
export const leftIO: <E = ...
```

Added in v2.0.0

# right (constant)

**Signature**

```ts
export const right: <E = ...
```

Added in v2.0.0

# rightIO (constant)

**Signature**

```ts
export const rightIO: <E = ...
```

Added in v2.0.0

# swap (constant)

**Signature**

```ts
export const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E> = ...
```

Added in v2.0.0

# bracket (function)

Make sure that a resource is cleaned up in the event of an exception. The
release action is called regardless of whether the body action throws or
returns.

**Signature**

```ts
export function bracket<E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: Either<E, B>) => IOEither<E, void>
): IOEither<E, B> { ... }
```

Added in v2.0.0

# fold (function)

**Signature**

```ts
export function fold<E, A, B>(onLeft: (e: E) => IO<B>, onRight: (a: A) => IO<B>): (ma: IOEither<E, A>) => IO<B> { ... }
```

Added in v2.0.0

# getApplyMonoid (function)

**Signature**

```ts
export function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<IOEither<E, A>> { ... }
```

Added in v2.0.0

# getApplySemigroup (function)

**Signature**

```ts
export function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> { ... }
```

Added in v2.0.0

# getIOValidation (function)

**Signature**

```ts
export function getIOValidation<E>(S: Semigroup<E>): Monad2C<URI, E> & Alt2C<URI, E> { ... }
```

Added in v2.0.0

# getOrElse (function)

**Signature**

```ts
export function getOrElse<E, A>(f: (e: E) => IO<A>): (ma: IOEither<E, A>) => IO<A> { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> { ... }
```

Added in v2.0.0

# orElse (function)

**Signature**

```ts
export function orElse<E, A, M>(f: (e: E) => IOEither<M, A>): (ma: IOEither<E, A>) => IOEither<M, A> { ... }
```

Added in v2.0.0

# tryCatch (function)

Constructs a new `IOEither` from a function that performs a side effect and might throw

**Signature**

```ts
export function tryCatch<E, A>(f: Lazy<A>, onError: (reason: unknown) => E): IOEither<E, A> { ... }
```

Added in v2.0.0
