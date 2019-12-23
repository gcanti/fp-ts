---
title: Writer.ts
nav_order: 94
parent: Modules
---

# Writer overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Writer (interface)](#writer-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [evalWriter (constant)](#evalwriter-constant)
- [execWriter (constant)](#execwriter-constant)
- [listen (constant)](#listen-constant)
- [pass (constant)](#pass-constant)
- [tell (constant)](#tell-constant)
- [writer (constant)](#writer-constant)
- [censor (function)](#censor-function)
- [getMonad (function)](#getmonad-function)
- [listens (function)](#listens-function)
- [map (export)](#map-export)

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

Added in v2.0.0

# URI (constant)

**Signature**

```ts
export const URI: "Writer" = ...
```

Added in v2.0.0

# evalWriter (constant)

**Signature**

```ts
export const evalWriter: <W, A>(fa: Writer<W, A>) => A = ...
```

Added in v2.0.0

# execWriter (constant)

**Signature**

```ts
export const execWriter: <W, A>(fa: Writer<W, A>) => W = ...
```

Added in v2.0.0

# listen (constant)

Modifies the result to include the changes to the accumulator

**Signature**

```ts
export const listen: <W, A>(fa: Writer<W, A>) => Writer<W, [A, W]> = ...
```

Added in v2.0.0

# pass (constant)

Applies the returned function to the accumulator

**Signature**

```ts
export const pass: <W, A>(fa: Writer<W, [A, (w: W) => W]>) => Writer<W, A> = ...
```

Added in v2.0.0

# tell (constant)

Appends a value to the accumulator

**Signature**

```ts
export const tell: <W>(w: W) => Writer<W, void> = ...
```

Added in v2.0.0

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
export function censor<W>(f: (w: W) => W): <A>(fa: Writer<W, A>) => Writer<W, A> { ... }
```

Added in v2.0.0

# getMonad (function)

**Signature**

```ts
export function getMonad<W>(M: Monoid<W>): Monad2C<URI, W> { ... }
```

Added in v2.0.0

# listens (function)

Projects a value from modifications made to the accumulator during an action

**Signature**

```ts
export function listens<W, B>(f: (w: W) => B): <A>(fa: Writer<W, A>) => Writer<W, [A, B]> { ... }
```

Added in v2.0.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: Writer<E, A>) => Writer<E, B>
```

Added in v2.0.0
