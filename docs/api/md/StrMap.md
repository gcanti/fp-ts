MODULE [StrMap](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts)
# StrMap
*data*
```ts
constructor(readonly value: { [key: string]: A }) {}
```
## Methods

### map
```ts
<B>(f: (a: A) => B): StrMap<B> 
```
### mapWithKey
```ts
<B>(f: (k: string, a: A) => B): StrMap<B> 
```
### reduce
```ts
<B>(b: B, f: (b: B, a: A) => B): B 
```
# strmap
*instance*
```ts
Functor1<URI> & Foldable1<URI> & Traversable1<URI>
```
# collect
*function*
```ts
<A, B>(d: StrMap<A>, f: (k: string, a: A) => B): Array<B>
```

# getMonoid
*function*
```ts
<A = never>(): Monoid<StrMap<A>>
```

# getSetoid
*function*
```ts
<A>(S: Setoid<A>): Setoid<StrMap<A>>
```

# insert
*function*
```ts
<A>(k: string, a: A, d: StrMap<A>): StrMap<A>
```
Insert or replace a key/value pair in a map

# isEmpty
*function*
```ts
<A>(d: StrMap<A>): boolean
```
Test whether a dictionary is empty

# isSubdictionary
*function*
```ts
<A>(S: Setoid<A>) => (d1: StrMap<A>, d2: StrMap<A>): boolean
```
Test whether one dictionary contains all of the keys and values contained in another dictionary

# lookup
*function*
```ts
<A>(k: string, d: StrMap<A>): Option<A>
```
Lookup the value for a key in a dictionary

# pop
*function*
```ts
<A>(k: string, d: StrMap<A>): Option<[A, StrMap<A>]>
```
Delete a key and value from a map, returning the value as well as the subsequent map

# remove
*function*
```ts
<A>(k: string, d: StrMap<A>): StrMap<A>
```
Delete a key and value from a map

# singleton
*function*
```ts
<A>(k: string, a: A): StrMap<A>
```
Create a dictionary with one key/value pair

# size
*function*
```ts
<A>(d: StrMap<A>): number
```
Calculate the number of key/value pairs in a dictionary

# toArray
*function*
```ts
<A>(d: StrMap<A>): Array<[string, A]>
```

# toUnfoldable
*function*
```ts
<F>(unfoldable: Unfoldable<F>) => <A>(d: StrMap<A>): HKT<F, [string, A]>
```
Unfolds a dictionary into a list of key/value pairs