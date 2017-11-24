MODULE [Pair](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts)

# Pair

_data_

```ts
constructor(readonly value: [A, A]) {}
```

## Methods

### ap

```ts
<B>(fab: Pair<(a: A) => B>): Pair<B>
```

### ap_

```ts
<B, C>(this: Pair<(b: B) => C>, fb: Pair<B>): Pair<C>
```

### extend

```ts
<B>(f: (fb: Pair<A>) => B): Pair<B>
```

### extract

```ts
(): A
```

### first

```ts
(f: Endomorphism<A>): Pair<A>
```

Map a function over the first field of a pair

### fst

```ts
(): A
```

### map

```ts
<B>(f: (a: A) => B): Pair<B>
```

### reduce

```ts
<B>(f: (b: B, a: A) => B, b: B): B
```

### second

```ts
(f: Endomorphism<A>): Pair<A>
```

Map a function over the second field of a pair

### snd

```ts
(): A
```

### swap

```ts
(): Pair<A>
```

Swaps the elements in a pair

### traverse

```ts
<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Pair<B>>
```

# pair

_instance_

```ts
Applicative<URI> & Foldable<URI> & Traversable<URI> & Comonad<URI>
```

# ap

_function_

```ts
<A, B>(fab: Pair<(a: A) => B>, fa: Pair<A>): Pair<B>
```

# extend

_function_

```ts
<A, B>(f: (fb: Pair<A>) => B, fa: Pair<A>): Pair<B>
```

# extract

_function_

```ts
<A>(fa: Pair<A>): A
```

# first

_function_

```ts
<A>(f: Endomorphism<A>) => (fa: Pair<A>): Pair<A>
```

Map a function over the first field of a pair

# getMonoid

_function_

```ts
<A>(M: Monoid<A>): Monoid<Pair<A>>
```

# getOrd

_function_

```ts
<A>(O: Ord<A>): Ord<Pair<A>>
```

# getSemigroup

_function_

```ts
<A>(S: Semigroup<A>): Semigroup<Pair<A>>
```

# getSetoid

_function_

```ts
<A>(S: Setoid<A>): Setoid<Pair<A>>
```

# map

_function_

```ts
<A, B>(f: (a: A) => B, fa: Pair<A>): Pair<B>
```

# of

_function_

```ts
<A>(a: A): Pair<A>
```

# reduce

_function_

```ts
<A, B>(f: (b: B, a: A) => B, b: B, fa: Pair<A>): B
```

# second

_function_

```ts
<A>(f: Endomorphism<A>) => (fa: Pair<A>): Pair<A>
```

Map a function over the second field of a pair

# swap

_function_

```ts
<A>(fa: Pair<A>): Pair<A>
```

Swaps the elements in a pair

# traverse

_function_

```ts
traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Pair<A>) => HKT<F, Pair<B>>
```
