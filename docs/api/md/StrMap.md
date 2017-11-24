MODULE [StrMap](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts)

# StrMap

_data_

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

_instance_

```ts
Monoid<StrMap<any>> & Functor<URI> & Foldable<URI> & Traversable<URI>
```

# collect

_function_

```ts
<A, B>(f: (k: string, a: A) => B) => (d: StrMap<A>): Array<B>
```

# concat

_function_

```ts
<A>(x: StrMap<A>) => (y: StrMap<A>): StrMap<A>
```

# empty

_function_

```ts
<A>(): StrMap<A>
```

# fromFoldable

_function_

```ts
<F>(F: Foldable<F>) => <A>(f: (existing: A) => (a: A) => A) => (
  ta: HKT<F, [string, A]>
): StrMap<A>
```

Create a dictionary from a foldable collection of key/value pairs, using the specified function to combine values for
duplicate keys.

# getMonoid

_function_

```ts
<A>(): Monoid<StrMap<A>>
```

# getSemigroup

_function_

```ts
<A>(): Semigroup<StrMap<A>>
```

# getSetoid

_function_

```ts
<A>(setoid: Setoid<A>): Setoid<StrMap<A>>
```

# insert

_function_

```ts
(k: string) => <A>(a: A) => (d: StrMap<A>): StrMap<A>
```

Insert or replace a key/value pair in a map

# isEmpty

_function_

```ts
<A>(d: StrMap<A>): boolean
```

Test whether a dictionary is empty

# isSubdictionary

_function_

```ts
<A>(setoid: Setoid<A>) => (d1: StrMap<A>) => (d2: StrMap<A>): boolean
```

Test whether one dictionary contains all of the keys and values contained in another dictionary

# lookup

_function_

```ts
(k: string) => <A>(d: StrMap<A>): Option<A>
```

Lookup the value for a key in a dictionary

# map

_function_

```ts
<A, B>(f: (a: A) => B, fa: StrMap<A>): StrMap<B>
```

# mapWithKey

_function_

```ts
<A, B>(f: (k: string, a: A) => B, fa: StrMap<A>): StrMap<B>
```

Apply a function of two arguments to each key/value pair, producing a new dictionary

# pop

_function_

```ts
(k: string) => <A>(d: StrMap<A>): Option<[A, StrMap<A>]>
```

Delete a key and value from a map, returning the value as well as the subsequent map

# reduce

_function_

```ts
<A, B>(f: (b: B, a: A) => B, b: B, fa: StrMap<A>): B
```

# remove

_function_

```ts
(k: string) => <A>(d: StrMap<A>): StrMap<A>
```

Delete a key and value from a map

# singleton

_function_

```ts
(k: string) => <A>(a: A): StrMap<A>
```

Create a dictionary with one key/value pair

# size

_function_

```ts
<A>(d: StrMap<A>): number
```

Calculate the number of key/value pairs in a dictionary

# toArray

_function_

```ts
<A>(d: StrMap<A>): Array<[string, A]>
```

# toUnfoldable

_function_

```ts
<F>(unfoldable: Unfoldable<F>) => <A>(d: StrMap<A>): HKT<F, [string, A]>
```

Unfolds a dictionary into a list of key/value pairs

# traverse

_function_

```ts
traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>>
```

# traverseWithKey

_function_

```ts
traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(f: (k: string, a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>>
```
