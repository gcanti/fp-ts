MODULE [Tuple](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts)

# Tuple

_data_
_since 1.0.0_

```ts
constructor(readonly fst: L, readonly snd: A) {}
```

## Methods

### bimap

_method_
_since 1.0.0_

```ts
<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B>
```

### compose

_method_
_since 1.0.0_

```ts
<B>(ab: Tuple<A, B>): Tuple<L, B>
```

### extend

_method_
_since 1.0.0_

```ts
<B>(f: (fa: Tuple<L, A>) => B): Tuple<L, B>
```

### extract

_method_
_since 1.0.0_

```ts
(): A
```

### inspect

_method_
_since 1.0.0_

```ts
(): string
```

### map

_method_
_since 1.0.0_

```ts
<B>(f: (a: A) => B): Tuple<L, B>
```

### reduce

_method_
_since 1.0.0_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### swap

_method_
_since 1.0.0_

```ts
(): Tuple<A, L>
```

Exchange the first and second components of a tuple

### toString

_method_
_since 1.0.0_

```ts
(): string
```

### toTuple

_method_
_since 1.0.0_

```ts
(): [L, A]
```

# tuple

_instance_
_since 1.0.0_

```ts
Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI>
```

# getApplicative

_function_
_since 1.0.0_

```ts
<L>(M: Monoid<L>): Applicative2C<URI, L>
```

# getApply

_function_
_since 1.0.0_

```ts
<L>(S: Semigroup<L>): Apply2C<URI, L>
```

# getChain

_function_
_since 1.0.0_

```ts
<L>(M: Monoid<L>): Chain2C<URI, L>
```

# getChainRec

_function_
_since 1.0.0_

```ts
<L>(M: Monoid<L>): ChainRec2C<URI, L>
```

# getMonad

_function_
_since 1.0.0_

```ts
<L>(M: Monoid<L>): Monad2C<URI, L>
```

# getMonoid

_function_
_since 1.0.0_

```ts
<L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>>
```

# getOrd

_function_
_since 1.0.0_

```ts
<L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>>
```

To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
`snd`s are `compare`d.

# getSemigroup

_function_
_since 1.0.0_

```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>>
```

# getSetoid

_function_
_since 1.0.0_

```ts
<L, A>(SA: Setoid<L>, SB: Setoid<A>): Setoid<Tuple<L, A>>
```
