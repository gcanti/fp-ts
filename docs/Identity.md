---
id: Identity
title: Module Identity
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts)

## Data

### Identity

_data_

_since 1.0.0_

_Signature_

```ts
constructor(readonly value: A) {}
```

## Methods

### alt

_method_

_since 1.0.0_

_Signature_

```ts
(fx: Identity<A>): Identity<A>
```

### ap

_method_

_since 1.0.0_

_Signature_

```ts
<B>(fab: Identity<(a: A) => B>): Identity<B>
```

### ap\_

_method_

_since 1.0.0_

_Signature_

```ts
<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C>
```

### chain

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => Identity<B>): Identity<B>
```

### extend

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (ea: Identity<A>) => B): Identity<B>
```

### extract

_method_

_since 1.0.0_

_Signature_

```ts
(): A
```

### fold

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): B
```

### inspect

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): Identity<B>
```

### orElse

_method_

_since 1.6.0_

_Signature_

```ts
(fx: Lazy<Identity<A>>): Identity<A>
```

_Description_

Lazy version of [alt](#alt)

_Example_

```ts
const a = new Identity(1)
assert.deepEqual(a.altL(() => new Identity(2)), a)
```

### reduce

_method_

_since 1.0.0_

_Signature_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### toString

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

## Instances

### identity

_instance_

_since 1.0.0_

_Signature_

```ts
Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI>
```

## Functions

### getSetoid

_function_

_since 1.0.0_

_Signature_

```ts
<A>(setoid: Setoid<A>): Setoid<Identity<A>>
```
