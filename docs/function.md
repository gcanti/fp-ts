---
id: function
title: Module function
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts)

## unsafeCoerce

```ts
const unsafeCoerce: <A, B>(a: A) => B
```

Added in v1.0.0 (constant)

## and

```ts
<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>
```

Added in v1.0.0 (function)

## apply

```ts
<A, B>(f: (a: A) => B) => (a: A): B
```

Added in v1.0.0 (function)

Applies a function to an argument ($)

## applyFlipped

```ts
<A>(a: A) => <B>(f: (a: A) => B): B
```

Added in v1.0.0 (function)

Applies an argument to a function (#)

## compose

```ts
compose(...fns: Array<Function>): Function
```

Added in v1.0.0 (function)

## concat

```ts
<A>(x: Array<A>, y: Array<A>): Array<A>
```

Added in v1.0.0 (function)

## constFalse

```ts
(): boolean
```

Added in v1.0.0 (function)

A thunk that returns always `false`

## constIdentity

```ts
(): (<A>(a: A) => A)
```

Added in v1.5.0 (function)

A thunk that returns always the `identity` function.
For use with `applySecond` methods.

## constNull

```ts
(): null
```

Added in v1.0.0 (function)

A thunk that returns always `null`

## constTrue

```ts
(): boolean
```

Added in v1.0.0 (function)

A thunk that returns always `true`

## constUndefined

```ts
(): undefined
```

Added in v1.0.0 (function)

A thunk that returns always `undefined`

## constant

```ts
<A>(a: A): Lazy<A>
```

Added in v1.0.0 (function)

## curry

```ts
curry(f: Function)
```

Added in v1.0.0 (function)

## decrement

```ts
(n: number): number
```

Added in v1.9.0 (function)

## flip

```ts
<A, B, C>(f: Curried2<A, B, C>): Curried2<B, A, C>
```

Added in v1.0.0 (function)

Flips the order of the arguments to a function of two arguments.

## identity

```ts
<A>(a: A): A
```

Added in v1.0.0 (function)

## increment

```ts
(n: number): number
```

Added in v1.9.0 (function)

## not

```ts
<A>(predicate: Predicate<A>): Predicate<A>
```

Added in v1.0.0 (function)

## on

```ts
<B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B): BinaryOperation<A, C>
```

Added in v1.0.0 (function)

The `on` function is used to change the domain of a binary operator.

## or

```ts
or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>
```

Added in v1.0.0 (function)

## pipe

```ts
pipe(...fns: Array<Function>): Function
```

Added in v1.0.0 (function)

## toString

```ts
(x: any): string
```

Added in v1.0.0 (function)

## tuple

```ts
<A, B>(a: A, b: B): [A, B]
```

Added in v1.0.0 (function)

## tupleCurried

```ts
<A>(a: A) => <B>(b: B): [A, B]
```

Added in v1.0.0 (function)
