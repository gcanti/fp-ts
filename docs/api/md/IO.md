MODULE [IO](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts)

# IO

_data_

_since 1.0.0_

```ts
constructor(readonly run: Lazy<A>) {}
```

## Methods

### ap

_method_

_since 1.0.0_

```ts
<B>(fab: IO<(a: A) => B>): IO<B>
```

### ap\_

_method_

_since 1.0.0_

```ts
<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C>
```

### applySecond

_method_

_since 1.5.0_

```ts
<B>(fb: IO<B>): IO<B>
```

Combine two effectful actions, keeping only the result of the second

### chain

_method_

_since 1.0.0_

```ts
<B>(f: (a: A) => IO<B>): IO<B>
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
<B>(f: (a: A) => B): IO<B>
```

### toString

_method_

_since 1.0.0_

```ts
(): string
```

# io

_instance_

_since 1.0.0_

```ts
Monad1<URI>
```

# getMonoid

_function_

_since 1.0.0_

```ts
<A>(M: Monoid<A>): Monoid<IO<A>>
```

# getSemigroup

_function_

_since 1.0.0_

```ts
<A>(S: Semigroup<A>): Semigroup<IO<A>>
```
