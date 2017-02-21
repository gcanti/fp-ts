import { HKT } from './HKT'
import { Monoid } from './Monoid'
import { Applicative } from './Applicative'
import { Monad } from './Monad'
import { Foldable } from './Foldable'
import { Traversable } from './Traversable'
import { Alternative } from './Alternative'
import { Plus } from './Plus'
import { liftA2 } from './Apply'
import { HKTOption, Option } from './Option'
import * as option from './Option'
import { Ord, toNativeComparator } from './Ord'
import { Predicate, identity, constant, curry, Lazy, Function1, Function2, Endomorphism } from './function'

// TODO(v0.1) replace with 'Array'
export type URI = 'Arr'

declare global {
  interface Array<T> {
    __hkt: URI
    __hkta: T
  }
}

// TODO(v0.1) remove
/** Deprecated. Use a raw array instead
 * @deprecated
 */
export const to = identity

// TODO(v0.1) remove
/** Deprecated. Use a raw array instead
 * @deprecated
 */
export const from = identity

export const empty: Lazy<Array<any>> = constant([])

export function concat<A>(x: Array<A>, y: Array<A>): Array<A> {
  return x.concat(y)
}

export function map<A, B>(f: Function1<A, B>, fa: Array<A>): Array<B> {
  return fa.map(f)
}

export function of<A>(a: A): Array<A> {
  return [a]
}

export function ap<A, B>(fab: Array<Function1<A, B>>, fa: Array<A>): Array<B> {
  return fab.reduce((acc: Array<B>, f) => acc.concat(fa.map(f)), [])
}

export function chain<A, B>(f: Function1<A, Array<B>>, fa: Array<A>): Array<B> {
  return fa.reduce((acc: Array<B>, a) => acc.concat(f(a)), [])
}

export function reduce<A, B>(f: Function2<B, A, B>, b: B, fa: Array<A>): B {
  return fa.reduce(f, b)
}

export const curriedSnoc = curry(snoc)

export function traverse<F, A, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>, ta: Array<A>): HKT<F, Array<B>> {
  const snocA2 = liftA2(applicative, curriedSnoc)
  return reduce((fab, a) => snocA2(fab, f(a)), applicative.of(empty()), ta)
}

export const zero = empty

export const alt = concat

export function unfoldr<A, B>(f: Function1<B, HKTOption<[A, B]>>, b: B): Array<A> {
  const ret: Array<A> = []
  let bb = b
  while (true) {
    const mt = f(bb)
    if (option.isSome(mt)) {
      const [a, b] = mt.value
      ret.push(a)
      bb = b
    } else {
      break
    }
  }
  return ret
}

export function fold<A, B>(nil: Lazy<B>, cons: (head: A, tail: Array<A>) => B, as: Array<A>): B {
  return as.length === 0 ? nil() : cons(as[0], as.slice(1))
}

export function length<A>(as: Array<A>): number {
  return as.length
}

export function isEmpty<A>(as: Array<A>): boolean {
  return length(as) === 0
}

export function isOutOfBound<A>(i: number, as: Array<A>): boolean {
  return i < 0 || i >= as.length
}

export function index<A>(as: Array<A>, i: number): Option<A> {
  return isOutOfBound(i, as) ? option.none : option.some(as[i])
}

export function cons<A>(a: A, as: Array<A>): Array<A> {
  return [a].concat(as)
}

export function snoc<A>(as: Array<A>, a: A): Array<A> {
  return as.concat(a)
}

export function head<A>(as: Array<A>): Option<A> {
  return isEmpty(as) ? option.none : option.some(as[0])
}

export function last<A>(as: Array<A>): Option<A> {
  return index(as, length(as) - 1)
}

export function tail<A>(as: Array<A>): Option<Array<A>> {
  const len = as.length
  return len === 0 ? option.none : option.some(as.slice(1))
}

export function slice<A>(start: number, end: number, as: Array<A>): Array<A> {
  return as.slice(start, end)
}

export function init<A>(as: Array<A>): Option<Array<A>> {
  const len = as.length
  return len === 0 ? option.none : option.some(as.slice(0, len - 1))
}

export function take<A>(n: number, as: Array<A>): Array<A> {
  return slice(0, n, as)
}

export function takeWhile<A>(predicate: Predicate<A>, as: Array<A>): Array<A> {
  return as.slice().filter(predicate)
}

export function drop<A>(n: number, as: Array<A>): Array<A> {
  return slice(n, length(as), as)
}

export function dropWhile<A>(predicate: Predicate<A>, as: Array<A>): Array<A> {
  return takeWhile(a => !predicate(a), as)
}

export function findIndex<A>(predicate: Predicate<A>, as: Array<A>): Option<number> {
  const len = as.length
  for (let i = 0; i < len; i++) {
    if (predicate(as[i])) {
      return option.some(i)
    }
  }
  return option.none
}

export function filter<A>(predicate: Predicate<A>, as: Array<A>): Array<A> {
  return as.filter(predicate)
}

export function copy<A>(as: Array<A>): Array<A> {
  return as.slice()
}

export function unsafeInsertAt<A>(i: number, a: A, as: Array<A>): Array<A> {
  const xs = copy(as)
  xs.splice(i, 0, a)
  return xs
}

export function insertAt<A>(i: number, a: A, as: Array<A>): Option<Array<A>> {
  return i < 0 || i > as.length ? option.none : option.some(unsafeInsertAt(i, a, as))
}

export function unsafeUpdateAt<A>(i: number, a: A, as: Array<A>): Array<A> {
  const xs = copy(as)
  xs[i] = a
  return xs
}

export function updateAt<A>(i: number, a: A, as: Array<A>): Option<Array<A>> {
  return isOutOfBound(i, as) ? option.none : option.some(unsafeUpdateAt(i, a, as))
}

export function unsafeDeleteAt<A>(i: number, as: Array<A>): Array<A> {
  const xs = copy(as)
  xs.splice(i, 1)
  return xs
}

export function deleteAt<A>(i: number, as: Array<A>): Option<Array<A>> {
  return isOutOfBound(i, as) ? option.none : option.some(unsafeDeleteAt(i, as))
}

export function modifyAt<A>(i: number, f: Endomorphism<A>, as: Array<A>): Option<Array<A>> {
  return isOutOfBound(i, as) ? option.none : updateAt(i, f(as[i]), as)
}

export function reverse<A>(as: Array<A>): Array<A> {
  return copy(as).reverse()
}

export function mapOption<A, B>(f: Function1<A, HKTOption<B>>, as: Array<A>): Array<B> {
  return chain(a => option.fold(empty, of, f(a)), as)
}

export function catOptions<A>(as: Array<HKTOption<A>>): Array<A> {
  return mapOption<HKTOption<A>, A>(identity, as)
}

export function sort<A>(ord: Ord<A>, as: Array<A>): Array<A> {
  return copy(as).sort(toNativeComparator(ord.compare))
}

// tslint:disable-next-line no-unused-expression
;(
  { empty, concat, map, of, ap, chain, reduce, traverse, zero, alt } as (
    Monoid<Array<any>> &
    Monad<URI> &
    Foldable<URI> &
    Traversable<URI> &
    Alternative<URI> &
    Plus<URI>
  )
)
