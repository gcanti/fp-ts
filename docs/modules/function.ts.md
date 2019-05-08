---
title: function.ts
nav_order: 36
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [BinaryOperation (type alias)](#binaryoperation-type-alias)
- [Endomorphism (type alias)](#endomorphism-type-alias)
- [FunctionN (type alias)](#functionn-type-alias)
- [Lazy (type alias)](#lazy-type-alias)
- [Predicate (type alias)](#predicate-type-alias)
- [Refinement (type alias)](#refinement-type-alias)
- [phantom (constant)](#phantom-constant)
- [unsafeCoerce (constant)](#unsafecoerce-constant)
- [absurd (function)](#absurd-function)
- [and (function)](#and-function)
- [constFalse (function)](#constfalse-function)
- [constNull (function)](#constnull-function)
- [constTrue (function)](#consttrue-function)
- [constUndefined (function)](#constundefined-function)
- [constVoid (function)](#constvoid-function)
- [constant (function)](#constant-function)
- [decrement (function)](#decrement-function)
- [flip (function)](#flip-function)
- [identity (function)](#identity-function)
- [increment (function)](#increment-function)
- [not (function)](#not-function)
- [on (function)](#on-function)
- [or (function)](#or-function)
- [pipe (function)](#pipe-function)
- [tuple (function)](#tuple-function)

---

# BinaryOperation (type alias)

**Signature**

```ts
export type BinaryOperation<A, B> = (a1: A, a2: A) => B
```

# Endomorphism (type alias)

**Signature**

```ts
export type Endomorphism<A> = (a: A) => A
```

# FunctionN (type alias)

**Signature**

```ts
export type FunctionN<A extends Array<unknown>, B> = (...args: A) => B
```

**Example**

```ts
import { FunctionN } from 'fp-ts/lib/function'

export const sum: FunctionN<[number, number], number> = (a, b) => a + b
```

Added in v2.0.0

# Lazy (type alias)

Thunk type

**Signature**

```ts
export type Lazy<A> = () => A
```

# Predicate (type alias)

**Signature**

```ts
export type Predicate<A> = (a: A) => boolean
```

# Refinement (type alias)

**Signature**

```ts
export type Refinement<A, B extends A> = (a: A) => a is B
```

# phantom (constant)

For use with phantom fields

**Signature**

```ts
export const phantom: any = ...
```

Added in v2.0.0

# unsafeCoerce (constant)

**Signature**

```ts
export const unsafeCoerce: <A, B>(a: A) => B = ...
```

Added in v2.0.0

# absurd (function)

**Signature**

```ts
export function absurd<A>(_: never): A { ... }
```

Added in v2.0.0

# and (function)

**Signature**

```ts
export function and<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> { ... }
```

Added in v2.0.0

# constFalse (function)

A thunk that returns always `false`

**Signature**

```ts
export const constFalse = (): boolean => ...
```

Added in v2.0.0

# constNull (function)

A thunk that returns always `null`

**Signature**

```ts
export const constNull = (): null => ...
```

Added in v2.0.0

# constTrue (function)

A thunk that returns always `true`

**Signature**

```ts
export const constTrue = (): boolean => ...
```

Added in v2.0.0

# constUndefined (function)

A thunk that returns always `undefined`

**Signature**

```ts
export const constUndefined = (): undefined => ...
```

Added in v2.0.0

# constVoid (function)

A thunk that returns always `void`

**Signature**

```ts
export const constVoid = (): void => ...
```

Added in v2.0.0

# constant (function)

**Signature**

```ts
export function constant<A>(a: A): Lazy<A> { ... }
```

Added in v2.0.0

# decrement (function)

**Signature**

```ts
export function decrement(n: number): number { ... }
```

Added in v2.0.0

# flip (function)

Flips the order of the arguments of a function of two arguments.

**Signature**

```ts
export function flip<A, B, C>(f: (a: A, b: B) => C): (b: B, a: A) => C { ... }
```

Added in v2.0.0

# identity (function)

**Signature**

```ts
export function identity<A>(a: A): A { ... }
```

Added in v2.0.0

# increment (function)

**Signature**

```ts
export function increment(n: number): number { ... }
```

Added in v2.0.0

# not (function)

**Signature**

```ts
export function not<A>(predicate: Predicate<A>): Predicate<A> { ... }
```

Added in v2.0.0

# on (function)

The `on` function is used to change the domain of a binary operator.

**Signature**

```ts
export function on<A, B, C>(op: BinaryOperation<B, C>, f: (a: A) => B): BinaryOperation<A, C> { ... }
```

Added in v2.0.0

# or (function)

**Signature**

```ts
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> { ... }
```

Added in v2.0.0

# pipe (function)

**Signature**

```ts
export function pipe<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C
export function pipe<A, B, C, D>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (a: A) => D
export function pipe<A, B, C, D, E>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): (a: A) => E
export function pipe<A, B, C, D, E, F>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (a: A) => F
export function pipe<A, B, C, D, E, F, G>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (a: A) => G
export function pipe<A, B, C, D, E, F, G, H>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (a: A) => H
export function pipe<A, B, C, D, E, F, G, H, I>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (a: A) => I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (a: A) => J { ... }
```

Added in v2.0.0

# tuple (function)

**Signature**

```ts
export function tuple<T extends Array<any>>(...t: T): T { ... }
```

Added in v2.0.0
