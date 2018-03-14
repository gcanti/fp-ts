MODULE [Ring](https://github.com/gcanti/fp-ts/blob/master/src/Ring.ts)

# Ring

_type class_

```ts
interface Ring<A> extends Semiring<A> {
  readonly sub: (x: A, y: A) => A
}
```

The `Ring` class is for types that support addition, multiplication,
and subtraction operations.

Instances must satisfy the following law in addition to the `Semiring`
laws:

* Additive inverse: `a - a = (zero - a) + a = zero`

# getFunctionRing

_function_
_since 1.0.0_

```ts
<A, B>(ring: Ring<B>): Ring<(a: A) => B>
```

# getProductRing

_function_
_since 1.0.0_

```ts
<A, B>(RA: Ring<A>, RB: Ring<B>): Ring<[A, B]>
```

# negate

_function_
_since 1.0.0_

```ts
<A>(ring: Ring<A>) => (a: A): A
```

`negate x` can be used as a shorthand for `zero - x`
