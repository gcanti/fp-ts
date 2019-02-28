---
title: Store.ts
nav_order: 80
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [URI](#uri)
- [Store](#store)
  - [seek](#seek)
  - [map](#map)
  - [extract](#extract)
  - [extend](#extend)
  - [inspect](#inspect)
  - [toString](#tostring)
- [URI](#uri-1)
- [store](#store)
- [experiment](#experiment)
- [peeks](#peeks)
- [seeks](#seeks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# Store

**Signature** (class)

```ts
export class Store<S, A> {
  constructor(readonly peek: (s: S) => A, readonly pos: S) { ... }
  ...
}
```

Added in v1.0.0

## seek

Reposition the focus at the specified position

**Signature** (method)

```ts
seek(s: S): Store<S, A> { ... }
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Store<S, B> { ... }
```

## extract

**Signature** (method)

```ts
extract(): A { ... }
```

## extend

**Signature** (method)

```ts
extend<B>(f: (sa: Store<S, A>) => B): Store<S, B> { ... }
```

## inspect

**Signature** (method)

```ts
inspect(): string { ... }
```

## toString

**Signature** (method)

```ts
toString(): string { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# store

**Signature** (constant)

```ts
export const store: Comonad2<URI> = ...
```

Added in v1.0.0

# experiment

Extract a collection of values from positions which depend on the current position

**Signature** (function)

```ts
export function experiment<F extends URIS3>(
  F: Functor3<F>
): <U, L, S>(f: (s: S) => HKT3<F, U, L, S>) => <A>(sa: Store<S, A>) => Type3<F, U, L, A>
export function experiment<F extends URIS2>(
  F: Functor2<F>
): <L, S>(f: (s: S) => HKT2<F, L, S>) => <A>(sa: Store<S, A>) => Type2<F, L, A>
export function experiment<F extends URIS>(
  F: Functor<F>
): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => Type<F, A>
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A>
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A> { ... }
```

Added in v1.0.0

# peeks

Extract a value from a position which depends on the current position

**Signature** (function)

```ts
export const peeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>) => (s: S): A => ...
```

Added in v1.0.0

# seeks

Reposition the focus at the specified position, which depends on the current position

**Signature** (function)

```ts
export const seeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>): Store<S, A> => ...
```

Added in v1.0.0
