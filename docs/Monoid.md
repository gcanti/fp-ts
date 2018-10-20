---
id: Monoid
title: Module Monoid
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts)

## Type classes

### Monoid

_type class_

_since 1.0.0_

_Signature_

```ts
interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

## Instances

### monoidAll

_instance_

_since 1.0.0_

_Signature_

```ts
Monoid<boolean>
```

_Description_

Boolean monoid under conjunction

### monoidAny

_instance_

_since 1.0.0_

_Signature_

```ts
Monoid<boolean>
```

_Description_

Boolean monoid under disjunction

### monoidProduct

_instance_

_since 1.0.0_

_Signature_

```ts
Monoid<number>
```

_Description_

Number monoid under multiplication

### monoidString

_instance_

_since 1.0.0_

_Signature_

```ts
Monoid<string>
```

### monoidSum

_instance_

_since 1.0.0_

_Signature_

```ts
Monoid<number>
```

_Description_

Number monoid under addition

### monoidVoid

_instance_

_since 1.0.0_

_Signature_

```ts
Monoid<void>
```

### unsafeMonoidArray

_instance_

_since 1.0.0_

_Signature_

```ts
Monoid<Array<any>>
```

## Functions

### fold

_function_

_since 1.0.0_

_Signature_

```ts
<A>(M: Monoid<A>): ((as: Array<A>) => A)
```

### getArrayMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Monoid<Array<A>>
```

_Description_

Monoid under array concatenation (`Array<any>`)

### getDictionaryMonoid

_function_

_since 1.4.0_

_Signature_

```ts
;<A>(S: Semigroup<A>): Monoid<{ [key: string]: A }> => ({
  ...getDictionarySemigroup(S),
  empty: emptyObject
})
```

_Description_

Gets [Monoid](./Monoid.md) instance for dictionaries given [Semigroup](./Semigroup.md) instance for their values

_Example_

```ts
import { getDictionaryMonoid, fold } from 'fp-ts/lib/Monoid'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const M = getDictionaryMonoid(semigroupSum)
assert.deepEqual(fold(M)([{ foo: 123 }, { foo: 456 }]), { foo: 579 })
```

### getDualMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<A>(M: Monoid<A>): Monoid<A>
```

### getEndomorphismMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Monoid<Endomorphism<A>>
```

### getFunctionMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<M>(M: Monoid<M>) => <A = never>(): Monoid<(a: A) => M>
```

### getJoinMonoid

_function_

_since 1.9.0_

_Signature_

```ts
<A>(B: Bounded<A>): Monoid<A>
```

### getMeetMonoid

_function_

_since 1.9.0_

_Signature_

```ts
<A>(B: Bounded<A>): Monoid<A>
```

### getProductMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]>
```

### getRecordMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O>
```
