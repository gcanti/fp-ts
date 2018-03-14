MODULE [These](https://github.com/gcanti/fp-ts/blob/master/src/These.ts)

# These

_data_
_since 1.0.0_

```ts
type These<L, A> = This<L, A> | That<L, A> | Both<L, A>
```

## Methods

### bimap

_method_
_since 1.0.0_

```ts
<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B>
```

### fold

_method_
_since 1.0.0_

```ts
<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B
```

Applies a function to each case in the data structure

### inspect

_method_
_since 1.0.0_

```ts
(): string
```

### isBoth

_method_
_since 1.0.0_

```ts
(): this is Both<L, A>
```

Returns `true` if the these is `Both`, `false` otherwise

### isThat

_method_
_since 1.0.0_

```ts
(): this is That<L, A>
```

Returns `true` if the these is `That`, `false` otherwise

### isThis

_method_
_since 1.0.0_

```ts
(): this is This<L, A>
```

Returns `true` if the these is `This`, `false` otherwise

### map

_method_
_since 1.0.0_

```ts
<B>(f: (a: A) => B): These<L, B>
```

### reduce

_method_
_since 1.0.0_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### toString

_method_
_since 1.0.0_

```ts
(): string
```

# these

_instance_
_since 1.0.0_

```ts
Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI>
```

# both

_function_
_since 1.0.0_

```ts
<L, A>(l: L, a: A): These<L, A>
```

# fromThese

_function_
_since 1.0.0_

```ts
<L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A]
```

# getMonad

_function_
_since 1.0.0_

```ts
<L>(S: Semigroup<L>): Monad2C<URI, L>
```

# getSemigroup

_function_
_since 1.0.0_

```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>>
```

# getSetoid

_function_
_since 1.0.0_

```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>>
```

# isBoth

_function_
_since 1.0.0_

```ts
<L, A>(fa: These<L, A>): fa is Both<L, A>
```

Returns `true` if the these is an instance of `Both`, `false` otherwise

# isThat

_function_
_since 1.0.0_

```ts
<L, A>(fa: These<L, A>): fa is That<L, A>
```

Returns `true` if the these is an instance of `That`, `false` otherwise

# isThis

_function_
_since 1.0.0_

```ts
<L, A>(fa: These<L, A>): fa is This<L, A>
```

Returns `true` if the these is an instance of `This`, `false` otherwise

# that

_function_
_since 1.0.0_
Alias of

```ts
of
```

# theseLeft

_function_
_since 1.0.0_

```ts
<L, A>(fa: These<L, A>): Option<L>
```

# theseRight

_function_
_since 1.0.0_

```ts
<L, A>(fa: These<L, A>): Option<A>
```

# this\_

_function_
_since 1.0.0_

```ts
<L, A>(l: L): These<L, A>
```
