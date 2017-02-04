import { HKT } from './HKT'
import { Monoid } from './Monoid'
import { Applicative } from './Applicative'
import { Monad } from './Monad'
import { Foldable } from './Foldable'
import { Traversable } from './Traversable'
import { Alternative } from './Alternative'
import { Plus } from './Plus'
import { liftA2 } from './Apply'
import { Option } from './Option'
import * as option from './Option'
import { Ord, toNativeComparator } from './Ord'
import { Predicate, identity } from './function'

export type Arr<A> = HKT<'Arr', A>

export function to<A>(as: Array<A>): Arr<A> {
  return as as any as Arr<A>
}

export function from<A>(as: Arr<A>): Array<A> {
  return as as any as Array<A>
}

export const empty: () => Arr<any> = () => to([])

export function concat<A>(x: Arr<A>, y: Arr<A>): Arr<A> {
  return to(from(x).concat(from(y)))
}

export function map<A, B>(f: (a: A) => B, fa: Arr<A>): Arr<B> {
  return to(from(fa).map(f))
}

export function of<A>(a: A): Arr<A> {
  return to([a])
}

export function ap<A, B>(fab: Arr<(a: A) => B>, fa: Arr<A>): Arr<B> {
  const a = from(fa)
  return to(from(fab).reduce((acc: Array<B>, f) => acc.concat(a.map(f)), []))
}

export function chain<A, B>(f: (a: A) => Arr<B>, fa: Arr<A>): Arr<B> {
  return to(from(fa).reduce((acc: Array<B>, a) => acc.concat(from(f(a))), []))
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: Arr<A>): B {
  return from(fa).reduce(f, b)
}

export function traverse<F, A, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>, ta: Arr<A>): HKT<F, Arr<B>> {
  const snocA2 = liftA2(applicative, snoc)
  return reduce((fab, a) => snocA2(fab, f(a)), applicative.of(empty()), ta)
}

export const zero = empty

export const alt = concat

export function unfoldr<A, B>(f: (b: B) => Option<[A, B]>, b: B): Arr<A> {
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
  return to(ret)
}

export function fold<A, B>(nil: () => B, cons: (head: A, tail: Arr<A>) => B, as: Arr<A>): B {
  const xs = from(as)
  return xs.length === 0 ? nil() : cons(xs[0], to(xs.slice(1)))
}

export function length<A>(as: Arr<A>): number {
  return from(as).length
}

export function isEmpty<A>(as: Arr<A>): boolean {
  return length(as) === 0
}

export function isOutOfBound<A>(i: number, as: Arr<A>): boolean {
  return i < 0 || i >= from(as).length
}

export function index<A>(as: Arr<A>, i: number): Option<A> {
  const xs = from(as)
  return isOutOfBound(i, as) ? option.none : option.some(xs[i])
}

export function cons<A>(a: A, as: Arr<A>): Arr<A> {
  return to([a].concat(from(as)))
}

export function snoc<A>(as: Arr<A>, a: A): Arr<A> {
  return to(from(as).concat(a))
}

export function head<A>(as: Arr<A>): Option<A> {
  return isEmpty(as) ? option.none : option.some(from(as)[0])
}

export function last<A>(as: Arr<A>): Option<A> {
  return index(as, length(as) - 1)
}

export function tail<A>(as: Arr<A>): Option<Arr<A>> {
  const xs = from(as)
  const len = xs.length
  return len === 0 ? option.none : option.some(to(xs.slice(1)))
}

export function slice<A>(start: number, end: number, as: Arr<A>): Arr<A> {
  return to(from(as).slice(start, end))
}

export function init<A>(as: Arr<A>): Option<Arr<A>> {
  const xs = from(as)
  const len = xs.length
  return len === 0 ? option.none : option.some(to(xs.slice(0, len - 1)))
}

export function take<A>(n: number, as: Arr<A>): Arr<A> {
  return slice(0, n, as)
}

export function takeWhile<A>(predicate: Predicate<A>, as: Arr<A>): Arr<A> {
  return to(from(as).slice().filter(predicate))
}

export function drop<A>(n: number, as: Arr<A>): Arr<A> {
  return slice(n, length(as), as)
}

export function dropWhile<A>(predicate: Predicate<A>, as: Arr<A>): Arr<A> {
  return takeWhile(a => !predicate(a), as)
}

export function findIndex<A>(predicate: Predicate<A>, as: Arr<A>): Option<number> {
  const xs = from(as)
  for (let i = 0, len = xs.length; i < len; i++) {
    if (predicate(xs[i])) {
      return option.some(i)
    }
  }
  return option.none
}

export function filter<A>(predicate: Predicate<A>, as: Arr<A>): Arr<A> {
  return to(from(as).filter(predicate))
}

export function copy<A>(as: Arr<A>): Array<A> {
  return from(as).slice()
}

export function unsafeInsertAt<A>(i: number, a: A, as: Arr<A>): Arr<A> {
  const xs = copy(as)
  xs.splice(i, 0, a)
  return to(xs)
}

export function insertAt<A>(i: number, a: A, as: Arr<A>): Option<Arr<A>> {
  return i < 0 || i > from(as).length ? option.none : option.some(unsafeInsertAt(i, a, as))
}

export function unsafeUpdateAt<A>(i: number, a: A, as: Arr<A>): Arr<A> {
  const xs = copy(as)
  xs[i] = a
  return to(xs)
}

export function updateAt<A>(i: number, a: A, as: Arr<A>): Option<Arr<A>> {
  return isOutOfBound(i, as) ? option.none : option.some(unsafeUpdateAt(i, a, as))
}

export function unsafeDeleteAt<A>(i: number, as: Arr<A>): Arr<A> {
  const xs = copy(as)
  xs.splice(i, 1)
  return to(xs)
}

export function deleteAt<A>(i: number, as: Arr<A>): Option<Arr<A>> {
  return isOutOfBound(i, as) ? option.none : option.some(unsafeDeleteAt(i, as))
}

export function modifyAt<A>(i: number, f: (a: A) => A, as: Arr<A>): Option<Arr<A>> {
  return isOutOfBound(i, as) ? option.none : updateAt(i, f(from(as)[i]), as)
}

export function reverse<A>(as: Arr<A>): Arr<A> {
  return to(copy(as).reverse())
}

export function mapOption<A, B>(f: (a: A) => Option<B>, as: Arr<A>): Arr<B> {
  return chain(a => option.fold(empty, of, f(a)), as)
}

export function catOptions<A>(as: Arr<Option<A>>): Arr<A> {
  return mapOption<Option<A>, A>(identity, as)
}

export function sort<A>(ord: Ord<A>, as: Arr<A>): Arr<A> {
  return to(copy(as).sort(toNativeComparator(ord.compare)))
}

;(
  { map, of, ap, chain, reduce, traverse, zero, alt } as (
    Monoid<Arr<any>> &
    Monad<'Arr'> &
    Foldable<'Arr'> &
    Traversable<'Arr'> &
    Alternative<'Arr'> &
    Plus<'Arr'>
  )
)
