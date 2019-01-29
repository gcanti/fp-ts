---
id: function
title: Module function
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts)

## unsafeCoerce

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L15-L15)

```ts
export const unsafeCoerce: <A, B>(a: A) => B = ...
```

Added in v1.0.0

## and

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L71-L73)

```ts
export const and = <A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> => { ... }
```

Added in v1.0.0

## apply

Applies a function to an argument ($)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L368-L370)

```ts
export const apply = <A, B>(f: (a: A) => B) => (a: A): B => { ... }
```

Added in v1.0.0

## applyFlipped

Applies an argument to a function (#)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L377-L379)

```ts
export const applyFlipped = <A>(a: A) => <B>(f: (a: A) => B): B => { ... }
```

Added in v1.0.0

## compose

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L196-L205)

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

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L104-L106)

```ts
export const constFalse = (): boolean => { ... }
```

Added in v1.0.0

## constIdentity

A thunk that returns always the `identity` function.
For use with `applySecond` methods.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L390-L392)

```ts
export const constIdentity = (): (<A>(a: A) => A) => { ... }
```

Added in v1.5.0

## constNull

A thunk that returns always `null`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L113-L115)

```ts
export const constNull = (): null => { ... }
```

Added in v1.0.0

## constTrue

A thunk that returns always `true`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L95-L97)

```ts
export const constTrue = (): boolean => { ... }
```

Added in v1.0.0

## constUndefined

A thunk that returns always `undefined`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L122-L124)

```ts
export const constUndefined = (): undefined => { ... }
```

Added in v1.0.0

## constant

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L86-L88)

```ts
export const constant = <A>(a: A): Lazy<A> => { ... }
```

Added in v1.0.0

## curry

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L310-L312)

```ts
export function curry(f: Function)  { ... }
```

Added in v1.0.0

## decrement

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L406-L408)

```ts
export const decrement = (n: number): number => { ... }
```

Added in v1.9.0

## flip

Flips the order of the arguments to a function of two arguments.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L131-L133)

```ts
export const flip = <A, B, C>(f: Curried2<A, B, C>): Curried2<B, A, C> => { ... }
```

Added in v1.0.0

## identity

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L7-L9)

```ts
export const identity = <A>(a: A): A => { ... }
```

Added in v1.0.0

## increment

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L398-L400)

```ts
export const increment = (n: number): number => { ... }
```

Added in v1.9.0

## not

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L53-L55)

```ts
export const not = <A>(predicate: Predicate<A>): Predicate<A> => { ... }
```

Added in v1.0.0

## on

The `on` function is used to change the domain of a binary operator.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L140-L142)

```ts
export const on = <B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B): BinaryOperation<A, C> => { ... }
```

Added in v1.0.0

## or

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L63-L65)

```ts
export function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>  { ... }
```

Added in v1.0.0

## pipe

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L259-L268)

```ts
export function pipe(...fns: Array<Function>): Function  { ... }
```

Added in v1.0.0

## toString

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L321-L345)

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

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/function.ts#L359-L361)

```ts
export const tupleCurried = <A>(a: A) => <B>(b: B): [A, B] => { ... }
```

Added in v1.0.0
