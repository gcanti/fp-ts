---
title: State.ts
nav_order: 83
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [State (class)](#state-class)
  - [eval (method)](#eval-method)
  - [exec (method)](#exec-method)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [applyFirst (method)](#applyfirst-method)
  - [applySecond (method)](#applysecond-method)
  - [chain (method)](#chain-method)
- [URI (constant)](#uri-constant)
- [state (constant)](#state-constant)
- [evalState (function)](#evalstate-function)
- [execState (function)](#execstate-function)
- [get (function)](#get-function)
- [gets (function)](#gets-function)
- [modify (function)](#modify-function)
- [of (function)](#of-function)
- [put (function)](#put-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# State (class)

**Signature**

```ts
export class State<S, A> {
  constructor(readonly run: (s: S) => [A, S]) { ... }
  ...
}
```

Added in v1.0.0

## eval (method)

**Signature**

```ts
eval(s: S): A { ... }
```

## exec (method)

**Signature**

```ts
exec(s: S): S { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): State<S, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: State<S, (a: A) => B>): State<S, B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C> { ... }
```

## applyFirst (method)

Combine two effectful actions, keeping only the result of the first

**Signature**

```ts
applyFirst<B>(fb: State<S, B>): State<S, A> { ... }
```

Added in v1.7.0

## applySecond (method)

Combine two effectful actions, keeping only the result of the second

**Signature**

```ts
applySecond<B>(fb: State<S, B>): State<S, B> { ... }
```

Added in v1.7.0

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => State<S, B>): State<S, B> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# state (constant)

**Signature**

```ts
export const state: Monad2<URI> = ...
```

Added in v1.0.0

# evalState (function)

Run a computation in the `State` monad, discarding the final state

**Signature**

```ts
export function evalState<S, A>(ma: State<S, A>, s: S): A { ... }
```

Added in v1.19.0

# execState (function)

Run a computation in the `State` monad discarding the result

**Signature**

```ts
export function execState<S, A>(ma: State<S, A>, s: S): S { ... }
```

Added in v1.19.0

# get (function)

Get the current state

**Signature**

```ts
export const get = <S>(): State<S, S> => ...
```

Added in v1.0.0

# gets (function)

Get a value which depends on the current state

**Signature**

```ts
export const gets = <S, A>(f: (s: S) => A): State<S, A> => ...
```

Added in v1.0.0

# modify (function)

Modify the state by applying a function to the current state

**Signature**

```ts
export const modify = <S>(f: (s: S) => S): State<S, undefined> => ...
```

Added in v1.0.0

# of (function)

**Signature**

```ts
export function of<S, A>(a: A): State<S, A> { ... }
```

Added in v1.19.0

# put (function)

Set the state

**Signature**

```ts
export const put = <S>(s: S): State<S, void> => ...
```

Added in v1.0.0
