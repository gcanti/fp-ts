MODULE [Free](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts)

# Free

_data_

_since 1.0.0_

_Signature_

```ts
type Free<F, A> = Pure<F, A> | Impure<F, A, any>
```

## Methods

### ap

_method_

_since 1.0.0_

_Signature_

```ts
<B>(fab: Free<F, (a: A) => B>): Free<F, B>
```

### ap\_

_method_

_since 1.0.0_

_Signature_

```ts
<B, C>(this: Free<F, (b: B) => C>, fb: Free<F, B>): Free<F, C>
```

### chain

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => Free<F, B>): Free<F, B>
```

### inspect

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

### isImpure

_method_

_since 1.0.0_

_Signature_

```ts
(): this is Impure<F, A, any>
```

### isPure

_method_

_since 1.0.0_

_Signature_

```ts
(): this is Pure<F, A>
```

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): Free<F, B>
```

### toString

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

# foldFree

_function_

_since 1.0.0_

_Signature_

```ts
foldFree<M>(M: Monad<M>): <F, A>(nt: any, fa: Free<F, A>) => HKT<M, A>
```

# hoistFree

_function_

_since 1.0.0_

_Signature_

```ts
hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>)
```

_Description_

Use a natural transformation to change the generating type constructor of a free monad

# liftF

_function_

_since 1.0.0_

_Signature_

```ts
<F, A>(fa: HKT<F, A>): Free<F, A>
```

_Description_

Lift an impure value described by the generating type constructor `F` into the free monad

# of

_function_

_since 1.0.0_

_Signature_

```ts
<F, A>(a: A): Free<F, A>
```
