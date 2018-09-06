---
id: function
title: Module function
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts)

## Constants

### unsafeCoerce

_constant_

_since 1.0.0_

_Signature_

```ts
unsafeCoerce: <A, B>(a: A) => B
```

## Functions

### and

_function_

_since 1.0.0_

_Signature_

```ts
<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>
```

### apply

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(f: (a: A) => B) => (a: A): B
```

_Description_

Applies a function to an argument ($)

### applyFlipped

_function_

_since 1.0.0_

_Signature_

```ts
<A>(a: A) => <B>(f: (a: A) => B): B
```

_Description_

Applies an argument to a function (#)

### compose

_function_

_since 1.0.0_

_Signature_

```ts
compose(...fns: Array<Function>): Function
```

### concat

_function_

_since 1.0.0_

_Signature_

```ts
<A>(x: Array<A>, y: Array<A>): Array<A>
```

### constFalse

_function_

_since 1.0.0_

_Signature_

```ts
(): boolean
```

_Description_

A thunk that returns always `false`

### constIdentity

_function_

_since 1.5.0_

_Signature_

```ts
(): (<A>(a: A) => A)
```

_Description_

A thunk that returns always the `identity` function.
For use with `applySecond` methods.

### constNull

_function_

_since 1.0.0_

_Signature_

```ts
(): null
```

_Description_

A thunk that returns always `null`

### constTrue

_function_

_since 1.0.0_

_Signature_

```ts
(): boolean
```

_Description_

A thunk that returns always `true`

### constUndefined

_function_

_since 1.0.0_

_Signature_

```ts
(): undefined
```

_Description_

A thunk that returns always `undefined`

### constant

_function_

_since 1.0.0_

_Signature_

```ts
<A>(a: A): Lazy<A>
```

### curry

_function_

_since 1.0.0_

_Signature_

```ts
curry(f: Function)
```

### decrement

_function_

_since 1.9.0_

_Signature_

```ts
(n: number): number
```

### flip

_function_

_since 1.0.0_

_Signature_

```ts
<A, B, C>(f: Curried2<A, B, C>): Curried2<B, A, C>
```

_Description_

Flips the order of the arguments to a function of two arguments.

### identity

_function_

_since 1.0.0_

_Signature_

```ts
<A>(a: A): A
```

### increment

_function_

_since 1.9.0_

_Signature_

```ts
(n: number): number
```

### not

_function_

_since 1.0.0_

_Signature_

```ts
<A>(predicate: Predicate<A>): Predicate<A>
```

### on

_function_

_since 1.0.0_

_Signature_

```ts
<B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B): BinaryOperation<A, C>
```

_Description_

The `on` function is used to change the domain of a binary operator.

### or

_function_

_since 1.0.0_

_Signature_

```ts
or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>
```

### pipe

_function_

_since 1.0.0_

_Signature_

```ts
pipe(...fns: Array<Function>): Function
```

### toString

_function_

_since 1.0.0_

_Signature_

```ts
(x: any): string
```

### tuple

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(a: A, b: B): [A, B]
```

### tupleCurried

_function_

_since 1.0.0_

_Signature_

```ts
<A>(a: A) => <B>(b: B): [A, B]
```
