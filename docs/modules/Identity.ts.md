---
title: Identity.ts
nav_order: 42
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
export const URI = ...
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
