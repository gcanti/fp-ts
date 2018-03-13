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

### ap\_

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
<B>(b: B, f: (b: B, a: A) => B): B
```

### toString

```ts
(): string
```

# identity

_instance_

```ts
Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI>
```

# getSetoid

_function_

```ts
<A>(setoid: Setoid<A>): Setoid<Identity<A>>
```
