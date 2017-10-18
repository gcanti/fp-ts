MODULE [Field](https://github.com/gcanti/fp-ts/blob/master/src/Field.ts)
# Field
Type class
```ts
interface Field<A> extends Ring<A> {
  degree: (a: A) => number
  div: (x: A) => (y: A) => A
  mod: (x: A) => (y: A) => A
}
```
# gcd
function
```ts
<A>(S: Setoid<A>, field: Field<A>): ((x: A) => (y: A) => A)
```
The *greatest common divisor* of two values

# lcm
function
```ts
<A>(setoid: Setoid<A>, field: Field<A>): ((x: A) => (y: A) => A)
```
The *least common multiple* of two values