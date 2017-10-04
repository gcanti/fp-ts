MODULE [Ordering](https://github.com/gcanti/fp-ts/blob/master/src/Ordering.ts)
# Ordering
```ts
type Ordering = 'LT' | 'EQ' | 'GT'
```
# invert
```ts
(O: Ordering): Ordering
```
# orderingSemigroup
```ts
Semigroup<Ordering>
```
# orderingSetoid
```ts
Setoid<Ordering>
```