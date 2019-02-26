---
id: Identity
title: Identity
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts)

# Identity

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L29-L84)

```ts
export class Identity<A> {
  constructor(readonly value: A) {}
  ...
}
```

## alt

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L51-L53)

```ts
alt(fx: Identity<A>): Identity<A>  { ... }
```

Added in v1.0.0

## ap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L36-L38)

```ts
ap<B>(fab: Identity<(a: A) => B>): Identity<B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L42-L44)

```ts
ap_<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C>  { ... }
```

Added in v1.0.0

## chain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L45-L47)

```ts
chain<B>(f: (a: A) => Identity<B>): Identity<B>  { ... }
```

Added in v1.0.0

## extend

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L72-L74)

```ts
extend<B>(f: (ea: Identity<A>) => B): Identity<B>  { ... }
```

Added in v1.0.0

## extract

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L69-L71)

```ts
extract(): A  { ... }
```

Added in v1.0.0

## fold

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L75-L77)

```ts
fold<B>(f: (a: A) => B): B  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L78-L80)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L33-L35)

```ts
map<B>(f: (a: A) => B): Identity<B>  { ... }
```

Added in v1.0.0

## orElse

Lazy version of [alt](#alt)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L66-L68)

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

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L48-L50)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.0.0

## toString

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L81-L83)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## identity

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L148-L168)

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

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts#L89-L91)

```ts
export const getSetoid = <A>(setoid: Setoid<A>): Setoid<Identity<A>> => { ... }
```

Added in v1.0.0
