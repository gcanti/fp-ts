---
id: Store
title: Module Store
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts)

## store

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts#L100-L105)

```ts
export const store: Comonad2<URI> = { ... }
```

Added in v1.0.0

# Store

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts#L21-L45)

```ts
export class Store<S, A> {
  constructor(readonly peek: (s: S) => A, readonly pos: S) {}
  ...
}
```

## extend

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts#L36-L38)

```ts
extend<B>(f: (sa: Store<S, A>) => B): Store<S, B>  { ... }
```

Added in v1.0.0

## extract

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts#L33-L35)

```ts
extract(): A  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts#L39-L41)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts#L30-L32)

```ts
map<B>(f: (a: A) => B): Store<S, B>  { ... }
```

Added in v1.0.0

## seek

Reposition the focus at the specified position

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts#L27-L29)

```ts
seek(s: S): Store<S, A>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts#L42-L44)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## experiment

Extract a collection of values from positions which depend on the current position

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts#L92-L94)

```ts
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A>  { ... }
```

Added in v1.0.0

## peeks

Extract a value from a position which depends on the current position

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts#L64-L66)

```ts
export const peeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>) => (s: S): A => { ... }
```

Added in v1.0.0

## seeks

Reposition the focus at the specified position, which depends on the current position

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts#L73-L75)

```ts
export const seeks = <S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>): Store<S, A> => { ... }
```

Added in v1.0.0
