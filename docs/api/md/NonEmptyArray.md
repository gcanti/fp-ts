MODULE [NonEmptyArray](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts)

# NonEmptyArray

_data_
_since 1.0.0_

```ts
constructor(readonly head: A, readonly tail: Array<A>) {}
```

## Methods

### ap

_method_
_since 1.0.0_

```ts
<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B>
```

### ap\_

_method_
_since 1.0.0_

```ts
<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C>
```

### chain

_method_
_since 1.0.0_

```ts
<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B>
```

### concat

_method_
_since 1.0.0_

```ts
(y: NonEmptyArray<A>): NonEmptyArray<A>
```

### concatArray

_method_
_since 1.0.0_

```ts
(as: Array<A>): NonEmptyArray<A>
```

### extend

_method_
_since 1.0.0_

```ts
<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B>
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
<B>(f: (a: A) => B): NonEmptyArray<B>
```

### reduce

_method_
_since 1.0.0_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### toArray

_method_
_since 1.0.0_

```ts
(): Array<A>
```

### toString

_method_
_since 1.0.0_

```ts
(): string
```

# nonEmptyArray

_instance_
_since 1.0.0_

```ts
Monad1<URI> & Comonad1<URI> & Foldable1<URI> & Traversable1<URI>
```

# fromArray

_function_
_since 1.0.0_

```ts
<A>(as: Array<A>): Option<NonEmptyArray<A>>
```

# getSemigroup

_function_
_since 1.0.0_

```ts
<A = never>(): Semigroup<NonEmptyArray<A>>
```
