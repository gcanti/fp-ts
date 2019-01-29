---
id: function
title: Module function
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts)

## phantom

For use with phantom fields

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L385-L385)

```ts
export const phantom: any = ...
```

Added in v1.0.0

## unsafeCoerce

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L13-L13)

```ts
export const unsafeCoerce: <A, B>(a: A) => B = ...
```

Added in v1.0.0

## and

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L66-L68)

```ts
export const and = <A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> => { ... }
```

Added in v1.0.0

## apply

Applies a function to an argument ($)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L367-L369)

```ts
export const apply = <A, B>(f: (a: A) => B) => (a: A): B => { ... }
```

Added in v1.0.0

## applyFlipped

Applies an argument to a function (#)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L376-L378)

```ts
export const applyFlipped = <A>(a: A) => <B>(f: (a: A) => B): B => { ... }
```

Added in v1.0.0

## compose

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L198-L207)

```ts
export function compose(...fns: Array<Function>): Function  { ... }
```

Added in v1.0.0

## concat

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L274-L285)

```ts
export const concat = <A>(x: Array<A>, y: Array<A>): Array<A> => { ... }
```

Added in v1.0.0

## constFalse

A thunk that returns always `false`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L98-L100)

```ts
export const constFalse = (): boolean => { ... }
```

Added in v1.0.0

## constIdentity

A thunk that returns always the `identity` function.
For use with `applySecond` methods.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L393-L395)

```ts
export const constIdentity = (): (<A>(a: A) => A) => { ... }
```

Added in v1.5.0

## constNull

A thunk that returns always `null`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L107-L109)

```ts
export const constNull = (): null => { ... }
```

Added in v1.0.0

## constTrue

A thunk that returns always `true`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L89-L91)

```ts
export const constTrue = (): boolean => { ... }
```

Added in v1.0.0

## constUndefined

A thunk that returns always `undefined`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L116-L118)

```ts
export const constUndefined = (): undefined => { ... }
```

Added in v1.0.0

## constVoid

A thunk that returns always `void`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L125-L127)

```ts
export const constVoid = (): void => { ... }
```

Added in v1.14.0

## constant

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L80-L82)

```ts
export const constant = <A>(a: A): Lazy<A> => { ... }
```

Added in v1.0.0

## curried

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L290-L295)

```ts
export function curried(f: Function, n: number, acc: Array<any>)  { ... }
```

Added in v1.0.0

## curry

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L312-L314)

```ts
export function curry(f: Function)  { ... }
```

Added in v1.0.0

## decrement

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L407-L409)

```ts
export const decrement = (n: number): number => { ... }
```

Added in v1.9.0

## flip

Flips the order of the arguments to a function of two arguments.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L134-L136)

```ts
export const flip = <A, B, C>(f: Curried2<A, B, C>): Curried2<B, A, C> => { ... }
```

Added in v1.0.0

## identity

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L6-L8)

```ts
export const identity = <A>(a: A): A => { ... }
```

Added in v1.0.0

## increment

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L400-L402)

```ts
export const increment = (n: number): number => { ... }
```

Added in v1.9.0

## not

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L50-L52)

```ts
export const not = <A>(predicate: Predicate<A>): Predicate<A> => { ... }
```

Added in v1.0.0

## on

The `on` function is used to change the domain of a binary operator.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L143-L145)

```ts
export const on = <B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B): BinaryOperation<A, C> => { ... }
```

Added in v1.0.0

## or

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L59-L61)

```ts
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>  { ... }
```

Added in v1.0.0

## pipe

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L260-L269)

```ts
export function pipe(...fns: Array<Function>): Function  { ... }
```

Added in v1.0.0

## toString

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L322-L346)

```ts
export const toString = (x: any): string => { ... }
```

Added in v1.0.0

## tuple

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L351-L353)

```ts
export const tuple = <A, B>(a: A, b: B): [A, B] => { ... }
```

Added in v1.0.0

## tupleCurried

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L358-L360)

```ts
export const tupleCurried = <A>(a: A) => <B>(b: B): [A, B] => { ... }
```

Added in v1.0.0
