---
title: HKT.ts
nav_order: 39
parent: Modules
---

## HKT overview

Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [HKT (interface)](#hkt-interface)
  - [HKT2 (interface)](#hkt2-interface)
  - [HKT3 (interface)](#hkt3-interface)
  - [HKT4 (interface)](#hkt4-interface)
  - [Kind (type alias)](#kind-type-alias)
  - [Kind2 (type alias)](#kind2-type-alias)
  - [Kind3 (type alias)](#kind3-type-alias)
  - [Kind4 (type alias)](#kind4-type-alias)
  - [URIS (type alias)](#uris-type-alias)
  - [URIS2 (type alias)](#uris2-type-alias)
  - [URIS3 (type alias)](#uris3-type-alias)
  - [URIS4 (type alias)](#uris4-type-alias)
  - [URItoKind (interface)](#uritokind-interface)
  - [URItoKind2 (interface)](#uritokind2-interface)
  - [URItoKind3 (interface)](#uritokind3-interface)
  - [URItoKind4 (interface)](#uritokind4-interface)

---

# utils

## HKT (interface)

`* -> *` constructors

**Signature**

```ts
export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}
```

Added in v2.0.0

## HKT2 (interface)

`* -> * -> *` constructors

**Signature**

```ts
export interface HKT2<URI, E, A> extends HKT<URI, A> {
  readonly _E: E
}
```

Added in v2.0.0

## HKT3 (interface)

`* -> * -> * -> *` constructors

**Signature**

```ts
export interface HKT3<URI, R, E, A> extends HKT2<URI, E, A> {
  readonly _R: R
}
```

Added in v2.0.0

## HKT4 (interface)

`* -> * -> * -> * -> *` constructors

**Signature**

```ts
export interface HKT4<URI, S, R, E, A> extends HKT3<URI, R, E, A> {
  readonly _S: S
}
```

Added in v2.0.0

## Kind (type alias)

`* -> *` constructors

**Signature**

```ts
export type Kind<URI extends URIS, A> = URI extends URIS ? URItoKind<A>[URI] : any
```

Added in v2.0.0

## Kind2 (type alias)

`* -> * -> *` constructors

**Signature**

```ts
export type Kind2<URI extends URIS2, E, A> = URI extends URIS2 ? URItoKind2<E, A>[URI] : any
```

Added in v2.0.0

## Kind3 (type alias)

`* -> * -> * -> *` constructors

**Signature**

```ts
export type Kind3<URI extends URIS3, R, E, A> = URI extends URIS3 ? URItoKind3<R, E, A>[URI] : any
```

Added in v2.0.0

## Kind4 (type alias)

`* -> * -> * -> * -> *` constructors

**Signature**

```ts
export type Kind4<URI extends URIS4, S, R, E, A> = URI extends URIS4 ? URItoKind4<S, R, E, A>[URI] : any
```

Added in v2.0.0

## URIS (type alias)

`* -> *` constructors

**Signature**

```ts
export type URIS = keyof URItoKind<any>
```

Added in v2.0.0

## URIS2 (type alias)

`* -> * -> *` constructors

**Signature**

```ts
export type URIS2 = keyof URItoKind2<any, any>
```

Added in v2.0.0

## URIS3 (type alias)

`* -> * -> * -> *` constructors

**Signature**

```ts
export type URIS3 = keyof URItoKind3<any, any, any>
```

Added in v2.0.0

## URIS4 (type alias)

`* -> * -> * -> * -> *` constructors

**Signature**

```ts
export type URIS4 = keyof URItoKind4<any, any, any, any>
```

Added in v2.0.0

## URItoKind (interface)

`* -> *` constructors

**Signature**

```ts
export interface URItoKind<A> {}
```

Added in v2.0.0

## URItoKind2 (interface)

`* -> * -> *` constructors

**Signature**

```ts
export interface URItoKind2<E, A> {}
```

Added in v2.0.0

## URItoKind3 (interface)

`* -> * -> * -> *` constructors

**Signature**

```ts
export interface URItoKind3<R, E, A> {}
```

Added in v2.0.0

## URItoKind4 (interface)

`* -> * -> * -> * -> *` constructors

**Signature**

```ts
export interface URItoKind4<S, R, E, A> {}
```

Added in v2.0.0
