MODULE [Option](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts)

# Option

_data_

```ts
type Option<A> = None<A> | Some<A>
```

## Methods

### alt

```ts
(fa: Option<A>): Option<A>
```

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
<B>(n: Lazy<B>, s: (a: A) => B): B
```

Applies a function to each case in the data structure

### getOrElse

```ts
(f: Lazy<A>): A
```

### getOrElseValue

```ts
(a: A): A
```

### inspect

```ts
(): string
```

### isNone

```ts
(): boolean
```

Returns `true` if the option is `None`, `false` otherwise

### isSome

```ts
(): boolean
```

Returns `true` if the option is an instance of `Some`, `false` otherwise

### map

```ts
<B>(f: (a: A) => B): Option<B>
```

### mapNullable

```ts
<B>(f: (a: A) => B | null | undefined): Option<B>
```

Maps `f` over this Option's value. If the value returned from `f` is null or undefined, returns `None`

### reduce

```ts
<B>(f: (b: B, a: A) => B, b: B): B
```

### toNullable

```ts
(): A | null
```

### toString

```ts
(): string
```

### toUndefined

```ts
(): A | undefined
```

### traverse

```ts
<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Option<B>>
```

# option

_instance_

```ts
Monad<URI> & Foldable<URI> & Plus<URI> & Traversable<URI> & Alternative<URI> & Extend<URI>
```

# alt

_function_

```ts
<A>(fx: Option<A>, fy: Option<A>): Option<A>
```

# ap

_function_

```ts
<A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B>
```

# chain

_function_

```ts
<A, B>(f: (a: A) => Option<B>, fa: Option<A>): Option<B>
```

# empty

_function_ Alias of

```ts
zero
```

# extend

_function_

```ts
<A, B>(f: (ea: Option<A>) => B, ea: Option<A>): Option<B>
```

# filter

_function_

```ts
<A>(p: Predicate<A>) => (fa: Option<A>): Option<A>
```

Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value.
Otherwise returns none

# fold

_function_

```ts
<A, B>(n: Lazy<B>, s: (a: A) => B) => (fa: Option<A>): B
```

Applies a function to each case in the data structure

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
<A>(): Monoid<Option<A>>
```

Option monoid returning the left-most non-None value

# getLastMonoid

_function_

```ts
<A>(): Monoid<Option<A>>
```

Option monoid returning the right-most non-None value

# getMonoid

_function_

```ts
<A>(S: Semigroup<A>): Monoid<Option<A>>
```

# getOrElse

_function_

```ts
<A>(f: Lazy<A>) => (fa: Option<A>): A
```

# getOrElseValue

_function_

```ts
<A>(a: A) => (fa: Option<A>): A
```

Takes a default value, and a `Option` value. If the `Option` value is `None` the default value is returned, otherwise
the value inside the `Some` is returned

# getSemigroup

_function_

```ts
<A>(S: Semigroup<A>): Semigroup<Option<A>>
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

# map

_function_

```ts
<A, B>(f: (a: A) => B, fa: Option<A>): Option<B>
```

# mapNullable

_function_

```ts
<A, B>(f: (a: A) => B | null | undefined, fa: Option<A>): Option<B>
```

Maps `f` over this Option's value. If the value returned from `f` is null or undefined, returns `None`

# of

_function_

```ts
<A>(a: A): Option<A>
```

# reduce

_function_

```ts
<A, B>(f: (b: B, a: A) => B, b: B, fa: Option<A>): B
```

# some

_function_ Alias of

```ts
of
```

# toNullable

_function_

```ts
<A>(fa: Option<A>): A | null
```

# toUndefined

_function_

```ts
<A>(fa: Option<A>): A | undefined
```

# traverse

_function_

```ts
traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Option<A>) => HKT<F, Option<B>>
```

# zero

_function_

```ts
<A>(): Option<A>
```
