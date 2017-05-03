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
import { OptionT } from 'fp-ts/lib/OptionT'

// customGreetingT :: OptionT<"Task", string>
const customGreetingT = new OptionT(task, customGreeting)

// excitedGreetingT :: OptionT<"Task", string>
const excitedGreetingT = customGreetingT.map(s => s + '!')

// excitedGreetingT :: Task<String>
const withFallbackT = customGreetingT.getOrElse(() => 'hello, there!')
```

## From `Option<A>` and/or `M<A>` to `OptionT<M, A>`

Sometimes you may have an `Option<A>` and/or `M<A>` and want to *lift* them into an `OptionT<M, A>`. For this purpose `OptionT` exposes two useful methods, namely `fromOption` and `liftT`, respectively. E.g.:

```ts
import { liftT, fromOption } from 'fp-ts/lib/OptionT'

// greetingMO :: Task<Option<string>>
const greetingMO = task.of(option.some('Hello'))

// firstnameM :: Task<string>
const firstnameM = task.of('Jane')

// lastnameO :: Option<string>
const lastnameO = option.some('Doe')

const ot = new OptionT(task, greetingMO)
  .chain(g => liftT(task)(firstnameM)
    .chain(f => fromOption(task)(lastnameO)
      .map(l => `${g} ${f} ${l}`)))

ot.value.run().then(x => console.log(x)) // => Some("Hello Jane Doe")
```

## From `A` to `OptionT<M, A>`

If you have only an `A` and you wish to *lift* it into an `OptionT<M, A>` assuming you have an Moand instance for `M` you can use `some` which is an alias for `of`. There also exists a `none` function which can be used to create an `OptionT<M, A>`, where the `Option` wrapped `A` type is actually a `None`:

```ts
import { of, some, none } from 'fp-ts/lib/OptionT'

// greet :: OptionT<"Task", string>
const greet = of(task)('Hola!')

// greetAlt :: OptionT<"Task", string>
const greetAlt = some(task)('Hi!')

// failedGreet :: OptionT<"Task", any>
const failedGreet = none(task)
```

## Getting to the underlying instance

If you want to get the `M<Option<A>>` value (in this case `Task<Option<String>>`) out of an `OptionT` instance, you can simply call `value`:

```ts
// customGreeting :: Task<Option<string>>
const customGreeting = customGreetingT.value
```

## Credits

Adapted from http://typelevel.org/cats/datatypes/optiont.html

