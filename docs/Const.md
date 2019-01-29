---
id: Const
title: Module Const
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts)

## const\_

**Signature** (instance)

```ts
export const const_: Functor2<URI> & Contravariant2<URI> = { ... }
```

Added in v1.0.0

# Const

**Signature** (data type)

```ts
export class Const<L, A> {
  constructor(readonly value: L) {}
  ...
}
```

## contramap

**Signature** (method)

```ts
contramap<B>(f: (b: B) => A): Const<L, B>  { ... }
```

Added in v1.0.0

## fold

**Signature** (method)

```ts
fold<B>(f: (l: L) => B): B  { ... }
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
map<B>(f: (a: A) => B): Const<L, B>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## getApplicative

**Signature** (function)

```ts
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => { ... }
```

Added in v1.0.0

## getApply

**Signature** (function)

```ts
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function)

```ts
export const getSetoid = <L, A>(S: Setoid<L>): Setoid<Const<L, A>> => { ... }
```

Added in v1.0.0
