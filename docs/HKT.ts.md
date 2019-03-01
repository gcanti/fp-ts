---
title: HKT.ts
nav_order: 41
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Overview](#overview)
- [HKT](#hkt)
- [HKT2](#hkt2)
- [HKT3](#hkt3)
- [HKT4](#hkt4)
- [URI2HKT](#uri2hkt)
- [URI2HKT2](#uri2hkt2)
- [URI2HKT3](#uri2hkt3)
- [URI2HKT4](#uri2hkt4)
- [Type](#type)
- [Type2](#type2)
- [Type3](#type3)
- [Type4](#type4)
- [URIS](#uris)
- [URIS2](#uris2)
- [URIS3](#uris3)
- [URIS4](#uris4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))

# HKT

**Signature** (interface)

```ts
export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}
```

# HKT2

`* -> * -> *` constructors

**Signature** (interface)

```ts
export interface HKT2<URI, L, A> extends HKT<URI, A> {
  readonly _L: L
}
```

# HKT3

`* -> * -> * -> *` constructors

**Signature** (interface)

```ts
export interface HKT3<URI, U, L, A> extends HKT2<URI, L, A> {
  readonly _U: U
}
```

# HKT4

`* -> * -> * -> * -> *` constructors

**Signature** (interface)

```ts
export interface HKT4<URI, X, U, L, A> extends HKT3<URI, U, L, A> {
  readonly _X: X
}
```

# URI2HKT

`* -> *` constructors

**Signature** (interface)

```ts
export interface URI2HKT<A> {}
```

# URI2HKT2

`* -> * -> *` constructors

**Signature** (interface)

```ts
export interface URI2HKT2<L, A> {}
```

# URI2HKT3

`* -> * -> * -> *` constructors

**Signature** (interface)

```ts
export interface URI2HKT3<U, L, A> {}
```

# URI2HKT4

`* -> * -> * -> * -> *` constructors

**Signature** (interface)

```ts
export interface URI2HKT4<X, U, L, A> {}
```

# Type

`* -> *` constructors

**Signature** (type alias)

```ts
export type Type<URI extends URIS, A> = {} & URI2HKT<A>[URI]
```

# Type2

`* -> * -> *` constructors

**Signature** (type alias)

```ts
export type Type2<URI extends URIS2, L, A> = {} & URI2HKT2<L, A>[URI]
```

# Type3

`* -> * -> * -> *` constructors

**Signature** (type alias)

```ts
export type Type3<URI extends URIS3, U, L, A> = {} & URI2HKT3<U, L, A>[URI]
```

# Type4

`* -> * -> * -> * -> *` constructors

**Signature** (type alias)

```ts
export type Type4<URI extends URIS4, X, U, L, A> = {} & URI2HKT4<X, U, L, A>[URI]
```

# URIS

`* -> *` constructors

**Signature** (type alias)

```ts
export type URIS = keyof URI2HKT<any>
```

# URIS2

`* -> * -> *` constructors

**Signature** (type alias)

```ts
export type URIS2 = keyof URI2HKT2<any, any>
```

# URIS3

`* -> * -> * -> *` constructors

**Signature** (type alias)

```ts
export type URIS3 = keyof URI2HKT3<any, any, any>
```

# URIS4

`* -> * -> * -> * -> *` constructors

**Signature** (type alias)

```ts
export type URIS4 = keyof URI2HKT4<any, any, any, any>
```
