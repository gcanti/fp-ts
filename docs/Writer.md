---
id: Writer
title: Module Writer
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts)

# Writer

```ts
constructor(readonly run: () => [A, W]) {}
```

Added in v1.0.0 (data)

## eval

```ts
(): A
```

Added in v1.0.0 (method)

## exec

```ts
(): W
```

Added in v1.0.0 (method)

## map

```ts
<B>(f: (a: A) => B): Writer<W, B>
```

Added in v1.0.0 (method)

## writer

```ts
Functor2<URI>
```

Added in v1.0.0 (instance)

## censor

```ts
<W, A>(fa: Writer<W, A>, f: (w: W) => W): Writer<W, A>
```

Added in v1.3.0 (function)

Modify the final accumulator value by applying a function

## getMonad

```ts
<W>(M: Monoid<W>): Monad2C<URI, W>
```

Added in v1.0.0 (function)

## listen

```ts
<W, A>(fa: Writer<W, A>): Writer<W, [A, W]>
```

Added in v1.3.0 (function)

Modifies the result to include the changes to the accumulator

## listens

```ts
<W, A, B>(fa: Writer<W, A>, f: (w: W) => B): Writer<W, [A, B]>
```

Added in v1.3.0 (function)

Projects a value from modifications made to the accumulator during an action

## pass

```ts
<W, A>(fa: Writer<W, [A, (w: W) => W]>): Writer<W, A>
```

Added in v1.3.0 (function)

Applies the returned function to the accumulator

## tell

```ts
<W>(w: W): Writer<W, void>
```

Added in v1.0.0 (function)

Appends a value to the accumulator
