---
title: Migrate from Ramda
parent: Recipes
nav_order: 7
---

# Migrate from Ramda

This guide shows you how to use `fp-ts` concepts if you have prior experience with [Ramda](https://ramdajs.com/docs/).
{: .fs-6 .fw-300 }

---

| ramda                   | fp-ts                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| add                     | [Field](../modules/Field.ts#fieldnumber-constant)                                                            |
| addIndex                |                                                                                                              |
| adjust                  | [Array.modifyAt](../modules/Array.ts#modifyat-function)                                                      |
| all                     |                                                                                                              |
| allPass                 |                                                                                                              |
| always                  | [function.constant](../modules/function.ts#constant-function)                                                |
| and                     | [Semigroup.semigroupAll](../modules/Semigroup.ts#semigroupall-constant)                                      |
| any                     |                                                                                                              |
| anyPass                 |                                                                                                              |
| ap                      | [Apply](../modules/Apply.ts)                                                                                 |
| aperture                |                                                                                                              |
| append                  | [Array.snoc](../modules/Array.ts#snoc-function)                                                              |
| apply                   | [function.apply](../modules/function.ts#apply-function)                                                      |
| applySpec               |                                                                                                              |
| applyTo                 | [function.applyFlipped](../modules/function.ts#applyflipped-function)                                        |
| ascend                  | [Ord.contramap](../modules/Ord.ts#contramap-function)                                                        |
| assoc                   | [Semigroup.getObjectSemigroup](../modules/Semigroup.ts#getobjectsemigroup-function)                          |
| assocPath               |                                                                                                              |
| binary                  |                                                                                                              |
| bind                    |                                                                                                              |
| both                    |                                                                                                              |
| call                    |                                                                                                              |
| chain                   | [Chain](../modules/Chain.ts)                                                                                 |
| clamp                   | [Ord.clamp](../modules/Ord.ts#clamp-function)                                                                |
| clone                   |                                                                                                              |
| comparator              | [Ord.fromCompare](../modules/Ord.ts#fromcompare-function)                                                    |
| complement              |                                                                                                              |
| compose                 | [function.compose](../modules/function.ts#compose-function)                                                  |
| composeK                |                                                                                                              |
| composeP                | [Task.prototype.chain](../modules/Task.ts#chain-method)                                                      |
| concat                  | [Semigroup](../modules/Semigroup.ts)                                                                         |
| cond                    |                                                                                                              |
| construct               |                                                                                                              |
| constructN              |                                                                                                              |
| contains                | [Array.elem](../modules/Array.ts#elem-function)                                                              |
| converge                |                                                                                                              |
| countBy                 |                                                                                                              |
| curry                   | [function.curry](../modules/function.ts#curry-function)                                                      |
| curryN                  |                                                                                                              |
| dec                     | [function.decrement](../modules/function.ts#decrement-function)                                              |
| defaultTo               |                                                                                                              |
| descend                 | [Ord.contramap](../modules/Ord.ts#contramap-function), [Ord.getDualOrd](../modules/Ord.ts#getdualord-function) |
| difference              |                                                                                                              |
| differenceWith          |                                                                                                              |
| dissoc                  | [Record.remove](../modules/Record.ts#remove-function)                                                        |
| dissocPath              |                                                                                                              |
| divide                  | [Field](../modules/Field.ts)                                                                                 |
| drop                    | [Array.drop](../modules/Array.ts#drop-function)                                                              |
| dropLast                | [Array.dropEnd](../modules/Array.ts#dropend-function)                                                        |
| dropLastWhile           |                                                                                                              |
| dropRepeats             |                                                                                                              |
| dropRepeatsWith         |                                                                                                              |
| dropWhile               | [Array.dropWhile](../modules/Array.ts#dropwhile-function)                                                    |
| either                  |                                                                                                              |
| empty                   |                                                                                                              |
| endWith                 |                                                                                                              |
| eqBy                    | [Setoid.contramap](../modules/Setoid.ts#contramap-function)                                                  |
| eqProps                 |                                                                                                              |
| equals                  | [Setoid](../modules/Setoid.ts)                                                                               |
| evolve                  |                                                                                                              |
| F                       | [function.constFalse](../modules/function.ts#constfalse-function)                                            |
| filter                  | [Filterable](../modules/Filterable.ts)                                                                       |
| find                    | [Array.find](../modules/Array.ts#find-function)                                                              |
| findIndex               | [Array.findIndex](../modules/Array.ts#findindex-function)                                                    |
| findLast                | [Array.findLast](../modules/Array.ts#findlast-function)                                                      |
| findLastIndex           | [Array.findLastIndex](../modules/Array.ts#findlastindex-function)                                            |
| flatten                 | [Array.flatten](../modules/Array.ts#flatten-function)                                                        |
| flip                    | [function.flip](../modules/function.ts#flip-function)                                                        |
| forEach                 |                                                                                                              |
| forEachObjIndexed       |                                                                                                              |
| fromPairs               | [Record.fromFoldable](../modules/Record.ts#fromfoldable-function)                                            |
| groupBy                 | [NonEmptyArray.groupBy](../modules/NonEmptyArray.ts#groupby-function)                                        |
| groupWith               | [NonEmptyArray.group](../modules/NonEmptyArray.ts#group-function), [NonEmptyArray.groupSort](../modules/Array.ts#groupsort-function) |
| gt                      | [Ord.greaterThan](../modules/Ord.ts#greaterthan-function)                                                    |
| gte                     | [Ord.greaterThanOrEq](../modules/Ord.ts#greaterthanoreq-function)                                            |
| has                     | [Map.member](../modules/Map.ts#member-function)                                                              |
| hasIn                   |                                                                                                              |
| head                    | [Array.head](../modules/Array.ts#head-function)                                                              |
| identical               | [Setoid](../modules/Setoid.ts)                                                                               |
| identity                | [function.identity](../modules/function.ts#identity-function)                                                |
| ifElse                  |                                                                                                              |
| inc                     | [function.increment](../modules/function.ts#increment-function)                                              |
| indexBy                 | [NonEmptyArray.groupBy](../modules/NonEmptyArray.ts#groupby-function)                                        |
| indexOf                 | [Array.findIndex](../modules/Array.ts#findindex-function)                                                    |
| init                    | [Array.init](../modules/Array.ts#init-function)                                                              |
| innerJoin               |                                                                                                              |
| insert                  | [Array.insertAt](../modules/Array.ts#insertat-function)                                                      |
| insertAll               |                                                                                                              |
| intersection            |                                                                                                              |
| intersperse             |                                                                                                              |
| into                    |                                                                                                              |
| invert                  |                                                                                                              |
| invertObj               |                                                                                                              |
| invoker                 |                                                                                                              |
| is                      |                                                                                                              |
| isEmpty                 |                                                                                                              |
| isNil                   | [Option.fromNullable](../modules/Option.ts#fromnullable-function)                                            |
| join                    |                                                                                                              |
| juxt                    |                                                                                                              |
| keys                    | [Map.keys](../modules/Map.ts#keys-function)                                                                  |
| keysIn                  |                                                                                                              |
| last                    | [Array.last](../modules/Array.ts#last-function)                                                              |
| lastIndexOf             | [Array.findLastIndex](../modules/Array.ts#findlastindex-function)                                            |
| length                  |                                                                                                              |
| lens                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| lensIndex               | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| lensPath                | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| lensProp                | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| lift                    |                                                                                                              |
| liftN                   | [Apply.liftAN](../modules/Apply.ts#lifta2-function)                                                          |
| lt                      | [Ord.lessThan](../modules/Ord.ts#lessthan-function)                                                          |
| lte                     | [Ord.lessThanOrEq](../modules/Ord.ts#lessthanoreq-function)                                                  |
| map                     | [Functor](../modules/Functor.ts)                                                                             |
| mapAccum                |                                                                                                              |
| mapAccumRight           |                                                                                                              |
| mapObjIndexed           |                                                                                                              |
| match                   |                                                                                                              |
| mathMod                 |                                                                                                              |
| max                     | [Ord.max](../modules/Ord.ts#max-function), [numbers recipe](../recipes/numbers)                              |
| maxBy                   |                                                                                                              |
| mean                    |                                                                                                              |
| median                  |                                                                                                              |
| memoize                 |                                                                                                              |
| memoizeWith             |                                                                                                              |
| merge                   |                                                                                                              |
| mergeAll                |                                                                                                              |
| mergeDeepLeft           |                                                                                                              |
| mergeDeepRight          |                                                                                                              |
| mergeDeepWith           |                                                                                                              |
| mergeDeepWithKey        |                                                                                                              |
| mergeWith               | [Record.getMonoid](../modules/Record.ts#getmonoid-function)                                                  |
| mergeWithKey            |                                                                                                              |
| min                     | [Ord.min](../modules/Ord.ts#min-function), [numbers recipe](../recipes/numbers)                              |
| minBy                   |                                                                                                              |
| modulo                  |                                                                                                              |
| multiply                | [Field](../modules/Field.ts)                                                                                 |
| nAry                    |                                                                                                              |
| negate                  | [Ring.negate](../modules/Ring.ts#negate-function)                                                            |
| none                    |                                                                                                              |
| not                     |                                                                                                              |
| nth                     | [Array.index](../modules/Array.ts#index-function)                                                            |
| nthArg                  |                                                                                                              |
| o                       |                                                                                                              |
| objOf                   | [Record.singleton](../modules/Record.ts#singleton-function)                                                  |
| of                      | [Array.array.of](../modules/Array.ts#array-constant)                                                         |
| omit                    |                                                                                                              |
| once                    |                                                                                                              |
| or                      | [Semigroup.semigroupAny](../modules/Semigroup.ts#semigroupany-function)                                      |
| over                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| pair                    | [function.tuple](../modules/function.ts#tuple-function), [function.tupleCurried](../modules/function.ts#tuplecurried-function) |
| partial                 |                                                                                                              |
| partialRight            |                                                                                                              |
| partition               | [Filterable](../modules/Filterable.ts)                                                                       |
| path                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| pathEq                  |                                                                                                              |
| pathOr                  |                                                                                                              |
| pathSatisfies           |                                                                                                              |
| pick                    |                                                                                                              |
| pickAll                 |                                                                                                              |
| pickBy                  |                                                                                                              |
| pipe                    | [function.pipe](../modules/function.ts#pipe-function)                                                        |
| pipeK                   |                                                                                                              |
| pipeP                   |                                                                                                              |
| pluck                   |                                                                                                              |
| prepend                 | [Array.cons](../modules/Array.ts#cons-function)                                                              |
| product                 | [Foldable.product](../modules/Foldable.ts#product-function)                                                  |
| project                 |                                                                                                              |
| prop                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| propEq                  |                                                                                                              |
| propIs                  |                                                                                                              |
| propOr                  |                                                                                                              |
| props                   |                                                                                                              |
| propSatisfies           |                                                                                                              |
| range                   | [Array.range](../modules/Array.ts#range-function)                                                            |
| reduce                  | [Foldable](../modules/Foldable.ts)                                                                           |
| reduceBy                |                                                                                                              |
| reduced                 |                                                                                                              |
| reduceRight             | [Foldable](../modules/Foldable.ts)                                                                           |
| reduceWhile             |                                                                                                              |
| reject                  |                                                                                                              |
| remove                  |                                                                                                              |
| repeat                  | [Array.replicate](../modules/Array.ts#replicate-function)                                                    |
| replace                 |                                                                                                              |
| reverse                 | [Array.reverse](../modules/Array.ts#reverse-function)                                                        |
| scan                    | [Array.scanLeft](../modules/Array.ts#scanLeft-function)                                                      |
| sequence                | [Traversable](../modules/Traversable.ts)                                                                     |
| set                     | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| slice                   |                                                                                                              |
| sort                    | [Array.sort](../modules/Array.ts#sort-function)                                                              |
| sortBy                  | [Array.sort](../modules/Array.ts#sort-function)                                                              |
| sortWith                | [Ord.getSemigroup](../modules/Ord.ts#getsemigroup-function)                                                  |
| split                   |                                                                                                              |
| splitAt                 | [Array.split](../modules/Array.ts#split-function)                                                            |
| splitEvery              | [Array.chunksOf](../modules/Array.ts#chunksof-function)                                                      |
| splitWhen               |                                                                                                              |
| startsWith              |                                                                                                              |
| subtract                | [Ring](../modules/Ring.ts)                                                                                   |
| sum                     | see [numbers recipe](../recipes/numbers)                                                                     |
| symmetricDifference     |                                                                                                              |
| symmetricDifferenceWith |                                                                                                              |
| T                       | [function.constTrue](../modules/function.ts#consttrue-function)                                              |
| tail                    | [Array.tail](../modules/Array.ts#tail-function)                                                              |
| take                    | [Array.take](../modules/Array.ts#take-function)                                                              |
| takeLast                | [Array.takeEnd](../modules/Array.ts#takeend-function)                                                        |
| takeLastWhile           |                                                                                                              |
| takeWhile               | [Array.takeWhile](../modules/Array.ts#takewhile-function)                                                    |
| tap                     |                                                                                                              |
| test                    |                                                                                                              |
| times                   | [Array.makeBy](../modules/Array.ts#makeby-function)                                                          |
| toLower                 |                                                                                                              |
| toPairs                 | [Record.toUnfoldable](../modules/Record.ts#tounfoldable-function)                                            |
| toPairsIn               |                                                                                                              |
| toString                | [function.toString](../modules/function.ts#tostring-function)                                                |
| toUpper                 |                                                                                                              |
| transduce               |                                                                                                              |
| transpose               |                                                                                                              |
| traverse                | [Traversable](../modules/Traversable.ts)                                                                     |
| tryCatch                | [IOEither.tryCatch](../modules/IOEither.ts#trycatch)                                                         |
| type                    |                                                                                                              |
| unapply                 |                                                                                                              |
| unary                   |                                                                                                              |
| uncurryN                |                                                                                                              |
| unfold                  | [Unfoldable](../modules/Unfoldable.ts)                                                                       |
| union                   |                                                                                                              |
| unionWith               |                                                                                                              |
| uniq                    | [Array.uniq](../modules/Array.ts#uniq-function)                                                              |
| uniqBy                  |                                                                                                              |
| uniqWith                | [Array.uniq](../modules/Array.ts#uniq-function)                                                              |
| unless                  |                                                                                                              |
| unnest                  | [Chain.flatten](../modules/Chain.ts#flatten-function)                                                        |
| until                   |                                                                                                              |
| update                  | [Array.updateAt](../modules/Array.ts#updateat-function), [Array.unsafeUpdateAt](../modules/Array.ts#unsafeupdateat-function) |
| useWith                 |                                                                                                              |
| values                  | [Map.values](../modules/Map.ts#values-function)                                                              |
| valuesIn                |                                                                                                              |
| view                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| when                    |                                                                                                              |
| where                   |                                                                                                              |
| whereEq                 |                                                                                                              |
| without                 |                                                                                                              |
| xprod                   | [Array.array.chain](../modules/Array.ts#array-constant)                                                      |
| zip                     | [Array.zip](../modules/Array.ts#zip-function)                                                                |
| zipObj                  |                                                                                                              |
| zipWith                 | [Array.zipWith](../modules/Array.ts#zipwith-function)                                                        |
