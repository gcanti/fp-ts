# Comparison with [ramda](https://ramdajs.com/docs/)

| ramda                   | fp-ts                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| add                     | [Field](docs/Field.md#fieldnumber)                                                                     |
| addIndex                |                                                                                                        |
| adjust                  | [Array.modifyAt](docs/Array.md#modifyat)                                                               |
| all                     |                                                                                                        |
| allPass                 |                                                                                                        |
| always                  | [function.constant](docs/function.md#constant)                                                         |
| and                     | [Semigroup.semigroupAll](docs/Semigroup.md#semigroupall)                                               |
| any                     |                                                                                                        |
| anyPass                 |                                                                                                        |
| ap                      | [Apply](docs/Apply.md)                                                                                 |
| aperture                |                                                                                                        |
| append                  | [Array.snoc](docs/Array.md#snoc)                                                                       |
| apply                   | [function.apply](docs/function.md#apply)                                                               |
| applySpec               |                                                                                                        |
| applyTo                 | [function.applyFlipped](docs/function.md#applyflipped)                                                 |
| ascend                  | [Ord.contramap](docs/Ord.md#contramap)                                                                 |
| assoc                   | [Semigroup.getObjectSemigroup](docs/Semigroup.md#getobjectsemigroup)                                   |
| assocPath               |                                                                                                        |
| binary                  |                                                                                                        |
| bind                    |                                                                                                        |
| both                    |                                                                                                        |
| call                    |                                                                                                        |
| chain                   | [Chain](docs/Chain.md)                                                                                 |
| clamp                   | [Ord.clamp](docs/Ord.md#clamp)                                                                         |
| clone                   |                                                                                                        |
| comparator              | [Ord.fromCompare](docs/Ord.md#fromcompare)                                                             |
| complement              |                                                                                                        |
| compose                 | [function.compose](docs/function.md#compose)                                                           |
| composeK                |                                                                                                        |
| composeP                | [Task.prototype.chain](docs/Task.md#chain)                                                             |
| concat                  | [Semigroup](docs/Semigroup.md)                                                                         |
| cond                    |                                                                                                        |
| construct               |                                                                                                        |
| constructN              |                                                                                                        |
| contains                | [Array.member](docs/Array.md#member)                                                                   |
| converge                |                                                                                                        |
| countBy                 |                                                                                                        |
| curry                   | [function.curry](docs/function.md#curry)                                                               |
| curryN                  |                                                                                                        |
| dec                     | [function.decrement](docs/Array.md#decrement)                                                          |
| defaultTo               |                                                                                                        |
| descend                 | [Ord.contramap](docs/Ord.md#contramap), [Ord.getDualOrd](docs/Ord.md#getdualord)                       |
| difference              |                                                                                                        |
| differenceWith          |                                                                                                        |
| dissoc                  | [Record.remove](docs/Record.md#remove)                                                                 |
| dissocPath              |                                                                                                        |
| divide                  | [Field](docs/Field.md)                                                                                 |
| drop                    | [Array.drop](docs/Array.md#drop)                                                                       |
| dropLast                | [Array.dropEnd](docs/Array.md#dropend)                                                                 |
| dropLastWhile           |                                                                                                        |
| dropRepeats             |                                                                                                        |
| dropRepeatsWith         |                                                                                                        |
| dropWhile               | [Array.dropWhile](docs/Array.md#dropwhile)                                                             |
| either                  |                                                                                                        |
| empty                   |                                                                                                        |
| endWith                 |                                                                                                        |
| eqBy                    | [Setoid.contramap](docs/Setoid.md#contramap)                                                           |
| eqProps                 |                                                                                                        |
| equals                  | [Setoid](docs/Setoid.md)                                                                               |
| evolve                  |                                                                                                        |
| F                       | [function.constFalse](docs/function.md#constfalse)                                                     |
| filter                  | [Filterable](docs/Filterable.md)                                                                       |
| find                    | [Array.find](docs/Array.md#find)                                                                       |
| findIndex               | [Array.findIndex](docs/Array.md#findindex)                                                             |
| findLast                | [Array.findLast](docs/Array.md#findlast)                                                               |
| findLastIndex           | [Array.findLastIndex](docs/Array.md#findlastindex)                                                     |
| flatten                 | [Array.flatten](docs/Array.md#flatten)                                                                 |
| flip                    | [function.flip](docs/function.md#flip)                                                                 |
| forEach                 |                                                                                                        |
| forEachObjIndexed       |                                                                                                        |
| fromPairs               | [Record.fromFoldable](docs/Record.md#fromfoldable)                                                     |
| groupBy                 | [NonEmptyArray.groupBy](docs/NonEmptyArray.md#groupby)                                                 |
| groupWith               | [NonEmptyArray.group](docs/NonEmptyArray.md#group), [NonEmptyArray.groupSort](docs/Array.md#groupsort) |
| gt                      | [Ord.greaterThan](docs/Ord.md#greaterthan)                                                             |
| gte                     | [Ord.greaterThanOrEq](docs/Ord.md#greaterthanoreq)                                                     |
| has                     |                                                                                                        |
| hasIn                   |                                                                                                        |
| head                    | [Array.head](docs/Array.md#head)                                                                       |
| identical               | [Setoid](docs/Setoid.md)                                                                               |
| identity                | [function.identity](docs/function.md#identity)                                                         |
| ifElse                  |                                                                                                        |
| inc                     | [function.increment](docs/function.md#increment)                                                       |
| indexBy                 | [NonEmptyArray.groupBy](docs/NonEmptyArray.md#groupby)                                                 |
| indexOf                 | [Array.findIndex](docs/Array.md#findindex)                                                             |
| init                    | [Array.init](docs/Array.md#init)                                                                       |
| innerJoin               |                                                                                                        |
| insert                  | [Array.insertAt](docs/Array.md#insertat)                                                               |
| insertAll               |                                                                                                        |
| intersection            |                                                                                                        |
| intersperse             |                                                                                                        |
| into                    |                                                                                                        |
| invert                  |                                                                                                        |
| invertObj               |                                                                                                        |
| invoker                 |                                                                                                        |
| is                      |                                                                                                        |
| isEmpty                 |                                                                                                        |
| isNil                   |                                                                                                        |
| join                    |                                                                                                        |
| juxt                    |                                                                                                        |
| keysIn                  |                                                                                                        |
| last                    | [Array.last](docs/Array.md#last)                                                                       |
| lastIndexOf             | [Array.findLastIndex](docs/Array.md#findlastindex)                                                     |
| length                  |                                                                                                        |
| lens                    |                                                                                                        |
| lensIndex               |                                                                                                        |
| lensPath                |                                                                                                        |
| lensProp                |                                                                                                        |
| lift                    |                                                                                                        |
| liftN                   | [Apply.liftAN](docs/Apply.md#lifta2)                                                                   |
| lt                      | [Ord.lessThan](docs/Ord.md#lessthan)                                                                   |
| lte                     | [Ord.lessThanOrEq](docs/Ord.md#lessthanoreq)                                                           |
| map                     | [Functor](docs/Functor.md)                                                                             |
| mapAccum                |                                                                                                        |
| mapAccumRight           |                                                                                                        |
| mapObjIndexed           |                                                                                                        |
| match                   |                                                                                                        |
| mathMod                 |                                                                                                        |
| max                     | [Ord.max](docs/Ord.md#max)                                                                             |
| maxBy                   |                                                                                                        |
| mean                    |                                                                                                        |
| median                  |                                                                                                        |
| memoize                 |                                                                                                        |
| memoizeWith             |                                                                                                        |
| merge                   |                                                                                                        |
| mergeAll                |                                                                                                        |
| mergeDeepLeft           |                                                                                                        |
| mergeDeepRight          |                                                                                                        |
| mergeDeepWith           |                                                                                                        |
| mergeDeepWithKey        |                                                                                                        |
| mergeWith               | [Record.getMonoid](docs/Record.md#getmonoid)                                                           |
| mergeWithKey            |                                                                                                        |
| min                     | [Ord.min](docs/Ord.md#min)                                                                             |
| minBy                   |                                                                                                        |
| module.exports          |                                                                                                        |
| modulo                  |                                                                                                        |
| multiply                | [Field](docs/Field.md)                                                                                 |
| nAry                    |                                                                                                        |
| negate                  | [Ring.negate](docs/Ring.md#negate)                                                                     |
| none                    |                                                                                                        |
| not                     |                                                                                                        |
| nth                     | [Array.index](docs/Array.md#index)                                                                     |
| nthArg                  |                                                                                                        |
| o                       |                                                                                                        |
| objOf                   | [Record.singleton](docs/Record.md#singleton)                                                           |
| of                      | [Array.array.of](docs/Array.md#of)                                                                     |
| omit                    |                                                                                                        |
| once                    |                                                                                                        |
| or                      | [Semigroup.semigroupAny](docs/Semigroup.md#semigroupany)                                               |
| over                    |                                                                                                        |
| pair                    | [function.tuple](docs/function.md#tuple), [function.tupleCurried](docs/function.md#tuplecurried)       |
| partial                 |                                                                                                        |
| partialRight            |                                                                                                        |
| partition               | [Filterable](docs/Filterable.md)                                                                       |
| path                    |                                                                                                        |
| pathEq                  |                                                                                                        |
| pathOr                  |                                                                                                        |
| pathSatisfies           |                                                                                                        |
| pick                    |                                                                                                        |
| pickAll                 |                                                                                                        |
| pickBy                  |                                                                                                        |
| pipe                    | [function.pipe](docs/function.md#pipe)                                                                 |
| pipeK                   |                                                                                                        |
| pipeP                   |                                                                                                        |
| pluck                   |                                                                                                        |
| prepend                 | [Array.cons](docs/Array.md#cons)                                                                       |
| product                 | [Foldable.product](docs/Foldable.md#product)                                                           |
| project                 |                                                                                                        |
| prop                    |                                                                                                        |
| propEq                  |                                                                                                        |
| propIs                  |                                                                                                        |
| propOr                  |                                                                                                        |
| props                   |                                                                                                        |
| propSatisfies           |                                                                                                        |
| range                   | [Array.range](docs/Array.md#range)                                                                     |
| reduce                  | [Foldable](docs/Foldable.md)                                                                           |
| reduceBy                |                                                                                                        |
| reduced                 |                                                                                                        |
| reduceRight             | [Foldable](docs/Foldable.md)                                                                           |
| reduceWhile             |                                                                                                        |
| reject                  |                                                                                                        |
| remove                  |                                                                                                        |
| repeat                  | [Array.replicate](docs/Array.md#replicate)                                                             |
| replace                 |                                                                                                        |
| reverse                 | [Array.reverse](docs/Array.md#reverse)                                                                 |
| scan                    | [Array.scanLeft](docs/Array.md#scanLeft)                                                               |
| sequence                | [Traversable](docs/Traversable.md)                                                                     |
| set                     |                                                                                                        |
| slice                   |                                                                                                        |
| sort                    | [Array.sort](docs/Array.md#sort)                                                                       |
| sortBy                  | [Array.sort](docs/Array.md#sort)                                                                       |
| sortWith                | [Ord.getSemigroup](docs/Ord.md#getsemigroup)                                                           |
| split                   |                                                                                                        |
| splitAt                 | [Array.split](docs/Array.md#split)                                                                     |
| splitEvery              | [Array.chunksOf](docs/Array.md#chunksof)                                                               |
| splitWhen               |                                                                                                        |
| startsWith              |                                                                                                        |
| subtract                | [Ring](docs/Ring.md)                                                                                   |
| sum                     |                                                                                                        |
| symmetricDifference     |                                                                                                        |
| symmetricDifferenceWith |                                                                                                        |
| T                       | [function.constTrue](docs/function.md#consttrue)                                                       |
| tail                    | [Array.tail](docs/Array.md#tail)                                                                       |
| take                    | [Array.take](docs/Array.md#take)                                                                       |
| takeLast                | [Array.takeEnd](docs/Array.md#takeend)                                                                 |
| takeLastWhile           |                                                                                                        |
| takeWhile               | [Array.takeWhile](docs/Array.md#takewhile)                                                             |
| tap                     |                                                                                                        |
| test                    |                                                                                                        |
| times                   | [Array.makeBy](docs/Array.md#makeby)                                                                   |
| toLower                 | [Record.toUnfoldable](docs/Record.md#tounfoldable)                                                     |
| toPairs                 |                                                                                                        |
| toPairsIn               |                                                                                                        |
| toString                | [function.toString](docs/function.md#tostring)                                                         |
| toUpper                 |                                                                                                        |
| transduce               |                                                                                                        |
| transpose               |                                                                                                        |
| traverse                | [Traversable](docs/Traversable.md)                                                                     |
| tryCatch                | [IOEither.tryCatch](docs/IOEither.md#trycatch)                                                         |
| type                    |                                                                                                        |
| unapply                 |                                                                                                        |
| unary                   |                                                                                                        |
| uncurryN                |                                                                                                        |
| unfold                  | [Unfoldable](docs/Unfoldable.md)                                                                       |
| union                   |                                                                                                        |
| unionWith               |                                                                                                        |
| uniq                    | [Array.uniq](docs/Array.md#uniq)                                                                       |
| uniqBy                  |                                                                                                        |
| uniqWith                | [Array.uniq](docs/Array.md#uniq)                                                                       |
| unless                  |                                                                                                        |
| unnest                  | [Chain.flatten](docs/Chain.md#flatten)                                                                 |
| until                   |                                                                                                        |
| update                  | [Array.updateAt](docs/Array.md#updateat), [Array.unsafeUpdateAt](docs/Array.md#unsafeupdateat)         |
| useWith                 |                                                                                                        |
| values                  |                                                                                                        |
| valuesIn                |                                                                                                        |
| view                    |                                                                                                        |
| when                    |                                                                                                        |
| where                   |                                                                                                        |
| whereEq                 |                                                                                                        |
| without                 |                                                                                                        |
| xprod                   | [Array.array.chain](docs/Array.md#chain)                                                               |
| zip                     | [Array.zip](docs/Array.md#zip)                                                                         |
| zipObj                  |                                                                                                        |
| zipWith                 | [Array.zipWith](docs/Array.md#zipwith)                                                                 |
