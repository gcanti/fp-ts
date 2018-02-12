MODULE [Setoid](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts)
# Setoid
*type class*
```ts
interface Setoid<A> {
  equals: (x: A, y: A) => boolean
}
```
# setoidBoolean
*instance*
```ts
setoidBoolean: 
```

# setoidNumber
*instance*
```ts
setoidNumber: 
```

# setoidString
*instance*
```ts
setoidString: 
```
# getArraySetoid
*function*
```ts
<A>(S: Setoid<A>): Setoid<Array<A>>
```

# getProductSetoid
*function*
```ts
<A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]>
```

# getRecordSetoid
*function*
```ts
<O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O>
```

# strictEqual
*function*
```ts
<A>(a: A, b: A): boolean
```