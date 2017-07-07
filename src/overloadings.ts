import { Applicative } from './Applicative'
import { HKT } from './HKT'
import { URI as ArrayURI } from './Array'
import { Either, URI as EitherURI } from './Either'
import { Identity, URI as IdentityURI } from './Identity'
import { IO, URI as IOURI } from './IO'
import { NonEmptyArray, URI as NonEmptyArrayURI } from './NonEmptyArray'
import { Option, URI as OptionURI } from './Option'
import { Task, URI as TaskURI } from './Task'
import { Validation, URI as ValidationURI } from './Validation'
import { Curried2, Curried3, Curried4 } from './function'

export type ArrayURI = ArrayURI
export type EitherURI = EitherURI
export type Either<L, A> = Either<L, A>
export type IdentityURI = IdentityURI
export type Identity<A> = Identity<A>
export type IOURI = IOURI
export type IO<A> = IO<A>
export type NonEmptyArrayURI = NonEmptyArrayURI
export type NonEmptyArray<A> = NonEmptyArray<A>
export type OptionURI = OptionURI
export type Option<A> = Option<A>
export type TaskURI = TaskURI
export type Task<A> = Task<A>
export type ValidationURI = ValidationURI
export type Validation<L, A> = Validation<L, A>

export type OptionKleisli<E, A> = (e: E) => Option<A>

//
// Array
//

declare module './Array' {
  interface Ops {
    traverse(F: Applicative<ArrayURI>): <A, B>(f: (a: A) => Array<B>, ta: Array<A>) => Array<Array<B>>
    traverse(F: Applicative<EitherURI>): <L, A, B>(f: (a: A) => Either<L, B>, ta: Array<A>) => Either<L, Array<B>>
    traverse(F: Applicative<IOURI>): <A, B>(f: (a: A) => IO<B>, ta: Array<A>) => IO<Array<B>>
    traverse(F: Applicative<OptionURI>): <A, B>(f: (a: A) => Option<B>, ta: Array<A>) => Option<Array<B>>
    traverse(F: Applicative<TaskURI>): <A, B>(f: (a: A) => Task<B>, ta: Array<A>) => Task<Array<B>>
  }
}

export interface FunctorCompositionArrayArray {
  map<A, B>(f: (a: A) => B, fa: Array<Array<A>>): Array<Array<B>>
}

declare module './Functor' {
  interface Ops {
    lift<A, B>(functor: Functor<ArrayURI>, f: (a: A) => B): (fa: Array<A>) => Array<B>
    voidRight<A, B>(functor: Functor<ArrayURI>, a: A, fb: Array<B>): Array<A>
    voidLeft<A, B>(functor: Functor<ArrayURI>, fa: Array<A>, b: B): Array<B>
    flap(functor: Functor<ArrayURI>): <A, B>(ff: Array<(a: A) => B>, a: A) => Array<B>
    getFunctorComposition(F: Functor<ArrayURI>, G: Functor<ArrayURI>): FunctorCompositionArrayArray
  }
}

declare module './Apply' {
  interface Ops {
    applyFirst(apply: Apply<ArrayURI>): <A, B>(fa: Array<A>, fb: Array<B>) => Array<A>
    applySecond(apply: Apply<ArrayURI>): <A, B>(fa: Array<A>, fb: Array<B>) => Array<B>
    liftA2<A, B, C>(apply: Apply<ArrayURI>, f: Curried2<A, B, C>): (fa: Array<A>, fb: Array<B>) => Array<C>
    liftA3<A, B, C, D>(
      apply: Apply<ArrayURI>,
      f: Curried3<A, B, C, D>
    ): (fa: Array<A>, fb: Array<B>, fc: Array<C>) => Array<D>
    liftA4<A, B, C, D, E>(
      apply: Apply<ArrayURI>,
      f: Curried4<A, B, C, D, E>
    ): (fa: Array<A>, fb: Array<B>, fc: Array<C>, fd: Array<D>) => Array<E>
  }
}

export interface ApplicativeCompositionArrayEither extends FunctorCompositionArrayEither {
  of<L, A>(a: A): Array<Either<L, A>>
  ap<L, A, B>(fgab: Array<Either<L, (a: A) => B>>, fga: Array<Either<L, A>>): Array<Either<L, B>>
}
export interface ApplicativeCompositionArrayIdentity extends FunctorCompositionArrayIdentity {
  of<A>(a: A): Array<Identity<A>>
  ap<A, B>(fgab: Array<Identity<(a: A) => B>>, fga: Array<Identity<A>>): Array<Identity<B>>
}
export interface ApplicativeCompositionArrayIO extends FunctorCompositionArrayIO {
  of<A>(a: A): Array<IO<A>>
  ap<A, B>(fgab: Array<IO<(a: A) => B>>, fga: Array<IO<A>>): Array<IO<B>>
}
export interface ApplicativeCompositionArrayOption extends FunctorCompositionArrayOption {
  of<A>(a: A): Array<Option<A>>
  ap<A, B>(fgab: Array<Option<(a: A) => B>>, fga: Array<Option<A>>): Array<Option<B>>
}
export interface ApplicativeCompositionArrayTask extends FunctorCompositionArrayTask {
  of<A>(a: A): Array<Task<A>>
  ap<A, B>(fgab: Array<Task<(a: A) => B>>, fga: Array<Task<A>>): Array<Task<B>>
}
export interface ApplicativeCompositionArrayValidation extends FunctorCompositionArrayValidation {
  of<L, A>(a: A): Array<Validation<L, A>>
  ap<L, A, B>(fgab: Array<Validation<L, (a: A) => B>>, fga: Array<Validation<L, A>>): Array<Validation<L, B>>
}

declare module './Applicative' {
  interface Ops {
    when(applicative: Applicative<ArrayURI>): (condition: boolean, fu: Array<void>) => Array<void>
    getApplicativeComposition(F: Applicative<ArrayURI>, G: Applicative<EitherURI>): ApplicativeCompositionArrayEither
    getApplicativeComposition(
      F: Applicative<ArrayURI>,
      G: Applicative<IdentityURI>
    ): ApplicativeCompositionArrayIdentity
    getApplicativeComposition(F: Applicative<ArrayURI>, G: Applicative<IOURI>): ApplicativeCompositionArrayIO
    getApplicativeComposition(F: Applicative<ArrayURI>, G: Applicative<OptionURI>): ApplicativeCompositionArrayOption
    getApplicativeComposition(F: Applicative<ArrayURI>, G: Applicative<TaskURI>): ApplicativeCompositionArrayTask
    getApplicativeComposition(
      F: Applicative<ArrayURI>,
      G: Applicative<ValidationURI>
    ): ApplicativeCompositionArrayValidation
  }
}

declare module './Chain' {
  interface Ops {
    flatten(chain: Chain<ArrayURI>): <A>(mma: Array<Array<A>>) => Array<A>
  }
}

declare module './Extend' {
  interface Ops {
    duplicate(extend: Extend<ArrayURI>): <A>(ma: Array<A>) => Array<Array<A>>
  }
}

declare module './Foldable' {
  interface Ops {
    traverse_(M: Applicative<IOURI>, F: Foldable<ArrayURI>): <A, B>(f: (a: A) => IO<B>, fa: Array<A>) => IO<void>
    sequence_(M: Applicative<IOURI>, F: Foldable<ArrayURI>): <A>(fa: Array<IO<A>>) => IO<void>
  }
}

declare module './Traversable' {
  interface Ops {
    sequence(
      applicative: Applicative<EitherURI>,
      traversable: Traversable<ArrayURI>
    ): <L, A>(tfa: Array<Either<L, A>>) => Either<L, Array<A>>

    sequence(
      applicative: Applicative<OptionURI>,
      traversable: Traversable<ArrayURI>
    ): <A>(tfa: Array<Option<A>>) => Option<Array<A>>

    sequence(
      applicative: Applicative<TaskURI>,
      traversable: Traversable<ArrayURI>
    ): <A>(tfa: Array<Task<A>>) => Task<Array<A>>

    sequence(
      applicative: Applicative<ValidationURI>,
      traversable: Traversable<ArrayURI>
    ): <L, A>(tfa: Array<Validation<L, A>>) => Validation<L, Array<A>>
  }
}

//
// Either
//

export interface FunctorCompositionArrayEither {
  map<L, A, B>(f: (a: A) => B, fa: Array<Either<L, A>>): Array<Either<L, B>>
}
export interface FunctorCompositionIOEither {
  map<L, A, B>(f: (a: A) => B, fa: IO<Either<L, A>>): IO<Either<L, B>>
}
export interface FunctorCompositionTaskEither {
  map<L, A, B>(f: (a: A) => B, fa: Task<Either<L, A>>): Task<Either<L, B>>
}

declare module './Functor' {
  interface Ops {
    lift<A, B>(functor: Functor<EitherURI>, f: (a: A) => B): <L>(fa: Either<L, A>) => Either<L, B>
    voidRight<L, A, B>(functor: Functor<EitherURI>, a: A, fb: Either<L, B>): Either<L, A>
    voidLeft<L, A, B>(functor: Functor<EitherURI>, fa: Either<L, A>, b: B): Either<L, B>
    flap(functor: Functor<EitherURI>): <L, A, B>(ff: Either<L, (a: A) => B>, a: A) => Either<L, B>
    getFunctorComposition(F: Functor<ArrayURI>, G: Functor<EitherURI>): FunctorCompositionArrayEither
    getFunctorComposition(F: Functor<IOURI>, G: Functor<EitherURI>): FunctorCompositionIOEither
    getFunctorComposition(F: Functor<TaskURI>, G: Functor<EitherURI>): FunctorCompositionTaskEither
  }
}

declare module './Apply' {
  interface Ops {
    applyFirst<L>(apply: Apply<EitherURI>): <A, B>(fa: Either<L, A>, fb: Either<L, B>) => Either<L, A>
    applySecond<L>(apply: Apply<EitherURI>): <A, B>(fa: Either<L, A>, fb: Either<L, B>) => Either<L, B>
    liftA2<L, A, B, C>(
      apply: Apply<EitherURI>,
      f: Curried2<A, B, C>
    ): (fa: Either<L, A>, fb: Either<L, B>) => Either<L, C>
    liftA3<L, A, B, C, D>(
      apply: Apply<EitherURI>,
      f: Curried3<A, B, C, D>
    ): (fa: Either<L, A>, fb: Either<L, B>, fc: Either<L, C>) => Either<L, D>
    liftA4<L, A, B, C, D, E>(
      apply: Apply<EitherURI>,
      f: Curried4<A, B, C, D, E>
    ): (fa: Either<L, A>, fb: Either<L, B>, fc: Either<L, C>, fd: Either<L, D>) => Either<L, E>
  }
}

export interface ApplicativeCompositionIOEither extends FunctorCompositionIOEither {
  of<L, A>(a: A): IO<Either<L, A>>
  ap<L, A, B>(fgab: IO<Either<L, (a: A) => B>>, fga: IO<Either<L, A>>): IO<Either<L, B>>
}
export interface ApplicativeCompositionTaskEither extends FunctorCompositionTaskEither {
  of<L, A>(a: A): Task<Either<L, A>>
  ap<L, A, B>(fgab: Task<Either<L, (a: A) => B>>, fga: Task<Either<L, A>>): Task<Either<L, B>>
}

declare module './Applicative' {
  interface Ops {
    when<L>(applicative: Applicative<EitherURI>): (condition: boolean, fu: Either<L, void>) => Either<L, void>
    getApplicativeComposition(F: Applicative<IOURI>, G: Applicative<EitherURI>): ApplicativeCompositionIOEither
    getApplicativeComposition(F: Applicative<TaskURI>, G: Applicative<EitherURI>): ApplicativeCompositionTaskEither
  }
}

declare module './Chain' {
  interface Ops {
    flatten(chain: Chain<EitherURI>): <L, A>(mma: Either<L, Either<L, A>>) => Either<L, A>
  }
}

declare module './Traversable' {
  interface Ops {
    sequence(
      applicative: Applicative<TaskURI>,
      traversable: Traversable<EitherURI>
    ): <L, A>(tfa: Either<L, Task<A>>) => Task<Either<L, A>>

    sequence<F>(
      applicative: Applicative<F>,
      traversable: Traversable<EitherURI>
    ): <L, A>(tfa: Either<L, HKT<F, A>>) => HKT<F, Either<L, A>>
  }
}

//
// Identity
//

export interface FunctorCompositionArrayIdentity {
  map<A, B>(f: (a: A) => B, fa: Array<Identity<A>>): Array<Identity<B>>
}

declare module './Functor' {
  interface Ops {
    lift<A, B>(functor: Functor<IdentityURI>, f: (a: A) => B): (fa: Identity<A>) => Identity<B>
    voidRight<A, B>(functor: Functor<IdentityURI>, a: A, fb: Identity<B>): Identity<A>
    voidLeft<A, B>(functor: Functor<IdentityURI>, fa: Identity<A>, b: B): Identity<B>
    flap(functor: Functor<IdentityURI>): <A, B>(ff: Identity<(a: A) => B>, a: A) => Identity<B>
    getFunctorComposition(F: Functor<ArrayURI>, G: Functor<IdentityURI>): FunctorCompositionArrayIdentity
  }
}

declare module './Apply' {
  interface Ops {
    applyFirst(apply: Apply<IdentityURI>): <A, B>(fa: Identity<A>, fb: Identity<B>) => Identity<A>
    applySecond(apply: Apply<IdentityURI>): <A, B>(fa: Identity<A>, fb: Identity<B>) => Identity<B>
    liftA2<A, B, C>(apply: Apply<IdentityURI>, f: Curried2<A, B, C>): (fa: Identity<A>, fb: Identity<B>) => Identity<C>
    liftA3<A, B, C, D>(
      apply: Apply<IdentityURI>,
      f: Curried3<A, B, C, D>
    ): (fa: Identity<A>, fb: Identity<B>, fc: Identity<C>) => Identity<D>
    liftA4<A, B, C, D, E>(
      apply: Apply<IdentityURI>,
      f: Curried4<A, B, C, D, E>
    ): (fa: Identity<A>, fb: Identity<B>, fc: Identity<C>, fd: Identity<D>) => Identity<E>
  }
}

declare module './Applicative' {
  interface Ops {
    when(applicative: Applicative<IdentityURI>): (condition: boolean, fu: Identity<void>) => Identity<void>
  }
}

declare module './Chain' {
  interface Ops {
    flatten(chain: Chain<IdentityURI>): <A>(mma: Identity<Identity<A>>) => Identity<A>
  }
}

declare module './Extend' {
  interface Ops {
    duplicate(extend: Extend<IdentityURI>): <A>(ma: Identity<A>) => Identity<Identity<A>>
  }
}

declare module './Traversable' {
  interface Ops {
    sequence(
      applicative: Applicative<TaskURI>,
      traversable: Traversable<IdentityURI>
    ): <A>(tfa: Identity<Task<A>>) => Task<Identity<A>>
  }
}

//
// IO
//

export interface FunctorCompositionArrayIO {
  map<A, B>(f: (a: A) => B, fa: Array<IO<A>>): Array<IO<B>>
}

declare module './Functor' {
  interface Ops {
    lift<A, B>(functor: Functor<IOURI>, f: (a: A) => B): (fa: IO<A>) => IO<B>
    voidRight<A, B>(functor: Functor<IOURI>, a: A, fb: IO<B>): IO<A>
    voidLeft<A, B>(functor: Functor<IOURI>, fa: IO<A>, b: B): IO<B>
    flap(functor: Functor<IOURI>): <A, B>(ff: IO<(a: A) => B>, a: A) => IO<B>
    getFunctorComposition(F: Functor<ArrayURI>, G: Functor<IOURI>): FunctorCompositionArrayIO
  }
}

declare module './Apply' {
  interface Ops {
    applyFirst(apply: Apply<IOURI>): <A, B>(fa: IO<A>, fb: IO<B>) => IO<A>
    applySecond(apply: Apply<IOURI>): <A, B>(fa: IO<A>, fb: IO<B>) => IO<B>
    liftA2<A, B, C>(apply: Apply<IOURI>, f: Curried2<A, B, C>): (fa: IO<A>, fb: IO<B>) => IO<C>
    liftA3<A, B, C, D>(apply: Apply<IOURI>, f: Curried3<A, B, C, D>): (fa: IO<A>, fb: IO<B>, fc: IO<C>) => IO<D>
    liftA4<A, B, C, D, E>(
      apply: Apply<IOURI>,
      f: Curried4<A, B, C, D, E>
    ): (fa: IO<A>, fb: IO<B>, fc: IO<C>, fd: IO<D>) => IO<E>
  }
}

declare module './Applicative' {
  interface Ops {
    when(applicative: Applicative<IOURI>): (condition: boolean, fu: IO<void>) => IO<void>
  }
}

declare module './Chain' {
  interface Ops {
    flatten(chain: Chain<IOURI>): <A>(mma: IO<IO<A>>) => IO<A>
  }
}

//
// NonEmptyArray
//

export interface FunctorCompositionNonEmptyArrayOption {
  map<A, B>(f: (a: A) => B, fa: NonEmptyArray<Option<A>>): NonEmptyArray<Option<B>>
}

export interface ApplicativeCompositionNonEmptyArrayOption extends FunctorCompositionNonEmptyArrayOption {
  of<A>(a: A): NonEmptyArray<Option<A>>
  ap<A, B>(fgab: NonEmptyArray<Option<(a: A) => B>>, fga: NonEmptyArray<Option<A>>): NonEmptyArray<Option<B>>
}

declare module './Functor' {
  interface Ops {
    lift<A, B>(functor: Functor<NonEmptyArrayURI>, f: (a: A) => B): (fa: NonEmptyArray<A>) => NonEmptyArray<B>
    voidRight<A, B>(functor: Functor<NonEmptyArrayURI>, a: A, fb: NonEmptyArray<B>): NonEmptyArray<A>
    voidLeft<A, B>(functor: Functor<NonEmptyArrayURI>, fa: NonEmptyArray<A>, b: B): NonEmptyArray<B>
    flap(functor: Functor<NonEmptyArrayURI>): <A, B>(ff: NonEmptyArray<(a: A) => B>, a: A) => NonEmptyArray<B>
  }
}

declare module './Apply' {
  interface Ops {
    applyFirst(apply: Apply<NonEmptyArrayURI>): <A, B>(fa: NonEmptyArray<A>, fb: NonEmptyArray<B>) => NonEmptyArray<A>
    applySecond(apply: Apply<NonEmptyArrayURI>): <A, B>(fa: NonEmptyArray<A>, fb: NonEmptyArray<B>) => NonEmptyArray<B>
    liftA2<A, B, C>(
      apply: Apply<NonEmptyArrayURI>,
      f: Curried2<A, B, C>
    ): (fa: NonEmptyArray<A>, fb: NonEmptyArray<B>) => NonEmptyArray<C>
    liftA3<A, B, C, D>(
      apply: Apply<NonEmptyArrayURI>,
      f: Curried3<A, B, C, D>
    ): (fa: NonEmptyArray<A>, fb: NonEmptyArray<B>, fc: NonEmptyArray<C>) => NonEmptyArray<D>
    liftA4<A, B, C, D, E>(
      apply: Apply<NonEmptyArrayURI>,
      f: Curried4<A, B, C, D, E>
    ): (fa: NonEmptyArray<A>, fb: NonEmptyArray<B>, fc: NonEmptyArray<C>, fd: NonEmptyArray<D>) => NonEmptyArray<E>
  }
}

declare module './Applicative' {
  interface Ops {
    when(
      applicative: Applicative<NonEmptyArrayURI>
    ): (condition: boolean, fu: NonEmptyArray<void>) => NonEmptyArray<void>
  }
}

declare module './Chain' {
  interface Ops {
    flatten(chain: Chain<NonEmptyArrayURI>): <A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A>
  }
}

declare module './Traversable' {
  interface Ops {
    sequence(
      applicative: Applicative<EitherURI>,
      traversable: Traversable<NonEmptyArrayURI>
    ): <L, A>(tfa: NonEmptyArray<Either<L, A>>) => Either<L, NonEmptyArray<A>>

    sequence(
      applicative: Applicative<OptionURI>,
      traversable: Traversable<NonEmptyArrayURI>
    ): <A>(tfa: NonEmptyArray<Option<A>>) => Option<NonEmptyArray<A>>

    sequence(
      applicative: Applicative<TaskURI>,
      traversable: Traversable<NonEmptyArrayURI>
    ): <A>(tfa: NonEmptyArray<Task<A>>) => Task<NonEmptyArray<A>>
  }
}

//
// Option
//

export interface FunctorCompositionFOption<F> {
  map<A, B>(f: (a: A) => B, fa: HKT<F, Option<A>>): HKT<F, Option<B>>
}
export interface FunctorCompositionArrayOption {
  map<A, B>(f: (a: A) => B, fa: Array<Option<A>>): Array<Option<B>>
}
export interface FunctorCompositionEitherOption {
  map<L, A, B>(f: (a: A) => B, fa: Either<L, Option<A>>): Either<L, Option<B>>
}
export interface FunctorCompositionIOOption {
  map<A, B>(f: (a: A) => B, fa: IO<Option<A>>): IO<Option<B>>
}
export interface FunctorCompositionTaskOption {
  map<A, B>(f: (a: A) => B, fa: Task<Option<A>>): Task<Option<B>>
}

declare module './Functor' {
  interface Ops {
    lift<A, B>(functor: Functor<OptionURI>, f: (a: A) => B): (fa: Option<A>) => Option<B>
    voidRight<A, B>(functor: Functor<OptionURI>, a: A, fb: Option<B>): Option<A>
    voidLeft<A, B>(functor: Functor<OptionURI>, fa: Option<A>, b: B): Option<B>
    flap(functor: Functor<OptionURI>): <A, B>(ff: Option<(a: A) => B>, a: A) => Option<B>
    getFunctorComposition(F: Functor<ArrayURI>, G: Functor<OptionURI>): FunctorCompositionArrayOption
    getFunctorComposition(F: Functor<IOURI>, G: Functor<OptionURI>): FunctorCompositionIOOption
    getFunctorComposition(F: Functor<TaskURI>, G: Functor<OptionURI>): FunctorCompositionTaskOption
    getFunctorComposition<F>(F: Functor<F>, G: Functor<OptionURI>): FunctorCompositionFOption<F>
  }
}

declare module './Apply' {
  interface Ops {
    applyFirst(apply: Apply<OptionURI>): <A, B>(fa: Option<A>, fb: Option<B>) => Option<A>
    applySecond(apply: Apply<OptionURI>): <A, B>(fa: Option<A>, fb: Option<B>) => Option<B>
    liftA2<A, B, C>(apply: Apply<OptionURI>, f: Curried2<A, B, C>): (fa: Option<A>, fb: Option<B>) => Option<C>
    liftA3<A, B, C, D>(
      apply: Apply<OptionURI>,
      f: Curried3<A, B, C, D>
    ): (fa: Option<A>, fb: Option<B>, fc: Option<C>) => Option<D>
    liftA4<A, B, C, D, E>(
      apply: Apply<OptionURI>,
      f: Curried4<A, B, C, D, E>
    ): (fa: Option<A>, fb: Option<B>, fc: Option<C>, fd: Option<D>) => Option<E>
  }
}

export interface ApplicativeCompositionFOption<F> extends FunctorCompositionFOption<F> {
  of<A>(a: A): HKT<F, Option<A>>
  ap<A, B>(fgab: HKT<F, Option<(a: A) => B>>, fga: HKT<F, Option<A>>): HKT<F, Option<B>>
}
export interface ApplicativeCompositionArrayOption extends FunctorCompositionArrayOption {
  of<A>(a: A): Array<Option<A>>
  ap<A, B>(fgab: Array<Option<(a: A) => B>>, fga: Array<Option<A>>): Array<Option<B>>
}
export interface ApplicativeCompositionEitherOption extends FunctorCompositionEitherOption {
  of<L, A>(a: A): Either<L, Option<A>>
  ap<L, A, B>(fgab: Either<L, Option<(a: A) => B>>, fga: Either<L, Option<A>>): Either<L, Option<B>>
}
export interface ApplicativeCompositionIOOption extends FunctorCompositionIOOption {
  of<A>(a: A): IO<Option<A>>
  ap<A, B>(fgab: IO<Option<(a: A) => B>>, fga: IO<Option<A>>): IO<Option<B>>
}
export interface ApplicativeCompositionTaskOption extends FunctorCompositionTaskOption {
  of<A>(a: A): Task<Option<A>>
  ap<A, B>(fgab: Task<Option<(a: A) => B>>, fga: Task<Option<A>>): Task<Option<B>>
}

declare module './Applicative' {
  interface Ops {
    when(applicative: Applicative<OptionURI>): (condition: boolean, fu: Option<void>) => Option<void>
    getApplicativeComposition<F>(F: Applicative<ArrayURI>, G: Applicative<OptionURI>): ApplicativeCompositionArrayOption
    getApplicativeComposition<F>(F: Applicative<IOURI>, G: Applicative<OptionURI>): ApplicativeCompositionIOOption
    getApplicativeComposition<F>(F: Applicative<TaskURI>, G: Applicative<OptionURI>): ApplicativeCompositionTaskOption
    getApplicativeComposition<F>(F: Applicative<F>, G: Applicative<OptionURI>): ApplicativeCompositionFOption<F>
  }
}

declare module './Chain' {
  interface Ops {
    flatten(chain: Chain<OptionURI>): <A>(mma: Option<Option<A>>) => Option<A>
  }
}

declare module './Traversable' {
  interface Ops {
    sequence(
      applicative: Applicative<TaskURI>,
      traversable: Traversable<OptionURI>
    ): <A>(tfa: Option<Task<A>>) => Task<Option<A>>
  }
}

//
// Task
//

export interface FunctorCompositionArrayTask {
  map<A, B>(f: (a: A) => B, fa: Array<Task<A>>): Array<Task<B>>
}

declare module './Functor' {
  interface Ops {
    lift<A, B>(functor: Functor<TaskURI>, f: (a: A) => B): (fa: Task<A>) => Task<B>
    voidRight<A, B>(functor: Functor<TaskURI>, a: A, fb: Task<B>): Task<A>
    voidLeft<A, B>(functor: Functor<TaskURI>, fa: Task<A>, b: B): Task<B>
    flap(functor: Functor<TaskURI>): <A, B>(ff: Task<(a: A) => B>, a: A) => Task<B>
    getFunctorComposition(F: Functor<ArrayURI>, G: Functor<TaskURI>): FunctorCompositionArrayTask
  }
}

declare module './Apply' {
  interface Ops {
    applyFirst(apply: Apply<TaskURI>): <A, B>(fa: Task<A>, fb: Task<B>) => Task<A>
    applySecond(apply: Apply<TaskURI>): <A, B>(fa: Task<A>, fb: Task<B>) => Task<B>
    liftA2<A, B, C>(apply: Apply<TaskURI>, f: Curried2<A, B, C>): (fa: Task<A>, fb: Task<B>) => Task<C>
    liftA3<A, B, C, D>(
      apply: Apply<TaskURI>,
      f: Curried3<A, B, C, D>
    ): (fa: Task<A>, fb: Task<B>, fc: Task<C>) => Task<D>
    liftA4<A, B, C, D, E>(
      apply: Apply<TaskURI>,
      f: Curried4<A, B, C, D, E>
    ): (fa: Task<A>, fb: Task<B>, fc: Task<C>, fd: Task<D>) => Task<E>
  }
}

declare module './Applicative' {
  interface Ops {
    when(applicative: Applicative<TaskURI>): (condition: boolean, fu: Task<void>) => Task<void>
  }
}

declare module './Chain' {
  interface Ops {
    flatten(chain: Chain<TaskURI>): <A>(mma: Task<Task<A>>) => Task<A>
  }
}

//
// Validation
//

export interface FunctorCompositionArrayValidation {
  map<L, A, B>(f: (a: A) => B, fa: Array<Validation<L, A>>): Array<Validation<L, B>>
}
export interface FunctorCompositionTaskValidation {
  map<L, A, B>(f: (a: A) => B, fa: Task<Validation<L, A>>): Task<Validation<L, B>>
}

declare module './Functor' {
  interface Ops {
    lift<A, B>(functor: Functor<ValidationURI>, f: (a: A) => B): <L>(fa: Validation<L, A>) => Validation<L, B>
    voidRight<L, A, B>(functor: Functor<ValidationURI>, a: A, fb: Validation<L, B>): Validation<L, A>
    voidLeft<L, A, B>(functor: Functor<ValidationURI>, fa: Validation<L, A>, b: B): Validation<L, B>
    flap(functor: Functor<ValidationURI>): <L, A, B>(ff: Validation<L, (a: A) => B>, a: A) => Validation<L, B>
    getFunctorComposition(F: Functor<ArrayURI>, G: Functor<ValidationURI>): FunctorCompositionArrayValidation
    getFunctorComposition(F: Functor<TaskURI>, G: Functor<ValidationURI>): FunctorCompositionTaskValidation
  }
}

declare module './Apply' {
  interface Ops {
    applyFirst<L>(apply: Apply<ValidationURI>): <A, B>(fa: Validation<L, A>, fb: Validation<L, B>) => Validation<L, A>
    applySecond<L>(apply: Apply<ValidationURI>): <A, B>(fa: Validation<L, A>, fb: Validation<L, B>) => Validation<L, B>
    liftA2<L, A, B, C>(
      apply: Apply<ValidationURI>,
      f: Curried2<A, B, C>
    ): (fa: Validation<L, A>, fb: Validation<L, B>) => Validation<L, C>
    liftA3<L, A, B, C, D>(
      apply: Apply<ValidationURI>,
      f: Curried3<A, B, C, D>
    ): (fa: Validation<L, A>, fb: Validation<L, B>, fc: Validation<L, C>) => Validation<L, D>
    liftA4<L, A, B, C, D, E>(
      apply: Apply<ValidationURI>,
      f: Curried4<A, B, C, D, E>
    ): (fa: Validation<L, A>, fb: Validation<L, B>, fc: Validation<L, C>, fd: Validation<L, D>) => Validation<L, E>
  }
}

export interface ApplicativeCompositionTaskValidation extends FunctorCompositionTaskValidation {
  of<L, A>(a: A): Task<Validation<L, A>>
  ap<L, A, B>(fgab: Task<Validation<L, (a: A) => B>>, fga: Task<Validation<L, A>>): Task<Validation<L, B>>
}

declare module './Applicative' {
  interface Ops {
    when<L>(
      applicative: Applicative<ValidationURI>
    ): (condition: boolean, fu: Validation<L, void>) => Validation<L, void>
    getApplicativeComposition(
      F: Applicative<TaskURI>,
      G: Applicative<ValidationURI>
    ): ApplicativeCompositionTaskValidation
  }
}

declare module './Traversable' {
  interface Ops {
    sequence(
      applicative: Applicative<TaskURI>,
      traversable: Traversable<ValidationURI>
    ): <L, A>(tfa: Validation<L, Task<A>>) => Task<Validation<L, A>>
  }
}
