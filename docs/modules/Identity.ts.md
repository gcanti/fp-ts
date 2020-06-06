---
title: Identity.ts
nav_order: 40
parent: Modules
---

## Identity overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Extend](#extend)
  - [duplicate](#duplicate)
  - [extend](#extend)
- [Extract](#extract)
  - [extract](#extract)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [Model](#model)
  - [Identity (type alias)](#identity-type-alias)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [instances](#instances)
  - [getEq](#geteq)
  - [getShow](#getshow)
  - [identity](#identity)

---

# Alt

## alt

**Signature**

```ts
export declare const alt: <A>(that: () => A) => (fa: A) => A
```

Added in v2.0.0

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(fa: A) => <B>(fab: (a: A) => B) => B
```

Added in v2.0.0

## apFirst

**Signature**

```ts
export declare const apFirst: <B>(fb: B) => <A>(fa: A) => A
```

Added in v2.0.0

## apSecond

**Signature**

```ts
export declare const apSecond: <B>(fb: B) => <A>(fa: A) => B
```

Added in v2.0.0

# Extend

## duplicate

**Signature**

```ts
export declare const duplicate: <A>(ma: A) => A
```

Added in v2.0.0

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: A) => B) => (wa: A) => B
```

Added in v2.0.0

# Extract

## extract

**Signature**

```ts
export declare const extract: <A>(wa: A) => A
```

Added in v2.6.2

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: A) => M
```

Added in v2.0.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: A) => B
```

Added in v2.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: A) => B
```

Added in v2.0.0

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: A) => B
```

Added in v2.0.0

# Model

## Identity (type alias)

**Signature**

```ts
export type Identity<A> = A
```

Added in v2.0.0

## URI

**Signature**

```ts
export declare const URI: 'Identity'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# Monad

## chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => B) => (ma: A) => B
```

Added in v2.0.0

## chainFirst

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => B) => (ma: A) => A
```

Added in v2.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: A) => A
```

Added in v2.0.0

# instances

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<A>
```

Added in v2.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<A>
```

Added in v2.0.0

## identity

**Signature**

```ts
export declare const identity: Monad1<'Identity'> &
  Foldable1<'Identity'> &
  Traversable1<'Identity'> &
  Alt1<'Identity'> &
  Comonad1<'Identity'> &
  ChainRec1<'Identity'>
```

Added in v2.0.0
