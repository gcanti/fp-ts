---
title: IOEither.ts
nav_order: 45
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
- [bracket (constant)](#bracket-constant)
- [fold (constant)](#fold-constant)
- [fromEither (constant)](#fromeither-constant)
- [getOrElse (constant)](#getorelse-constant)
- [ioEither (constant)](#ioeither-constant)
- [left (constant)](#left-constant)
- [leftIO (constant)](#leftio-constant)
- [orElse (constant)](#orelse-constant)
- [right (constant)](#right-constant)
- [rightIO (constant)](#rightio-constant)
- [swap (constant)](#swap-constant)
- [filterOrElse (function)](#filterorelse-function)
- [fromOption (function)](#fromoption-function)
- [fromPredicate (function)](#frompredicate-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getSemigroup (function)](#getsemigroup-function)
- [tryCatch (function)](#trycatch-function)

---

# IOEither (interface)

**Signature**

```ts
export interface IOEither<E, A> extends IO<E.Either<E, A>> {}
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

# bracket (constant)

Make sure that a resource is cleaned up in the event of an exception. The
release action is called regardless of whether the body action throws or
returns.

**Signature**

```ts
export const bracket: <E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: E.Either<E, B>) => IOEither<E, void>
) => IOEither<E, B> = ...
```

Added in v2.0.0

# fold (constant)

**Signature**

```ts
export const  = ...
```

Added in v2.0.0

# fromEither (constant)

**Signature**

```ts
export const fromEither: <E, A>(ma: E.Either<E, A>) => IOEither<E, A> = ...
```

Added in v2.0.0

# getOrElse (constant)

**Signature**

```ts
export const getOrElse: <E, A>(f: (e: E) => IO<A>) => (ma: IOEither<E, A>) => IO<A> = ...
```

Added in v2.0.0

# ioEither (constant)

**Signature**

```ts
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> = ...
```

Added in v2.0.0

# left (constant)

**Signature**

```ts
export const left: <L>(l: L) => IOEither<L, never> = ...
```

Added in v2.0.0

# leftIO (constant)

**Signature**

```ts
export const leftIO: <E>(me: IO<E>) => IOEither<E, never> = ...
```

Added in v2.0.0

# orElse (constant)

**Signature**

```ts
export const orElse: <E, A, M>(f: (e: E) => IOEither<M, A>) => (ma: IOEither<E, A>) => IOEither<M, A> = ...
```

Added in v2.0.0

# right (constant)

**Signature**

```ts
export const right: <A>(a: A) => IOEither<never, A> = ...
```

Added in v2.0.0

# rightIO (constant)

**Signature**

```ts
export const rightIO: <A>(ma: IO<A>) => IOEither<never, A> = ...
```

Added in v2.0.0

# swap (constant)

**Signature**

```ts
export const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E> = ...
```

Added in v2.0.0

# filterOrElse (function)

**Signature**

```ts
export function filterOrElse<E, A, B extends A>(
  refinement: Refinement<A, B>,
  onFalse: (a: A) => E
): (ma: IOEither<E, A>) => IOEither<E, B>
export function filterOrElse<E, A>(
  predicate: Predicate<A>,
  zeonFalsero: (a: A) => E
): (ma: IOEither<E, A>) => IOEither<E, A> { ... }
```

Added in v2.0.0

# fromOption (function)

**Signature**

```ts
export function fromOption<E, A>(ma: Option<A>, onNone: () => E): IOEither<E, A> { ... }
```

Added in v2.0.0

# fromPredicate (function)

**Signature**

```ts
export function fromPredicate<E, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => E
): (a: A) => IOEither<E, B>
export function fromPredicate<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<E, A> { ... }
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

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> { ... }
```

Added in v2.0.0

# tryCatch (function)

Constructs a new `IOEither` from a function that performs a side effect and might throw

**Signature**

```ts
export function tryCatch<E, A>(f: Lazy<A>, onError: (reason: unknown) => E): IOEither<E, A> { ... }
```

Added in v2.0.0
