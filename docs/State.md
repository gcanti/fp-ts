---
id: State
title: State
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts)

# State

**Signature** (data type)

```ts
export class State<S, A> {
  constructor(readonly run: (s: S) => [A, S]) {}
  ...
}
```

## ap

**Signature** (method)

```ts
ap<B>(fab: State<S, (a: A) => B>): State<S, B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C>  { ... }
```

Added in v1.0.0

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method)

```ts
applyFirst<B>(fb: State<S, B>): State<S, A>  { ... }
```

Added in v1.7.0

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method)

```ts
applySecond<B>(fb: State<S, B>): State<S, B>  { ... }
```

Added in v1.7.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => State<S, B>): State<S, B>  { ... }
```

Added in v1.0.0

## eval

**Signature** (method)

```ts
eval(s: S): A  { ... }
```

Added in v1.0.0

## exec

**Signature** (method)

```ts
exec(s: S): S  { ... }
```

Added in v1.0.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): State<S, B>  { ... }
```

Added in v1.0.0

Added in v1.0.0

## state

**Signature** (constant)

```ts
export const state: Monad2<URI> = ...
```

Added in v1.0.0

## get

Get the current state

**Signature** (function)

```ts
export const get = <S>(): State<S, S> => { ... }
```

Added in v1.0.0

## gets

Get a value which depends on the current state

**Signature** (function)

```ts
export const gets = <S, A>(f: (s: S) => A): State<S, A> => { ... }
```

Added in v1.0.0

## modify

Modify the state by applying a function to the current state

**Signature** (function)

```ts
export const modify = <S>(f: (s: S) => S): State<S, undefined> => { ... }
```

Added in v1.0.0

## put

Set the state

**Signature** (function)

```ts
export const put = <S>(s: S): State<S, void> => { ... }
```

Added in v1.0.0
