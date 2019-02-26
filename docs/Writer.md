---
id: Writer
title: Writer
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts)

# Writer

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts#L22-L39)

```ts
export class Writer<W, A> {
  constructor(readonly run: () => [A, W]) {}
  ...
}
```

## eval

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts#L27-L29)

```ts
eval(): A  { ... }
```

Added in v1.0.0

## exec

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts#L30-L32)

```ts
exec(): W  { ... }
```

Added in v1.0.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts#L33-L38)

```ts
map<B>(f: (a: A) => B): Writer<W, B>  { ... }
```

Added in v1.0.0

Added in v1.0.0

## writer

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts#L140-L143)

```ts
export const writer: Functor2<URI> = ...
```

Added in v1.0.0

## censor

Modify the final accumulator value by applying a function

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts#L115-L120)

```ts
export const censor = <W, A>(fa: Writer<W, A>, f: (w: W) => W): Writer<W, A> => { ... }
```

Added in v1.3.0

## getMonad

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts#L126-L135)

```ts
export const getMonad = <W>(M: Monoid<W>): Monad2C<URI, W> => { ... }
```

Added in v1.0.0

## listen

Modifies the result to include the changes to the accumulator

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts#L79-L84)

```ts
export const listen = <W, A>(fa: Writer<W, A>): Writer<W, [A, W]> => { ... }
```

Added in v1.3.0

## listens

Projects a value from modifications made to the accumulator during an action

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts#L103-L108)

```ts
export const listens = <W, A, B>(fa: Writer<W, A>, f: (w: W) => B): Writer<W, [A, B]> => { ... }
```

Added in v1.3.0

## pass

Applies the returned function to the accumulator

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts#L91-L96)

```ts
export const pass = <W, A>(fa: Writer<W, [A, (w: W) => W]>): Writer<W, A> => { ... }
```

Added in v1.3.0

## tell

Appends a value to the accumulator

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts#L70-L72)

```ts
export const tell = <W>(w: W): Writer<W, void> => { ... }
```

Added in v1.0.0
