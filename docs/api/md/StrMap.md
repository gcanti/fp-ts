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
<B>(f: (b: B, a: A) => B, b: B): B 
```
### traverse
```ts
<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, StrMap<B>> 
```
### traverseWithKey
```ts
<F>(F: Applicative<F>): <B>(f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>> 
```
# strmap
*instance*
```ts
Monoid<StrMap<any>> & Functor<URI> & Foldable<URI> & Traversable<URI>
```
# collect
*function*
```ts
<A, B>(f: (k: string, a: A) => B) => (d: StrMap<A>): Array<B>
```

# concat
*function*
```ts
<A>(x: StrMap<A>) => (y: StrMap<A>): StrMap<A>
```

# empty
*function*
```ts
<A>(): StrMap<A>
```

# fromFoldable
*function*
```ts
<F>(F: Foldable<F>) => <A>(f: (existing: A) => (a: A) => A) => (
  ta: HKT<F, [string, A]>
): StrMap<A>
```
Create a dictionary from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

# getSetoid
*function*
```ts
<A>(setoid: Setoid<A>): Setoid<StrMap<A>>
```

# insert
*function*
```ts
(k: string) => <A>(a: A) => (d: StrMap<A>): StrMap<A>
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
<A>(setoid: Setoid<A>) => (d1: StrMap<A>) => (d2: StrMap<A>): boolean
```
Test whether one dictionary contains all of the keys and values contained in another dictionary

# lookup
*function*
```ts
(k: string) => <A>(d: StrMap<A>): Option<A>
```
Lookup the value for a key in a dictionary

# map
*function*
```ts
<A, B>(f: (a: A) => B, fa: StrMap<A>): StrMap<B>
```

# mapWithKey
*function*
```ts
<A, B>(f: (k: string, a: A) => B, fa: StrMap<A>): StrMap<B>
```
Apply a function of two arguments to each key/value pair, producing a new dictionary

# pop
*function*
```ts
(k: string) => <A>(d: StrMap<A>): Option<[A, StrMap<A>]>
```
Delete a key and value from a map, returning the value as well as the subsequent map

# reduce
*function*
```ts
<A, B>(f: (b: B, a: A) => B, b: B, fa: StrMap<A>): B
```

# remove
*function*
```ts
(k: string) => <A>(d: StrMap<A>): StrMap<A>
```
Delete a key and value from a map

# singleton
*function*
```ts
(k: string) => <A>(a: A): StrMap<A>
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
<F extends string>(unfoldable: Unfoldable<F>) => <A>(d: StrMap<A>): HKT<F, [string, A]>
```
Unfolds a dictionary into a list of key/value pairs

# traverse
*function*
```ts
traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>> 
```

# traverseWithKey
*function*
```ts
traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(f: (k: string, a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>> 
```