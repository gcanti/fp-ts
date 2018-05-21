MODULE [Pair](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts)

# Pair

_data_

_since 1.0.0_

_Signature_

```ts
constructor(readonly fst: A, readonly snd: A) {}
```

## Methods

### ap

_method_

_since 1.0.0_

_Signature_

```ts
<B>(fab: Pair<(a: A) => B>): Pair<B>
```

### ap\_

_method_

_since 1.0.0_

_Signature_

```ts
<B, C>(this: Pair<(b: B) => C>, fb: Pair<B>): Pair<C>
```

### extend

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (fb: Pair<A>) => B): Pair<B>
```

### extract

_method_

_since 1.0.0_

_Signature_

```ts
(): A
```

### first

_method_

_since 1.0.0_

_Signature_

```ts
(f: Endomorphism<A>): Pair<A>
```

_Description_

Map a function over the first field of a pair

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): Pair<B>
```

### reduce

_method_

_since 1.0.0_

_Signature_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### second

_method_

_since 1.0.0_

_Signature_

```ts
(f: Endomorphism<A>): Pair<A>
```

_Description_

Map a function over the second field of a pair

### swap

_method_

_since 1.0.0_

_Signature_

```ts
(): Pair<A>
```

_Description_

Swaps the elements in a pair

# pair

_instance_

_since 1.0.0_

_Signature_

```ts
Applicative1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI>
```

# getMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<A>(M: Monoid<A>): Monoid<Pair<A>>
```

# getOrd

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>): Ord<Pair<A>>
```

# getSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Semigroup<A>): Semigroup<Pair<A>>
```

# getSetoid

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>): Setoid<Pair<A>>
```
