MODULE [Ord](https://github.com/gcanti/fp-ts/blob/master/src/Ord.ts)

# Ord

_type class_

```ts
interface Ord<A> extends Setoid<A> {
  compare: (x: A) => (y: A) => Ordering
}
```

# ordBoolean

_instance_

```ts
Ord<boolean>
```

# ordNumber

_instance_

```ts
Ord<number>
```

# ordString

_instance_

```ts
Ord<string>
```

# between

_function_

```ts
<A>(ord: Ord<A>) => (low: A) => (hi: A) => (x: A): boolean
```

Test whether a value is between a minimum and a maximum (inclusive)

# clamp

_function_

```ts
<A>(ord: Ord<A>) => (low: A) => (hi: A) => (x: A): A
```

Clamp a value between a minimum and a maximum

# contramap

_function_

```ts
<A, B>(f: (b: B) => A, fa: Ord<A>): Ord<B>
```

# fromCompare

_function_

```ts
<A>(compare: (x: A) => (y: A) => Ordering): Ord<A>
```

# getSemigroup

_function_

```ts
<A>(): Semigroup<Ord<A>>
```

# greaterThan

_function_

```ts
<A>(ord: Ord<A>) => (x: A) => (y: A): boolean
```

Test whether one value is _strictly greater than_ another

# greaterThanOrEq

_function_

```ts
<A>(ord: Ord<A>) => (x: A) => (y: A): boolean
```

Test whether one value is _non-strictly greater than_ another

# lessThan

_function_

```ts
<A>(ord: Ord<A>) => (x: A) => (y: A): boolean
```

Test whether one value is _strictly less than_ another

# lessThanOrEq

_function_

```ts
<A>(ord: Ord<A>) => (x: A) => (y: A): boolean
```

Test whether one value is _non-strictly less than_ another

# max

_function_

```ts
<A>(ord: Ord<A>) => (x: A) => (y: A): A
```

Take the maximum of two values. If they are considered equal, the first argument is chosen

# min

_function_

```ts
<A>(ord: Ord<A>) => (x: A) => (y: A): A
```

Take the minimum of two values. If they are considered equal, the first argument is chosen

# toNativeComparator

_function_

```ts
<A>(compare: (x: A) => (y: A) => Ordering): ((x: A, y: A) => number)
```

# unsafeCompare

_function_

```ts
(x: any) => (y: any): Ordering
```
