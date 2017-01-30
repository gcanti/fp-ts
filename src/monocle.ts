import { HKT, Applicative, Monoid, Traversable, monoidArray, monoidAny, monoidAll, Foldable, foldMap } from './cats'
import * as option from './Option'
import { Some, Option } from './Option'
import { identity, constant } from './function'
import * as id from './Identity'
import * as con from './Const'

export type Get<S, A> = (s: S) => A
export type ReverseGet<S, A> = (a: A) => S
export type Set<S, A> = (a: A, s: S) => S
export type GetOption<S, A> = (s: S) => Option<A>

/*
  Laws:
  1. get . reverseGet = identity
  2. reversetGet . get = identity
*/
export class Iso<S, A> {
  constructor(
    public get: Get<S, A>,
    public reverseGet: ReverseGet<S, A>
  ) { }

  /** compose a Iso with a Iso */
  compose<B>(ab: Iso<A, B>): Iso<S, B> {
    return new Iso<S, B>(
      s => ab.get(this.get(s)),
      b => this.reverseGet(ab.reverseGet(b))
    )
  }

  modify(f: (a: A) => A, s: S): S {
    return this.reverseGet(f(this.get(s)))
  }

  /** view a ISO as a Lens */
  asLens(): Lens<S, A> {
    return new Lens(
      this.get,
      this.reverseGet
    )
  }

  /** view a ISO as a Prism */
  asPrism(): Prism<S, A> {
    return new Prism(
      s => new Some(this.get(s)),
      this.reverseGet
    )
  }
}

export class Lens<S, A> {
  constructor(
    public get: Get<S, A>,
    public set: Set<S, A>
  ) { }

  modify(f: (a: A) => A, s: S): S {
    return this.set(f(this.get(s)), s)
  }

  /** compose a Lens with a Lens */
  compose<B>(ab: Lens<A, B>): Lens<S, B> {
    return new Lens<S, B>(
      s => ab.get(this.get(s)),
      (b, s) => this.set(ab.set(b, this.get(s)), s)
    )
  }

  /** view a Lens as a Option */
  asOptional(): Optional<S, A> {
    return new Optional(
      s => new Some(this.get(s)),
      this.set
    )
  }
}

export class Prism<S, A> {
  constructor(
    public getOption: GetOption<S, A>,
    public reverseGet: ReverseGet<S, A>
  ) { }

  modify(f: (a: A) => A, s: S): S {
    return this.modifyOption(f, s)
      .fold(constant(s), identity)
  }

  modifyOption(f: (a: A) => A, s: S): Option<S> {
    return this.getOption(s)
      .map(a => this.reverseGet(f(a)))
  }

  /** compose a Prism with a Prism */
  compose<B>(ab: Prism<A, B>): Prism<S, B> {
    return new Prism<S, B>(
      s => this.getOption(s).chain(a => ab.getOption(a)),
      b => this.reverseGet(ab.reverseGet(b))
    )
  }

  /** view a Prism as a Optional */
  asOptional(): Optional<S, A> {
    return new Optional(
      this.getOption,
      this.reverseGet
    )
  }
}

export class Optional<S, A> {
  constructor(
    public getOption: GetOption<S, A>,
    public set: Set<S, A>
  ){}

  modify(f: (a: A) => A, s: S): S {
    return this.modifyOption(f, s)
      .fold(constant(s), identity)
  }

  modifyOption(f: (a: A) => A, s: S): Option<S> {
    return this.getOption(s)
      .map(a => this.set(f(a), s))
  }

  /** compose a Optional with a Optional */
  compose<B>(ab: Optional<A, B>): Optional<S, B> {
    return new Optional<S, B>(
      s => this.getOption(s).chain(a => ab.getOption(a)),
      (b, s) => this.modify(a => ab.set(b, a), s)
    )
  }

  /** view a Options as a Traversal */
  asTraversal(): Traversal<S, A> {
    return new Traversal<S, A>(
      <F>(applicative: Applicative<F>, f: (a: A) => HKT<F, A>, s: S): HKT<F, S> =>
        this.getOption(s).fold(
          () => applicative.of(s),
          a => applicative.map(a => this.set(a, s), f(a))
        )
    )
  }
}

export class Traversal<S, A> {
  constructor(
    public modifyF: <F>(applicative: Applicative<F>, f: (a: A) => HKT<F, A>, s: S) => HKT<F, S>
  ){}

  modify(f: (a: A) => A, s: S): S {
    return (this.modifyF(id, a => id.of(f(a)), s) as id.Identity<S>).extract()
  }

  set(a: A, s: S): S {
    return this.modify(constant(a), s)
  }

  /** compose a Traversal with a Traversal */
  compose<B>(ab: Traversal<A, B>): Traversal<S, B> {
    return new Traversal<S, B>(
      <F>(applicative: Applicative<F>, f: (a: B) => HKT<F, B>, s: S): HKT<F, S> =>
        this.modifyF(applicative, a => ab.modifyF(applicative, f, a), s)
    )
  }

  /** view a Traversal as a Fold */
  asFold(): Fold<S, A> {
    return new Fold(
      <M>(monoid: Monoid<M>, f: (a: A) => M, s: S): M =>
        (this.modifyF(con.getApplicative(monoid), a => new con.Const<M, A>(f(a)), s) as con.Const<M, S>).fold(identity)
    )
  }
}

/** create a Traversal from a Traversable */
export function fromTraversable<T, A>(traversable: Traversable<T>): Traversal<HKT<T, A>, A> {
  return new Traversal<HKT<T, A>, A>(
      <F>(applicative: Applicative<F>, f: (a: A) => HKT<F, A>, s: HKT<T, A>): HKT<F, HKT<T, A>> =>
        traversable.traverse(applicative, f, s)
  )
}

export class Fold<S, A> {
  constructor(
    public foldMap: <M>(monoid: Monoid<M>, f: (a: A) => M, s: S) => M
  ){}

  /** compose a Fold with a Fold */
  compose<B>(ab: Fold<A, B>): Fold<S, B> {
    return new Fold<S, B>(
      <M>(monoid: Monoid<M>, f: (b: B) => M, s: S): M =>
        this.foldMap(monoid, a => ab.foldMap(monoid, f, a), s)
    )
  }

  /** get all the targets of a Fold */
  getAll(s: S): Array<A> {
    return this.foldMap(monoidArray, a => [a], s)
  }

  /** find the first target of a Fold matching the predicate */
  find<S, A>(fold: Fold<S, A>, p: (a: A) => boolean, s: S): Option<A> {
    return fold.foldMap(option.monoidFirst, a => p(a) ? option.of(a) : option.none, s)
  }

  /** get the first target of a Fold */
  headOption<S, A>(fold: Fold<S, A>, s: S): Option<A> {
    return this.find(fold, () => true, s)
  }

  /** check if at least one target satisfies the predicate */
  exist<S, A>(fold: Fold<S, A>, p: (a: A) => boolean, s: S): boolean {
    return fold.foldMap(monoidAny, p, s)
  }

  /** check if all targets satisfy the predicate */
  all<S, A>(fold: Fold<S, A>, p: (a: A) => boolean, s: S): boolean {
    return fold.foldMap(monoidAll, p, s)
  }

}

/** create a Fold from a Foldable */
export function fromFoldable<F, A>(fold: Foldable<F>): Fold<HKT<F, A>, A> {
  return new Fold(
      <M>(monoid: Monoid<M>, f: (a: A) => M, s: HKT<F, A>): M =>
        foldMap(fold, monoid, f, s)
  )
}
