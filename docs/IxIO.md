---
id: IxIO
title: Module IxIO
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts)

## Data

### IxIO

_data_

_since 1.0.0_

_Signature_

```ts
constructor(readonly value: IO<A>) {}
```

## Methods

### ap

_method_

_since 1.0.0_

_Signature_

```ts
<B>(fab: IxIO<I, I, (a: A) => B>): IxIO<I, I, B>
```

### chain

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => IxIO<I, I, B>): IxIO<I, I, B>
```

### ichain

_method_

_since 1.0.0_

_Signature_

```ts
<Z, B>(f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B>
```

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): IxIO<I, O, B>
```

### run

_method_

_since 1.0.0_

_Signature_

```ts
(): A
```

## Instances

### ixIO

_instance_

_since 1.0.0_

_Signature_

```ts
IxMonad3<URI>
```

## Functions

### getMonad

_function_

_since 1.0.0_

_Signature_

```ts
<I = never>(): Monad3C<URI, I, I>
```

### iof

_function_

_since 1.0.0_

_Signature_

```ts
<I, A>(a: A): IxIO<I, I, A>
```
