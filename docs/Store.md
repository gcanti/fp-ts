---
id: Store
title: Module Store
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts)

## store

```ts
Comonad2<URI>
```

Added in v1.0.0 (instance)

# Store

```ts
constructor(readonly peek: (s: S) => A, readonly pos: S) {}
```

Added in v1.0.0 (data)

## extend

```ts
<B>(f: (sa: Store<S, A>) => B): Store<S, B>
```

Added in v1.0.0 (method)

## extract

```ts
(): A
```

Added in v1.0.0 (method)

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

## map

```ts
<B>(f: (a: A) => B): Store<S, B>
```

Added in v1.0.0 (method)

## seek

```ts
(s: S): Store<S, A>
```

Added in v1.0.0 (method)

Reposition the focus at the specified position

## toString

```ts
(): string
```

Added in v1.0.0 (method)

## experiment

```ts
experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A>
```

Added in v1.0.0 (function)

Extract a collection of values from positions which depend on the current position

## peeks

```ts
<S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>) => (s: S): A
```

Added in v1.0.0 (function)

Extract a value from a position which depends on the current position

## seeks

```ts
<S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>): Store<S, A>
```

Added in v1.0.0 (function)

Reposition the focus at the specified position, which depends on the current position
