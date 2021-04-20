---
title: Date.ts
nav_order: 23
parent: Modules
---

## Date overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [create](#create)
  - [fromString](#fromstring)
- [instances](#instances)
  - [Eq](#eq)
  - [Ord](#ord)
  - [eqDate](#eqdate)
  - [eqMonth](#eqmonth)
  - [eqYear](#eqyear)
- [refinements](#refinements)
  - [isValid](#isvalid)
- [utils](#utils)
  - [now](#now)

---

# constructors

## create

Returns the current `Date`

**Signature**

```ts
export declare const create: IO<Date>
```

Added in v2.0.0

## fromString

Returns a `Date` if the input is a valid date time string.

**Signature**

```ts
export declare const fromString: (value: string) => O.Option<Date>
```

Added in v2.11.0

# instances

## Eq

**Signature**

```ts
export declare const Eq: E.Eq<Date>
```

Added in v2.10.0

## Ord

**Signature**

```ts
export declare const Ord: Ord_<Date>
```

**Example**

```ts
import { Ord } from 'fp-ts/Date'

assert.deepStrictEqual(Ord.compare(new Date(1, 1, 2020), new Date(1, 1, 2021)), -1)
```

Added in v2.10.0

## eqDate

**Signature**

```ts
export declare const eqDate: E.Eq<Date>
```

Added in v2.6.0

## eqMonth

**Signature**

```ts
export declare const eqMonth: E.Eq<Date>
```

Added in v2.6.0

## eqYear

**Signature**

```ts
export declare const eqYear: E.Eq<Date>
```

Added in v2.6.0

# refinements

## isValid

Returns `true` if the input is a valid Date, `false` otherwise.

**Signature**

```ts
export declare const isValid: Predicate<Date>
```

Added in v2.11.0

# utils

## now

Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC

**Signature**

```ts
export declare const now: IO<number>
```

Added in v2.0.0
