---
title: Identity.ts
nav_order: 40
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Identity (type alias)](#identity-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [identity (constant)](#identity-constant)
- [getSetoid (function)](#getsetoid-function)
- [getShow (function)](#getshow-function)

---

# Identity (type alias)

**Signature**

```ts
export type Identity<A> = A
```

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

# identity (constant)

**Signature**

```ts
export const identity: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI> = ...
```

Added in v1.0.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Identity<A>> => ...
```

Added in v1.0.0

# getShow (function)

**Signature**

```ts
export const getShow = <A>(S: Show<A>): Show<Identity<A>> => ...
```

Added in v1.17.0
