---
title: State.ts
nav_order: 78
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [State (interface)](#state-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [state (constant)](#state-constant)
- [evalState (function)](#evalstate-function)
- [execState (function)](#execstate-function)
- [get (function)](#get-function)
- [gets (function)](#gets-function)
- [modify (function)](#modify-function)
- [put (function)](#put-function)
- [run (function)](#run-function)

---

# State (interface)

**Signature**

```ts
export interface State<S, A> {
  (s: S): [A, S]
}
```

Added in v1.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
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

**Signature**

```ts
export function evalState<S, A>(ma: State<S, A>, s: S): A { ... }
```

Added in v2.0.0

# execState (function)

**Signature**

```ts
export function execState<S, A>(ma: State<S, A>, s: S): S { ... }
```

Added in v2.0.0

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

# put (function)

Set the state

**Signature**

```ts
export const put = <S>(s: S): State<S, void> => ...
```

Added in v1.0.0

# run (function)

**Signature**

```ts
export function run<S, A>(ma: State<S, A>, s: S): [A, S] { ... }
```

Added in v2.0.0
