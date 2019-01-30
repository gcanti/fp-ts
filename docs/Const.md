---
id: Const
title: Module Const
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts)

# Const

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts#L25-L45)

```ts
export class Const<L, A> {
  constructor(readonly value: L) {}
  ...
}
```

## contramap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts#L33-L35)

```ts
contramap<B>(f: (b: B) => A): Const<L, B>  { ... }
```

Added in v1.0.0

## fold

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts#L36-L38)

```ts
fold<B>(f: (l: L) => B): B  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts#L39-L41)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts#L30-L32)

```ts
map<B>(f: (a: A) => B): Const<L, B>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts#L42-L44)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## const\_

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts#L97-L101)

```ts
export const const_: Functor2<URI> & Contravariant2<URI> = ...
```

Added in v1.0.0

## getApplicative

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts#L87-L92)

```ts
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => { ... }
```

Added in v1.0.0

## getApply

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts#L71-L78)

```ts
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts#L50-L54)

```ts
export const getSetoid = <L, A>(S: Setoid<L>): Setoid<Const<L, A>> => { ... }
```

Added in v1.0.0
