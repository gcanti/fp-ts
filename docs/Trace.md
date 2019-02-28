---
id: Trace
title: Trace
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Trace.ts)

## spy

Log any value and return it

**Signature** (function)

```ts
export const spy = <A>(a: A): A => { ... }
```

Added in v1.0.0

## trace

Log any value to the console for debugging purposes and then return a value. This will log the value's underlying
representation for low-level debugging

**Signature** (function)

```ts
export const trace = <A>(message: any, out: Lazy<A>): A => { ... }
```

Added in v1.0.0

## traceA

Log a message to the console for debugging purposes and then return the unit value of the Applicative `F`

**Signature** (function)

```ts
export function traceA<F>(F: Applicative<F>): (message: any) => HKT<F, void>  { ... }
```

Added in v1.0.0

## traceM

Log any value to the console and return it in `Monad` useful when one has monadic chains

**Signature** (function)

```ts
export function traceM<F>(F: Monad<F>): <A>(a: A) => HKT<F, A>  { ... }
```

Added in v1.0.0
