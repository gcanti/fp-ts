---
title: IOEither.ts
nav_order: 45
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
- [fromRight (constant)](#fromright-constant)
- [ioEither (constant)](#ioeither-constant)
- [fromLeft (function)](#fromleft-function)
- [left (function)](#left-function)
- [mapLeft (function)](#mapleft-function)
- [orElse (function)](#orelse-function)
- [right (function)](#right-function)
- [run (function)](#run-function)
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
export const fold: <L, A, R>(ma: IOEither<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R) => IO<R> = ...
```

Added in v2.0.0

# fromRight (constant)

**Signature**

```ts
export const fromRight: <A>(a: A) => IOEither<never, A> = ...
```

Added in v2.0.0

# ioEither (constant)

**Signature**

```ts
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadThrow2<URI> = ...
```

Added in v2.0.0

# fromLeft (function)

**Signature**

```ts
export function fromLeft<L>(l: L): IOEither<L, never> { ... }
```

Added in v2.0.0

# left (function)

**Signature**

```ts
export function left<L>(fa: IO<L>): IOEither<L, never> { ... }
```

Added in v2.0.0

# mapLeft (function)

**Signature**

```ts
export function mapLeft<L, A, M>(ma: IOEither<L, A>, f: (l: L) => M): IOEither<M, A> { ... }
```

Added in v2.0.0

# orElse (function)

**Signature**

```ts
export function orElse<L, A, M>(fa: IOEither<L, A>, f: (l: L) => IOEither<M, A>): IOEither<M, A> { ... }
```

Added in v2.0.0

# right (function)

**Signature**

```ts
export function right<A>(fa: IO<A>): IOEither<never, A> { ... }
```

Added in v2.0.0

# run (function)

**Signature**

```ts
export function run<L, A>(fa: IOEither<L, A>): E.Either<L, A> { ... }
```

Added in v2.0.0

# tryCatch (function)

**Signature**

```ts
export function tryCatch<L, A>(f: Lazy<A>, onError: (reason: unknown) => L): IOEither<L, A> { ... }
```

Added in v2.0.0
