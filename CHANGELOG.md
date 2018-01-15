# Changelog

> **Tags:**
>
> * [New Feature]
> * [Bug Fix]
> * [Breaking Change]
> * [Documentation]
> * [Internal]
> * [Polish]
> * [Experimental]

**Note**: Gaps between patch versions are faulty/broken releases. **Note**: A feature tagged as Experimental is in a
high state of flux, you're at risk of it changing without notice.

# 0.6.8

* **New Feature**
  * `Validation`: add `getOrElse`, `getOrElseValue`, closes #278 (@gcanti)
  * add `Functor2`, `Functor3`, `Apply2`, `Apply3`, `Applicative2`, `Applicative3`, `Chain2`, `Chain3`, `Monad2`,
    `Monad3` in order to better support MTL style (@gcanti)
* **Bug Fix**
  * Flow: reverse order of overloadings in curry declaration, fix #299 (@gcanti)
  * `Set`: fix `union` / `insert` / `toArray` / `reduce` definitions (@gcanti)
* **Experimental**
  * `Validation`: add `chain` (@gcanti)
* **Internal**
  * fix typescript@next errors (@gcanti)
* **Documentation**
  * add `StateTaskEither`, `TaskOption` examples (@gcanti)

# 0.6.7

* **New Feature**
  * Ordering: add fromNumber, toNumber (@gcanti)
  * function: add unsafeCoerce (@gcanti)
  * add Set module, closes #161 (@gcanti)

# 0.6.6

* **New Feature**
  * `Array`: add `rotate` (@gcanti)
  * add some `Foldable` functions (@gcanti)
    * `minimum`
    * `maximum`
    * `sum`
    * `product`
    * `foldM`
    * `oneOf`
    * `elem`
    * `find`
  * `Option`: add `tryCatch` (@gcanti)
  * `Ring`: add `getProductRing` (@gcanti)
  * `Setoid`: add `getProductSetoid` (@gcanti)
  * `Ord`: add `getProductOrd` (@gcanti)
* **Internal**
  * perf optimizations (@sledorze, @gcanti)
  * travis: use node 8 (@gcanti)

# 0.6.5

* **Bug Fix**
  * Flow: use `$NonMaybeType` for `fromNullable` and `mapNullable` (@gcanti)

# 0.6.4

* **New Feature**
  * Array: add `getSemigroup` / `getMonoid`, fix #272 (@gcanti)
  * Setoid: add `getRecordSetoid` (@gcanti)
  * add missing `ap_` methods (Reader, State, Writer) (@gcanti)
  * type `is*` methods as type guards (Option, Either, Validation, These) (@gcanti)
* **Experimental**
  * add Flowtype support (@gcanti)
* **Polish**
  * Correct `ap_` parameter name (@OliverJAsh)
  * update Prettier version (@gcanti)
  * fix `getRecordSemigroup` signature (@gcanti)
  * fix `getRecordMonoid` signature (@gcanti)
  * format markdown files with prettier (@gcanti)

# 0.6.3

* **New Feature**
  * move semigroup methods from Monoid.ts to Semigroup.ts (@valery-paschenkov)

# 0.6.2

* **New Feature**
  * add `function.constNull` and `function.constUndefined` (@raveclassic)

# 0.6.1

* **Breaking Change**
  * upgrade to latest TypeScript (2.6.1), fix #244 (@gcanti)

# 0.5.4

* **New Feature**
  * `Array`: add `findFirst` and `findLast` functions (@chasent)
  * `Option`: add `getOrElseValue`, `filter`, `mapNullable` (@raveclassic)
  * `Either`: add `getOrElseValue` (@raveclassic)
  * `Either`: add `fromNullable` (@gcanti)
* **Bug Fix**
  * `Either`: `equals` now accepts a `Setoid<L>` other than `Setoid<A>`, fix #247 (@gcanti)
  * `Validation`: `equals` now accepts a `Setoid<L>` other than `Setoid<A>`, fix #247 (@gcanti)

# 0.5.3

* **New Feature**
  * add `Invariant` (@gcanti)
  * `Semigroup`: add `getRecordSemigroup`, `getRecordMonoid`, `getMeetSemigroup`, `getJoinSemigroup` (@gcanti)
  * `Ord`: add `getSemigroup`, `fromCompare`, `contramap` (@gcanti)
  * `Option`: add `toUndefined` method (@vegansk)
  * `These`: add `getMonad` (@gcanti)
  * `Foldable`: add `fold` (@gcanti)
  * add `TaskEither` (@gcanti)
  * `Validation`: add `fromEither` (@gcanti)
  * `Task`: add `fromIO` (@gcanti)
  * `Either`: pass value to `getOrElse` (@jiayihu)
  * `Array`: add `span` function (@gcanti)
* **Bug Fix**
  * `Array`: fix `takeWhile`, `dropWhile` (@gcanti)
* **Documentation**
  * add `Moore` machine example (@gcanti)
  * add MTL style example (@gcanti)
  * starting API documentation (@gcanti)
* **Internal**
  * fix `Semigroupoid` definition (@gcanti)
* **Polish**
  * `Ordering`: shorten `orderingSemigroup` definition (@gcanti)
  * `Task`: prefer `{}` to `any`, fix #231 (@OliverJAsh)
  * upgrade to `prettier@1.7.0` (@gcanti)
  * `These`: fix `fold` and `bimap` definitions (@gcanti)
  * fix `ArrayOption` example (@gcanti)
  * `State`: remove `Endomorphism` type alias (@gcanti)
  * `Monoidal`: use `liftA2` (@gcanti)

# 0.5.2

* **Bug Fix**
  * fixed EitherT to only run code on the left once, closes #219 (@nfma)
  * fixed OptionT to only run code on none once (@gcanti)

# 0.5.1

* **Breaking Change**
  * migrate to curried APIs when possible (@raveclassic, @gcanti)
  * remove useless static `of`s (@gcanti)
* **New Feature**
  * Array: add zip and zipWith (@gcanti)
  * Monoid: add getArrayMonoid (@gcanti)
  * Tuple
    * add toString (@gcanti)
    * add getApplicative (@gcanti)
    * add getChainRec (@gcanti)
  * Setoid: add getArraySetoid (@gcanti)
* **Bug fix**
  * Store
    * fix extend implementation (@gcanti)
    * fix toString (@gcanti)
* **Polish**
  * Plus: remove any from signatures (@gcanti)

# 0.4.6

* **New Feature**
  * add endomorphism monoid, fix #189 (@gcanti)
  * add a default implementation of `foldr` using `foldMap` (@gcanti)
  * add `insert`, `remove` and `pop` to `StrMap` (@gcanti)
  * improve `voidLeft`, `voidRight` type inference, fix #191 (@gcanti)
* **Bug Fix**
  * StrMap.size returns a wrong number of key/value pairs, fix #186 (@gcanti)
* **Documentation**
  * start book "fp-ts by examples"

# 0.4.5

* **New Feature**
  * add `contains`, `isNone`, `isSome`, `exists` methods to `Option` (@alexandervanhecke)
  * add `Exception` module (@gcanti)
  * add `Pair` module (@gcanti)
  * add `Trace` module (@gcanti)
  * add `IxMonad` module (@gcanti)
  * add `IxIO` module (@gcanti)
  * add `Either.fromOption` (@gcanti)
* **Documentation**
  * add `StateT` example (@gcanti)
  * add `IxIO` example (@gcanti)

# 0.4.3

* **New Feature**
  * add type-level dictionaries in order to reduce the number of overloadings (@gcanti)
  * add typechecks to the type-level HKT dictionary (@SimonMeskens)
  * add Task.tryCatch, closes #159 (@gcanti)
  * use the bottom `never` type for none, closes #160 (@gcanti)
  * add Random module (@gcanti)
  * add Console module (@gcanti)
  * add FantasyFilterable (@SimonMeskens)
  * add FantasyWitherable (@SimonMeskens)
* **Documentation**
  * add ReaderIO example (@gcanti)
  * add EitherOption example (@gcanti)
* **Polish**
  * TaskEither: rename fromPromise to tryCatch (@gcanti)
* **Internal**
  * add fix-prettier task (@gcanti)
  * remove typings-checker (doesn’t work with ts 2.4.1) (@gcanti)

# 0.4.0

* **Breaking Change**
  * Tuple (wrapped)
  * Dictionary (wrapped, renamed to StrMap)
  * changed
    * Applicative.getCompositionApplicative (also renamed to getApplicativeComposition)
    * Foldable.getCompositionFoldable (also renamed to getFoldableComposition)
    * Functor.getCompositionFunctor (also renamed to getFunctorComposition)
    * Traversable.getCompositionTraversable (also renamed to getTraversableComposition)
    * Free (usage)
    * NaturalTransformation
    * ReaderT
    * StateT
  * removed (temporarily or because the porting is not possible)
    * Id (not possible)
    * Traced
    * IxMonad
    * Mealy
    * FreeAp

# 0.3.5

* **New Feature**
  * Functor: add `flap`, closes #129 (@gcanti)
  * Add getSetoid instances, closes #131 (@gcanti)
  * Add "flipped" ap method to FantasyApply instances, closes #132 (@gcanti)
* **Polish**
  * Examples: correct TaskEither fold method (@OliverJAsh)

# 0.3.4

* **Bug Fix**
  * `Array.snoc` returns wrong results with nested arrays, fix #133 (@gcanti)

# 0.3.3

* **New Feature**
  * Functor: add `voidRight` / `voidLeft`, closes #120 (@gcanti)
  * Add `Mealy` machine, closes #122 (@gcanti)
  * Add `Filterable`, closes #124 (@gcanti)
  * Add `Witherable`, closes #125 (@gcanti)
* **Polish**
  * upgrade to ts 2.3.4
  * Either: make `right` === `of\
  * IxIO example: use new proof

# 0.3.2

* **Bug Fix**
  * IxMonad: remove wrong type constraint (@gcanti)

# 0.3.1

* **New Feature**
  * add `Free Applicative`, closes #106 (@gcanti)
  * Add `Semiring`, closes #107 (@gcanti)
  * Add `Ring`, closes #108 (@gcanti)
  * Add `Field`, closes #109 (@gcanti)
  * Improve `toString` methods, closes #116 (@gcanti)
* **Bug Fix**
  * NonEmptyArray: add missing static `of` (@gcanti)
  * add `_tag` type annotations, closes #118 (@gcanti)
* **Internal**
  * Change `proof`s of implementation (@rilut)
  * use prettier, closes #114 (@gcanti)

# 0.3.0

* **New Feature**
  * add `StateT` monad transformer, closes #104 (@gcanti)
  * add `Store` comonad, closes #100 (@rilut)
  * add `Last` monoid, closes #99 (@gcanti)
  * add `Id` monadfunctor (@gcanti)
  * Array: add extend instance (@gcanti)
  * NonEmptyArray: add comonad instance (@gcanti)
  * `examples` folder
  * `exercises` folder
* **Polish**
  * Tuple: remove StaticFunctor checking (@rilut)
* **Breaking Change** (@gcanti)
  * required typescript version: **2.3.3**
  * drop `Static` prefix in type classes
  * Change contramap signature, closes #32
  * Validation: remove deprecated functions
  * Foldable/toArray
  * Dictionary/fromFoldable
  * Dictionary/toUnfoldable
  * Profunctor/lmap
  * Profunctor/rmap
  * Unfoldable/replicate
  * compositions: renaming and signature changes
    * `getFunctorComposition` -> `getCompositionFunctor`
    * `getApplicativeComposition` -> `getCompositionApplicative`
    * `getFoldableComposition` -> `getCompositionFoldable`
    * `getTraversableComposition` -> `getCompositionTraversable`
  * `OptionT`, `EitherT`, `ReaderT` refactoring
  * drop `IxMonadT`, move `IxIO` to the `examples` folder
  * drop `Trans` module
  * `Free` refactoring
  * drop `rxjs` dependency
  * drop `lib-jsnext` folder
  * make `None` constructor private
  * remove `Pointed` and `Copointed` type classes

# 0.2.9

* **New Feature**
  * add Monoidal type class (@gcanti)
* **Bug Fix**
  * fix `foldMap`, closes #89 (@gcanti)
  * replace `instanceof` checks with valued `_tag`s, fix #96 (@gcanti, @sledorze)

# 0.2.8

* **New Feature**
  * Monoid: add `getFunctionStaticMonoid`, closes #70 (@gcanti)
  * Foldable: add `traverse_` and `sequence_`, closes #71 (@gcanti)
  * add `getStaticMonad` to `EitherT`, `OptionT`, `ReaderT`, closes #81 (@gcanti)
  * Applicative: add `when`, closes #77 (@gcanti)
  * indexed monad type class and `IxMonadT`, closes #73 (@gcanti)
  * Array / function: add refinements, closes #68 (@gcanti, @sledorze)
* **Bug Fix**
  * Either: `of` should return `Either`, fix #80 (@gcanti)
  * fix `toArray` (@gcanti)

# 0.2.7

* **New Feature**
  * `Foldable` module: add `intercalate` function, fix #65 (@gcanti)
  * Add `Profunctor` typeclass, fix #33 (@gcanti, @sledorze)
  * Add `These`, fix #47 (@gcanti)
  * `Apply` module: add `applyFirst` and `applySecond`, fix #60 (@sledorze)
* **Bug Fix**
  * fix `Either.ap` (@sledorze)

# 0.2.6

* **Polish**
  * expose experimental modules (@danielepolencic, @gcanti)

# 0.2.5

* **New Feature**
  * add `getOrElse` to `Either`, fix #39 (@sledorze)
  * add composition of functors, applicatives, foldables, traversables, fix #53 (@gcanti)
* **Experimental**
  * add `EitherT`, fix #36 (@gcanti)
  * add `OptionT`, fix #37 (@gcanti)
  * add `ReaderT`, fix #38 (@gcanti)
  * add `Trans` typeclass (`liftT`), fix #40 (@gcanti)
  * add `Free`, fix #42 (@gcanti)

# 0.2.4

* **Polish**
  * deprecate `validation.getApplicativeS` / `validation.getStaticApplicative` (@gcanti)

# 0.2.3

* **Bug Fix**
  * fix return types of `validation.success` / `validation.failure` (@gcanti)

# 0.2.2

* **Bug Fix**
  * fix `Some.reduce` so it calls `f`, https://github.com/gcanti/fp-ts/pull/45 (@leemhenson)

# 0.2.1

* **New Feature**
  * `Semigroupoid` type class (@gcanti)
  * `Rxjs` module (@gcanti)
  * `Tuple` module (@gcanti)
  * `Dictionary` module (@gcanti)
  * add phantom types to all data structures in order to allow type extraction (@gcanti)
  * add all exports for rollup (@gcanti)

# 0.2

* **Breaking Change**
  * complete refactoring: new technique to get higher kinded types and typeclasses

# 0.1.1

* **New Feature**
  * add support for fantasy-land
* **Breaking Change**
  * complete refactoring
  * remove `data` module
  * remove `newtype` module

# 0.0.4

* **Bug Fix**
  * fix `compose` definition for 5 or more functions (@bumbleblym)

# 0.0.3

* **New Feature**
  * make Array<T> a HKT and deprecate `to`,`from` helper functions, fix #5 (@gcanti)
  * add `Traced` comonad (@bumbleblym)
  * add `getOrElse` method to `Option` (@gcanti)
  * add NonEmptyArray, fix #12 (@gcanti)
* **Polish**
  * add tslint
* **Bug Fix**
  * fix `State` definition (@gcanti)

# 0.0.2

* **Bug Fix**
  * fix `ChainRec` definition (@gcanti)

# 0.0.1

Initial release
