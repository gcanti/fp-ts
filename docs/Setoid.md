---
id: Setoid
title: Module Setoid
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts)

## Type classes

### Setoid

_type class_

_Signature_

```ts
interface Setoid<A> {
  readonly equals: (x: A, y: A) => boolean
}
```

_Description_

The `Setoid` type class represents types which support decidable equality.

Instances must satisfy the following laws:

1.  Reflexivity: `S.equals(a, a) === true`
2.  Symmetry: `S.equals(a, b) === S.equals(b, a)`
3.  Transitivity: if `S.equals(a, b) === true` and `S.equals(b, c) === true`, then `S.equals(a, c) === true`

## Instances

### setoidBoolean

_instance_

_since 1.0.0_

_Signature_

```ts
setoidBoolean:
```

### setoidDate

_instance_

_since 1.4.0_

_Signature_

```ts
setoidDate:
```

### setoidNumber

_instance_

_since 1.0.0_

_Signature_

```ts
setoidNumber:
```

### setoidString

_instance_

_since 1.0.0_

_Signature_

```ts
setoidString:
```

## Functions

### contramap

_function_

_since 1.2.0_

_Signature_

```ts
<A, B>(f: (b: B) => A, fa: Setoid<A>): Setoid<B>
```

_Description_

Returns the `Setoid` corresponding to the partitions of `B` induced by `f`

### getArraySetoid

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>): Setoid<Array<A>>
```

### getProductSetoid

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]>
```

### getRecordSetoid

_function_

_since 1.0.0_

_Signature_

```ts
<O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O>
```

### strictEqual

_function_

_since 1.0.0_

_Signature_

```ts
<A>(a: A, b: A): boolean
```
