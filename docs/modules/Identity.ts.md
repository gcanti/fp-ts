---
title: Identity.ts
nav_order: 40
parent: Modules
---

# Identity overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Identity (type alias)](#identity-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [duplicate](#duplicate)
- [extend](#extend)
- [flatten](#flatten)
- [foldMap](#foldmap)
- [getEq](#geteq)
- [getShow](#getshow)
- [identity](#identity)
- [map](#map)
- [reduce](#reduce)
- [reduceRight](#reduceright)

---

# Identity (type alias)

**Signature**

```ts
export type Identity<A> = A
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI

**Signature**

```ts
export const URI: "Identity" = ...
```

Added in v2.0.0

# alt

**Signature**

```ts
;<A>(that: () => A) => (fa: A) => A
```

Added in v2.0.0

# ap

**Signature**

```ts
;<A>(fa: A) => <B>(fab: (a: A) => B) => B
```

Added in v2.0.0

# apFirst

**Signature**

```ts
;<B>(fb: B) => <A>(fa: A) => A
```

Added in v2.0.0

# apSecond

**Signature**

```ts
;<B>(fb: B) => <A>(fa: A) => B
```

Added in v2.0.0

# chain

**Signature**

```ts
;<A, B>(f: (a: A) => B) => (ma: A) => B
```

Added in v2.0.0

# chainFirst

**Signature**

```ts
;<A, B>(f: (a: A) => B) => (ma: A) => A
```

Added in v2.0.0

# duplicate

**Signature**

```ts
;<A>(ma: A) => A
```

Added in v2.0.0

# extend

**Signature**

```ts
;<A, B>(f: (fa: A) => B) => (ma: A) => B
```

Added in v2.0.0

# flatten

**Signature**

```ts
;<A>(mma: A) => A
```

Added in v2.0.0

# foldMap

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: A) => M
```

Added in v2.0.0

# getEq

**Signature**

```ts
export const getEq: <A>(E: Eq<A>) => Eq<Identity<A>> = ...
```

Added in v2.0.0

# getShow

**Signature**

```ts
export const getShow: <A>(S: Show<A>) => Show<Identity<A>> = ...
```

Added in v2.0.0

# identity

**Signature**

```ts
export const identity: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI> = ...
```

Added in v2.0.0

# map

**Signature**

```ts
;<A, B>(f: (a: A) => B) => (fa: A) => B
```

Added in v2.0.0

# reduce

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: A) => B
```

Added in v2.0.0

# reduceRight

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: A) => B
```

Added in v2.0.0
