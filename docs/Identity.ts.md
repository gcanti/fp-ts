---
title: Identity.ts
nav_order: 42
---

**Table of contents**

- [URI (type alias)](#uri-type-alias)
- [Identity (class)](#identity-class)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
  - [reduce (method)](#reduce-method)
  - [alt (method)](#alt-method)
  - [orElse (method)](#orelse-method)
  - [extract (method)](#extract-method)
  - [extend (method)](#extend-method)
  - [fold (method)](#fold-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
- [URI (constant)](#uri-constant)
- [identity (constant)](#identity-constant)
- [getSetoid (function)](#getsetoid-function)

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Identity (class)

**Signature**

```ts
export class Identity<A> {
  constructor(readonly value: A) { ... }
  ...
}
```

Added in v1.0.0

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Identity<B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: Identity<(a: A) => B>): Identity<B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => Identity<B>): Identity<B> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## alt (method)

**Signature**

```ts
alt(fx: Identity<A>): Identity<A> { ... }
```

## orElse (method)

Lazy version of `alt`

**Signature**

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

## extract (method)

**Signature**

```ts
extract(): A { ... }
```

## extend (method)

**Signature**

```ts
extend<B>(f: (ea: Identity<A>) => B): Identity<B> { ... }
```

## fold (method)

**Signature**

```ts
fold<B>(f: (a: A) => B): B { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# identity (constant)

**Signature**

```ts
export const identity: Monad1<URI> &
  Foldable2v1<URI> &
  Traversable2v1<URI> &
  Alt1<URI> &
  Comonad1<URI> &
  ChainRec1<URI> = ...
```

Added in v1.0.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <A>(setoid: Setoid<A>): Setoid<Identity<A>> => ...
```

Added in v1.0.0
