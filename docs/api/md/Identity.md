MODULE [Identity](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts)

# Identity

_data_

```ts
constructor(readonly value: A) {}
```

## Methods

### alt

```ts
(fx: Identity<A>): Identity<A>
```

### ap

```ts
<B>(fab: Identity<(a: A) => B>): Identity<B>
```

### ap_

```ts
<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C>
```

### chain

```ts
<B>(f: (a: A) => Identity<B>): Identity<B>
```

### extend

```ts
<B>(f: (ea: Identity<A>) => B): Identity<B>
```

### extract

```ts
(): A
```

### fold

```ts
<B>(f: (a: A) => B): B
```

### inspect

```ts
(): string
```

### map

```ts
<B>(f: (a: A) => B): Identity<B>
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
<F>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Identity<B>>
```

# identity

_instance_

```ts
Monad<URI> & Foldable<URI> & Traversable<URI> & Alt<URI> & Comonad<URI> & ChainRec<URI>
```

# alt

_function_

```ts
<A>(fx: Identity<A>, fy: Identity<A>): Identity<A>
```

# ap

_function_

```ts
<A, B>(fab: Identity<(a: A) => B>, fa: Identity<A>): Identity<B>
```

# chain

_function_

```ts
<A, B>(f: (a: A) => Identity<B>, fa: Identity<A>): Identity<B>
```

# chainRec

_function_

```ts
<A, B>(f: (a: A) => Identity<Either<A, B>>, a: A): Identity<B>
```

# extend

_function_

```ts
<A, B>(f: (ea: Identity<A>) => B, ea: Identity<A>): Identity<B>
```

# extract

_function_

```ts
<A>(fa: Identity<A>): A
```

# getSetoid

_function_

```ts
<A>(setoid: Setoid<A>): Setoid<Identity<A>>
```

# map

_function_

```ts
<A, B>(f: (a: A) => B, fa: Identity<A>): Identity<B>
```

# of

_function_

```ts
<A>(a: A): Identity<A>
```

# reduce

_function_

```ts
<A, B>(f: (b: B, a: A) => B, b: B, fa: Identity<A>): B
```

# traverse

_function_

```ts
traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Identity<A>) => HKT<F, Identity<B>>
```
