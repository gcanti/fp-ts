MODULE [Monoid](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts)
# Monoid
*type class*
```ts
interface Monoid<A> extends Semigroup<A> {
  empty: A
}
```
# getArrayMonoid
*instance*
```ts
getArrayMonoid = <A = never>(): 
```
Monoid under array concatenation (`Array<any>`)

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

# monoidVoid
*instance*
```ts
Monoid<void>
```

# unsafeMonoidArray
*instance*
```ts
Monoid<Array<any>>
```
# fold
*function*
```ts
<A>(M: Monoid<A>): ((as: Array<A>) => A)
```

# getDualMonoid
*function*
```ts
<A>(M: Monoid<A>): Monoid<A>
```

# getEndomorphismMonoid
*function*
```ts
<A = never>(): Monoid<Endomorphism<A>>
```

# getFunctionMonoid
*function*
```ts
<M>(M: Monoid<M>) => <A = never>(): Monoid<(a: A) => M>
```

# getProductMonoid
*function*
```ts
<A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]>
```

# getRecordMonoid
*function*
```ts
<O>(Ms: { [K in keyof O]: Monoid<O[K]> }): Monoid<O>
```