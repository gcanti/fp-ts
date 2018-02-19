MODULE [Option](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts)

# Option

_data_

```ts
type Option<A> = None<A> | Some<A>
```

Represents optional values. Instances of `Option` are either an instance of `Some` or `None`

The most idiomatic way to use an `Option` instance is to treat it as a collection or monad and use `map`, `flatMap` or
`filter`.

## Methods

### alt

```ts
(fa: Option<A>): Option<A>
```

`alt` short for alternative, takes another `Option`. If this `Option` is a `Some` type then it will be returned, if it
is a `None` then it will return the next `Some` if it exist. If both are `None` then it will return `none`.

For example `const someFn = (o: Option<number>) => o.alt(some(4))`

`someFn(some(2))` will return `some(2)`.

`someFn(none)` will return `some(4)`.

### ap

```ts
<B>(fab: Option<(a: A) => B>): Option<B>
```

### ap_

```ts
<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C>
```

### chain

```ts
<B>(f: (a: A) => Option<B>): Option<B>
```

Returns the result of applying f to this `Option`'s value if this `Option` is nonempty. Returns `None` if this `Option`
is empty. Slightly different from `map` in that `f` is expected to return an `Option` (which could be `None`)

### contains

```ts
(S: Setoid<A>, a: A): boolean
```

Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise

### exists

```ts
(p: (a: A) => boolean): boolean
```

Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value

### extend

```ts
<B>(f: (ea: Option<A>) => B): Option<B>
```

### filter

```ts
(p: Predicate<A>): Option<A>
```

Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value.
Otherwise returns `None`

### fold

```ts
<B>(b: B, some: (a: A) => B): B
```

Applies a function to each case in the data structure

### foldL

```ts
<B>(none: () => B, some: (a: A) => B): B
```

Lazy verion of `fold`

### getOrElse

```ts
(a: A): A
```

Returns the value from this `Some` or the given argument if this is a `None`

### getOrElseL

```ts
(f: () => A): A
```

Lazy version of `getOrElse`

### inspect

```ts
(): string
```

### isNone

```ts
(): this is None<A>
```

Returns `true` if the option is `None`, `false` otherwise

### isSome

```ts
(): this is Some<A>
```

Returns `true` if the option is an instance of `Some`, `false` otherwise

### map

```ts
<B>(f: (a: A) => B): Option<B>
```

Takes a function `f` and an `Option` of `A`. Maps `f` either on `None` or `Some`, Option's data constructors. If it maps
on `Some` then it will apply the `f` on `Some`'s value, if it maps on `None` it will return `None`.

### mapNullable

```ts
<B>(f: (a: A) => B | null | undefined): Option<B>
```

Maps `f` over this Option's value. If the value returned from `f` is null or undefined, returns `None`

### reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### toNullable

```ts
(): A | null
```

Returns the value from this `Some` or `null` if this is a `None`

### toString

```ts
(): string
```

### toUndefined

```ts
(): A | undefined
```

Returns the value from this `Some` or `undefined` if this is a `None`

# option

_instance_

```ts
Monad1<URI> &
  Foldable1<URI> &
  Plus1<URI> &
  Traversable1<URI> &
  Alternative1<URI> &
  Extend1<URI>
```

# fromEither

_function_

```ts
<L, A>(fa: Either<L, A>): Option<A>
```

# fromNullable

_function_

```ts
<A>(a: A | null | undefined): Option<A>
```

Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise returns
the value wrapped in a `Some`

# fromPredicate

_function_

```ts
<A>(predicate: Predicate<A>) => (a: A): Option<A>
```

# getFirstMonoid

_function_

```ts
<A = never>(): Monoid<Option<A>>
```

Option monoid returning the left-most non-None value

# getLastMonoid

_function_

```ts
<A = never>(): Monoid<Option<A>>
```

Option monoid returning the right-most non-None value

# getMonoid

_function_

```ts
<A>(S: Semigroup<A>): Monoid<Option<A>>
```

# getSetoid

_function_

```ts
<A>(S: Setoid<A>): Setoid<Option<A>>
```

# isNone

_function_

```ts
<A>(fa: Option<A>): fa is None<A>
```

Returns `true` if the option is `None`, `false` otherwise

# isSome

_function_

```ts
<A>(fa: Option<A>): fa is Some<A>
```

Returns `true` if the option is an instance of `Some`, `false` otherwise

# some

_function_ Alias of

```ts
of
```

# tryCatch

_function_

```ts
<A>(f: Lazy<A>): Option<A>
```
