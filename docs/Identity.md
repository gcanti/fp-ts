---
id: Identity
title: Module Identity
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts)

# Identity

```ts
constructor(readonly value: A) {}
```

Added in v1.0.0 (data)

## alt

```ts
(fx: Identity<A>): Identity<A>
```

Added in v1.0.0 (method)

## ap

```ts
<B>(fab: Identity<(a: A) => B>): Identity<B>
```

Added in v1.0.0 (method)

## ap\_

```ts
<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C>
```

Added in v1.0.0 (method)

Flipped version of [ap](#ap)

## chain

```ts
<B>(f: (a: A) => Identity<B>): Identity<B>
```

Added in v1.0.0 (method)

## extend

```ts
<B>(f: (ea: Identity<A>) => B): Identity<B>
```

Added in v1.0.0 (method)

## extract

```ts
(): A
```

Added in v1.0.0 (method)

## fold

```ts
<B>(f: (a: A) => B): B
```

Added in v1.0.0 (method)

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

## map

```ts
<B>(f: (a: A) => B): Identity<B>
```

Added in v1.0.0 (method)

## orElse

```ts
(fx: Lazy<Identity<A>>): Identity<A>
```

Added in v1.6.0 (method)

Lazy version of [alt](#alt)

_Example_

```ts
import { Identity } from 'fp-ts/lib/Identity'

const a = new Identity(1)
assert.deepEqual(a.orElse(() => new Identity(2)), a)
```

## reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

Added in v1.0.0 (method)

## toString

```ts
(): string
```

Added in v1.0.0 (method)

## identity

```ts
Monad1<URI> &
  Foldable2v1<URI> &
  Traversable2v1<URI> &
  Alt1<URI> &
  Comonad1<URI> &
  ChainRec1<URI>
```

Added in v1.0.0 (instance)

## getSetoid

```ts
<A>(setoid: Setoid<A>): Setoid<Identity<A>>
```

Added in v1.0.0 (function)
