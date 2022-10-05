/**
 * @since 3.0.0
 */

import * as applicative from './Applicative'
import * as apply from './Apply'
import * as bifunctor from './Bifunctor'
import * as boolean from './boolean'
import * as booleanAlgebra from './BooleanAlgebra'
import * as bounded from './Bounded'
import * as boundedDistributiveLattice from './BoundedDistributiveLattice'
import * as boundedJoinSemilattice from './BoundedJoinSemilattice'
import * as boundedLattice from './BoundedLattice'
import * as boundedMeetSemilattice from './BoundedMeetSemilattice'
import * as category from './Category'
import * as categoryKind from './CategoryKind'
import * as comonad from './Comonad'
import * as compactable from './Compactable'
import * as composable from './Composable'
import * as composableKind from './ComposableKind'
import * as console from './Console'
import * as const_ from './Const'
import * as contravariant from './Contravariant'
import * as date from './Date'
import * as distributiveLattice from './DistributiveLattice'
import * as eitherT from './EitherT'
import * as endomorphism from './Endomorphism'
import * as eq from './Eq'
import * as extendable from './Extendable'
import * as field from './Field'
import * as filterable from './Filterable'
import * as filterableKind from './FilterableKind'
import * as filterableWithIndex from './FilterableWithIndex'
import * as flattenable from './Flattenable'
import * as flattenableRec from './FlattenableRec'
import * as foldable from './Foldable'
import * as foldableWithIndex from './FoldableWithIndex'
import * as fromEither from './FromEither'
import * as fromIdentity from './FromIdentity'
import * as fromIO from './FromIO'
import * as fromOption from './FromOption'
import * as fromReader from './FromReader'
import * as fromState from './FromState'
import * as fromTask from './FromTask'
import * as fromThese from './FromThese'
import * as fromWriter from './FromWriter'
import * as function_ from './Function'
import * as functor from './Functor'
import * as functorWithIndex from './FunctorWithIndex'
import * as group from './Group'
import * as heytingAlgebra from './HeytingAlgebra'
import * as hkt from './HKT'
import * as identity from './Identity'
import * as invariant from './Invariant'
import * as io from './IO'
import * as ioEither from './IOEither'
import * as ioOption from './IOOption'
import * as joinSemilattice from './JoinSemilattice'
import * as json from './Json'
import * as lattice from './Lattice'
import * as magma from './Magma'
import * as meetSemilattice from './MeetSemilattice'
import * as monad from './Monad'
import * as monoid from './Monoid'
import * as monoidKind from './MonoidKind'
import * as number from './number'
import * as option from './Option'
import * as optionT from './OptionT'
import * as ord from './Ord'
import * as ordering from './Ordering'
import * as predicate from './Predicate'
import * as profunctor from './Profunctor'
import * as random from './Random'
import * as reader from './Reader'
import * as readerEither from './ReaderEither'
import * as readerIO from './ReaderIO'
import * as readerT from './ReaderT'
import * as readerTask from './ReaderTask'
import * as readerTaskEither from './ReaderTaskEither'
import * as readerTaskWriter from './ReaderTaskWriter'
import * as readonlyArray from './ReadonlyArray'
import * as readonlyMap from './ReadonlyMap'
import * as readonlyNonEmptyArray from './ReadonlyNonEmptyArray'
import * as readonlyRecord from './ReadonlyRecord'
import * as readonlySet from './ReadonlySet'
import * as refinement from './Refinement'
import * as result from './Result'
import * as ring from './Ring'
import * as semigroup from './Semigroup'
import * as semigroupKind from './SemigroupKind'
import * as semiring from './Semiring'
import * as show from './Show'
import * as state from './State'
import * as stateReaderTaskEither from './StateReaderTaskEither'
import * as stateT from './StateT'
import * as store from './Store'
import * as string from './string'
import * as struct from './struct'
import * as task from './Task'
import * as taskEither from './TaskEither'
import * as taskOption from './TaskOption'
import * as taskThese from './TaskThese'
import * as these from './These'
import * as theseT from './TheseT'
import * as traced from './Traced'
import * as traversable from './Traversable'
import * as traversableWithIndex from './TraversableWithIndex'
import * as tree from './Tree'
import * as tuple from './tuple'
import * as unfoldable from './Unfoldable'
import * as void_ from './void'
import * as writer from './Writer'
import * as writerT from './WriterT'

export {
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
  categoryKind,
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
   * @category type classes
   * @since 3.0.0
   */
  composableKind,
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
  result,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  eitherT,
  /**
   * @category data types
   * @since 3.0.0
   */
  endomorphism,
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
  filterableKind,
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
  fromEither,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromIO,
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
  fromState,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromTask,
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
  io,
  /**
   * @category data types
   * @since 3.0.0
   */
  ioEither,
  /**
   * @category data types
   * @since 3.0.0
   */
  ioOption,
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
   * @category type classes
   * @since 3.0.0
   */
  monoidKind,
  /**
   * @since 3.0.0
   */
  number,
  /**
   * @since 3.0.0
   */
  struct,
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
   * @category type classes
   * @since 3.0.0
   */
  fromIdentity,
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
  readerEither,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerIO,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerTaskEither,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerTaskWriter,
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
  readonlyNonEmptyArray,
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
   * @category monad transformers
   * @since 3.0.0
   */
  readerT,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerTask,
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
  semigroupKind,
  /**
   * @category type classes
   * @since 3.0.0
   */
  semiring,
  /**
   * @category type classes
   * @since 3.0.0
   */
  eq,
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
  stateReaderTaskEither,
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
   * @category data types
   * @since 3.0.0
   */
  task,
  /**
   * @category data types
   * @since 3.0.0
   */
  taskEither,
  /**
   * @category data types
   * @since 3.0.0
   */
  taskOption,
  /**
   * @category data types
   * @since 3.0.0
   */
  taskThese,
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
