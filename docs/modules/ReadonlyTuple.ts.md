---
title: ReadonlyTuple.ts
nav_order: 74
parent: Modules
---

# ReadonlyTuple overview

Added in v2.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [bimap](#bimap)
- [compose](#compose)
- [duplicate](#duplicate)
- [extend](#extend)
- [foldMap](#foldmap)
- [fst](#fst)
- [getApplicative](#getapplicative)
- [getApply](#getapply)
- [getChain](#getchain)
- [getChainRec](#getchainrec)
- [getMonad](#getmonad)
- [map](#map)
- [mapLeft](#mapleft)
- [readonlyTuple](#readonlytuple)
- [reduce](#reduce)
- [reduceRight](#reduceright)
- [snd](#snd)
- [swap](#swap)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.5.0

# URI

**Signature**

```ts
export declare const URI: 'ReadonlyTuple'
```

Added in v2.5.0

# bimap

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: readonly [A, E]) => readonly [B, G]
```

Added in v2.5.0

# compose

**Signature**

```ts
export declare const compose: <E, A>(la: readonly [A, E]) => <B>(ab: readonly [B, A]) => readonly [B, E]
```

Added in v2.5.0

# duplicate

**Signature**

```ts
export declare const duplicate: <E, A>(ma: readonly [A, E]) => readonly [readonly [A, E], E]
```

Added in v2.5.0

# extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (fa: readonly [A, E]) => B) => (ma: readonly [A, E]) => readonly [B, E]
```

Added in v2.5.0

# foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: readonly [A, E]) => M
```

Added in v2.5.0

# fst

**Signature**

```ts
export declare function fst<A, S>(sa: readonly [A, S]): A
```

Added in v2.5.0

# getApplicative

**Signature**

```ts
export declare function getApplicative<S>(M: Monoid<S>): Applicative2C<URI, S>
```

Added in v2.5.0

# getApply

**Signature**

```ts
export declare function getApply<S>(S: Semigroup<S>): Apply2C<URI, S>
```

Added in v2.5.0

# getChain

**Signature**

```ts
export declare function getChain<S>(S: Semigroup<S>): Chain2C<URI, S>
```

Added in v2.5.0

# getChainRec

**Signature**

```ts
export declare function getChainRec<S>(M: Monoid<S>): ChainRec2C<URI, S>
```

Added in v2.5.0

# getMonad

**Signature**

```ts
export declare function getMonad<S>(M: Monoid<S>): Monad2C<URI, S>
```

Added in v2.5.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly [B, E]
```

Added in v2.5.0

# mapLeft

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: readonly [A, E]) => readonly [A, G]
```

Added in v2.5.0

# readonlyTuple

**Signature**

```ts
export declare const readonlyTuple: Semigroupoid2<'ReadonlyTuple'> &
  Bifunctor2<'ReadonlyTuple'> &
  Comonad2<'ReadonlyTuple'> &
  Foldable2<'ReadonlyTuple'> &
  Traversable2<'ReadonlyTuple'>
```

Added in v2.5.0

# reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: readonly [A, E]) => B
```

Added in v2.5.0

# reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: readonly [A, E]) => B
```

Added in v2.5.0

# snd

**Signature**

```ts
export declare function snd<A, S>(sa: readonly [A, S]): S
```

Added in v2.5.0

# swap

**Signature**

```ts
export declare function swap<A, S>(sa: readonly [A, S]): readonly [S, A]
```

Added in v2.5.0
