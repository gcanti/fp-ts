MODULE [Semigroup](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts)
# Semigroup
*type class*
```ts
interface Semigroup<A> {
  concat: (x: A) => (y: A) => A
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

# semigroupArray
*instance*
```ts
Semigroup<Array<any>>
```
Semigroup under array concatenation (`Array<any>`)

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
# fold
*function*
```ts
<A>(S: Semigroup<A>) => (a: A) => (as: Array<A>): A
```

# getDualSemigroup
*function*
```ts
<A>(S: Semigroup<A>): Semigroup<A>
```

# getFirstSemigroup
*function*
```ts
<A>(): Semigroup<A>
```

# getJoinSemigroup
*function*
```ts
<A>(O: Ord<A>): Semigroup<A>
```

# getLastSemigroup
*function*
```ts
<A>(): Semigroup<A>
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
): Semigroup<{ [K in keyof O]: O[K] }>
```