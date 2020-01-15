---
title: Tuple.ts
nav_order: 96
parent: Modules
---

# Tuple overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [bimap](#bimap)
- [compose](#compose)
- [duplicate](#duplicate)
- [extend](#extend)
- [foldMap](#foldmap)
- [fst](#fst)
- [getApplicative](#getapplicative)
- [getApply](#getapply)
- [getChain](#getchain)
- [getChainRec](#getchainrec)
- [getMonad](#getmonad)
- [map](#map)
- [mapLeft](#mapleft)
- [reduce](#reduce)
- [reduceRight](#reduceright)
- [snd](#snd)
- [swap](#swap)
- [tuple](#tuple)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI

**Signature**

```ts
export const URI: "Tuple" = ...
```

Added in v2.0.0

# bimap

**Signature**

```ts
;<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: [A, E]) => [B, G]
```

Added in v2.0.0

# compose

**Signature**

```ts
;<E, A>(la: [A, E]) => <B>(ab: [B, A]) => [B, E]
```

Added in v2.0.0

# duplicate

**Signature**

```ts
;<E, A>(ma: [A, E]) => [[A, E], E]
```

Added in v2.0.0

# extend

**Signature**

```ts
;<E, A, B>(f: (fa: [A, E]) => B) => (ma: [A, E]) => [B, E]
```

Added in v2.0.0

# foldMap

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: [A, E]) => M
```

Added in v2.0.0

# fst

**Signature**

```ts
export const fst: <A, S>(sa: [A, S]) => A = ...
```

Added in v2.0.0

# getApplicative

**Signature**

```ts
export const getApplicative: <S>(M: Monoid<S>) => Applicative2C<URI, S> = ...
```

Added in v2.0.0

# getApply

**Signature**

```ts
export const getApply: <S>(S: Semigroup<S>) => Apply2C<URI, S> = ...
```

Added in v2.0.0

# getChain

**Signature**

```ts
export const getChain: <S>(S: Semigroup<S>) => Chain2C<URI, S> = ...
```

Added in v2.0.0

# getChainRec

**Signature**

```ts
export const getChainRec: <S>(M: Monoid<S>) => ChainRec2C<URI, S> = ...
```

Added in v2.0.0

# getMonad

**Signature**

```ts
export const getMonad: <S>(M: Monoid<S>) => Monad2C<URI, S> = ...
```

Added in v2.0.0

# map

**Signature**

```ts
;<A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E]
```

Added in v2.0.0

# mapLeft

**Signature**

```ts
;<E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G]
```

Added in v2.0.0

# reduce

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: [A, E]) => B
```

Added in v2.0.0

# reduceRight

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: [A, E]) => B
```

Added in v2.0.0

# snd

**Signature**

```ts
export const snd: <A, S>(sa: [A, S]) => S = ...
```

Added in v2.0.0

# swap

**Signature**

```ts
export const swap: <A, S>(sa: [A, S]) => [S, A] = ...
```

Added in v2.0.0

# tuple

**Signature**

```ts
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI> = ...
```

Added in v2.0.0
