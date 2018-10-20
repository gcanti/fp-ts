---
id: Record
title: Module Record
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts)

## Constants

### empty

_constant_

_since 1.10.0_

_Signature_

```ts
empty: Record<string, never>
```

## Functions

### collect

_function_

_since 1.10.0_

_Signature_

```ts
<A, B>(d: { [key: string]: A }, f: (k: string, a: A) => B): Array<B>
```

### compact

_function_

_since 1.10.0_

_Signature_

```ts
<A>(fa: { [key: string]: Option<A> }): { [key: string]: A }
```

### filterMap

_function_

_since 1.10.0_

_Signature_

```ts
<A, B>(fa: { [key: string]: A }, f: (a: A) => Option<B>): { [key: string]: B }
```

### foldMap

_function_

_since 1.10.0_

_Signature_

```ts
<M>(M: Monoid<M>) => <A>(fa: { [key: string]: A }, f: (a: A) => M): M
```

### foldr

_function_

_since 1.10.0_

_Signature_

```ts
<A, B>(fa: { [key: string]: A }, b: B, f: (a: A, b: B) => B): B
```

### fromFoldable

_function_

_since 1.10.0_

_Signature_

```ts
fromFoldable<F>(
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) =>
```

_Description_

Create a dictionary from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

### getMonoid

_function_

_since 1.10.0_

_Signature_

```ts
getDictionaryMonoid
```

### getSetoid

_function_

_since 1.10.0_

_Signature_

```ts
<A>(S: Setoid<A>): Setoid<{ [key: string]: A }>
```

### insert

_function_

_since 1.10.0_

_Signature_

```ts
<A>(k: string, a: A, d: { [key: string]: A }): { [key: string]: A }
```

_Description_

Insert or replace a key/value pair in a map

### isEmpty

_function_

_since 1.10.0_

_Signature_

```ts
<A>(d: { [key: string]: A }): boolean
```

_Description_

Test whether a dictionary is empty

### isSubdictionary

_function_

_since 1.10.0_

_Signature_

```ts
<A>(S: Setoid<A>) => (d1: { [key: string]: A }, d2: { [key: string]: A }): boolean
```

_Description_

Test whether one dictionary contains all of the keys and values contained in another dictionary

### map

_function_

_since 1.10.0_

_Signature_

```ts
<A, B>(fa: { [key: string]: A }, f: (a: A) => B): { [key: string]: B }
```

### mapWithKey

_function_

_since 1.10.0_

_Signature_

```ts
<A, B>(fa: { [key: string]: A }, f: (k: string, a: A) => B): { [key: string]: B }
```

### partition

_function_

_since 1.10.0_

_Signature_

```ts
<A>(
  fa: { [key: string]: A },
  p: Predicate<A>
): Separated<{ [key: string]: A }, { [key: string]: A }>
```

### partitionMap

_function_

_since 1.10.0_

_Signature_

```ts
<RL, RR, A>(
  fa: { [key: string]: A },
  f: (a: A) => Either<RL, RR>
): Separated<{ [key: string]: RL }, { [key: string]: RR }>
```

### pop

_function_

_since 1.10.0_

_Signature_

```ts
<A>(k: string, d: { [key: string]: A }): Option<[A, { [key: string]: A }]>
```

_Description_

Delete a key and value from a map, returning the value as well as the subsequent map

### reduce

_function_

_since 1.10.0_

_Signature_

```ts
<A, B>(fa: { [key: string]: A }, b: B, f: (b: B, a: A) => B): B
```

### remove

_function_

_since 1.10.0_

_Signature_

```ts
<A>(k: string, d: { [key: string]: A }): { [key: string]: A }
```

_Description_

Delete a key and value from a map

### separate

_function_

_since 1.10.0_

_Signature_

```ts
<RL, RR>(fa: {
  [key: string]: Either<RL, RR>
}): Separated<{ [key: string]: RL }, { [key: string]: RR }>
```

### sequence

_function_

_since 1.10.0_

_Signature_

```ts
sequence<F>(F: Applicative<F>): <A>(ta:
```

### singleton

_function_

_since 1.10.0_

_Signature_

```ts
<A>(k: string, a: A): { [key: string]: A }
```

_Description_

Create a dictionary with one key/value pair

### size

_function_

_since 1.10.0_

_Signature_

```ts
<A>(d: { [key: string]: A }): number
```

_Description_

Calculate the number of key/value pairs in a dictionary

### toArray

_function_

_since 1.10.0_

_Signature_

```ts
<A>(d: { [key: string]: A }): Array<[string, A]>
```

### toUnfoldable

_function_

_since 1.10.0_

_Signature_

```ts
<F>(unfoldable: Unfoldable<F>) => <A>(d: { [key: string]: A }): HKT<F, [string, A]>
```

_Description_

Unfolds a dictionary into a list of key/value pairs

### traverse

_function_

_since 1.10.0_

_Signature_

```ts
traverse<F>(
  F: Applicative<F>
): <A, B>(ta:
```

### traverseWithKey

_function_

_since 1.10.0_

_Signature_

```ts
traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta:
```

### wilt

_function_

_since 1.10.0_

_Signature_

```ts
wilt<F>(
  F: Applicative<F>
): (<RL, RR, A>(
  wa:
```

### wither

_function_

_since 1.10.0_

_Signature_

```ts
wither<F>(
  F: Applicative<F>
): (<A, B>(wa:
```
