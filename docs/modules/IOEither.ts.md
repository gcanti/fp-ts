---
title: IOEither.ts
nav_order: 46
parent: Modules
---

# Overview

`IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `L`. If you want to represent a synchronous computation that never fails, please see `IO`.

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [IOEither (class)](#ioeither-class)
  - [run (method)](#run-method)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [applyFirst (method)](#applyfirst-method)
  - [applySecond (method)](#applysecond-method)
  - [chain (method)](#chain-method)
  - [fold (method)](#fold-method)
  - [mapLeft (method)](#mapleft-method)
  - [orElse (method)](#orelse-method)
  - [alt (method)](#alt-method)
  - [bimap (method)](#bimap-method)
- [URI (constant)](#uri-constant)
- [ioEither (constant)](#ioeither-constant)
- [fromEither (function)](#fromeither-function)
- [fromLeft (function)](#fromleft-function)
- [left (function)](#left-function)
- [parseJSON (function)](#parsejson-function)
- [right (function)](#right-function)
- [stringifyJSON (function)](#stringifyjson-function)
- [~~tryCatch~~ (function)](#trycatch-function)
- [tryCatch2v (function)](#trycatch2v-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# IOEither (class)

**Signature**

```ts
export class IOEither<L, A> {
  constructor(readonly value: IO<Either<L, A>>) { ... }
  ...
}
```

Added in v1.6.0

## run (method)

Runs the inner io

**Signature**

```ts
run(): Either<L, A> { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): IOEither<L, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: IOEither<L, (b: B) => C>, fb: IOEither<L, B>): IOEither<L, C> { ... }
```

## applyFirst (method)

Combine two effectful actions, keeping only the result of the first

**Signature**

```ts
applyFirst<B>(fb: IOEither<L, B>): IOEither<L, A> { ... }
```

## applySecond (method)

Combine two effectful actions, keeping only the result of the second

**Signature**

```ts
applySecond<B>(fb: IOEither<L, B>): IOEither<L, B> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => IOEither<L, B>): IOEither<L, B> { ... }
```

## fold (method)

**Signature**

```ts
fold<R>(left: (l: L) => R, right: (a: A) => R): IO<R> { ... }
```

## mapLeft (method)

**Signature**

```ts
mapLeft<M>(f: (l: L) => M): IOEither<M, A> { ... }
```

## orElse (method)

**Signature**

```ts
orElse<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A> { ... }
```

## alt (method)

**Signature**

```ts
alt(fy: IOEither<L, A>): IOEither<L, A> { ... }
```

## bimap (method)

**Signature**

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# ioEither (constant)

**Signature**

```ts
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadThrow2<URI> = ...
```

Added in v1.6.0

# fromEither (function)

**Signature**

```ts
export const fromEither = <L, A>(fa: Either<L, A>): IOEither<L, A> => ...
```

Added in v1.6.0

# fromLeft (function)

**Signature**

```ts
export const fromLeft = <L, A>(l: L): IOEither<L, A> => ...
```

Added in v1.6.0

# left (function)

**Signature**

```ts
export const left = <L, A>(fa: IO<L>): IOEither<L, A> => ...
```

Added in v1.6.0

# parseJSON (function)

Converts a JavaScript Object Notation (JSON) string into an object.

**Signature**

```ts
export const parseJSON = <L>(s: string, onError: (reason: unknown) => L): IOEither<L, unknown> => ...
```

**Example**

```ts
import { parseJSON } from 'fp-ts/lib/IOEither'
import { toError } from 'fp-ts/lib/Either'

assert.deepStrictEqual(parseJSON('{"a":1}', toError).run().value, { a: 1 })
assert.deepStrictEqual(
  parseJSON('{"a":}', toError).run().value,
  new SyntaxError('Unexpected token } in JSON at position 5')
)
```

Added in v1.16.0

# right (function)

**Signature**

```ts
export const right = <L, A>(fa: IO<A>): IOEither<L, A> => ...
```

Added in v1.6.0

# stringifyJSON (function)

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

**Signature**

```ts
export const stringifyJSON = <L>(u: unknown, onError: (reason: unknown) => L): IOEither<L, string> => ...
```

**Example**

```ts
import { stringifyJSON } from 'fp-ts/lib/IOEither'
import { toError } from 'fp-ts/lib/Either'

assert.deepStrictEqual(stringifyJSON({ a: 1 }, toError).run().value, '{"a":1}')
const circular: any = { ref: null }
circular.ref = circular
assert.deepStrictEqual(
  stringifyJSON(circular, toError).run().value,
  new TypeError('Converting circular structure to JSON')
)
```

Added in v1.16.0

# ~~tryCatch~~ (function)

Use `tryCatch2v` instead

**Signature**

```ts
export const tryCatch = <A>(f: Lazy<A>, onerror: (reason: unknown) => Error = toError): IOEither<Error, A> => ...
```

Added in v1.6.0

# tryCatch2v (function)

**Signature**

```ts
export const tryCatch2v = <L, A>(f: Lazy<A>, onerror: (reason: unknown) => L): IOEither<L, A> => ...
```

Added in v1.11.0
