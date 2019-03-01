---
title: function.ts
nav_order: 36
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [BinaryOperation](#binaryoperation)
- [Cokleisli](#cokleisli)
- [Curried2](#curried2)
- [Curried3](#curried3)
- [Curried4](#curried4)
- [Curried5](#curried5)
- [Curried6](#curried6)
- [Curried7](#curried7)
- [Curried8](#curried8)
- [Curried9](#curried9)
- [Endomorphism](#endomorphism)
- [Function1](#function1)
- [Function2](#function2)
- [Function3](#function3)
- [Function4](#function4)
- [Function5](#function5)
- [Function6](#function6)
- [Function7](#function7)
- [Function8](#function8)
- [Function9](#function9)
- [Kleisli](#kleisli)
- [Lazy](#lazy)
- [Predicate](#predicate)
- [Refinement](#refinement)
- [phantom](#phantom)
- [unsafeCoerce](#unsafecoerce)
- [and](#and)
- [apply](#apply)
- [applyFlipped](#applyflipped)
- [compose](#compose)
- [concat](#concat)
- [constFalse](#constfalse)
- [constIdentity](#constidentity)
- [constNull](#constnull)
- [constTrue](#consttrue)
- [constUndefined](#constundefined)
- [constVoid](#constvoid)
- [constant](#constant)
- [curried](#curried)
- [curry](#curry)
- [decrement](#decrement)
- [flip](#flip)
- [identity](#identity)
- [increment](#increment)
- [not](#not)
- [on](#on)
- [or](#or)
- [pipe](#pipe)
- [toString](#tostring)
- [tuple](#tuple)
- [tupleCurried](#tuplecurried)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# BinaryOperation

**Signature** (type alias)

```ts
export type BinaryOperation<A, B> = (a1: A, a2: A) => B
```

# Cokleisli

**Signature** (type alias)

```ts
export type Cokleisli<F, A, B> = (fa: HKT<F, A>) => B
```

# Curried2

**Signature** (type alias)

```ts
export type Curried2<A, B, C> = (a: A) => (b: B) => C
```

# Curried3

**Signature** (type alias)

```ts
export type Curried3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D
```

# Curried4

**Signature** (type alias)

```ts
export type Curried4<A, B, C, D, E> = (a: A) => (b: B) => (c: C) => (d: D) => E
```

# Curried5

**Signature** (type alias)

```ts
export type Curried5<A, B, C, D, E, F> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F
```

# Curried6

**Signature** (type alias)

```ts
export type Curried6<A, B, C, D, E, F, G> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => G
```

# Curried7

**Signature** (type alias)

```ts
export type Curried7<A, B, C, D, E, F, G, H> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => H
```

# Curried8

**Signature** (type alias)

```ts
export type Curried8<A, B, C, D, E, F, G, H, I> = (
  a: A
) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => I
```

# Curried9

**Signature** (type alias)

```ts
export type Curried9<A, B, C, D, E, F, G, H, I, J> = (
  a: A
) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => J
```

# Endomorphism

**Signature** (type alias)

```ts
export type Endomorphism<A> = (a: A) => A
```

# Function1

**Signature** (type alias)

```ts
export type Function1<A, B> = (a: A) => B
```

# Function2

**Signature** (type alias)

```ts
export type Function2<A, B, C> = (a: A, b: B) => C
```

# Function3

**Signature** (type alias)

```ts
export type Function3<A, B, C, D> = (a: A, b: B, c: C) => D
```

# Function4

**Signature** (type alias)

```ts
export type Function4<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E
```

# Function5

**Signature** (type alias)

```ts
export type Function5<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E) => F
```

# Function6

**Signature** (type alias)

```ts
export type Function6<A, B, C, D, E, F, G> = (a: A, b: B, c: C, d: D, e: E, f: F) => G
```

# Function7

**Signature** (type alias)

```ts
export type Function7<A, B, C, D, E, F, G, H> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H
```

# Function8

**Signature** (type alias)

```ts
export type Function8<A, B, C, D, E, F, G, H, I> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => I
```

# Function9

**Signature** (type alias)

```ts
export type Function9<A, B, C, D, E, F, G, H, I, J> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => J
```

# Kleisli

**Signature** (type alias)

```ts
export type Kleisli<F, A, B> = (a: A) => HKT<F, B>
```

# Lazy

Thunk type

**Signature** (type alias)

```ts
export type Lazy<A> = () => A
```

# Predicate

**Signature** (type alias)

```ts
export type Predicate<A> = (a: A) => boolean
```

# Refinement

**Signature** (type alias)

```ts
export type Refinement<A, B extends A> = (a: A) => a is B
```

# phantom

For use with phantom fields

**Signature** (constant)

```ts
export const phantom: any = ...
```

Added in v1.0.0

# unsafeCoerce

**Signature** (constant)

```ts
export const unsafeCoerce: <A, B>(a: A) => B = ...
```

Added in v1.0.0

# and

**Signature** (function)

```ts
export const and = <A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> => ...
```

Added in v1.0.0

# apply

Applies a function to an argument (\$)

**Signature** (function)

```ts
export const apply = <A, B>(f: (a: A) => B) => (a: A): B => ...
```

Added in v1.0.0

# applyFlipped

Applies an argument to a function (#)

**Signature** (function)

```ts
export const applyFlipped = <A>(a: A) => <B>(f: (a: A) => B): B => ...
```

Added in v1.0.0

# compose

**Signature** (function)

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
): (a: A) => J
export function compose(...fns: Array<Function>): Function { ... }
```

Added in v1.0.0

# concat

**Signature** (function)

```ts
export const concat = <A>(x: Array<A>, y: Array<A>): Array<A> => ...
```

Added in v1.0.0

# constFalse

A thunk that returns always `false`

**Signature** (function)

```ts
export const constFalse = (): boolean => ...
```

Added in v1.0.0

# constIdentity

A thunk that returns always the `identity` function.
For use with `applySecond` methods.

**Signature** (function)

```ts
export const constIdentity = (): (<A>(a: A) => A) => ...
```

Added in v1.5.0

# constNull

A thunk that returns always `null`

**Signature** (function)

```ts
export const constNull = (): null => ...
```

Added in v1.0.0

# constTrue

A thunk that returns always `true`

**Signature** (function)

```ts
export const constTrue = (): boolean => ...
```

Added in v1.0.0

# constUndefined

A thunk that returns always `undefined`

**Signature** (function)

```ts
export const constUndefined = (): undefined => ...
```

Added in v1.0.0

# constVoid

A thunk that returns always `void`

**Signature** (function)

```ts
export const constVoid = (): void => ...
```

Added in v1.14.0

# constant

**Signature** (function)

```ts
export const constant = <A>(a: A): Lazy<A> => ...
```

Added in v1.0.0

# curried

**Signature** (function)

```ts
export function curried(f: Function, n: number, acc: Array<any>) { ... }
```

Added in v1.0.0

# curry

**Signature** (function)

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
): Curried9<A, B, C, D, E, F, G, H, I, J>
export function curry(f: Function) { ... }
```

Added in v1.0.0

# decrement

**Signature** (function)

```ts
export const decrement = (n: number): number => ...
```

Added in v1.9.0

# flip

Flips the order of the arguments to a function of two arguments.

**Signature** (function)

```ts
export const flip = <A, B, C>(f: Curried2<A, B, C>): Curried2<B, A, C> => ...
```

Added in v1.0.0

# identity

**Signature** (function)

```ts
export const identity = <A>(a: A): A => ...
```

Added in v1.0.0

# increment

**Signature** (function)

```ts
export const increment = (n: number): number => ...
```

Added in v1.9.0

# not

**Signature** (function)

```ts
export const not = <A>(predicate: Predicate<A>): Predicate<A> => ...
```

Added in v1.0.0

# on

The `on` function is used to change the domain of a binary operator.

**Signature** (function)

```ts
export const on = <B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B): BinaryOperation<A, C> => ...
```

Added in v1.0.0

# or

**Signature** (function)

```ts
export function or<A, B1 extends A, B2 extends A>(p1: Refinement<A, B1>, p2: Refinement<A, B2>): Refinement<A, B1 | B2>
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> { ... }
```

Added in v1.0.0

# pipe

**Signature** (function)

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
): (a: A) => J
export function pipe(...fns: Array<Function>): Function { ... }
```

Added in v1.0.0

# toString

**Signature** (function)

```ts
export const toString = (x: any): string => ...
```

Added in v1.0.0

# tuple

**Signature** (function)

```ts
export const tuple = <A, B>(a: A, b: B): [A, B] => ...
```

Added in v1.0.0

# tupleCurried

**Signature** (function)

```ts
export const tupleCurried = <A>(a: A) => <B>(b: B): [A, B] => ...
```

Added in v1.0.0
