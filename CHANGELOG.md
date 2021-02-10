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

**Note**: Gaps between patch versions are faulty/broken releases.
**Note**: A feature tagged as Experimental is in a
high state of flux, you're at risk of it changing without notice.

# 2.10.0

- **Deprecations**
  - deprecate `pipeable` module, use the specific helpers instead (@gcanti)
  - deprecate `ValidationT` module, use `EitherT` instead (@gcanti)
  - deprecate "mega instances", use small, specific instances instead (@gcanti)
  - deprecate the old monad transformers, use the specific helpers instead (@gcanti)
  - `Applicative`
    - deprecate `getApplicativeComposition`, use `ap` helper instead (@gcanti)
  - `BooleanAlgebra`
    - deprecate `booleanAlgebraBoolean`, use `boolean.BooleanAlgebra` instead (@gcanti)
    - deprecate `getFunctionBooleanAlgebra`, use `function.getBooleanAlgebra` instead (@gcanti)
    - deprecate `getDualBooleanAlgebra`, use `reverse` instead (@gcanti)
  - `Bounded`
    - deprecate `boundedNumber`, use `number.Bounded` instead (@gcanti)
  - `Compactable`
    - deprecate `getCompactableComposition`, use `compact`, `separate` helpers instead (@gcanti)
    - deprecate `Separated`, use `Separated.Separated` instead (@gcanti)
  - `Either`
    - deprecate `getApplySemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getApplyMonoid` in favour of `Applicative.getApplicativeMonoid` (@gcanti)
    - deprecate `getValidationSemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getValidationMonoid` in favour of `Applicative.getApplicativeMonoid` (@gcanti)
    - deprecate `getValidation`, use `getApplicativeValidation` and `getAltValidation` instead (@gcanti)
  - `Eq`
    - deprecate `eqBoolean`, use `boolean.Eq` instead (@gcanti)
    - deprecate `eqString`, use `string.Eq` instead (@gcanti)
    - deprecate `eqNumber`, use `number.Eq` instead (@gcanti)
    - deprecate `eqDate`, use `Date.Eq` instead (@gcanti)
    - deprecate `getStructEq`, use `struct` instead (@gcanti)
    - deprecate `getTupleEq`, use `tuple` instead (@gcanti)
  - `Filterable`
    - deprecate `getFilterableComposition`, use `filter`, `filterMap`, `partition`, `partitionMap` helpers instead (@gcanti)
  - `Foldable`
    - deprecate `toArray` in favour of `toReadonlyArray` (@gcanti)
    - deprecate `getFoldableComposition`, use `reduce`, `foldMap`, `reduceRight` helpers instead (@gcanti)
  - `FoldableWithIndex`
    - deprecate `getFoldableWithIndexComposition`, use `reduceWithIndex`, `foldMapWithIndex`, `reduceRightWithIndex` helpers instead (@gcanti)
  - `Functor`
    - deprecate `getFunctorComposition`, use `map` helper instead (@gcanti)
  - `FunctorWithIndex`
    - deprecate `getFunctorWithIndexComposition`, use `mapWithIndex` helper instead (@gcanti)
  - `IO`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getMonoid` in favour of `Applicative.getApplicativeMonoid` (@gcanti)
    - deprecate `fromIO` (@gcanti)
  - `IOEither`
    - deprecate `getApplySemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getApplyMonoid` in favour of `Applicative.getApplicativeMonoid` (@gcanti)
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getIOValidation`, use `getApplicativeIOValidation` and `getAltIOValidation` instead (@gcanti)
  - `Monoid`
    - deprecate `monoidAll`, use `boolean.MonoidAll` instead (@gcanti)
    - deprecate `monoidAny`, use `boolean.MonoidAny` instead (@gcanti)
    - deprecate `getFunctionMonoid`, use `function.getMonoid` instead (@gcanti)
    - deprecate `getEndomorphismMonoid`, use `function.getEndomorphismMonoid` instead (**Note**. The execution order in
      `function.getEndomorphismMonoid` is reversed) (@gcanti)
    - deprecate `monoidString`, use `string.Monoid` instead (@gcanti)
    - deprecate `monoidSum`, use `number.MonoidSum` instead (@gcanti)
    - deprecate `monoidProduct`, use `number.MonoidProduct` instead (@gcanti)
    - deprecate `fold`, use `concatAll` instead (@gcanti)
    - deprecate `getMeetMonoid`, use `min` instead (@gcanti)
    - deprecate `getJoinMonoid`, use `max` instead (@gcanti)
    - deprecate `getDualMonoid`, use `reverse` instead (@gcanti)
    - deprecate `getStructMonoid`, use `struct` instead (@gcanti)
    - deprecate `getTupleMonoid`, use `tuple` instead (@gcanti)
  - `NonEmptyArray`
    - deprecate `fold`, use `concatAll` instead (@gcanti)
  - `Option`
    - deprecate `getApplySemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getApplyMonoid` in favour of `Applicative.getApplicativeMonoid` (@gcanti)
  - `Ord`
    - deprecate `ordBoolean`, use `boolean.Ord` instead (@gcanti)
    - deprecate `ordString`, use `string.Ord` instead (@gcanti)
    - deprecate `ordNumber`, use `number.Ord` instead (@gcanti)
    - deprecate `ordDate`, use `Date.Ord` instead (@gcanti)
    - deprecate `getDualOrd`, use `reverse` instead (@gcanti)
    - deprecate `getTupleOrd`, use `tuple` instead (@gcanti)
  - `Ordering`
    - deprecate `eqOrdering`, use `Eq` instead (@gcanti)
    - deprecate `monoidOrdering`, use `Monoid` instead (@gcanti)
  - `Ring`
    - deprecate `getFunctionRing`, use `function.getRing` instead (@gcanti)
  - `Reader`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getMonoid` in favour of `Applicative.getApplicativeMonoid` (@gcanti)
  - `ReaderEither`
    - deprecate `getApplySemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getApplyMonoid` in favour of `Applicative.getApplicativeMonoid` (@gcanti)
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getReaderValidation`, use `getApplicativeReaderValidation` and `getAltReaderValidation` instead (@gcanti)
    - deprecate `local`, Use `Reader`'s `local` instead (@gcanti)
  - `ReaderTask`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getMonoid` in favour of `Applicative.getApplicativeMonoid` (@gcanti)
    - deprecate `run` (@gcanti)
    - deprecate `local`, Use `Reader`'s `local` instead (@gcanti)
  - `ReaderTaskEither`
    - deprecate `getApplySemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getApplyMonoid` in favour of `Applicative.getApplicativeMonoid` (@gcanti)
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getReaderTaskValidation`, use `getApplicativeReaderTaskValidation` and `getAltReaderTaskValidation` instead (@gcanti)
    - deprecate `run` (@gcanti)
    - deprecate `local`, Use `Reader`'s `local` instead (@gcanti)
  - `ReaderTaskEither`
    - deprecate `run` (@gcanti)
  - `ReadonlyNonEmptyArray`
    - deprecate `fold`, use `concatAll` instead (@gcanti)
  - `Ring`
    - deprecate `getTupleRing`, use `tuple` instead (@gcanti)
  - `Semigroup`
    - deprecate `semigroupAll`, use `boolean.SemigroupAll` instead (@gcanti)
    - deprecate `semigroupAny`, use `boolean.SemigroupAny` instead (@gcanti)
    - deprecate `getFunctionSemigroup`, use `function.getSemigroup` instead (@gcanti)
    - deprecate `semigroupString`, use `string.Semigroup` instead (@gcanti)
    - deprecate `semigroupSum`, use `number.SemigroupSum` instead (@gcanti)
    - deprecate `semigroupProduct`, use `number.SemigroupProduct` instead (@gcanti)
    - deprecate `fold`, use `concatAll` instead (@gcanti)
    - deprecate `getIntercalateSemigroup`, use `intercalate` instead (@gcanti)
    - deprecate `getMeetSemigroup`, use `min` instead (@gcanti)
    - deprecate `getJoinSemigroup`, use `max` instead (@gcanti)
    - deprecate `getDualSemigroup`, use `reverse` instead (@gcanti)
    - deprecate `getStructSemigroup`, use `struct` instead (@gcanti)
    - deprecate `getTupleSemigroup`, use `tuple` instead (@gcanti)
    - deprecate `getFirstSemigroup`, use `first` instead (@gcanti)
    - deprecate `getLastSemigroup`, use `last` instead (@gcanti)
    - deprecate `getObjectSemigroup`, use `assign` instead (@gcanti)
  - `Show`
    - deprecate `showBoolean`, use `boolean.Show` instead (@gcanti)
    - deprecate `showString`, use `string.Show` instead (@gcanti)
    - deprecate `showNumber`, use `number.Show` instead (@gcanti)
    - deprecate `getStructShow`, use `struct` instead (@gcanti)
    - deprecate `getTupleShow`, use `tuple` instead (@gcanti)
  - `Task`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getMonoid` in favour of `Applicative.getApplicativeMonoid` (@gcanti)
    - deprecate `fromTask` (@gcanti)
  - `TaskEither`
    - deprecate `getApplySemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getApplyMonoid` in favour of `Applicative.getApplicativeMonoid` (@gcanti)
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `getTaskValidation`, use `getApplicativeTaskValidation` and `getAltTaskValidation` instead (@gcanti)
  - `TaskThese`
    - deprecate `functorTaskThese` instance in favour of `Functor` (@gcanti)
    - deprecate `bifunctorTaskThese` instance in favour of `Bifunctor` (@gcanti)
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup` (@gcanti)
    - deprecate `toTuple` in favour of `toTuple2` (@gcanti)
  - `These`
    - deprecate `toTuple` in favour of `toTuple2` (@gcanti)
  - `Traversable`
    - deprecate `getTraversableComposition`, use `traverse`, `sequence` helpers instead (@gcanti)
- **New Feature**
  - add `Pointed` type class (@gcanti)
  - add `FromEither` type class (@gcanti)
  - add `FromIO` type class (@gcanti)
  - add `FromTask` type class (@gcanti)
  - add `TaskOption` module (@gcanti)
  - add `string` module (@gcanti)
  - add `Separated` module (@YBogomolov)
  - `Apply`
    - add `ap` helper (@gcanti)
    - add `apS` helper (@gcanti)
    - add `apFirst` helper (@gcanti)
    - add `apSecond` helper (@gcanti)
    - add `getApplySemigroup` (@gcanti)
  - `Applicative`
    - add `getApplicativeMonoid` (@gcanti)
  - `Array`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
    - add `matchLeft` instance (@gcanti)
    - add `matchRight` instance (@gcanti)
  - `boolean`
    - add `foldW` (@gcanti)
    - add `match` instance (@gcanti)
    - add `matchW` instance (@gcanti)
    - add `Eq` instance (@gcanti)
    - add `BooleanAlgebra` instance (@gcanti)
    - add `SemigroupAll` instance (@gcanti)
    - add `SemigroupAny` instance (@gcanti)
    - add `MonoidAll` instance (@gcanti)
    - add `MonoidAny` instance (@gcanti)
    - add `Ord` instance (@gcanti)
    - add `Show` instance (@gcanti)
  - `BooleanAlgebra`
    - add `reverse` (@gcanti)
  - `Compactable`
    - add `compact` helper (@gcanti)
    - add `separate` helper (@gcanti)
    - add `separated` constructor (@gcanti)
  - `Date`
    - add `Eq` instance (@gcanti)
    - add `Ord` instance (@gcanti)
  - `Filterable`
    - add `filter` helper (@gcanti)
    - add `filterMap` helper (@gcanti)
    - add `partition` helper (@gcanti)
    - add `partitionMap` helper (@gcanti)
  - `Foldable`
    - add `reduce` helper (@gcanti)
    - add `foldaMap` helper (@gcanti)
    - add `reduceRight` helper (@gcanti)
  - `FoldableWithIndex`
    - add `reduceWithIndex` helper (@gcanti)
    - add `foldaMapWithIndex` helper (@gcanti)
    - add `reduceRightWithIndex` helper (@gcanti)
  - `function`
    - add `getBooleanAlgebra` (@gcanti)
    - add `getSemigroup` (@gcanti)
    - add `getMonoid` (@gcanti)
    - add `getSemiring` (@gcanti)
    - add `getRing` (@gcanti)
    - add `getEndomorphismMonoid` (@gcanti)
  - `Functor`
    - add `map` helper (@gcanti)
    - add `bindTo` helper (@gcanti)
    - add `flap` derivable, #1393 (@williamareynolds)
  - `FunctorWithIndex`
    - add `mapWithIndex` helper (@gcanti)
  - `Either`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
    - add `getCompactable` (@gcanti)
    - add `getFilterable` (@gcanti)
    - add `FromEither` instance (@gcanti)
    - add `toUnion`, closes #1362 (@gcanti)
    - add `foldW` (@gcanti)
    - add `match` instance (@gcanti)
    - add `matchW` instance (@gcanti)
    - add `orElseW` (@gcanti)
    - add `tryCatchK` (@gcanti)
    - add `fromOptionK` (@gcanti)
    - add `chainOptionK` (@gcanti)
  - `EitherT`
    - split `getEitherM` into separated functions (@gcanti)
  - `Eq`
    - add `getSemigroup` (@gcanti)
    - add `struct` (@gcanti)
    - add `tuple` (@gcanti)
  - `Identity`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
  - `IO`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
    - add `FromIO` instance (@gcanti)
  - `IOEither`
    - add `Pointed` instance (@gcanti)
    - add `getCompactable` (@gcanti)
    - add `FromIO` instance (@gcanti)
    - add `FromEither` instance (@gcanti)
    - add `tryCatchK` combinator (@gcanti)
    - add `toUnion` (@gcanti)
    - add `foldW` (@gcanti)
    - add `match` instance (@gcanti)
    - add `matchW` instance (@gcanti)
    - add `orElseW` (@gcanti)
    - add `fromOptionK` (@gcanti)
    - add `chainOptionK` (@gcanti)
  - `Monad`
    - add `bind` helper (@gcanti)
    - add `chainFirst` helper (@gcanti)
  - `Monoid`
    - add `concatAll` (@gcanti)
    - add `min` (@gcanti)
    - add `max` (@gcanti)
    - add `reverse` (@gcanti)
    - add `struct` (@gcanti)
    - add `tuple` (@gcanti)
  - `NonEmptyArray`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
    - add `concatAll` (@gcanti)
  - `Option`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
    - add `foldW` (@gcanti)
    - add `match` instance (@gcanti)
    - add `matchW` instance (@gcanti)
    - add `tryCatchK` (@gcanti)
  - `OptionT`
    - split `getOptionM` into separated functions (@gcanti)
  - `Ord`
    - add `equalsDefault` (@gcanti)
    - add `reverse` (@gcanti)
    - add `tuple` (@gcanti)
  - `Ordering`
    - add `Eq` instance (@gcanti)
    - add `Semigroup` instance (@gcanti)
    - add `Monoid` instance (@gcanti)
  - `Random`
    - add `randomElem` (@gcanti)
  - `Reader`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
  - `ReaderT`
    - split `getReaderM` into separated functions (@gcanti)
  - `ReaderEither`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
    - add `FromEither` instance (@gcanti)
    - add `getCompactable` (@gcanti)
    - add `getFilterable` (@gcanti)
    - add `toUnion` (@gcanti)
    - add `foldW` (@gcanti)
    - add `match` instance (@gcanti)
    - add `matchW` instance (@gcanti)
    - add `orElseW` (@gcanti)
    - add `fromOptionK` (@gcanti)
    - add `chainOptionK` (@gcanti)
  - `ReaderTask`
    - add `Pointed` instance (@gcanti)
    - add `ApplyPar` instance (@gcanti)
    - add `ApplySeq` instance (@gcanti)
    - add `FromIO` instance (@gcanti)
    - add `FromTask` instance (@gcanti)
    - add `traverseSeqArrayWithIndex` (@gcanti)
    - add `traverseSeqArray` (@gcanti)
    - add `sequenceSeqArray` (@gcanti)
  - `ReaderTaskEither`
    - add `Pointed` instance (@gcanti)
    - add `ApplyPar` instance (@gcanti)
    - add `ApplySeq` instance (@gcanti)
    - add `FromIO` instance (@gcanti)
    - add `FromTask` instance (@gcanti)
    - add `FromEither` instance (@gcanti)
    - add `getCompactable` (@gcanti)
    - add `getFilterable` (@gcanti)
    - add `toUnion` (@gcanti)
    - add `foldW` (@gcanti)
    - add `match` instance (@gcanti)
    - add `matchW` instance (@gcanti)
    - add `orElseW` (@gcanti)
    - add `fromOptionK` (@gcanti)
    - add `chainOptionK` (@gcanti)
  - `ReadonlyArray`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
    - add `getSemigroup` (@gcanti)
    - add `matchLeft` instance (@gcanti)
    - add `matchRight` instance (@gcanti)
  - `ReadonlyMap`
    - add `filterWithIndex` combinator (@gcanti)
    - add `filterMapWithIndex` combinator (@gcanti)
    - add `partitionWithIndex` combinator (@gcanti)
    - add `partitionMapWithIndex` combinator (@gcanti)
    - add `getFunctorWithIndex` (@gcanti)
    - add `getFoldable` (@gcanti)
    - add `getFoldableWithIndex` (@gcanti)
    - add `getTraversable` (@gcanti)
    - add `getTraversableWithIndex` (@gcanti)
  - `ReadonlyNonEmptyArray`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
    - add `concatAll` (@gcanti)
  - `Ring`
    - add `tuple` (@gcanti)
  - `Semigroup`
    - add `constant` (@gcanti)
    - add `concatAll` (@gcanti)
    - add `intercalate` (@gcanti)
    - add `min` (@gcanti)
    - add `max` (@gcanti)
    - add `struct` (@gcanti)
    - add `tuple` (@gcanti)
    - add `first` (@gcanti)
    - add `last` (@gcanti)
    - add `assign` (@gcanti)
  - `Show`
    - add `struct` (@gcanti)
    - add `tuple` (@gcanti)
  - `State`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
  - `StateT`
    - split `getStateM` into separated functions (@gcanti)
  - `StateReaderTaskEither`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `FromIO` instance (@gcanti)
    - add `FromTask` instance (@gcanti)
    - add `FromEither` instance (@gcanti)
    - add `fromOptionK` (@gcanti)
    - add `chainOptionK` (@gcanti)
  - `Task`
    - add `Pointed` instance (@gcanti)
    - add `ApplyPar` instance (@gcanti)
    - add `ApplySeq` instance (@gcanti)
    - add `FromIO` instance (@gcanti)
    - add `FromTask` instance (@gcanti)
  - `TaskEither`
    - add `Pointed` instance (@gcanti)
    - add `ApplyPar` instance (@gcanti)
    - add `ApplySeq` instance (@gcanti)
    - add `getCompactable` (@gcanti)
    - add `FromIO` instance (@gcanti)
    - add `FromTask` instance (@gcanti)
    - add `FromEither` instance (@gcanti)
    - add `toUnion` (@gcanti)
    - add `foldW` (@gcanti)
    - add `match` instance (@gcanti)
    - add `matchW` instance (@gcanti)
    - add `orElseW` (@gcanti)
    - add `fromOptionK` (@gcanti)
    - add `chainOptionK` (@gcanti)
  - `TaskThese`
    - add `Functor` instance (@gcanti)
    - add `Pointed` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `toTuple2` (@gcanti)
    - add `getApply` (@gcanti)
    - add `FromIO` instance (@gcanti)
    - add `FromTask` instance (@gcanti)
    - add `fromEither` function (@gcanti)
    - add `FromEither` instance (@gcanti)
    - add `foldW` (@gcanti)
    - add `match` instance (@gcanti)
    - add `matchW` instance (@gcanti)
    - add `fromOption` (@gcanti)
    - add `fromOptionK` (@gcanti)
    - add `fromPredicate` (@gcanti)
  - `These`
    - add `Pointed` instance (@gcanti)
    - add `of` function (@gcanti)
    - add `getApply` (@gcanti)
    - add `toTuple2` (@gcanti)
    - add `FromEither` instance (@gcanti)
    - add `fromOption` constructor (@gcanti)
    - add `foldW` (@gcanti)
    - add `match` instance (@gcanti)
    - add `matchW` instance (@gcanti)
    - add `fromOptionK` (@gcanti)
  - `TheseT`
    - split `getTheseM` into separated functions (@gcanti)
  - `Traversable`
    - add `traverse` helper (@gcanti)
    - add `sequence` helper (@gcanti)
  - `Tree`
    - add `Pointed` instance (@gcanti)
    - add `Apply` instance (@gcanti)
  - `Writer`
    - add `getPointed` (@gcanti)
    - add `getApply` (@gcanti)
    - add `getApplicative` (@gcanti)

# 2.9.5

- **Polish**
  - `Array`, `ReadonlyArray`: change `scanLeft` and `scanRight` to return `NonEmptyArray`, `ReadonlyNonEmptyArray`, #1391 (@willheslam)

# 2.9.4

- **Bug Fix**
  - fix `filter` overloads in `NonEmptyArray` / `ReadonlyNonEmptyArray`, closes #1388 (@gcanti)

# 2.9.3

- **Polish**
  - add more `/*#__PURE__*/` comments to improve tree shaking, #1370 (@OliverJAsh)

# 2.9.2

- **Polish**
  - add more `/*#__PURE__*/` comments to improve tree shaking, #1368 (@OliverJAsh)

# 2.9.1

- **Polish**
  - `Array` / `ReadonlyArray`
    - `sort`: return the input when length <= 1, closes #1357 (@gcanti)
    - `uniq`: return the input when length <= 1 (@gcanti)

# 2.9.0

- **New Feature**

  - `Array`
    - add `altW` (@gcanti)
    - add `intersperse` (@marcotoniut)
    - add `prependToAll` (@marcotoniut)
    - add `every` (@gcanti)
    - add `some` (@gcanti)
    - add `Do` (@gcanti)
  - `Either`
    - add `altW` (@gcanti)
    - add `fromNullableK` (@gcanti)
    - add `chainNullableK` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
    - add `filterOrElseW` (@gcanti)
  - `Identity`
    - add `altW` (@gcanti)
    - add `Do` (@gcanti)
  - `IO`
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
  - `IOEither`
    - add `altW` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `traverseSeqArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseSeqArray` (@mohaalak @iamomiid)
    - add `sequenceSeqArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
    - add `filterOrElseW` (@gcanti)
  - `NonEmptyArray`
    - add `altW` (@gcanti)
    - add `uncons` (@marcotoniut)
    - add `unsnoc` (@marcotoniut)
    - add `intersperse` (@marcotoniut)
    - add `prependToAll` (@marcotoniut)
    - add `Do` (@gcanti)
  - `Option`
    - add `altW` (@gcanti)
    - add `fromNullableK` (@gcanti)
    - add `chainNullableK` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
  - `Reader`
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
  - `ReaderEither`
    - add `altW` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
    - add `filterOrElseW` (@gcanti)
  - `ReaderTask`
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `traverseSeqArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseSeqArray` (@mohaalak @iamomiid)
    - add `sequenceSeqArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
  - `ReaderTaskEither`
    - add `altW` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `traverseSeqArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseSeqArray` (@mohaalak @iamomiid)
    - add `sequenceSeqArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
    - add `filterOrElseW` (@gcanti)
  - `ReadonlyArray`
    - add `altW` (@gcanti)
    - add `intersperse` (@marcotoniut)
    - add `prependToAll` (@marcotoniut)
    - add `every` (@gcanti)
    - add `some` (@gcanti)
    - add `Do` (@gcanti)
  - `ReadonlyNonEmptyArray`
    - add `altW` (@gcanti)
    - add `uncons` (@marcotoniut)
    - add `unsnoc` (@marcotoniut)
    - add `intersperse` (@marcotoniut)
    - add `prependToAll` (@marcotoniut)
    - add `Do` (@gcanti)
  - `State`
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
  - `StateReaderTaskEither`
    - add `altW` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `filterOrElseW` (@gcanti)
  - `Task`
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `traverseSeqArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseSeqArray` (@mohaalak @iamomiid)
    - add `sequenceSeqArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
  - `TaskEither`
    - add `altW` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `traverseSeqArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseSeqArray` (@mohaalak @iamomiid)
    - add `sequenceSeqArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
    - add `filterOrElseW` (@gcanti)
  - `Tree`
    - add `Do` (@gcanti)

- **Deprecation**
  - `Option`
    - deprecate `mapNullable` in favour of `chainNullableK` (@gcanti)
  - `StateReaderTaskEither`
    - deprecate `stateReaderTaskEitherSeq` because is useless, `stateReaderTaskEither` is already sequential (@gcanti)

# 2.8.6

- **Bug Fix**
  - fix #1350 (@gcanti)

# 2.8.5

- **Polish**
  - `IOEither`
    - export missing `of` function (@gcanti)
  - `ReaderEither`
    - export missing `of` function (@gcanti)

# 2.8.4

- **Polish**
  - `IOEither`
    - add `ApplicativePar` instance (@gcanti)
    - add `ApplicativeSeq` instance (@gcanti)
- **Deprecation**
  - `IOEither`
    - deprecate `Applicative` in favour of `ApplicativePar` (@gcanti)

# 2.8.3

- **Polish**
  - `Reader`
    - export `Strong` instance (@urgent)
    - export `Choice` instance (@gcanti)

# 2.8.2

- **Polish**
  - increase the supported number of arguments of pipe function (@heka1024)
- **Bug fix**
  - revert `groupBy` change in #1286 (@gcanti)
- **Internal**
  - define all non-pipeable internal functions in terms of the corresponding pipeable versions (@gcanti)

# 2.8.1

- **Polish**
  - fix `HKT` typings duplication (which might break module augmentation)

# 2.8.0

- **New Feature**
  - expose `fp-ts` modules without lib/es6 prefix, #1241 (@StefanoMagrassi)
  - `Array`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `Either`
    - add `apW` (@gcanti)
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
    - add `chainFirstW`, #1273 (@leemhenson)
    - add `getFilterable` (@gcanti)
  - `Foldable`
    - add `toArray`, #1272 (@newswim)
    - add `reduceM` (@gcanti)
  - `Identity`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `IO`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `IOEither`
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
    - add `chainFirstW`, #1273 (@leemhenson)
  - `NonEmptyArray`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - relax `group` signature (@gcanti)
    - relax `groupBy` signature (@gcanti)
    - relax `groupSort` signature (@gcanti)
    - relax `sort` signature (@gcanti)
  - `Option`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `Reader`
    - add `apW` (@gcanti)
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
  - `ReaderEither`
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
    - add `chainFirstW`, #1273 (@leemhenson)
  - `ReaderTask`
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
  - `ReaderTaskEither`
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
    - add `chainFirstW`, #1273 (@leemhenson)
  - `ReadonlyArray`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `ReadonlyNonEmptyArray`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - relax `group` signature (@gcanti)
    - relax `groupBy` signature (@gcanti)
    - relax `groupSort` signature (@gcanti)
    - relax `sort` signature (@gcanti)
  - `State`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `evaluate` (@gcanti)
    - add `execute` (@gcanti)
  - `StateReaderTaskEither`
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
    - add `chainFirstW`, #1273 (@leemhenson)
    - add `evaluate` (@gcanti)
    - add `execute` (@gcanti)
  - `Task`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `TaskEither`
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
    - add `chainFirstW`, #1273 (@leemhenson)
  - `Tree`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `Writer`
    - add `evaluate` (@gcanti)
    - add `execute` (@gcanti)
- **Deprecation**
  - `Foldable`
    - deprecate `foldM` in favour of `reduceM` (@gcanti)
  - `State`
    - deprecate `evalState` in favour of `evaluate` (@gcanti)
    - deprecate `execState` in favour of `execute` (@gcanti)
  - `StateReaderTaskEither`
    - deprecate `evalState` in favour of `evaluate` (@gcanti)
    - deprecate `execState` in favour of `execute` (@gcanti)
  - `Writer`
    - deprecate `evalWriter` in favour of `evaluate` (@gcanti)
    - deprecate `execWriter` in favour of `execute` (@gcanti)

# 2.7.1

- **Bug Fix**
  - `ReadonlyArray`
    - fix `FunctorWithIndex` instance name (@gcanti)
    - fix `Functor` instance name (@gcanti)
- **Polish**
  - `Array`
    - relax `sort` signature (@gcanti)
    - relax `sortBy` signature (@gcanti)
  - `Map`
    - export `mapWithIndex` (@gcanti)
  - `ReadonlyArray`
    - relax `sort` signature (@gcanti)
    - relax `sortBy` signature (@gcanti)
  - `ReadonlyMap`
    - export `mapWithIndex` (@gcanti)

# 2.7.0

- **Bug Fix**
  - `These`
    - fix `ap` implementation in `getMonad` function (@gcanti)
- **Polish**
  - improve performance of sequenceT and sequenceS, fix #1255 (@gcanti)
- **New Feature**
  - `function`
    - add `hole` (type hole simulation) (@gcanti)
  - `Array`
    - add `chainWithIndex`, #1256 (@OliverJAsh)
    - add `Functor` instance (@gcanti)
    - add `FunctorWithIndex` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Unfoldable` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Alternative` instance (@gcanti)
    - add `Extend` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
    - add `FilterableWithIndex` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `FoldableWithIndex` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `TraversableWithIndex` instance (@gcanti)
    - add `Witherable` instance (@gcanti)
  - `Const`
    - add `Functor` instance (@gcanti)
    - add `Contravariant` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
  - `Either`
    - add `getApplicativeValidation` constrained instance (@gcanti)
    - add `getAltValidation` constrained instance (@gcanti)
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Extend` instance (@gcanti)
    - add `ChainRec` instance (@gcanti)
    - add `MonadThrow` instance (@gcanti)
  - `Eq`
    - add `Contravariant` instance (@gcanti)
  - `Identity`
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
    - add `ChainRec` instance (@gcanti)
  - `IO`
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `MonadIO` instance (@gcanti)
    - add `ChainRec` instance (@gcanti)
  - `IOEither`
    - add `getApplicativeIOValidation` constrained instance (@gcanti)
    - add `getAltIOValidation` constrained instance (@gcanti)
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `MonadIO` instance (@gcanti)
    - add `MonadThrow` instance (@gcanti)
  - `Map`
    - add `Functor` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
  - `NonEmptyArray`
    - add `Functor` instance (@gcanti)
    - add `FunctorWithIndex` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `FoldableWithIndex` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `TraversableWithIndex` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
  - `Option`
    - add `Functor` instance (@gcanti)
    - add `Applicativ` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Alternative` instance (@gcanti)
    - add `Extend` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `Witherable` instance (@gcanti)
    - add `MonadThrow` instance (@gcanti)
  - `Ord`
    - add `ContravariantOrd` instance (@gcanti)
  - `Reader`
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Profunctor` instance (@gcanti)
    - add `Category` instance (@gcanti)
    - add `String` instance (@gcanti)
    - add `Choice` instance (@gcanti)
  - `ReaderEither`
    - add `getApplicativeReaderValidation` constrained instance (@gcanti)
    - add `getAltReaderValidation` constrained instance (@gcanti)
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `MonadThrow` instance (@gcanti)
  - `ReaderTask`
    - add `Functor` instance (@gcanti)
    - add `ApplicativePar` instance (@gcanti)
    - add `ApplicativeSeq` instance (@gcanti)
  - `ReaderTaskEither`
    - add `getApplicativeReaderTaskValidation` constrained instance (@gcanti)
    - add `getAltReaderTaskValidation` constrained instance (@gcanti)
    - add `Functor` instance (@gcanti)
    - add `ApplicativePar` instance (@gcanti)
    - add `ApplicativeSeq` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Alt` instance (@gcanti)
  - `ReadonlyArray`
    - add `chainWithIndex`, #1256 (@OliverJAsh)
    - add `Functor` instance (@gcanti)
    - add `FunctorWithIndex` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Unfoldable` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Alternative` instance (@gcanti)
    - add `Extend` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
    - add `FilterableWithIndex` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `FoldableWithIndex` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `TraversableWithIndex` instance (@gcanti)
    - add `Witherable` instance (@gcanti)
  - `ReadonlyMap`
    - add `Functor` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
  - `ReadonlyNonEmptyArray`
    - add `Functor` instance (@gcanti)
    - add `FunctorWithIndex` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `FoldableWithIndex` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `TraversableWithIndex` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
  - `ReadonlyRecord`
    - add `Functor` instance (@gcanti)
    - add `FunctorWithIndex` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
    - add `FilterableWithIndex` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `TraversableWithIndex` instance (@gcanti)
    - add `Witherable` instance (@gcanti)
  - `ReadonlyTuple`
    - add `Functor` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Semigroupoid` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
  - `Record`
    - add `Functor` instance (@gcanti)
    - add `FunctorWithIndex` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
    - add `FilterableWithIndex` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `TraversableWithIndex` instance (@gcanti)
    - add `Witherable` instance (@gcanti)
  - `State`
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
  - `Store`
    - add `Functor` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
  - `StateReaderTaskEither`
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Alt` instance (@gcanti)
  - `Task`
    - add `Functor` instance (@gcanti)
    - add `ApplicativePar` instance (@gcanti)
    - add `ApplicativeSeq` instance (@gcanti)
  - `TaskEither`
    - add `getApplicativeTaskValidation` constrained instance (@gcanti)
    - add `getAltTaskValidation` constrained instance (@gcanti)
    - add `Functor` instance (@gcanti)
    - add `ApplicativePar` instance (@gcanti)
    - add `ApplicativeSeq` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Alt` instance (@gcanti)
  - `TaskThese`
    - add `Functor` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
  - `These`
    - add `getApplicative` constrained instance (@gcanti)
    - add `Functor` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
  - `Traced`
    - rename `traced` to `Functor` for consistency (@gcanti)
  - `Tree`
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
  - `Writer`
    - add `Functor` instance (@gcanti)
  - `Tuple`
    - add `Functor` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Semigroupoid` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)

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
