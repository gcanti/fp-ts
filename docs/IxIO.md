---
id: IxIO
title: Module IxIO
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts)

# IxIO

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts#L21-L42)

```ts
export class IxIO<I, O, A> {
  constructor(readonly value: IO<A>) {}
  ...
}
```

## ap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts#L36-L38)

```ts
ap<B>(fab: IxIO<I, I, (a: A) => B>): IxIO<I, I, B>  { ... }
```

Added in v1.0.0

## chain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts#L39-L41)

```ts
chain<B>(f: (a: A) => IxIO<I, I, B>): IxIO<I, I, B>  { ... }
```

Added in v1.0.0

## ichain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts#L30-L32)

```ts
ichain<Z, B>(f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B>  { ... }
```

Added in v1.0.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts#L33-L35)

```ts
map<B>(f: (a: A) => B): IxIO<I, O, B>  { ... }
```

Added in v1.0.0

## run

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts#L27-L29)

```ts
run(): A  { ... }
```

Added in v1.0.0

Added in v1.0.0

## ixIO

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts#L87-L91)

```ts
export const ixIO: IxMonad3<URI> = ...
```

Added in v1.0.0

## getMonad

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts#L72-L82)

```ts
export const getMonad = <I = never>(): Monad3C<URI, I, I> => { ... }
```

Added in v1.0.0

## iof

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts#L47-L49)

```ts
export const iof = <I, A>(a: A): IxIO<I, I, A> => { ... }
```

Added in v1.0.0
