---
title: Algebraic Data Types
parent: Functional design
nav_order: 6
---

# Functional design: Algebraic Data Types

A good first step while building a new application is to define its domain model. TypeScript offers many tools to help you in this task. **Algebraic Data Types** (ADT for short) are one of these tools.

# What is an ADT?

In computer programming, especially functional programming and type theory, an algebraic data type is a kind of composite type, i.e., **a type formed by combining other types**.

Two common classes of algebraic types are:

- **product types**
- **sum types**

# Product types

A product type is a collection of types T<sub>i</sub> indexed by a set `I`.

Two common members of this family are `n`-tuples, where `I` is a non empty interval of natural numbers...

```ts
type Tuple1 = [string] // I = [0]
type Tuple2 = [string, number] // I = [0, 1]
type Tuple3 = [string, number, boolean] // I = [0, 1, 2]

// Accessing by index
type Fst = Tuple2[0] // string
type Snd = Tuple2[1] // number
```

...and structs, where `I` is a set of labels.

```ts
// I = {"name", "age"}
interface Person {
  name: string
  age: number
}

// Accessing by label
type Name = Person['name'] // string
type Age = Person['age'] // number
```

## Why "product" types?

If we write `C(A)` for the number of inhabitants of the type `A` (aka its **cardinality**) then the following equality holds

```ts
C([A, B]) = C(A) * C(B)
```

> the cardinality of the product is the product of cardinalities

**Example**

```ts
type Hour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type Period = 'AM' | 'PM'
type Clock = [Hour, Period]
```

The `Clock` type has `12 * 2 = 24` inhabitants.

## When should I use a product type?

Whenever its components are **independent**.

```ts
type Clock = [Hour, Period]
```

Here `Hour` and `Period` are independent, i.e. the value of `Hour` doesn't affect the value of `Period` and vice versa, all pairs are legal and meaningful.

# Sum types

A sum type is a data structure used to hold a value that could take on several different, but fixed, types. Only one of the types can be in use at any one time, and a tag field explicitly indicates which one is in use.

In the TypeScript documentation they are named _tagged union types_.

**Example** (redux actions)

```ts
type Action =
  | {
      type: 'ADD_TODO'
      text: string
    }
  | {
      type: 'UPDATE_TODO'
      id: number
      text: string
      completed: boolean
    }
  | {
      type: 'DELETE_TODO'
      id: number
    }
```

The `type` field is the _tag_ and ensures that its members are disjoint.

## Constructors

A sum type with `n` members requires `n` **constructors**, one for each member

```ts
const add = (text: string): Action => ({
  type: 'ADD_TODO',
  text
})

const update = (id: number, text: string, completed: boolean): Action => ({
  type: 'UPDATE_TODO',
  id,
  text,
  completed
})

const del = (id: number): Action => ({
  type: 'DELETE_TODO',
  id
})
```

Sum types can be **polymorphic** and/or **recursive**.

**Example** (linked lists)

```ts
//        ↓ type parameter
type List<A> = { type: 'Nil' } | { type: 'Cons'; head: A; tail: List<A> }
//                                                              ↑ recursion
```

## Pattern matching

JavaScript doesn't have [pattern matching](https://github.com/tc39/proposal-pattern-matching) (and so TypeScript) however we can define a "poor man" pattern matching by defining a `fold` function

```ts
const fold = <A, R>(
  fa: List<A>,
  onNil: () => R,
  onCons: (head: A, tail: List<A>) => R
): R => (fa.type === 'Nil' ? onNil() : onCons(fa.head, fa.tail))
```

**Example** (calculate the length of a `List` recursively)

```ts
const length = <A>(fa: List<A>): number =>
  fold(fa, () => 0, (_, tail) => 1 + length(tail))
```

## Why "sum" types?

The following equality holds

```ts
C(A | B) = C(A) + C(B)
```

> the cardinality of the sum is the sum of cardinalities

**Example** (the `Option` type)

```ts
type Option<A> =
  | { type: 'None' }
  | {
      type: 'Some'
      value: A
    }
```

From the general formula `C(Option<A>) = 1 + C(A)` we can derive for example the cardinality of `Option<boolean>`: `1 + 2 = 3` inhabitants.

## When should I use a sum type?

When its components would be **dependent** if implemented as a product type.

**Example** (component props)

```ts
interface Props {
  editable: boolean
  onChange?: (text: string) => void
}

class Textbox extends React.Component<Props> {
  render() {
    if (this.props.editable) {
      // error: Cannot invoke an object which is possibly 'undefined' :(
      this.props.onChange(...)
    }
  }
}
```

The problem here is that `Props` is modelled as a product type but `onChange` **depends** on `editable`.

A sum type is a better choice

```ts
type Props =
  | {
      type: 'READONLY'
    }
  | {
      type: 'EDITABLE'
      onChange: (text: string) => void
    }

class Textbox extends React.Component<Props> {
  render() {
    switch (this.props.type) {
      case 'EDITABLE' :
        this.props.onChange(...) // :)
      ...
    }
  }
}
```

**Example** (node callbacks)

```ts
declare function readFile(
  path: string,
  //         ↓ ---------- ↓ CallbackArgs
  callback: (err?: Error, data?: string) => void
): void
```

The result is modelled as a product type

```ts
type CallbackArgs = [Error | undefined, string | undefined]
```

however, its components are **dependent**: you get either an error **or** a string

| err         | data        | legal? |
| ----------- | ----------- | ------ |
| `Error`     | `undefined` | ✓      |
| `undefined` | `string`    | ✓      |
| `Error`     | `string`    | ✘      |
| `undefined` | `undefined` | ✘      |

A sum type would be a better choice, but which one?

# Functional error handling

Let's see how to deal with errors in a functional style.

## The `Option` type

The `Option` type represents the effect of a computation that may fail or yield a value of type `A`

```ts
type Option<A> =
  | { type: 'None' } // represents a failure
  | { type: 'Some'; value: A } // represents a success
```

Constructors and pattern matching:

```ts
// a nullary constructor can be implemented as a constant
const none: Option<never> = { type: 'None' }

const some = <A>(value: A): Option<A> => ({ type: 'Some', value })

const fold = <A, R>(fa: Option<A>, onNone: () => R, onSome: (a: A) => R): R =>
  fa.type === 'None' ? onNone() : onSome(fa.value)
```

The `Option` type can be used to avoid throwing exceptions and/or to represent optional values, so we can go from...

```ts
//                this is a lie ↓
const head = <A>(as: Array<A>): A => {
  if (as.length === 0) {
    throw new Error('Empty array')
  }
  return as[0]
}

let s: string
try {
  s = String(head([]))
} catch (e) {
  s = e.message
}
```

...where the type system is unaware of possible failures, to...

```ts
//                              ↓ the type system "knows" that this computation may fail
const head = <A>(as: Array<A>): Option<A> => {
  return as.length === 0 ? none : some(as[0])
}

const s = fold(head([]), () => 'Empty array', a => String(a))
```

...where the possibility of failures is _lifted_ to the type system.

## The `Either` type

A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage, `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention dictates that `Left` is used for failure and `Right` is used for success.

```ts
type Either<L, A> =
  | { type: 'Left'; left: L } // represents a failure
  | { type: 'Right'; right: A } // represents a success
```

Constructors and pattern matching:

```ts
const left = <L, A>(left: L): Either<L, A> => ({ type: 'Left', left })

const right = <L, A>(right: A): Either<L, A> => ({ type: 'Right', right })

const fold = <L, A, R>(
  fa: Either<L, A>,
  onLeft: (left: L) => R,
  onRight: (right: A) => R
): R => (fa.type === 'Left' ? onLeft(fa.left) : onRight(fa.right))
```

Getting back to our callback example

```ts
declare function readFile(
  path: string,
  callback: (err?: Error, data?: string) => void
): void

readFile('./myfile', (err, data) => {
  let message: string
  if (err !== undefined) {
    message = `Error: ${err.message}`
  } else if (data !== undefined) {
    message = `Data: ${data.trim()}`
  } else {
    // should never happen
    message = 'The impossible happened'
  }
  console.log(message)
})
```

we can change its signature to

```ts
declare function readFile(
  path: string,
  callback: (result: Either<Error, string>) => void
): void
```

and then consume the API like this

```ts
readFile('./myfile', e => {
  const message = fold(e, err => `Error: ${err.message}`, data => `Data: ${data.trim()}`)
  console.log(message)
})
```

# Conclusion

In this post we've seen product types and sum types, and how reasoning in terms of the number of states they represent can greatly affect the design of our domain models.

A common pitfall of many real-world APIs is to misuse product types that, in addition to all the legal states, also model many illegal ones.

Sum types are an incredibly useful and fundamental language feature, they are the key to design excellent domain models by allowing to make illegal states irrepresentable.
