import { Alt2C, Alt3C } from '../../src/Alt'
import { Alternative2C, Alternative3C } from '../../src/Alternative'
import { Applicative2C, Applicative3C } from '../../src/Applicative'
import { Apply2C, Apply3C } from '../../src/Apply'
import { Bifunctor2C, Bifunctor3C } from '../../src/Bifunctor'
import { Chain2C, Chain3C } from '../../src/Chain'
import { ChainRec2C, ChainRec3C } from '../../src/ChainRec'
import { Comonad2C, Comonad3C } from '../../src/Comonad'
import { Compactable2C, Compactable3C } from '../../src/Compactable'
import { Contravariant2C, Contravariant3C } from '../../src/Contravariant'
import { Extend2C, Extend3C } from '../../src/Extend'
import { Filterable2C, Filterable3C } from '../../src/Filterable'
import { FilterableWithIndex2C } from '../../src/FilterableWithIndex'
import { Foldable2C, Foldable3C } from '../../src/Foldable'
import { FoldableWithIndex2C, FoldableWithIndex3C } from '../../src/FoldableWithIndex'
import { FromEither2C, FromEither3C } from '../../src/FromEither'
import { FromIO2C, FromIO3C } from '../../src/FromIO'
import { FromTask2C, FromTask3C } from '../../src/FromTask'
import { Functor2C, Functor3C } from '../../src/Functor'
import { FunctorWithIndex2C, FunctorWithIndex3C } from '../../src/FunctorWithIndex'
import { Invariant2C, Invariant3C } from '../../src/Invariant'
import { Monad2C, Monad3C } from '../../src/Monad'
import { Pointed2C, Pointed3C } from '../../src/Pointed'
import { Profunctor2C, Profunctor3C } from '../../src/Profunctor'
import { Traversable2C } from '../../src/Traversable'
import { TraversableWithIndex2C } from '../../src/TraversableWithIndex'
import { Unfoldable2C, Unfoldable3C } from '../../src/Unfoldable'
import { Witherable2C } from '../../src/Witherable'

// $ExpectType string | undefined
type _1 = Alt2C<'Either', string>['_E']

// $ExpectType string | undefined
type _2 = Alt3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _3 = Alternative2C<'Either', string>['_E']

// $ExpectType string | undefined
type _4 = Alternative3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _5 = Applicative2C<'Either', string>['_E']

// $ExpectType string | undefined
type _6 = Applicative3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _7 = Apply2C<'Either', string>['_E']

// $ExpectType string | undefined
type _8 = Apply3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _9 = Bifunctor2C<'Either', string>['_E']

// $ExpectType string | undefined
type _10 = Bifunctor3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _11 = Comonad2C<'Either', string>['_E']

// $ExpectType string | undefined
type _12 = Comonad3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _13 = Compactable2C<'Either', string>['_E']

// $ExpectType string | undefined
type _14 = Compactable3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _15 = Contravariant2C<'Either', string>['_E']

// $ExpectType string | undefined
type _16 = Contravariant3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _17 = Extend2C<'Either', string>['_E']

// $ExpectType string | undefined
type _18 = Extend3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _19 = Filterable2C<'Either', string>['_E']

// $ExpectType string | undefined
type _20 = Filterable3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _21 = FilterableWithIndex2C<'Either', number, string>['_E']

// $ExpectType string | undefined
type _22 = Foldable2C<'Either', string>['_E']

// $ExpectType string | undefined
type _23 = Foldable3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _24 = FoldableWithIndex2C<'Either', number, string>['_E']

// $ExpectType string | undefined
type _25 = FoldableWithIndex3C<'ReaderEither', number, string>['_E']

// $ExpectType string | undefined
type _26 = FromEither2C<'Either', string>['_E']

// $ExpectType string | undefined
type _27 = FromEither3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _28 = FromIO2C<'Either', string>['_E']

// $ExpectType string | undefined
type _29 = FromIO3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _30 = FromTask2C<'Either', string>['_E']

// $ExpectType string | undefined
type _31 = FromTask3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _32 = Functor2C<'Either', string>['_E']

// $ExpectType string | undefined
type _33 = Functor3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _34 = FunctorWithIndex2C<'Either', number, string>['_E']

// $ExpectType string | undefined
type _35 = FunctorWithIndex3C<'ReaderEither', number, string>['_E']

// $ExpectType string | undefined
type _36 = Invariant2C<'Either', string>['_E']

// $ExpectType string | undefined
type _37 = Invariant3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _38 = Monad2C<'Either', string>['_E']

// $ExpectType string | undefined
type _39 = Monad3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _40 = Pointed2C<'Either', string>['_E']

// $ExpectType string | undefined
type _41 = Pointed3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _42 = Profunctor2C<'Either', string>['_E']

// $ExpectType string | undefined
type _43 = Profunctor3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _44 = Traversable2C<'Either', string>['_E']

// $ExpectType string | undefined
type _45 = TraversableWithIndex2C<'Either', number, string>['_E']

// $ExpectType string | undefined
type _46 = Unfoldable2C<'Either', string>['_E']

// $ExpectType string | undefined
type _47 = Unfoldable3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _48 = Witherable2C<'Either', string>['_E']

// $ExpectType string | undefined
type _49 = Chain2C<'Either', string>['_E']

// $ExpectType string | undefined
type _50 = Chain3C<'ReaderEither', string>['_E']

// $ExpectType string | undefined
type _51 = ChainRec2C<'Either', string>['_E']

// $ExpectType string | undefined
type _52 = ChainRec3C<'ReaderEither', string>['_E']
