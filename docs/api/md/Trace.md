MODULE [Trace](https://github.com/gcanti/fp-ts/blob/master/src/Trace.ts)
# spy
*function*
```ts
<A>(a: A): A
```
Log any value and return it

# trace
*function*
```ts
<A>(message: any, out: Lazy<A>): A
```
Log any value to the console for debugging purposes and then
return a value. This will log the value's underlying representation for
low-level debugging

# traceA
*function*
```ts
traceA<F>(F: Applicative<F>): (message: any) => HKT<F, void> 
```
Log a message to the console for debugging purposes and then return the unit value of the Applicative `F`

# traceM
*function*
```ts
traceM<F>(F: Monad<F>): <A>(a: A) => HKT<F, A> 
```
Log any value to the console and return it in `Monad` useful when one has monadic chains