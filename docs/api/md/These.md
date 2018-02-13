MODULE [These](https://github.com/gcanti/fp-ts/blob/master/src/These.ts)

# These

_data_

```ts
type These<L, A> = This<L, A> | That<L, A> | Both<L, A>
```

## Methods

### bimap

```ts
<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B>
```

### fold

```ts
<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B
```

Applies a function to each case in the data structure

### inspect

```ts
(): string
```

### isBoth

```ts
(): this is Both<L, A>
```

Returns `true` if the these is `Both`, `false` otherwise

### isThat

```ts
(): this is That<L, A>
```

Returns `true` if the these is `That`, `false` otherwise

### isThis

```ts
(): this is This<L, A>
```

Returns `true` if the these is `This`, `false` otherwise

### map

```ts
<B>(f: (a: A) => B): These<L, B>
```

### reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### toString

```ts
(): string
```

# these

_instance_

```ts
Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI>
```

# both

_function_

```ts
<L, A>(l: L, a: A): These<L, A>
```

# fromThese

_function_

```ts
<L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A]
```

# getMonad

_function_

```ts
<L>(S: Semigroup<L>): Monad2C<URI, L>
```

# getSemigroup

_function_

```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>>
```

# getSetoid

_function_

```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>>
```

# isBoth

_function_

```ts
<L, A>(fa: These<L, A>): fa is Both<L, A>
```

Returns `true` if the these is an instance of `Both`, `false` otherwise

# isThat

_function_

```ts
<L, A>(fa: These<L, A>): fa is That<L, A>
```

Returns `true` if the these is an instance of `That`, `false` otherwise

# isThis

_function_

```ts
<L, A>(fa: These<L, A>): fa is This<L, A>
```

Returns `true` if the these is an instance of `This`, `false` otherwise

# that

_function_ Alias of

```ts
of
```

# theseLeft

_function_

```ts
<L, A>(fa: These<L, A>): Option<L>
```

# theseRight

_function_

```ts
<L, A>(fa: These<L, A>): Option<A>
```

# this_

_function_

```ts
<L, A>(l: L): These<L, A>
```
