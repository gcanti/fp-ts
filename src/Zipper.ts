import { Applicative, Applicative1 } from './Applicative'
import { array, cons, drop, empty, isEmpty, isOutOfBound, snoc, take } from './Array'
import { Comonad1 } from './Comonad'
import { Foldable2v1 } from './Foldable2v'
import { decrement, increment, toString } from './function'
import { HKT } from './HKT'
import { Monoid } from './Monoid'
import { NonEmptyArray } from './NonEmptyArray'
import { none, Option, some } from './Option_'
import { Semigroup } from './Semigroup_'
import { Traversable2v1 } from './Traversable2v'

/*
  Adapted from

  - https://github.com/DavidHarrison/purescript-list-zipper
  - https://github.com/thunklife/purescript-zipper
  - https://github.com/scalaz/scalaz/blob/series/7.3.x/core/src/main/scala/scalaz/Zipper.scala
*/

declare module './HKT' {
  interface URI2HKT<A> {
    Zipper: Zipper<A>
  }
}

export const URI = 'Zipper'

export type URI = typeof URI

/**
 * Provides a pointed array, which is a non-empty zipper-like array structure that tracks an index (focus)
 * position in an array. Focus can be moved forward and backwards through the array.
 *
 * The array `[1, 2, 3, 4]` with focus on `3` is represented by `new Zipper([1, 2], 3, [4])`
 *
 * @data
 * @constructor Zipper
 * @since 1.9.0
 */
export class Zipper<A> {
  readonly _A!: A
  readonly _URI!: URI
  length: number
  constructor(readonly lefts: Array<A>, readonly focus: A, readonly rights: Array<A>) {
    this.length = lefts.length + 1 + rights.length
  }
  /**
   * Update the focus in this zipper.
   * @since 1.9.0
   */
  update(a: A): Zipper<A> {
    return new Zipper(this.lefts, a, this.rights)
  }
  /**
   * Apply `f` to the focus and update with the result.
   * @since 1.9.0
   */
  modify(f: (a: A) => A): Zipper<A> {
    return this.update(f(this.focus))
  }
  /**
   * @since 1.9.0
   */
  toArray(): Array<A> {
    return snoc(this.lefts, this.focus).concat(this.rights)
  }
  /**
   * @since 1.9.0
   */
  isOutOfBound(index: number): boolean {
    return index < 0 || index >= this.length
  }
  /**
   * Moves focus in the zipper, or `None` if there is no such element.
   * @since 1.9.0
   */
  move(f: (currentIndex: number) => number): Option<Zipper<A>> {
    const newIndex = f(this.lefts.length)
    if (this.isOutOfBound(newIndex)) {
      return none
    } else {
      return fromArray(this.toArray(), newIndex)
    }
  }
  /**
   * @since 1.9.0
   */
  up(): Option<Zipper<A>> {
    return this.move(decrement)
  }
  /**
   * @since 1.9.0
   */
  down(): Option<Zipper<A>> {
    return this.move(increment)
  }
  /**
   * Moves focus to the start of the zipper.
   * @since 1.9.0
   */
  start(): Zipper<A> {
    if (isEmpty(this.lefts)) {
      return this
    } else {
      return new Zipper(empty, this.lefts[0], snoc(drop(1, this.lefts), this.focus).concat(this.rights))
    }
  }
  /**
   * Moves focus to the end of the zipper.
   * @since 1.9.0
   */
  end(): Zipper<A> {
    const len = this.rights.length
    if (len === 0) {
      return this
    } else {
      return new Zipper(snoc(this.lefts, this.focus).concat(take(len - 1, this.rights)), this.rights[len - 1], empty)
    }
  }
  /**
   * Inserts an element to the left of focus and focuses on the new element.
   * @since 1.9.0
   */
  insertLeft(a: A): Zipper<A> {
    return new Zipper(this.lefts, a, cons(this.focus, this.rights))
  }
  /**
   * Inserts an element to the right of focus and focuses on the new element.
   * @since 1.9.0
   */
  insertRight(a: A): Zipper<A> {
    return new Zipper(snoc(this.lefts, this.focus), a, this.rights)
  }
  /**
   * Deletes the element at focus and moves the focus to the left. If there is no element on the left,
   * focus is moved to the right.
   * @since 1.9.0
   */
  deleteLeft(): Option<Zipper<A>> {
    const len = this.lefts.length
    return fromArray(this.lefts.concat(this.rights), len > 0 ? len - 1 : 0)
  }
  /**
   * Deletes the element at focus and moves the focus to the right. If there is no element on the right,
   * focus is moved to the left.
   * @since 1.9.0
   */

  deleteRight(): Option<Zipper<A>> {
    const lenl = this.lefts.length
    const lenr = this.rights.length
    return fromArray(this.lefts.concat(this.rights), lenr > 0 ? lenl : lenl - 1)
  }
  /**
   * @since 1.9.0
   */
  map<B>(f: (a: A) => B): Zipper<B> {
    return new Zipper(this.lefts.map(f), f(this.focus), this.rights.map(f))
  }
  /**
   * @since 1.9.0
   */
  ap<B>(fab: Zipper<(a: A) => B>): Zipper<B> {
    return new Zipper(array.ap(fab.lefts, this.lefts), fab.focus(this.focus), array.ap(fab.rights, this.rights))
  }
  /**
   * @since 1.9.0
   */
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return this.rights.reduce(f, f(this.lefts.reduce(f, b), this.focus))
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Zipper(${toString(this.lefts)}, ${toString(this.focus)}, ${toString(this.rights)})`
  }
}

/**
 * @since 1.9.0
 */
export const fromArray = <A>(as: Array<A>, focusIndex: number = 0): Option<Zipper<A>> => {
  if (isEmpty(as) || isOutOfBound(focusIndex, as)) {
    return none
  } else {
    return some(new Zipper(take(focusIndex, as), as[focusIndex], drop(focusIndex + 1, as)))
  }
}

/**
 * @since 1.9.0
 */
export const fromNonEmptyArray = <A>(nea: NonEmptyArray<A>): Zipper<A> => {
  return new Zipper(empty, nea.head, nea.tail)
}

const map = <A, B>(fa: Zipper<A>, f: (a: A) => B): Zipper<B> => {
  return fa.map(f)
}

const of = <A>(a: A): Zipper<A> => {
  return new Zipper(empty, a, empty)
}

const ap = <A, B>(fab: Zipper<(a: A) => B>, fa: Zipper<A>): Zipper<B> => {
  return fa.ap(fab)
}

const reduce = <A, B>(fa: Zipper<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const foldMap = <M>(M: Monoid<M>) => <A>(fa: Zipper<A>, f: (a: A) => M): M => {
  const lefts = fa.lefts.reduce((acc, a) => M.concat(acc, f(a)), M.empty)
  const rights = fa.rights.reduce((acc, a) => M.concat(acc, f(a)), M.empty)
  return M.concat(M.concat(lefts, f(fa.focus)), rights)
}

const foldr = <A, B>(fa: Zipper<A>, b: B, f: (a: A, b: B) => B): B => {
  const rights = fa.rights.reduceRight((acc, a) => f(a, acc), b)
  const focus = f(fa.focus, rights)
  return fa.lefts.reduceRight((acc, a) => f(a, acc), focus)
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: Zipper<A>, f: (a: A) => HKT<F, B>) => HKT<F, Zipper<B>> {
  const traverseF = array.traverse(F)
  return <A, B>(ta: Zipper<A>, f: (a: A) => HKT<F, B>) =>
    F.ap(
      F.ap(
        F.map(traverseF(ta.lefts, f), lefts => (focus: B) => (rights: Array<B>) => new Zipper(lefts, focus, rights)),
        f(ta.focus)
      ),
      traverseF(ta.rights, f)
    )
}

function sequence<F>(F: Applicative<F>): <A>(ta: Zipper<HKT<F, A>>) => HKT<F, Zipper<A>> {
  const sequenceF = array.sequence(F)
  return <A>(ta: Zipper<HKT<F, A>>) =>
    F.ap(
      F.ap(
        F.map(sequenceF(ta.lefts), lefts => (focus: A) => (rights: Array<A>) => new Zipper(lefts, focus, rights)),
        ta.focus
      ),
      sequenceF(ta.rights)
    )
}

const extract = <A>(fa: Zipper<A>): A => {
  return fa.focus
}

const extend = <A, B>(fa: Zipper<A>, f: (fa: Zipper<A>) => B): Zipper<B> => {
  const lefts = fa.lefts.map((a, i) =>
    f(new Zipper(take(i, fa.lefts), a, snoc(drop(i + 1, fa.lefts), fa.focus).concat(fa.rights)))
  )
  const rights = fa.rights.map((a, i) =>
    f(new Zipper(snoc(fa.lefts, fa.focus).concat(take(i, fa.rights)), a, drop(i + 1, fa.rights)))
  )
  return new Zipper(lefts, f(fa), rights)
}

/**
 * @since 1.9.0
 */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Zipper<A>> => {
  return {
    concat: (x, y) => new Zipper(x.lefts.concat(y.lefts), S.concat(x.focus, y.focus), x.rights.concat(y.rights))
  }
}

/**
 * @since 1.9.0
 */
export const getMonoid = <A>(M: Monoid<A>): Monoid<Zipper<A>> => {
  return {
    ...getSemigroup(M),
    empty: new Zipper(empty, M.empty, empty)
  }
}

/**
 * @since 1.9.0
 */
export const zipper: Applicative1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = {
  URI,
  map,
  of,
  ap,
  extend,
  extract,
  reduce,
  foldMap,
  foldr,
  traverse,
  sequence
}
