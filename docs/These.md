---
id: These
title: Module These
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts)

## Data

### These

_data_

_since 1.0.0_

_Signature_

```ts
type These<L, A> = This<L, A> | That<L, A> | Both<L, A>
```

## Methods

### bimap

_method_

_since 1.0.0_

_Signature_

```ts
<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B>
```

### fold

_method_

_since 1.0.0_

_Signature_

```ts
<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B
```

_Description_

Applies a function to each case in the data structure

### inspect

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

### isBoth

_method_

_since 1.0.0_

_Signature_

```ts
(): this is Both<L, A>
```

_Description_

Returns `true` if the these is `Both`, `false` otherwise

### isThat

_method_

_since 1.0.0_

_Signature_

```ts
(): this is That<L, A>
```

_Description_

Returns `true` if the these is `That`, `false` otherwise

### isThis

_method_

_since 1.0.0_

_Signature_

```ts
(): this is This<L, A>
```

_Description_

Returns `true` if the these is `This`, `false` otherwise

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): These<L, B>
```

### reduce

_method_

_since 1.0.0_

_Signature_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### toString

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

## Instances

### these

_instance_

_since 1.0.0_

_Signature_

```ts
Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2<URI>
```

## Functions

### both

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(l: L, a: A): These<L, A>
```

### fromThese

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A]
```

### getMonad

_function_

_since 1.0.0_

_Signature_

```ts
<L>(S: Semigroup<L>): Monad2C<URI, L>
```

### getSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>>
```

### getSetoid

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>>
```

### isBoth

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: These<L, A>): fa is Both<L, A>
```

_Description_

Returns `true` if the these is an instance of `Both`, `false` otherwise

### isThat

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: These<L, A>): fa is That<L, A>
```

_Description_

Returns `true` if the these is an instance of `That`, `false` otherwise

### isThis

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: These<L, A>): fa is This<L, A>
```

_Description_

Returns `true` if the these is an instance of `This`, `false` otherwise

### that

_function_

_since 1.0.0_
Alias of

_Signature_

```ts
of
```

### theseLeft

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: These<L, A>): Option<L>
```

### theseRight

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: These<L, A>): Option<A>
```

### this\_

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(l: L): These<L, A>
```
