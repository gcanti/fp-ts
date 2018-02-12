MODULE [Const](https://github.com/gcanti/fp-ts/blob/master/src/Const.ts)
# Const
*data*
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
# const_
*instance*
```ts
Functor2<URI> & Contravariant2<URI>
```
# getApplicative
*function*
```ts
<L>(M: Monoid<L>): Applicative2C<URI, L>
```

# getApply
*function*
```ts
<L>(S: Semigroup<L>): Apply2C<URI, L>
```

# getSetoid
*function*
```ts
<L, A>(S: Setoid<L>): Setoid<Const<L, A>> => ({
  equals: (x, y) => x.fold(ax => y.fold(ay => S.equals(ax, ay)))
})
```