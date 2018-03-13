MODULE [Const](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts)

# Const

_data_

```ts
constructor(readonly value: L) {}
```

## Methods

### contramap

```ts
<B>(f: (b: B) => A): Const<L, B>
```

### fold

```ts
<B>(f: (l: L) => B): B
```

### inspect

```ts
(): string
```

### map

```ts
<B>(f: (a: A) => B): Const<L, B>
```

### toString

```ts
(): string
```

# const\_

_instance_

```ts
Functor2<URI> & Contravariant2<URI>
```

# getApplicative

_function_

```ts
<L>(M: Monoid<L>): Applicative2C<URI, L>
```

# getApply

_function_

```ts
<L>(S: Semigroup<L>): Apply2C<URI, L>
```

# getSetoid

_function_

```ts
;<L, A>(S: Setoid<L>): Setoid<Const<L, A>> => ({
  equals: (x, y) => S.equals(x.value, y.value)
})
```
