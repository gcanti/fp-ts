---
id: Free
title: Free
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts)

# Free

**Signature** (data type)

```ts
export type Free<F, A> = Pure<F, A> | Impure<F, A, any>

export class Pure<F, A> {
  constructor(readonly value: A) {}
  ...
}

export class Impure<F, A, X> {
  constructor(readonly fx: HKT<F, X>, readonly f: (x: X) => Free<F, A>) {}
  ...
}
```

## ap

**Signature** (method)

```ts
ap<B>(fab: Free<F, (a: A) => B>): Free<F, B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method)

```ts
ap_<B, C>(this: Free<F, (b: B) => C>, fb: Free<F, B>): Free<F, C>  { ... }
```

Added in v1.0.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => Free<F, B>): Free<F, B>  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## isImpure

**Signature** (method)

```ts
isImpure(): this is Impure<F, A, any>  { ... }
```

Added in v1.0.0

## isPure

**Signature** (method)

```ts
isPure(): this is Pure<F, A>  { ... }
```

Added in v1.0.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Free<F, B>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## foldFree

**Signature** (function)

```ts
export function foldFree<M>(M: Monad<M>): <F, A>(nt: any, fa: Free<F, A>) => HKT<M, A>  { ... }
```

Added in v1.0.0

## hoistFree

Use a natural transformation to change the generating type constructor of a free monad

**Signature** (function)

```ts
export function hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>)  { ... }
```

Added in v1.0.0

## liftF

Lift an impure value described by the generating type constructor `F` into the free monad

**Signature** (function)

```ts
export const liftF = <F, A>(fa: HKT<F, A>): Free<F, A> => { ... }
```

Added in v1.0.0

## of

**Signature** (function)

```ts
export const of = <F, A>(a: A): Free<F, A> => { ... }
```

Added in v1.0.0
