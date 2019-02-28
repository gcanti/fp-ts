---
title: IxIO.ts
nav_order: 48
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [URI](#uri)
- [IxIO](#ixio)
  - [run](#run)
  - [ichain](#ichain)
  - [map](#map)
  - [ap](#ap)
  - [chain](#chain)
- [URI](#uri-1)
- [ixIO](#ixio)
- [getMonad](#getmonad)
- [iof](#iof)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# IxIO

**Signature** (class)

```ts
export class IxIO<I, O, A> {
  constructor(readonly value: IO<A>) { ... }
  ...
}
```

Added in v1.0.0

## run

**Signature** (method)

```ts
run(): A { ... }
```

## ichain

**Signature** (method)

```ts
ichain<Z, B>(f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B> { ... }
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): IxIO<I, O, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: IxIO<I, I, (a: A) => B>): IxIO<I, I, B> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => IxIO<I, I, B>): IxIO<I, I, B> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# ixIO

**Signature** (constant)

```ts
export const ixIO: IxMonad3<URI> = ...
```

Added in v1.0.0

# getMonad

**Signature** (function)

```ts
export const getMonad = <I = never>(): Monad3C<URI, I, I> => ...
```

Added in v1.0.0

# iof

**Signature** (function)

```ts
export const iof = <I, A>(a: A): IxIO<I, I, A> => ...
```

Added in v1.0.0
