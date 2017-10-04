MODULE [Semigroup](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts)
# Semigroup
```ts
interface Semigroup<A> {
  concat: (x: A) => (y: A) => A
}
```
# fold
```ts
<A>(S: Semigroup<A>) => (a: A) => (as: Array<A>): A
```
# getDualSemigroup
```ts
<A>(S: Semigroup<A>): Semigroup<A>
```
# getFirstSemigroup
```ts
<A>(): Semigroup<A>
```
# getJoinSemigroup
```ts
<A>(O: Ord<A>): Semigroup<A>
```
# getLastSemigroup
```ts
<A>(): Semigroup<A>
```
# getMeetSemigroup
```ts
<A>(O: Ord<A>): Semigroup<A>
```
# getProductSemigroup
```ts
<A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]>
```
# getRecordSemigroup
```ts
<O extends { [key: string]: any }>(semigroups: { [K in keyof O]: Semigroup<O[K]> }): Semigroup<{ [K in keyof O]: O[K] }>
```
Returns a monoid under array concatenation