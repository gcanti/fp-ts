MODULE [Setoid](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts)
# Setoid
*type class*
```ts
interface Setoid<A> {
  equals: (x: A) => (y: A) => boolean
}
```
# setoidBoolean
*instance*
```ts
Setoid<boolean>
```

# setoidNumber
*instance*
```ts
Setoid<number>
```

# setoidString
*instance*
```ts
Setoid<string>
```
# getArraySetoid
*function*
```ts
<A>(S: Setoid<A>): Setoid<Array<A>>
```

# strictEqual
*function*
```ts
(a: any) => (b: any): boolean
```