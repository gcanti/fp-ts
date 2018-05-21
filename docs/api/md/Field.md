MODULE [Field](https://github.com/gcanti/fp-ts/blob/master/src/Field.ts)

# Field

_type class_

_Signature_

```ts
interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (x: A, y: A) => A
  readonly mod: (x: A, y: A) => A
}
```

# fieldNumber

_instance_

_since 1.0.0_

_Signature_

```ts
Field<number>
```

# gcd

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>, field: Field<A>): ((x: A, y: A) => A)
```

_Description_

The _greatest common divisor_ of two values

# lcm

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>, F: Field<A>): ((x: A, y: A) => A)
```

_Description_

The _least common multiple_ of two values
