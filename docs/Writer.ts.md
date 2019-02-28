---
title: Writer.ts
nav_order: 95
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [URI](#uri)
- [Writer](#writer)
  - [eval](#eval)
  - [exec](#exec)
  - [map](#map)
- [URI](#uri-1)
- [writer](#writer)
- [censor](#censor)
- [getMonad](#getmonad)
- [listen](#listen)
- [listens](#listens)
- [pass](#pass)
- [tell](#tell)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# Writer

**Signature** (class)

```ts
export class Writer<W, A> {
  constructor(readonly run: () => [A, W]) { ... }
  ...
}
```

Added in v1.0.0

## eval

**Signature** (method)

```ts
eval(): A { ... }
```

## exec

**Signature** (method)

```ts
exec(): W { ... }
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Writer<W, B> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# writer

**Signature** (constant)

```ts
export const writer: Functor2<URI> = ...
```

Added in v1.0.0

# censor

Modify the final accumulator value by applying a function

**Signature** (function)

```ts
export const censor = <W, A>(fa: Writer<W, A>, f: (w: W) => W): Writer<W, A> => ...
```

Added in v1.3.0

# getMonad

**Signature** (function)

```ts
export const getMonad = <W>(M: Monoid<W>): Monad2C<URI, W> => ...
```

Added in v1.0.0

# listen

Modifies the result to include the changes to the accumulator

**Signature** (function)

```ts
export const listen = <W, A>(fa: Writer<W, A>): Writer<W, [A, W]> => ...
```

Added in v1.3.0

# listens

Projects a value from modifications made to the accumulator during an action

**Signature** (function)

```ts
export const listens = <W, A, B>(fa: Writer<W, A>, f: (w: W) => B): Writer<W, [A, B]> => ...
```

Added in v1.3.0

# pass

Applies the returned function to the accumulator

**Signature** (function)

```ts
export const pass = <W, A>(fa: Writer<W, [A, (w: W) => W]>): Writer<W, A> => ...
```

Added in v1.3.0

# tell

Appends a value to the accumulator

**Signature** (function)

```ts
export const tell = <W>(w: W): Writer<W, void> => ...
```

Added in v1.0.0
