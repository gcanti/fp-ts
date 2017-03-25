A mix of

- [fantasy-land](https://github.com/fantasyland/fantasy-land)
- [static-land](https://github.com/rpominov/static-land)
- PureScript
- Scala

See the section "Technical overview" below for an explanation of the technique.

# Algebraic types

|     | Array | Option | Either | NEA(*) | Task | Const | Identity | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Setoid          | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Semigroup       | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Monoid          | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Functor         | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Contravariant   | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| PointedFunctor  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Apply           | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Applicative     | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Alt             | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Plus            | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Alternative     | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Foldable        | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| Traversable     | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| Chain           | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| ChainRec        | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Extract         | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Extend          | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Comonad         | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Bifunctor       | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

(*) NonEmptyArray

# Monads

- Array
- Either
- Identity
- Option
- Reader
- State
- Task
- Writer

# Comonads

- Identity
- Traced

# Technical overview

## Higher kinded types and type classes

Higher kinded types are represented by a unique string literal (called `URI`).

There's a central type dictionary where a mapping `URI` -> concrete type is stored

```ts
// file ./HTK.ts
export interface HKT<A> {}
```

Instances can be defined (everywhere) using a feature called [Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) so there's no danger of name conflict (the typechecker checks for duplicates).

Here's a mapping between the string literal `'Option'` and the concrete type `Option<A>`

```ts
// file ./Option.ts
declare module './HKT' {
  interface HKT<A> {
    Option: Option<A>
  }
}

export const URI = 'Option'
export type URI = typeof URI
export type Option<A> = None<A> | Some<A>

export class None<A> {
  readonly _URI: URI
  map<B>(f: (a: A) => B): Option<B> {
    return none
  }
  ...
}

export Some<A> {
  readonly _URI: URI
  // fantasy-land implementation
  map<B>(f: (a: A) => B): Option<B> {
    return new Some(f(this.value))
  }
  ...
}

// static-land implementation
export function map<A, B>(f: (a: A) => B, fa: Option<A>): Option<B> {
  return fa.map(f)
}
```

Concrete types can be retrieved by their `URI` using a feature called [Index types](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

Type classes are implemented following (when possible) both the [static-land](https://github.com/rpominov/static-land) spec and the [fantasy-land](https://github.com/fantasyland/fantasy-land) spec.

 Here's the definition of the type class `Functor` (following the static-land spec)

```ts
export interface StaticFunctor<F extends HKTS> {
  URI: F
  map<A, B>(f: (a: A) => B, fa: HKT<A>[F]): HKT<B>[F]
}
```

# License

The MIT License (MIT)
