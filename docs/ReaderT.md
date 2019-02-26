---
id: ReaderT
title: ReaderT
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts)

## ~~ap~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts#L244-L248)

```ts
export function ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>  { ... }
```

Added in v1.0.0

## ~~ask~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts#L262-L264)

```ts
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E>  { ... }
```

Added in v1.0.0

## ~~asks~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts#L278-L280)

```ts
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A>  { ... }
```

Added in v1.0.0

## ~~chain~~ (deprecated)

Use [getReaderT2v](#getreadert2v) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts#L168-L172)

```ts
export function chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>  { ... }
```

Added in v1.0.0

## fromReader

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts#L57-L59)

```ts
export function fromReader<F>(F: Applicative<F>): <E, A>(fa: Reader<E, A>) => (e: E) => HKT<F, A>  { ... }
```

Added in v1.2.0

## ~~getReaderT~~ (deprecated)

Use [getReaderT2v](#getreadert2v) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts#L192-L203)

```ts
export function getReaderT<M>(M: Monad<M>): ReaderT<M>  { ... }
```

Added in v1.0.0

## getReaderT2v

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts#L68-L75)

```ts
export function getReaderT2v<M>(M: Monad<M>): ReaderT2v<M>  { ... }
```

Added in v1.14.0

## ~~map~~ (deprecated)

Use [map2v](#map2v) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts#L140-L142)

```ts
export function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>  { ... }
```

Added in v1.0.0

## ~~of~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts#L217-L219)

```ts
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A>  { ... }
```

Added in v1.0.0
