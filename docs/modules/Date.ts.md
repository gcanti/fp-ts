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
- [instances](#instances)
  - [eqDate](#eqdate)
  - [eqMonth](#eqmonth)
  - [eqYear](#eqyear)
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

# instances

## eqDate

**Signature**

```ts
export declare const eqDate: Eq<Date>
```

Added in v2.6.0

## eqMonth

**Signature**

```ts
export declare const eqMonth: Eq<Date>
```

Added in v2.6.0

## eqYear

**Signature**

```ts
export declare const eqYear: Eq<Date>
```

Added in v2.6.0

# utils

## now

Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC

**Signature**

```ts
export declare const now: IO<number>
```

Added in v2.0.0
