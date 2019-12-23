---
title: Tuple.ts
nav_order: 90
parent: Modules
---

# Tuple overview

Adapted from https://github.com/purescript/purescript-tuples

Added in v2.0.0

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
- [snd (function)](#snd-function)
- [swap (function)](#swap-function)
- [bimap (export)](#bimap-export)
- [compose (export)](#compose-export)
- [duplicate (export)](#duplicate-export)
- [extend (export)](#extend-export)
- [foldMap (export)](#foldmap-export)
- [map (export)](#map-export)
- [mapLeft (export)](#mapleft-export)
- [reduce (export)](#reduce-export)
- [reduceRight (export)](#reduceright-export)

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
export const URI: "Tuple" = ...
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

# bimap (export)

**Signature**

```ts
;<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: [A, E]) => [B, G]
```

Added in v2.0.0

# compose (export)

**Signature**

```ts
;<E, A>(la: [A, E]) => <B>(ab: [B, A]) => [B, E]
```

Added in v2.0.0

# duplicate (export)

**Signature**

```ts
;<E, A>(ma: [A, E]) => [[A, E], E]
```

Added in v2.0.0

# extend (export)

**Signature**

```ts
;<E, A, B>(f: (fa: [A, E]) => B) => (ma: [A, E]) => [B, E]
```

Added in v2.0.0

# foldMap (export)

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: [A, E]) => M
```

Added in v2.0.0

# map (export)

**Signature**

```ts
;<A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E]
```

Added in v2.0.0

# mapLeft (export)

**Signature**

```ts
;<E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G]
```

Added in v2.0.0

# reduce (export)

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: [A, E]) => B
```

Added in v2.0.0

# reduceRight (export)

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: [A, E]) => B
```

Added in v2.0.0
