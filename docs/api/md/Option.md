MODULE [Option](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts)
# URI
```ts
type URI = 'Option'
```
# Option

```ts
type Option<A> = None<A> | Some<A>
```
The `Option` type is used to represent optional values and can be seen as something like a type-safe `null`, where `None` is `null` and `Some(x)` is the non-null value `x`.
## Instances

### Alternative
### Extend
### Filterable
### Foldable
### Monad
### Monoid
```ts
getMonoid = <A>(S: Semigroup<A>): Monoid<Option<A>>
```
### Monoid
```ts
getFirstMonoid = <A>(): Monoid<Option<A>>
```
Option monoid returning the left-most non-None value
### Monoid
```ts
getLastMonoid = <A>(): Monoid<Option<A>>
```
Option monoid returning the right-most non-None value
### Plus
### Semigroup
```ts
getSemigroup = <A>(S: Semigroup<A>): Semigroup<Option<A>>
```
### Setoid
```ts
getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>>
```
### Traversable
### Witherable
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
<B, C>(this: Option<(a: B) => C>, fb: Option<B>): Option<C>
```
### chain
```ts
<B>(f: (a: A) => Option<B>): Option<B>
```
### concat
```ts
(S: Semigroup<A>): (fy: Option<A>) => Option<A>
```
### contains
```ts
(setoid: Setoid<A>, a: A): boolean
```
Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise
### equals
```ts
(S: Setoid<A>): (fy: Option<A>) => boolean
```
### exists
```ts
(p: (a: A) => boolean): boolean
```
Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value
### extend
```ts
<B>(f: (ea: Option<A>) => B): Option<B>
```
### fold
```ts
<B>(n: Lazy<B>, s: (a: A) => B): B
```
### getOrElse
```ts
(f: Lazy<A>): A
```
### getOrElseValue
```ts
(value: A): A
```
### isNone
```ts
(): boolean
```
Returns `true` if the option is `None`, false otherwise
### isSome
```ts
(): boolean
```
Returns `true` if the option is an instance of `Some`, `false` otherwise
### map
```ts
<B>(f: (a: A) => B): Option<B>
```
### partitionMap
```ts
<L, R>(f: (a: A) => Either<L, R>): { left: Option<L>; right: Option<R> }
```
### reduce
```ts
<B>(f: (b: B, a: A) => B, b: B): B
```
### toNullable
```ts
(): A | null
```
### toUndefined
```ts
(): A | undefined
```
### traverse
```ts
<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Option<B>>
```
### wilt
```ts
<M>(M: Applicative<M>): <L, R>(f: (a: A) => HKT<M, Either<L, R>>) => HKT<M, { left: Option<L>; right: Option<R> }>
```
# fold
```ts
<A, B>(n: Lazy<B>, s: (a: A) => B, fa: Option<A>): B
```
# fromNullable
```ts
<A>(a: A | null | undefined): Option<A>
```
# fromOption
```ts
<A>(a: A) => (fa: Option<A>): A
```
Takes a default value, and a `Option` value. If the `Option` value is `None` the default value is returned, otherwise the value inside the `Some` is returned
# fromPredicate
```ts
<A>(predicate: Predicate<A>) => (a: A): Option<A>
```
# getOrElseValue
```ts
<A>(value: A) => <L>(fa: Either<L, A>): A
```
# isNone
```ts
<A>(fa: Option<A>): fa is None<A>
```
# isSome
```ts
<A>(fa: Option<A>): fa is Some<A>
```
# toNullable
```ts
<A>(fa: Option<A>): A | null
```
# toUndefined
```ts
<A>(fa: Option<A>): A | undefined
```
# traverse
```ts
<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Option<A>) => HKT<F, Option<B>>
```