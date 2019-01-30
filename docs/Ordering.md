---
id: Ordering
title: Module Ordering
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Ordering.ts)

## semigroupOrdering

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Ordering.ts#L23-L25)

```ts
export const semigroupOrdering: Semigroup<Ordering> = ...
```

Added in v1.0.0

## setoidOrdering

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Ordering.ts#L16-L18)

```ts
export const setoidOrdering: Setoid<Ordering> = ...
```

Added in v1.0.0

## invert

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Ordering.ts#L30-L39)

```ts
export const invert = (O: Ordering): Ordering => { ... }
```

Added in v1.0.0

## sign

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Ordering.ts#L9-L11)

```ts
export const sign = (n: number): Ordering => { ... }
```

Added in v1.0.0
