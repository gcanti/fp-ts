---
id: IO
title: Module IO
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts)

# IO

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts#L24-L63)

```ts
export class IO<A> {
  constructor(readonly run: Lazy<A>) {}
  ...
}
```

`IO<A>` represents a synchronous computation that yields a value of type `A` and **never fails**.
If you want to represent a synchronous computation that may fail, please see [IOEither](./IOEither.md).

## ap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts#L31-L33)

```ts
ap<B>(fab: IO<(a: A) => B>): IO<B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts#L37-L39)

```ts
ap_<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C>  { ... }
```

Added in v1.0.0

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts#L44-L46)

```ts
applyFirst<B>(fb: IO<B>): IO<A>  { ... }
```

Added in v1.6.0

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts#L51-L53)

```ts
applySecond<B>(fb: IO<B>): IO<B>  { ... }
```

Added in v1.5.0

## chain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts#L54-L56)

```ts
chain<B>(f: (a: A) => IO<B>): IO<B>  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts#L57-L59)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts#L28-L30)

```ts
map<B>(f: (a: A) => B): IO<B>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts#L60-L62)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## io

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts#L107-L114)

```ts
export const io: Monad1<URI> & MonadIO1<URI> = ...
```

Added in v1.0.0

## getMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts#L98-L100)

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => { ... }
```

Added in v1.0.0

## getSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts#L84-L93)

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => { ... }
```

Added in v1.0.0
