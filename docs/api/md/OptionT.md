MODULE [OptionT](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts)

# chain

_function_

```ts
chain<F>(F: Monad<F>): OptionT<F>['chain']
```

# fold

_function_

```ts
fold<F>(F: Functor<F>): <R, A>(r: R, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>
```

# fromOption

_function_

```ts
fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>
```

# getOptionT

_function_

```ts
getOptionT<M>(M: Monad<M>): OptionT<M>
```

# getOrElse

_function_

```ts
getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A>
```

# liftF

_function_

```ts
liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>
```

# none

_function_

```ts
none<F>(F: Applicative<F>): () => HKT<F, Option<never>>
```

# some

_function_

```ts
some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>
```
