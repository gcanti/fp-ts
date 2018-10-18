---
id: Monoid
title: Module Monoid
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts)

# Monoid

```ts
interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

Added in v1.0.0 (type class)

## monoidAll

```ts
Monoid<boolean>
```

Added in v1.0.0 (instance)

Boolean monoid under conjunction

## monoidAny

```ts
Monoid<boolean>
```

Added in v1.0.0 (instance)

Boolean monoid under disjunction

## monoidProduct

```ts
Monoid<number>
```

Added in v1.0.0 (instance)

Number monoid under multiplication

## monoidString

```ts
Monoid<string>
```

Added in v1.0.0 (instance)

## monoidSum

```ts
Monoid<number>
```

Added in v1.0.0 (instance)

Number monoid under addition

## monoidVoid

```ts
Monoid<void>
```

Added in v1.0.0 (instance)

## unsafeMonoidArray

```ts
Monoid<Array<any>>
```

Added in v1.0.0 (instance)

## fold

```ts
<A>(M: Monoid<A>): ((as: Array<A>) => A)
```

Added in v1.0.0 (function)

## getArrayMonoid

```ts
<A = never>(): Monoid<Array<A>>
```

Added in v1.0.0 (function)

Monoid under array concatenation (`Array<any>`)

## getDictionaryMonoid

```ts
;<A>(S: Semigroup<A>): Monoid<{ [key: string]: A }> => ({
  ...getDictionarySemigroup(S),
  empty: emptyObject
})
```

Added in v1.4.0 (function)

Gets [Monoid](./Monoid.md) instance for dictionaries given [Semigroup](./Semigroup.md) instance for their values

_Example_

```ts
const M = getDictionaryMonoid(semigroupSum)
const result = fold(M)([{ foo: 123 }, { foo: 456 }]) // { foo: 123 + 456 }
```

## getDualMonoid

```ts
<A>(M: Monoid<A>): Monoid<A>
```

Added in v1.0.0 (function)

## getEndomorphismMonoid

```ts
<A = never>(): Monoid<Endomorphism<A>>
```

Added in v1.0.0 (function)

## getFunctionMonoid

```ts
<M>(M: Monoid<M>) => <A = never>(): Monoid<(a: A) => M>
```

Added in v1.0.0 (function)

## getJoinMonoid

```ts
<A>(B: Bounded<A>): Monoid<A>
```

Added in v1.9.0 (function)

## getMeetMonoid

```ts
<A>(B: Bounded<A>): Monoid<A>
```

Added in v1.9.0 (function)

## getProductMonoid

```ts
<A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]>
```

Added in v1.0.0 (function)

## getRecordMonoid

```ts
<O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O>
```

Added in v1.0.0 (function)
