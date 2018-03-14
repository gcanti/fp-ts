MODULE [Const](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts)

# Const

_data_
_since 1.0.0_

```ts
constructor(readonly value: L) {}
```

## Methods

### contramap

_method_
_since 1.0.0_

```ts
<B>(f: (b: B) => A): Const<L, B>
```

### fold

_method_
_since 1.0.0_

```ts
<B>(f: (l: L) => B): B
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
<B>(f: (a: A) => B): Const<L, B>
```

### toString

_method_
_since 1.0.0_

```ts
(): string
```

# const\_

_instance_
_since 1.0.0_

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
