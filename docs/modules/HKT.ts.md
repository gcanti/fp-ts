---
title: HKT.ts
nav_order: 41
parent: Modules
---

# Overview

Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))

---

<h2 class="text-delta">Table of contents</h2>

- [HKT (interface)](#hkt-interface)
- [HKT2 (interface)](#hkt2-interface)
- [HKT3 (interface)](#hkt3-interface)
- [HKT4 (interface)](#hkt4-interface)
- [URI2HKT (interface)](#uri2hkt-interface)
- [URI2HKT2 (interface)](#uri2hkt2-interface)
- [URI2HKT3 (interface)](#uri2hkt3-interface)
- [URI2HKT4 (interface)](#uri2hkt4-interface)
- [Type (type alias)](#type-type-alias)
- [Type2 (type alias)](#type2-type-alias)
- [Type3 (type alias)](#type3-type-alias)
- [Type4 (type alias)](#type4-type-alias)
- [URIS (type alias)](#uris-type-alias)
- [URIS2 (type alias)](#uris2-type-alias)
- [URIS3 (type alias)](#uris3-type-alias)
- [URIS4 (type alias)](#uris4-type-alias)

---

# HKT (interface)

**Signature**

```ts
export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}
```

Added in v2.0.0

# HKT2 (interface)

`* -> * -> *` constructors

**Signature**

```ts
export interface HKT2<URI, L, A> extends HKT<URI, A> {
  readonly _L: L
}
```

Added in v2.0.0

# HKT3 (interface)

`* -> * -> * -> *` constructors

**Signature**

```ts
export interface HKT3<URI, U, L, A> extends HKT2<URI, L, A> {
  readonly _U: U
}
```

Added in v2.0.0

# HKT4 (interface)

`* -> * -> * -> * -> *` constructors

**Signature**

```ts
export interface HKT4<URI, X, U, L, A> extends HKT3<URI, U, L, A> {
  readonly _X: X
}
```

Added in v2.0.0

# URI2HKT (interface)

`* -> *` constructors

**Signature**

```ts
export interface URI2HKT<A> {}
```

Added in v2.0.0

# URI2HKT2 (interface)

`* -> * -> *` constructors

**Signature**

```ts
export interface URI2HKT2<L, A> {}
```

Added in v2.0.0

# URI2HKT3 (interface)

`* -> * -> * -> *` constructors

**Signature**

```ts
export interface URI2HKT3<U, L, A> {}
```

Added in v2.0.0

# URI2HKT4 (interface)

`* -> * -> * -> * -> *` constructors

**Signature**

```ts
export interface URI2HKT4<X, U, L, A> {}
```

Added in v2.0.0

# Type (type alias)

`* -> *` constructors

**Signature**

```ts
export type Type<URI extends URIS, A> = URI extends URIS ? URI2HKT<A>[URI] : any
```

Added in v2.0.0

# Type2 (type alias)

`* -> * -> *` constructors

**Signature**

```ts
export type Type2<URI extends URIS2, L, A> = URI extends URIS2 ? URI2HKT2<L, A>[URI] : any
```

Added in v2.0.0

# Type3 (type alias)

`* -> * -> * -> *` constructors

**Signature**

```ts
export type Type3<URI extends URIS3, U, L, A> = URI extends URIS3 ? URI2HKT3<U, L, A>[URI] : any
```

Added in v2.0.0

# Type4 (type alias)

`* -> * -> * -> * -> *` constructors

**Signature**

```ts
export type Type4<URI extends URIS4, X, U, L, A> = URI extends URIS4 ? URI2HKT4<X, U, L, A>[URI] : any
```

Added in v2.0.0

# URIS (type alias)

`* -> *` constructors

**Signature**

```ts
export type URIS = keyof URI2HKT<any>
```

Added in v2.0.0

# URIS2 (type alias)

`* -> * -> *` constructors

**Signature**

```ts
export type URIS2 = keyof URI2HKT2<any, any>
```

Added in v2.0.0

# URIS3 (type alias)

`* -> * -> * -> *` constructors

**Signature**

```ts
export type URIS3 = keyof URI2HKT3<any, any, any>
```

Added in v2.0.0

# URIS4 (type alias)

`* -> * -> * -> * -> *` constructors

**Signature**

```ts
export type URIS4 = keyof URI2HKT4<any, any, any, any>
```

Added in v2.0.0
