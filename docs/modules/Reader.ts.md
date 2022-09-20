---
title: Reader.ts
nav_order: 78
parent: Modules
---

## Reader overview

The `Reader` monad (also called the Environment monad). Represents a computation, which can read values from a shared environment,
pass values from function to function, and execute sub-computations in a modified environment.
Using `Reader` monad for such computations is often clearer and easier than using the `State` monad.

In this example the `Reader` monad provides access to variable bindings. `Bindings` are a map of `number` variables.
The variable count contains number of variables in the bindings. You can see how to run a `Reader` monad and retrieve
data from it, how to access the `Reader` data with `ask` and `asks`.

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as R from 'fp-ts/Reader'
import * as RR from 'fp-ts/ReadonlyRecord'

interface Bindings extends RR.ReadonlyRecord<string, number> {}

// The Reader monad, which implements this complicated check.
const isCountCorrect: R.Reader<Bindings, boolean> = pipe(
  R.Do,
  R.bind('count', () => R.asks(lookupVar('count'))),
  R.bind('bindings', () => R.ask()),
  R.map(({ count, bindings }) => count === RR.size(bindings))
)

// The selector function to use with 'asks'.
// Returns value of the variable with specified name.
const lookupVar =
  (name: string) =>
  (bindings: Bindings): number =>
    pipe(
      bindings,
      RR.lookup(name),
      O.getOrElse(() => 0)
    )

const sampleBindings: Bindings = { count: 3, a: 1, b: 2 }

assert.deepStrictEqual(isCountCorrect(sampleBindings), true)
```

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [Category](#category)
  - [id](#id)
- [Choice](#choice)
  - [left](#left)
  - [right](#right)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [Pointed](#pointed)
  - [of](#of)
- [Profunctor](#profunctor)
  - [promap](#promap)
- [Semigroupoid](#semigroupoid)
  - [compose](#compose)
- [Strong](#strong)
  - [first](#first)
  - [second](#second)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apFirstW](#apfirstw)
  - [apSecond](#apsecond)
  - [apSecondW](#apsecondw)
  - [asksReader](#asksreader)
  - [asksReaderW](#asksreaderw)
  - [chainFirst](#chainfirst)
  - [chainFirstW](#chainfirstw)
  - [flap](#flap)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
  - [local](#local)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Category](#category-1)
  - [Chain](#chain)
  - [Choice](#choice-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [Pointed](#pointed-1)
  - [Profunctor](#profunctor-1)
  - [Strong](#strong-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [~~getMonoid~~](#getmonoid)
  - [~~getSemigroup~~](#getsemigroup)
  - [~~reader~~](#reader)
- [model](#model)
  - [Reader (interface)](#reader-interface)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [let](#let)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R, A>(fa: Reader<R, A>) => <B>(fab: Reader<R, (a: A) => B>) => Reader<R, B>
```

Added in v2.0.0

## apW

Less strict version of [`ap`](#ap).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const apW: <R2, A>(fa: Reader<R2, A>) => <R1, B>(fab: Reader<R1, (a: A) => B>) => Reader<R1 & R2, B>
```

Added in v2.8.0

# Category

## id

**Signature**

```ts
export declare const id: <A>() => Reader<A, A>
```

Added in v2.0.0

# Choice

## left

**Signature**

```ts
export declare const left: <A, B, C>(pab: Reader<A, B>) => Reader<E.Either<A, C>, E.Either<B, C>>
```

Added in v2.10.0

## right

**Signature**

```ts
export declare const right: <A, B, C>(pbc: Reader<B, C>) => Reader<E.Either<A, B>, E.Either<A, C>>
```

Added in v2.10.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, B>
```

Added in v2.0.0

## chainW

Less strict version of [`chain`](#chain).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const chainW: <R2, A, B>(f: (a: A) => Reader<R2, B>) => <R1>(ma: Reader<R1, A>) => Reader<R1 & R2, B>
```

Added in v2.6.0

# Pointed

## of

**Signature**

```ts
export declare const of: <R = unknown, A = never>(a: A) => Reader<R, A>
```

Added in v2.0.0

# Profunctor

## promap

**Signature**

```ts
export declare const promap: <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fea: Reader<E, A>) => Reader<D, B>
```

Added in v2.0.0

# Semigroupoid

## compose

**Signature**

```ts
export declare const compose: <A, B>(ab: Reader<A, B>) => <C>(bc: Reader<B, C>) => Reader<A, C>
```

Added in v2.0.0

# Strong

## first

**Signature**

```ts
export declare const first: <A, B, C>(pab: Reader<A, B>) => Reader<[A, C], [B, C]>
```

Added in v2.10.0

## second

**Signature**

```ts
export declare const second: <A, B, C>(pab: Reader<B, C>) => Reader<[A, B], [A, C]>
```

Added in v2.10.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(second: Reader<E, B>) => <A>(first: Reader<E, A>) => Reader<E, A>
```

Added in v2.0.0

## apFirstW

Less strict version of [`apFirst`](#apfirst).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const apFirstW: <R2, B>(second: Reader<R2, B>) => <R1, A>(first: Reader<R1, A>) => Reader<R1 & R2, A>
```

Added in v2.12.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(second: Reader<E, B>) => <A>(first: Reader<E, A>) => Reader<E, B>
```

Added in v2.0.0

## apSecondW

Less strict version of [`apSecond`](#apsecond).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const apSecondW: <R2, B>(second: Reader<R2, B>) => <R1, A>(first: Reader<R1, A>) => Reader<R1 & R2, B>
```

Added in v2.12.0

## asksReader

Effectfully accesses the environment.

**Signature**

```ts
export declare const asksReader: <R, A>(f: (r: R) => Reader<R, A>) => Reader<R, A>
```

Added in v2.11.0

## asksReaderW

Less strict version of [`asksReader`](#asksreader).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const asksReaderW: <R1, R2, A>(f: (r1: R1) => Reader<R2, A>) => Reader<R1 & R2, A>
```

Added in v2.11.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, R, B>(f: (a: A) => Reader<R, B>) => (first: Reader<R, A>) => Reader<R, A>
```

Added in v2.0.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: <R2, A, B>(
  f: (a: A) => Reader<R2, B>
) => <R1>(ma: Reader<R1, A>) => Reader<R1 & R2, A>
```

Added in v2.11.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Reader<E, (a: A) => B>) => Reader<E, B>
```

Added in v2.10.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A>
```

Added in v2.0.0

## flattenW

Less strict version of [`flatten`](#flatten).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const flattenW: <R1, R2, A>(mma: Reader<R1, Reader<R2, A>>) => Reader<R1 & R2, A>
```

Added in v2.11.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: Reader<R1, A>) => Reader<R2, A>
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as R from 'fp-ts/Reader'
import * as string from 'fp-ts/string'

const calculateContentLen: R.Reader<string, number> = pipe(
  R.Do,
  R.bind('content', () => R.ask<string>()),
  R.map(({ content }) => string.size(content))
)

// Calls calculateContentLen after adding a prefix to the Reader content.
const calculateModifiedContentLen: R.Reader<string, number> = pipe(
  calculateContentLen,
  R.local((s) => 'Prefix ' + s)
)

const s = '12345'

assert.deepStrictEqual(
  "Modified 's' length: " + calculateModifiedContentLen(s) + '\n' + "Original 's' length: " + calculateContentLen(s),
  "Modified 's' length: 12\nOriginal 's' length: 5"
)
```

Added in v2.0.0

# constructors

## ask

Reads the current context

**Signature**

```ts
export declare const ask: <R>() => Reader<R, R>
```

Added in v2.0.0

## asks

Projects a value from the global context in a Reader

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => Reader<R, A>
```

Added in v2.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'Reader'>
```

Added in v2.7.0

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'Reader'>
```

Added in v2.10.0

## Category

**Signature**

```ts
export declare const Category: Category2<'Reader'>
```

Added in v2.7.0

## Chain

**Signature**

```ts
export declare const Chain: Chain2<'Reader'>
```

Added in v2.10.0

## Choice

**Signature**

```ts
export declare const Choice: Choice2<'Reader'>
```

Added in v2.8.3

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Reader'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'Reader'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'Reader'>
```

Added in v2.10.0

## Profunctor

**Signature**

```ts
export declare const Profunctor: Profunctor2<'Reader'>
```

Added in v2.7.0

## Strong

**Signature**

```ts
export declare const Strong: Strong2<'Reader'>
```

Added in v2.8.3

## URI

**Signature**

```ts
export declare const URI: 'Reader'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## ~~getMonoid~~

Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.

**Signature**

```ts
export declare const getMonoid: <R, A>(M: Monoid<A>) => Monoid<Reader<R, A>>
```

Added in v2.0.0

## ~~getSemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getSemigroup: <R, A>(S: Semigroup<A>) => Semigroup<Reader<R, A>>
```

Added in v2.0.0

## ~~reader~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `R.Functor` instead of `R.reader`
(where `R` is from `import R from 'fp-ts/Reader'`)

**Signature**

```ts
export declare const reader: Monad2<'Reader'> &
  Profunctor2<'Reader'> &
  Category2<'Reader'> &
  Strong2<'Reader'> &
  Choice2<'Reader'>
```

Added in v2.0.0

# model

## Reader (interface)

**Signature**

```ts
export interface Reader<R, A> {
  (r: R): A
}
```

Added in v2.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: Reader<unknown, readonly []>
```

Added in v2.11.0

## Do

**Signature**

```ts
export declare const Do: Reader<unknown, {}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<E, B>
) => (fa: Reader<E, A>) => Reader<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

Less strict version of [`apS`](#aps).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const apSW: <A, N extends string, R2, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R2, B>
) => <R1>(fa: Reader<R1, A>) => Reader<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<E, B>
) => (ma: Reader<E, A>) => Reader<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: Reader<E, A>) => Reader<E, { readonly [K in N]: A }>
```

Added in v2.8.0

## bindW

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R2, B>
) => <R1>(fa: Reader<R1, A>) => Reader<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(fa: Reader<E, A>) => Reader<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## sequenceArray

**Signature**

```ts
export declare const sequenceArray: <R, A>(arr: readonly Reader<R, A>[]) => Reader<R, readonly A[]>
```

Added in v2.9.0

## traverseArray

**Signature**

```ts
export declare const traverseArray: <R, A, B>(
  f: (a: A) => Reader<R, B>
) => (as: readonly A[]) => Reader<R, readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

**Signature**

```ts
export declare const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => Reader<R, B>
) => (as: readonly A[]) => Reader<R, readonly B[]>
```

Added in v2.9.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => Reader<R, B>
) => (as: readonly A[]) => Reader<R, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => Reader<R, B>
) => (as: ReadonlyNonEmptyArray<A>) => Reader<R, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0
