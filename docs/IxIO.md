---
id: IxIO
title: Module IxIO
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts)

## ixIO

**Signature** (instance)

```ts
export const ixIO: IxMonad3<URI> = { ... }
```

Added in v1.0.0

# IxIO

**Signature** (data type)

```ts
export class IxIO<I, O, A> {
  constructor(readonly value: IO<A>) {}
  ...
}
```

## ap

**Signature** (method)

```ts
ap<B>(fab: IxIO<I, I, (a: A) => B>): IxIO<I, I, B>  { ... }
```

Added in v1.0.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => IxIO<I, I, B>): IxIO<I, I, B>  { ... }
```

Added in v1.0.0

## ichain

**Signature** (method)

```ts
ichain<Z, B>(f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B>  { ... }
```

Added in v1.0.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): IxIO<I, O, B>  { ... }
```

Added in v1.0.0

## run

**Signature** (method)

```ts
run(): A  { ... }
```

Added in v1.0.0

Added in v1.0.0

## getMonad

**Signature** (function)

```ts
export const getMonad = <I = never>(): Monad3C<URI, I, I> => { ... }
```

Added in v1.0.0

## iof

**Signature** (function)

```ts
export const iof = <I, A>(a: A): IxIO<I, I, A> => { ... }
```

Added in v1.0.0
