MODULE [Monoid](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts)
# Monoid
*type class*
```ts
interface Monoid<A> extends Semigroup<A> {
  empty: () => A
}
```
# monoidAll
*instance*
```ts
Monoid<boolean>
```
Boolean monoid under conjunction

# monoidAny
*instance*
```ts
Monoid<boolean>
```
Boolean monoid under disjunction

# monoidArray
*instance*
```ts
Monoid<Array<any>>
```
Monoid under array concatenation (`Array<any>`)

# monoidProduct
*instance*
```ts
Monoid<number>
```
Number monoid under multiplication

# monoidString
*instance*
```ts
Monoid<string>
```

# monoidSum
*instance*
```ts
Monoid<number>
```
Number monoid under addition
# fold
*function*
```ts
<A>(M: Monoid<A>) => (as: Array<A>): A
```

# getArrayMonoid
*function*
```ts
<A>(): Monoid<Array<A>>
```
Returns a monoid under array concatenation

# getDualMonoid
*function*
```ts
<A>(M: Monoid<A>): Monoid<A>
```

# getEndomorphismMonoid
*function*
```ts
<A>(): Monoid<Endomorphism<A>>
```

# getFunctionMonoid
*function*
```ts
<M>(monoid: Monoid<M>) => <A>(): Monoid<(a: A) => M>
```

# getProductMonoid
*function*
```ts
<A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]>
```

# getRecordMonoid
*function*
```ts
<O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<{ [K in keyof O]: O[K] }>
```