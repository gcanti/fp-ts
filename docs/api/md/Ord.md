MODULE [Ord](https://github.com/gcanti/fp-ts/blob/master/src/Ord.ts)
# Ord
```ts
interface Ord<A> extends Setoid<A> {
  compare: (x: A) => (y: A) => Ordering
}
```
# between
```ts
<A>(ord: Ord<A>) => (low: A) => (hi: A) => (x: A): boolean
```
Test whether a value is between a minimum and a maximum (inclusive)
# clamp
```ts
<A>(ord: Ord<A>) => (low: A) => (hi: A) => (x: A): A
```
Clamp a value between a minimum and a maximum
# contramap
```ts
<A, B>(f: (b: B) => A, fa: Ord<A>): Ord<B>
```
# fromCompare
```ts
<A>(compare: (x: A) => (y: A) => Ordering): Ord<A>
```
# getSemigroup
```ts
<A>(): Semigroup<Ord<A>>
```
# greaterThan
```ts
<A>(ord: Ord<A>) => (x: A) => (y: A): boolean
```
Test whether one value is _strictly greater than_ another
# greaterThanOrEq
```ts
<A>(ord: Ord<A>) => (x: A) => (y: A): boolean
```
Test whether one value is _non-strictly greater than_ another
# lessThan
```ts
<A>(ord: Ord<A>) => (x: A) => (y: A): boolean
```
Test whether one value is _strictly less than_ another
# lessThanOrEq
```ts
<A>(ord: Ord<A>) => (x: A) => (y: A): boolean
```
Test whether one value is _non-strictly less than_ another
# max
```ts
<A>(ord: Ord<A>) => (x: A) => (y: A): A
```
Take the maximum of two values. If they are considered equal, the first argument is chosen
# min
```ts
<A>(ord: Ord<A>) => (x: A) => (y: A): A
```
Take the minimum of two values. If they are considered equal, the first argument is chosen
# toNativeComparator
```ts
<A>(compare: (x: A) => (y: A) => Ordering): ((x: A, y: A) => number)
```
# unsafeCompare
```ts
(x: any) => (y: any): Ordering
```
# ordBoolean
```ts
Ord<boolean>
```
# ordNumber
```ts
Ord<number>
```
# ordString
```ts
Ord<string>
```