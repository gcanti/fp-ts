---
title: IxIO.ts
nav_order: 48
---

**Table of contents**

- [URI (type alias)](#uri-type-alias)
- [IxIO (class)](#ixio-class)
  - [run (method)](#run-method)
  - [ichain (method)](#ichain-method)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [chain (method)](#chain-method)
- [URI (constant)](#uri-constant)
- [ixIO (constant)](#ixio-constant)
- [getMonad (function)](#getmonad-function)
- [iof (function)](#iof-function)# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# IxIO (class)

**Signature**

```ts
export class IxIO<I, O, A> {
  constructor(readonly value: IO<A>) { ... }
  ...
}
```

Added in v1.0.0

## run (method)

**Signature**

```ts
run(): A { ... }
```

## ichain (method)

**Signature**

```ts
ichain<Z, B>(f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B> { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): IxIO<I, O, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: IxIO<I, I, (a: A) => B>): IxIO<I, I, B> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => IxIO<I, I, B>): IxIO<I, I, B> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# ixIO (constant)

**Signature**

```ts
export const ixIO: IxMonad3<URI> = ...
```

Added in v1.0.0

# getMonad (function)

**Signature**

```ts
export const getMonad = <I = never>(): Monad3C<URI, I, I> => ...
```

Added in v1.0.0

# iof (function)

**Signature**

```ts
export const iof = <I, A>(a: A): IxIO<I, I, A> => ...
```

Added in v1.0.0
