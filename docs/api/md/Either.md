MODULE [Either](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts)
# URI
```ts
type URI = 'Either'
```
# Either

```ts
type Either<L, A> = Left<L, A> | Right<L, A>
```
## Instances

### Alt
### Bifunctor
### ChainRec
### Extend
### Filterable
```ts
getFilterable = <M>(M: Monoid<M>): Filterable<URI>
```
### Foldable
### Monad
### Setoid
```ts
getSetoid = <L, A>(S: Setoid<A>): Setoid<Either<L, A>>
```
### Traversable
### Witherable
```ts
getWitherable = <M>(monoid: Monoid<M>): Witherable<URI>
```
## Methods

### alt
```ts
fy: Either<L, A>): Either<L, A>
```
### ap
```ts
<B>(fab: Either<L, (a: A) => B>): Either<L, B>
```
### ap_
```ts
<B, C>(this: Either<L, (a: B) => C>, fb: Either<L, B>): Either<L, C>
```
### bimap
```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B>
```
### chain
```ts
<B>(f: (a: A) => Either<L, B>): Either<L, B>
```
### equals
```ts
(S: Setoid<A>): (fy: Either<L, A>) => boolean
```
### extend
```ts
<B>(f: (ea: Either<L, A>) => B): Either<L, B>
```
### fold
```ts
<B>(left: (l: L) => B, right: (a: A) => B): B
```
### getOrElse
```ts
(f: Lazy<A>): A
```
### map
```ts
<B>(f: (a: A) => B): Either<L, B>
```
### mapLeft
```ts
<M>(f: (l: L) => M): Either<M, A>
```
### reduce
```ts
<B>(f: (b: B, a: A) => B, b: B): B
```
### toOption
```ts
(): Option<A>
```
### traverse
```ts
<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>>
```
# fold
```ts
<L, A, B>(left: (l: L) => B, right: (a: A) => B, fa: Either<L, A>): B
```
# fromOption
```ts
<L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A>
```
Takes a default and a `Option` value, if the value is a `Some`, turn it into a `Right`, if the value is a `None` use the provided default as a `Left`
# fromPredicate
```ts
<L, A>(predicate: Predicate<A>, l: (a: A) => L) => (a: A): Either<L, A>
```
# getOrElse
```ts
<A>(f: () => A) => <L>(fa: Either<L, A>): A
```
# isLeft
```ts
<L, A>(fa: Either<L, A>): fa is Left<L, A>
```
# isRight
```ts
<L, A>(fa: Either<L, A>): fa is Right<L, A>
```
# left
```ts
<L, A>(l: L): Either<L, A>
```
# mapLeft
```ts
<L, M>(f: (l: L) => M) => <A>(fa: Either<L, A>): Either<M, A>
```
# right
```ts
<L, A>(a: A): Either<L, A>
```
# toOption
```ts
<L, A>(fa: Either<L, A>): Option<A>
```
# tryCatch
```ts
<A>(f: Lazy<A>): Either<Error, A>
```