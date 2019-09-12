---
title: Profunctor instances
parent: Recipes
nav_order: 9
---

# Writing Profunctor instances for complex types

It's rather easy to write a profunctor instance for simple type like function `(a: A) => B`:

```ts
const URI = 'Fn';
type URI = typeof URI;

type Fn<A, B> = (a: A) => B;

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    Fn: Fn<E, A>;
  }
}

const functionProfunctor: Profunctor2<URI> = {
  URI,
  map: (fa, f) => (e) => f(fa(e)),
  promap: (fea, de, ab) => (d) => ab(fea(de(d))),
};
```

But if you want to express something more complicated – like Kleisli arrows – you need to use advanced technique of currying type constructors.

Let's look at the example. We define an `UpStar` newtype to represent an effectful function (which, if you squint enough, is just a Kleisli arrow):

```ts
type UpStar<F, A, B> = (a: A) => HKT<F, B>;
```

Please note that despite `UpStar` itself having kind `* -> * -> * -> *`, its type parameter `F` is HKT as well and has kind `* -> *`.

In order to make use of `Profunctor` type class, we need to define `UpStar` as HKT:

```ts
export type UpStar<F, A, B> = (a: A) => HKT<F, B>;
export const UpStarURI = 'UpStar';
export type UpStarURI = typeof UpStarURI;

declare module 'fp-ts/lib/HKT' {
  interface URItoKind3<R, E, A> {
    UpStar: UpStar<R, E, A>;
  }
}
```

The real bummer is that if we try to use existing type class declarations like `Profunctor3`, we cannot express that `F` needs to be an HKT:

```ts
function getUpStarProfunctor<F extends URIS>(F: Functor1<F>): Profunctor3<F> {
  // Type 'F' does not satisfy the constraint '"UpStar"
}
```

What we need to do is use special `Profunctor3C` (curried) interface, which allows passing not only `URI`, but also one additional type parameter, which could be used to "tie" `UpStar` and `F` together:

```ts
function getUpStarProfunctor<F>(F: Functor<F>): Profunctor3C<UpStarURI, F> {
  return {
    URI: UpStarURI,
    map: (fa, f) => (a) => F.map(fa(a), f),
    promap: (fbc, ab, cd) => (a) => F.map(fbc(ab(a)), cd),
  };
}
```

Also there's a few more interfaces: `Profunctor4C1` (curried profunctor with 1 additional type parameter) and `Profunctor4C2` (curried profunctor with 2 additional type parameters), `Strong3C/Strong4C1/Strong4C2` and `Choice3C/Choice4C1/Choice4C2` (you've guessed it, curried interfaces with 1 or 2 additional parameters).
