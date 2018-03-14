MODULE [Identity](https://github.com/gcanti/fp-ts/blob/master/src/Identity.ts)

# Identity

_data_
_since 1.0.0_

```ts
constructor(readonly value: A) {}
```

## Methods

### alt

_method_
_since 1.0.0_

```ts
(fx: Identity<A>): Identity<A>
```

### ap

_method_
_since 1.0.0_

```ts
<B>(fab: Identity<(a: A) => B>): Identity<B>
```

### ap\_

_method_
_since 1.0.0_

```ts
<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C>
```

### chain

_method_
_since 1.0.0_

```ts
<B>(f: (a: A) => Identity<B>): Identity<B>
```

### extend

_method_
_since 1.0.0_

```ts
<B>(f: (ea: Identity<A>) => B): Identity<B>
```

### extract

_method_
_since 1.0.0_

```ts
(): A
```

### fold

_method_
_since 1.0.0_

```ts
<B>(f: (a: A) => B): B
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
<B>(f: (a: A) => B): Identity<B>
```

### reduce

_method_
_since 1.0.0_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### toString

_method_
_since 1.0.0_

```ts
(): string
```

# identity

_instance_
_since 1.0.0_

```ts
Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI>
```

# getSetoid

_function_
_since 1.0.0_

```ts
<A>(setoid: Setoid<A>): Setoid<Identity<A>>
```
