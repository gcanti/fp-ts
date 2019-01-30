---
id: IOEither
title: Module IOEither
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts)

# IOEither

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L32-L85)

```ts
export class IOEither<L, A> {
  constructor(readonly value: IO<Either<L, A>>) {}
  ...
}
```

`IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `L`. If you want to represent a synchronous computation that never fails, please see [IO](./IO.md).

## alt

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L79-L81)

```ts
alt(fy: IOEither<L, A>): IOEither<L, A>  { ... }
```

Added in v1.6.0

## ap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L46-L48)

```ts
ap<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B>  { ... }
```

Added in v1.6.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L52-L54)

```ts
ap_<B, C>(this: IOEither<L, (b: B) => C>, fb: IOEither<L, B>): IOEither<L, C>  { ... }
```

Added in v1.6.0

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L58-L60)

```ts
applyFirst<B>(fb: IOEither<L, B>): IOEither<L, A>  { ... }
```

Added in v1.6.0

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L64-L66)

```ts
applySecond<B>(fb: IOEither<L, B>): IOEither<L, B>  { ... }
```

Added in v1.6.0

## bimap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L82-L84)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B>  { ... }
```

Added in v1.6.0

## chain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L67-L69)

```ts
chain<B>(f: (a: A) => IOEither<L, B>): IOEither<L, B>  { ... }
```

Added in v1.6.0

## fold

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L70-L72)

```ts
fold<R>(left: (l: L) => R, right: (a: A) => R): IO<R>  { ... }
```

Added in v1.6.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L43-L45)

```ts
map<B>(f: (a: A) => B): IOEither<L, B>  { ... }
```

Added in v1.6.0

## mapLeft

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L73-L75)

```ts
mapLeft<M>(f: (l: L) => M): IOEither<M, A>  { ... }
```

Added in v1.6.0

## orElse

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L76-L78)

```ts
orElse<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A>  { ... }
```

Added in v1.6.0

## run

Runs the inner io

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L40-L42)

```ts
run(): Either<L, A>  { ... }
```

Added in v1.6.0

Added in v1.6.0

## ioEither

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L165-L173)

```ts
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> = ...
```

Added in v1.6.0

## fromEither

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L134-L136)

```ts
export const fromEither = <L, A>(fa: Either<L, A>): IOEither<L, A> => { ... }
```

Added in v1.6.0

## fromLeft

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L141-L143)

```ts
export const fromLeft = <L, A>(l: L): IOEither<L, A> => { ... }
```

Added in v1.6.0

## left

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L125-L127)

```ts
export const left = <L, A>(fa: IO<L>): IOEither<L, A> => { ... }
```

Added in v1.6.0

## right

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L116-L118)

```ts
export const right = <L, A>(fa: IO<A>): IOEither<L, A> => { ... }
```

Added in v1.6.0

## ~~tryCatch~~ (deprecated)

Use [tryCatch2v](#trycatch2v)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L151-L153)

```ts
export const tryCatch = <A>(f: Lazy<A>, onerror: (reason: unknown) => Error = toError): IOEither<Error, A> => { ... }
```

Added in v1.6.0

## tryCatch2v

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts#L158-L160)

```ts
export const tryCatch2v = <L, A>(f: Lazy<A>, onerror: (reason: unknown) => L): IOEither<L, A> => { ... }
```

Added in v1.11.0
