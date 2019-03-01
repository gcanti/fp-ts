---
title: Identity.ts
nav_order: 42
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [URI](#uri)
- [Identity](#identity)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [chain](#chain)
  - [reduce](#reduce)
  - [alt](#alt)
  - [orElse](#orelse)
  - [extract](#extract)
  - [extend](#extend)
  - [fold](#fold)
  - [inspect](#inspect)
  - [toString](#tostring)
- [URI](#uri-1)
- [identity](#identity)
- [getSetoid](#getsetoid)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# Identity

**Signature** (class)

```ts
export class Identity<A> {
  constructor(readonly value: A) { ... }
  ...
}
```

Added in v1.0.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Identity<B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: Identity<(a: A) => B>): Identity<B> { ... }
```

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => Identity<B>): Identity<B> { ... }
```

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## alt

**Signature** (method)

```ts
alt(fx: Identity<A>): Identity<A> { ... }
```

## orElse

Lazy version of `alt`

**Signature** (method)

```ts
orElse(fx: Lazy<Identity<A>>): Identity<A> { ... }
```

**Example**

```ts
import { Identity } from 'fp-ts/lib/Identity'

const a = new Identity(1)
assert.deepStrictEqual(a.orElse(() => new Identity(2)), a)
```

Added in v1.6.0

## extract

**Signature** (method)

```ts
extract(): A { ... }
```

## extend

**Signature** (method)

```ts
extend<B>(f: (ea: Identity<A>) => B): Identity<B> { ... }
```

## fold

**Signature** (method)

```ts
fold<B>(f: (a: A) => B): B { ... }
```

## inspect

**Signature** (method)

```ts
inspect(): string { ... }
```

## toString

**Signature** (method)

```ts
toString(): string { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# identity

**Signature** (constant)

```ts
export const identity: Monad1<URI> &
  Foldable2v1<URI> &
  Traversable2v1<URI> &
  Alt1<URI> &
  Comonad1<URI> &
  ChainRec1<URI> = ...
```

Added in v1.0.0

# getSetoid

**Signature** (function)

```ts
export const getSetoid = <A>(setoid: Setoid<A>): Setoid<Identity<A>> => ...
```

Added in v1.0.0
