MODULE [Field](https://github.com/gcanti/fp-ts/blob/master/src/Field.ts)

# Field

_type class_

```ts
interface Field<A> extends Ring<A> {
  degree: (a: A) => number
  div: (x: A) => (y: A) => A
  mod: (x: A) => (y: A) => A
}
```

# gcd

_function_

```ts
<A>(S: Setoid<A>, field: Field<A>): ((x: A) => (y: A) => A)
```

The _greatest common divisor_ of two values

# lcm

_function_

```ts
<A>(setoid: Setoid<A>, field: Field<A>): ((x: A) => (y: A) => A)
```

The _least common multiple_ of two values
