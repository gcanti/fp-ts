MODULE [IO](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts)

# IO

_data_

```ts
constructor(readonly run: Lazy<A>) {}
```

## Methods

### ap

```ts
<B>(fab: IO<(a: A) => B>): IO<B>
```

### ap\_

```ts
<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C>
```

### chain

```ts
<B>(f: (a: A) => IO<B>): IO<B>
```

### inspect

```ts
(): string
```

### map

```ts
<B>(f: (a: A) => B): IO<B>
```

### toString

```ts
(): string
```

# io

_instance_

```ts
Monad1<URI>
```

# getMonoid

_function_

```ts
<A>(M: Monoid<A>): Monoid<IO<A>>
```

# getSemigroup

_function_

```ts
<A>(S: Semigroup<A>): Semigroup<IO<A>>
```
