---
title: Writer.ts
nav_order: 100
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [Writer (class)](#writer-class)
  - [eval (method)](#eval-method)
  - [exec (method)](#exec-method)
  - [map (method)](#map-method)
- [URI (constant)](#uri-constant)
- [writer (constant)](#writer-constant)
- [~~censor~~ (function)](#censor-function)
- [censor2v (function)](#censor2v-function)
- [evalWriter (function)](#evalwriter-function)
- [execWriter (function)](#execwriter-function)
- [getMonad (function)](#getmonad-function)
- [listen (function)](#listen-function)
- [~~listens~~ (function)](#listens-function)
- [listens2v (function)](#listens2v-function)
- [pass (function)](#pass-function)
- [tell (function)](#tell-function)
- [map (export)](#map-export)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Writer (class)

**Signature**

```ts
export class Writer<W, A> {
  constructor(readonly run: () => [A, W]) { ... }
  ...
}
```

Added in v1.0.0

## eval (method)

**Signature**

```ts
eval(): A { ... }
```

## exec (method)

**Signature**

```ts
exec(): W { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Writer<W, B> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# writer (constant)

**Signature**

```ts
export const writer: Functor2<URI> = ...
```

Added in v1.0.0

# ~~censor~~ (function)

Use `censor2v`

**Signature**

```ts
export const censor = <W, A>(fa: Writer<W, A>, f: (w: W) => W): Writer<W, A> => ...
```

Added in v1.3.0

# censor2v (function)

Modify the final accumulator value by applying a function

**Signature**

```ts
export function censor2v<W>(f: (w: W) => W): <A>(fa: Writer<W, A>) => Writer<W, A> { ... }
```

Added in v1.19.0

# evalWriter (function)

**Signature**

```ts
export function evalWriter<W, A>(fa: Writer<W, A>): A { ... }
```

Added in v1.19.0

# execWriter (function)

**Signature**

```ts
export function execWriter<W, A>(fa: Writer<W, A>): W { ... }
```

Added in v1.19.0

# getMonad (function)

**Signature**

```ts
export const getMonad = <W>(M: Monoid<W>): Monad2C<URI, W> => ...
```

Added in v1.0.0

# listen (function)

Modifies the result to include the changes to the accumulator

**Signature**

```ts
export const listen = <W, A>(fa: Writer<W, A>): Writer<W, [A, W]> => ...
```

Added in v1.3.0

# ~~listens~~ (function)

Use `listens2v`

**Signature**

```ts
export const listens = <W, A, B>(fa: Writer<W, A>, f: (w: W) => B): Writer<W, [A, B]> => ...
```

Added in v1.3.0

# listens2v (function)

Projects a value from modifications made to the accumulator during an action

**Signature**

```ts
export function listens2v<W, B>(f: (w: W) => B): <A>(fa: Writer<W, A>) => Writer<W, [A, B]> { ... }
```

Added in v1.19.0

# pass (function)

Applies the returned function to the accumulator

**Signature**

```ts
export const pass = <W, A>(fa: Writer<W, [A, (w: W) => W]>): Writer<W, A> => ...
```

Added in v1.3.0

# tell (function)

Appends a value to the accumulator

**Signature**

```ts
export const tell = <W>(w: W): Writer<W, void> => ...
```

Added in v1.0.0

# map (export)

**Signature**

```ts
export { map }
```
