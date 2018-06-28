---
id: Semigroup
title: Module Semigroup
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts)

## Type classes

### Semigroup

_type class_

_since 1.0.0_

_Signature_

```ts
interface Semigroup<A> {
  readonly concat: (x: A, y: A) => A
}
```

## Instances

### semigroupAll

_instance_

_since 1.0.0_

_Signature_

```ts
Semigroup<boolean>
```

_Description_

Boolean semigroup under conjunction

### semigroupAny

_instance_

_since 1.0.0_

_Signature_

```ts
Semigroup<boolean>
```

_Description_

Boolean semigroup under disjunction

### semigroupProduct

_instance_

_since 1.0.0_

_Signature_

```ts
Semigroup<number>
```

_Description_

Number Semigroup under multiplication

### semigroupString

_instance_

_since 1.0.0_

_Signature_

```ts
Semigroup<string>
```

### semigroupSum

_instance_

_since 1.0.0_

_Signature_

```ts
Semigroup<number>
```

_Description_

Number Semigroup under addition

### semigroupVoid

_instance_

_since 1.0.0_

_Signature_

```ts
Semigroup<void>
```

## Functions

### fold

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Semigroup<A>) => (a: A) => (as: Array<A>): A
```

### getArraySemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Semigroup<Array<A>>
```

_Description_

Semigroup under array concatenation

### getDictionarySemigroup

_function_

_since 1.4.0_

_Signature_

```ts
<A>(S: Semigroup<A>): Semigroup<{ [key: string]: A }>
```

_Description_

Gets [Semigroup](./Semigroup.md) instance for dictionaries given [Semigroup](./Semigroup.md) instance for their values

_Example_

```ts
const S = getDictionarySemigroup(semigroupSum)
const result = S.concat({ foo: 123 }, { foo: 456 }) // { foo: 123 + 456 }
```

### getDualSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Semigroup<A>): Semigroup<A>
```

### getFirstSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Semigroup<A>
```

### getFunctionSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<S>(S: Semigroup<S>) => <A = never>(): Semigroup<(a: A) => S>
```

### getJoinSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>): Semigroup<A>
```

### getLastSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Semigroup<A>
```

### getMeetSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>): Semigroup<A>
```

### getObjectSemigroup

_function_

_since 1.4.0_

_Signature_

```ts
;<A extends object = never>(): Semigroup<A> => semigroupAnyDictionary as any
```

_Description_

Gets [Semigroup](./Semigroup.md) instance for objects of given type preserving their type

_Example_

```ts
const S = getObjectSemigroup<{ foo: number }>()
const result = S.concat({ foo: 123 }, { foo: 456 }) // { foo: 456 }
```

### getProductSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]>
```

### getRecordSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O>
```
