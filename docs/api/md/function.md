MODULE [function](https://github.com/gcanti/fp-ts/blob/master/src/function.ts)
# BinaryOperation
```ts
type BinaryOperation<A, B> = (a1: A) => (a2: A) => B
```
# Cokleisli
```ts
type Cokleisli<F, A, B> = (fa: HKT<F, A>) => B
```
# Curried2
```ts
type Curried2<A, B, C> = (a: A) => (b: B) => C
```
# Curried3
```ts
type Curried3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D
```
# Curried4
```ts
type Curried4<A, B, C, D, E> = (a: A) => (b: B) => (c: C) => (d: D) => E
```
# Curried5
```ts
type Curried5<A, B, C, D, E, F> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F
```
# Curried6
```ts
type Curried6<A, B, C, D, E, F, G> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => G
```
# Curried7
```ts
type Curried7<A, B, C, D, E, F, G, H> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => H
```
# Curried8
```ts
type Curried8<A, B, C, D, E, F, G, H, I> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => I
```
# Curried9
```ts
type Curried9<A, B, C, D, E, F, G, H, I, J> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => J
```
# Endomorphism
```ts
type Endomorphism<A> = (a: A) => A
```
# Function1
```ts
type Function1<A, B> = (a: A) => B
```
# Function2
```ts
type Function2<A, B, C> = (a: A, b: B) => C
```
# Function3
```ts
type Function3<A, B, C, D> = (a: A, b: B, c: C) => D
```
# Function4
```ts
type Function4<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E
```
# Function5
```ts
type Function5<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E) => F
```
# Function6
```ts
type Function6<A, B, C, D, E, F, G> = (a: A, b: B, c: C, d: D, e: E, f: F) => G
```
# Function7
```ts
type Function7<A, B, C, D, E, F, G, H> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H
```
# Function8
```ts
type Function8<A, B, C, D, E, F, G, H, I> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => I
```
# Function9
```ts
type Function9<A, B, C, D, E, F, G, H, I, J> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => J
```
# Kleisli
```ts
type Kleisli<F, A, B> = (a: A) => HKT<F, B>
```
# Lazy
```ts
type Lazy<A> = () => A
```
# Lazy
```ts
type Lazy<A> = () => A
```
# Predicate
```ts
type Predicate<A> = (a: A) => boolean
```
# Refinement
```ts
type Refinement<A, B extends A> = (a: A) => a is B
```
# and
```ts
<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>
```
# apply
```ts
<A, B>(f: (a: A) => B) => (a: A): B
```
Applies a function to an argument ($)
# applyFlipped
```ts
<A>(a: A) => <B>(f: (a: A) => B): B
```
Applies an argument to a function (#)
# compose
```ts
<A, B, C>(bc: (b: B) => C, ab: (a: A) => B): (a: A) => C
```
# constant
```ts
<A>(a: A): Lazy<A>
```
# curry
```ts
<A, B, C>(f: Function2<A, B, C>): Curried2<A, B, C>
```
# flip
```ts
<A, B, C>(f: Curried2<A, B, C>): Curried2<B, A, C>
```
Flips the order of the arguments to a function of two arguments.
# identity
```ts
<A>(a: A): A
```
# not
```ts
<A>(predicate: Predicate<A>): Predicate<A>
```
# on
```ts
<B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B): BinaryOperation<A, C>
```
The `on` function is used to change the domain of a binary operator.
# or
```ts
<A>(p1: Predicate<A>) => (p2: Predicate<A>): Predicate<A>
```
# pipe
```ts
<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C
```
# toString
```ts
(x: any): string
```
# tuple
```ts
<A, B>(a: A, b: B): [A, B]
```
# tupleCurried
```ts
<A>(a: A) => <B>(b: B): [A, B]
```
# constFalse
```ts
Lazy<boolean>
```
A thunk that returns always `false`
# constTrue
```ts
Lazy<boolean>
```
A thunk that returns always `true`