---
title: Identity.ts
nav_order: 39
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Identity (type alias)](#identity-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [getEq (constant)](#geteq-constant)
- [getShow (constant)](#getshow-constant)
- [identity (constant)](#identity-constant)
- [alt (export)](#alt-export)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [duplicate (export)](#duplicate-export)
- [extend (export)](#extend-export)
- [flatten (export)](#flatten-export)
- [foldMap (export)](#foldmap-export)
- [map (export)](#map-export)
- [reduce (export)](#reduce-export)
- [reduceRight (export)](#reduceright-export)

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

# URI (constant)

**Signature**

```ts
export const URI: "Identity" = ...
```

Added in v2.0.0

# getEq (constant)

**Signature**

```ts
export const getEq: <A>(E: Eq<A>) => Eq<Identity<A>> = ...
```

Added in v2.0.0

# getShow (constant)

**Signature**

```ts
export const getShow: <A>(S: Show<A>) => Show<Identity<A>> = ...
```

Added in v2.0.0

# identity (constant)

**Signature**

```ts
export const identity: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI> = ...
```

Added in v2.0.0

# alt (export)

**Signature**

```ts
;<A>(that: () => A) => (fa: A) => A
```

Added in v2.0.0

# ap (export)

**Signature**

```ts
;<A>(fa: A) => <B>(fab: (a: A) => B) => B
```

Added in v2.0.0

# apFirst (export)

**Signature**

```ts
;<B>(fb: B) => <A>(fa: A) => A
```

Added in v2.0.0

# apSecond (export)

**Signature**

```ts
;<B>(fb: B) => <A>(fa: A) => B
```

Added in v2.0.0

# chain (export)

**Signature**

```ts
;<A, B>(f: (a: A) => B) => (ma: A) => B
```

Added in v2.0.0

# chainFirst (export)

**Signature**

```ts
;<A, B>(f: (a: A) => B) => (ma: A) => A
```

Added in v2.0.0

# duplicate (export)

**Signature**

```ts
;<A>(ma: A) => A
```

Added in v2.0.0

# extend (export)

**Signature**

```ts
;<A, B>(f: (fa: A) => B) => (ma: A) => B
```

Added in v2.0.0

# flatten (export)

**Signature**

```ts
;<A>(mma: A) => A
```

Added in v2.0.0

# foldMap (export)

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: A) => M
```

Added in v2.0.0

# map (export)

**Signature**

```ts
;<A, B>(f: (a: A) => B) => (fa: A) => B
```

Added in v2.0.0

# reduce (export)

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: A) => B
```

Added in v2.0.0

# reduceRight (export)

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: A) => B
```

Added in v2.0.0
