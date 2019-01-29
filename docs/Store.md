---
id: Store
title: Module Store
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts)

## store

**Signature** (instance)

```ts
export const store: Comonad2<URI> = { ... }
```

Added in v1.0.0

# Store

**Signature** (data type)

```ts
export class Store<S, A> {
  constructor(readonly peek: (s: S) => A, readonly pos: S) {}
  ...
}
```

## extend

**Signature** (method)

```ts
extend<B>(f: (sa: Store<S, A>) => B): Store<S, B>  { ... }
```

Added in v1.0.0

## extract

**Signature** (method)

```ts
extract(): A  { ... }
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
map<B>(f: (a: A) => B): Store<S, B>  { ... }
```

Added in v1.0.0

## seek

Reposition the focus at the specified position

**Signature** (method)

```ts
seek(s: S): Store<S, A>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## experiment

Extract a collection of values from positions which depend on the current position

**Signature** (function)

```ts
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A>  { ... }
```

Added in v1.0.0

## peeks

Extract a value from a position which depends on the current position

**Signature** (function)

```ts
export const peeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>) => (s: S): A => { ... }
```

Added in v1.0.0

## seeks

Reposition the focus at the specified position, which depends on the current position

**Signature** (function)

```ts
export const seeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>): Store<S, A> => { ... }
```

Added in v1.0.0
