# Comparison with [ramda](https://ramdajs.com/docs/)

| ramda                   | fp-ts                                            |
| ----------------------- | ------------------------------------------------ |
| add                     | `Field`                                          |
| addIndex                |                                                  |
| adjust                  | `Array.modifyAt`                                 |
| all                     |                                                  |
| allPass                 |                                                  |
| always                  | `function.constant`                              |
| and                     | `Semigroup.semigroupAll`                         |
| any                     |                                                  |
| anyPass                 |                                                  |
| ap                      | `Apply`                                          |
| aperture                |                                                  |
| append                  | `Array.snoc`                                     |
| apply                   | `function.apply`                                 |
| applySpec               |                                                  |
| applyTo                 | `function.applyFlipped`                          |
| ascend                  | `Ord.contramap`                                  |
| assoc                   | `Semigroup.getObjectSemigroup`                   |
| assocPath               |                                                  |
| binary                  |                                                  |
| bind                    |                                                  |
| both                    |                                                  |
| call                    |                                                  |
| chain                   | `Chain`                                          |
| clamp                   | `Ord.clamp`                                      |
| clone                   |                                                  |
| comparator              | `Ord.fromCompare`                                |
| complement              |                                                  |
| compose                 | `function.compose`                               |
| composeK                |                                                  |
| composeP                | `Task.prototype.chain`                           |
| concat                  | `Semigroup`                                      |
| cond                    |                                                  |
| construct               |                                                  |
| constructN              |                                                  |
| contains                | `Array.member`                                   |
| converge                |                                                  |
| countBy                 |                                                  |
| curry                   | `function.curry`                                 |
| curryN                  |                                                  |
| dec                     | `function.decrement`                             |
| defaultTo               |                                                  |
| descend                 | `Ord.contramap`, `Ord.getDualOrd`                |
| difference              |                                                  |
| differenceWith          |                                                  |
| dissoc                  | `Record.remove`                                  |
| dissocPath              |                                                  |
| divide                  | `Field`                                          |
| drop                    | `Array.drop`                                     |
| dropLast                | `Array.dropEnd`                                  |
| dropLastWhile           |                                                  |
| dropRepeats             |                                                  |
| dropRepeatsWith         |                                                  |
| dropWhile               | `Array.dropWhile`                                |
| either                  |                                                  |
| empty                   |                                                  |
| endWith                 |                                                  |
| eqBy                    | `Setoid.contramap`                               |
| eqProps                 |                                                  |
| equals                  | `Setoid`                                         |
| evolve                  |                                                  |
| F                       | `function.constFalse`                            |
| filter                  | `Filterable`                                     |
| find                    | `Array.find`                                     |
| findIndex               | `Array.findIndex`                                |
| findLast                | `Array.findLast`                                 |
| findLastIndex           | `Array.findLastIndex`                            |
| flatten                 | `Array.flatten`                                  |
| flip                    | `function.flip`                                  |
| forEach                 |                                                  |
| forEachObjIndexed       |                                                  |
| fromPairs               | `Record.fromFoldable`                            |
| groupBy                 | `NonEmptyArray.groupBy`                          |
| groupWith               | `NonEmptyArray.group`, `NonEmptyArray.groupSort` |
| gt                      | `Ord.greaterThan`                                |
| gte                     | `Ord.greaterThanOrEq`                            |
| has                     |                                                  |
| hasIn                   |                                                  |
| head                    | `Array.head`                                     |
| identical               | `Setoid`                                         |
| identity                | `function.identity`                              |
| ifElse                  |                                                  |
| inc                     | `function.increment`                             |
| indexBy                 | `NonEmptyArray.groupBy`                          |
| indexOf                 | `Array.findIndex`                                |
| init                    | `Array.init`                                     |
| innerJoin               |                                                  |
| insert                  | `Array.insertAt`                                 |
| insertAll               |                                                  |
| intersection            |                                                  |
| intersperse             |                                                  |
| into                    |                                                  |
| invert                  |                                                  |
| invertObj               |                                                  |
| invoker                 |                                                  |
| is                      |                                                  |
| isEmpty                 |                                                  |
| isNil                   |                                                  |
| join                    |                                                  |
| juxt                    |                                                  |
| keysIn                  |                                                  |
| last                    | `Array.last`                                     |
| lastIndexOf             | `Array.findLastIndex`                            |
| length                  |                                                  |
| lens                    |                                                  |
| lensIndex               |                                                  |
| lensPath                |                                                  |
| lensProp                |                                                  |
| lift                    | `Apply.liftA${n}`, `N = 1, 2, 3, 4`              |
| liftN                   | `Apply.liftA${n}`, `N = 1, 2, 3, 4`              |
| lt                      | `Ord.lessThan`                                   |
| lte                     | `Ord.lessThanOrEq`                               |
| map                     | `Functor`                                        |
| mapAccum                |                                                  |
| mapAccumRight           |                                                  |
| mapObjIndexed           |                                                  |
| match                   |                                                  |
| mathMod                 |                                                  |
| max                     | `Ord.max`                                        |
| maxBy                   |                                                  |
| mean                    |                                                  |
| median                  |                                                  |
| memoize                 |                                                  |
| memoizeWith             |                                                  |
| merge                   |                                                  |
| mergeAll                |                                                  |
| mergeDeepLeft           |                                                  |
| mergeDeepRight          |                                                  |
| mergeDeepWith           |                                                  |
| mergeDeepWithKey        |                                                  |
| mergeWith               | `Record.getMonoid`                               |
| mergeWithKey            |                                                  |
| min                     | `Ord.min`                                        |
| minBy                   |                                                  |
| module.exports          |                                                  |
| modulo                  |                                                  |
| multiply                | `Field`                                          |
| nAry                    |                                                  |
| negate                  | `Ring.negate`                                    |
| none                    |                                                  |
| not                     |                                                  |
| nth                     | `Array.index`                                    |
| nthArg                  |                                                  |
| o                       |                                                  |
| objOf                   | `Record.singleton`                               |
| of                      | `Array.array.of`                                 |
| omit                    |                                                  |
| once                    |                                                  |
| or                      | `Semigroup.semigroupAny`                         |
| over                    |                                                  |
| pair                    | `function.tuple`, `function.tupleCurried`        |
| partial                 |                                                  |
| partialRight            |                                                  |
| partition               | `Filterable`                                     |
| path                    |                                                  |
| pathEq                  |                                                  |
| pathOr                  |                                                  |
| pathSatisfies           |                                                  |
| pick                    |                                                  |
| pickAll                 |                                                  |
| pickBy                  |                                                  |
| pipe                    | `function.pipe`                                  |
| pipeK                   |                                                  |
| pipeP                   |                                                  |
| pluck                   |                                                  |
| prepend                 | `Array.cons`                                     |
| product                 | `Foldable.product`                               |
| project                 |                                                  |
| prop                    |                                                  |
| propEq                  |                                                  |
| propIs                  |                                                  |
| propOr                  |                                                  |
| props                   |                                                  |
| propSatisfies           |                                                  |
| range                   | `Array.range`                                    |
| reduce                  | `Foldable`                                       |
| reduceBy                |                                                  |
| reduced                 |                                                  |
| reduceRight             | `Foldable`                                       |
| reduceWhile             |                                                  |
| reject                  |                                                  |
| remove                  |                                                  |
| repeat                  | `Array.replicate`                                |
| replace                 |                                                  |
| reverse                 | `Array.reverse`                                  |
| scan                    | `Array.scanLeft`                                 |
| sequence                | `Traversable`                                    |
| set                     |                                                  |
| slice                   |                                                  |
| sort                    | `Array.sort`                                     |
| sortBy                  | `Array.sort`                                     |
| sortWith                | `Ord.getSemigroup`                               |
| split                   |                                                  |
| splitAt                 | `Array.split`                                    |
| splitEvery              | `Arrat.chunksOf`                                 |
| splitWhen               |                                                  |
| startsWith              |                                                  |
| subtract                | `Ring`                                           |
| sum                     |                                                  |
| symmetricDifference     |                                                  |
| symmetricDifferenceWith |                                                  |
| T                       | `function.constTrue`                             |
| tail                    | `Array.tail`                                     |
| take                    | `Array.take`                                     |
| takeLast                | `Array.takeEnd`                                  |
| takeLastWhile           |                                                  |
| takeWhile               | `Array.takeWhile`                                |
| tap                     |                                                  |
| test                    |                                                  |
| times                   | `Array.makeBy`                                   |
| toLower                 | `Record.toUnfoldable`                            |
| toPairs                 |                                                  |
| toPairsIn               |                                                  |
| toString                | `function.toString`                              |
| toUpper                 |                                                  |
| transduce               |                                                  |
| transpose               |                                                  |
| traverse                | `Traversable`                                    |
| tryCatch                | `IOEither.tryCatch`                              |
| type                    |                                                  |
| unapply                 |                                                  |
| unary                   |                                                  |
| uncurryN                |                                                  |
| unfold                  | `Unfoldable`                                     |
| union                   |                                                  |
| unionWith               |                                                  |
| uniq                    | `Array.uniq`                                     |
| uniqBy                  |                                                  |
| uniqWith                | `Array.uniq`                                     |
| unless                  |                                                  |
| unnest                  | `Chain.flatten`                                  |
| until                   |                                                  |
| update                  | `Array.updateAt`, `Array.unsafeUpdateAt`         |
| useWith                 |                                                  |
| values                  |                                                  |
| valuesIn                |                                                  |
| view                    |                                                  |
| when                    |                                                  |
| where                   |                                                  |
| whereEq                 |                                                  |
| without                 |                                                  |
| xprod                   | `Array.array.chain`                              |
| zip                     | `Array.zip`                                      |
| zipObj                  |                                                  |
| zipWith                 | `Array.zipWith`                                  |
