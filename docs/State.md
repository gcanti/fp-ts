---
id: State
title: Module State
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts)

# State

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L19-L65)

```ts
export class State<S, A> {
  constructor(readonly run: (s: S) => [A, S]) {}
  ...
}
```

## ap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L36-L38)

```ts
ap<B>(fab: State<S, (a: A) => B>): State<S, B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L42-L44)

```ts
ap_<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C>  { ... }
```

Added in v1.0.0

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L49-L51)

```ts
applyFirst<B>(fb: State<S, B>): State<S, A>  { ... }
```

Added in v1.7.0

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L56-L58)

```ts
applySecond<B>(fb: State<S, B>): State<S, B>  { ... }
```

Added in v1.7.0

## chain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L59-L64)

```ts
chain<B>(f: (a: A) => State<S, B>): State<S, B>  { ... }
```

Added in v1.0.0

## eval

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L24-L26)

```ts
eval(s: S): A  { ... }
```

Added in v1.0.0

## exec

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L27-L29)

```ts
exec(s: S): S  { ... }
```

Added in v1.0.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L30-L35)

```ts
map<B>(f: (a: A) => B): State<S, B>  { ... }
```

Added in v1.0.0

Added in v1.0.0

## state

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L122-L128)

```ts
export const state: Monad2<URI> = ...
```

Added in v1.0.0

## get

Get the current state

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L88-L90)

```ts
export const get = <S>(): State<S, S> => { ... }
```

Added in v1.0.0

## gets

Get a value which depends on the current state

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L115-L117)

```ts
export const gets = <S, A>(f: (s: S) => A): State<S, A> => { ... }
```

Added in v1.0.0

## modify

Modify the state by applying a function to the current state

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L106-L108)

```ts
export const modify = <S>(f: (s: S) => S): State<S, undefined> => { ... }
```

Added in v1.0.0

## put

Set the state

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/State.ts#L97-L99)

```ts
export const put = <S>(s: S): State<S, void> => { ... }
```

Added in v1.0.0
