---
id: function
title: function
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts)

## phantom

For use with phantom fields

**Signature** (constant)

```ts
export const phantom: any = ...
```

Added in v1.0.0

## unsafeCoerce

**Signature** (constant)

```ts
export const unsafeCoerce: <A, B>(a: A) => B = ...
```

Added in v1.0.0

## and

**Signature** (function)

```ts
export const and = <A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> => { ... }
```

Added in v1.0.0

## apply

Applies a function to an argument ($)

**Signature** (function)

```ts
export const apply = <A, B>(f: (a: A) => B) => (a: A): B => { ... }
```

Added in v1.0.0

## applyFlipped

Applies an argument to a function (#)

**Signature** (function)

```ts
export const applyFlipped = <A>(a: A) => <B>(f: (a: A) => B): B => { ... }
```

Added in v1.0.0

## compose

**Signature** (function)

```ts
export function compose(...fns: Array<Function>): Function  { ... }
```

Added in v1.0.0

## concat

**Signature** (function)

```ts
export const concat = <A>(x: Array<A>, y: Array<A>): Array<A> => { ... }
```

Added in v1.0.0

## constFalse

A thunk that returns always `false`

**Signature** (function)

```ts
export const constFalse = (): boolean => { ... }
```

Added in v1.0.0

## constIdentity

A thunk that returns always the `identity` function.
For use with `applySecond` methods.

**Signature** (function)

```ts
export const constIdentity = (): (<A>(a: A) => A) => { ... }
```

Added in v1.5.0

## constNull

A thunk that returns always `null`

**Signature** (function)

```ts
export const constNull = (): null => { ... }
```

Added in v1.0.0

## constTrue

A thunk that returns always `true`

**Signature** (function)

```ts
export const constTrue = (): boolean => { ... }
```

Added in v1.0.0

## constUndefined

A thunk that returns always `undefined`

**Signature** (function)

```ts
export const constUndefined = (): undefined => { ... }
```

Added in v1.0.0

## constVoid

A thunk that returns always `void`

**Signature** (function)

```ts
export const constVoid = (): void => { ... }
```

Added in v1.14.0

## constant

**Signature** (function)

```ts
export const constant = <A>(a: A): Lazy<A> => { ... }
```

Added in v1.0.0

## curried

**Signature** (function)

```ts
export function curried(f: Function, n: number, acc: Array<any>)  { ... }
```

Added in v1.0.0

## curry

**Signature** (function)

```ts
export function curry(f: Function)  { ... }
```

Added in v1.0.0

## decrement

**Signature** (function)

```ts
export const decrement = (n: number): number => { ... }
```

Added in v1.9.0

## flip

Flips the order of the arguments to a function of two arguments.

**Signature** (function)

```ts
export const flip = <A, B, C>(f: Curried2<A, B, C>): Curried2<B, A, C> => { ... }
```

Added in v1.0.0

## identity

**Signature** (function)

```ts
export const identity = <A>(a: A): A => { ... }
```

Added in v1.0.0

## increment

**Signature** (function)

```ts
export const increment = (n: number): number => { ... }
```

Added in v1.9.0

## not

**Signature** (function)

```ts
export const not = <A>(predicate: Predicate<A>): Predicate<A> => { ... }
```

Added in v1.0.0

## on

The `on` function is used to change the domain of a binary operator.

**Signature** (function)

```ts
export const on = <B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B): BinaryOperation<A, C> => { ... }
```

Added in v1.0.0

## or

**Signature** (function)

```ts
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>  { ... }
```

Added in v1.0.0

## pipe

**Signature** (function)

```ts
export function pipe(...fns: Array<Function>): Function  { ... }
```

Added in v1.0.0

## toString

**Signature** (function)

```ts
export const toString = (x: any): string => { ... }
```

Added in v1.0.0

## tuple

**Signature** (function)

```ts
export const tuple = <A, B>(a: A, b: B): [A, B] => { ... }
```

Added in v1.0.0

## tupleCurried

**Signature** (function)

```ts
export const tupleCurried = <A>(a: A) => <B>(b: B): [A, B] => { ... }
```

Added in v1.0.0
