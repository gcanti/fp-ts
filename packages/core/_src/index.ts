/**
 * @since 3.0.0
 */

import * as alt from '@fp-ts/core/Alt'
import * as alternative from '@fp-ts/core/Alternative'
import * as applicative from '@fp-ts/core/Applicative'
import * as apply from '@fp-ts/core/Apply'
import * as async from '@fp-ts/core/Async'
import * as asyncOption from '@fp-ts/core/AsyncOption'
import * as asyncResult from '@fp-ts/core/AsyncResult'
import * as asyncThese from '@fp-ts/core/AsyncThese'
import * as bifunctor from '@fp-ts/core/Bifunctor'
import * as boolean from '@fp-ts/core/boolean'
import * as booleanAlgebra from '@fp-ts/core/BooleanAlgebra'
import * as bounded from '@fp-ts/core/Bounded'
import * as boundedDistributiveLattice from '@fp-ts/core/BoundedDistributiveLattice'
import * as boundedJoinSemilattice from '@fp-ts/core/BoundedJoinSemilattice'
import * as boundedLattice from '@fp-ts/core/BoundedLattice'
import * as boundedMeetSemilattice from '@fp-ts/core/BoundedMeetSemilattice'
import * as category from '@fp-ts/core/Category'
import * as comonad from '@fp-ts/core/Comonad'
import * as compactable from '@fp-ts/core/Compactable'
import * as composable from '@fp-ts/core/Composable'
import * as console from '@fp-ts/core/Console'
import * as const_ from '@fp-ts/core/Const'
import * as contravariant from '@fp-ts/core/Contravariant'
import * as date from '@fp-ts/core/Date'
import * as distributiveLattice from '@fp-ts/core/DistributiveLattice'
import * as endomorphism from '@fp-ts/core/Endomorphism'
import * as eq from '@fp-ts/core/Eq'
import * as extendable from '@fp-ts/core/Extendable'
import * as field from '@fp-ts/core/Field'
import * as filterable from '@fp-ts/core/Filterable'
import * as filterableWithIndex from '@fp-ts/core/FilterableWithIndex'
import * as flattenable from '@fp-ts/core/Flattenable'
import * as flattenableRec from '@fp-ts/core/FlattenableRec'
import * as foldable from '@fp-ts/core/Foldable'
import * as foldableWithIndex from '@fp-ts/core/FoldableWithIndex'
import * as fromAsync from '@fp-ts/core/FromAsync'
import * as fromIdentity from '@fp-ts/core/FromIdentity'
import * as fromOption from '@fp-ts/core/FromOption'
import * as fromReader from '@fp-ts/core/FromReader'
import * as fromResult from '@fp-ts/core/FromResult'
import * as fromState from '@fp-ts/core/FromState'
import * as fromSync from '@fp-ts/core/FromSync'
import * as fromThese from '@fp-ts/core/FromThese'
import * as fromWriter from '@fp-ts/core/FromWriter'
import * as function_ from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import * as functorWithIndex from '@fp-ts/core/FunctorWithIndex'
import * as group from '@fp-ts/core/Group'
import * as heytingAlgebra from '@fp-ts/core/HeytingAlgebra'
import * as hkt from '@fp-ts/core/HKT'
import * as identity from '@fp-ts/core/Identity'
import * as invariant from '@fp-ts/core/Invariant'
import * as iterable from '@fp-ts/core/Iterable'
import * as joinSemilattice from '@fp-ts/core/JoinSemilattice'
import * as json from '@fp-ts/core/Json'
import * as kleisliCategory from '@fp-ts/core/KleisliCategory'
import * as kleisliComposable from '@fp-ts/core/KleisliComposable'
import * as lattice from '@fp-ts/core/Lattice'
import * as magma from '@fp-ts/core/Magma'
import * as meetSemilattice from '@fp-ts/core/MeetSemilattice'
import * as monad from '@fp-ts/core/Monad'
import * as monoid from '@fp-ts/core/Monoid'
import * as nonEmptyReadonlyArray from '@fp-ts/core/NonEmptyReadonlyArray'
import * as number from '@fp-ts/core/number'
import * as option from '@fp-ts/core/Option'
import * as optionT from '@fp-ts/core/OptionT'
import * as ord from '@fp-ts/core/Ord'
import * as ordering from '@fp-ts/core/Ordering'
import * as predicate from '@fp-ts/core/Predicate'
import * as profunctor from '@fp-ts/core/Profunctor'
import * as random from '@fp-ts/core/Random'
import * as reader from '@fp-ts/core/Reader'
import * as readerAsync from '@fp-ts/core/ReaderAsync'
import * as readerAsyncResult from '@fp-ts/core/ReaderAsyncResult'
import * as readerAsyncWriter from '@fp-ts/core/ReaderAsyncWriter'
import * as readerResult from '@fp-ts/core/ReaderResult'
import * as readerSync from '@fp-ts/core/ReaderSync'
import * as readerT from '@fp-ts/core/ReaderT'
import * as readonlyArray from '@fp-ts/core/ReadonlyArray'
import * as readonlyMap from '@fp-ts/core/ReadonlyMap'
import * as readonlyRecord from '@fp-ts/core/ReadonlyRecord'
import * as readonlySet from '@fp-ts/core/ReadonlySet'
import * as refinement from '@fp-ts/core/Refinement'
import * as result from '@fp-ts/core/Result'
import * as resultT from '@fp-ts/core/ResultT'
import * as ring from '@fp-ts/core/Ring'
import * as semigroup from '@fp-ts/core/Semigroup'
import * as semiring from '@fp-ts/core/Semiring'
import * as show from '@fp-ts/core/Show'
import * as state from '@fp-ts/core/State'
import * as stateReaderAsyncResult from '@fp-ts/core/StateReaderAsyncResult'
import * as stateT from '@fp-ts/core/StateT'
import * as store from '@fp-ts/core/Store'
import * as string from '@fp-ts/core/string'
import * as struct from '@fp-ts/core/struct'
import * as sync from '@fp-ts/core/Sync'
import * as syncOption from '@fp-ts/core/SyncOption'
import * as syncResult from '@fp-ts/core/SyncResult'
import * as these from '@fp-ts/core/These'
import * as theseT from '@fp-ts/core/TheseT'
import * as traced from '@fp-ts/core/Traced'
import * as traversable from '@fp-ts/core/Traversable'
import * as traversableFilterable from '@fp-ts/core/TraversableFilterable'
import * as traversableWithIndex from '@fp-ts/core/TraversableWithIndex'
import * as tree from '@fp-ts/core/Tree'
import * as tuple from '@fp-ts/core/tuple'
import * as unfoldable from '@fp-ts/core/Unfoldable'
import * as void_ from '@fp-ts/core/void'
import * as writer from '@fp-ts/core/Writer'
import * as writerT from '@fp-ts/core/WriterT'

export {
  /**
   * @category type classes
   * @since 3.0.0
   */
  alt,
  /**
   * @category type classes
   * @since 3.0.0
   */
  alternative,
  /**
   * @category type classes
   * @since 3.0.0
   */
  applicative,
  /**
   * @category type classes
   * @since 3.0.0
   */
  apply,
  /**
   * @category data types
   * @since 3.0.0
   */
  async,
  /**
   * @category data types
   * @since 3.0.0
   */
  asyncOption,
  /**
   * @category data types
   * @since 3.0.0
   */
  asyncResult,
  /**
   * @category data types
   * @since 3.0.0
   */
  asyncThese,
  /**
   * @category type classes
   * @since 3.0.0
   */
  bifunctor,
  /**
   * @since 3.0.0
   */
  boolean,
  /**
   * @category type classes
   * @since 3.0.0
   */
  booleanAlgebra,
  /**
   * @category type classes
   * @since 3.0.0
   */
  bounded,
  /**
   * @category type classes
   * @since 3.0.0
   */
  boundedDistributiveLattice,
  /**
   * @category type classes
   * @since 3.0.0
   */
  boundedJoinSemilattice,
  /**
   * @category type classes
   * @since 3.0.0
   */
  boundedLattice,
  /**
   * @category type classes
   * @since 3.0.0
   */
  boundedMeetSemilattice,
  /**
   * @category type classes
   * @since 3.0.0
   */
  category,
  /**
   * @category type classes
   * @since 3.0.0
   */
  comonad,
  /**
   * @category type classes
   * @since 3.0.0
   */
  compactable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  composable,
  /**
   * @since 3.0.0
   */
  console,
  /**
   * @category data types
   * @since 3.0.0
   */
  const_ as const,
  /**
   * @category type classes
   * @since 3.0.0
   */
  contravariant,
  /**
   * @category data types
   * @since 3.0.0
   */
  date,
  /**
   * @category type classes
   * @since 3.0.0
   */
  distributiveLattice,
  /**
   * @category data types
   * @since 3.0.0
   */
  endomorphism,
  /**
   * @category type classes
   * @since 3.0.0
   */
  eq,
  /**
   * @category type classes
   * @since 3.0.0
   */
  extendable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  field,
  /**
   * @category type classes
   * @since 3.0.0
   */
  filterable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  filterableWithIndex,
  /**
   * @category type classes
   * @since 3.0.0
   */
  flattenable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  flattenableRec,
  /**
   * @category type classes
   * @since 3.0.0
   */
  foldable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  foldableWithIndex,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromAsync,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromIdentity,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromOption,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromReader,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromResult,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromState,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromSync,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromThese,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromWriter,
  /**
   * @since 3.0.0
   */
  function_ as function,
  /**
   * @category type classes
   * @since 3.0.0
   */
  functor,
  /**
   * @category type classes
   * @since 3.0.0
   */
  functorWithIndex,
  /**
   * @category type classes
   * @since 3.0.0
   */
  group,
  /**
   * @category type classes
   * @since 3.0.0
   */
  heytingAlgebra,
  /**
   * @since 3.0.0
   */
  hkt,
  /**
   * @category data types
   * @since 3.0.0
   */
  identity,
  /**
   * @category type classes
   * @since 3.0.0
   */
  invariant,
  /**
   * @category data types
   * @since 3.0.0
   */
  iterable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  joinSemilattice,
  /**
   * @since 3.0.0
   */
  json,
  /**
   * @category type classes
   * @since 3.0.0
   */
  kleisliCategory,
  /**
   * @category type classes
   * @since 3.0.0
   */
  kleisliComposable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  lattice,
  /**
   * @category type classes
   * @since 3.0.0
   */
  magma,
  /**
   * @category type classes
   * @since 3.0.0
   */
  meetSemilattice,
  /**
   * @category type classes
   * @since 3.0.0
   */
  monad,
  /**
   * @category type classes
   * @since 3.0.0
   */
  monoid,
  /**
   * @category data types
   * @since 3.0.0
   */
  nonEmptyReadonlyArray,
  /**
   * @since 3.0.0
   */
  number,
  /**
   * @category data types
   * @since 3.0.0
   */
  option,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  optionT,
  /**
   * @category type classes
   * @since 3.0.0
   */
  ord,
  /**
   * @since 3.0.0
   */
  ordering,
  /**
   * @since 3.0.0
   */
  predicate,
  /**
   * @category type classes
   * @since 3.0.0
   */
  profunctor,
  /**
   * @since 3.0.0
   */
  random,
  /**
   * @category data types
   * @since 3.0.0
   */
  reader,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerAsync,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerAsyncResult,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerAsyncWriter,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerResult,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerSync,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  readerT,
  /**
   * @category data types
   * @since 3.0.0
   */
  readonlyArray,
  /**
   * @category data types
   * @since 3.0.0
   */
  readonlyMap,
  /**
   * @category data types
   * @since 3.0.0
   */
  readonlyRecord,
  /**
   * @category data types
   * @since 3.0.0
   */
  readonlySet,
  /**
   * @category data types
   * @since 3.0.0
   */
  refinement,
  /**
   * @category data types
   * @since 3.0.0
   */
  result,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  resultT,
  /**
   * @category type classes
   * @since 3.0.0
   */
  ring,
  /**
   * @category type classes
   * @since 3.0.0
   */
  semigroup,
  /**
   * @category type classes
   * @since 3.0.0
   */
  semiring,
  /**
   * @category type classes
   * @since 3.0.0
   */
  show,
  /**
   * @category data types
   * @since 3.0.0
   */
  state,
  /**
   * @category data types
   * @since 3.0.0
   */
  stateReaderAsyncResult,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  stateT,
  /**
   * @category data types
   * @since 3.0.0
   */
  store,
  /**
   * @since 3.0.0
   */
  string,
  /**
   * @since 3.0.0
   */
  struct,
  /**
   * @category data types
   * @since 3.0.0
   */
  sync,
  /**
   * @category data types
   * @since 3.0.0
   */
  syncOption,
  /**
   * @category data types
   * @since 3.0.0
   */
  syncResult,
  /**
   * @category data types
   * @since 3.0.0
   */
  these,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  theseT,
  /**
   * @category data types
   * @since 3.0.0
   */
  traced,
  /**
   * @category type classes
   * @since 3.0.0
   */
  traversable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  traversableFilterable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  traversableWithIndex,
  /**
   * @category data types
   * @since 3.0.0
   */
  tree,
  /**
   * @since 3.0.0
   */
  tuple,
  /**
   * @category type classes
   * @since 3.0.0
   */
  unfoldable,
  /**
   * @since 3.0.0
   */
  void_ as void,
  /**
   * @category data types
   * @since 3.0.0
   */
  writer,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  writerT
}
