MODULE [function](https://github.com/gcanti/fp-ts/blob/master/src/function.ts)

# and

_function_

_since 1.0.0_

```ts
<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>
```

# apply

_function_

_since 1.0.0_

```ts
<A, B>(f: (a: A) => B) => (a: A): B
```

Applies a function to an argument ($)

# applyFlipped

_function_

_since 1.0.0_

```ts
<A>(a: A) => <B>(f: (a: A) => B): B
```

Applies an argument to a function (#)

# compose

_function_

_since 1.0.0_

```ts
compose(...fns: Array<Function>): Function
```

# concat

_function_

_since 1.0.0_

```ts
<A>(x: Array<A>, y: Array<A>): Array<A>
```

# constFalse

_function_

_since 1.0.0_

```ts
(): boolean
```

A thunk that returns always `false`

# constNull

_function_

_since 1.0.0_

```ts
(): null
```

A thunk that returns always `null`

# constTrue

_function_

_since 1.0.0_

```ts
(): boolean
```

A thunk that returns always `true`

# constUndefined

_function_

_since 1.0.0_

```ts
(): undefined
```

A thunk that returns always `undefined`

# constant

_function_

_since 1.0.0_

```ts
<A>(a: A): Lazy<A>
```

# curry

_function_

_since 1.0.0_

```ts
curry(f: Function)
```

# flip

_function_

_since 1.0.0_

```ts
<A, B, C>(f: Curried2<A, B, C>): Curried2<B, A, C>
```

Flips the order of the arguments to a function of two arguments.

# identity

_function_

_since 1.0.0_

```ts
<A>(a: A): A
```

# not

_function_

_since 1.0.0_

```ts
<A>(predicate: Predicate<A>): Predicate<A>
```

# on

_function_

_since 1.0.0_

```ts
<B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B): BinaryOperation<A, C>
```

The `on` function is used to change the domain of a binary operator.

# or

_function_

_since 1.0.0_

```ts
or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>
```

# pipe

_function_

_since 1.0.0_

```ts
pipe(...fns: Array<Function>): Function
```

# toString

_function_

_since 1.0.0_

```ts
(x: any): string
```

# tuple

_function_

_since 1.0.0_

```ts
<A, B>(a: A, b: B): [A, B]
```

# tupleCurried

_function_

_since 1.0.0_

```ts
<A>(a: A) => <B>(b: B): [A, B]
```

# unsafeCoerce

_function_

_since 1.0.0_

```ts
;<A, B>(a: A): B => a as any
```
