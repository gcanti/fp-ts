MODULE [NonEmptyArray](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts)

# NonEmptyArray

_data_

```ts
constructor(readonly head: A, readonly tail: Array<A>) {}
```

## Methods

### ap

```ts
<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B>
```

### ap_

```ts
<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C>
```

### chain

```ts
<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B>
```

### concat

```ts
(y: NonEmptyArray<A>): NonEmptyArray<A>
```

### concatArray

```ts
(as: Array<A>): NonEmptyArray<A>
```

### extend

```ts
<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B>
```

### extract

```ts
(): A
```

### inspect

```ts
(): string
```

### map

```ts
<B>(f: (a: A) => B): NonEmptyArray<B>
```

### reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### toArray

```ts
(): Array<A>
```

### toString

```ts
(): string
```

# nonEmptyArray

_instance_

```ts
Monad1<URI> & Comonad1<URI> & Foldable1<URI> & Traversable1<URI>
```

# fromArray

_function_

```ts
<A>(as: Array<A>): Option<NonEmptyArray<A>>
```

# getSemigroup

_function_

```ts
<A = never>(): Semigroup<NonEmptyArray<A>>
```
