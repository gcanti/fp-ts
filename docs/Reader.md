---
id: Reader
title: Reader
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts)

# Reader

**Signature** (data type)

```ts
export class Reader<E, A> {
  constructor(readonly run: (e: E) => A) {}
  ...
}
```

## ap

**Signature** (method)

```ts
ap<B>(fab: Reader<E, (a: A) => B>): Reader<E, B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: Reader<E, (b: B) => C>, fb: Reader<E, B>): Reader<E, C>  { ... }
```

Added in v1.0.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => Reader<E, B>): Reader<E, B>  { ... }
```

Added in v1.0.0

## local

**Signature** (method)

```ts
local<E2 = E>(f: (e: E2) => E): Reader<E2, A>  { ... }
```

Added in v1.6.1

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Reader<E, B>  { ... }
```

Added in v1.0.0

Added in v1.0.0

## reader

**Signature** (constant)

```ts
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = ...
```

Added in v1.0.0

## ask

reads the current context

**Signature** (function)

```ts
export const ask = <E>(): Reader<E, E> => { ... }
```

Added in v1.0.0

## asks

Projects a value from the global context in a Reader

**Signature** (function)

```ts
export const asks = <E, A>(f: (e: E) => A): Reader<E, A> => { ... }
```

Added in v1.0.0

## getMonoid

**Signature** (function)

```ts
export const getMonoid = <E, A>(M: Monoid<A>): Monoid<Reader<E, A>> => { ... }
```

Added in v1.14.0

## getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <E, A>(S: Semigroup<A>): Semigroup<Reader<E, A>> => { ... }
```

Added in v1.14.0

## local

changes the value of the local context during the execution of the action `fa`

**Signature** (function)

```ts
export const local = <E, E2 = E>(f: (e: E2) => E) => <A>(fa: Reader<E, A>): Reader<E2, A> => { ... }
```

Added in v1.0.0
