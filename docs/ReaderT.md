---
id: ReaderT
title: Module ReaderT
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts)

## ap

```ts
ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
```

Added in v1.0.0 (function)

## ask

```ts
ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E>
```

Added in v1.0.0 (function)

## asks

```ts
asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A>
```

Added in v1.0.0 (function)

## chain

```ts
chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
```

Added in v1.0.0 (function)

## fromReader

```ts
fromReader<F>(F: Applicative<F>): <E, A>(fa: Reader<E, A>) => (e: E) => HKT<F, A>
```

Added in v1.2.0 (function)

## getReaderT

```ts
getReaderT<M>(M: Monad<M>): ReaderT<M>
```

Added in v1.0.0 (function)

## map

```ts
map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
```

Added in v1.0.0 (function)

## of

```ts
of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A>
```

Added in v1.0.0 (function)
