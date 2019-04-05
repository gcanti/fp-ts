---
title: function.ts
nav_order: 36
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [BinaryOperation (type alias)](#binaryoperation-type-alias)
- [Cokleisli (type alias)](#cokleisli-type-alias)
- [Curried2 (type alias)](#curried2-type-alias)
- [Curried3 (type alias)](#curried3-type-alias)
- [Curried4 (type alias)](#curried4-type-alias)
- [Curried5 (type alias)](#curried5-type-alias)
- [Curried6 (type alias)](#curried6-type-alias)
- [Curried7 (type alias)](#curried7-type-alias)
- [Curried8 (type alias)](#curried8-type-alias)
- [Curried9 (type alias)](#curried9-type-alias)
- [Endomorphism (type alias)](#endomorphism-type-alias)
- [Function1 (type alias)](#function1-type-alias)
- [Function2 (type alias)](#function2-type-alias)
- [Function3 (type alias)](#function3-type-alias)
- [Function4 (type alias)](#function4-type-alias)
- [Function5 (type alias)](#function5-type-alias)
- [Function6 (type alias)](#function6-type-alias)
- [Function7 (type alias)](#function7-type-alias)
- [Function8 (type alias)](#function8-type-alias)
- [Function9 (type alias)](#function9-type-alias)
- [FunctionN (type alias)](#functionn-type-alias)
- [Kleisli (type alias)](#kleisli-type-alias)
- [Lazy (type alias)](#lazy-type-alias)
- [Predicate (type alias)](#predicate-type-alias)
- [Refinement (type alias)](#refinement-type-alias)
- [phantom (constant)](#phantom-constant)
- [unsafeCoerce (constant)](#unsafecoerce-constant)
- [and (function)](#and-function)
- [apply (function)](#apply-function)
- [applyFlipped (function)](#applyflipped-function)
- [compose (function)](#compose-function)
- [concat (function)](#concat-function)
- [constFalse (function)](#constfalse-function)
- [constIdentity (function)](#constidentity-function)
- [constNull (function)](#constnull-function)
- [constTrue (function)](#consttrue-function)
- [constUndefined (function)](#constundefined-function)
- [constVoid (function)](#constvoid-function)
- [constant (function)](#constant-function)
- [curried (function)](#curried-function)
- [curry (function)](#curry-function)
- [decrement (function)](#decrement-function)
- [flip (function)](#flip-function)
- [identity (function)](#identity-function)
- [increment (function)](#increment-function)
- [not (function)](#not-function)
- [on (function)](#on-function)
- [or (function)](#or-function)
- [pipe (function)](#pipe-function)
- [toString (function)](#tostring-function)
- [tuple (function)](#tuple-function)
- [tupleCurried (function)](#tuplecurried-function)

---

# BinaryOperation (type alias)

**Signature**

```ts
export type BinaryOperation<A, B> = (a1: A, a2: A) => B
```

# Cokleisli (type alias)

**Signature**

```ts
export type Cokleisli<F, A, B> = (fa: HKT<F, A>) => B
```

# Curried2 (type alias)

**Signature**

```ts
export type Curried2<A, B, C> = (a: A) => (b: B) => C
```

# Curried3 (type alias)

**Signature**

```ts
export type Curried3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D
```

# Curried4 (type alias)

**Signature**

```ts
export type Curried4<A, B, C, D, E> = (a: A) => (b: B) => (c: C) => (d: D) => E
```

# Curried5 (type alias)

**Signature**

```ts
export type Curried5<A, B, C, D, E, F> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F
```

# Curried6 (type alias)

**Signature**

```ts
export type Curried6<A, B, C, D, E, F, G> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => G
```

# Curried7 (type alias)

**Signature**

```ts
export type Curried7<A, B, C, D, E, F, G, H> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => H
```

# Curried8 (type alias)

**Signature**

```ts
export type Curried8<A, B, C, D, E, F, G, H, I> = (
  a: A
) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => I
```

# Curried9 (type alias)

**Signature**

```ts
export type Curried9<A, B, C, D, E, F, G, H, I, J> = (
  a: A
) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => J
```

# Endomorphism (type alias)

**Signature**

```ts
export type Endomorphism<A> = (a: A) => A
```

# Function1 (type alias)

**Signature**

```ts
export type Function1<A, B> = (a: A) => B
```

# Function2 (type alias)

**Signature**

```ts
export type Function2<A, B, C> = (a: A, b: B) => C
```

# Function3 (type alias)

**Signature**

```ts
export type Function3<A, B, C, D> = (a: A, b: B, c: C) => D
```

# Function4 (type alias)

**Signature**

```ts
export type Function4<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E
```

# Function5 (type alias)

**Signature**

```ts
export type Function5<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E) => F
```

# Function6 (type alias)

**Signature**

```ts
export type Function6<A, B, C, D, E, F, G> = (a: A, b: B, c: C, d: D, e: E, f: F) => G
```

# Function7 (type alias)

**Signature**

```ts
export type Function7<A, B, C, D, E, F, G, H> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H
```

# Function8 (type alias)

**Signature**

```ts
export type Function8<A, B, C, D, E, F, G, H, I> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => I
```

# Function9 (type alias)

**Signature**

```ts
export type Function9<A, B, C, D, E, F, G, H, I, J> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => J
```

# FunctionN (type alias)

**Signature**

```ts
export type FunctionN<A extends Array<any>, B> = (...args: A) => B
```

**Example**

```ts
import { FunctionN } from 'fp-ts/lib/function'

export const sum: FunctionN<[number, number], number> = (a, b) => a + b
```

Added in v1.16.0

# Kleisli (type alias)

**Signature**

```ts
export type Kleisli<F, A, B> = (a: A) => HKT<F, B>
```

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

Added in v1.0.0

# unsafeCoerce (constant)

**Signature**

```ts
export const unsafeCoerce: <A, B>(a: A) => B = ...
```

Added in v1.0.0

# and (function)

**Signature**

```ts
export const and = <A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> => ...
```

Added in v1.0.0

# apply (function)

Applies a function to an argument (\$)

**Signature**

```ts
export const apply = <A, B>(f: (a: A) => B) => (a: A): B => ...
```

Added in v1.0.0

# applyFlipped (function)

Applies an argument to a function (#)

**Signature**

```ts
export const applyFlipped = <A>(a: A) => <B>(f: (a: A) => B): B => ...
```

Added in v1.0.0

# compose (function)

**Signature**

```ts
export function compose<A, B, C>(bc: (b: B) => C, ab: (a: A) => B): (a: A) => C
export function compose<A, B, C, D>(cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => D
export function compose<A, B, C, D, E>(de: (d: D) => E, cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => E
export function compose<A, B, C, D, E, F>(
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => F
export function compose<A, B, C, D, E, F, G>(
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => G
export function compose<A, B, C, D, E, F, G, H>(
  gh: (g: G) => H,
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => H
export function compose<A, B, C, D, E, F, G, H, I>(
  hi: (h: H) => I,
  gh: (g: G) => H,
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => I
export function compose<A, B, C, D, E, F, G, H, I, J>(
  ij: (i: I) => J,
  hi: (h: H) => I,
  gh: (g: G) => H,
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => J { ... }
```

Added in v1.0.0

# concat (function)

**Signature**

```ts
export const concat = <A>(x: Array<A>, y: Array<A>): Array<A> => ...
```

Added in v1.0.0

# constFalse (function)

A thunk that returns always `false`

**Signature**

```ts
export const constFalse = (): boolean => ...
```

Added in v1.0.0

# constIdentity (function)

A thunk that returns always the `identity` function.
For use with `applySecond` methods.

**Signature**

```ts
export const constIdentity = (): (<A>(a: A) => A) => ...
```

Added in v1.5.0

# constNull (function)

A thunk that returns always `null`

**Signature**

```ts
export const constNull = (): null => ...
```

Added in v1.0.0

# constTrue (function)

A thunk that returns always `true`

**Signature**

```ts
export const constTrue = (): boolean => ...
```

Added in v1.0.0

# constUndefined (function)

A thunk that returns always `undefined`

**Signature**

```ts
export const constUndefined = (): undefined => ...
```

Added in v1.0.0

# constVoid (function)

A thunk that returns always `void`

**Signature**

```ts
export const constVoid = (): void => ...
```

Added in v1.14.0

# constant (function)

**Signature**

```ts
export const constant = <A>(a: A): Lazy<A> => ...
```

Added in v1.0.0

# curried (function)

**Signature**

```ts
export function curried(f: Function, n: number, acc: Array<any>) { ... }
```

Added in v1.0.0

# curry (function)

**Signature**

```ts
export function curry<A, B, C>(f: Function2<A, B, C>): Curried2<A, B, C>
export function curry<A, B, C, D>(f: Function3<A, B, C, D>): Curried3<A, B, C, D>
export function curry<A, B, C, D, E>(f: Function4<A, B, C, D, E>): Curried4<A, B, C, D, E>
export function curry<A, B, C, D, E, F>(f: Function5<A, B, C, D, E, F>): Curried5<A, B, C, D, E, F>
export function curry<A, B, C, D, E, F, G>(f: Function6<A, B, C, D, E, F, G>): Curried6<A, B, C, D, E, F, G>
export function curry<A, B, C, D, E, F, G, H>(f: Function7<A, B, C, D, E, F, G, H>): Curried7<A, B, C, D, E, F, G, H>
export function curry<A, B, C, D, E, F, G, H, I>(
  f: Function8<A, B, C, D, E, F, G, H, I>
): Curried8<A, B, C, D, E, F, G, H, I>
export function curry<A, B, C, D, E, F, G, H, I, J>(
  f: Function9<A, B, C, D, E, F, G, H, I, J>
): Curried9<A, B, C, D, E, F, G, H, I, J> { ... }
```

Added in v1.0.0

# decrement (function)

**Signature**

```ts
export const decrement = (n: number): number => ...
```

Added in v1.9.0

# flip (function)

Flips the order of the arguments to a function of two arguments.

**Signature**

```ts
export const flip = <A, B, C>(f: Curried2<A, B, C>): Curried2<B, A, C> => ...
```

Added in v1.0.0

# identity (function)

**Signature**

```ts
export const identity = <A>(a: A): A => ...
```

Added in v1.0.0

# increment (function)

**Signature**

```ts
export const increment = (n: number): number => ...
```

Added in v1.9.0

# not (function)

**Signature**

```ts
export const not = <A>(predicate: Predicate<A>): Predicate<A> => ...
```

Added in v1.0.0

# on (function)

The `on` function is used to change the domain of a binary operator.

**Signature**

```ts
export const on = <B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B): BinaryOperation<A, C> => ...
```

Added in v1.0.0

# or (function)

**Signature**

```ts
export function or<A, B1 extends A, B2 extends A>(p1: Refinement<A, B1>, p2: Refinement<A, B2>): Refinement<A, B1 | B2>
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> { ... }
```

Added in v1.0.0

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

Added in v1.0.0

# toString (function)

**Signature**

```ts
export const toString = (x: any): string => ...
```

Added in v1.0.0

# tuple (function)

**Signature**

```ts
export const tuple = <T extends Array<any>>(...t: T): T => ...
```

Added in v1.0.0

# tupleCurried (function)

**Signature**

```ts
export const tupleCurried = <A>(a: A) => <B>(b: B): [A, B] => ...
```

Added in v1.0.0
