MODULE [Tuple](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts)

# Tuple

_data_

```ts
constructor(readonly value: [L, A]) {}
```

## Methods

### bimap

```ts
<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B>
```

### compose

```ts
<B>(ab: Tuple<A, B>): Tuple<L, B>
```

### extend

```ts
<B>(f: (fa: Tuple<L, A>) => B): Tuple<L, B>
```

### extract

```ts
(): A
```

### fst

```ts
(): L
```

### inspect

```ts
(): string
```

### map

```ts
<B>(f: (a: A) => B): Tuple<L, B>
```

### reduce

```ts
<B>(f: (c: B, b: A) => B, c: B): B
```

### snd

```ts
(): A
```

### toString

```ts
(): string
```

### traverse

```ts
<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Tuple<L, B>>
```

# tuple

_instance_

```ts
Semigroupoid<URI> & Bifunctor<URI> & Comonad<URI> & Foldable<URI> & Traversable<URI>
```

# ap

_function_

```ts
<L>(S: Semigroup<L>) => <A, B>(fab: Tuple<L, (b: A) => B>, fa: Tuple<L, A>): Tuple<L, B>
```

# bimap

_function_

```ts
<L, A, M, B>(f: (l: L) => M, g: (a: A) => B, fla: Tuple<L, A>): Tuple<M, B>
```

# chain

_function_

```ts
<L>(M: Monoid<L>) => <A, B>(f: (b: A) => Tuple<L, B>, fa: Tuple<L, A>): Tuple<L, B>
```

# chainRec

_function_

```ts
<L>(M: Monoid<L>) => <A, B>(f: (a: A) => Tuple<L, Either<A, B>>, a: A): Tuple<L, B>
```

# compose

_function_

```ts
<L, A, B>(bc: Tuple<A, B>, fa: Tuple<L, A>): Tuple<L, B>
```

# extend

_function_

```ts
<L, A, B>(f: (fa: Tuple<L, A>) => B, fa: Tuple<L, A>): Tuple<L, B>
```

# extract

_function_ Alias of

```ts
snd
```

# fst

_function_

```ts
<L, A>(fa: Tuple<L, A>): L
```

Returns the first component of a tuple.

# getApplicative

_function_

```ts
<L>(M: Monoid<L>): Applicative<URI>
```

# getApply

_function_

```ts
<L>(S: Semigroup<L>): Apply<URI>
```

# getChain

_function_

```ts
<L>(M: Monoid<L>): Chain<URI>
```

# getChainRec

_function_

```ts
<L>(M: Monoid<L>): ChainRec<URI>
```

# getMonad

_function_

```ts
<L>(M: Monoid<L>): Monad<URI>
```

# getMonoid

_function_

```ts
<L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>>
```

# getOrd

_function_

```ts
<L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>>
```

To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the `snd`s are `compare`d.

# getSemigroup

_function_

```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>>
```

# getSetoid

_function_

```ts
<L, A>(SA: Setoid<L>, SB: Setoid<A>): Setoid<Tuple<L, A>>
```

# map

_function_

```ts
<L, A, B>(f: (b: A) => B, fa: Tuple<L, A>): Tuple<L, B>
```

# of

_function_

```ts
<L>(M: Monoid<L>) => <A>(a: A): Tuple<L, A>
```

# reduce

_function_

```ts
<L, A, B>(f: (c: B, b: A) => B, c: B, fa: Tuple<L, A>): B
```

# snd

_function_

```ts
<L, A>(fa: Tuple<L, A>): A
```

Returns the second component of a tuple.

# swap

_function_

```ts
<L, A>(fa: Tuple<L, A>): Tuple<A, L>
```

Exchange the first and second components of a tuple.

# traverse

_function_

```ts
traverse<F>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Tuple<L, A>) => HKT<F, Tuple<L, B>>
```
