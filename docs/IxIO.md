---
id: IxIO
title: Module IxIO
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts)

# IxIO

```ts
constructor(readonly value: IO<A>) {}
```

Added in v1.0.0 (data)

## ap

```ts
<B>(fab: IxIO<I, I, (a: A) => B>): IxIO<I, I, B>
```

Added in v1.0.0 (method)

## chain

```ts
<B>(f: (a: A) => IxIO<I, I, B>): IxIO<I, I, B>
```

Added in v1.0.0 (method)

## ichain

```ts
<Z, B>(f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B>
```

Added in v1.0.0 (method)

## map

```ts
<B>(f: (a: A) => B): IxIO<I, O, B>
```

Added in v1.0.0 (method)

## run

```ts
(): A
```

Added in v1.0.0 (method)

## ixIO

```ts
IxMonad3<URI>
```

Added in v1.0.0 (instance)

## getMonad

```ts
<I = never>(): Monad3C<URI, I, I>
```

Added in v1.0.0 (function)

## iof

```ts
<I, A>(a: A): IxIO<I, I, A>
```

Added in v1.0.0 (function)
