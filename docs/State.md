---
id: State
title: Module State
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts)

## Data

### State

_data_

_since 1.0.0_

_Signature_

```ts
constructor(readonly run: (s: S) => [A, S]) {}
```

## Methods

### ap

_method_

_since 1.0.0_

_Signature_

```ts
<B>(fab: State<S, (a: A) => B>): State<S, B>
```

### ap\_

_method_

_since 1.0.0_

_Signature_

```ts
<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C>
```

### applyFirst

_method_

_since 1.7.0_

_Signature_

```ts
<B>(fb: State<S, B>): State<S, A>
```

_Description_

Combine two effectful actions, keeping only the result of the first

### applySecond

_method_

_since 1.7.0_

_Signature_

```ts
<B>(fb: State<S, B>): State<S, B>
```

_Description_

Combine two effectful actions, keeping only the result of the second

### chain

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => State<S, B>): State<S, B>
```

### eval

_method_

_since 1.0.0_

_Signature_

```ts
(s: S): A
```

### exec

_method_

_since 1.0.0_

_Signature_

```ts
(s: S): S
```

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): State<S, B>
```

## Instances

### state

_instance_

_since 1.0.0_

_Signature_

```ts
Monad2<URI>
```

## Functions

### get

_function_

_since 1.0.0_

_Signature_

```ts
<S>(): State<S, S>
```

_Description_

Get the current state

### gets

_function_

_since 1.0.0_

_Signature_

```ts
<S, A>(f: (s: S) => A): State<S, A>
```

_Description_

Get a value which depends on the current state

### modify

_function_

_since 1.0.0_

_Signature_

```ts
<S>(f: (s: S) => S): State<S, undefined>
```

_Description_

Modify the state by applying a function to the current state

### put

_function_

_since 1.0.0_

_Signature_

```ts
<S>(s: S): State<S, void>
```

_Description_

Set the state
