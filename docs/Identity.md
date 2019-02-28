---
id: Identity
title: Identity
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts)

# Identity

**Signature** (data type)

```ts
export class Identity<A> {
  constructor(readonly value: A) {}
  ...
}
```

## alt

**Signature** (method)

```ts
alt(fx: Identity<A>): Identity<A>  { ... }
```

Added in v1.0.0

## ap

**Signature** (method)

```ts
ap<B>(fab: Identity<(a: A) => B>): Identity<B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method)

```ts
ap_<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C>  { ... }
```

Added in v1.0.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => Identity<B>): Identity<B>  { ... }
```

Added in v1.0.0

## extend

**Signature** (method)

```ts
extend<B>(f: (ea: Identity<A>) => B): Identity<B>  { ... }
```

Added in v1.0.0

## extract

**Signature** (method)

```ts
extract(): A  { ... }
```

Added in v1.0.0

## fold

**Signature** (method)

```ts
fold<B>(f: (a: A) => B): B  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Identity<B>  { ... }
```

Added in v1.0.0

## orElse

Lazy version of [alt](#alt)

**Signature** (method)

```ts
orElse(fx: Lazy<Identity<A>>): Identity<A>  { ... }
```

**Example**

```ts
import { Identity } from 'fp-ts/lib/Identity'

const a = new Identity(1)
assert.deepStrictEqual(a.orElse(() => new Identity(2)), a)
```

Added in v1.6.0

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.0.0

## toString

**Signature** (method)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## identity

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

## getSetoid

**Signature** (function)

```ts
export const getSetoid = <A>(setoid: Setoid<A>): Setoid<Identity<A>> => { ... }
```

Added in v1.0.0
