---
title: Setoid.ts
nav_order: 81
parent: Modules
---

# Overview

This type class is deprecated, please use `Eq` instead.

---

<h2 class="text-delta">Table of contents</h2>

- [~~Setoid~~ (interface)](#setoid-interface)
- [~~setoidBoolean~~ (constant)](#setoidboolean-constant)
- [~~setoidDate~~ (constant)](#setoiddate-constant)
- [~~setoidNumber~~ (constant)](#setoidnumber-constant)
- [~~setoidString~~ (constant)](#setoidstring-constant)
- [~~contramap~~ (function)](#contramap-function)
- [~~fromEquals~~ (function)](#fromequals-function)
- [~~getArraySetoid~~ (function)](#getarraysetoid-function)
- [~~getProductSetoid~~ (function)](#getproductsetoid-function)
- [~~getRecordSetoid~~ (function)](#getrecordsetoid-function)
- [~~getStructSetoid~~ (function)](#getstructsetoid-function)
- [~~getTupleSetoid~~ (function)](#gettuplesetoid-function)
- [~~strictEqual~~ (function)](#strictequal-function)

---

# ~~Setoid~~ (interface)

**Signature**

```ts
export interface Setoid<A> {
  readonly equals: (x: A, y: A) => boolean
}
```

Added in v1.0.0

# ~~setoidBoolean~~ (constant)

Use `Eq.eqBoolean` instead

**Signature**

```ts
export const setoidBoolean: Setoid<boolean> = ...
```

Added in v1.0.0

# ~~setoidDate~~ (constant)

Use `Eq.eqDate` instead

**Signature**

```ts
export const setoidDate: Setoid<Date> = ...
```

Added in v1.4.0

# ~~setoidNumber~~ (constant)

Use `Eq.eqNumber` instead

**Signature**

```ts
export const setoidNumber: Setoid<number> = ...
```

Added in v1.0.0

# ~~setoidString~~ (constant)

Use `Eq.eqString` instead

**Signature**

```ts
export const setoidString: Setoid<string> = ...
```

Added in v1.0.0

# ~~contramap~~ (function)

Use `Eq.contramap` instead

**Signature**

```ts
export const contramap = <A, B>(f: (b: B) => A, fa: Setoid<A>): Setoid<B> => ...
```

Added in v1.2.0

# ~~fromEquals~~ (function)

Use `Eq.fromEquals` instead

**Signature**

```ts
export const fromEquals = <A>(equals: (x: A, y: A) => boolean): Setoid<A> => ...
```

Added in v1.14.0

# ~~getArraySetoid~~ (function)

Use `Array.getMonoid` instead

**Signature**

```ts
export const getArraySetoid = <A>(S: Setoid<A>): Setoid<Array<A>> => ...
```

Added in v1.0.0

# ~~getProductSetoid~~ (function)

Use `Eq.getTupleEq` instead

**Signature**

```ts
export const getProductSetoid = <A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]> => ...
```

Added in v1.0.0

# ~~getRecordSetoid~~ (function)

Use `Eq.getStructEq` instead

**Signature**

```ts
export const getRecordSetoid = <O extends { [key: string]: any }>(
  // tslint:disable-next-line: deprecation
  setoids: { [K in keyof O]: Setoid<O[K]> }
  // tslint:disable-next-line: deprecation
): Setoid<O> => ...
```

Added in v1.0.0

# ~~getStructSetoid~~ (function)

Use `Eq.getStructEq` instead

**Signature**

```ts
export const getStructSetoid = <O extends { [key: string]: any }>(
  // tslint:disable-next-line: deprecation
  setoids: { [K in keyof O]: Setoid<O[K]> }
  // tslint:disable-next-line: deprecation
): Setoid<O> => ...
```

Added in v1.14.2

# ~~getTupleSetoid~~ (function)

Use `Eq.getTupleEq` instead

**Signature**

```ts
export const getTupleSetoid = <T extends Array<Setoid<any>>>(
  ...setoids: T
): // tslint:disable-next-line: deprecation
Setoid<{ [K in keyof T]: T[K] extends Setoid<infer A> ? A : never }> => ...
```

Added in v1.14.2

# ~~strictEqual~~ (function)

Use `Eq.strictEqual` instead

**Signature**

```ts
export const strictEqual = <A>(a: A, b: A): boolean => ...
```

Added in v1.0.0
