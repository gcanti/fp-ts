---
title: Trace.ts
nav_order: 85
parent: Modules
---

# Overview

Adapted from https://github.com/garyb/purescript-debug

---

<h2 class="text-delta">Table of contents</h2>

- [spy (function)](#spy-function)
- [trace (function)](#trace-function)
- [traceA (function)](#tracea-function)
- [traceM (function)](#tracem-function)

---

# spy (function)

Log any value and return it

**Signature**

```ts
export function spy<A>(a: A): A { ... }
```

Added in v2.0.0

# trace (function)

Log any value to the console for debugging purposes and then return a value. This will log the value's underlying
representation for low-level debugging

**Signature**

```ts
export function trace<A>(message: unknown, out: Lazy<A>): A { ... }
```

Added in v2.0.0

# traceA (function)

Log a message to the console for debugging purposes and then return the unit value of the Applicative `F`

**Signature**

```ts
export function traceA<F extends URIS3>(F: Applicative3<F>): <U, L>(message: unknown) => Type3<F, U, L, void>
export function traceA<F extends URIS2>(F: Applicative2<F>): <L>(message: unknown) => Type2<F, L, void>
export function traceA<F extends URIS2, L>(F: Applicative2C<F, L>): (message: unknown) => Type2<F, L, void>
export function traceA<F extends URIS>(F: Applicative1<F>): (message: unknown) => Type<F, void> { ... }
```

Added in v2.0.0

# traceM (function)

Log any value to the console and return it in `Monad` useful when one has monadic chains

**Signature**

```ts
export function traceM<F extends URIS3>(F: Monad3<F>): <U, L, A>(a: A) => Type3<F, U, L, A>
export function traceM<F extends URIS2>(F: Monad2<F>): <L, A>(a: A) => Type2<F, L, A>
export function traceM<F extends URIS2, L>(F: Monad2C<F, L>): <A>(a: A) => Type2<F, L, A>
export function traceM<F extends URIS>(F: Monad1<F>): <A>(a: A) => Type<F, A> { ... }
```

Added in v2.0.0
