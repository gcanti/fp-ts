MODULE [Const](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts)
# Const
*data*
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
*instance*
```ts
Functor<URI> & Contravariant<URI>
```
# ap
*function*
```ts
<L>(S: Semigroup<L>) => <A, B>(fab: Const<L, (a: A) => B>, fa: Const<L, A>): Const<L, B>
```

# contramap
*function*
```ts
<L, A, B>(f: (b: B) => A, fa: Const<L, A>): Const<L, B>
```

# getApplicative
*function*
```ts
<L>(M: Monoid<L>): Applicative<URI>
```

# getApply
*function*
```ts
<L>(S: Semigroup<L>): Apply<URI>
```

# getSetoid
*function*
```ts
<L, A>(S: Setoid<L>): Setoid<Const<L, A>> => ({
  equals: x => y => x.fold(ax => y.fold(ay => S.equals(ax)(ay)))
})
```

# map
*function*
```ts
<L, A, B>(f: (a: A) => B, fa: Const<L, A>): Const<L, B>
```

# of
*function*
```ts
<L>(M: Monoid<L>) => <A>(b: A): Const<L, A>
```