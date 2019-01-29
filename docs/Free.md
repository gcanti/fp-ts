---
id: Free
title: Module Free
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts)

# Free

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L24-L24)

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

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L35-L37)

```ts
ap<B>(fab: Free<F, (a: A) => B>): Free<F, B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L41-L43)

```ts
ap_<B, C>(this: Free<F, (b: B) => C>, fb: Free<F, B>): Free<F, C>  { ... }
```

Added in v1.0.0

## chain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L44-L46)

```ts
chain<B>(f: (a: A) => Free<F, B>): Free<F, B>  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L47-L49)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## isImpure

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L56-L58)

```ts
isImpure(): this is Impure<F, A, any>  { ... }
```

Added in v1.0.0

## isPure

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L53-L55)

```ts
isPure(): this is Pure<F, A>  { ... }
```

Added in v1.0.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L32-L34)

```ts
map<B>(f: (a: A) => B): Free<F, B>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L50-L52)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## foldFree

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L175-L183)

```ts
export function foldFree<M>(M: Monad<M>): <F, A>(nt: any, fa: Free<F, A>) => HKT<M, A>  { ... }
```

Added in v1.0.0

## hoistFree

Use a natural transformation to change the generating type constructor of a free monad

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L137-L139)

```ts
export function hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>)  { ... }
```

Added in v1.0.0

## liftF

Lift an impure value described by the generating type constructor `F` into the free monad

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L106-L108)

```ts
export const liftF = <F, A>(fa: HKT<F, A>): Free<F, A> => { ... }
```

Added in v1.0.0

## of

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts#L97-L99)

```ts
export const of = <F, A>(a: A): Free<F, A> => { ... }
```

Added in v1.0.0
