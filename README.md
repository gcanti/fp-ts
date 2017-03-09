A (weird) mix of

- [fantasy-land](https://github.com/fantasyland/fantasy-land)
- [static-land](https://github.com/rpominov/static-land)
- PureScript
- Scala

The idea (faking higher kinded types in TypeScript) is based on the paper [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf), [elm-brands](https://github.com/joneshf/elm-brands) and [flow-static-land](https://github.com/gcanti/flow-static-land).

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
| Alt             | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Plus            | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Alternative     | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Foldable        | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Traversable     | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Chain           | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| ChainRec        | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Extract         | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Extend          | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Comonad         | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Bifunctor       | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Profunctor      | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

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

# License

The MIT License (MIT)

