---
title: function.ts
nav_order: 34
parent: Modules
---

# function overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Endomorphism (interface)](#endomorphism-interface)
- [FunctionN (interface)](#functionn-interface)
- [Lazy (interface)](#lazy-interface)
- [Predicate (interface)](#predicate-interface)
- [Refinement (interface)](#refinement-interface)
- [absurd](#absurd)
- [constFalse](#constfalse)
- [constNull](#constnull)
- [constTrue](#consttrue)
- [constUndefined](#constundefined)
- [constVoid](#constvoid)
- [constant](#constant)
- [decrement](#decrement)
- [flip](#flip)
- [flow](#flow)
- [identity](#identity)
- [increment](#increment)
- [not](#not)
- [tuple](#tuple)
- [tupled](#tupled)
- [unsafeCoerce](#unsafecoerce)
- [untupled](#untupled)

---

# Endomorphism (interface)

**Signature**

```ts
export interface Endomorphism<A> {
  (a: A): A
}
```

Added in v2.0.0

# FunctionN (interface)

**Signature**

```ts
export interface FunctionN<A extends ReadonlyArray<unknown>, B> {
  (...args: A): B
}
```

**Example**

```ts
import { FunctionN } from 'fp-ts/lib/function'

export const sum: FunctionN<[number, number], number> = (a, b) => a + b
```

Added in v2.0.0

# Lazy (interface)

A _thunk_

**Signature**

```ts
export interface Lazy<A> {
  (): A
}
```

Added in v2.0.0

# Predicate (interface)

**Signature**

```ts
export interface Predicate<A> {
  (a: A): boolean
}
```

Added in v2.0.0

# Refinement (interface)

**Signature**

```ts
export interface Refinement<A, B extends A> {
  (a: A): a is B
}
```

Added in v2.0.0

# absurd

**Signature**

```ts
export function absurd<A>(_: never): A { ... }
```

Added in v2.0.0

# constFalse

A thunk that returns always `false`

**Signature**

```ts
export const constFalse = (): boolean => ...
```

Added in v2.0.0

# constNull

A thunk that returns always `null`

**Signature**

```ts
export const constNull = (): null => ...
```

Added in v2.0.0

# constTrue

A thunk that returns always `true`

**Signature**

```ts
export const constTrue = (): boolean => ...
```

Added in v2.0.0

# constUndefined

A thunk that returns always `undefined`

**Signature**

```ts
export const constUndefined = (): undefined => ...
```

Added in v2.0.0

# constVoid

A thunk that returns always `void`

**Signature**

```ts
export const constVoid = (): void => ...
```

Added in v2.0.0

# constant

**Signature**

```ts
export function constant<A>(a: A): Lazy<A> { ... }
```

Added in v2.0.0

# decrement

**Signature**

```ts
export function decrement(n: number): number { ... }
```

Added in v2.0.0

# flip

Flips the order of the arguments of a function of two arguments.

**Signature**

```ts
export function flip<A, B, C>(f: (a: A, b: B) => C): (b: B, a: A) => C { ... }
```

Added in v2.0.0

# flow

Function composition (from left to right).

**Signature**

```ts
export function flow<A extends ReadonlyArray<unknown>, B>(ab: (...a: A) => B): (...a: A) => B
export function flow<A extends ReadonlyArray<unknown>, B, C>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C
export function flow<A extends ReadonlyArray<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...a: A) => D
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): (...a: A) => E
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (...a: A) => F
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (...a: A) => G
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (...a: A) => H
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (...a: A) => I
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (...a: A) => J { ... }
```

**Example**

```ts
import { flow } from 'fp-ts/lib/function'

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
```

Added in v2.0.0

# identity

**Signature**

```ts
export function identity<A>(a: A): A { ... }
```

Added in v2.0.0

# increment

**Signature**

```ts
export function increment(n: number): number { ... }
```

Added in v2.0.0

# not

**Signature**

```ts
export function not<A>(predicate: Predicate<A>): Predicate<A> { ... }
```

Added in v2.0.0

# tuple

**Signature**

```ts
export function tuple<T extends ReadonlyArray<any>>(...t: T): T { ... }
```

Added in v2.0.0

# tupled

Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.

**Signature**

```ts
export function tupled<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B): (a: A) => B { ... }
```

**Example**

```ts
import { tupled } from 'fp-ts/lib/function'

const add = tupled((x: number, y: number): number => x + y)

assert.strictEqual(add([1, 2]), 3)
```

Added in v2.4.0

# unsafeCoerce

**Signature**

```ts
export const unsafeCoerce: <A, B>(a: A) => B = ...
```

Added in v2.0.0

# untupled

Inverse function of `tupled`

**Signature**

```ts
export function untupled<A extends ReadonlyArray<unknown>, B>(f: (a: A) => B): (...a: A) => B { ... }
```

Added in v2.4.0
