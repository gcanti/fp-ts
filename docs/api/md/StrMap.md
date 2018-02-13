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
<B>(b: B, f: (b: B, a: A) => B): B
```

# strmap

_instance_

```ts
Functor1<URI> & Foldable1<URI> & Traversable1<URI>
```

# collect

_function_

```ts
<A, B>(d: StrMap<A>, f: (k: string, a: A) => B): Array<B>
```

# getMonoid

_function_

```ts
<A = never>(): Monoid<StrMap<A>>
```

# getSetoid

_function_

```ts
<A>(S: Setoid<A>): Setoid<StrMap<A>>
```

# insert

_function_

```ts
<A>(k: string, a: A, d: StrMap<A>): StrMap<A>
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
<A>(S: Setoid<A>) => (d1: StrMap<A>, d2: StrMap<A>): boolean
```

Test whether one dictionary contains all of the keys and values contained in another dictionary

# lookup

_function_

```ts
<A>(k: string, d: StrMap<A>): Option<A>
```

Lookup the value for a key in a dictionary

# pop

_function_

```ts
<A>(k: string, d: StrMap<A>): Option<[A, StrMap<A>]>
```

Delete a key and value from a map, returning the value as well as the subsequent map

# remove

_function_

```ts
<A>(k: string, d: StrMap<A>): StrMap<A>
```

Delete a key and value from a map

# singleton

_function_

```ts
<A>(k: string, a: A): StrMap<A>
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
