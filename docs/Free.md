---
id: Free
title: Module Free
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts)

# Free

```ts
type Free<F, A> = Pure<F, A> | Impure<F, A, any>
```

Added in v1.0.0 (data)

## ap

```ts
<B>(fab: Free<F, (a: A) => B>): Free<F, B>
```

Added in v1.0.0 (method)

## ap\_

```ts
<B, C>(this: Free<F, (b: B) => C>, fb: Free<F, B>): Free<F, C>
```

Added in v1.0.0 (method)

Flipped version of [ap](#ap)

## chain

```ts
<B>(f: (a: A) => Free<F, B>): Free<F, B>
```

Added in v1.0.0 (method)

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

## isImpure

```ts
(): this is Impure<F, A, any>
```

Added in v1.0.0 (method)

## isPure

```ts
(): this is Pure<F, A>
```

Added in v1.0.0 (method)

## map

```ts
<B>(f: (a: A) => B): Free<F, B>
```

Added in v1.0.0 (method)

## toString

```ts
(): string
```

Added in v1.0.0 (method)

## foldFree

```ts
foldFree<M>(M: Monad<M>): <F, A>(nt: any, fa: Free<F, A>) => HKT<M, A>
```

Added in v1.0.0 (function)

## hoistFree

```ts
hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>)
```

Added in v1.0.0 (function)

Use a natural transformation to change the generating type constructor of a free monad

## liftF

```ts
<F, A>(fa: HKT<F, A>): Free<F, A>
```

Added in v1.0.0 (function)

Lift an impure value described by the generating type constructor `F` into the free monad

## of

```ts
<F, A>(a: A): Free<F, A>
```

Added in v1.0.0 (function)
