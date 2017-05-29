# OptionT

`OptionT<M, A>` is a light wrapper on an `M<Option<A>>`. Speaking technically, it is a monad transformer for `Option`. `OptionT` can be more convenient to work with than using `M<Option<A>>` directly.

## Reduce map boilerplate

Consider the following scenario:

```ts
import * as task from 'fp-ts/lib/Task'
import * as option from 'fp-ts/lib/Option'

// customGreeting :: Task<Option<string>>
const customGreeting = task.of(option.some('welcome back, Lola'))
```

We want to try out various forms of our greetings.

```ts
// excitedGreeting :: Task<Option<string>>
const excitedGreeting = customGreeting.map(x => x.map(s => s + '!'))

// withFallback :: Task<String>
const withFallback = customGreeting.map(x => x.getOrElse(() => 'hello, there!'))
```

As you can see, the implementations of all of these variations are very similar. We want to call the `Option` operation (`map`, `getOrElse`), but since our `Option` is wrapped in a `Task`, we first need to map over the `Task`.

`OptionT` can help remove some of this boilerplate. It exposes methods that look like those on `Option`, but it handles the outer map call on the `Task` so we don’t have to:

```ts
import { getOptionT } from 'fp-ts/lib/OptionT'

declare module 'fp-ts/lib/HKT' {
  interface HKT<A> {
    'Task<Option>': Task<Option<A>>
  }
}

const taskOption = getOptionT('Task<Option>', task)

// customGreeting2 :: Task<Option<string>>
const customGreeting2 = taskOption.of('welcome back, Lola')

// excitedGreeting2 :: Task<Option<string>>
const excitedGreeting2 = taskOption.map(s => s + '!', customGreeting2)

// excitedGreeting2 :: Task<String>
const withFallback2 = taskOption.getOrElse(() => 'hello, there!', excitedGreeting2)
```

## From `Option<A>` and/or `M<A>` to `OptionT<M, A>`

Sometimes you may have an `Option<A>` and/or `M<A>` and want to *lift* them into an `M<Option<A>>`. For this purpose `taskOption` exposes two useful methods, namely `fromOption` and `liftT`, respectively. E.g.:

```ts
// greetingMO :: Task<Option<string>>
const greetingMO = taskOption.of('Hello')

// firstnameM :: Task<string>
const firstnameM = task.of('Jane')

// lastnameO :: Option<string>
const lastnameO = option.some('Doe')

const ot = taskOption.chain(g => {
  return taskOption.chain(f => {
    return taskOption.map(l => `${g} ${f} ${l}`, taskOption.fromOption(lastnameO))
  }, taskOption.liftT(firstnameM))
}, greetingMO)

ot.run().then(x => console.log(x)) // => Some("Hello Jane Doe")
```

## From `A` to `OptionT<M, A>`

If you have only an `A` and you wish to *lift* it into an `M<Option<A>>` assuming you have a Monad instance for `M` you can use `some` which is an alias for `of`. There also exists a `none` function which can be used to create an `M<Option<A>>`, where the `Option` wrapped `A` type is actually a `None`:

```ts
// greet :: Task<Option<string>>
const greet = taskOption.of('Hola!')

// greetAlt :: Task<Option<string>>
const greetAlt = taskOption.some('Hi!')

// failedGreet :: Task<Option<any>>
const failedGreet = taskOption.none()
```

## Credits

Adapted from http://typelevel.org/cats/datatypes/optiont.html

