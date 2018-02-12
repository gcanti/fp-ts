MODULE [Semigroup](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts)
# Semigroup
*type class*
```ts
interface Semigroup<A> {
  concat: (x: A, y: A) => A
}
```
# semigroupAll
*instance*
```ts
Semigroup<boolean>
```
Boolean semigroup under conjunction

# semigroupAny
*instance*
```ts
Semigroup<boolean>
```
Boolean semigroup under disjunction

# semigroupProduct
*instance*
```ts
Semigroup<number>
```
Number Semigroup under multiplication

# semigroupString
*instance*
```ts
Semigroup<string>
```

# semigroupSum
*instance*
```ts
Semigroup<number>
```
Number Semigroup under addition

# semigroupVoid
*instance*
```ts
Semigroup<void>
```
# fold
*function*
```ts
<A>(S: Semigroup<A>) => (a: A) => (as: Array<A>): A
```

# getArraySemigroup
*function*
```ts
<A = never>(): Semigroup<Array<A>>
```
Semigroup under array concatenation

# getDualSemigroup
*function*
```ts
<A>(S: Semigroup<A>): Semigroup<A>
```

# getFirstSemigroup
*function*
```ts
<A = never>(): Semigroup<A>
```

# getFunctionSemigroup
*function*
```ts
<S>(S: Semigroup<S>) => <A = never>(): Semigroup<(a: A) => S>
```

# getJoinSemigroup
*function*
```ts
<A>(O: Ord<A>): Semigroup<A>
```

# getLastSemigroup
*function*
```ts
<A = never>(): Semigroup<A>
```

# getMeetSemigroup
*function*
```ts
<A>(O: Ord<A>): Semigroup<A>
```

# getProductSemigroup
*function*
```ts
<A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]>
```

# getRecordSemigroup
*function*
```ts
<O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O>
```