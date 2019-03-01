---
title: Trace.ts
nav_order: 86
---

# Overview

Adapted from https://github.com/garyb/purescript-debug

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [spy](#spy)
- [trace](#trace)
- [traceA](#tracea)
- [traceM](#tracem)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# spy

Log any value and return it

**Signature** (function)

```ts
export const spy = <A>(a: A): A => ...
```

Added in v1.0.0

# trace

Log any value to the console for debugging purposes and then return a value. This will log the value's underlying
representation for low-level debugging

**Signature** (function)

```ts
export const trace = <A>(message: any, out: Lazy<A>): A => ...
```

Added in v1.0.0

# traceA

Log a message to the console for debugging purposes and then return the unit value of the Applicative `F`

**Signature** (function)

```ts
export function traceA<F extends URIS3>(F: Applicative3<F>): <U, L>(message: any) => Type3<F, U, L, void>
export function traceA<F extends URIS3, U, L>(F: Applicative3C<F, U, L>): (message: any) => Type3<F, U, L, void>
export function traceA<F extends URIS2>(F: Applicative2<F>): <L>(message: any) => Type2<F, L, void>
export function traceA<F extends URIS2, L>(F: Applicative2C<F, L>): (message: any) => Type2<F, L, void>
export function traceA<F extends URIS>(F: Applicative1<F>): (message: any) => Type<F, void>
export function traceA<F>(F: Applicative<F>): (message: any) => HKT<F, void> { ... }
```

Added in v1.0.0

# traceM

Log any value to the console and return it in `Monad` useful when one has monadic chains

**Signature** (function)

```ts
export function traceM<F extends URIS3>(F: Monad3<F>): <U, L, A>(a: A) => Type3<F, U, L, A>
export function traceM<F extends URIS3, U, L>(F: Monad3C<F, U, L>): <A>(a: A) => Type3<F, U, L, A>
export function traceM<F extends URIS2>(F: Monad2<F>): <L, A>(a: A) => Type2<F, L, A>
export function traceM<F extends URIS2, L>(F: Monad2C<F, L>): <A>(a: A) => Type2<F, L, A>
export function traceM<F extends URIS>(F: Monad1<F>): <A>(a: A) => Type<F, A>
export function traceM<F>(F: Monad<F>): <A>(a: A) => HKT<F, A> { ... }
```

Added in v1.0.0
