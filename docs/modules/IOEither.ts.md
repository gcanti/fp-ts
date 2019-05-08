---
title: IOEither.ts
nav_order: 46
parent: Modules
---

# Overview

`IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `L`. If you want to represent a synchronous computation that never fails, please see `IO`.

---

<h2 class="text-delta">Table of contents</h2>

- [IOEither (interface)](#ioeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
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
- [bracket (function)](#bracket-function)
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
export interface IOEither<L, A> extends IO<E.Either<L, A>> {}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# fold (constant)

**Signature**

```ts
export const fold: <L, A, R>(ma: IOEither<L, A>, onLeft: (l: L) => IO<R>, onRight: (a: A) => IO<R>) => IO<R> = ...
```

Added in v2.0.0

# fromEither (constant)

**Signature**

```ts
export const fromEither: <L, A>(ma: E.Either<L, A>) => IOEither<L, A> = ...
```

Added in v2.0.0

# getOrElse (constant)

**Signature**

```ts
export const getOrElse: <L, A>(ma: IOEither<L, A>, f: (l: L) => IO<A>) => IO<A> = ...
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
export const leftIO: <L>(ml: IO<L>) => IOEither<L, never> = ...
```

Added in v2.0.0

# orElse (constant)

**Signature**

```ts
export const orElse: <L, A, M>(ma: IOEither<L, A>, f: (l: L) => IOEither<M, A>) => IOEither<M, A> = ...
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
export const swap: <L, A>(ma: IOEither<L, A>) => IOEither<A, L> = ...
```

Added in v2.0.0

# bracket (function)

Make sure that a resource is cleaned up in the event of an exception. The
release action is called regardless of whether the body action throws or
returns.

**Signature**

```ts
export function bracket<L, A, B>(
  acquire: IOEither<L, A>,
  use: (a: A) => IOEither<L, B>,
  release: (a: A, e: E.Either<L, B>) => IOEither<L, void>
): IOEither<L, B> { ... }
```

Added in v2.0.0

# filterOrElse (function)

**Signature**

```ts
export function filterOrElse<L, A, B extends A>(
  ma: IOEither<L, A>,
  p: Refinement<A, B>,
  zero: (a: A) => L
): IOEither<L, B>
export function filterOrElse<L, A>(ma: IOEither<L, A>, p: Predicate<A>, zero: (a: A) => L): IOEither<L, A> { ... }
```

Added in v2.0.0

# fromOption (function)

**Signature**

```ts
export function fromOption<L, A>(ma: Option<A>, onNone: () => L): IOEither<L, A> { ... }
```

Added in v2.0.0

# fromPredicate (function)

**Signature**

```ts
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): (a: A) => IOEither<L, B>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => IOEither<L, A> { ... }
```

Added in v2.0.0

# getApplyMonoid (function)

**Signature**

```ts
export function getApplyMonoid<L, A>(M: Monoid<A>): Monoid<IOEither<L, A>> { ... }
```

Added in v2.0.0

# getApplySemigroup (function)

**Signature**

```ts
export function getApplySemigroup<L, A>(S: Semigroup<A>): Semigroup<IOEither<L, A>> { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<L, A>(S: Semigroup<A>): Semigroup<IOEither<L, A>> { ... }
```

Added in v2.0.0

# tryCatch (function)

Constructs a new `IOEither` from a function that performs a side effect and might throw

**Signature**

```ts
export function tryCatch<L, A>(f: Lazy<A>, onError: (reason: unknown) => L): IOEither<L, A> { ... }
```

Added in v2.0.0
