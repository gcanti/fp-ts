---
id: State
title: Module State
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts)

# State

```ts
constructor(readonly run: (s: S) => [A, S]) {}
```

Added in v1.0.0 (data)

## ap

```ts
<B>(fab: State<S, (a: A) => B>): State<S, B>
```

Added in v1.0.0 (method)

## ap\_

```ts
<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C>
```

Added in v1.0.0 (method)

## applyFirst

```ts
<B>(fb: State<S, B>): State<S, A>
```

Added in v1.7.0 (method)

Combine two effectful actions, keeping only the result of the first

## applySecond

```ts
<B>(fb: State<S, B>): State<S, B>
```

Added in v1.7.0 (method)

Combine two effectful actions, keeping only the result of the second

## chain

```ts
<B>(f: (a: A) => State<S, B>): State<S, B>
```

Added in v1.0.0 (method)

## eval

```ts
(s: S): A
```

Added in v1.0.0 (method)

## exec

```ts
(s: S): S
```

Added in v1.0.0 (method)

## map

```ts
<B>(f: (a: A) => B): State<S, B>
```

Added in v1.0.0 (method)

## state

```ts
Monad2<URI>
```

Added in v1.0.0 (instance)

## get

```ts
<S>(): State<S, S>
```

Added in v1.0.0 (function)

Get the current state

## gets

```ts
<S, A>(f: (s: S) => A): State<S, A>
```

Added in v1.0.0 (function)

Get a value which depends on the current state

## modify

```ts
<S>(f: (s: S) => S): State<S, undefined>
```

Added in v1.0.0 (function)

Modify the state by applying a function to the current state

## put

```ts
<S>(s: S): State<S, void>
```

Added in v1.0.0 (function)

Set the state
