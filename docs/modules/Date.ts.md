---
title: Date.ts
nav_order: 22
parent: Modules
---

## Date overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [create](#create)
- [instances](#instances)
  - [Eq](#eq)
  - [EqDate](#eqdate)
  - [EqMonth](#eqmonth)
  - [EqYear](#eqyear)
  - [Ord](#ord)
- [utils](#utils)
  - [now](#now)

---

# constructors

## create

Returns the current `Date`.

**Signature**

```ts
export declare const create: IO<Date>
```

Added in v3.0.0

# instances

## Eq

**Signature**

```ts
export declare const Eq: eq.Eq<Date>
```

Added in v3.0.0

## EqDate

**Signature**

```ts
export declare const EqDate: eq.Eq<Date>
```

Added in v3.0.0

## EqMonth

**Signature**

```ts
export declare const EqMonth: eq.Eq<Date>
```

Added in v3.0.0

## EqYear

**Signature**

```ts
export declare const EqYear: eq.Eq<Date>
```

Added in v3.0.0

## Ord

**Signature**

```ts
export declare const Ord: ord.Ord<Date>
```

**Example**

```ts
import { Ord } from 'fp-ts/Date'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(new Date(1, 1, 2020), Ord.compare(new Date(1, 1, 2021))), -1)
```

Added in v3.0.0

# utils

## now

Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC.

**Signature**

```ts
export declare const now: IO<number>
```

Added in v3.0.0
