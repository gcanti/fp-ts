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

### inspect

```ts
(): string
```

### map

```ts
<B>(f: (a: A) => B): These<L, B>
```

### reduce

```ts
<B>(f: (b: B, a: A) => B, b: B): B
```

### toString

```ts
(): string
```

### traverse

```ts
<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>>
```

# these

_instance_

```ts
Functor<URI> & Bifunctor<URI> & Foldable<URI> & Traversable<URI>
```

# ap

_function_

```ts
<L>(S: Semigroup<L>) => <A, B>(fab: These<L, (a: A) => B>, fa: These<L, A>)
```

# bimap

_function_

```ts
<L, M, A, B>(f: (l: L) => M, g: (a: A) => B, fla: These<L, A>): These<M, B>
```

# both

_function_

```ts
<L, A>(l: L, a: A): These<L, A>
```

# chain

_function_

```ts
<L>(S: Semigroup<L>) => <A, B>(f: (a: A) => These<L, B>, fa: These<L, A>): These<L, B>
```

# fold

_function_

```ts
<L, A, B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B) => (
  fa: These<L, A>
): B
```

# fromThese

_function_

```ts
<L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A]
```

# getMonad

_function_

```ts
<L>(S: Semigroup<L>): Monad<URI>
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

# isThat

_function_

```ts
<L, A>(fa: These<L, A>): fa is That<L, A>
```

# isThis

_function_

```ts
<L, A>(fa: These<L, A>): fa is This<L, A>
```

# map

_function_

```ts
<L, A, B>(f: (a: A) => B, fa: These<L, A>): These<L, B>
```

# of

_function_

```ts
<L, A>(a: A): These<L, A>
```

# reduce

_function_

```ts
<L, A, B>(f: (b: B, a: A) => B, b: B, fa: These<L, A>): B
```

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

# traverse

_function_

```ts
traverse<F>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: These<L, A>) => HKT<F, These<L, B>>
```
