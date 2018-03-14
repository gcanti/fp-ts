MODULE [Random](https://github.com/gcanti/fp-ts/blob/master/src/Random.ts)

# randomInt

_function_
_since 1.0.0_

```ts
;(low: number, high: number): IO<number> => random.map(n => Math.floor((high - low + 1) * n + low))
```

Takes a range specified by `low` (the first argument) and `high` (the
second), and returns a random integer uniformly distributed in the closed
interval `[low, high]`. It is unspecified what happens if `low > high`,
or if either of `low` or `high` is not an integer.

# randomRange

_function_
_since 1.0.0_

```ts
;(min: number, max: number): IO<number> => random.map(n => (max - min + 1) * n + min)
```

Returns a random number between a minimum value (inclusive) and a maximum
value (exclusive). It is unspecified what happens if `maximum < minimum`.
