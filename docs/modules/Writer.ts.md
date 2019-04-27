---
title: Writer.ts
nav_order: 93
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Writer (interface)](#writer-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [writer (constant)](#writer-constant)
- [censor (function)](#censor-function)
- [evalWriter (function)](#evalwriter-function)
- [execWriter (function)](#execwriter-function)
- [getMonad (function)](#getmonad-function)
- [listen (function)](#listen-function)
- [listens (function)](#listens-function)
- [pass (function)](#pass-function)
- [run (function)](#run-function)
- [tell (function)](#tell-function)

---

# Writer (interface)

**Signature**

```ts
export interface Writer<W, A> {
  (): [A, W]
}
```

Added in v2.0.0

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

# writer (constant)

**Signature**

```ts
export const writer: Functor2<URI> = ...
```

Added in v2.0.0

# censor (function)

Modify the final accumulator value by applying a function

**Signature**

```ts
export const censor = <W, A>(fa: Writer<W, A>, f: (w: W) => W): Writer<W, A> => ...
```

Added in v2.0.0

# evalWriter (function)

**Signature**

```ts
export const evalWriter = <W, A>(fa: Writer<W, A>): A => ...
```

Added in v2.0.0

# execWriter (function)

**Signature**

```ts
export const execWriter = <W, A>(fa: Writer<W, A>): W => ...
```

Added in v2.0.0

# getMonad (function)

**Signature**

```ts
export const getMonad = <W>(M: Monoid<W>): Monad2C<URI, W> => ...
```

Added in v2.0.0

# listen (function)

Modifies the result to include the changes to the accumulator

**Signature**

```ts
export const listen = <W, A>(fa: Writer<W, A>): Writer<W, [A, W]> => ...
```

Added in v2.0.0

# listens (function)

Projects a value from modifications made to the accumulator during an action

**Signature**

```ts
export const listens = <W, A, B>(fa: Writer<W, A>, f: (w: W) => B): Writer<W, [A, B]> => ...
```

Added in v2.0.0

# pass (function)

Applies the returned function to the accumulator

**Signature**

```ts
export const pass = <W, A>(fa: Writer<W, [A, (w: W) => W]>): Writer<W, A> => ...
```

Added in v2.0.0

# run (function)

**Signature**

```ts
export const run = <W, A>(fa: Writer<W, A>): [A, W] => ...
```

Added in v2.0.0

# tell (function)

Appends a value to the accumulator

**Signature**

```ts
export const tell = <W>(w: W): Writer<W, void> => ...
```

Added in v2.0.0
