MODULE [HeytingAlgebra](https://github.com/gcanti/fp-ts/blob/master/src/HeytingAlgebra.ts)

# HeytingAlgebra

_type class_

_Signature_

```ts
interface HeytingAlgebra<A> extends BoundedDistributiveLattice<A> {
  implies: (x: A, y: A) => A
  not: (x: A) => A
}
```

_Description_

Heyting algebras are bounded (distributive) lattices that are also equipped with an additional binary operation
`implies` (also written as `→`). Heyting algebras also define a complement operation `not` (sometimes written as
`¬a`)

However, in Heyting algebras this operation is only a pseudo-complement, since Heyting algebras do not necessarily
provide the law of the excluded middle. This means that there is no guarantee that `a ∨ ¬a = 1`.

Heyting algebras model intuitionistic logic. For a model of classical logic, see the boolean algebra type class
implemented as `BooleanAlgebra`.

A `HeytingAlgebra` must satisfy the following laws in addition to `BoundedDistributiveLattice` laws:

* Implication:
  * `a → a = 1`
  * `a ∧ (a → b) = a ∧ b`
  * `b ∧ (a → b) = b`
  * `a → (b ∧ c) = (a → b) ∧ (a → c)`
* Complemented
  * `¬a = a → 0`
