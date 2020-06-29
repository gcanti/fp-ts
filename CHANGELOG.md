# Changelog

> **Tags:**
>
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]
> - [Deprecation]

**Note**: Gaps between patch versions are faulty/broken releases. **Note**: A feature tagged as Experimental is in a
high state of flux, you're at risk of it changing without notice.

# 2.7.0

- **Bug Fix**
  - `These`
    - fix `ap` implementation in `getMonad` function (@gcanti)
- **New Feature**
  - `function`
    - add `hole` (type hole simulation) (@gcanti)
  - `Array`
    - add `chainWithIndex`, #1256 (@OliverJAsh)
    - add `functorArray` instance (@gcanti)
    - add `functorWithIndexArray` instance (@gcanti)
    - add `applicativeArray` instance (@gcanti)
    - add `monadArray` instance (@gcanti)
    - add `unfoldableArray` instance (@gcanti)
    - add `altArray` instance (@gcanti)
    - add `alternativeArray` instance (@gcanti)
    - add `extendArray` instance (@gcanti)
    - add `compactableArray` instance (@gcanti)
    - add `filterableArray` instance (@gcanti)
    - add `filterableWithIndexArray` instance (@gcanti)
    - add `foldableArray` instance (@gcanti)
    - add `foldableWithIndexArray` instance (@gcanti)
    - add `traversableArray` instance (@gcanti)
    - add `traversableWithIndexArray` instance (@gcanti)
    - add `witherableArray` instance (@gcanti)
  - `Const`
    - add `functorConst` instance (@gcanti)
    - add `contravariantConst` instance (@gcanti)
    - add `bifunctorConst` instance (@gcanti)
  - `Either`
    - add `getApplicativeValidation` constrained instance (@gcanti)
    - add `getAltValidation` constrained instance (@gcanti)
    - add `functorEither` instance (@gcanti)
    - add `applicativeEither` instance (@gcanti)
    - add `monadEither` instance (@gcanti)
    - add `foldableEither` instance (@gcanti)
    - add `traversableEither` instance (@gcanti)
    - add `bifunctorEither` instance (@gcanti)
    - add `altEither` instance (@gcanti)
    - add `extendEither` instance (@gcanti)
    - add `chainRecEither` instance (@gcanti)
    - add `monadThrowEither` instance (@gcanti)
  - `Eq`
    - add `contravariantEq` instance (@gcanti)
  - `Identity`
    - add `functorIdentity` instance (@gcanti)
    - add `applicativeIdentity` instance (@gcanti)
    - add `monadIdentity` instance (@gcanti)
    - add `foldableIdentity` instance (@gcanti)
    - add `traversableIdentity` instance (@gcanti)
    - add `altIdentity` instance (@gcanti)
    - add `comonadIdentity` instance (@gcanti)
    - add `chainRecIdentity` instance (@gcanti)
  - `IO`
    - add `functorIO` instance (@gcanti)
    - add `applicativeIO` instance (@gcanti)
    - add `monadIO` instance (@gcanti)
    - add `monadIOIO` instance (@gcanti)
    - add `chainRecIO` instance (@gcanti)
  - `IOEither`
    - add `getApplicativeIOValidation` constrained instance (@gcanti)
    - add `getAltIOValidation` constrained instance (@gcanti)
    - add `functorIOEither` instance (@gcanti)
    - add `applicativeIOEither` instance (@gcanti)
    - add `monadIOEither` instance (@gcanti)
    - add `bifunctorIOEither` instance (@gcanti)
    - add `altIOEither` instance (@gcanti)
    - add `monadIOIOEither` instance (@gcanti)
    - add `monadThrowIOEither` instance (@gcanti)
  - `Map`
    - add `functorMap` instance (@gcanti)
    - add `compactableMap` instance (@gcanti)
    - add `filterableMap` instance (@gcanti)
  - `NonEmptyArray`
    - add `functorNonEmptyArray` instance (@gcanti)
    - add `functorWithIndexNonEmptyArray` instance (@gcanti)
    - add `applicativeNonEmptyArray` instance (@gcanti)
    - add `monadNonEmptyArray` instance (@gcanti)
    - add `foldableNonEmptyArray` instance (@gcanti)
    - add `foldableWithIndexNonEmptyArray` instance (@gcanti)
    - add `traversableNonEmptyArray` instance (@gcanti)
    - add `traversableWithIndexNonEmptyArray` instance (@gcanti)
    - add `altNonEmptyArray` instance (@gcanti)
    - add `comonadNonEmptyArray` instance (@gcanti)
  - `Option`
    - add `functorOption` instance (@gcanti)
    - add `applicativeOption` instance (@gcanti)
    - add `monadOption` instance (@gcanti)
    - add `foldableOption` instance (@gcanti)
    - add `altOption` instance (@gcanti)
    - add `alternativeOption` instance (@gcanti)
    - add `extendOption` instance (@gcanti)
    - add `compactableOption` instance (@gcanti)
    - add `filterableOption` instance (@gcanti)
    - add `traversableOption` instance (@gcanti)
    - add `witherableOption` instance (@gcanti)
    - add `monadThrowOption` instance (@gcanti)
  - `Ord`
    - add `contravariantOrd` instance (@gcanti)
  - `Reader`
    - add `functorReader` instance (@gcanti)
    - add `applicativeReader` instance (@gcanti)
    - add `monadReader` instance (@gcanti)
    - add `profunctorReader` instance (@gcanti)
    - add `categoryReader` instance (@gcanti)
  - `ReaderEither`
    - add `getApplicativeReaderValidation` constrained instance (@gcanti)
    - add `getAltReaderValidation` constrained instance (@gcanti)
    - add `functorReaderEither` instance (@gcanti)
    - add `applicativeReaderEither` instance (@gcanti)
    - add `monadReaderEither` instance (@gcanti)
    - add `bifunctorReaderEither` instance (@gcanti)
    - add `altReaderEither` instance (@gcanti)
    - add `monadThrowReaderEither` instance (@gcanti)
  - `ReaderTask`
    - add `functorReaderTask` instance (@gcanti)
    - add `applicativeReaderTaskPar` instance (@gcanti)
    - add `applicativeReaderTaskSeq` instance (@gcanti)
  - `ReaderTaskEither`
    - add `getApplicativeReaderTaskValidation` constrained instance (@gcanti)
    - add `getAltReaderTaskValidation` constrained instance (@gcanti)
    - add `functorReaderTaskEither` instance (@gcanti)
    - add `applicativeReaderTaskEitherPar` instance (@gcanti)
    - add `applicativeReaderTaskEitherSeq` instance (@gcanti)
    - add `bifunctorReaderTaskEither` instance (@gcanti)
    - add `altReaderTaskEither` instance (@gcanti)
  - `ReadonlyArray`
    - add `chainWithIndex`, #1256 (@OliverJAsh)
    - add `functorArray` instance (@gcanti)
    - add `functorWithIndexArray` instance (@gcanti)
    - add `applicativeArray` instance (@gcanti)
    - add `monadArray` instance (@gcanti)
    - add `unfoldableArray` instance (@gcanti)
    - add `altArray` instance (@gcanti)
    - add `alternativeArray` instance (@gcanti)
    - add `extendArray` instance (@gcanti)
    - add `compactableArray` instance (@gcanti)
    - add `filterableArray` instance (@gcanti)
    - add `filterableWithIndexArray` instance (@gcanti)
    - add `foldableArray` instance (@gcanti)
    - add `foldableWithIndexArray` instance (@gcanti)
    - add `traversableArray` instance (@gcanti)
    - add `traversableWithIndexArray` instance (@gcanti)
    - add `witherableArray` instance (@gcanti)
  - `ReadonlyMap`
    - add `functorMap` instance (@gcanti)
    - add `compactableMap` instance (@gcanti)
    - add `filterableMap` instance (@gcanti)
  - `ReadonlyNonEmptyArray`
    - add `functorNonEmptyArray` instance (@gcanti)
    - add `functorWithIndexNonEmptyArray` instance (@gcanti)
    - add `applicativeNonEmptyArray` instance (@gcanti)
    - add `monadNonEmptyArray` instance (@gcanti)
    - add `foldableNonEmptyArray` instance (@gcanti)
    - add `foldableWithIndexNonEmptyArray` instance (@gcanti)
    - add `traversableNonEmptyArray` instance (@gcanti)
    - add `traversableWithIndexNonEmptyArray` instance (@gcanti)
    - add `altNonEmptyArray` instance (@gcanti)
    - add `comonadNonEmptyArray` instance (@gcanti)
  - `ReadonlyRecord`
    - add `functorRecord` instance (@gcanti)
    - add `functorWithIndexRecord` instance (@gcanti)
    - add `foldableRecord` instance (@gcanti)
    - add `compactableRecord` instance (@gcanti)
    - add `filterableRecord` instance (@gcanti)
    - add `filterableWithIndexRecord` instance (@gcanti)
    - add `traversableRecord` instance (@gcanti)
    - add `traversableWithIndexRecord` instance (@gcanti)
    - add `witherableRecord` instance (@gcanti)
  - `ReadonlyTuple`
    - add `functorTuple` instance (@gcanti)
    - add `bifunctorTuple` instance (@gcanti)
    - add `semigroupoidTuple` instance (@gcanti)
    - add `comonadTuple` instance (@gcanti)
    - add `foldableTuple` instance (@gcanti)
    - add `traversableTuple` instance (@gcanti)
  - `Record`
    - add `functorRecord` instance (@gcanti)
    - add `functorWithIndexRecord` instance (@gcanti)
    - add `foldableRecord` instance (@gcanti)
    - add `compactableRecord` instance (@gcanti)
    - add `filterableRecord` instance (@gcanti)
    - add `filterableWithIndexRecord` instance (@gcanti)
    - add `traversableRecord` instance (@gcanti)
    - add `traversableWithIndexRecord` instance (@gcanti)
    - add `witherableRecord` instance (@gcanti)
  - `State`
    - add `functorState` instance (@gcanti)
    - add `applicativeState` instance (@gcanti)
    - add `monadState` instance (@gcanti)
  - `Store`
    - add `functorStore` instance (@gcanti)
    - add `comonadStore` instance (@gcanti)
  - `StateReaderTaskEither`
    - add `functorStateReaderTaskEither` instance (@gcanti)
    - add `applicativeStateReaderTaskEither` instance (@gcanti)
    - add `bifunctorStateReaderTaskEither` instance (@gcanti)
    - add `altStateReaderTaskEither` instance (@gcanti)
  - `Task`
    - add `functorTask` instance (@gcanti)
    - add `applicativeTaskPar` instance (@gcanti)
    - add `applicativeTaskSeq` instance (@gcanti)
  - `TaskEither`
    - add `getApplicativeTaskValidation` constrained instance (@gcanti)
    - add `getAltTaskValidation` constrained instance (@gcanti)
    - add `functorTaskEither` instance (@gcanti)
    - add `applicativeTaskEitherPar` instance (@gcanti)
    - add `applicativeTaskEitherSeq` instance (@gcanti)
    - add `bifunctorTaskEither` instance (@gcanti)
    - add `altTaskEither` instance (@gcanti)
  - `TaskThese`
    - add `functorTaskThese` instance (@gcanti)
    - add `bifunctorTaskThese` instance (@gcanti)
  - `These`
    - add `getApplicative` constrained instance (@gcanti)
    - add `functorThese` instance (@gcanti)
    - add `bifunctorThese` instance (@gcanti)
    - add `foldableThese` instance (@gcanti)
    - add `traversableThese` instance (@gcanti)
  - `Traced`
    - rename `traced` to `functorTraced` for consistency (@gcanti)
  - `Tree`
    - add `functorTree` instance (@gcanti)
    - add `applicativeTree` instance (@gcanti)
    - add `monadTree` instance (@gcanti)
    - add `foldableTree` instance (@gcanti)
    - add `traversableTree` instance (@gcanti)
    - add `comonadTree` instance (@gcanti)
  - `Traced`
    - rename `writer` to `functorWriter` for consistency (@gcanti)
  - `Tuple`
    - add `functorTuple` instance (@gcanti)
    - add `bifunctorTuple` instance (@gcanti)
    - add `semigroupoidTuple` instance (@gcanti)
    - add `comonadTuple` instance (@gcanti)
    - add `foldableTuple` instance (@gcanti)
    - add `traversableTuple` instance (@gcanti)

# 2.6.7

- **Polish**
  - refine `Either.parseJSON` return type, #1252 (@OliverJAsh)
  - add missing `chainW` to `ReaderTask`, #1254 (@adameier)

# 2.6.6

- **Polish**
  - `Array`
    - export `unfold` (@gcanti)
    - make `lookup` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
    - make `difference` data-last (@gcanti)
    - make `intersection` data-last (@gcanti)
    - make `union` data-last (@gcanti)
    - make `zip` data-last (@gcanti)
    - make `cons` data-last (@gcanti)
  - `Map`
    - make `member` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
    - make `lookup` data-last (@gcanti)
    - make `lookupWithKey` data-last (@gcanti)
    - make `isSubmap` data-last (@gcanti)
  - `NonEmptyArray`
    - make `zip` data-last (@gcanti)
  - `ReadonlyArray`
    - export `unfold` (@gcanti)
    - make `lookup` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
    - make `difference` data-last (@gcanti)
    - make `intersection` data-last (@gcanti)
    - make `union` data-last (@gcanti)
    - make `zip` data-last (@gcanti)
    - make `cons` data-last (@gcanti)
  - `ReadonlyMap`
    - make `member` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
    - make `lookup` data-last (@gcanti)
    - make `lookupWithKey` data-last (@gcanti)
    - make `isSubmap` data-last (@gcanti)
  - `ReadonlyNonEmptyArray`
    - make `zip` data-last (@gcanti)
  - `ReadonlyRecord`
    - make `isSubrecord` data-last (@gcanti)
    - make `lookup` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
  - `ReadonlySet`
    - make `isSubset` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
    - make `union` data-last (@gcanti)
    - make `intersection` data-last (@gcanti)
    - make `difference` data-last (@gcanti)
  - `Record`
    - make `isSubrecord` data-last (@gcanti)
    - make `lookup` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
  - `Set`
    - make `subset` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
    - make `union` data-last (@gcanti)
    - make `intersection` data-last (@gcanti)
    - make `difference` data-last (@gcanti)
  - `Semigroup`
    - make `fold` data-last (@gcanti)

# 2.6.5

- **Polish**
  - export a pipeable `wither` function from all modules which admit a `Witherable` instance (@gcanti)
  - export a pipeable `wilt` function from all modules which admit a `Witherable` instance (@gcanti)

# 2.6.4

- **Bug Fix**
  - `ReadonlyMap`
    - `traverseWithIndex` should sort the keys (@gcanti)
  - `ReadonlyRecord`
    - `traverseWithIndex` should sort the keys (@gcanti)

# 2.6.3

- **Polish**
  - change `ReadonlyNonEmptyArray` definition to get better type inference (@gcanti)
  - move `pipe` to `function` module (@gcanti)
  - export `sequence` from all modules which admit a `Traversable` instance (@gcanti)
  - export a pipeable `traverse` function from all modules which admit a `Traversable` instance (@gcanti)
  - export a pipeable `traverseWithIndex` function from all modules which admit a `TraversableWithIndex` instance (@gcanti)
  - remove monad transformers imports from all modules (@gcanti)

# 2.6.2

The goal of this release is to make `fp-ts` more "tree shaking" friendly.

- **Polish**
  - add `/*@__PURE__*/` comments to pipeables (@gcanti)
  - add `/*@__PURE__*/` comments to transformers (@gcanti)
  - remove `pipeable.ts` module imports (@gcanti)

# 2.6.1

- **New Feature**
  - add W variants, closes #904 (@gcanti)
  - `Const`
    - add missing instances, #1201 (@gcanti)
  - `Date`
    - add `eqDate`, `eqMonth`, `eqYear` (@gcanti)
  - `Either`
    - add `getOrElseW` (@gcanti)
    - add `chainW` (@gcanti)
  - `Eq`
    - add `getMonoid` (@gcanti)
  - `IOEither`
    - add `getOrElseW` (@gcanti)
    - add `chainW` (@gcanti)
    - add `chainEitherKW` (@giogonzo)
  - `Option`
    - add `getOrElseW` (@gcanti)
  - `Reader`
    - add `chainW` (@gcanti)
  - `ReaderEither`
    - add `getOrElseW` (@gcanti)
    - add `chainW` (@gcanti)
    - add `chainEitherKW` (@giogonzo)
  - `ReaderTaskEither`
    - add `getOrElseW` (@gcanti)
    - add `chainW` (@gcanti)
    - add `chainEitherKW` (@giogonzo)
    - add `chainTaskEitherKW` (@giogonzo)
    - add `chainIOEitherKW` (@giogonzo)
  - `StateReaderTaskEither`
    - add `chainW` (@gcanti)
    - add `chainEitherKW` (@giogonzo)
    - add `chainTaskEitherKW` (@giogonzo)
    - add `chainReaderTaskEitherKW` (@giogonzo)
    - add `chainIOEitherKW` (@giogonzo)
  - `TaskEither`
    - add `getOrElseW` (@gcanti)
    - add `chainW` (@gcanti)
    - add `chainEitherKW` (@giogonzo)
    - add `chainIOEitherKW` (@giogonzo)
  - `Tree`
    - add `fold` function (@gcanti)

# 2.5.4

- **Polish**
  - `StateT`
    - add missing `StateM2C` and `StateM3C` (@qlonik)

# 2.5.3

- **Polish**
  - `Either`
    - add missing instances to `getValidation` (@gcanti)
  - `IOEither`
    - relax `Bifunctor2C` to `Bifunctor2` in `getIOValidation` (@gcanti)
  - `ReaderEither`
    - relax `Bifunctor3C` to `Bifunctor3` in `getReaderValidation` (@gcanti)
  - `ReaderTaskEither`
    - relax `Bifunctor3C` to `Bifunctor3` in `getReaderTaskValidation` (@gcanti)
  - `TaskEither`
    - relax `Bifunctor2C` to `Bifunctor2` in `getTaskValidation` (@gcanti)

# 2.5.1

- **New Feature**
  - `Eq`
    - add `eqStrict`, closes #965 (@gcanti)
  - `NonEmptyArray`
    - add `fold` (@vicrac)
    - add `zip`, `zipWith` and `unzip`, closes #1109 (@gcanti)
  - `Semigroup`
    - add `getIntercalateSemigroup` (@gcanti)
  - `Set`
    - add `toggle` (@ryota-ka)
  - `TaskEither`
    - add `tryCatchK` (@DenisFrezzato)
  - `These`
    - add missing `MonadThrow` instance (@gcanti)
  - `ReaderTaskEither`
    - add missing `leftReaderTask`, `rightReaderTask` functions (@gcanti)
  - `StateReaderTaskEither`
    - add missing `Bifunctor`, `Alt` instances (@gcanti)
- **Experimental**
  - add `ReadonlyArray` module (@gcanti)
  - add `ReadonlyNonEmptyArray` module (@gcanti)
  - add `ReadonlySet` module (@gcanti)
  - add `ReadonlyMap` module (@gcanti)
  - add `ReadonlyRecord` module (@gcanti)
  - add `ReadonlyTuple` module (@gcanti)

# 2.4.4

- **Polish**
  - add missing `MonadIO4` (@mlegenhausen)
  - add missing `MonadTask4` (@mlegenhausen)
  - `StateReaderTaskEither`
    - add missing `MonadTask4` instance (@mlegenhausen)
    - add missing `filterOrElse`, `fromPredicate` combinators (@mlegenhausen)

# 2.4.3

- **Bug Fix**
  - don't set `target: es6` in `tsconfig.build-es6.json`, fix #1110 (@gcanti)

# 2.4.2

- **Bug Fix**
  - fix `Invariant` definition (@gcanti)

# 2.4.1

- **Polish**
  - `NonEmptyArray`
    - add overloading to `group` managing non empty arrays, closes #831 (@gcanti)
    - `foldMap` and `foldMapWithIndex` now require a `Semigroup` instead of a `Monoid` (@gcanti)

# 2.4.0

- **New Feature**
  - add `WriterT` module, closes #1050 (@gcanti)
  - add `TheseT` module (@gcanti)
  - add `TaskThese` module (@gcanti)
  - `function`
    - add `tupled`, `untupled` functions, closes #1062 (@gcanti)
  - `IOEither`
    - add `fromEitherK`, `chainEitherK` (@gcanti)
  - `ReaderEither`
    - add `fromEitherK`, `chainEitherK` (@gcanti)
  - `ReaderTask`
    - add `run` (@gcanti)
    - add `fromIOK`, `chainIOK`, `fromTaskK`, `chainTaskK` (@gcanti)
  - `ReaderTaskEither`
    - add `fromEitherK`, `chainEitherK`, `fromIOEitherK`, `chainIOEitherK`, `fromTaskEitherK`, `chainTaskEitherK` (@gcanti)
  - `These`
    - add `swap` (@gcanti)
  - `Ord`
    - add `getMonoid` (@vicrac)
  - `Ordering`
    - add `monoidOrdering` (@gcanti)
  - `StateReaderTaskEither`
    - add `fromEitherK`, `chainEitherK`, `fromIOEitherK`, `chainIOEitherK`, `fromTaskEitherK`, `chainTaskEitherK`, `fromReaderTaskEitherK`, `chainReaderTaskEitherK` (@gcanti)
  - `Task`
    - add `fromIOK`, `chainIOK` (@gcanti)
  - `TaskEither`
    - add `fromEitherK`, `chainEitherK`, `fromIOEitherK`, `chainIOEitherK` (@gcanti)
- **Deprecation**
  - `Ord`
    - deprecate `getSemigroup` in favor of `getMonoid` (@gcanti)
  - `Ordering`
    - deprecate `semigroupOrdering` in favor of `monoidOrdering` (@gcanti)
- **Internal**
  - use native `Promise.race` in `Task.getRaceMonoid` (@gcanti)

# 2.3.1

- **Bug Fix**
  - `Array.ts`
    - fix `sortBy` failing on empty list of ords, #1046 (@vicrac)

# 2.3.0

- **New Feature**
  - add `ReaderTask` module (@sledorze)
  - `ReaderTaskEither`
    - add `getReaderTaskValidation` (@sledorze)
  - `ReaderEither`
    - add `getReaderValidation` (@gcanti)
  - `TaskEither`
    - improve `getTaskValidation` (@gcanti)
  - `IOEither`
    - improve `getIOValidation` (@gcanti)

# 2.2.0

- **New Feature**
  - add `boolean` module, closes #930 (@giogonzo)
  - add `ChainRec` instance to `IO` (@gcanti)
  - `NonEmptyArray`
    - add `init` (@steida)
    - add `Alt` instance (@gcanti)
- **Internal**
  - add new 3C variants and related overloads (@sledorze)

# 2.1.2

- **Bug Fix**
  - `fromNullable` now uses `NonNullable` in its return type, fixes #1004 (@gcanti)

# 2.1.1

- **Bug Fix**
  - add `sequenceT` and `sequenceS` overload signatures for `Kind4`, fixes #969 (@pfgray)

# 2.1.0

- **New Feature**
  - add constrained `Filterable` instance to `IOEither`, `TaskEither`, #959 (@giogonzo)

# 2.0.5

- **Bug Fix**
  - fix `PipeableApply2C` definition (@gcanti)

# 2.0.4

- **Polish**
  - `ReaderTaskEither`
    - add missing `bracket` function (@mlegenhausen)

# 2.0.3

- **Bug Fix**
  - fix `sequenceT`, `sequenceS` implementations, closes #914 (@gcanti)

# 2.0.2

- **Bug Fix**
  - add `reduce` to `FoldableComposition2C1` (@anilanar)

# 2.0.1

- **Bug Fix**
  - fix `PipeableBifunctor` definition (@gcanti)
  - fix `chunksOf` implementation, #897 (@gcanti)

# 2.0.0

- **Breaking Change**
  - remove deprecated APIs (@gcanti)
  - remove classes (@gcanti)
  - remove all phantom fields (@gcanti)
