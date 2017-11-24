MODULE [Const](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts)

# Const

_data_

```ts
constructor(readonly value: L) {}
```

## Methods

### contramap

```ts
<B, C>(f: (c: C) => B): Const<L, C>
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
<B, C>(f: (b: B) => C): Const<L, C>
```

### toString

```ts
(): string
```

# const_

_instance_

```ts
Functor<URI> & Contravariant<URI>
```

# ap

_function_

```ts
<L>(S: Semigroup<L>) => <A, B>(fab: Const<L, (a: A) => B>, fa: Const<L, A>): Const<L, B>
```

# contramap

_function_

```ts
<L, A, B>(f: (b: B) => A, fa: Const<L, A>): Const<L, B>
```

# getApplicative

_function_

```ts
<L>(M: Monoid<L>): Applicative<URI>
```

# getApply

_function_

```ts
<L>(S: Semigroup<L>): Apply<URI>
```

# getSetoid

_function_

```ts
;<L, A>(S: Setoid<L>): Setoid<Const<L, A>> => ({
  equals: x => y => x.fold(ax => y.fold(ay => S.equals(ax)(ay)))
})
```

# map

_function_

```ts
<L, A, B>(f: (a: A) => B, fa: Const<L, A>): Const<L, B>
```

# of

_function_

```ts
<L>(M: Monoid<L>) => <A>(b: A): Const<L, A>
```
