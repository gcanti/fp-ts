MODULE [Ord](https://github.com/gcanti/fp-ts/blob/master/src/Ord.ts)
# Ord
*type class*
```ts
interface Ord<A> extends Setoid<A> {
  compare: (x: A, y: A) => Ordering
}
```
# ordBoolean
*instance*
```ts
Ord<boolean>
```

# ordNumber
*instance*
```ts
Ord<number>
```

# ordString
*instance*
```ts
Ord<string>
```
# between
*function*
```ts
<A>(O: Ord<A>): ((low: A, hi: A) => (x: A) => boolean)
```
Test whether a value is between a minimum and a maximum (inclusive)

# clamp
*function*
```ts
<A>(O: Ord<A>): ((low: A, hi: A) => (x: A) => A)
```
Clamp a value between a minimum and a maximum

# contramap
*function*
```ts
<A, B>(f: (b: B) => A, fa: Ord<A>): Ord<B>
```

# fromCompare
*function*
```ts
<A>(compare: (x: A, y: A) => Ordering): Ord<A>
```

# getProductOrd
*function*
```ts
<A, B>(OA: Ord<A>, OB: Ord<B>): Ord<[A, B]>
```

# getSemigroup
*function*
```ts
<A = never>(): Semigroup<Ord<A>>
```

# greaterThan
*function*
```ts
<A>(O: Ord<A>) => (x: A, y: A): boolean
```
Test whether one value is _strictly greater than_ another

# greaterThanOrEq
*function*
```ts
<A>(O: Ord<A>) => (x: A, y: A): boolean
```
Test whether one value is _non-strictly greater than_ another

# lessThan
*function*
```ts
<A>(O: Ord<A>) => (x: A, y: A): boolean
```
Test whether one value is _strictly less than_ another

# lessThanOrEq
*function*
```ts
<A>(O: Ord<A>) => (x: A, y: A): boolean
```
Test whether one value is _non-strictly less than_ another

# max
*function*
```ts
<A>(O: Ord<A>) => (x: A, y: A): A
```
Take the maximum of two values. If they are considered equal, the first argument is chosen

# min
*function*
```ts
<A>(O: Ord<A>) => (x: A, y: A): A
```
Take the minimum of two values. If they are considered equal, the first argument is chosen

# unsafeCompare
*function*
```ts
(x: any, y: any): Ordering
```