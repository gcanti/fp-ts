---
title: HKT.ts
nav_order: 42
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
- [~~URI2HKT~~ (interface)](#uri2hkt-interface)
- [~~URI2HKT2~~ (interface)](#uri2hkt2-interface)
- [~~URI2HKT3~~ (interface)](#uri2hkt3-interface)
- [~~URI2HKT4~~ (interface)](#uri2hkt4-interface)
- [URItoKind (interface)](#uritokind-interface)
- [URItoKind2 (interface)](#uritokind2-interface)
- [URItoKind3 (interface)](#uritokind3-interface)
- [URItoKind4 (interface)](#uritokind4-interface)
- [Kind (type alias)](#kind-type-alias)
- [Kind2 (type alias)](#kind2-type-alias)
- [Kind3 (type alias)](#kind3-type-alias)
- [Kind4 (type alias)](#kind4-type-alias)
- [~~Type~~ (type alias)](#type-type-alias)
- [~~Type2~~ (type alias)](#type2-type-alias)
- [~~Type3~~ (type alias)](#type3-type-alias)
- [~~Type4~~ (type alias)](#type4-type-alias)
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

# HKT2 (interface)

`* -> * -> *` constructors

**Signature**

```ts
export interface HKT2<URI, L, A> extends HKT<URI, A> {
  readonly _L: L
}
```

# HKT3 (interface)

`* -> * -> * -> *` constructors

**Signature**

```ts
export interface HKT3<URI, U, L, A> extends HKT2<URI, L, A> {
  readonly _U: U
}
```

# HKT4 (interface)

`* -> * -> * -> * -> *` constructors

**Signature**

```ts
export interface HKT4<URI, X, U, L, A> extends HKT3<URI, U, L, A> {
  readonly _X: X
}
```

# ~~URI2HKT~~ (interface)

Use `URItoKind` instead
`* -> *` constructors

**Signature**

```ts
export interface URI2HKT<A> {}
```

# ~~URI2HKT2~~ (interface)

Use `URItoKind2` instead
`* -> * -> *` constructors

**Signature**

```ts
export interface URI2HKT2<L, A> {}
```

# ~~URI2HKT3~~ (interface)

Use `URItoKind3` instead
`* -> * -> * -> *` constructors

**Signature**

```ts
export interface URI2HKT3<U, L, A> {}
```

# ~~URI2HKT4~~ (interface)

Use `URItoKind4` instead
`* -> * -> * -> * -> *` constructors

**Signature**

```ts
export interface URI2HKT4<X, U, L, A> {}
```

# URItoKind (interface)

**Signature**

```ts
export interface URItoKind<A> extends URI2HKT<A> {}
```

# URItoKind2 (interface)

**Signature**

```ts
export interface URItoKind2<L, A> extends URI2HKT2<L, A> {}
```

# URItoKind3 (interface)

**Signature**

```ts
export interface URItoKind3<U, L, A> extends URI2HKT3<U, L, A> {}
```

# URItoKind4 (interface)

**Signature**

```ts
export interface URItoKind4<X, U, L, A> extends URI2HKT4<X, U, L, A> {}
```

# Kind (type alias)

`* -> *` constructors

**Signature**

```ts
export type Kind<URI extends URIS, A> = URI extends URIS ? URItoKind<A>[URI] : any
```

# Kind2 (type alias)

`* -> * -> *` constructors

**Signature**

```ts
export type Kind2<URI extends URIS2, L, A> = URI extends URIS2 ? URItoKind2<L, A>[URI] : any
```

# Kind3 (type alias)

`* -> * -> * -> *` constructors

**Signature**

```ts
export type Kind3<URI extends URIS3, U, L, A> = URI extends URIS3 ? URItoKind3<U, L, A>[URI] : any
```

# Kind4 (type alias)

`* -> * -> * -> * -> *` constructors

**Signature**

```ts
export type Kind4<URI extends URIS4, X, U, L, A> = URI extends URIS4 ? URItoKind4<X, U, L, A>[URI] : any
```

# ~~Type~~ (type alias)

Use `Kind` instead

**Signature**

```ts
export type Type<URI extends URIS, A> = Kind<URI, A>
```

# ~~Type2~~ (type alias)

Use `Kind2` instead

**Signature**

```ts
export type Type2<URI extends URIS2, L, A> = Kind2<URI, L, A>
```

# ~~Type3~~ (type alias)

Use `Kind3` instead

**Signature**

```ts
export type Type3<URI extends URIS3, U, L, A> = Kind3<URI, U, L, A>
```

# ~~Type4~~ (type alias)

Use `Kind4` instead

**Signature**

```ts
export type Type4<URI extends URIS4, X, U, L, A> = Kind4<URI, X, U, L, A>
```

# URIS (type alias)

`* -> *` constructors

**Signature**

```ts
export type URIS = keyof URItoKind<any>
```

# URIS2 (type alias)

`* -> * -> *` constructors

**Signature**

```ts
export type URIS2 = keyof URItoKind2<any, any>
```

# URIS3 (type alias)

`* -> * -> * -> *` constructors

**Signature**

```ts
export type URIS3 = keyof URItoKind3<any, any, any>
```

# URIS4 (type alias)

`* -> * -> * -> * -> *` constructors

**Signature**

```ts
export type URIS4 = keyof URItoKind4<any, any, any, any>
```
