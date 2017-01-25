import { HKT, Applicative, Monoid, Traversable } from './cats'
import { Option, Some } from './Option'
import { identity, constant } from './function'
import * as Identity from './Identity'

type Get<S, A> = (s: S) => A
type ReverseGet<S, A> = (a: A) => S
type Set<S, A> = (a: A, s: S) => S
type GetOption<S, A> = (s: S) => Option<A>
type ModifyF<S, A> = <F>(applicative: Applicative<F>, f: (a: A) => HKT<F, A>, s: S) => HKT<F, S>
type FoldMap<S, A> = <M>(monoid: Monoid<M>, f: (a: A) => M, s: S) => M

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

  compose<B>(ab: Iso<A, B>): Iso<S, B> {
    return new Iso<S, B>(
      s => ab.get(this.get(s)),
      b => this.reverseGet(ab.reverseGet(b))
    )
  }

  modify(f: (a: A) => A, s: S): S {
    return this.reverseGet(f(this.get(s)))
  }

  asLens(): Lens<S, A> {
    return new Lens(
      this.get,
      this.reverseGet
    )
  }

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

  compose<B>(ab: Lens<A, B>): Lens<S, B> {
    return new Lens<S, B>(
      s => ab.get(this.get(s)),
      (b, s) => this.set(ab.set(b, this.get(s)), s)
    )
  }

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

  compose<B>(ab: Prism<A, B>): Prism<S, B> {
    return new Prism<S, B>(
      s => this.getOption(s).chain(a => ab.getOption(a)),
      b => this.reverseGet(ab.reverseGet(b))
    )
  }

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

  compose<B>(ab: Optional<A, B>): Optional<S, B> {
    return new Optional<S, B>(
      s => this.getOption(s).chain(a => ab.getOption(a)),
      (b, s) => this.modify(a => ab.set(b, a), s)
    )
  }

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
    public modifyF: ModifyF<S, A>
  ){}

  modify(f: (a: A) => A, s: S): S {
    return Identity.prj(this.modifyF(Identity.monad, a => Identity.inj(f(a)), s))
  }

  set(a: A, s: S): S {
    return this.modify(constant(a), s)
  }

  compose<B>(ab: Traversal<A, B>): Traversal<S, B> {
    return new Traversal<S, B>(
      <F>(applicative: Applicative<F>, f: (a: B) => HKT<F, B>, s: S): HKT<F, S> =>
        this.modifyF(applicative, a => ab.modifyF(applicative, f, a), s)
    )
  }

  // asFold(): Fold<S, A> {
  // }
}

export function fromTraversable<T, A>(traversable: Traversable<T>): Traversal<HKT<T, A>, A> {
  return new Traversal<HKT<T, A>, A>(
      <F>(applicative: Applicative<F>, f: (a: A) => HKT<F, A>, s: HKT<T, A>): HKT<F, HKT<T, A>> =>
        traversable.traverse(applicative, f, s)
  )
}

export class Fold<S, A> {
  constructor(
    public foldMap: FoldMap<S, A>
  ){}
}
