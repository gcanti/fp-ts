---
id: ReaderT
title: Module ReaderT
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts)

## ap

**Signature** (function)

```ts
export function ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>  { ... }
```

Added in v1.0.0

## ask

**Signature** (function)

```ts
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E>  { ... }
```

Added in v1.0.0

## asks

**Signature** (function)

```ts
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A>  { ... }
```

Added in v1.0.0

## chain

**Signature** (function)

```ts
export function chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>  { ... }
```

Added in v1.0.0

## fromReader

**Signature** (function)

```ts
export function fromReader<F>(F: Applicative<F>): <E, A>(fa: Reader<E, A>) => (e: E) => HKT<F, A>  { ... }
```

Added in v1.2.0

## getReaderT

**Signature** (function)

```ts
export function getReaderT<M>(M: Monad<M>): ReaderT<M>  { ... }
```

Added in v1.0.0

## map

**Signature** (function)

```ts
export function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>  { ... }
```

Added in v1.0.0

## of

**Signature** (function)

```ts
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A>  { ... }
```

Added in v1.0.0
