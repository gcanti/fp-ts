---
title: Writer.ts
nav_order: 100
parent: Modules
---

# Writer overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Writer (interface)](#writer-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [censor](#censor)
- [evalWriter](#evalwriter)
- [execWriter](#execwriter)
- [getMonad](#getmonad)
- [listen](#listen)
- [listens](#listens)
- [map](#map)
- [pass](#pass)
- [tell](#tell)
- [writer](#writer)

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

# URI

**Signature**

```ts
export const URI: "Writer" = ...
```

Added in v2.0.0

# censor

Modify the final accumulator value by applying a function

**Signature**

```ts
export function censor<W>(f: (w: W) => W): <A>(fa: Writer<W, A>) => Writer<W, A> { ... }
```

Added in v2.0.0

# evalWriter

**Signature**

```ts
export const evalWriter: <W, A>(fa: Writer<W, A>) => A = ...
```

Added in v2.0.0

# execWriter

**Signature**

```ts
export const execWriter: <W, A>(fa: Writer<W, A>) => W = ...
```

Added in v2.0.0

# getMonad

**Signature**

```ts
export function getMonad<W>(M: Monoid<W>): Monad2C<URI, W> { ... }
```

Added in v2.0.0

# listen

Modifies the result to include the changes to the accumulator

**Signature**

```ts
export const listen: <W, A>(fa: Writer<W, A>) => Writer<W, [A, W]> = ...
```

Added in v2.0.0

# listens

Projects a value from modifications made to the accumulator during an action

**Signature**

```ts
export function listens<W, B>(f: (w: W) => B): <A>(fa: Writer<W, A>) => Writer<W, [A, B]> { ... }
```

Added in v2.0.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: Writer<E, A>) => Writer<E, B>
```

Added in v2.0.0

# pass

Applies the returned function to the accumulator

**Signature**

```ts
export const pass: <W, A>(fa: Writer<W, [A, (w: W) => W]>) => Writer<W, A> = ...
```

Added in v2.0.0

# tell

Appends a value to the accumulator

**Signature**

```ts
export const tell: <W>(w: W) => Writer<W, void> = ...
```

Added in v2.0.0

# writer

**Signature**

```ts
export const writer: Functor2<URI> = ...
```

Added in v2.0.0
