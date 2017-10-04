MODULE [Monoid](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts)
# Monoid
```ts
interface Monoid<A> extends Semigroup<A> {
  empty: () => A
}
```
# fold
```ts
<A>(M: Monoid<A>) => (as: Array<A>): A
```
# getArrayMonoid
```ts
<A>(): Monoid<Array<A>>
```
Returns a monoid under array concatenation
# getDualMonoid
```ts
<A>(M: Monoid<A>): Monoid<A>
```
# getEndomorphismMonoid
```ts
<A>(): Monoid<Endomorphism<A>>
```
# getFunctionMonoid
```ts
<M>(monoid: Monoid<M>) => <A>(): Monoid<(a: A) => M>
```
# getProductMonoid
```ts
<A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]>
```
# getRecordMonoid
```ts
<O extends { [key: string]: any }>(monoids: { [K in keyof O]: Monoid<O[K]> }): Monoid<{ [K in keyof O]: O[K] }>
```
# monoidAll
```ts
Monoid<boolean>
```
Boolean monoid under conjunction
# monoidAny
```ts
Monoid<boolean>
```
Boolean monoid under disjunction
# monoidArray
```ts
Monoid<Array<any>>
```
Monoid under array concatenation (`Array<any>`)
# monoidProduct
```ts
Monoid<number>
```
Number monoid under multiplication
# monoidString
```ts
Monoid<string>
```
# monoidSum
```ts
Monoid<number>
```
Number monoid under addition