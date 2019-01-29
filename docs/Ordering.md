---
id: Ordering
title: Module Ordering
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Ordering.ts)

## semigroupOrdering

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Ordering.ts#L26-L28)

```ts
export const semigroupOrdering: Semigroup<Ordering> = { ... }
```

Added in v1.0.0

## setoidOrdering

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Ordering.ts#L18-L20)

```ts
export const setoidOrdering: Setoid<Ordering> = { ... }
```

Added in v1.0.0

## invert

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Ordering.ts#L34-L43)

```ts
export const invert = (O: Ordering): Ordering => { ... }
```

Added in v1.0.0

## sign

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Ordering.ts#L10-L12)

```ts
export const sign = (n: number): Ordering => { ... }
```

Added in v1.0.0
