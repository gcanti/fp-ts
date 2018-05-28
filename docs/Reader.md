---
id: Reader
title: Module Reader
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts)

## Data

### Reader

_data_

_since 1.0.0_

_Signature_

```ts
constructor(readonly run: (e: E) => A) {}
```

## Methods

### ap

_method_

_since 1.0.0_

_Signature_

```ts
<B>(fab: Reader<E, (a: A) => B>): Reader<E, B>
```

### ap\_

_method_

_since 1.0.0_

_Signature_

```ts
<B, C>(this: Reader<E, (b: B) => C>, fb: Reader<E, B>): Reader<E, C>
```

### chain

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => Reader<E, B>): Reader<E, B>
```

### local

_method_

_since 1.6.1_

_Signature_

```ts
<E2 = E>(f: (e: E2) => E): Reader<E2, A>
```

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): Reader<E, B>
```

## Instances

### reader

_instance_

_since 1.0.0_

_Signature_

```ts
Monad2<URI>
```

## Functions

### ask

_function_

_since 1.0.0_

_Signature_

```ts
<E>(): Reader<E, E>
```

_Description_

reads the current context

### asks

_function_

_since 1.0.0_

_Signature_

```ts
<E, A>(f: (e: E) => A): Reader<E, A>
```

_Description_

Projects a value from the global context in a Reader

### local

_function_

_since 1.0.0_

_Signature_

```ts
<E, E2 = E>(f: (e: E2) => E) => <A>(fa: Reader<E, A>): Reader<E2, A>
```

_Description_

changes the value of the local context during the execution of the action `fa`
