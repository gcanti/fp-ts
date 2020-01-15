---
title: ReadonlyTuple.ts
nav_order: 74
parent: Modules
---

# ReadonlyTuple overview

Added in v2.5.0

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
- [readonlyTuple](#readonlytuple)
- [reduce](#reduce)
- [reduceRight](#reduceright)
- [snd](#snd)
- [swap](#swap)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.5.0

# URI

**Signature**

```ts
export const URI: "ReadonlyTuple" = ...
```

Added in v2.5.0

# bimap

**Signature**

```ts
;<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: readonly [A, E]) => readonly[(B, G)]
```

Added in v2.5.0

# compose

**Signature**

```ts
;<E, A>(la: readonly [A, E]) => <B>(ab: readonly [B, A]) => readonly[(B, E)]
```

Added in v2.5.0

# duplicate

**Signature**

```ts
;<E, A>(ma: readonly [A, E]) => readonly[(readonly[(A, E)], E)]
```

Added in v2.5.0

# extend

**Signature**

```ts
;<E, A, B>(f: (fa: readonly [A, E]) => B) => (ma: readonly [A, E]) => readonly[(B, E)]
```

Added in v2.5.0

# foldMap

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: readonly [A, E]) => M
```

Added in v2.5.0

# fst

**Signature**

```ts
export function fst<A, S>(sa: readonly [A, S]): A { ... }
```

Added in v2.5.0

# getApplicative

**Signature**

```ts
export function getApplicative<S>(M: Monoid<S>): Applicative2C<URI, S> { ... }
```

Added in v2.5.0

# getApply

**Signature**

```ts
export function getApply<S>(S: Semigroup<S>): Apply2C<URI, S> { ... }
```

Added in v2.5.0

# getChain

**Signature**

```ts
export function getChain<S>(S: Semigroup<S>): Chain2C<URI, S> { ... }
```

Added in v2.5.0

# getChainRec

**Signature**

```ts
export function getChainRec<S>(M: Monoid<S>): ChainRec2C<URI, S> { ... }
```

Added in v2.5.0

# getMonad

**Signature**

```ts
export function getMonad<S>(M: Monoid<S>): Monad2C<URI, S> { ... }
```

Added in v2.5.0

# map

**Signature**

```ts
;<A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly[(B, E)]
```

Added in v2.5.0

# mapLeft

**Signature**

```ts
;<E, G>(f: (e: E) => G) => <A>(fa: readonly [A, E]) => readonly[(A, G)]
```

Added in v2.5.0

# readonlyTuple

**Signature**

```ts
export const readonlyTuple: Semigroupoid2<URI> &
  Bifunctor2<URI> &
  Comonad2<URI> &
  Foldable2<URI> &
  Traversable2<URI> = ...
```

Added in v2.5.0

# reduce

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: readonly [A, E]) => B
```

Added in v2.5.0

# reduceRight

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: readonly [A, E]) => B
```

Added in v2.5.0

# snd

**Signature**

```ts
export function snd<A, S>(sa: readonly [A, S]): S { ... }
```

Added in v2.5.0

# swap

**Signature**

```ts
export function swap<A, S>(sa: readonly [A, S]): readonly [S, A] { ... }
```

Added in v2.5.0
