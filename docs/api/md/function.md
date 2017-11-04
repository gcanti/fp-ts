MODULE [function](https://github.com/gcanti/fp-ts/blob/master/src/function.ts)
# and
*function*
```ts
<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>
```

# apply
*function*
```ts
<A, B>(f: (a: A) => B) => (a: A): B
```
Applies a function to an argument ($)

# applyFlipped
*function*
```ts
<A>(a: A) => <B>(f: (a: A) => B): B
```
Applies an argument to a function (#)

# compose
*function*
```ts
compose(...fns: Array<Function>): Function 
```

# constFalse
*function*
```ts
(): boolean
```
A thunk that returns always `false`

# constNull
*function*
```ts
(): null
```
A thunk that returns always `null`

# constTrue
*function*
```ts
(): boolean
```
A thunk that returns always `true`

# constUndefined
*function*
```ts
(): undefined
```
A thunk that returns always `undefined`

# constant
*function*
```ts
<A>(a: A): Lazy<A>
```

# curry
*function*
```ts
curry(f: Function) 
```

# flip
*function*
```ts
<A, B, C>(f: Curried2<A, B, C>): Curried2<B, A, C>
```
Flips the order of the arguments to a function of two arguments.

# identity
*function*
```ts
<A>(a: A): A
```

# not
*function*
```ts
<A>(predicate: Predicate<A>): Predicate<A>
```

# on
*function*
```ts
<B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B): BinaryOperation<A, C>
```
The `on` function is used to change the domain of a binary operator.

# or
*function*
```ts
or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A> 
```

# pipe
*function*
```ts
pipe(...fns: Array<Function>): Function 
```

# toString
*function*
```ts
(x: any): string
```

# tuple
*function*
```ts
<A, B>(a: A, b: B): [A, B]
```

# tupleCurried
*function*
```ts
<A>(a: A) => <B>(b: B): [A, B]
```