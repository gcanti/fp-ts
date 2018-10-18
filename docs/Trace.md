---
id: Trace
title: Module Trace
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Trace.ts)

## spy

```ts
<A>(a: A): A
```

Added in v1.0.0 (function)

Log any value and return it

## trace

```ts
<A>(message: any, out: Lazy<A>): A
```

Added in v1.0.0 (function)

Log any value to the console for debugging purposes and then return a value. This will log the value's underlying
representation for low-level debugging

## traceA

```ts
traceA<F>(F: Applicative<F>): (message: any) => HKT<F, void>
```

Added in v1.0.0 (function)

Log a message to the console for debugging purposes and then return the unit value of the Applicative `F`

## traceM

```ts
traceM<F>(F: Monad<F>): <A>(a: A) => HKT<F, A>
```

Added in v1.0.0 (function)

Log any value to the console and return it in `Monad` useful when one has monadic chains
