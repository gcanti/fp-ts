---
title: State.ts
nav_order: 76
parent: Modules
---

# State overview

The `State` monad is a synonym for the `StateT` monad transformer, applied to the `Identity` monad.

For a good introduction to the state monad, see the following blog post by [@pfgray](https://github.com/pfgray): [The
State monad](https://paulgray.net/the-state-monad/)

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [State (interface)](#state-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [evalState (constant)](#evalstate-constant)
- [execState (constant)](#execstate-constant)
- [get (constant)](#get-constant)
- [gets (constant)](#gets-constant)
- [modify (constant)](#modify-constant)
- [of (constant)](#of-constant)
- [put (constant)](#put-constant)
- [state (constant)](#state-constant)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [flatten (export)](#flatten-export)
- [map (export)](#map-export)

---

# State (interface)

**Signature**

```ts
export interface State<S, A> {
  (s: S): [A, S]
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI (constant)

**Signature**

```ts
export const URI: "State" = ...
```

Added in v2.0.0

# evalState (constant)

Run a computation in the `State` monad, discarding the final state

**Signature**

```ts
export const evalState: <S, A>(ma: State<S, A>, s: S) => A = ...
```

Added in v2.0.0

# execState (constant)

Run a computation in the `State` monad discarding the result

**Signature**

```ts
export const execState: <S, A>(ma: State<S, A>, s: S) => S = ...
```

Added in v2.0.0

# get (constant)

Get the current state

**Signature**

```ts
export const get: <S>() => State<S, S> = ...
```

Added in v2.0.0

# gets (constant)

Get a value which depends on the current state

**Signature**

```ts
export const gets: <S, A>(f: (s: S) => A) => State<S, A> = ...
```

Added in v2.0.0

# modify (constant)

Modify the state by applying a function to the current state

**Signature**

```ts
export const modify: <S>(f: (s: S) => S) => State<S, void> = ...
```

Added in v2.0.0

# of (constant)

**Signature**

```ts
export const of: <S, A>(a: A) => State<S, A> = ...
```

Added in v2.0.0

# put (constant)

Set the state

**Signature**

```ts
export const put: <S>(s: S) => State<S, void> = ...
```

Added in v2.0.0

# state (constant)

**Signature**

```ts
export const state: Monad2<URI> = ...
```

Added in v2.0.0

# ap (export)

**Signature**

```ts
<E, A>(fa: State<E, A>) => <B>(fab: State<E, (a: A) => B>) => State<E, B>
```

Added in v2.0.0

# apFirst (export)

**Signature**

```ts
<E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, A>
```

Added in v2.0.0

# apSecond (export)

**Signature**

```ts
<E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, B>
```

Added in v2.0.0

# chain (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, B>
```

Added in v2.0.0

# chainFirst (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, A>
```

Added in v2.0.0

# flatten (export)

**Signature**

```ts
<E, A>(mma: State<E, State<E, A>>) => State<E, A>
```

Added in v2.0.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B>
```

Added in v2.0.0
