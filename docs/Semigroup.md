---
id: Semigroup
title: Module Semigroup
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts)

# Semigroup

```ts
interface Semigroup<A> {
  readonly concat: (x: A, y: A) => A
}
```

Added in v1.0.0 (type class)

## semigroupAll

```ts
Semigroup<boolean>
```

Added in v1.0.0 (instance)

Boolean semigroup under conjunction

## semigroupAny

```ts
Semigroup<boolean>
```

Added in v1.0.0 (instance)

Boolean semigroup under disjunction

## semigroupProduct

```ts
Semigroup<number>
```

Added in v1.0.0 (instance)

Number Semigroup under multiplication

## semigroupString

```ts
Semigroup<string>
```

Added in v1.0.0 (instance)

## semigroupSum

```ts
Semigroup<number>
```

Added in v1.0.0 (instance)

Number Semigroup under addition

## semigroupVoid

```ts
Semigroup<void>
```

Added in v1.0.0 (instance)

## fold

```ts
<A>(S: Semigroup<A>) => (a: A) => (as: Array<A>): A
```

Added in v1.0.0 (function)

## getArraySemigroup

```ts
<A = never>(): Semigroup<Array<A>>
```

Added in v1.0.0 (function)

Semigroup under array concatenation

## getDictionarySemigroup

```ts
<A>(S: Semigroup<A>): Semigroup<{ [key: string]: A }>
```

Added in v1.4.0 (function)

Gets [Semigroup](./Semigroup.md) instance for dictionaries given [Semigroup](./Semigroup.md) instance for their values

_Example_

```ts
const S = getDictionarySemigroup(semigroupSum)
const result = S.concat({ foo: 123 }, { foo: 456 }) // { foo: 123 + 456 }
```

## getDualSemigroup

```ts
<A>(S: Semigroup<A>): Semigroup<A>
```

Added in v1.0.0 (function)

## getFirstSemigroup

```ts
<A = never>(): Semigroup<A>
```

Added in v1.0.0 (function)

## getFunctionSemigroup

```ts
<S>(S: Semigroup<S>) => <A = never>(): Semigroup<(a: A) => S>
```

Added in v1.0.0 (function)

## getJoinSemigroup

```ts
<A>(O: Ord<A>): Semigroup<A>
```

Added in v1.0.0 (function)

## getLastSemigroup

```ts
<A = never>(): Semigroup<A>
```

Added in v1.0.0 (function)

## getMeetSemigroup

```ts
<A>(O: Ord<A>): Semigroup<A>
```

Added in v1.0.0 (function)

## getObjectSemigroup

```ts
;<A extends object = never>(): Semigroup<A> => semigroupAnyDictionary as any
```

Added in v1.4.0 (function)

Gets [Semigroup](./Semigroup.md) instance for objects of given type preserving their type

_Example_

```ts
const S = getObjectSemigroup<{ foo: number }>()
const result = S.concat({ foo: 123 }, { foo: 456 }) // { foo: 456 }
```

## getProductSemigroup

```ts
<A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]>
```

Added in v1.0.0 (function)

## getRecordSemigroup

```ts
<O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O>
```

Added in v1.0.0 (function)
