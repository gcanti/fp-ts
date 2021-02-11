import { Alt2C, Alt3C } from '../../src/Alt'
import { Alternative2C, Alternative3C } from '../../src/Alternative'
import { Applicative2C, Applicative3C } from '../../src/Applicative'
import { Apply2C, Apply3C } from '../../src/Apply'
import { Bifunctor2C, Bifunctor3C } from '../../src/Bifunctor'
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

// $ExpectType string
type _1 = Alt2C<'Either', string>['_E']

// $ExpectType string
type _2 = Alt3C<'ReaderEither', string>['_E']

// $ExpectType string
type _3 = Alternative2C<'Either', string>['_E']

// $ExpectType string
type _4 = Alternative3C<'ReaderEither', string>['_E']

// $ExpectType string
type _5 = Applicative2C<'Either', string>['_E']

// $ExpectType string
type _6 = Applicative3C<'ReaderEither', string>['_E']

// $ExpectType string
type _7 = Apply2C<'Either', string>['_E']

// $ExpectType string
type _8 = Apply3C<'ReaderEither', string>['_E']

// $ExpectType string
type _9 = Bifunctor2C<'Either', string>['_E']

// $ExpectType string
type _10 = Bifunctor3C<'ReaderEither', string>['_E']

// $ExpectType string
type _11 = Comonad2C<'Either', string>['_E']

// $ExpectType string
type _12 = Comonad3C<'ReaderEither', string>['_E']

// $ExpectType string
type _13 = Compactable2C<'Either', string>['_E']

// $ExpectType string
type _14 = Compactable3C<'ReaderEither', string>['_E']

// $ExpectType string
type _15 = Contravariant2C<'Either', string>['_E']

// $ExpectType string
type _16 = Contravariant3C<'ReaderEither', string>['_E']

// $ExpectType string
type _17 = Extend2C<'Either', string>['_E']

// $ExpectType string
type _18 = Extend3C<'ReaderEither', string>['_E']

// $ExpectType string
type _19 = Filterable2C<'Either', string>['_E']

// $ExpectType string
type _20 = Filterable3C<'ReaderEither', string>['_E']

// $ExpectType string
type _21 = FilterableWithIndex2C<'Either', number, string>['_E']

// $ExpectType string
type _22 = Foldable2C<'Either', string>['_E']

// $ExpectType string
type _23 = Foldable3C<'ReaderEither', string>['_E']

// $ExpectType string
type _24 = FoldableWithIndex2C<'Either', number, string>['_E']

// $ExpectType string
type _25 = FoldableWithIndex3C<'ReaderEither', number, string>['_E']

// $ExpectType string
type _26 = FromEither2C<'Either', string>['_E']

// $ExpectType string
type _27 = FromEither3C<'ReaderEither', string>['_E']

// $ExpectType string
type _28 = FromIO2C<'Either', string>['_E']

// $ExpectType string
type _29 = FromIO3C<'ReaderEither', string>['_E']

// $ExpectType string
type _30 = FromTask2C<'Either', string>['_E']

// $ExpectType string
type _31 = FromTask3C<'ReaderEither', string>['_E']

// $ExpectType string
type _32 = Functor2C<'Either', string>['_E']

// $ExpectType string
type _33 = Functor3C<'ReaderEither', string>['_E']

// $ExpectType string
type _34 = FunctorWithIndex2C<'Either', number, string>['_E']

// $ExpectType string
type _35 = FunctorWithIndex3C<'ReaderEither', number, string>['_E']

// $ExpectType string
type _36 = Invariant2C<'Either', string>['_E']

// $ExpectType string
type _37 = Invariant3C<'ReaderEither', string>['_E']

// $ExpectType string
type _38 = Monad2C<'Either', string>['_E']

// $ExpectType string
type _39 = Monad3C<'ReaderEither', string>['_E']

// $ExpectType string
type _40 = Pointed2C<'Either', string>['_E']

// $ExpectType string
type _41 = Pointed3C<'ReaderEither', string>['_E']

// $ExpectType string
type _42 = Profunctor2C<'Either', string>['_E']

// $ExpectType string
type _43 = Profunctor3C<'ReaderEither', string>['_E']

// $ExpectType string
type _44 = Traversable2C<'Either', string>['_E']

// $ExpectType string
type _45 = TraversableWithIndex2C<'Either', number, string>['_E']

// $ExpectType string
type _46 = Unfoldable2C<'Either', string>['_E']

// $ExpectType string
type _47 = Unfoldable3C<'ReaderEither', string>['_E']

// $ExpectType string
type _48 = Witherable2C<'Either', string>['_E']
