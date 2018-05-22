---
id: Ord
title: Module Ord
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Ord.ts)

## Type classes

### Ord

_type class_

_Signature_

```ts
interface Ord<A> extends Setoid<A> {
  readonly compare: (x: A, y: A) => Ordering
}
```

_Description_

The `Ord` type class represents types which support comparisons with a _total order_.

Instances should satisfy the laws of total orderings:

1.  Reflexivity: `S.compare(a, a) <= 0`
2.  Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
3.  Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`

## Instances

### ordBoolean

_instance_

_since 1.0.0_

_Signature_

```ts
Ord<boolean>
```

### ordDate

_instance_

_since 1.4.0_

_Signature_

```ts
ordDate:
```

### ordNumber

_instance_

_since 1.0.0_

_Signature_

```ts
Ord<number>
```

### ordString

_instance_

_since 1.0.0_

_Signature_

```ts
Ord<string>
```

## Functions

### between

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>): ((low: A, hi: A) => (x: A) => boolean)
```

_Description_

Test whether a value is between a minimum and a maximum (inclusive)

### clamp

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>): ((low: A, hi: A) => (x: A) => A)
```

_Description_

Clamp a value between a minimum and a maximum

### contramap

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(f: (b: B) => A, fa: Ord<A>): Ord<B>
```

### fromCompare

_function_

_since 1.0.0_

_Signature_

```ts
<A>(compare: (x: A, y: A) => Ordering): Ord<A>
```

### getDualOrd

_function_

_since 1.3.0_

_Signature_

```ts
<A>(O: Ord<A>): Ord<A>
```

### getProductOrd

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(OA: Ord<A>, OB: Ord<B>): Ord<[A, B]>
```

### getSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Semigroup<Ord<A>>
```

### greaterThan

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>) => (x: A, y: A): boolean
```

_Description_

Test whether one value is _strictly greater than_ another

### greaterThanOrEq

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>) => (x: A, y: A): boolean
```

_Description_

Test whether one value is _non-strictly greater than_ another

### lessThan

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>) => (x: A, y: A): boolean
```

_Description_

Test whether one value is _strictly less than_ another

### lessThanOrEq

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>) => (x: A, y: A): boolean
```

_Description_

Test whether one value is _non-strictly less than_ another

### max

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>) => (x: A, y: A): A
```

_Description_

Take the maximum of two values. If they are considered equal, the first argument is chosen

### min

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>) => (x: A, y: A): A
```

_Description_

Take the minimum of two values. If they are considered equal, the first argument is chosen

### unsafeCompare

_function_

_since 1.0.0_

_Signature_

```ts
(x: any, y: any): Ordering
```
