---
title: Tuple.ts
nav_order: 90
parent: Modules
---

# Overview

Adapted from https://github.com/purescript/purescript-tuples

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [tuple (constant)](#tuple-constant)
- [fst (function)](#fst-function)
- [getApplicative (function)](#getapplicative-function)
- [getApply (function)](#getapply-function)
- [getChain (function)](#getchain-function)
- [getChainRec (function)](#getchainrec-function)
- [getMonad (function)](#getmonad-function)
- [getShow (function)](#getshow-function)
- [snd (function)](#snd-function)
- [swap (function)](#swap-function)

---

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

# tuple (constant)

**Signature**

```ts
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI> = ...
```

Added in v2.0.0

# fst (function)

**Signature**

```ts
export function fst<A, S>(sa: [A, S]): A { ... }
```

Added in v2.0.0

# getApplicative (function)

**Signature**

```ts
export function getApplicative<S>(M: Monoid<S>): Applicative2C<URI, S> { ... }
```

Added in v2.0.0

# getApply (function)

**Signature**

```ts
export function getApply<S>(S: Semigroup<S>): Apply2C<URI, S> { ... }
```

Added in v2.0.0

# getChain (function)

**Signature**

```ts
export function getChain<S>(S: Semigroup<S>): Chain2C<URI, S> { ... }
```

Added in v2.0.0

# getChainRec (function)

**Signature**

```ts
export function getChainRec<S>(M: Monoid<S>): ChainRec2C<URI, S> { ... }
```

Added in v2.0.0

# getMonad (function)

**Signature**

```ts
export function getMonad<S>(M: Monoid<S>): Monad2C<URI, S> { ... }
```

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export function getShow<A, S>(SA: Show<A>, SS: Show<S>): Show<[A, S]> { ... }
```

Added in v2.0.0

# snd (function)

**Signature**

```ts
export function snd<A, S>(sa: [A, S]): S { ... }
```

Added in v2.0.0

# swap (function)

**Signature**

```ts
export function swap<A, S>(sa: [A, S]): [S, A] { ... }
```

Added in v2.0.0
