MODULE [Semiring](https://github.com/gcanti/fp-ts/blob/master/src/Semiring.ts)

# Semiring

_type class_

_Signature_

```ts
interface Semiring<A> {
  readonly add: (x: A, y: A) => A
  readonly zero: A
  readonly mul: (x: A, y: A) => A
  readonly one: A
}
```

_Description_

The `Semiring` class is for types that support an addition and multiplication operation.

Instances must satisfy the following laws:

* Commutative monoid under addition:
  * Associativity: `(a + b) + c = a + (b + c)`
  * Identity: `zero + a = a + zero = a`
  * Commutative: `a + b = b + a`
* Monoid under multiplication:
  * Associativity: `(a * b) * c = a * (b * c)`
  * Identity: `one * a = a * one = a`
* Multiplication distributes over addition:
  * Left distributivity: `a * (b + c) = (a * b) + (a * c)`
  * Right distributivity: `(a + b) * c = (a * c) + (b * c)`
* Annihilation: `zero * a = a * zero = zero`

**Note:** The `Number` and `Int` types are not fully law abiding members of this class hierarchy due to the potential
for arithmetic overflows, and in the case of `Number`, the presence of `NaN` and `Infinity` values. The behaviour is
unspecified in these cases.

# getFunctionSemiring

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(S: Semiring<B>): Semiring<(a: A) => B>
```
