---
title: function.ts
nav_order: 41
parent: Modules
---

## function overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [getBooleanAlgebra](#getbooleanalgebra)
  - [getMonoid](#getmonoid)
  - [getRing](#getring)
  - [getSemigroup](#getsemigroup)
  - [getSemiring](#getsemiring)
  - [~~getEndomorphismMonoid~~](#getendomorphismmonoid)
- [utils](#utils)
  - [FunctionN (interface)](#functionn-interface)
  - [Lazy (interface)](#lazy-interface)
  - [SK](#sk)
  - [absurd](#absurd)
  - [apply](#apply)
  - [constFalse](#constfalse)
  - [constNull](#constnull)
  - [constTrue](#consttrue)
  - [constUndefined](#constundefined)
  - [constVoid](#constvoid)
  - [constant](#constant)
  - [decrement](#decrement)
  - [flip](#flip)
  - [flow](#flow)
  - [hole](#hole)
  - [identity](#identity)
  - [increment](#increment)
  - [pipe](#pipe)
  - [tuple](#tuple)
  - [tupled](#tupled)
  - [unsafeCoerce](#unsafecoerce)
  - [untupled](#untupled)
  - [~~Endomorphism~~ (interface)](#endomorphism-interface)
  - [~~Predicate~~ (interface)](#predicate-interface)
  - [~~Refinement~~ (interface)](#refinement-interface)
  - [~~not~~](#not)

---

# instances

## getBooleanAlgebra

**Signature**

```ts
export declare const getBooleanAlgebra: <B>(B: BooleanAlgebra<B>) => <A = never>() => BooleanAlgebra<(a: A) => B>
```

Added in v2.10.0

## getMonoid

Unary functions form a monoid as long as you can provide a monoid for the codomain.

**Signature**

```ts
export declare const getMonoid: <M>(M: Monoid<M>) => <A = never>() => Monoid<(a: A) => M>
```

**Example**

```ts
import { Predicate } from 'fp-ts/Predicate'
import { getMonoid } from 'fp-ts/function'
import * as B from 'fp-ts/boolean'

const f: Predicate<number> = (n) => n <= 2
const g: Predicate<number> = (n) => n >= 0

const M1 = getMonoid(B.MonoidAll)<number>()

assert.deepStrictEqual(M1.concat(f, g)(1), true)
assert.deepStrictEqual(M1.concat(f, g)(3), false)

const M2 = getMonoid(B.MonoidAny)<number>()

assert.deepStrictEqual(M2.concat(f, g)(1), true)
assert.deepStrictEqual(M2.concat(f, g)(3), true)
```

Added in v2.10.0

## getRing

**Signature**

```ts
export declare const getRing: <A, B>(R: Ring<B>) => Ring<(a: A) => B>
```

Added in v2.10.0

## getSemigroup

Unary functions form a semigroup as long as you can provide a semigroup for the codomain.

**Signature**

```ts
export declare const getSemigroup: <S>(S: Semigroup<S>) => <A = never>() => Semigroup<(a: A) => S>
```

**Example**

```ts
import { Predicate, getSemigroup } from 'fp-ts/function'
import * as B from 'fp-ts/boolean'

const f: Predicate<number> = (n) => n <= 2
const g: Predicate<number> = (n) => n >= 0

const S1 = getSemigroup(B.SemigroupAll)<number>()

assert.deepStrictEqual(S1.concat(f, g)(1), true)
assert.deepStrictEqual(S1.concat(f, g)(3), false)

const S2 = getSemigroup(B.SemigroupAny)<number>()

assert.deepStrictEqual(S2.concat(f, g)(1), true)
assert.deepStrictEqual(S2.concat(f, g)(3), true)
```

Added in v2.10.0

## getSemiring

**Signature**

```ts
export declare const getSemiring: <A, B>(S: Semiring<B>) => Semiring<(a: A) => B>
```

Added in v2.10.0

## ~~getEndomorphismMonoid~~

Use `Endomorphism` module instead.

**Signature**

```ts
export declare const getEndomorphismMonoid: <A = never>() => Monoid<Endomorphism<A>>
```

Added in v2.10.0

# utils

## FunctionN (interface)

**Signature**

```ts
export interface FunctionN<A extends ReadonlyArray<unknown>, B> {
  (...args: A): B
}
```

**Example**

```ts
import { FunctionN } from 'fp-ts/function'

export const sum: FunctionN<[number, number], number> = (a, b) => a + b
```

Added in v2.0.0

## Lazy (interface)

A _thunk_

**Signature**

```ts
export interface Lazy<A> {
  (): A
}
```

Added in v2.0.0

## SK

**Signature**

```ts
export declare const SK: <A, B>(_: A, b: B) => B
```

Added in v2.11.0

## absurd

**Signature**

```ts
export declare function absurd<A>(_: never): A
```

Added in v2.0.0

## apply

**Signature**

```ts
export declare const apply: <A>(a: A) => <B>(f: (a: A) => B) => B
```

Added in v2.11.0

## constFalse

A thunk that returns always `false`.

**Signature**

```ts
export declare const constFalse: Lazy<boolean>
```

Added in v2.0.0

## constNull

A thunk that returns always `null`.

**Signature**

```ts
export declare const constNull: Lazy<null>
```

Added in v2.0.0

## constTrue

A thunk that returns always `true`.

**Signature**

```ts
export declare const constTrue: Lazy<boolean>
```

Added in v2.0.0

## constUndefined

A thunk that returns always `undefined`.

**Signature**

```ts
export declare const constUndefined: Lazy<undefined>
```

Added in v2.0.0

## constVoid

A thunk that returns always `void`.

**Signature**

```ts
export declare const constVoid: Lazy<void>
```

Added in v2.0.0

## constant

**Signature**

```ts
export declare function constant<A>(a: A): Lazy<A>
```

Added in v2.0.0

## decrement

**Signature**

```ts
export declare function decrement(n: number): number
```

Added in v2.0.0

## flip

Flips the arguments of a curried function.

**Signature**

```ts
export declare function flip<A, B, C>(f: (a: A) => (b: B) => C): (b: B) => (a: A) => C
export declare function flip<A, B, C>(f: (a: A, b: B) => C): (b: B, a: A) => C
```

**Example**

```ts
import { flip } from 'fp-ts/function'

const f = (a: number) => (b: string) => a - b.length

assert.strictEqual(flip(f)('aaa')(2), -1)
```

Added in v2.0.0

## flow

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

**Signature**

```ts
export declare function flow<A extends ReadonlyArray<unknown>, B>(ab: (...a: A) => B): (...a: A) => B
export declare function flow<A extends ReadonlyArray<unknown>, B, C>(
  ab: (...a: A) => B,
  bc: (b: B) => C
): (...a: A) => C
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...a: A) => D
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): (...a: A) => E
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (...a: A) => F
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (...a: A) => G
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (...a: A) => H
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (...a: A) => I
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (...a: A) => J
```

**Example**

```ts
import { flow } from 'fp-ts/function'

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
```

Added in v2.0.0

## hole

Type hole simulation

**Signature**

```ts
export declare const hole: <T>() => T
```

Added in v2.7.0

## identity

**Signature**

```ts
export declare function identity<A>(a: A): A
```

Added in v2.0.0

## increment

**Signature**

```ts
export declare function increment(n: number): number
```

Added in v2.0.0

## pipe

Pipes the value of an expression into a pipeline of functions.

See also [`flow`](#flow).

**Signature**

```ts
export declare function pipe<A>(a: A): A
export declare function pipe<A, B>(a: A, ab: (a: A) => B): B
export declare function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
export declare function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
export declare function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E
export declare function pipe<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): F
export declare function pipe<A, B, C, D, E, F, G>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): G
export declare function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): H
export declare function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): I
export declare function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): J
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K
): K
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L
): L
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M
): M
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N
): N
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O
): O
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P
): P
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q
): Q
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R
): R
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S
): S
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S,
  st: (s: S) => T
): T
```

**Example**

```ts
import { pipe } from 'fp-ts/function'

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

// without pipe
assert.strictEqual(double(len('aaa')), 6)

// with pipe
assert.strictEqual(pipe('aaa', len, double), 6)
```

Added in v2.6.3

## tuple

**Signature**

```ts
export declare function tuple<T extends ReadonlyArray<any>>(...t: T): T
```

Added in v2.0.0

## tupled

Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.

**Signature**

```ts
export declare function tupled<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B): (a: A) => B
```

**Example**

```ts
import { tupled } from 'fp-ts/function'

const add = tupled((x: number, y: number): number => x + y)

assert.strictEqual(add([1, 2]), 3)
```

Added in v2.4.0

## unsafeCoerce

**Signature**

```ts
export declare const unsafeCoerce: <A, B>(a: A) => B
```

Added in v2.0.0

## untupled

Inverse function of `tupled`

**Signature**

```ts
export declare function untupled<A extends ReadonlyArray<unknown>, B>(f: (a: A) => B): (...a: A) => B
```

Added in v2.4.0

## ~~Endomorphism~~ (interface)

Use `Endomorphism` module instead.

**Signature**

```ts
export interface Endomorphism<A> {
  (a: A): A
}
```

Added in v2.0.0

## ~~Predicate~~ (interface)

Use `Predicate` module instead.

**Signature**

```ts
export interface Predicate<A> {
  (a: A): boolean
}
```

Added in v2.0.0

## ~~Refinement~~ (interface)

Use `Refinement` module instead.

**Signature**

```ts
export interface Refinement<A, B extends A> {
  (a: A): a is B
}
```

Added in v2.0.0

## ~~not~~

Use `Predicate` module instead.

**Signature**

```ts
export declare function not<A>(predicate: Predicate<A>): Predicate<A>
```

Added in v2.0.0
