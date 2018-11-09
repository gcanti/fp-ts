---
id: Const
title: Module Const
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts)

## const\_

```ts
Functor2<URI> & Contravariant2<URI>
```

Added in v1.0.0 (instance)

# Const

```ts
constructor(readonly value: L) {}
```

Added in v1.0.0 (data)

## contramap

```ts
<B>(f: (b: B) => A): Const<L, B>
```

Added in v1.0.0 (method)

## fold

```ts
<B>(f: (l: L) => B): B
```

Added in v1.0.0 (method)

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

## map

```ts
<B>(f: (a: A) => B): Const<L, B>
```

Added in v1.0.0 (method)

## toString

```ts
(): string
```

Added in v1.0.0 (method)

## getApplicative

```ts
<L>(M: Monoid<L>): Applicative2C<URI, L>
```

Added in v1.0.0 (function)

## getApply

```ts
<L>(S: Semigroup<L>): Apply2C<URI, L>
```

Added in v1.0.0 (function)

## getSetoid

```ts
<L, A>(S: Setoid<L>): Setoid<Const<L, A>>
```

Added in v1.0.0 (function)
