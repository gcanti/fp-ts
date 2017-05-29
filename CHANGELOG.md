# Changelog

> **Tags:**
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]

**Note**: Gaps between patch versions are faulty/broken releases.
**Note**: A feature tagged as Experimental is in a high state of flux, you're at risk of it changing without notice.

# 0.3.0

- **New Feature**
  - add `StateT` monad transformer, closes #104 (@gcanti)
  - add `Store` comonad, closes #100 (@rilut)
  - add `Last` monoid, closes #99 (@gcanti)
  - add `Id` monadfunctor (@gcanti)
  - Array: add extend instance (@gcanti)
  - NonEmptyArray: add comonad instance (@gcanti)
  - `examples` folder
  - `exercises` folder
- **Polish**
  - Tuple: remove StaticFunctor checking (@rilut)
- **Breaking Change** (@gcanti)
  - required typescript version: **2.3.3**
  - drop `Static` prefix in type classes
  - Change contramap signature, closes #32
  - Validation: remove deprecated functions
  - Foldable/toArray
  - Dictionary/fromFoldable
  - Dictionary/toUnfoldable
  - Profunctor/lmap
  - Profunctor/rmap
  - Unfoldable/replicate
  - compositions: renaming and signature changes
    - `getFunctorComposition` -> `getCompositionFunctor`
    - `getApplicativeComposition` -> `getCompositionApplicative`
    - `getFoldableComposition` -> `getCompositionFoldable`
    - `getTraversableComposition` -> `getCompositionTraversable`
  - `OptionT`, `EitherT`, `ReaderT` refactoring
  - drop `IxMonadT`, move `IxIO` to the `examples` folder
  - drop `Trans` module
  - `Free` refactoring
  - drop `rxjs` dependency
  - drop `lib-jsnext` folder
  - make `None` constructor private
  - remove `Pointed` and `Copointed` type classes


# 0.2.9

- **New Feature**
  - add Monoidal type class (@gcanti)
- **Bug Fix**
  - fix `foldMap`, closes #89 (@gcanti)
  - replace `instanceof` checks with valued `_tag`s, fix #96 (@gcanti, @sledorze)

# 0.2.8

- **New Feature**
  - Monoid: add `getFunctionStaticMonoid`, closes #70 (@gcanti)
  - Foldable: add `traverse_` and `sequence_`, closes #71 (@gcanti)
  - add `getStaticMonad` to `EitherT`, `OptionT`, `ReaderT`, closes #81 (@gcanti)
  - Applicative: add `when`, closes #77 (@gcanti)
  - indexed monad type class and `IxMonadT`, closes #73 (@gcanti)
  - Array / function: add refinements, closes #68 (@gcanti, @sledorze)
- **Bug Fix**
  - Either: `of` should return `Either`, fix #80 (@gcanti)
  - fix `toArray` (@gcanti)

# 0.2.7

- **New Feature**
  - `Foldable` module: add `intercalate` function, fix #65 (@gcanti)
  - Add `Profunctor` typeclass, fix #33 (@gcanti, @sledorze)
  - Add `These`, fix #47 (@gcanti)
  - `Apply` module: add `applyFirst` and `applySecond`, fix #60 (@sledorze)
- **Bug Fix**
  - fix `Either.ap` (@sledorze)

# 0.2.6

- **Polish**
  - expose experimental modules (@danielepolencic, @gcanti)

# 0.2.5

- **New Feature**
  - add `getOrElse` to `Either`, fix #39 (@sledorze)
  - add composition of functors, applicatives, foldables, traversables, fix #53 (@gcanti)
- **Experimental**
  - add `EitherT`, fix #36 (@gcanti)
  - add `OptionT`, fix #37 (@gcanti)
  - add `ReaderT`, fix #38 (@gcanti)
  - add `Trans` typeclass (`liftT`), fix #40 (@gcanti)
  - add `Free`, fix #42 (@gcanti)

# 0.2.4

- **Polish**
  - deprecate `validation.getApplicativeS` / `validation.getStaticApplicative` (@gcanti)

# 0.2.3

- **Bug Fix**
  - fix return types of `validation.success` / `validation.failure` (@gcanti)

# 0.2.2

- **Bug Fix**
  - fix `Some.reduce` so it calls `f`, https://github.com/gcanti/fp-ts/pull/45 (@leemhenson)

# 0.2.1

- **New Feature**
  - `Semigroupoid` type class (@gcanti)
  - `Rxjs` module (@gcanti)
  - `Tuple` module (@gcanti)
  - `Dictionary` module (@gcanti)
  - add phantom types to all data structures in order to allow type extraction (@gcanti)
  - add all exports for rollup (@gcanti)

# 0.2

- **Breaking Change**
  - complete refactoring: new technique to get higher kinded types and typeclasses

# 0.1.1

- **New Feature**
  - add support for fantasy-land
- **Breaking Change**
  - complete refactoring
  - remove `data` module
  - remove `newtype` module

# 0.0.4

- **Bug Fix**
  - fix `compose` definition for 5 or more functions (@bumbleblym)

# 0.0.3

- **New Feature**
  - make Array<T> a HKT and deprecate `to`,`from` helper functions, fix #5 (@gcanti)
  - add `Traced` comonad (@bumbleblym)
  - add `getOrElse` method to `Option` (@gcanti)
  - add NonEmptyArray, fix #12 (@gcanti)
- **Polish**
  - add tslint
- **Bug Fix**
  - fix `State` definition (@gcanti)


# 0.0.2

- **Bug Fix**
  - fix `ChainRec` definition (@gcanti)

# 0.0.1

Initial release

